import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { UtilityBar } from "../components/UtilityBar";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PromoModal } from "../components/PromoModal";

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
  title: "KiddyKode | Learn to Code, Build the Future",
  description: "Empowering the next generation of creators through fun and interactive coding programs.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`} data-accent="bronze" data-type="general-inter">
        <NextIntlClientProvider messages={messages}>
          <UtilityBar />
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
          <PromoModal />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
