'use server';

import { registrationSchema } from '@/lib/validations';
import { supabase } from '@/lib/supabase/client';
import { sendRegistrationConfirmation } from '@/lib/email/mailer';
import { sendWelcomeMessage } from '@/lib/whatsapp/service';
import { notifyNewRegistration } from '@/lib/telegram';

export type RegistrationState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function registerForCohort(
  prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  // 1. Validate
  const raw = {
    childName: formData.get('childName'),
    childAge: formData.get('childAge'),
    guardianName: formData.get('guardianName'),
    guardianEmail: formData.get('guardianEmail'),
    guardianPhone: formData.get('guardianPhone'),
    city: formData.get('city'),
    referralSource: formData.get('referralSource') || undefined,
    consent: formData.get('consent'),
  };

  console.log('[registerForCohort] Raw form data received:', raw);
  const result = registrationSchema.safeParse(raw);

  if (!result.success) {
    console.log('[registerForCohort] Validation failed:', result.error.flatten().fieldErrors);
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = result.data;
  const cohortName = 'Cohort 03'; // Update per cohort cycle

  try {
    // 2. Insert into Supabase (unique constraint catches duplicates)
    console.log('[registerForCohort] Attempting Supabase insert for:', data.childName);
    const { error: dbError } = await supabase.from('cohort_registrations').insert({
      cohort_name: cohortName,
      child_name: data.childName,
      child_age: data.childAge,
      guardian_name: data.guardianName,
      guardian_email: data.guardianEmail.toLowerCase().trim(),
      guardian_phone: data.guardianPhone.trim(),
      city: data.city,
      referral_source: data.referralSource || null,
      consent: true,
      status: 'confirmed',
    });

    if (dbError) {
      console.error('[registerForCohort] Supabase insert failed with dbError:', dbError);
      // Check for unique constraint violation (duplicate registration)
      if (dbError.code === '23505') {
        return {
          success: false,
          message: 'This email is already registered for this cohort. Check your inbox for the confirmation email, or contact us if you need help.',
        };
      }

      return {
        success: false,
        message: 'Something went wrong. Please try again or contact us directly.',
      };
    }

    console.log('[registerForCohort] Supabase insert successful.');

    // 3. Send welcome WhatsApp message (non-blocking)
    try {
      console.log('[registerForCohort] Attempting to send welcome WhatsApp message...');
      await sendWelcomeMessage(
        data.guardianPhone,
        data.guardianName,
        data.childName,
        cohortName
      );
    } catch (waError) {
      console.error('[registerForCohort] Welcome WhatsApp message failed:', waError);
    }

    // 4. Send confirmation email
    try {
      console.log('[registerForCohort] Attempting to send confirmation email...');
      await sendRegistrationConfirmation({
        guardianName: data.guardianName,
        guardianEmail: data.guardianEmail,
        childName: data.childName,
        childAge: data.childAge,
        cohortName,
        city: data.city,
      });
      console.log('[registerForCohort] Confirmation email sent successfully.');
    } catch (emailError) {
      // Email failure shouldn't block — registration is saved
      console.error('[registerForCohort] Registration email failed:', emailError);
    }

    // 5. Notify team via Telegram. Awaited (with a bounded timeout inside
    // sendTelegramMessage) rather than fire-and-forget: on serverless
    // (Vercel), an un-awaited call can get killed the instant the response
    // is sent, before it ever reaches Telegram. Errors are only logged —
    // the DB write already succeeded, so this must never fail the response.
    await notifyNewRegistration('Cohort Registration', {
      Child: `${data.childName} (age ${data.childAge})`,
      Guardian: data.guardianName,
      Email: data.guardianEmail,
      Phone: data.guardianPhone,
      City: data.city,
      Cohort: cohortName,
    }).catch((tgError) => {
      console.error('[registerForCohort] Telegram notification failed:', tgError);
    });

    return {
      success: true,
      message: `${data.childName} is registered for ${cohortName}! Check ${data.guardianEmail} for a confirmation email.`,
    };
  } catch (error) {
    console.error('[registerForCohort] Unhandled exception occurred:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again or contact us directly.',
    };
  }
}
