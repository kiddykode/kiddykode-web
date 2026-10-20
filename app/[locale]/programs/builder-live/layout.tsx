import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Builder Live — KiddyKode",
  description: "From creating projects to building solutions that matter. Builder Live is KiddyKode's live, cohort-based Python and design program for ages 10–14.",
  openGraph: {
    title: "Builder Live — KiddyKode",
    description: "From creating projects to building solutions that matter. Builder Live is KiddyKode's live, cohort-based Python and design program for ages 10–14.",
    url: "https://kiddykode.com/en/programs/builder-live",
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
    title: "Builder Live — KiddyKode",
    description: "From creating projects to building solutions that matter. Builder Live is KiddyKode's live, cohort-based Python and design program for ages 10–14.",
    images: ["/kiddykode-og-image.png"],
  },
};

export default function BuilderLiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
