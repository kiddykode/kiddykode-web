import { supabase } from '../supabase/client';
import { normalizePhone, toWhatsAppJid } from '../phone';
import { sendWhatsAppMessage } from './client';

/**
 * Sends a welcome message immediately to a registered parent/guardian.
 * If sending fails, it enqueues a retry job in the database.
 */
export async function sendWelcomeMessage(
  phone: string,
  guardianName: string,
  childName: string,
  program: string
): Promise<boolean> {
  const normalized = normalizePhone(phone);
  if (!normalized) {
    console.error('[WhatsApp Service] Cannot send welcome: invalid phone format', phone);
    return false;
  }

  const text = `Hi ${guardianName}! 🎉 Welcome to KiddyKode. We are excited to have ${childName} join us for the ${program}! We will share onboarding details and next steps shortly. Feel free to ask any questions here!`;
  const dedupeKey = `welcome_${normalized}_${Date.now()}`;

  // Log the outbound message attempt
  const { data: logData, error: logError } = await supabase.from('whatsapp_message_logs').insert({
    direction: 'outbound',
    normalized_phone: normalized,
    template_key: 'welcome',
    dedupe_key: dedupeKey,
    status: 'pending',
    payload: { guardianName, childName, program, text }
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
    console.log(`[WhatsApp Service] Welcome message sent successfully to ${normalized}`);
    return true;
  } else {
    if (logId) {
      await supabase.from('whatsapp_message_logs').update({
        status: 'failed',
        payload: { error: result.error, guardianName, childName, program, text }
      }).eq('id', logId);
    }

    console.warn(`[WhatsApp Service] Welcome message failed: ${result.error}. Enqueueing retry job.`);
    
    // Enqueue retry job
    await supabase.from('whatsapp_jobs').insert({
      job_type: 'welcome',
      payload: { phone, guardianName, childName, program },
      status: 'pending',
      max_attempts: 5,
      run_at: new Date(Date.now() + 60000).toISOString(), // Retry in 1 minute
      dedupe_key: `retry_welcome_${normalized}`
    });

    return false;
  }
}

/**
 * Sends a payment reminder direct call.
 * Limits to 2 reminders per registration, and appends payment note.
 */
export async function sendPaymentReminderDirect(
  registrationId: string,
  phone: string,
  guardianName: string,
  childName: string,
  cohortName: string,
  reminderNumber: number
): Promise<boolean> {
  const normalized = normalizePhone(phone);
  if (!normalized) return false;

  const text = `Hi ${guardianName}, this is a friendly reminder that payment for ${childName}'s enrollment in ${cohortName} is pending. If you have already made payment, please ignore this message. (Reminder ${reminderNumber}/2)`;
  const dedupeKey = `payment_reminder_${registrationId}_${reminderNumber}`;

  // Check if already logged/sent to prevent double-sending
  const { data: existing } = await supabase
    .from('whatsapp_message_logs')
    .select('id')
    .eq('dedupe_key', dedupeKey)
    .maybeSingle();

  if (existing) {
    console.log(`[WhatsApp Service] Payment reminder ${reminderNumber} already sent for registration ${registrationId}. Skipping.`);
    return true;
  }

  // Insert log
  const { data: logData } = await supabase.from('whatsapp_message_logs').insert({
    direction: 'outbound',
    normalized_phone: normalized,
    template_key: 'payment_reminder',
    dedupe_key: dedupeKey,
    status: 'pending',
    payload: { registrationId, cohortName, reminderNumber, text }
  }).select().single();

  const logId = logData?.id;

  const result = await sendWhatsAppMessage(normalized, text);

  if (result.success) {
    if (logId) {
      await supabase.from('whatsapp_message_logs').update({
        status: 'sent',
        wa_message_id: blockValue(result.messageId),
      }).eq('id', logId);
    }
    
    // Update reminder count in registration
    await supabase.rpc('increment_payment_reminders', { reg_id: registrationId });

    console.log(`[WhatsApp Service] Payment reminder ${reminderNumber} sent to ${normalized}`);
    return true;
  } else {
    if (logId) {
      await supabase.from('whatsapp_message_logs').update({
        status: 'failed',
        payload: { error: result.error, registrationId, cohortName, reminderNumber, text }
      }).eq('id', logId);
    }

    console.error(`[WhatsApp Service] Payment reminder ${reminderNumber} failed to ${normalized}: ${result.error}`);
    return false;
  }
}

function blockValue(v: any) {
  return typeof v === 'object' && v !== null ? JSON.stringify(v) : v;
}

/**
 * Sends a class reminder message.
 */
export async function sendClassReminderDirect(
  registrationId: string,
  phone: string,
  guardianName: string,
  childName: string,
  className: string,
  startTime: string
): Promise<boolean> {
  const normalized = normalizePhone(phone);
  if (!normalized) return false;

  const text = `Hi ${guardianName}! 📚 Just a reminder that ${childName}'s upcoming KiddyKode class "${className}" starts tomorrow at ${startTime}. Please ensure their laptop is set up and ready!`;
  const dedupeKey = `class_reminder_${registrationId}_${className.replace(/\s+/g, '_')}_${startTime.split('T')[0]}`;

  const { data: existing } = await supabase
    .from('whatsapp_message_logs')
    .select('id')
    .eq('dedupe_key', dedupeKey)
    .maybeSingle();

  if (existing) {
    console.log(`[WhatsApp Service] Class reminder already sent for ${childName} on ${startTime}. Skipping.`);
    return true;
  }

  const { data: logData } = await supabase.from('whatsapp_message_logs').insert({
    direction: 'outbound',
    normalized_phone: normalized,
    template_key: 'class_reminder',
    dedupe_key: dedupeKey,
    status: 'pending',
    payload: { registrationId, className, startTime, text }
  }).select().single();

  const logId = logData?.id;

  const result = await sendWhatsAppMessage(normalized, text);

  if (result.success) {
    if (logId) {
      await supabase.from('whatsapp_message_logs').update({
        status: 'sent',
        wa_message_id: blockValue(result.messageId),
      }).eq('id', logId);
    }
    console.log(`[WhatsApp Service] Class reminder sent to ${normalized}`);
    return true;
  } else {
    if (logId) {
      await supabase.from('whatsapp_message_logs').update({
        status: 'failed',
        payload: { error: result.error, registrationId, className, startTime, text }
      }).eq('id', logId);
    }
    console.error(`[WhatsApp Service] Class reminder failed to ${normalized}: ${result.error}`);
    return false;
  }
}

/**
 * Receives an incoming WhatsApp message webhook, normalizes, logs,
 * identifies sender, and attempts FAQ auto-reply matching.
 */
export async function processInboundMessage(message: {
  id: string;
  from: string;
  body: string;
  sender?: { name?: string };
}): Promise<void> {
  const rawFrom = message.from;
  const normalized = normalizePhone(rawFrom);
  if (!normalized) {
    console.warn('[WhatsApp Service] Inbound message ignored: un-normalizable sender phone', rawFrom);
    return;
  }

  const messageBody = (message.body || '').trim();

  // Log inbound message
  const { error: logError } = await supabase.from('whatsapp_message_logs').insert({
    direction: 'inbound',
    wa_message_id: message.id,
    contact_identifier: message.sender?.name || null,
    normalized_phone: normalized,
    payload: message,
    status: 'received'
  });

  if (logError) {
    console.error('[WhatsApp Service] Failed to log inbound message:', logError);
  }

  if (!messageBody) return;

  // 1. Try to find matched FAQ template
  const matchedTemplate = await matchFaqTemplate(messageBody);

  if (!matchedTemplate) {
    console.log(`[WhatsApp Service] No FAQ template matched for: "${messageBody}"`);
    return;
  }

  console.log(`[WhatsApp Service] FAQ matched! Key: ${matchedTemplate.key}`);

  // 2. Loop prevention check:
  // Check if we already sent this exact FAQ response to this sender in the last 5 minutes
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  const { data: recentOutbound } = await supabase
    .from('whatsapp_message_logs')
    .select('id, template_key')
    .eq('direction', 'outbound')
    .eq('normalized_phone', normalized)
    .eq('template_key', matchedTemplate.key)
    .gt('created_at', fiveMinutesAgo)
    .limit(1);

  if (recentOutbound && recentOutbound.length > 0) {
    console.warn(`[WhatsApp Service] Loop Prevention: FAQ response '${matchedTemplate.key}' was sent to ${normalized} in the last 5 minutes. Suppressing auto-reply.`);
    return;
  }

  // 3. Send response
  const dedupeKey = `auto_reply_${message.id}`;
  const responseText = matchedTemplate.response_text;

  // Insert outgoing log
  const { data: outLog } = await supabase.from('whatsapp_message_logs').insert({
    direction: 'outbound',
    normalized_phone: normalized,
    template_key: matchedTemplate.key,
    dedupe_key: dedupeKey,
    status: 'pending',
    payload: { responseText, triggerMessageId: message.id }
  }).select().single();

  const outLogId = outLog?.id;

  const result = await sendWhatsAppMessage(normalized, responseText);

  if (result.success) {
    if (outLogId) {
      await supabase.from('whatsapp_message_logs').update({
        status: 'sent',
        wa_message_id: blockValue(result.messageId),
      }).eq('id', outLogId);
    }
    console.log(`[WhatsApp Service] Auto-reply sent to ${normalized} using template ${matchedTemplate.key}`);
  } else {
    if (outLogId) {
      await supabase.from('whatsapp_message_logs').update({
        status: 'failed',
        payload: { error: result.error, responseText, triggerMessageId: message.id }
      }).eq('id', outLogId);
    }
    console.error(`[WhatsApp Service] Auto-reply failed to send to ${normalized}: ${result.error}`);
  }
}

/**
 * Searches the database for an enabled FAQ template that matches the query.
 * Matches exact, case-insensitive, keyword/alias arrays.
 */
export async function matchFaqTemplate(queryText: string): Promise<{
  key: string;
  response_text: string;
} | null> {
  const cleanQuery = queryText.toLowerCase().trim();
  if (!cleanQuery) return null;

  // Fetch all enabled FAQ templates sorted by priority
  const { data: templates, error } = await supabase
    .from('faq_templates')
    .select('key, keywords, response_text, enabled, priority')
    .eq('enabled', true)
    .order('priority', { ascending: false });

  if (error || !templates) {
    console.error('[WhatsApp Service] Error loading FAQ templates:', error);
    return null;
  }

  for (const template of templates) {
    const keywords: string[] = template.keywords || [];
    
    // Check if the query matches the template key
    if (template.key.toLowerCase() === cleanQuery) {
      return template;
    }

    // Check exact keyword match or containment check
    for (const kw of keywords) {
      const kwClean = kw.toLowerCase().trim();
      if (!kwClean) continue;

      // Check if query exactly equals keyword
      if (cleanQuery === kwClean) {
        return template;
      }

      // Check if keyword is inside query with word boundaries (e.g. query: "what is python", keyword: "python")
      const regex = new RegExp(`\\b${escapeRegExp(kwClean)}\\b`, 'i');
      if (regex.test(cleanQuery)) {
        return template;
      }
    }
  }

  return null;
}

/**
 * Helper to escape regex special characters
 */
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
