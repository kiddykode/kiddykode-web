'use client';

import { usePathname } from '@/i18n/navigation';
import { UtilityBar } from "./UtilityBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PromoModal } from "./PromoModal";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define standalone pages that should not render header/footer/utility bar
  const isStandalone = pathname === '/programs/yil-campaign' || pathname === '/programs/explorer-live';

  if (isStandalone) {
    return <main className="flex-grow flex flex-col">{children}</main>;
  }

  return (
    <>
      <UtilityBar />
      <Navbar />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
      <PromoModal />
    </>
  );
}
