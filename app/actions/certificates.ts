'use server';

import { supabase } from '@/lib/supabase/client';

export interface PublicCertificate {
  certificate_number: string | null;
  recipient_name: string;
  course_title: string;
  cohort_name: string | null;
  level: string | null;
  issued_at: string;
  expires_at: string | null;
  status: 'valid' | 'revoked' | 'replaced' | 'expired';
  revoked_at: string | null;
  revoke_reason: string | null;
  pdf_url: string | null;
}

/**
 * Public verification action — no auth required.
 * Fetches only the fields safe to display on the public verification page.
 * Returns null if the token is not found.
 */
export async function verifyCertificate(
  token: string
): Promise<{ found: false } | { found: true; certificate: PublicCertificate }> {
  // Validate token format to prevent abuse (alphanumeric + hyphens only)
  if (!/^[a-z0-9-]{8,64}$/.test(token)) {
    return { found: false };
  }

  const { data, error } = await supabase
    .from('certificates')
    .select(
      'certificate_number, recipient_name, course_title, cohort_name, level, issued_at, expires_at, status, revoked_at, revoke_reason, pdf_url'
    )
    .eq('public_token', token)
    .single();

  if (error || !data) {
    return { found: false };
  }

  return {
    found: true,
    certificate: data as PublicCertificate,
  };
}

/**
 * Looks up a certificate by certificate_number + recipient last name (manual fallback).
 * Returns the public_token so the user can be redirected to the canonical verify page.
 */
export async function lookupCertificateByNumber(
  certificateNumber: string,
  recipientLastName: string
): Promise<{ found: false } | { found: true; token: string }> {
  const { data, error } = await supabase
    .from('certificates')
    .select('public_token, recipient_name')
    .ilike('certificate_number', certificateNumber.trim())
    .single();

  if (error || !data) return { found: false };

  // Loose last-name check — recipient_name must end with the typed surname
  const nameLower = data.recipient_name.toLowerCase();
  const lastNameLower = recipientLastName.trim().toLowerCase();
  if (!nameLower.includes(lastNameLower)) return { found: false };

  return { found: true, token: data.public_token };
}
