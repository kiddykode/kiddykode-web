import { toWhatsAppJid } from '../phone';

const whatsappApiUrl = process.env.WHATSAPP_API_URL;
const whatsappApiKey = process.env.WHATSAPP_API_KEY;

/**
 * Validates that required environment variables are set.
 */
function validateConfig() {
  if (!whatsappApiUrl) {
    console.warn('[WhatsApp Client] Warning: WHATSAPP_API_URL is not set.');
  }
  if (!whatsappApiKey) {
    console.warn('[WhatsApp Client] Warning: WHATSAPP_API_KEY is not set.');
  }
}

/**
 * Generic helper to call open-wa Easy API REST endpoints.
 */
export async function callEasyApi<T = any>(
  endpoint: string,
  payload: Record<string, any> = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
  validateConfig();

  if (!whatsappApiUrl) {
    return { success: false, error: 'WHATSAPP_API_URL environment variable is not defined.' };
  }

  const url = `${whatsappApiUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (whatsappApiKey) {
    headers['X-API-Key'] = whatsappApiKey;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[WhatsApp Client] HTTP error ${response.status} calling ${endpoint}:`, errorText);
      return {
        success: false,
        error: `HTTP ${response.status}: ${errorText || response.statusText}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    console.error(`[WhatsApp Client] Exception calling ${endpoint}:`, error);
    return { success: false, error: error.message || 'Unknown network error' };
  }
}

/**
 * Sends a text message to a given WhatsApp phone number or JID.
 */
export async function sendWhatsAppMessage(
  toPhoneOrJid: string,
  text: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const chatId = toPhoneOrJid.endsWith('@c.us') || toPhoneOrJid.endsWith('@g.us')
    ? toPhoneOrJid
    : toWhatsAppJid(toPhoneOrJid);

  if (!chatId) {
    return { success: false, error: `Invalid WhatsApp phone format: ${toPhoneOrJid}` };
  }

  console.log(`[WhatsApp Client] Sending message to ${chatId}: "${text.substring(0, 40)}..."`);
  
  // Call the Easy API endpoint /sendText
  const result = await callEasyApi('sendText', { chatId, text });
  
  if (result.success && result.data) {
    // open-wa sendText returns the sent message object, or a message ID
    const messageId = typeof result.data === 'string' ? result.data : result.data.id;
    return { success: true, messageId };
  }

  return { success: false, error: result.error || 'Failed to send message' };
}

/**
 * Invites / Adds a guardian to a WhatsApp group.
 */
export async function addParticipantToGroup(
  groupId: string,
  participantPhone: string
): Promise<{ success: boolean; error?: string }> {
  const participantId = participantPhone.endsWith('@c.us')
    ? participantPhone
    : toWhatsAppJid(participantPhone);

  if (!participantId) {
    return { success: false, error: `Invalid participant phone format: ${participantPhone}` };
  }

  console.log(`[WhatsApp Client] Adding participant ${participantId} to group ${groupId}`);

  // Call the Easy API endpoint /addParticipant
  // In open-wa v4, the signature is addParticipant(groupId, participantId)
  const result = await callEasyApi('addParticipant', {
    chatId: groupId,
    participantId: participantId,
  });

  if (result.success) {
    return { success: true };
  }

  return { success: false, error: result.error || 'Failed to add participant to group' };
}

/**
 * Checks WhatsApp status by pinging a lightweight endpoint.
 */
export async function checkWhatsAppStatus(): Promise<{
  connected: boolean;
  hostNumber?: string;
  error?: string;
}> {
  // Call getMe or getHostNumber
  const result = await callEasyApi('getMe');
  if (result.success && result.data) {
    return {
      connected: true,
      hostNumber: result.data.id || result.data.hostNumber || 'unknown',
    };
  }
  return {
    connected: false,
    error: result.error || 'Could not reach WhatsApp API',
  };
}
