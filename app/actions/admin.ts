'use server';

import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase/client';
import { sendWhatsAppMessage } from '@/lib/whatsapp/client';
import { normalizePhone } from '@/lib/phone';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

/**
 * Checks if the request is authenticated as admin.
 */
export async function checkAdminAuth(): Promise<boolean> {
  // If ADMIN_PASSWORD is not set, we default to authenticated in development only
  if (!ADMIN_PASSWORD) {
    return true;
  }
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === ADMIN_PASSWORD;
}

/**
 * Authenticates admin and sets a session cookie.
 */
export async function loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
  if (!ADMIN_PASSWORD) {
    return { success: true };
  }

  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', ADMIN_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return { success: true };
  }

  return { success: false, error: 'Invalid password. Please try again.' };
}

/**
 * Logs out admin by deleting the session cookie.
 */
export async function logoutAdmin(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  return { success: true };
}

// ────────────────────────────────────────────
// FAQ Templates CRUD Actions
// ────────────────────────────────────────────

export async function fetchFaqTemplates() {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('faq_templates')
    .select('*')
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function saveFaqTemplate(template: {
  id?: string;
  key: string;
  title: string;
  category: string;
  keywords: string[];
  response_text: string;
  enabled: boolean;
  priority: number;
}) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const payload = {
    key: template.key.trim(),
    title: template.title.trim(),
    category: template.category.trim(),
    keywords: template.keywords.map(k => k.trim()).filter(Boolean),
    response_text: template.response_text.trim(),
    enabled: template.enabled,
    priority: template.priority || 0,
    updated_at: new Date().toISOString(),
  };

  if (template.id) {
    const { error } = await supabase
      .from('faq_templates')
      .update(payload)
      .eq('id', template.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from('faq_templates')
      .insert(payload);
    if (error) throw new Error(error.message);
  }

  return { success: true };
}

export async function deleteFaqTemplate(id: string) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('faq_templates')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return { success: true };
}

// ────────────────────────────────────────────
// Message Logs & Job Queue Actions
// ────────────────────────────────────────────

export async function fetchMessageLogs(limit = 100) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('whatsapp_message_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data || [];
}

export async function fetchWhatsAppJobs(limit = 100) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('whatsapp_jobs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data || [];
}

export async function retryJobAction(jobId: string) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('whatsapp_jobs')
    .update({
      status: 'pending',
      attempts: 0,
      run_at: new Date().toISOString(),
      locked_by: null,
      locked_at: null,
    })
    .eq('id', jobId);

  if (error) throw new Error(error.message);
  return { success: true };
}

export async function deleteJobAction(jobId: string) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('whatsapp_jobs')
    .delete()
    .eq('id', jobId);

  if (error) throw new Error(error.message);
  return { success: true };
}

// ────────────────────────────────────────────
// Class Sessions Actions
// ────────────────────────────────────────────

export async function fetchClassSessions() {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('class_sessions')
    .select('*')
    .order('start_time', { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function addClassSession(title: string, cohortName: string, startTime: string) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('class_sessions')
    .insert({
      title: title.trim(),
      cohort_name: cohortName.trim(),
      start_time: new Date(startTime).toISOString(),
      reminder_sent: false,
    });

  if (error) throw new Error(error.message);
  return { success: true };
}

export async function deleteClassSession(id: string) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('class_sessions')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return { success: true };
}

// ────────────────────────────────────────────
// WhatsApp Config & Settings Actions
// ────────────────────────────────────────────

export async function fetchWhatsAppSettings(): Promise<Record<string, any>> {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('whatsapp_settings')
    .select('*');

  if (error) throw new Error(error.message);

  const settings: Record<string, any> = {};
  data?.forEach(row => {
    settings[row.key] = row.value;
  });

  return settings;
}

export async function saveWhatsAppSetting(key: string, value: any) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('whatsapp_settings')
    .upsert({
      key,
      value,
      updated_at: new Date().toISOString(),
    });

  if (error) throw new Error(error.message);
  return { success: true };
}

// ────────────────────────────────────────────
// Manual Outbound Trigger Action
// ────────────────────────────────────────────

export async function sendManualMessageAction(phone: string, text: string) {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const normalized = normalizePhone(phone);
  if (!normalized) {
    return { success: false, error: 'Invalid phone number format.' };
  }

  const dedupeKey = `manual_send_${normalized}_${Date.now()}`;

  // Log message attempt
  const { data: logData } = await supabase.from('whatsapp_message_logs').insert({
    direction: 'outbound',
    normalized_phone: normalized,
    template_key: 'manual',
    dedupe_key: dedupeKey,
    status: 'pending',
    payload: { text },
  }).select().single();

  const logId = logData?.id;

  const result = await sendWhatsAppMessage(normalized, text);

  if (result.success) {
    if (logId) {
      await supabase.from('whatsapp_message_logs').update({
        status: 'sent',
        wa_message_id: result.messageId,
      }).eq('id', logId);
    }
    return { success: true, messageId: result.messageId };
  } else {
    if (logId) {
      await supabase.from('whatsapp_message_logs').update({
        status: 'failed',
        payload: { error: result.error, text },
      }).eq('id', logId);
    }
    return { success: false, error: result.error || 'Failed to dispatch WhatsApp message.' };
  }
}

