'use client'

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink-900)] text-[rgba(247,243,236,0.78)] py-20 border-t border-[rgba(247,243,236,0.12)]" data-screen-label="Footer">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr] gap-10">
          <div className="footer-brand">
            <Link href="/" className="logo text-[var(--color-sand-50)]">
              <Image className="logo-img filter brightness-0 invert saturate-0 opacity-90" src="/kiddykode-logo.png" alt="KiddyKode" width={44} height={44} />
            </Link>
            <p className="text-sm leading-relaxed text-[rgba(247,243,236,0.62)] max-w-[32ch] mt-4">
              A continental learning movement teaching Africa's youngest generation to build with code.
            </p>
          </div>
          
          <div className="footer-col">
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(247,243,236,0.5)] m-0 mb-5 font-medium">Programs</h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-sm">
              <li><Link href="/programs">School Programs</Link></li>
              <li><Link href="/programs">Community Clubs</Link></li>
              <li><Link href="/programs">Creator Camps</Link></li>
              <li><Link href="/programs">One-on-One Learning</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(247,243,236,0.5)] m-0 mb-5 font-medium">Movement</h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-sm">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/stories">Stories</Link></li>
              <li><Link href="/#impact">Impact</Link></li>
              <li><Link href="/#chapters">Chapters</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(247,243,236,0.5)] m-0 mb-5 font-medium">Get involved</h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-sm">
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/#partner">Partner With Us</Link></li>
              <li><Link href="/#support">Support the Mission</Link></li>
              <li><Link href="#">Careers</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(247,243,236,0.5)] m-0 mb-5 font-medium">Newsletter</h5>
            <p className="text-sm text-[rgba(247,243,236,0.62)] m-0">One field dispatch a month. No fluff.</p>
            <form className="newsletter flex mt-3.5" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 px-3.5 py-3 bg-[rgba(247,243,236,0.06)] border border-r-0 border-[rgba(247,243,236,0.18)] rounded-l-md text-[var(--color-sand-50)] font-body text-[13px] min-w-0 focus:outline-none placeholder:text-[rgba(247,243,236,0.4)]"
              />
              <button 
                type="submit"
                className="px-4 py-3 bg-[var(--color-accent)] text-[var(--color-ink-900)] border-0 rounded-r-md font-body font-semibold text-[13px] cursor-pointer hover:bg-[var(--color-sand-50)] transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="footer-base mt-16 pt-6 border-t border-[rgba(247,243,236,0.12)] flex justify-between items-center flex-wrap gap-4 text-xs text-[rgba(247,243,236,0.5)] font-mono tracking-[0.04em]">
          <span>© 2026 KiddyKode Foundation · Registered in Lagos, Cape Town & Nairobi</span>
          <nav className="flex gap-5">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Safeguarding</Link>
            <Link href="#">Press</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
