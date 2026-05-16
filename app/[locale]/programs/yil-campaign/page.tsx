// app/[locale]/lp/yil/page.tsx
// YIL Young Innovators Lab — Holiday Tech Bootcamp Landing Page
// Variant C · Direct Response Dark (Manrope + Instrument Serif + Geist Mono)
//
// ───────────────────────────────────────────────────────────────────────────
// SETUP (one-time, in your Next.js project)
// ───────────────────────────────────────────────────────────────────────────
//
// 1. Fonts come from next/font/google (wired below) — no extra deps.
//
// 2. Drop the two assets into /public:
//      public/yil/bootcamp-photo.jpg
//      public/yil/kiddykode-logo.png
//
// 3. Extend your tailwind.config.ts (or convert yil-* classes to arbitrary values
//    if you prefer total isolation):
//
//   theme: {
//     extend: {
//       fontFamily: {
//         'yil-display': ['var(--font-yil-display)', 'system-ui', 'sans-serif'],
//         'yil-sans':    ['var(--font-yil-sans)', 'system-ui', 'sans-serif'],
//         'yil-mono':    ['var(--font-yil-mono)', 'ui-monospace', 'monospace'],
//         'yil-serif':   ['var(--font-yil-serif)', 'serif'],
//       },
//       colors: {
//         'yil-bg':    '#0A0A0A',
//         'yil-card':  '#141414',
//         'yil-card2': '#1A1A1A',
//         'yil-line':  '#262626',
//         'yil-fg':    '#F5F4F0',
//         'yil-fg2':   '#A8A39A',
//         'yil-fg3':   '#6E6A60',
//         'yil-wa':    '#25D366',
//         'yil-wa-dk': '#1FB957',
//         'yil-hi':    '#FFD93B',
//         'yil-hi-dk': '#E0B800',
//         'yil-warn':  '#FF7A45',
//       },
//       letterSpacing: { 'yil-tightish': '-0.018em', 'yil-tighter2': '-0.03em', 'yil-tighter3': '-0.04em' },
//     },
//   },
//
// 4. To hide the main site's Navbar/Footer for this route, add a local
//    `app/[locale]/lp/yil/layout.tsx` that just returns `<>{children}</>`.
//
// ───────────────────────────────────────────────────────────────────────────

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Manrope, Instrument_Serif, Geist_Mono } from "next/font/google";

// === Fonts ===
const display = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-yil-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-yil-sans",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-yil-serif",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-yil-mono",
  display: "swap",
});

// === Constants ===
const WHATSAPP_PHONE = "237680262136";
const DEFAULT_MSG =
  "Hello, I want to reserve a seat for YIL Young Innovators Lab. My child is ___ years old. Please share the next steps.";
const wa = (msg: string = DEFAULT_MSG) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;

const DEADLINE = new Date("2026-06-15T23:59:59+01:00").getTime();
const SESSION1 = new Date("2026-06-29T09:00:00+01:00").getTime();

// === Inline SVGs ===
const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M.06 24l1.69-6.16A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.47 0 12.04 0a11.86 11.86 0 0 1 11.9 11.9c0 6.56-5.33 11.89-11.9 11.89a11.9 11.9 0 0 1-5.69-1.45L.06 24z" />
  </svg>
);

const ArrowRight = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// === Hooks ===
function useCountdown() {
  const [t, set] = useState({ d: "—", h: "—", m: "—", s: "—", mini: "— : — : —", s1Days: 45 });
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, DEADLINE - now);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const dd = String(d).padStart(2, "0");
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      const ss = String(s).padStart(2, "0");
      const s1Days = Math.max(0, Math.ceil((SESSION1 - now) / 86400000));
      set({ d: dd, h: hh, m: mm, s: ss, mini: `${dd}:${hh}:${mm}:${ss}`, s1Days });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// === Reusable bits ===
const Eyebrow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`font-yil-mono text-[11px] tracking-[0.14em] uppercase text-yil-fg2 ${className}`}>{children}</div>
);

const Hi = ({ children }: { children: React.ReactNode }) => (
  // Yellow highlighter — full coverage so dark text stays readable on dark bg
  <span
    className="font-extrabold"
    style={{
      background: "#FFD93B",
      color: "#0A0A0A",
      padding: "2px 5px",
      borderRadius: "4px",
      boxDecorationBreak: "clone",
      WebkitBoxDecorationBreak: "clone",
      boxShadow: "0 1px 0 rgba(0,0,0,.08) inset",
    } as React.CSSProperties}
  >
    {children}
  </span>
);

const HiLine = ({ children }: { children: React.ReactNode }) => (
  <span className="text-yil-hi font-bold">{children}</span>
);

const Check = ({ tone = "wa" }: { tone?: "wa" | "hi" }) => (
  <span
    className={`inline-flex h-[18px] w-[18px] rounded-full items-center justify-center shrink-0 text-[12px] font-black ${
      tone === "hi" ? "bg-yil-hi text-yil-bg" : "bg-yil-wa text-[#062B16]"
    }`}
  >
    ✓
  </span>
);

