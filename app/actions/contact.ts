'use server';

import { contactSchema } from '@/lib/validations';
import { supabase } from '@/lib/supabase/client';
import { sendContactNotification } from '@/lib/email/mailer';

export type ContactState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // 1. Validate
  const raw = {
    intent: formData.get('intent'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    city: formData.get('city'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    consent: formData.get('consent'),
  };

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = result.data;

  try {
    // 2. Insert into Supabase
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      intent: data.intent,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      city: data.city,
      subject: data.subject,
      message: data.message,
      consent: true,
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return {
        success: false,
        message: 'Something went wrong. Please try again or email us directly.',
      };
    }

    // 3. Send email notification to team
    try {
      await sendContactNotification({
        intent: data.intent,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        city: data.city,
        subject: data.subject,
        message: data.message,
      });
    } catch (emailError) {
      // Email failure shouldn't block the submission — data is already saved
      console.error('Email notification failed:', emailError);
    }

    return {
      success: true,
      message: "Message sent! We'll get back to you within two working days.",
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again or email us directly.',
    };
  }
}
