import { z } from 'zod';

// ────────────────────────────────────────────
// Contact Form
// ────────────────────────────────────────────

export const contactSchema = z.object({
  intent: z.enum(['parent', 'school', 'partner', 'other'], {
    message: 'Please select who you are.',
  }),
  firstName: z
    .string()
    .min(1, 'First name is required.')
    .max(100, 'First name is too long.'),
  lastName: z
    .string()
    .min(1, 'Last name is required.')
    .max(100, 'Last name is too long.'),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  city: z
    .string()
    .min(1, 'City / Country is required.')
    .max(200, 'City / Country is too long.'),
  subject: z
    .string()
    .min(1, 'Please select a subject.'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(5000, 'Message is too long (5000 characters max).'),
  consent: z
    .string({ message: 'You must agree to the privacy policy.' })
    .refine((val) => val === 'on', { message: 'You must agree to the privacy policy.' }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ────────────────────────────────────────────
// Newsletter
// ────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  source: z.enum(['footer', 'stories', 'cohort', 'homepage']).optional().default('footer'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// ────────────────────────────────────────────
// Cohort Registration
// ────────────────────────────────────────────

export const registrationSchema = z.object({
  childName: z
    .string()
    .min(1, "Child's name is required.")
    .max(200, 'Name is too long.'),
  childAge: z
    .string()
    .min(1, 'Age is required.')
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .int('Age must be a whole number.')
        .min(5, 'Minimum age is 5.')
        .max(18, 'Maximum age is 18.')
    ),
  guardianName: z
    .string()
    .min(1, 'Parent/guardian name is required.')
    .max(200, 'Name is too long.'),
  guardianEmail: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  city: z
    .string()
    .min(1, 'City / Country is required.')
    .max(200, 'Too long.'),
  referralSource: z
    .enum(['social_media', 'school', 'friend', 'website', 'other'])
    .optional(),
  consent: z
    .string({ message: 'You must agree to the terms.' })
    .refine((val) => val === 'on', { message: 'You must agree to the terms.' }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// ────────────────────────────────────────────
// YIL Campaign Registration
// ────────────────────────────────────────────

export const yilRegistrationSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required.')
    .max(200, 'Name is too long.'),
  whatsappNumber: z
    .string()
    .min(1, 'WhatsApp number is required.')
    .max(50, 'Number is too long.'),
  numberOfKids: z
    .string()
    .min(1, 'Number of children is required.')
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .int('Must be a whole number.')
        .min(1, 'Minimum is 1.')
        .max(20, 'Maximum is 20.')
    ),
});

export type YilRegistrationFormData = z.infer<typeof yilRegistrationSchema>;
