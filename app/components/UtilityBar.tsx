import Link from "next/link";

export function UtilityBar() {
  return (
    <div className="utility hidden sm:block border-b border-white/5">
      <div className="wrap flex items-center justify-between h-10 gap-6">
        <nav className="flex gap-8 text-[rgba(247,243,236,0.65)] font-medium tracking-tight">
          <Link href="/programs" className="hover:text-white transition-colors duration-200">Apply / Join a Program</Link>
          <Link href="/#partner" className="hover:text-white transition-colors duration-200">Become a School Partner</Link>
          <Link href="/#support" className="hover:text-white transition-colors duration-200">Support the Mission</Link>
          <Link href="/contact" className="hover:text-white transition-colors duration-200">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="lang inline-flex items-center gap-2 text-[rgba(247,243,236,0.65)] text-xs font-mono tracking-widest uppercase before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-[var(--color-accent)] cursor-default hover:text-white transition-colors duration-200">
            EN · FR · SW · AR
          </span>
        </div>
      </div>
    </div>
  );
}
