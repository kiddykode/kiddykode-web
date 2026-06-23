import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KiddyKode Live — Join a Cohort",
  description: "Live, mentor-led online cohorts that turn curiosity into finished projects. Programs for children ages 8–17.",
  openGraph: {
    title: "KiddyKode Live — Join a Cohort",
    description: "Live, mentor-led online cohorts that turn curiosity into finished projects. Programs for children ages 8–17.",
    url: "https://kiddykode.com/en/programs/kiddykode-live",
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
    title: "KiddyKode Live — Join a Cohort",
    description: "Live, mentor-led online cohorts that turn curiosity into finished projects. Programs for children ages 8–17.",
    images: ["/kiddykode-og-image.png"],
  },
};

export default function KiddyKodeLiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
