import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorer Live Session — KiddyKode",
  description: "Give your child more than screen time. Give them the skills to create with technology. Explorer Live Session starts 6 June 2026.",
  openGraph: {
    title: "Explorer Live Session — KiddyKode",
    description: "Give your child more than screen time. Give them the skills to create with technology. Explorer Live Session starts 6 June 2026.",
    url: "https://kiddykode.com/en/programs/explorer-live",
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
    title: "Explorer Live Session — KiddyKode",
    description: "Give your child more than screen time. Give them the skills to create with technology. Explorer Live Session starts 6 June 2026.",
    images: ["/kiddykode-og-image.png"],
  },
};

export default function ExplorerLiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
