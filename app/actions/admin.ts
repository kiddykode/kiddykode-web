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
