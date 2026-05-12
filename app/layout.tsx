import type { Metadata } from "next";
import { Inter, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { UtilityBar } from "./components/UtilityBar";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`} data-accent="bronze" data-type="general-inter">
        <UtilityBar />
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