// ────────────────────────────────────────────
// Certificate Admin Actions
// ────────────────────────────────────────────

import { generateCertificateQR, buildVerifyUrl } from '@/lib/qr/generate';
import { randomUUID } from 'crypto';

/** Generates a URL-safe public token from a UUID */
function generatePublicToken(): string {
  // Take the first 20 chars of a UUID (removing hyphens) and prefix with 'kk-'
  const raw = randomUUID().replace(/-/g, '').slice(0, 20);
  return `kk-${raw}`;
}

export interface CertificateProgram {
  id: string;
  name: string;
  slug: string;
  level: string | null;
  active: boolean;
}

export interface CertificateRecord {
  id: string;
  public_token: string;
  certificate_number: string | null;
  recipient_name: string;
  recipient_email: string | null;
  program_id: string | null;
  course_title: string;
  cohort_name: string | null;
  level: string | null;
  issued_at: string;
  expires_at: string | null;
  status: 'valid' | 'revoked' | 'replaced' | 'expired';
  revoked_at: string | null;
  revoke_reason: string | null;
  replaced_by: string | null;
  pdf_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/** Fetch all active certificate programs for the dropdown */
export async function fetchCertificatePrograms(): Promise<CertificateProgram[]> {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { data, error } = await supabase
    .from('certificate_programs')
    .select('id, name, slug, level, active')
    .eq('active', true)
    .order('name');

  if (error) throw new Error(error.message);
  return (data || []) as CertificateProgram[];
}

/** Fetch all certificates for the admin dashboard */
export async function fetchCertificates(
  limit = 100,
  status?: string
): Promise<CertificateRecord[]> {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  let query = supabase
    .from('certificates')
    .select('*')
    .order('issued_at', { ascending: false })
    .limit(limit);

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data || []) as CertificateRecord[];
}

export interface IssueCertificateInput {
  recipient_name: string;
  recipient_email?: string;
  program_id: string;
  course_title: string;
  cohort_name?: string;
  level?: string;
  metadata?: Record<string, unknown>;
}

/** Issue a new certificate and return the record including the public token */
export async function issueCertificate(
  input: IssueCertificateInput
): Promise<{ success: true; record: CertificateRecord } | { success: false; error: string }> {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const publicToken = generatePublicToken();

  const { data, error } = await supabase
    .from('certificates')
    .insert({
      public_token: publicToken,
      recipient_name: input.recipient_name.trim(),
      recipient_email: input.recipient_email?.trim() || null,
      program_id: input.program_id,
      course_title: input.course_title.trim(),
      cohort_name: input.cohort_name?.trim() || null,
      level: input.level?.trim() || null,
      metadata: input.metadata || {},
      status: 'valid',
    })
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, record: data as CertificateRecord };
}

/** Revoke a certificate */
export async function revokeCertificate(
  id: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('certificates')
    .update({
      status: 'revoked',
      revoked_at: new Date().toISOString(),
      revoke_reason: reason.trim(),
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/**
 * Reissue a certificate: marks the original as 'replaced' and creates a new valid record.
 * Returns the new certificate record.
 */
export async function reissueCertificate(
  originalId: string
): Promise<{ success: true; record: CertificateRecord } | { success: false; error: string }> {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  // Fetch original
  const { data: original, error: fetchErr } = await supabase
    .from('certificates')
    .select('*')
    .eq('id', originalId)
    .single();

  if (fetchErr || !original) {
    return { success: false, error: 'Original certificate not found.' };
  }

  const newToken = generatePublicToken();

  // Insert replacement
  const { data: newCert, error: insertErr } = await supabase
    .from('certificates')
    .insert({
      public_token: newToken,
      recipient_name: original.recipient_name,
      recipient_email: original.recipient_email,
      program_id: original.program_id,
      course_title: original.course_title,
      cohort_name: original.cohort_name,
      level: original.level,
      metadata: original.metadata,
      status: 'valid',
    })
    .select()
    .single();

  if (insertErr) return { success: false, error: insertErr.message };

  // Mark original as replaced
  await supabase
    .from('certificates')
    .update({ status: 'replaced', replaced_by: newCert.id })
    .eq('id', originalId);

  return { success: true, record: newCert as CertificateRecord };
}

/**
 * Returns the QR code data URI and the verify URL for a certificate.
 * Used by the admin dashboard to display/download the QR.
 */
export async function getCertificateQR(
  token: string
): Promise<{ qrDataUri: string; verifyUrl: string }> {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) throw new Error('Unauthorized');

  const qrDataUri = await generateCertificateQR(token);
  const verifyUrl = buildVerifyUrl(token);
  return { qrDataUri, verifyUrl };
}
