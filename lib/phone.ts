/**
 * Normalizes a raw phone number by stripping spaces, dashes, parentheses,
 * leading '+', and leading '00' prefixes.
 * Returns a clean digit-only string, or null if invalid.
 */
export function normalizePhone(phone: string): string | null {
  if (!phone || typeof phone !== 'string') return null;

  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');

  // Strip leading '00' if present
  if (cleaned.startsWith('00')) {
    cleaned = cleaned.substring(2);
  }

  // If a user entered a local number starting with 0, we require a country code
  // or prepend standard country code if appropriate. For KiddyKode,
  // we assume numbers must have country code. Let's make sure length is 9 to 15 digits.
  if (cleaned.length < 9 || cleaned.length > 15) {
    return null;
  }

  return cleaned;
}

/**
 * Checks if a phone number can be normalized successfully.
 */
export function isValidPhone(phone: string): boolean {
  return normalizePhone(phone) !== null;
}

/**
 * Formats a phone number into a standard open-wa WhatsApp identifier (JID).
 * Example: "237677123456" -> "237677123456@c.us"
 */
export function toWhatsAppJid(phone: string): string | null {
  const normalized = normalizePhone(phone);
  if (!normalized) return null;
  return `${normalized}@c.us`;
}
