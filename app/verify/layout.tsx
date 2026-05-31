import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kiddykode.com'),
  title: 'Certificate Verification — KiddyKode',
  description: 'Verify the authenticity of a KiddyKode certificate. Scan the QR code or enter the certificate number to confirm its validity.',
  robots: { index: false, follow: false }, // Verification pages should not be indexed
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.variable} style={{ margin: 0, padding: 0, background: '#F7F3EC' }}>
        {children}
      </body>
    </html>
  );
}
