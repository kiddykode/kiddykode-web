'use server';

import { yilRegistrationSchema } from '@/lib/validations';
import { supabase } from '@/lib/supabase/client';
import { sendWelcomeMessage } from '@/lib/whatsapp/service';
import { notifyNewRegistration } from '@/lib/telegram';

export type YilRegistrationState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function registerForYil(
  prevState: YilRegistrationState,
  formData: FormData
): Promise<YilRegistrationState> {
  const raw = {
    fullName: formData.get('fullName'),
    whatsappNumber: formData.get('whatsappNumber'),
    numberOfKids: formData.get('numberOfKids'),
  };

  const result = yilRegistrationSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = result.data;

  try {
    const { error: dbError } = await supabase.from('yil_registrations').insert({
      full_name: data.fullName,
      whatsapp_number: data.whatsappNumber,
      number_of_kids: data.numberOfKids,
      status: 'pending',
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return {
        success: false,
        message: 'Something went wrong. Please try again or contact us directly.',
      };
    }

    // Trigger WhatsApp welcome message
    try {
      console.log('[registerForYil] Triggering welcome WhatsApp message...');
      await sendWelcomeMessage(
        data.whatsappNumber,
        data.fullName,
        `${data.numberOfKids} child(ren)`,
        'YIL Holiday Tech Bootcamp'
      );
    } catch (waError) {
      console.error('[registerForYil] WhatsApp welcome failed:', waError);
    }

    // Notify team via Telegram. Awaited (with a bounded timeout inside
    // sendTelegramMessage) rather than fire-and-forget: on serverless
    // (Vercel), an un-awaited call can get killed the instant the response
    // is sent, before it ever reaches Telegram. Errors are only logged —
    // the DB write already succeeded, so this must never fail the response.
    await notifyNewRegistration('YIL Registration', {
      Name: data.fullName,
      WhatsApp: data.whatsappNumber,
      Kids: data.numberOfKids,
    }).catch((tgError) => {
      console.error('[registerForYil] Telegram notification failed:', tgError);
    });

    return {
      success: true,
      message: 'Registration successful! We will contact you on WhatsApp shortly.',
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again or contact us directly.',
    };
  }
}
