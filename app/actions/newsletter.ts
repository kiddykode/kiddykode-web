'use server';

import { newsletterSchema } from '@/lib/validations';
import { supabase } from '@/lib/supabase/client';

export type NewsletterState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function subscribeNewsletter(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  // 1. Validate
  const raw = {
    email: formData.get('email'),
    source: formData.get('source') || 'footer',
  };

  const result = newsletterSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message: 'Please enter a valid email address.',
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = result.data;

  try {
    // 2. Upsert into Supabase (handles duplicates gracefully)
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        {
          email: data.email.toLowerCase().trim(),
          source: data.source,
          subscribed_at: new Date().toISOString(),
          unsubscribed_at: null, // Re-subscribe if they previously unsubscribed
        },
        { onConflict: 'email' }
      );

    if (dbError) {
      console.error('Supabase upsert error:', dbError);
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
      };
    }

    return {
      success: true,
      message: "You're in! Look out for our next dispatch.",
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}