const PhotoPlaceholder = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative overflow-hidden border border-yil-line ${className}`}
    style={{
      background:
        "linear-gradient(135deg, rgba(255,217,59,.06), rgba(37,211,102,.06)), repeating-linear-gradient(135deg, #1a1a1a 0 8px, #161616 8px 16px)",
    }}
  >
    <div className="absolute left-2.5 bottom-2.5 font-yil-mono text-[10px] tracking-[0.12em] uppercase text-yil-fg2 bg-yil-bg/85 border border-yil-line px-2 py-1 rounded">
      Replace with real photo
    </div>
  </div>
);

const PressLogo = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span
    className={`inline-flex items-center h-[38px] px-3.5 border border-yil-line rounded-md bg-yil-card font-bold tracking-tight text-yil-fg ${className}`}
  >
    {children}
  </span>
);

// ───────────────────────────────────────────────────────────────────────────
// PAGE
// ───────────────────────────────────────────────────────────────────────────
export default function YILLandingPage() {
  const cd = useCountdown();

  return (
    <div
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable} yil-landing font-yil-sans bg-yil-bg text-yil-fg antialiased`}
      style={{ colorScheme: "dark" }}
      id="top"
    >
      {/* ================= STICKY TOP BAR ================= */}
      <header className="sticky top-0 z-40 bg-yil-bg/95 backdrop-blur border-b border-yil-line">
        <div className="bg-yil-warn/15 border-b border-yil-warn/30">
          <div className="mx-auto max-w-[1200px] px-4 lg:px-6 h-8 flex items-center justify-center gap-3 font-yil-mono text-[11px] text-yil-warn">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-yil-warn animate-[yilpulseHi_2.2s_infinite]" />
            <span className="font-bold">REGISTER BEFORE MIDNIGHT, JUNE 15</span>
            <span className="hidden sm:inline opacity-80">to get a 10,000 FCFA discount</span>
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6 h-14 flex items-center gap-3">
          <a href="#top" className="flex items-center gap-2 shrink-0">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-yil-hi text-yil-bg font-extrabold text-[16px] leading-none">YIL</span>
            <span className="text-yil-fg2 font-medium hidden sm:inline">Young Innovators Lab</span>
          </a>
          <div className="hidden md:flex items-center gap-3 mx-auto text-[12.5px] text-yil-fg2">
            <span>Ages 10–18</span>
            <span className="text-yil-fg3">·</span>
            <span>Yaoundé · Rebase, Obobogo</span>
            <span className="text-yil-fg3">·</span>
            <span className="text-yil-hi font-semibold">Limited seats remaining</span>
          </div>
          <a
            href={wa()}
            target="_blank"
            rel="noopener"
            className="hidden md:inline-flex yil-btn-wa items-center gap-2 rounded-md px-4 py-2 text-[13px] font-extrabold"
          >
            <WhatsAppIcon className="h-4 w-4" />
            RESERVE — 65,000 FCFA
          </a>
          <a
            href={wa()}
            target="_blank"
            rel="noopener"
            aria-label="Reserve on WhatsApp"
            className="md:hidden yil-btn-wa inline-flex items-center justify-center rounded-md h-9 w-9"
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main>
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative mx-auto max-w-[1100px] px-4 lg:px-6 pt-16 lg:pt-24 pb-12 text-center">
            <div className="inline-flex items-center gap-2 text-[12.5px] font-yil-mono uppercase tracking-[.14em] text-yil-warn">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-yil-warn animate-[yilpulseHi_2.2s_infinite]" />
              Holiday Tech Bootcamp · Yaoundé
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-yil-warn animate-[yilpulseHi_2.2s_infinite]" />
            </div>

            <h1 className="mt-5 font-extrabold tracking-yil-tighter2 text-[34px] leading-[1.08] sm:text-[44px] lg:text-[58px] lg:leading-[1.04] max-w-[22ch] mx-auto">
              Give your child a holiday that <Hi>teaches, builds, and inspires</Hi>
            </h1>
            <p className="mt-5 text-[15.5px] lg:text-[17px] text-yil-fg2 max-w-[58ch] mx-auto leading-[1.55]">
              A premium holiday bootcamp by YIL Young Innovators Lab with Kiddykode and PlastiBytes for 10–18-year-olds in Yaoundé who want to spend their holiday <HiLine>building things</HiLine>, not scrolling.
            </p>

            {/* Trust list */}
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[760px] mx-auto text-left">
              {[
                <><HiLine>A working Python project</HiLine> they can demo at home</>,
                <>Real circuits, sensors and <HiLine>microcontrollers</HiLine></>,
                <>Pitch Day on stage — <HiLine>slides + project + story</HiLine></>,
                <>Certified <HiLine>CPR training</HiLine> included (life skill bonus)</>,
                <>50-seat cap per session — <HiLine>small group attention</HiLine></>,
                <>No prior coding experience required</>,
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px]">
                  <span className="mt-0.5"><Check /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Facts box */}
            <div className="mt-8 inline-grid grid-cols-2 sm:grid-cols-4 gap-px bg-yil-line border border-yil-line rounded-xl overflow-hidden text-left">
              {[
                { icon: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>, k: "Session 01", v: "Jun 29 – Jul 25" },
                { icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>, k: "4 weeks", v: "Mon — Fri" },
                { icon: <><path d="M3 7h18v12H3zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></>, k: "Capacity", v: "50 seats / session" },
                { icon: <><path d="M12 21s-7-6-7-12a7 7 0 0114 0c0 6-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>, k: "Venue", v: "Rebase, Obobogo" },
              ].map((f) => (
                <div key={f.k} className="bg-yil-card px-4 py-3 flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-yil-hi" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {f.icon}
                  </svg>
                  <div>
                    <Eyebrow className="!text-[10px]">{f.k}</Eyebrow>
                    <div className="text-[13px] font-bold leading-tight">{f.v}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Facts box */}
            <div className="mt-8 inline-grid grid-cols-2 sm:grid-cols-4 gap-px bg-yil-line border border-yil-line rounded-xl overflow-hidden text-left">
              {[
                { icon: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>, k: "Session 02", v: "Aug 3 – Aug 29" },
                { icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>, k: "4 weeks", v: "Mon — Fri" },
                { icon: <><path d="M3 7h18v12H3zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></>, k: "Capacity", v: "50 seats / session" },
                { icon: <><path d="M12 21s-7-6-7-12a7 7 0 0114 0c0 6-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>, k: "Venue", v: "Rebase, Obobogo" },
              ].map((f) => (
                <div key={f.k} className="bg-yil-card px-4 py-3 flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-yil-hi" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {f.icon}
                  </svg>
                  <div>
                    <Eyebrow className="!text-[10px]">{f.k}</Eyebrow>
                    <div className="text-[13px] font-bold leading-tight">{f.v}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo card */}
            <div className="mt-10 max-w-[760px] mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-yil-line">
                <Image
                  src="/yil/bootcamp-photo.jpg"
                  alt="Students at YIL building circuits and writing code together"
                  width={1520}
                  height={1000}
                  className="w-full h-auto block"
                  priority
                />
                <div className="absolute left-3 right-3 bottom-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="bg-yil-bg/80 backdrop-blur px-3 py-2 rounded-md border border-yil-line">
                    <Eyebrow className="!text-[10px]">Pitch Day</Eyebrow>
                    <div className="text-[13px] font-extrabold">14 projects shipped</div>
                  </div>
                  <div className="bg-yil-bg/80 backdrop-blur px-3 py-2 rounded-md border border-yil-line">
                    <Eyebrow className="!text-[10px]">Session 02</Eyebrow>
                    <div className="text-[13px] font-extrabold">Aug 2025</div>
                  </div>
                  <div className="hidden sm:block bg-yil-hi text-yil-bg px-3 py-2 rounded-md">
                    <div className="text-[10px] font-yil-mono uppercase tracking-wider">SESSION 01</div>
                    <div className="text-[13px] font-extrabold leading-tight">Starts in {cd.s1Days} days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="mt-8 flex flex-col items-center gap-3" id="reserve">
              <a
                href={wa()}
                target="_blank"
                rel="noopener"
                className="yil-btn-wa inline-flex items-center justify-center gap-3 rounded-xl px-8 py-5 text-[16px] sm:text-[18px] font-extrabold tracking-yil-tightish max-w-md w-full"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yil-bg/15">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                Reserve a seat on WhatsApp
                <ArrowRight />
              </a>
              <div className="font-yil-mono text-[11px] text-yil-fg2">
                FEE · <b className="text-yil-fg">75,000 FCFA</b>
              </div>
              <div className="font-yil-mono text-[11px] text-yil-fg2">
                Early Bird · <b className="text-yil-fg">65,000 FCFA</b> · Save <b className="text-yil-hi">10,000 FCFA</b> · Ends in <span className="text-yil-hi font-bold font-yil-mono">{cd.mini}</span>
              </div>
              <a href="#program" className="mt-1 text-[13px] text-yil-fg2 hover:text-yil-fg underline underline-offset-4 decoration-yil-fg3">
                See program details ↓
              </a>
            </div>

            {/* Bonus banner */}
            {/* <div className="mt-7 inline-flex items-center gap-2 bg-yil-warn/10 border border-yil-warn/30 rounded-md px-4 py-2 text-[12.5px]">
              <span className="text-yil-warn font-bold font-yil-mono">🎁 BONUSES WORTH 25,000 FCFA</span>
              <span className="text-yil-fg2">if you reserve before midnight June 15</span>
            </div> */}
          </div>

          {/* Wavy divider */}
          <div
            className="opacity-80"
            style={{
              height: "18px",
              backgroundImage:
                "radial-gradient(circle at 5px 12px, #262626 1.5px, transparent 1.5px), radial-gradient(circle at 15px 6px, #262626 1.5px, transparent 1.5px)",
              backgroundSize: "20px 18px",
            }}
          />
        </section>

        {/* ================= PRESS / PARTNERS STRIP ================= */}
        <section className="border-y border-yil-line bg-yil-card2">
          <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-8">
            <div className="text-center font-yil-mono text-[11px] tracking-[0.14em] uppercase text-yil-fg2 mb-5">
              A YIL programme · In partnership with
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <PressLogo>
                <Image src="/yil/kiddykode-logo.png" alt="Kiddykode" width={28} height={28} className="h-7 w-7 rounded-full object-cover mr-2" />
                <span>Kiddykode</span>
              </PressLogo>
              <PressLogo>
                <Image src="/yil/PlastiBytes-logo.png" alt="Kiddykode" width={28} height={28} className="h-7 w-7 rounded-full object-cover mr-2" />
                <span>PlastiBytes</span>
              </PressLogo>
              <PressLogo>
                <Image src="/yil/Rebase-logo.png" alt="Kiddykode" width={28} height={28} className="h-7 w-7 rounded-full object-cover mr-2" />
                <span>Rebase Yaoundé</span>
              </PressLogo>
              <PressLogo className="opacity-70">
                <Image src="/yil/Robosave-logo.jpeg" alt="Robosave" width={28} height={28} className="h-7 w-7 rounded-full object-cover mr-2" />
                <span className="italic font-yil-serif text-[15px] text-yil-fg">Cameroon Tribune</span>
              </PressLogo>
              <PressLogo className="opacity-70">
                <Image src="/yil/HIVC-logo.png" alt="HIVC" width={28} height={28} className="h-7 w-7 rounded-full object-cover mr-2" />
                <span className="font-semibold text-yil-fg">237 Tech Network</span>
              </PressLogo>
            </div>
          </div>
        </section>

        {/* ================= WHY JOIN ================= */}
        <section id="program" className="relative bg-white text-black">
          <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
            <h2 className="text-center font-extrabold tracking-yil-tighter2 text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-black">
              Why parents <Hi>choose YIL</Hi> for the holidays
            </h2>
            <p className="mt-3 text-center text-gray-600 max-w-[58ch] mx-auto text-[15px]">
              Most holiday programmes try to entertain. We&apos;re built to <span className="text-yil-hi-dk font-bold">teach</span>, with a structure, a curriculum, and a deliverable at the end.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {[
                {
                  tone: "wa",
                  icon: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
                  t: "Real Python coding",
                  d: <>From <span className="text-yil-hi-dk font-bold">zero to a working program</span> they can demo and explain. Not blocks, real code.</>,
                },
                {
                  tone: "hi",
                  icon: <><rect x="3" y="8" width="18" height="10" rx="1" /><path d="M7 12h2M11 12h2M15 12h2M7 5v3M17 5v3" /></>,
                  t: "Hands-on electronics",
                  d: <>Breadboards, sensors, microcontrollers. They learn <span className="text-yil-hi-dk font-bold">how systems actually work</span>.</>,
                },
                {
                  tone: "warn",
                  icon: <><path d="M3 12l3 3 4-4 4 4 5-7" /><path d="M3 19h18" /></>,
                  t: "Real-world problem solving",
                  d: <>Challenges with <span className="text-yil-hi-dk font-bold">no single answer</span> — they learn to think, not memorise.</>,
                },
                {
                  tone: "wa",
                  icon: <><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M21 21v-2a4 4 0 00-3-3.87" /><path d="M17 3.13A4 4 0 0117 11" /></>,
                  t: "Teamwork & leadership",
                  d: <>They build in small teams — <span className="text-yil-hi-dk font-bold">leading, supporting, disagreeing well</span>.</>,
                },
                {
                  tone: "hi",
                  icon: <><rect x="3" y="3" width="18" height="14" rx="1" /><path d="M8 21h8M12 17v4" /></>,
                  t: "Pitch Day on stage",
                  d: <>Every child presents — slides, project, story. <span className="text-yil-hi-dk font-bold">Parents are in the room.</span></>,
                },
                {
                  tone: "warn",
                  icon: <path d="M12 21s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z" />,
                  t: "CPR certification",
                  d: <>Every cohort gets a <span className="text-yil-hi-dk font-bold">certified CPR training session</span> — a real life skill.</>,
                },
              ].map((c) => {
                const toneClass =
                  c.tone === "wa"
                    ? "bg-yil-wa/15 text-yil-wa"
                    : c.tone === "hi"
                    ? "bg-yil-hi/20 text-yil-hi"
                    : "bg-yil-warn/15 text-yil-warn";
                return (
                  <div key={c.t} className="yil-card-lift bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${toneClass}`}>
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          {c.icon}
                        </svg>
                      </span>
                      <h3 className="font-bold tracking-yil-tightish text-[15px] text-black">{c.t}</h3>
                    </div>
                    <p className="mt-3 text-[13.5px] text-gray-600 leading-relaxed">{c.d}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 border border-gray-200 rounded-xl p-5 bg-gray-50 flex flex-col sm:flex-row items-center gap-4">
              <div className="text-[13px] font-yil-mono uppercase tracking-[.14em] text-yil-warn bg-yil-warn/10 border border-yil-warn/30 px-2 py-1 rounded">⚠ Specially Designed</div>
              <div className="text-[14.5px] text-black flex-1 text-center sm:text-left">
                For <span className="text-yil-hi-dk font-bold">serious parents</span> who want a productive holiday — and a child who can show real skills by September.
              </div>
            </div>
          </div>
        </section>

        {/* ================= NEWS-STYLE SOCIAL PROOF ================= */}
        <section className="bg-yil-card2 border-y border-yil-line">
          <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
            <h2 className="text-center font-extrabold tracking-yil-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
              <HiLine>Kids who can</HiLine> solve problems <Hi>will stand out</Hi>
            </h2>
            <p className="mt-3 text-center text-yil-fg2 max-w-[58ch] mx-auto text-[15px]">
              The earliest opportunities are going to young people who can already <HiLine>think design,code and present</HiLine>. Africa&apos;s pipeline is being built right now.
            </p>

            {/* Stats */}
            <div className="mt-10 grid sm:grid-cols-3 gap-3">
              {[
                { n: "230M+", d: <>Young Africans needing digital skills <span className="text-yil-fg2">— ITU, 2025</span></> },
                { n: "3.5M", d: <>Tech jobs forecast across Africa by 2030 <span className="text-yil-fg2">— Google / IFC</span></> },
                { n: "5×", d: <>Higher employability for tech-literate graduates <span className="text-yil-fg2">— World Bank</span></> },
              ].map((s, i) => (
                <div key={i} className="bg-yil-card border border-yil-line rounded-xl p-5 text-center">
                  <div className="font-yil-serif italic text-[36px] leading-none">{s.n}</div>
                  <div className="mt-2 text-[13.5px] text-yil-fg2">{s.d}</div>
                </div>
              ))}
            </div>

            {/* News cards */}
            <div className="mt-8 grid md:grid-cols-3 gap-3">
              {[
                { name: <span className="font-yil-serif italic">Cameroon Tribune</span>, quote: "\u201CCameroon's youth must master coding to compete in the new African digital market.\u201D", tag: "Education · 2025" },
                { name: <span>Jeune Afrique</span>, quote: "\u201CAfrica's next wave of founders is being trained right now — at 14, not 24.\u201D", tag: "Innovation · 2025" },
                { name: <span className="font-extrabold">TechCabal</span>, quote: "\u201CHands-on bootcamps are out-performing traditional CS curricula for early-stage learners.\u201D", tag: "Skills · 2025" },
              ].map((n, i) => (
                <article key={i} className="bg-yil-card border border-yil-line rounded-[10px] overflow-hidden">
                  <div className="bg-white text-yil-bg px-2.5 py-1.5 font-extrabold text-[12px] tracking-tight border-b border-[#ddd] flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 bg-yil-warn rounded-full" />
                    {n.name}
                  </div>
                  <div className="p-4">
                    <div className="text-[13.5px] font-bold leading-snug">{n.quote}</div>
                    <div className="mt-2 text-[11.5px] text-yil-fg2 font-yil-mono uppercase tracking-wider">{n.tag}</div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-3 text-center text-[11px] font-yil-mono text-yil-fg3 tracking-wider">
              REPRESENTATIVE COVERAGE · LANDSCAPE OVERVIEW · NOT YIL ENDORSEMENTS
            </div>

            <div className="mt-10 text-center">
              <a
                href={wa()}
                target="_blank"
                rel="noopener"
                className="yil-btn-warn inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-[15px] font-extrabold"
              >
                Reserve before midnight · 65,000 FCFA
                <ArrowRight className="h-4 w-4" />
              </a>
              <div className="mt-2 font-yil-mono text-[11px] text-yil-fg2">Register before midnight, June 15 — to unlock bonuses worth 10,500 FCFA</div>
            </div>
          </div>
        </section>

        {/* ================= IS THIS FOR YOU ================= */}
        <section className="bg-white text-black">
          <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
            <h2 className="text-center font-extrabold tracking-yil-tighter2 text-[28px] sm:text-[36px] leading-[1.1] text-black">
              Is this bootcamp <Hi>for your child</Hi>?
            </h2>
            <p className="mt-3 text-center text-gray-600 max-w-[60ch] mx-auto text-[15px]">
              In 4 weeks, your child will learn <span className="text-yil-hi-dk font-bold">six concrete skills</span> they&apos;ll carry into school, college and a future career.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { tone: "wa", icon: <path d="M8 4l-5 8 5 8M16 4l5 8-5 8M14 4l-4 16" />, t: "Coding in Python", d: "Variables, loops, functions, a working program by week 2." },
                { tone: "hi", icon: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>, t: "Electronics & circuits", d: "Real breadboards, sensors and microcontrollers — wired by hand." },
                { tone: "warn", icon: <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" />, t: "Prototyping", d: "From idea sketch to working build — they ship a real prototype." },
                { tone: "wa", icon: <><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" /><circle cx="10" cy="7" r="4" /></>, t: "Teamwork & leadership", d: "Group challenges, retros, clear communication under pressure." },
                { tone: "hi", icon: <><rect x="3" y="4" width="18" height="14" rx="1" /><path d="M8 22h8M12 18v4" /></>, t: "Pitch Day mastery", d: "Slides, story, demo — they own the stage in front of parents." },
                { tone: "warn", icon: <path d="M12 21s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z" />, t: "CPR + life skill", d: "A certified session that stays with them — beyond the bootcamp." },
              ].map((s) => {
                const toneClass =
                  s.tone === "wa"
                    ? "bg-yil-wa/15 text-yil-wa"
                    : s.tone === "hi"
                    ? "bg-yil-hi/20 text-yil-hi"
                    : "bg-yil-warn/15 text-yil-warn";
                return (
                  <div key={s.t} className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${toneClass}`}>
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                        {s.icon}
                      </svg>
                    </div>
                    <h3 className="mt-4 font-bold text-[15.5px] text-black">{s.t}</h3>
                    <p className="mt-1.5 text-[13px] text-gray-600">{s.d}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <a
                href={wa()}
                target="_blank"
                rel="noopener"
                className="yil-btn-warn inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-[15px] font-extrabold"
              >
                Reserve before midnight · 65,000 FCFA
              </a>
              <div className="mt-2 font-yil-mono text-[11px] text-gray-500">
                Early Bird ends in <span className="text-yil-hi-dk font-bold">{cd.mini}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COUNTDOWN BANNER ================= */}
        <section className="bg-yil-card2 border-y border-yil-line">
          <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 text-center">
            <div className="inline-block bg-yil-bg border border-yil-line rounded-xl px-6 py-5">
              <Eyebrow className="!text-yil-hi">REGISTER BEFORE MIDNIGHT · JUNE 15, 2026</Eyebrow>
              <div className="mt-1 text-[18px] sm:text-[22px] font-extrabold">
                To Unlock All Bonuses Worth <Hi>25,000 FCFA</Hi>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2 max-w-md mx-auto">
                {[
                  { v: cd.d, l: "DAYS" },
                  { v: cd.h, l: "HOURS" },
                  { v: cd.m, l: "MINUTES" },
                  { v: cd.s, l: "SECONDS", hi: true },
                ].map((u) => (
                  <div key={u.l} className="bg-yil-card border border-yil-line rounded-md py-3">
                    <div className={`font-extrabold text-[28px] sm:text-[32px] leading-none font-yil-mono ${u.hi ? "text-yil-hi" : ""}`}>{u.v}</div>
                    <div className="font-yil-mono text-[10px] text-yil-fg2 mt-1">{u.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= BONUSES ================= */}
        {/* 
        <section className="bg-white text-black">
          <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
            <h2 className="text-center font-extrabold tracking-yil-tighter2 text-[28px] sm:text-[36px] leading-[1.1] text-black">
              Reserve today, get <Hi>3 bonuses worth 25,000 FCFA</Hi> — free
            </h2>
            <p className="mt-3 text-center text-gray-600 max-w-[58ch] mx-auto text-[15px]">
              Only for parents who reserve before <span className="text-yil-hi-dk font-bold">midnight, June 15</span>.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { n: "BONUS 01", t: "80+ Python starter projects", d: "A curated pack your child keeps after the bootcamp — to keep building all year.", v: "10,000 FCFA", icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></> },
                { n: "BONUS 02", t: "Pitch Day deck templates", d: "The exact slide templates our top students used — they'll use these again at school.", v: "7,500 FCFA", icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 8h10M7 12h10M7 16h6" /></> },
                { n: "BONUS 03", t: "Certified CPR training", d: "A real-world life skill — every child leaves with a recognised CPR certification.", v: "7,500 FCFA", icon: <><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></> },
              ].map((b) => (
                <div key={b.n} className="relative bg-white border border-gray-200 rounded-xl p-5 yil-card-lift">
                  <span className="yil-stamp">FREE</span>
                  <Eyebrow className="!text-gray-500">{b.n}</Eyebrow>
                  <div className="mt-4 h-32 yil-photo-ph rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-yil-hi-dk/80" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {b.icon}
                    </svg>
                  </div>
                  <h3 className="mt-4 font-extrabold text-[16px] tracking-yil-tightish text-black">{b.t}</h3>
                  <p className="mt-2 text-[13px] text-gray-600">{b.d}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
                    <div className="text-[12px] text-gray-500 font-yil-mono">VALUED AT</div>
                    <div className="font-extrabold text-yil-hi-dk">{b.v}</div>
                  </div>
                </div>
              ))}
            </div>

            Total Section (Commented out)
            <div className="mt-8 max-w-md mx-auto bg-white border border-yil-hi/50 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-[13.5px] text-gray-600">Bonus value</div>
                <div className="font-extrabold text-black">25,000 FCFA</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-[13.5px] text-gray-600">Bootcamp price (Early Bird)</div>
                <div className="font-extrabold text-black">65,000 FCFA</div>
              </div>
              <div
                className="my-3"
                style={{
                  height: "1px",
                  backgroundImage: "linear-gradient(90deg, rgba(0,0,0,.1) 0 8px, transparent 8px 16px)",
                  backgroundSize: "16px 1px",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "center",
                }}
              />
              <div className="flex items-center justify-between">
                <div className="text-[14px] text-black">You pay today</div>
                <div className="text-yil-hi-dk font-extrabold text-[24px]">65,000 FCFA</div>
              </div>
              <div className="mt-2 text-[12px] text-gray-500 font-yil-mono text-center">
                YOU SAVE <b className="text-yil-hi-dk">35,000 FCFA</b> (bonus + Early Bird discount)
              </div>
            </div>
          </div>
        </section>
        */}

        {/* ================= CERTIFICATE PREVIEW ================= */}
        <section className="bg-yil-card2 border-y border-yil-line">
          <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
            <h2 className="text-center font-extrabold tracking-yil-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
              Your child&apos;s name on a <Hi>YIL completion certificate</Hi>
            </h2>
            <p className="mt-3 text-center text-yil-fg2 max-w-[58ch] mx-auto text-[15px]">
              Awarded on Pitch Day. Recognised by Kiddykode and PlastiBytes. A real artifact for school portfolios and future internships.
            </p>

            <div className="mt-10 max-w-2xl mx-auto yil-cert rounded-2xl p-6 lg:p-10 relative border border-yil-fg3/30">
              <div className="relative">
                <div className="text-center">
                  <Eyebrow className="!text-yil-fg3">YIL · Young Innovators Lab</Eyebrow>
                  <div className="mt-3 font-yil-serif italic text-[34px] sm:text-[44px] leading-[0.95]">Certificate of Completion</div>
                  <div className="mt-2 text-[12px] font-yil-mono uppercase tracking-[.14em] text-yil-fg3">Issued · Yaoundé, 2026</div>
                </div>
                <div className="mt-8 text-center">
                  <div className="text-[12px] text-yil-fg3 font-yil-mono uppercase tracking-wider">Awarded to</div>
                  <div className="mt-3 font-yil-serif italic text-[28px] sm:text-[36px] leading-none border-b-2 border-yil-bg/25 pb-3 max-w-md mx-auto">[ Your child&apos;s name ]</div>
                  <p className="mt-5 text-[13.5px] text-yil-bg/80 max-w-[44ch] mx-auto leading-relaxed">
                    for the successful completion of the 4-week YIL Holiday Tech Bootcamp — coding, electronics, Design Thinking and Pitch Day.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between gap-4">
                  <div className="text-left flex-1 max-w-[160px]">
                    <div className="font-yil-serif italic text-[20px]">Aditya / YIL</div>
                    <div className="text-[10px] font-yil-mono uppercase tracking-wider text-yil-fg3">Lead Instructor</div>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-yil-bg/10 border border-yil-bg/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-yil-bg/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="9" r="5" />
                      <path d="M8 14l-2 7 6-3 6 3-2-7" />
                    </svg>
                  </div>
                  <div className="text-right flex-1 max-w-[160px]">
                    <div className="font-yil-serif italic text-[20px]">YIL Faculty</div>
                    <div className="text-[10px] font-yil-mono uppercase tracking-wider text-yil-fg3">Programme Director</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <a
                href={wa()}
                target="_blank"
                rel="noopener"
                className="yil-btn-wa inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-[15px] font-extrabold"
              >
                <WhatsAppIcon />
                Reserve seat & earn certificate
              </a>
            </div>
          </div>
        </section>

        {/* ================= MENTORS ================= */}
        <section className="bg-white text-black">
          <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
            <h2 className="text-center font-extrabold tracking-yil-tighter2 text-[28px] sm:text-[36px] leading-[1.1] text-black">
              Know your <Hi>mentors</Hi>
            </h2>
            <p className="mt-3 text-center text-gray-600 max-w-[58ch] mx-auto text-[15px]">
              Working engineers from Kiddykode and PlastiBytes — small-group ratios so every question gets answered.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-5">
              {[
                {
                  role: "Lead Instructor",
                  name: "Chiella Harriet",
                  img: "https://res.cloudinary.com/dsbm73ojs/image/upload/v1778875749/Untitled_design_samdro.png",
                  bullets: ["Kiddykode co-founder · 8+ years teaching", "Python · electronics · Design Thinking"],
                  bio: <>Hi, I&apos;m leading the YIL programme this year. I&apos;ve taught over 600 students in Cameroon — I know how to take a beginner to a working project in 4 weeks. <span className="text-yil-hi-dk font-bold">Come build with us.</span></>,
                },
                {
                  role: "Programme Director",
                  name: "[ Mentor Name 02 ]",
                  bullets: ["PlastiBytes engineer · electronics specialist", "Circuits · microcontrollers · Pitch Day coaching"],
                  bio: <>I&apos;ll be running the electronics and prototyping track. We work with real components — what your child builds at YIL <span className="text-yil-hi-dk font-bold">is theirs to take home</span>.</>,
                },
              ].map((m: any) => (
                <article key={m.name} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-5">
                  {m.img ? (
                    <div className="relative w-full sm:w-44 aspect-square sm:aspect-auto sm:h-52 shrink-0 rounded-xl overflow-hidden border border-gray-200">
                      <Image
                        src={m.img}
                        alt={m.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <PhotoPlaceholder className="rounded-xl w-full sm:w-44 aspect-square sm:aspect-auto sm:h-52 shrink-0" />
                  )}
                  <div className="flex-1">
                    <Eyebrow className="!text-yil-hi-dk">{m.role}</Eyebrow>
                    <h3 className="mt-2 font-extrabold text-[20px] tracking-yil-tightish text-black">{m.name}</h3>
                    <ul className="mt-3 space-y-1.5 text-[13.5px] text-gray-600">
                      {m.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-0.5"><Check tone="hi" /></span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[13px] text-gray-600 leading-relaxed">{m.bio}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 bg-yil-card2 border border-yil-line rounded-xl p-4">
              <div className="text-center font-yil-mono text-[11px] tracking-[.14em] uppercase text-yil-fg2 mb-3">PROGRAMME RUN BY</div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <PressLogo>
                  <Image src="/yil/kiddykode-logo.png" alt="Kiddykode" width={28} height={28} className="h-7 w-7 rounded-full object-cover mr-2" />
                  <span>Kiddykode</span>
                </PressLogo>
                <PressLogo>
                  <Image src="/yil/PlastiBytes-logo.png" alt="PlastiBytes" width={28} height={28} className="h-7 w-7 rounded-full object-cover mr-2" />
                  <span className="text-yil-fg">PlastiBytes</span>
                </PressLogo>
                <PressLogo>
                  <Image src="/yil/Rebase-logo.png" alt="Rebase" width={28} height={28} className="h-7 w-7 rounded-full object-cover mr-2" />
                  <span className="text-yil-fg">Rebase Yaoundé</span>
                </PressLogo>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SESSIONS + PRICING ================= */}
        <section className="bg-yil-card2 border-y border-yil-line">
          <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
            <h2 className="text-center font-extrabold tracking-yil-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
              Pick your <Hi>session & lock the price</Hi>
            </h2>
            <p className="mt-3 text-center text-yil-fg2 max-w-[58ch] mx-auto text-[15px]">
              Two identical 4-week sessions — pick what works around your family&apos;s plans. Each is capped at 50 children for real focus.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-4">
              {[
                {
                  tag: "SESSION 01",
                  title: "Jun 29 — Jul 25",
                  msg: "Hello, I want to reserve a seat for YIL Session 1 (June 29 – July 25). My child is ___ years old. Please share the next steps.",
                  cta: "Ask about Session 01",
                  bullets: ["Ages 10–18 · Mon–Fri", "Rebase, Obobogo · 50 seats max", "Python, electronics, Design Thinking, Pitch Day"],
                  badge: (
                    <span className="inline-flex items-center gap-1.5 bg-yil-hi text-yil-bg px-2 py-0.5 font-yil-mono text-[10px] font-extrabold tracking-wider">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-yil-bg animate-[yilpulseHi_2.2s_infinite]" />
                      STARTS IN {cd.s1Days}D
                    </span>
                  ),
                },
                {
                  tag: "SESSION 02",
                  title: "Aug 3 — 29",
                  msg: "Hello, I want to reserve a seat for YIL Session 2 (August 3 – 29). My child is ___ years old. Please share the next steps.",
                  cta: "Ask about Session 02",
                  bullets: ["Ages 10–18 · Mon–Fri", "Rebase, Obobogo · 50 seats max", "Same curriculum · perfect for August travel"],
                  badge: (
                    <span className="inline-flex items-center gap-1.5 border border-yil-line px-2 py-0.5 font-yil-mono text-[10px] font-extrabold tracking-wider text-yil-fg2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-yil-fg2" />
                      SEATS OPEN
                    </span>
                  ),
                },
              ].map((s) => (
                <article key={s.tag} className="bg-yil-card border border-yil-line rounded-xl p-5 yil-card-lift">
                  <div className="flex items-start justify-between">
                    <Eyebrow>{s.tag}</Eyebrow>
                    {s.badge}
                  </div>
                  <h3 className="mt-3 font-extrabold text-[28px] tracking-yil-tighter2">{s.title}</h3>
                  <ul className="mt-4 space-y-1.5 text-[13.5px] text-yil-fg2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <span className="mt-0.5"><Check /></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={wa(s.msg)}
                    target="_blank"
                    rel="noopener"
                    className="mt-5 yil-btn-wa flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[14px] font-extrabold"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {s.cta}
                  </a>
                </article>
              ))}
            </div>

            {/* Price block */}
            <div className="mt-8 max-w-2xl mx-auto bg-yil-card border-2 border-yil-hi rounded-2xl p-6 lg:p-8 text-center relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yil-hi text-yil-bg px-3 py-1 rounded-full font-yil-mono text-[11px] font-extrabold tracking-wider">EARLY BIRD · SAVE 10,000 FCFA</span>
              <Eyebrow>Total today</Eyebrow>
              <div className="mt-2 flex items-baseline justify-center gap-3">
                <div className="font-extrabold tracking-yil-tighter3 text-[60px] sm:text-[80px] leading-none">65,000</div>
                <div className="text-yil-fg2 text-[16px] font-bold">FCFA</div>
                <div className="text-yil-fg3 text-[18px] line-through decoration-yil-fg3 font-yil-mono">75,000</div>
              </div>
              <p className="mt-3 text-[13.5px] text-yil-fg2">Per child · full 4-week session · all materials · all bonuses · CPR certification</p>

              <a
                href={wa()}
                target="_blank"
                rel="noopener"
                className="mt-6 yil-btn-wa inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl px-8 py-5 text-[16px] sm:text-[18px] font-extrabold"
              >
                Reserve on WhatsApp now
                <ArrowRight />
              </a>
              <div className="mt-3 text-[12px] text-yil-fg2 font-yil-mono">PAY ONCE · MOBILE MONEY / CASH · WRITTEN CONFIRMATION</div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section>
          <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
            <h2 className="text-center font-extrabold tracking-yil-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
              How to reserve in <Hi>3 simple steps</Hi>
            </h2>

            <div className="mt-10 grid md:grid-cols-3 gap-3">
              {[
                { n: "01", t: "Tap WhatsApp", d: "Click any green button. Your message is pre-filled — edit your child's age only." },
                { n: "02", t: "Pick a session", d: "We confirm the session, send a written summary and a parent pack." },
                { n: "03", t: "Complete payment", d: "Full payment locks the seat. Receipt + welcome pack arrive the same day." },
              ].map((step) => (
                <div key={step.n} className="bg-yil-card border border-yil-line rounded-xl p-5 text-center">
                  <div className="font-extrabold text-yil-hi text-[44px] leading-none tracking-yil-tighter3">{step.n}</div>
                  <h3 className="mt-3 font-bold text-[16px]">{step.t}</h3>
                  <p className="mt-2 text-[13px] text-yil-fg2">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="bg-white text-black border-y border-gray-200">
          <div className="mx-auto max-w-[860px] px-4 lg:px-6 py-16 lg:py-20">
            <h2 className="text-center font-extrabold tracking-yil-tighter2 text-[28px] sm:text-[36px] leading-[1.1] text-black">
              Frequently <Hi>asked</Hi> questions
            </h2>
            <p className="mt-3 text-center text-gray-600 max-w-[58ch] mx-auto text-[15px]">
              Anything not covered? Send a WhatsApp — we usually reply within an hour.
            </p>

            <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
              {[
                { q: "Does my child need prior coding experience?", a: "No. The curriculum starts from zero — variables, logic, then their first working program. Children with experience get stretched further by instructors on day one." },
                { q: "Is it really for complete beginners?", a: "Yes. About 70% of our students have never written a line of code. Instructors teach from absolute zero, in clear language, with real projects on day two." },
                { q: "What ages exactly? My child is 10.", a: "10 to 18. We split the cohort into two age groups (10–13 and 14–18) so the pace fits — same curriculum, different depth." },
                { q: "What does a normal day look like?", a: "Mornings: structured lessons. Afternoons: hands-on lab time on the week's project. We finish at 3pm, Monday to Friday. Pitch Day is the final Friday." },
                { q: "Where is Rebase exactly?", a: "Obobogo, Yaoundé — directly opposite SCB Bank. Once you reserve, we send a pinned location and parking notes." },
                { q: "How does payment work?", a: "Full payment secures a seat. Mobile money or cash. Written confirmation + receipt issued immediately." },
                { q: "What exactly will my child learn?", a: "Python, problem solving, hands-on electronics, circuits, Design Thinking, teamwork, leadership and Pitch Day. Plus certified CPR training." },
              ].map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                    <span className="text-[15.5px] font-bold tracking-yil-tightish text-black">{f.q}</span>
                    <span className="text-gray-400 mt-1 transition-transform text-[20px] leading-none group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[14px] text-gray-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="relative mx-auto max-w-[1100px] px-4 lg:px-6 py-20 lg:py-28 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yil-warn/40 bg-yil-warn/10 font-yil-mono text-[11px] tracking-wider text-yil-warn">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-yil-warn animate-[yilpulseHi_2.2s_infinite]" />
              ONLY 18 SEATS LEFT IN SESSION 01
            </div>
            <h2 className="mt-6 font-extrabold tracking-yil-tighter3 text-[40px] sm:text-[64px] lg:text-[88px] leading-[0.95] max-w-[20ch] mx-auto">
              A productive holiday <Hi>is a choice</Hi>
            </h2>
            <p className="mt-6 text-yil-fg2 max-w-[58ch] mx-auto text-[16px]">
              50 seats per session. Early Bird ends June 15. Tap WhatsApp now — we&apos;ll walk you through everything in plain language.
            </p>
            <div className="mt-10">
              <a
                href={wa()}
                target="_blank"
                rel="noopener"
                className="yil-btn-wa inline-flex items-center justify-center gap-3 rounded-xl px-8 py-5 text-[18px] font-extrabold"
              >
                <WhatsAppIcon />
                Reserve on WhatsApp — 65,000 FCFA
              </a>
              <div className="mt-3 font-yil-mono text-[11.5px] text-yil-fg2">Replies within ~1hr · +237 680 262 136</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-yil-bg border-t border-yil-line">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-yil-hi text-yil-bg font-extrabold text-[15px] leading-none">YIL</span>
            <span className="text-[13px] tracking-yil-tightish text-yil-fg">Young Innovators Lab · Yaoundé</span>
          </div>
          <div className="font-yil-mono text-[11px] tracking-wider text-yil-fg2">© 2026 · YIL × KIDDYKODE × PLASTIBYTES</div>
        </div>
      </footer>

      {/* Sticky mobile bottom */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="m-3 p-2 rounded-xl bg-yil-card border border-yil-hi/30 flex items-center gap-3 shadow-2xl">
          <div className="pl-2">
            <div className="font-yil-mono text-[9.5px] text-yil-fg2 tracking-wider">EARLY BIRD ENDS</div>
            <div className="text-[14px] font-extrabold leading-none mt-0.5 text-yil-hi font-yil-mono">{cd.mini}</div>
          </div>
          <a
            href={wa()}
            target="_blank"
            rel="noopener"
            className="ml-auto yil-btn-wa inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-extrabold"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Reserve now
          </a>
        </div>
      </div>

      {/* Local styles: gradients, hover lifts, photo placeholder, certificate, keyframes */}
      <style jsx global>{`
        .yil-btn-wa {
          background: linear-gradient(180deg, #2ee678 0%, #1fb957 100%);
          color: #062b16;
          transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.25) inset, 0 12px 28px -10px rgba(31, 185, 87, 0.55);
        }
        .yil-btn-wa:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 18px 36px -10px rgba(31, 185, 87, 0.6);
        }
        .yil-btn-wa:active {
          transform: translateY(0);
        }
        .yil-btn-warn {
          background: linear-gradient(180deg, #ff9f66 0%, #ff6a2e 100%);
          color: #2a1106;
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.3) inset, 0 12px 28px -10px rgba(255, 106, 46, 0.55);
          transition: filter 0.15s ease, transform 0.15s ease;
        }
        .yil-btn-warn:hover {
          filter: brightness(1.05);
          transform: translateY(-1px);
        }
        .yil-card-lift {
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .yil-card-lift:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 217, 59, 0.35);
        }
        .yil-photo-ph {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(255, 217, 59, 0.06), rgba(37, 211, 102, 0.06)),
            repeating-linear-gradient(135deg, #1a1a1a 0 8px, #161616 8px 16px);
          border: 1px solid #262626;
        }
        .yil-stamp {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #ffd93b;
          color: #0a0a0a;
          font-family: var(--font-yil-mono), monospace;
          padding: 4px 8px;
          font-size: 11px;
          letter-spacing: 0.12em;
          font-weight: 700;
          transform: rotate(6deg);
          border: 2px solid #0a0a0a;
        }
        .yil-cert {
          background: linear-gradient(135deg, #fbfaf6 0%, #efebe0 100%);
          color: #0a0a0a;
          position: relative;
          overflow: hidden;
        }
        .yil-cert::before {
          content: "";
          position: absolute;
          left: -40px;
          top: -40px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(37, 211, 102, 0.15), transparent 60%);
        }
        .yil-cert::after {
          content: "";
          position: absolute;
          right: -60px;
          bottom: -60px;
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(255, 217, 59, 0.25), transparent 60%);
        }
        a:focus-visible,
        button:focus-visible,
        summary:focus-visible {
          outline: 2px solid #ffd93b;
          outline-offset: 3px;
          border-radius: 6px;
        }
        @keyframes yilpulseHi {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 217, 59, 0.6);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 217, 59, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 217, 59, 0);
          }
        }
      `}</style>
    </div>
  );
}
