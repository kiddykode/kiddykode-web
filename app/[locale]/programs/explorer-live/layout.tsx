import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorer Live Session — KiddyKode",
  description: "Give your child more than screen time. Give them the skills to create with technology. Explorer Live Session starts 6 June 2026.",
};

export default function ExplorerLiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
