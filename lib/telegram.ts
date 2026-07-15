const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;

/**
 * Sends a raw HTML-formatted message to the configured Telegram chat.
 * Throws on failure so callers can decide how to handle/log it.
 */
export async function sendTelegramMessage(text: string): Promise<void> {
  if (!telegramBotToken || !telegramChatId) {
    console.warn('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set, skipping notification.');
    return;
  }

  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text,
      parse_mode: 'HTML',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram API error ${response.status}: ${errorText}`);
  }
}

/**
 * Formats and sends a new-registration alert, one field per line.
 */
export async function notifyNewRegistration(
  title: string,
  fields: Record<string, string | number>
): Promise<void> {
  const lines = [
    `🆕 <b>${title}</b>`,
    ...Object.entries(fields).map(([label, value]) => `<b>${label}:</b> ${value}`),
  ];

  await sendTelegramMessage(lines.join('\n'));
}
