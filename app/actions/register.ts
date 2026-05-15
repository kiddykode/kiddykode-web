'use server';

import { registrationSchema } from '@/lib/validations';
import { supabase } from '@/lib/supabase/client';
import { sendRegistrationConfirmation } from '@/lib/email/mailer';

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
    city: formData.get('city'),
    referralSource: formData.get('referralSource') || undefined,
    consent: formData.get('consent'),
  };

  const result = registrationSchema.safeParse(raw);

  if (!result.success) {
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
    const { error: dbError } = await supabase.from('cohort_registrations').insert({
      cohort_name: cohortName,
      child_name: data.childName,
      child_age: data.childAge,
      guardian_name: data.guardianName,
      guardian_email: data.guardianEmail.toLowerCase().trim(),
      city: data.city,
      referral_source: data.referralSource || null,
      consent: true,
      status: 'confirmed',
    });

    if (dbError) {
      // Check for unique constraint violation (duplicate registration)
      if (dbError.code === '23505') {
        return {
          success: false,
          message: 'This email is already registered for this cohort. Check your inbox for the confirmation email, or contact us if you need help.',
        };
      }

      console.error('Supabase insert error:', dbError);
      return {
        success: false,
        message: 'Something went wrong. Please try again or contact us directly.',
      };
    }

    // 3. Send confirmation email
    try {
      await sendRegistrationConfirmation({
        guardianName: data.guardianName,
        guardianEmail: data.guardianEmail,
        childName: data.childName,
        childAge: data.childAge,
        cohortName,
        city: data.city,
      });
    } catch (emailError) {
      // Email failure shouldn't block — registration is saved
      console.error('Registration email failed:', emailError);
    }

    return {
      success: true,
      message: `${data.childName} is registered for ${cohortName}! Check ${data.guardianEmail} for a confirmation email.`,
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again or contact us directly.',
    };
  }
}
