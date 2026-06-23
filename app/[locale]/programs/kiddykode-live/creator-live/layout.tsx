import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Live — KiddyKode",
  description: "Creator Live empowers learners to identify real-world problems, understand the people affected, design meaningful solutions, build innovative projects, and create positive impact.",
  openGraph: {
    title: "Creator Live — KiddyKode",
    description: "Creator Live empowers learners to identify real-world problems, understand the people affected, design meaningful solutions, build innovative projects, and create positive impact.",
    url: "https://kiddykode.com/en/programs/kiddykode-live/creator-live",
    siteName: "KiddyKode",
    images: [
      {
        url: "/kiddykode-og-image.png",
        width: 1024,
        height: 1024,
        alt: "Creator Live — KiddyKode",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Live — KiddyKode",
    description: "Creator Live empowers learners to identify real-world problems, understand the people affected, design meaningful solutions, build innovative projects, and create positive impact.",
    images: ["/kiddykode-og-image.png"],
  },
};

export default function CreatorLiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
