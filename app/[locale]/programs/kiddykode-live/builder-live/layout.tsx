import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Builder Live — KiddyKode",
  description: "Learners move from creating projects to building solutions that matter. Using Python, project-based learning, and KiddyKode's Human-Centered Design framework.",
  openGraph: {
    title: "Builder Live — KiddyKode",
    description: "Learners move from creating projects to building solutions that matter. Using Python, project-based learning, and KiddyKode's Human-Centered Design framework.",
    url: "https://kiddykode.com/en/programs/kiddykode-live/builder-live",
    siteName: "KiddyKode",
    images: [
      {
        url: "/kiddykode-og-image.png",
        width: 1024,
        height: 1024,
        alt: "Builder Live — KiddyKode",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Builder Live — KiddyKode",
    description: "Learners move from creating projects to building solutions that matter. Using Python, project-based learning, and KiddyKode's Human-Centered Design framework.",
    images: ["/kiddykode-og-image.png"],
  },
};

export default function BuilderLiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
