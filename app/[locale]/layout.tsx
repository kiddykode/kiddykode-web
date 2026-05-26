import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TranslationProvider } from '@/i18n/context';
import { getMessages, setRequestLocale } from '@/i18n/translations';
import "../globals.css";
import { LayoutWrapper } from "../components/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kiddykode.com"),
  title: "KiddyKode | Learn to Code, Build the Future",
  description: "Empowering the next generation of creators through fun and interactive coding programs.",
  openGraph: {
    title: "KiddyKode | Learn to Code, Build the Future",
    description: "Empowering the next generation of creators through fun and interactive coding programs.",
    url: "https://kiddykode.com",
    siteName: "KiddyKode",
    images: [
      {
        url: "/kiddykode-og-image.png",
        width: 1024,
        height: 1024,
        alt: "KiddyKode — Code Early, Build Tomorrow",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KiddyKode | Learn to Code, Build the Future",
    description: "Empowering the next generation of creators through fun and interactive coding programs.",
    images: ["/kiddykode-og-image.png"],
  },
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`} data-accent="bronze" data-type="general-inter">
        <TranslationProvider locale={locale} messages={messages}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </TranslationProvider>
      </body>
    </html>
  );
}
