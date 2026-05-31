import QRCode from 'qrcode';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kiddykode.com';

/**
 * Generates a base64 PNG data URI for a certificate verification QR code.
 * The QR encodes the public verification URL: https://kiddykode.com/verify/<token>
 *
 * @param token - The certificate's public_token value
 * @returns A base64 data URI (data:image/png;base64,...) ready for <img src> or PDF embedding
 */
export async function generateCertificateQR(token: string): Promise<string> {
  const verifyUrl = `${BASE_URL}/verify/${token}`;
  const dataUri = await QRCode.toDataURL(verifyUrl, {
    errorCorrectionLevel: 'H',   // High correction — survives partial damage on printed copies
    margin: 2,
    width: 400,
    color: {
      dark: '#152033',   // --color-ink-900
      light: '#FFFFFF',
    },
  });
  return dataUri;
}

/**
 * Generates a QR code as an SVG string for scalable rendering.
 */
export async function generateCertificateQRSvg(token: string): Promise<string> {
  const verifyUrl = `${BASE_URL}/verify/${token}`;
  return QRCode.toString(verifyUrl, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#152033',
      light: '#FFFFFF',
    },
  });
}

/**
 * Builds the public verification URL for a given token.
 */
export function buildVerifyUrl(token: string): string {
  return `${BASE_URL}/verify/${token}`;
}
