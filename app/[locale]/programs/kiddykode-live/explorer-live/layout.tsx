import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorer Live — KiddyKode",
  description: "Explorer Live helps children build confidence, curiosity, focus, and logical thinking through engaging coding projects and real-world challenges.",
  openGraph: {
    title: "Explorer Live — KiddyKode",
    description: "Explorer Live helps children build confidence, curiosity, focus, and logical thinking through engaging coding projects and real-world challenges.",
    url: "https://kiddykode.com/en/programs/kiddykode-live/explorer-live",
    siteName: "KiddyKode",
    images: [
      {
        url: "/kiddykode-og-image.png",
        width: 1024,
        height: 1024,
        alt: "Explorer Live — KiddyKode",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explorer Live — KiddyKode",
    description: "Explorer Live helps children build confidence, curiosity, focus, and logical thinking through engaging coding projects and real-world challenges.",
    images: ["/kiddykode-og-image.png"],
  },
};

export default function ExplorerLiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
