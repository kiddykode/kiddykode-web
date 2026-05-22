import nodemailer, { SendMailOptions } from 'nodemailer';

/**
 * Nodemailer transporter configured via environment variables.
 * Works with Gmail SMTP now, swappable to any SMTP provider later.
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER || '';
const contactEmail = process.env.CONTACT_EMAIL || fromAddress;

// Helper to handle dummy SMTP in development
async function sendEmail(options: SendMailOptions) {
  const isDummy = !process.env.SMTP_USER || 
                  process.env.SMTP_USER === 'kiddykode@gmail.com' || 
                  process.env.SMTP_PASS === 'somrStrong@Guava678';
  if (isDummy) {
    console.log('\n✉️ [SMTP Dummy Mode] Email Log:');
    console.log(`   From:    ${options.from}`);
    console.log(`   To:      ${options.to}`);
    console.log(`   Subject: ${options.subject}`);
    const htmlString = typeof options.html === 'string' ? options.html : '';
    console.log(`   HTML (truncated): ${htmlString.replace(/\s+/g, ' ').substring(0, 200)}...\n`);
    return;
  }
  try {
    await transporter.sendMail(options);
  } catch (error) {
    console.error('❌ Failed to send email via SMTP transporter:', error);
  }
}

// ────────────────────────────────────────────
// Contact Form Notification
// ────────────────────────────────────────────

interface ContactNotificationData {
  intent: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(data: ContactNotificationData) {
  const intentLabel: Record<string, string> = {
    parent: '👨‍👩‍👧 Parent',
    school: '🏫 School',
    partner: '🤝 Partner',
    other: '📬 Other',
  };

  await sendEmail({
    from: `"KiddyKode Website" <${fromAddress}>`,
    to: contactEmail,
    replyTo: data.email,
    subject: `[Contact] ${data.subject} — ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a1a; color: #f7f3ec; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0 0 4px; font-size: 18px;">New Contact Submission</h2>
          <p style="margin: 0; opacity: 0.7; font-size: 13px;">via kiddykode.org/contact</p>
        </div>
        <div style="background: #f7f3ec; padding: 24px 32px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;">Intent</td><td style="padding: 8px 0; font-weight: 600;">${intentLabel[data.intent] || data.intent}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0;">${data.firstName} ${data.lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">City</td><td style="padding: 8px 0;">${data.city}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Subject</td><td style="padding: 8px 0;">${data.subject}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 6px; border: 1px solid #e5e0d8;">
            <p style="margin: 0 0 4px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
          </div>
          <p style="margin-top: 16px; font-size: 12px; color: #999;">Reply directly to this email to respond to ${data.firstName}.</p>
        </div>
      </div>
    `,
  });
}

// ────────────────────────────────────────────
// Cohort Registration Confirmation
// ────────────────────────────────────────────

interface RegistrationConfirmationData {
  guardianName: string;
  guardianEmail: string;
  childName: string;
  childAge: number;
  cohortName: string;
  city: string;
}

export async function sendRegistrationConfirmation(data: RegistrationConfirmationData) {
  await sendEmail({
    from: `"KiddyKode" <${fromAddress}>`,
    to: data.guardianEmail,
    subject: `Welcome to ${data.cohortName} — ${data.childName} is registered!`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a1a; color: #f7f3ec; padding: 32px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0 0 8px; font-size: 22px;">🎉 Registration Confirmed</h1>
          <p style="margin: 0; opacity: 0.7; font-size: 14px;">${data.cohortName} — KiddyKode Live</p>
        </div>
        <div style="background: #f7f3ec; padding: 32px; border-radius: 0 0 8px 8px;">
          <p style="font-size: 15px; line-height: 1.6;">Hi ${data.guardianName},</p>
          <p style="font-size: 15px; line-height: 1.6;">
            Thank you for registering <strong>${data.childName}</strong> (age ${data.childAge}) for <strong>${data.cohortName}</strong>.
            We're excited to have them join us!
          </p>
          <div style="margin: 24px 0; padding: 20px; background: white; border-radius: 8px; border: 1px solid #e5e0d8;">
            <h3 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #666;">Registration Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #666;">Learner</td><td style="padding: 6px 0;">${data.childName}, age ${data.childAge}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Cohort</td><td style="padding: 6px 0;">${data.cohortName}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Location</td><td style="padding: 6px 0;">${data.city}</td></tr>
              <tr><td style="padding: 6px 0; color: #666;">Status</td><td style="padding: 6px 0; color: #2d7d46; font-weight: 600;">✓ Confirmed</td></tr>
            </table>
          </div>
          <p style="font-size: 14px; line-height: 1.6; color: #555;">
            You'll receive a welcome pack and setup instructions before day one. If you have any questions,
            reply to this email or reach us at <a href="mailto:${contactEmail}">${contactEmail}</a>.
          </p>
          <p style="font-size: 14px; line-height: 1.6; margin-top: 24px;">
            Warm regards,<br/>
            <strong>The KiddyKode Team</strong>
          </p>
        </div>
      </div>
    `,
  });

  // Also notify the team
  await sendEmail({
    from: `"KiddyKode Website" <${fromAddress}>`,
    to: contactEmail,
    subject: `[Registration] ${data.childName} — ${data.cohortName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a1a; color: #f7f3ec; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0 0 4px; font-size: 18px;">New Cohort Registration</h2>
          <p style="margin: 0; opacity: 0.7; font-size: 13px;">${data.cohortName}</p>
        </div>
        <div style="background: #f7f3ec; padding: 24px 32px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;">Child</td><td style="padding: 8px 0;">${data.childName}, age ${data.childAge}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Guardian</td><td style="padding: 8px 0;">${data.guardianName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.guardianEmail}">${data.guardianEmail}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">City</td><td style="padding: 8px 0;">${data.city}</td></tr>
          </table>
        </div>
      </div>
    `,
  });
}
