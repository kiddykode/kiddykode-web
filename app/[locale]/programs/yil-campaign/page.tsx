"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Manrope, Geist_Mono, Instrument_Serif } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
const instrumentSerif = Instrument_Serif({ weight: '400', style: 'italic', subsets: ['latin'], variable: '--font-instrument-serif' });

export default function YILCampaignVariantC() {
  const [cd, setCd] = useState({ d: '—', h: '—', m: '—', s: '—', s1Days: 45, mini: '— : — : —' });

  useEffect(() => {
    const DEADLINE = new Date('2026-06-15T23:59:59+01:00').getTime();
    const SESSION1 = new Date('2026-06-29T09:00:00+01:00').getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, DEADLINE - now);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const dd = String(d).padStart(2,'0');
      const hh = String(h).padStart(2,'0');
      const mm = String(m).padStart(2,'0');
      const ss = String(s).padStart(2,'0');
      const mini = dd + ':' + hh + ':' + mm + ':' + ss;
      const s1Days = Math.max(0, Math.ceil((SESSION1 - now) / 86400000));
      
      setCd({ d: dd, h: hh, m: mm, s: ss, s1Days, mini });
    };
    tick();
    const int = setInterval(tick, 1000);
    return () => clearInterval(int);
  }, []);

  const PHONE = '237680262136';
  const wa = (msg = "Hello, I want to reserve a seat for YIL Young Innovators Lab. My child is ___ years old. Please share the next steps.") => 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg);

  return (
    <div className={`${manrope.variable} ${geistMono.variable} ${instrumentSerif.variable} yil-wrapper font-sans bg-yilc-bg text-yilc-fg antialiased min-h-screen`}>
      <style dangerouslySetInnerHTML={{__html: `
  .nav, footer[data-screen-label="Footer"], .utility { display: none !important; }
  :root { color-scheme: dark; }
  .yil-wrapper { font-family: 'Manrope', system-ui, sans-serif; background: #0A0A0A; color: #F5F4F0; -webkit-font-smoothing: antialiased; }
  .serif-i { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; }
  .mono { font-family: 'Geist Mono', monospace; }

  /* Yellow highlighter — full coverage so dark text stays readable on dark bg */
  .hi {
    background: #FFD93B;
    color: #0A0A0A;
    padding: 2px 6px;
    border-radius: 4px;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    font-weight: 800;
    /* nudge the inline-highlighted run to sit on the baseline cleanly */
    box-shadow: 0 1px 0 rgba(0,0,0,.08) inset;
  }
  .hi-full { background: #FFD93B; color: #0A0A0A; padding: 0 6px; border-radius: 4px; font-weight: 800; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  .hi-line { color: #FFD93B; font-weight: 700; }

  /* CTAs */
  .btn-wa { background: linear-gradient(180deg, #2EE678 0%, #1FB957 100%); color:#062B16; transition: transform .15s ease, box-shadow .15s ease, filter .15s ease; box-shadow: 0 1px 0 rgba(255,255,255,.25) inset, 0 12px 28px -10px rgba(31,185,87,.55); }
  .btn-wa:hover { transform: translateY(-1px); filter: brightness(1.05); box-shadow: 0 1px 0 rgba(255,255,255,.3) inset, 0 18px 36px -10px rgba(31,185,87,.6); }
  .btn-wa:active { transform: translateY(0); }
  .btn-warn { background: linear-gradient(180deg, #FF9F66 0%, #FF6A2E 100%); color:#2A1106; box-shadow: 0 1px 0 rgba(255,255,255,.3) inset, 0 12px 28px -10px rgba(255,106,46,.55); transition: filter .15s ease, transform .15s ease; }
  .btn-warn:hover { filter: brightness(1.05); transform: translateY(-1px); }

  .eyebrow { font-family: 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #A8A39A; }
  .pulse-dot { box-shadow: 0 0 0 0 rgba(37,211,102,.6); animation: pulse 2.2s infinite; }
  .pulse-hi  { box-shadow: 0 0 0 0 rgba(255,217,59,.6); animation: pulseHi 2.2s infinite; }
  @keyframes pulse { 70% { box-shadow: 0 0 0 10px rgba(37,211,102,0); } 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); } }
  @keyframes pulseHi { 70% { box-shadow: 0 0 0 10px rgba(255,217,59,0); } 100% { box-shadow: 0 0 0 0 rgba(255,217,59,0); } }

  /* Wavy divider */
  .wavy {
    height: 18px; width: 100%;
    background-image: radial-gradient(circle at 5px 12px, #262626 1.5px, transparent 1.5px), radial-gradient(circle at 15px 6px, #262626 1.5px, transparent 1.5px);
    background-size: 20px 18px;
    opacity: .8;
  }
  .dash {
    background-image: linear-gradient(90deg, rgba(255,255,255,.18) 0 8px, transparent 8px 16px);
    background-size: 16px 1px;
    background-repeat: repeat-x;
    background-position: center;
    height: 1px;
  }

  /* Card hover lift */
  .card-lift { transition: transform .2s ease, border-color .2s ease, background .2s ease; }
  .card-lift:hover { transform: translateY(-2px); border-color: rgba(255,217,59,.35); }

  /* Photo placeholder */
  .photo-ph {
    position: relative; overflow: hidden;
    background:
      linear-gradient(135deg, rgba(255,217,59,.06), rgba(37,211,102,.06)),
      repeating-linear-gradient(135deg, #1a1a1a 0 8px, #161616 8px 16px);
    border: 1px solid #262626;
  }
  .photo-ph::after {
    content: "REPLACE WITH REAL PHOTO"; position: absolute; left: 10px; bottom: 10px;
    font-family: 'Geist Mono', monospace; font-size: 10px; letter-spacing: .12em;
    color: #A8A39A; background: rgba(10,10,10,.85);
    padding: 4px 8px; border: 1px solid #262626; border-radius: 4px;
  }

  /* Press logo placeholder */
  .press-logo {
    height: 38px; padding: 0 14px;
    display: inline-flex; align-items: center;
    border: 1px solid #262626; border-radius: 6px;
    background: #141414;
    font-weight: 700; letter-spacing: -0.01em; color: #F5F4F0;
  }

  /* News card */
  .news {
    background: #141414; border: 1px solid #262626; border-radius: 10px; overflow: hidden;
  }
  .news .head {
    background: #fff; color: #0A0A0A; padding: 6px 10px;
    font-weight: 800; font-size: 12px; letter-spacing: -0.01em;
    border-bottom: 1px solid #ddd;
    display: flex; align-items: center; gap: 6px;
  }

  /* Checkmark */
  .check {
    display: inline-flex; height: 18px; width: 18px; border-radius: 999px; align-items: center; justify-content: center; flex-shrink: 0;
    background: #25D366; color: #062B16;
    font-size: 12px; font-weight: 900;
  }
  .check-hi { background: #FFD93B; color: #0A0A0A; }

  /* Focus */
  a:focus-visible, button:focus-visible, summary:focus-visible { outline: 2px solid #FFD93B; outline-offset: 3px; border-radius: 6px; }

  .safe-bottom { padding-bottom: env(safe-area-inset-bottom); }

  details[open] .chev { transform: rotate(45deg); }

  /* Certificate */
  .cert {
    background: linear-gradient(135deg, #FBFAF6 0%, #EFEBE0 100%);
    color: #0A0A0A; position: relative; overflow: hidden;
  }
  .cert::before {
    content: ""; position: absolute; left:-40px; top:-40px; width:200px; height:200px;
    background: radial-gradient(circle, rgba(37,211,102,.15), transparent 60%);
  }
  .cert::after {
    content: ""; position: absolute; right:-60px; bottom:-60px; width:240px; height:240px;
    background: radial-gradient(circle, rgba(255,217,59,.25), transparent 60%);
  }

  /* Bonus stamp */
  .stamp {
    position: absolute; top: -10px; right: -10px;
    background: #FFD93B; color: #0A0A0A;
    font-family: 'Geist Mono', monospace;
    padding: 4px 8px; font-size: 11px; letter-spacing: .12em; font-weight: 700;
    transform: rotate(6deg);
    border: 2px solid #0A0A0A;
  }
`}} />
      

{/* ============== STICKY TOP BAR ============== */}
<header className="sticky top-0 z-40 bg-yilc-bg/95 backdrop-blur border-b border-yilc-line">
  <div className="bg-yilc-warn/15 border-b border-yilc-warn/30">
    <div className="mx-auto max-w-[1200px] px-4 lg:px-6 h-8 flex items-center justify-center gap-3 mono text-[11px] text-yilc-warn">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-yilc-warn pulse-hi"></span>
      <span className="font-bold">REGISTER BEFORE MIDNIGHT, JUNE 15</span>
      <span className="hidden sm:inline opacity-80">to unlock bonuses worth 25,000 FCFA</span>
    </div>
  </div>
  <div className="mx-auto max-w-[1200px] px-4 lg:px-6 h-14 flex items-center gap-3">
    <a href="#top" className="flex items-center gap-2 shrink-0">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-yilc-hi text-yilc-bg font-extrabold text-[16px] leading-none">Y</span>
      <span className="font-bold tracking-yilc-tightish text-[14px]">YIL <span className="text-yilc-fg2 font-medium hidden sm:inline">/ Young Innovators Lab</span></span>
    </a>
    <div className="hidden md:flex items-center gap-3 mx-auto text-[12.5px] text-yilc-fg2">
      <span>Ages 10–18</span><span className="text-yilc-fg3">·</span>
      <span>Yaoundé · Rebase, Obobogo</span><span className="text-yilc-fg3">·</span>
      <span className="text-yilc-hi font-semibold">Only 18 seats left</span>
    </div>
    <a href="#reserve" data-wa className="hidden md:inline-flex btn-wa items-center gap-2 rounded-md px-4 py-2 text-[13px] font-extrabold">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M.06 24l1.69-6.16A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.47 0 12.04 0a11.86 11.86 0 0 1 11.9 11.9c0 6.56-5.33 11.89-11.9 11.89a11.9 11.9 0 0 1-5.69-1.45L.06 24z"/></svg>
      RESERVE — 65,000 FCFA
    </a>
    <a href="#reserve" data-wa className="md:hidden btn-wa inline-flex items-center justify-center rounded-md h-9 w-9" aria-label="Reserve on WhatsApp">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M.06 24l1.69-6.16A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.47 0 12.04 0a11.86 11.86 0 0 1 11.9 11.9c0 6.56-5.33 11.89-11.9 11.89a11.9 11.9 0 0 1-5.69-1.45L.06 24z"/></svg>
    </a>
  </div>
</header>

<main id="top">

{/* ============== HERO ============== */}
<section className="relative overflow-hidden">
  {/* subtle grid */}
  <div aria-hidden className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{"backgroundImage": "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", "backgroundSize": "56px 56px"}}></div>

  <div className="relative mx-auto max-w-[1100px] px-4 lg:px-6 pt-10 lg:pt-14 pb-8 text-center">
    {/* eyebrow */}
    <div className="inline-flex items-center gap-2 text-[12.5px] mono uppercase tracking-[.14em] text-yilc-warn">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-yilc-warn pulse-hi"></span>
      Holiday Tech Bootcamp · Yaoundé
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-yilc-warn pulse-hi"></span>
    </div>

    <h1 className="mt-5 font-extrabold tracking-yilc-tighter2 text-[34px] leading-[1.08] sm:text-[44px] lg:text-[58px] lg:leading-[1.04] max-w-[22ch] mx-auto">
      Learn to code, build robots & ship a <span className="hi">real project in 4 weeks</span>
    </h1>
    <p className="mt-5 text-[15.5px] lg:text-[17px] text-yilc-fg2 max-w-[58ch] mx-auto leading-[1.55]">
      A structured holiday bootcamp for 10–18-year-olds in Yaoundé who want to spend their holiday <span className="hi-line">building things</span>, not scrolling. Python, electronics, circuits, prototyping and Pitch Day — guided by working engineers.
    </p>

    {/* Checkmark trust list */}
    <ul className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[760px] mx-auto text-left">
      <li className="flex items-start gap-2.5 text-[14px]"><span className="check mt-0.5">✓</span><span><span className="hi-line">A working Python project</span> they can demo at home</span></li>
      <li className="flex items-start gap-2.5 text-[14px]"><span className="check mt-0.5">✓</span><span>Real circuits, sensors and <span className="hi-line">microcontrollers</span></span></li>
      <li className="flex items-start gap-2.5 text-[14px]"><span className="check mt-0.5">✓</span><span>Pitch Day on stage — <span className="hi-line">slides + project + story</span></span></li>
      <li className="flex items-start gap-2.5 text-[14px]"><span className="check mt-0.5">✓</span><span>Certified <span className="hi-line">CPR training</span> included (life skill bonus)</span></li>
      <li className="flex items-start gap-2.5 text-[14px]"><span className="check mt-0.5">✓</span><span>50-seat cap per session — <span className="hi-line">small group attention</span></span></li>
      <li className="flex items-start gap-2.5 text-[14px]"><span className="check mt-0.5">✓</span><span>No prior coding experience required</span></li>
    </ul>

    {/* Facts box */}
    <div className="mt-8 inline-grid grid-cols-2 sm:grid-cols-4 gap-px bg-yilc-line border border-yilc-line rounded-xl overflow-hidden text-left">
      <div className="bg-yilc-card px-4 py-3 flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-yilc-hi" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>
        <div>
          <div className="eyebrow text-[10px]">Session 01</div>
          <div className="text-[13px] font-bold leading-tight">Jun 29 – Jul 25</div>
        </div>
      </div>
      <div className="bg-yilc-card px-4 py-3 flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-yilc-hi" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
        <div>
          <div className="eyebrow text-[10px]">4 weeks</div>
          <div className="text-[13px] font-bold leading-tight">Mon — Fri</div>
        </div>
      </div>
      <div className="bg-yilc-card px-4 py-3 flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-yilc-hi" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7h18v12H3zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
        <div>
          <div className="eyebrow text-[10px]">Capacity</div>
          <div className="text-[13px] font-bold leading-tight">50 seats / session</div>
        </div>
      </div>
      <div className="bg-yilc-card px-4 py-3 flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-yilc-hi" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-6-7-12a7 7 0 0114 0c0 6-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
        <div>
          <div className="eyebrow text-[10px]">Venue</div>
          <div className="text-[13px] font-bold leading-tight">Rebase, Obobogo</div>
        </div>
      </div>
    </div>

    {/* Photo card */}
    <div className="mt-10 max-w-[760px] mx-auto">
      <div className="relative rounded-2xl overflow-hidden border border-yilc-line">
        <img src="/yil/bootcamp-photo.jpg" alt="Students at YIL building circuits and writing code together" className="w-full h-auto block"  />
        {/* Bottom card overlay */}
        <div className="absolute left-3 right-3 bottom-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div className="bg-yilc-bg/80 backdrop-blur px-3 py-2 rounded-md border border-yilc-line">
            <div className="eyebrow text-[10px]">Pitch Day</div>
            <div className="text-[13px] font-extrabold">14 projects shipped</div>
          </div>
          <div className="bg-yilc-bg/80 backdrop-blur px-3 py-2 rounded-md border border-yilc-line">
            <div className="eyebrow text-[10px]">Cohort 02</div>
            <div className="text-[13px] font-extrabold">Aug 2025</div>
          </div>
          <div className="hidden sm:block bg-yilc-hi text-yilc-bg px-3 py-2 rounded-md">
            <div className="text-[10px] mono uppercase tracking-wider">SESSION 01</div>
            <div className="text-[13px] font-extrabold leading-tight">Starts in {cd.s1Days} days</div>
          </div>
        </div>
      </div>
    </div>

    {/* Primary CTA */}
    <div className="mt-8 flex flex-col items-center gap-3" id="reserve">
      <a href={wa()} target="_blank" rel="noopener" className="btn-wa inline-flex items-center justify-center gap-3 rounded-xl px-8 py-5 text-[16px] sm:text-[18px] font-extrabold tracking-yilc-tightish max-w-md w-full">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yilc-bg/15">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M.06 24l1.69-6.16A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.47 0 12.04 0a11.86 11.86 0 0 1 11.9 11.9c0 6.56-5.33 11.89-11.9 11.89a11.9 11.9 0 0 1-5.69-1.45L.06 24z"/></svg>
        </span>
        Reserve a seat on WhatsApp
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <div className="mono text-[11px] text-yilc-fg2">
        Early Bird · <b className="text-yilc-fg">65,000 FCFA</b> · Save <b className="text-yilc-hi">10,000 FCFA</b> · Ends in <span id="cd-mini" className="text-yilc-hi font-bold mono">{cd.mini}</span>
      </div>
      <a href="#program" className="mt-1 text-[13px] text-yilc-fg2 hover:text-yilc-fg underline underline-offset-4 decoration-yilc-fg3">See program details ↓</a>
    </div>

    {/* Bonus banner */}
    <div className="mt-7 inline-flex items-center gap-2 bg-yilc-warn/10 border border-yilc-warn/30 rounded-md px-4 py-2 text-[12.5px]">
      <span className="text-yilc-warn font-bold mono">🎁 BONUSES WORTH 25,000 FCFA</span>
      <span className="text-yilc-fg2">if you reserve before midnight June 15</span>
    </div>
  </div>

  {/* Wavy divider */}
  <div className="wavy"></div>
</section>

{/* ============== PRESS / PARTNERS STRIP ============== */}
<section className="border-y border-yilc-line bg-yilc-card2">
  <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-8">
    <div className="text-center eyebrow mb-5">A YIL programme · In partnership with</div>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="press-logo">
        <img src="/yil/kiddykode-logo.png" alt="Kiddykode" className="h-7 w-7 rounded-full object-cover mr-2"  />
        <span>Kiddykode</span>
      </span>
      <span className="press-logo">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-yilc-hi text-yilc-bg mono text-[10px] font-extrabold mr-2">{ }</span>
        <span>PlastiBytes</span>
      </span>
      <span className="press-logo">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-yilc-wa/20 text-yilc-wa mono text-[10px] font-extrabold mr-2">R</span>
        <span>Rebase Yaoundé</span>
      </span>
      <span className="press-logo opacity-70">
        <span className="text-yilc-fg2 text-[12px] mr-2">Featured by</span>
        <span className="italic font-serif text-[15px]">Cameroon Tribune</span>
      </span>
      <span className="press-logo opacity-70">
        <span className="text-yilc-fg2 text-[12px] mr-2">Member</span>
        <span className="font-semibold">237 Tech Network</span>
      </span>
    </div>
  </div>
</section>

{/* ============== WHY JOIN (BENEFITS GRID) ============== */}
<section id="program" className="relative">
  <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
    <h2 className="text-center font-extrabold tracking-yilc-tighter2 text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1]">
      Why parents <span className="hi">choose YIL</span> for the holidays
    </h2>
    <p className="mt-3 text-center text-yilc-fg2 max-w-[58ch] mx-auto text-[15px]">Most holiday programmes try to entertain. We're built to <span className="hi-line">teach</span>, with a structure, a curriculum, and a deliverable at the end.</p>

    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
      <div className="card-lift bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-yilc-wa/15 text-yilc-wa">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
          </span>
          <h3 className="font-bold tracking-yilc-tightish text-[15px]">Real Python coding</h3>
        </div>
        <p className="mt-3 text-[13.5px] text-yilc-fg2 leading-relaxed">From <span className="hi-line">zero to a working program</span> they can demo and explain. Not blocks, real code.</p>
      </div>
      <div className="card-lift bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-yilc-hi/20 text-yilc-hi">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="8" width="18" height="10" rx="1"/><path d="M7 12h2M11 12h2M15 12h2M7 5v3M17 5v3"/></svg>
          </span>
          <h3 className="font-bold tracking-yilc-tightish text-[15px]">Hands-on electronics</h3>
        </div>
        <p className="mt-3 text-[13.5px] text-yilc-fg2 leading-relaxed">Breadboards, sensors, microcontrollers. They learn <span className="hi-line">how systems actually work</span>.</p>
      </div>
      <div className="card-lift bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-yilc-warn/15 text-yilc-warn">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l3 3 4-4 4 4 5-7"/><path d="M3 19h18"/></svg>
          </span>
          <h3 className="font-bold tracking-yilc-tightish text-[15px]">Real-world problem solving</h3>
        </div>
        <p className="mt-3 text-[13.5px] text-yilc-fg2 leading-relaxed">Daily challenges with <span className="hi-line">no single answer</span> — they learn to think, not memorise.</p>
      </div>
      <div className="card-lift bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-yilc-wa/15 text-yilc-wa">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M21 21v-2a4 4 0 00-3-3.87"/><path d="M17 3.13A4 4 0 0117 11"/></svg>
          </span>
          <h3 className="font-bold tracking-yilc-tightish text-[15px]">Teamwork & leadership</h3>
        </div>
        <p className="mt-3 text-[13.5px] text-yilc-fg2 leading-relaxed">They build in small teams — <span className="hi-line">leading, supporting, disagreeing well</span>.</p>
      </div>
      <div className="card-lift bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-yilc-hi/20 text-yilc-hi">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="14" rx="1"/><path d="M8 21h8M12 17v4"/></svg>
          </span>
          <h3 className="font-bold tracking-yilc-tightish text-[15px]">Pitch Day on stage</h3>
        </div>
        <p className="mt-3 text-[13.5px] text-yilc-fg2 leading-relaxed">Every child presents — slides, project, story. <span className="hi-line">Parents are in the room.</span></p>
      </div>
      <div className="card-lift bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-yilc-warn/15 text-yilc-warn">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z"/></svg>
          </span>
          <h3 className="font-bold tracking-yilc-tightish text-[15px]">CPR certification</h3>
        </div>
        <p className="mt-3 text-[13.5px] text-yilc-fg2 leading-relaxed">Every cohort gets a <span className="hi-line">certified CPR training session</span> — a real life skill.</p>
      </div>
    </div>

    {/* Specially designed band */}
    <div className="mt-10 border border-yilc-line rounded-xl p-5 bg-yilc-card2 flex flex-col sm:flex-row items-center gap-4">
      <div className="text-[13px] mono uppercase tracking-[.14em] text-yilc-warn bg-yilc-warn/10 border border-yilc-warn/30 px-2 py-1 rounded">⚠ Specially Designed</div>
      <div className="text-[14.5px] text-yilc-fg flex-1 text-center sm:text-left">
        For <span className="hi-line">serious parents</span> who want a productive holiday — and a child who can show real skills by September.
      </div>
    </div>
  </div>
</section>

{/* ============== NEWS-STYLE SOCIAL PROOF ============== */}
<section className="bg-yilc-card2 border-y border-yilc-line">
  <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
    <h2 className="text-center font-extrabold tracking-yilc-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
      <span className="hi-line">Tech jobs</span> are moving to <span className="hi">people who build</span>
    </h2>
    <p className="mt-3 text-center text-yilc-fg2 max-w-[58ch] mx-auto text-[15px]">
      The earliest opportunities are going to young people who can already <span className="hi-line">code, prototype and present</span>. Africa's pipeline is being built right now.
    </p>

    {/* Stat row */}
    <div className="mt-10 grid sm:grid-cols-3 gap-3">
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5 text-center">
        <div className="font-serif italic text-[36px] leading-none">230M+</div>
        <div className="mt-2 text-[13.5px] text-yilc-fg2">Young Africans needing digital skills <span className="text-yilc-fg3">— ITU, 2025</span></div>
      </div>
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5 text-center">
        <div className="font-serif italic text-[36px] leading-none">3.5M</div>
        <div className="mt-2 text-[13.5px] text-yilc-fg2">Tech jobs forecast across Africa by 2030 <span className="text-yilc-fg3">— Google / IFC</span></div>
      </div>
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5 text-center">
        <div className="font-serif italic text-[36px] leading-none">5×</div>
        <div className="mt-2 text-[13.5px] text-yilc-fg2">Higher employability for tech-literate graduates <span className="text-yilc-fg3">— World Bank</span></div>
      </div>
    </div>

    {/* News cards row */}
    <div className="mt-8 grid md:grid-cols-3 gap-3">
      <article className="news">
        <div className="head">
          <span className="inline-block h-2 w-2 bg-yilc-warn rounded-full"></span>
          <span className="font-serif italic">Cameroon Tribune</span>
        </div>
        <div className="p-4">
          <div className="text-[13.5px] font-bold leading-snug">"Cameroon's youth must master coding to compete in the new African digital market."</div>
          <div className="mt-2 text-[11.5px] text-yilc-fg2 mono uppercase tracking-wider">Education · 2025</div>
        </div>
      </article>
      <article className="news">
        <div className="head">
          <span className="inline-block h-2 w-2 bg-yilc-warn rounded-full"></span>
          <span>Jeune Afrique</span>
        </div>
        <div className="p-4">
          <div className="text-[13.5px] font-bold leading-snug">"Africa's next wave of founders is being trained right now — at 14, not 24."</div>
          <div className="mt-2 text-[11.5px] text-yilc-fg2 mono uppercase tracking-wider">Innovation · 2025</div>
        </div>
      </article>
      <article className="news">
        <div className="head">
          <span className="inline-block h-2 w-2 bg-yilc-warn rounded-full"></span>
          <span className="font-extrabold">TechCabal</span>
        </div>
        <div className="p-4">
          <div className="text-[13.5px] font-bold leading-snug">"Hands-on bootcamps are out-performing traditional CS curricula for early-stage learners."</div>
          <div className="mt-2 text-[11.5px] text-yilc-fg2 mono uppercase tracking-wider">Skills · 2025</div>
        </div>
      </article>
    </div>
    <div className="mt-3 text-center text-[11px] mono text-yilc-fg3 tracking-wider">REPRESENTATIVE COVERAGE · LANDSCAPE OVERVIEW · NOT YIL ENDORSEMENTS</div>

    {/* Repeat CTA */}
    <div className="mt-10 text-center">
      <a href={wa()} target="_blank" rel="noopener" className="btn-warn inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-[15px] font-extrabold">
        Reserve before midnight · 65,000 FCFA
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <div className="mt-2 mono text-[11px] text-yilc-fg2">Register before midnight, June 15 — to unlock bonuses worth 10,500 FCFA</div>
    </div>
  </div>
</section>

{/* ============== IS THIS FOR YOU ============== */}
<section>
  <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
    <h2 className="text-center font-extrabold tracking-yilc-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
      Is this bootcamp <span className="hi">for your child</span>?
    </h2>
    <p className="mt-3 text-center text-yilc-fg2 max-w-[60ch] mx-auto text-[15px]">
      In 4 weeks, your child will learn <span className="hi-line">six concrete skills</span> they'll carry into school, college and a future career.
    </p>

    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yilc-wa/15 text-yilc-wa">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 4l-5 8 5 8M16 4l5 8-5 8M14 4l-4 16"/></svg>
        </div>
        <h3 className="mt-4 font-bold text-[15.5px]">Coding in Python</h3>
        <p className="mt-1.5 text-[13px] text-yilc-fg2">Variables, loops, functions, a working program by week 2.</p>
      </div>
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yilc-hi/20 text-yilc-hi">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        </div>
        <h3 className="mt-4 font-bold text-[15.5px]">Electronics & circuits</h3>
        <p className="mt-1.5 text-[13px] text-yilc-fg2">Real breadboards, sensors and microcontrollers — wired by hand.</p>
      </div>
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yilc-warn/15 text-yilc-warn">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>
        </div>
        <h3 className="mt-4 font-bold text-[15.5px]">Prototyping</h3>
        <p className="mt-1.5 text-[13px] text-yilc-fg2">From idea sketch to working build — they ship a real prototype.</p>
      </div>
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yilc-wa/15 text-yilc-wa">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="10" cy="7" r="4"/></svg>
        </div>
        <h3 className="mt-4 font-bold text-[15.5px]">Teamwork & leadership</h3>
        <p className="mt-1.5 text-[13px] text-yilc-fg2">Group challenges, retros, clear communication under pressure.</p>
      </div>
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yilc-hi/20 text-yilc-hi">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="14" rx="1"/><path d="M8 22h8M12 18v4"/></svg>
        </div>
        <h3 className="mt-4 font-bold text-[15.5px]">Pitch Day mastery</h3>
        <p className="mt-1.5 text-[13px] text-yilc-fg2">Slides, story, demo — they own the stage in front of parents.</p>
      </div>
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yilc-warn/15 text-yilc-warn">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z"/></svg>
        </div>
        <h3 className="mt-4 font-bold text-[15.5px]">CPR + life skill</h3>
        <p className="mt-1.5 text-[13px] text-yilc-fg2">A certified session that stays with them — beyond the bootcamp.</p>
      </div>
    </div>

    <div className="mt-10 text-center">
      <a href={wa()} target="_blank" rel="noopener" className="btn-warn inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-[15px] font-extrabold">
        Reserve before midnight · 65,000 FCFA
      </a>
      <div className="mt-2 mono text-[11px] text-yilc-fg2">Early Bird ends in <span id="cd-mini-2" className="text-yilc-hi font-bold">{cd.mini}</span></div>
    </div>
  </div>
</section>

{/* ============== REGISTER BEFORE MIDNIGHT BANNER ============== */}
<section className="bg-yilc-card2 border-y border-yilc-line">
  <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 text-center">
    <div className="inline-block bg-yilc-bg border border-yilc-line rounded-xl px-6 py-5">
      <div className="eyebrow text-yilc-hi">REGISTER BEFORE MIDNIGHT · JUNE 15, 2026</div>
      <div className="mt-1 text-[18px] sm:text-[22px] font-extrabold">To Unlock All Bonuses Worth <span className="hi">25,000 FCFA</span></div>
      {/* Countdown numbers */}
      <div className="mt-5 grid grid-cols-4 gap-2 max-w-md mx-auto">
        <div className="bg-yilc-card border border-yilc-line rounded-md py-3">
          <div className="font-extrabold text-[28px] sm:text-[32px] leading-none mono" >{cd.d}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">DAYS</div>
        </div>
        <div className="bg-yilc-card border border-yilc-line rounded-md py-3">
          <div className="font-extrabold text-[28px] sm:text-[32px] leading-none mono" >{cd.h}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">HOURS</div>
        </div>
        <div className="bg-yilc-card border border-yilc-line rounded-md py-3">
          <div className="font-extrabold text-[28px] sm:text-[32px] leading-none mono" >{cd.m}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">MINUTES</div>
        </div>
        <div className="bg-yilc-card border border-yilc-line rounded-md py-3">
          <div className="font-extrabold text-[28px] sm:text-[32px] leading-none mono text-yilc-hi" >{cd.s}</div><div className="mono text-[10px] text-yilc-fg2 mt-1">SECONDS</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ============== BONUSES ============== */}
<section>
  <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
    <h2 className="text-center font-extrabold tracking-yilc-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
      Reserve today, get <span className="hi">3 bonuses worth 25,000 FCFA</span> — free
    </h2>
    <p className="mt-3 text-center text-yilc-fg2 max-w-[58ch] mx-auto text-[15px]">
      Only for parents who reserve before <span className="hi-line">midnight, June 15</span>.
    </p>

    <div className="mt-10 grid sm:grid-cols-3 gap-4">
      <div className="relative bg-yilc-card border border-yilc-line rounded-xl p-5 card-lift">
        <span className="stamp">FREE</span>
        <div className="eyebrow">BONUS 01</div>
        <div className="mt-4 h-32 photo-ph rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-yilc-hi/80" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
        </div>
        <h3 className="mt-4 font-extrabold text-[16px] tracking-yilc-tightish">80+ Python starter projects</h3>
        <p className="mt-2 text-[13px] text-yilc-fg2">A curated pack your child keeps after the bootcamp — to keep building all year.</p>
        <div className="mt-4 flex items-center justify-between border-t border-yilc-line pt-3">
          <div className="text-[12px] text-yilc-fg2 mono">VALUED AT</div>
          <div className="font-extrabold text-yilc-hi">10,000 FCFA</div>
        </div>
      </div>
      <div className="relative bg-yilc-card border border-yilc-line rounded-xl p-5 card-lift">
        <span className="stamp">FREE</span>
        <div className="eyebrow">BONUS 02</div>
        <div className="mt-4 h-32 photo-ph rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-yilc-hi/80" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>
        </div>
        <h3 className="mt-4 font-extrabold text-[16px] tracking-yilc-tightish">Pitch Day deck templates</h3>
        <p className="mt-2 text-[13px] text-yilc-fg2">The exact slide templates our top students used — they'll use these again at school.</p>
        <div className="mt-4 flex items-center justify-between border-t border-yilc-line pt-3">
          <div className="text-[12px] text-yilc-fg2 mono">VALUED AT</div>
          <div className="font-extrabold text-yilc-hi">7,500 FCFA</div>
        </div>
      </div>
      <div className="relative bg-yilc-card border border-yilc-line rounded-xl p-5 card-lift">
        <span className="stamp">FREE</span>
        <div className="eyebrow">BONUS 03</div>
        <div className="mt-4 h-32 photo-ph rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-yilc-hi/80" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
        </div>
        <h3 className="mt-4 font-extrabold text-[16px] tracking-yilc-tightish">Certified CPR training</h3>
        <p className="mt-2 text-[13px] text-yilc-fg2">A real-world life skill — every child leaves with a recognised CPR certification.</p>
        <div className="mt-4 flex items-center justify-between border-t border-yilc-line pt-3">
          <div className="text-[12px] text-yilc-fg2 mono">VALUED AT</div>
          <div className="font-extrabold text-yilc-hi">7,500 FCFA</div>
        </div>
      </div>
    </div>

    {/* Total */}
    <div className="mt-8 max-w-md mx-auto bg-yilc-card border border-yilc-hi/30 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div className="text-[13.5px] text-yilc-fg2">Bonus value</div>
        <div className="font-extrabold">25,000 FCFA</div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-[13.5px] text-yilc-fg2">Bootcamp price (Early Bird)</div>
        <div className="font-extrabold">65,000 FCFA</div>
      </div>
      <div className="dash my-3"></div>
      <div className="flex items-center justify-between">
        <div className="text-[14px] text-yilc-fg">You pay today</div>
        <div className="text-yilc-hi font-extrabold text-[24px]">65,000 FCFA</div>
      </div>
      <div className="mt-2 text-[12px] text-yilc-fg2 mono text-center">YOU SAVE <b className="text-yilc-hi">35,000 FCFA</b> (bonus + Early Bird discount)</div>
    </div>
  </div>
</section>

{/* ============== CERTIFICATE PREVIEW ============== */}
<section className="bg-yilc-card2 border-y border-yilc-line">
  <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
    <h2 className="text-center font-extrabold tracking-yilc-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
      Your child's name on a <span className="hi">YIL completion certificate</span>
    </h2>
    <p className="mt-3 text-center text-yilc-fg2 max-w-[58ch] mx-auto text-[15px]">
      Awarded on Pitch Day. Recognised by Kiddykode and PlastiBytes. A real artifact for school portfolios and future internships.
    </p>

    <div className="mt-10 max-w-2xl mx-auto cert rounded-2xl p-6 lg:p-10 relative border border-yilc-fg3/30">
      <div className="relative">
        <div className="text-center">
          <div className="eyebrow !text-yilc-fg3">YIL · Young Innovators Lab</div>
          <div className="mt-3 font-serif italic text-[34px] sm:text-[44px] leading-[0.95]">Certificate of Completion</div>
          <div className="mt-2 text-[12px] mono uppercase tracking-[.14em] text-yilc-fg3">Issued · Yaoundé, 2026</div>
        </div>
        <div className="mt-8 text-center">
          <div className="text-[12px] text-yilc-fg3 mono uppercase tracking-wider">Awarded to</div>
          <div className="mt-3 font-serif italic text-[28px] sm:text-[36px] leading-none border-b-2 border-yilc-bg/25 pb-3 max-w-md mx-auto">[ Your child's name ]</div>
          <p className="mt-5 text-[13.5px] text-yilc-bg/80 max-w-[44ch] mx-auto leading-relaxed">
            for the successful completion of the 4-week YIL Holiday Tech Bootcamp — coding, electronics, prototyping and Pitch Day.
          </p>
        </div>
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="text-left flex-1 max-w-[160px]">
            <div className="font-serif italic text-[20px]">Aditya / YIL</div>
            <div className="text-[10px] mono uppercase tracking-wider text-yilc-fg3">Lead Instructor</div>
          </div>
          <div className="h-14 w-14 rounded-full bg-yilc-bg/10 border border-yilc-bg/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-yilc-bg/70" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="9" r="5"/><path d="M8 14l-2 7 6-3 6 3-2-7"/></svg>
          </div>
          <div className="text-right flex-1 max-w-[160px]">
            <div className="font-serif italic text-[20px]">YIL Faculty</div>
            <div className="text-[10px] mono uppercase tracking-wider text-yilc-fg3">Programme Director</div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-10 text-center">
      <a href={wa()} target="_blank" rel="noopener" className="btn-wa inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-[15px] font-extrabold">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M.06 24l1.69-6.16A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.47 0 12.04 0a11.86 11.86 0 0 1 11.9 11.9c0 6.56-5.33 11.89-11.9 11.89a11.9 11.9 0 0 1-5.69-1.45L.06 24z"/></svg>
        Reserve seat & earn certificate
      </a>
    </div>
  </div>
</section>

{/* ============== KNOW YOUR MENTORS ============== */}
<section>
  <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
    <h2 className="text-center font-extrabold tracking-yilc-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
      Know your <span className="hi">mentors</span>
    </h2>
    <p className="mt-3 text-center text-yilc-fg2 max-w-[58ch] mx-auto text-[15px]">
      Working engineers from Kiddykode and PlastiBytes — small-group ratios so every question gets answered.
    </p>

    <div className="mt-10 grid md:grid-cols-2 gap-5">
      <article className="bg-yilc-card border border-yilc-line rounded-2xl p-5 flex flex-col sm:flex-row gap-5">
        <div className="photo-ph rounded-xl w-full sm:w-44 aspect-square sm:aspect-auto sm:h-52 shrink-0"></div>
        <div className="flex-1">
          <div className="eyebrow text-yilc-hi">Lead Instructor</div>
          <h3 className="mt-2 font-extrabold text-[20px] tracking-yilc-tightish">[ Mentor Name 01 ]</h3>
          <ul className="mt-3 space-y-1.5 text-[13.5px] text-yilc-fg2">
            <li className="flex items-start gap-2"><span className="check check-hi mt-0.5">✓</span>Kiddykode co-founder · 8+ years teaching</li>
            <li className="flex items-start gap-2"><span className="check check-hi mt-0.5">✓</span>Python · electronics · prototyping</li>
          </ul>
          <p className="mt-3 text-[13px] text-yilc-fg2 leading-relaxed">
            Hi, I'm leading the YIL programme this year. I've taught over 600 students in Cameroon — I know how to take a beginner to a working project in 4 weeks. <span className="hi-line">Come build with us.</span>
          </p>
        </div>
      </article>
      <article className="bg-yilc-card border border-yilc-line rounded-2xl p-5 flex flex-col sm:flex-row gap-5">
        <div className="photo-ph rounded-xl w-full sm:w-44 aspect-square sm:aspect-auto sm:h-52 shrink-0"></div>
        <div className="flex-1">
          <div className="eyebrow text-yilc-hi">Programme Director</div>
          <h3 className="mt-2 font-extrabold text-[20px] tracking-yilc-tightish">[ Mentor Name 02 ]</h3>
          <ul className="mt-3 space-y-1.5 text-[13.5px] text-yilc-fg2">
            <li className="flex items-start gap-2"><span className="check check-hi mt-0.5">✓</span>PlastiBytes engineer · electronics specialist</li>
            <li className="flex items-start gap-2"><span className="check check-hi mt-0.5">✓</span>Circuits · microcontrollers · Pitch Day coaching</li>
          </ul>
          <p className="mt-3 text-[13px] text-yilc-fg2 leading-relaxed">
            I'll be running the electronics and prototyping track. We work with real components — what your child builds at YIL <span className="hi-line">is theirs to take home</span>.
          </p>
        </div>
      </article>
    </div>

    {/* Companies row */}
    <div className="mt-8 bg-yilc-card2 border border-yilc-line rounded-xl p-4">
      <div className="text-center eyebrow mb-3">PROGRAMME RUN BY</div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="press-logo">
          <img src="/yil/kiddykode-logo.png" alt="Kiddykode" className="h-7 w-7 rounded-full object-cover mr-2"  />
          <span>Kiddykode</span>
        </span>
        <span className="press-logo">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-yilc-hi text-yilc-bg mono text-[10px] font-extrabold mr-2">{ }</span>
          <span>PlastiBytes</span>
        </span>
        <span className="press-logo">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-yilc-wa/20 text-yilc-wa mono text-[10px] font-extrabold mr-2">R</span>
          <span>Rebase Yaoundé</span>
        </span>
      </div>
    </div>
  </div>
</section>

{/* ============== SESSIONS + PRICING ============== */}
<section className="bg-yilc-card2 border-y border-yilc-line">
  <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
    <h2 className="text-center font-extrabold tracking-yilc-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
      Pick your <span className="hi">session & lock the price</span>
    </h2>
    <p className="mt-3 text-center text-yilc-fg2 max-w-[58ch] mx-auto text-[15px]">
      Two identical 4-week sessions — pick what works around your family's plans. Each is capped at 50 children for real focus.
    </p>

    {/* Sessions */}
    <div className="mt-10 grid md:grid-cols-2 gap-4">
      <article className="bg-yilc-card border border-yilc-line rounded-xl p-5 card-lift">
        <div className="flex items-start justify-between">
          <div className="eyebrow">SESSION 01</div>
          <span className="inline-flex items-center gap-1.5 bg-yilc-hi text-yilc-bg px-2 py-0.5 mono text-[10px] font-extrabold tracking-wider">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-yilc-bg pulse-hi"></span>STARTS IN {cd.s1Days}D
          </span>
        </div>
        <h3 className="mt-3 font-extrabold text-[28px] tracking-yilc-tighter2">Jun 29 — Jul 25</h3>
        <ul className="mt-4 space-y-1.5 text-[13.5px] text-yilc-fg2">
          <li className="flex items-center gap-2"><span className="check mt-0.5">✓</span>Ages 10–18 · Mon–Fri</li>
          <li className="flex items-center gap-2"><span className="check mt-0.5">✓</span>Rebase, Obobogo · 50 seats max</li>
          <li className="flex items-center gap-2"><span className="check mt-0.5">✓</span>Python, electronics, prototyping, Pitch Day</li>
        </ul>
        <a href={wa("Hello, I want to reserve a seat for YIL Session 1 (June 29 – July 25). My child is ___ years old. Please share the next steps.")} target="_blank" rel="noopener" className="mt-5 btn-wa flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[14px] font-extrabold">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M.06 24l1.69-6.16A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.47 0 12.04 0a11.86 11.86 0 0 1 11.9 11.9c0 6.56-5.33 11.89-11.9 11.89a11.9 11.9 0 0 1-5.69-1.45L.06 24z"/></svg>
          Ask about Session 01
        </a>
      </article>
      <article className="bg-yilc-card border border-yilc-line rounded-xl p-5 card-lift">
        <div className="flex items-start justify-between">
          <div className="eyebrow">SESSION 02</div>
          <span className="inline-flex items-center gap-1.5 border border-yilc-line px-2 py-0.5 mono text-[10px] font-extrabold tracking-wider text-yilc-fg2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-yilc-fg2"></span>SEATS OPEN
          </span>
        </div>
        <h3 className="mt-3 font-extrabold text-[28px] tracking-yilc-tighter2">Aug 3 — 29</h3>
        <ul className="mt-4 space-y-1.5 text-[13.5px] text-yilc-fg2">
          <li className="flex items-center gap-2"><span className="check mt-0.5">✓</span>Ages 10–18 · Mon–Fri</li>
          <li className="flex items-center gap-2"><span className="check mt-0.5">✓</span>Rebase, Obobogo · 50 seats max</li>
          <li className="flex items-center gap-2"><span className="check mt-0.5">✓</span>Same curriculum · perfect for August travel</li>
        </ul>
        <a href={wa("Hello, I want to reserve a seat for YIL Session 2 (August 3 – 29). My child is ___ years old. Please share the next steps.")} target="_blank" rel="noopener" className="mt-5 btn-wa flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[14px] font-extrabold">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M.06 24l1.69-6.16A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.47 0 12.04 0a11.86 11.86 0 0 1 11.9 11.9c0 6.56-5.33 11.89-11.9 11.89a11.9 11.9 0 0 1-5.69-1.45L.06 24z"/></svg>
          Ask about Session 02
        </a>
      </article>
    </div>

    {/* Price block */}
    <div className="mt-8 max-w-2xl mx-auto bg-yilc-card border-2 border-yilc-hi rounded-2xl p-6 lg:p-8 text-center relative">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yilc-hi text-yilc-bg px-3 py-1 rounded-full mono text-[11px] font-extrabold tracking-wider">EARLY BIRD · SAVE 10,000 FCFA</span>
      <div className="eyebrow">Total today</div>
      <div className="mt-2 flex items-baseline justify-center gap-3">
        <div className="font-extrabold tracking-yilc-tighter3 text-[60px] sm:text-[80px] leading-none">65,000</div>
        <div className="text-yilc-fg2 text-[16px] font-bold">FCFA</div>
        <div className="text-yilc-fg3 text-[18px] line-through decoration-yilc-fg3 mono">75,000</div>
      </div>
      <p className="mt-3 text-[13.5px] text-yilc-fg2">Per child · full 4-week session · all materials · all bonuses · CPR certification</p>

      <a href={wa()} target="_blank" rel="noopener" className="mt-6 btn-wa inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl px-8 py-5 text-[16px] sm:text-[18px] font-extrabold">
        Reserve on WhatsApp now
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <div className="mt-3 text-[12px] text-yilc-fg2 mono">PAY ONCE · MOBILE MONEY / BANK / CASH · WRITTEN CONFIRMATION</div>
    </div>
  </div>
</section>

{/* ============== HOW IT WORKS ============== */}
<section>
  <div className="mx-auto max-w-[1100px] px-4 lg:px-6 py-16 lg:py-20">
    <h2 className="text-center font-extrabold tracking-yilc-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
      How to reserve in <span className="hi">3 simple steps</span>
    </h2>

    <div className="mt-10 grid md:grid-cols-3 gap-3">
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5 text-center">
        <div className="font-extrabold text-yilc-hi text-[44px] leading-none tracking-yilc-tighter3">01</div>
        <h3 className="mt-3 font-bold text-[16px]">Tap WhatsApp</h3>
        <p className="mt-2 text-[13px] text-yilc-fg2">Click any green button. Your message is pre-filled — edit your child's age only.</p>
      </div>
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5 text-center">
        <div className="font-extrabold text-yilc-hi text-[44px] leading-none tracking-yilc-tighter3">02</div>
        <h3 className="mt-3 font-bold text-[16px]">Pick a session</h3>
        <p className="mt-2 text-[13px] text-yilc-fg2">We confirm the session, send a written summary and a parent pack.</p>
      </div>
      <div className="bg-yilc-card border border-yilc-line rounded-xl p-5 text-center">
        <div className="font-extrabold text-yilc-hi text-[44px] leading-none tracking-yilc-tighter3">03</div>
        <h3 className="mt-3 font-bold text-[16px]">Complete payment</h3>
        <p className="mt-2 text-[13px] text-yilc-fg2">Full payment locks the seat. Receipt + welcome pack arrive the same day.</p>
      </div>
    </div>
  </div>
</section>

{/* ============== FAQ ============== */}
<section className="bg-yilc-card2 border-y border-yilc-line">
  <div className="mx-auto max-w-[860px] px-4 lg:px-6 py-16 lg:py-20">
    <h2 className="text-center font-extrabold tracking-yilc-tighter2 text-[28px] sm:text-[36px] leading-[1.1]">
      Frequently <span className="hi">asked</span> questions
    </h2>
    <p className="mt-3 text-center text-yilc-fg2 max-w-[58ch] mx-auto text-[15px]">Anything not covered? Send a WhatsApp — we usually reply within an hour.</p>

    <div className="mt-10 divide-y divide-yilc-line border-y border-yilc-line">
      <details className="group py-5"><summary className="cursor-pointer list-none flex items-start justify-between gap-6"><span className="text-[15.5px] font-bold tracking-yilc-tightish">Does my child need prior coding experience?</span><span className="chev text-yilc-fg2 mt-1 transition-transform text-[20px] leading-none">+</span></summary><p className="mt-3 text-[14px] text-yilc-fg2 leading-relaxed">No. The curriculum starts from zero — variables, logic, then their first working program. Children with experience get stretched further by instructors on day one.</p></details>
      <details className="group py-5"><summary className="cursor-pointer list-none flex items-start justify-between gap-6"><span className="text-[15.5px] font-bold tracking-yilc-tightish">Is it really for complete beginners?</span><span className="chev text-yilc-fg2 mt-1 transition-transform text-[20px] leading-none">+</span></summary><p className="mt-3 text-[14px] text-yilc-fg2 leading-relaxed">Yes. About 70% of our students have never written a line of code. Instructors teach from absolute zero, in clear language, with real projects on day two.</p></details>
      <details className="group py-5"><summary className="cursor-pointer list-none flex items-start justify-between gap-6"><span className="text-[15.5px] font-bold tracking-yilc-tightish">What ages exactly? My child is 10.</span><span className="chev text-yilc-fg2 mt-1 transition-transform text-[20px] leading-none">+</span></summary><p className="mt-3 text-[14px] text-yilc-fg2 leading-relaxed">10 to 18. We split the cohort into two age groups (10–13 and 14–18) so the pace fits — same curriculum, different depth.</p></details>
      <details className="group py-5"><summary className="cursor-pointer list-none flex items-start justify-between gap-6"><span className="text-[15.5px] font-bold tracking-yilc-tightish">What does a normal day look like?</span><span className="chev text-yilc-fg2 mt-1 transition-transform text-[20px] leading-none">+</span></summary><p className="mt-3 text-[14px] text-yilc-fg2 leading-relaxed">Mornings: structured lessons. Afternoons: hands-on lab time on the week's project. We finish at 3pm, Monday to Friday. Pitch Day is the final Friday.</p></details>
      <details className="group py-5"><summary className="cursor-pointer list-none flex items-start justify-between gap-6"><span className="text-[15.5px] font-bold tracking-yilc-tightish">Where is Rebase exactly?</span><span className="chev text-yilc-fg2 mt-1 transition-transform text-[20px] leading-none">+</span></summary><p className="mt-3 text-[14px] text-yilc-fg2 leading-relaxed">Obobogo, Yaoundé — directly opposite SCB Bank. Once you reserve, we send a pinned location and parking notes.</p></details>
      <details className="group py-5"><summary className="cursor-pointer list-none flex items-start justify-between gap-6"><span className="text-[15.5px] font-bold tracking-yilc-tightish">How does payment work?</span><span className="chev text-yilc-fg2 mt-1 transition-transform text-[20px] leading-none">+</span></summary><p className="mt-3 text-[14px] text-yilc-fg2 leading-relaxed">Full payment secures a seat. Mobile money, bank transfer or cash. Written confirmation + receipt issued immediately.</p></details>
      <details className="group py-5"><summary className="cursor-pointer list-none flex items-start justify-between gap-6"><span className="text-[15.5px] font-bold tracking-yilc-tightish">What exactly will my child learn?</span><span className="chev text-yilc-fg2 mt-1 transition-transform text-[20px] leading-none">+</span></summary><p className="mt-3 text-[14px] text-yilc-fg2 leading-relaxed">Python, problem solving, hands-on electronics, circuits, prototyping, teamwork, leadership and Pitch Day. Plus certified CPR training.</p></details>
    </div>
  </div>
</section>

{/* ============== FINAL CTA ============== */}
<section className="relative overflow-hidden">
  <div aria-hidden className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{"backgroundImage": "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", "backgroundSize": "56px 56px"}}></div>
  <div className="relative mx-auto max-w-[1100px] px-4 lg:px-6 py-20 lg:py-28 text-center">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yilc-warn/40 bg-yilc-warn/10 mono text-[11px] tracking-wider text-yilc-warn">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-yilc-warn pulse-hi"></span>
      ONLY 18 SEATS LEFT IN SESSION 01
    </div>
    <h2 className="mt-6 font-extrabold tracking-yilc-tighter3 text-[40px] sm:text-[64px] lg:text-[88px] leading-[0.95] max-w-[20ch] mx-auto">
      A productive holiday <span className="hi">is a choice</span>
    </h2>
    <p className="mt-6 text-yilc-fg2 max-w-[58ch] mx-auto text-[16px]">
      50 seats per session. Early Bird ends June 15. Tap WhatsApp now — we'll walk you through everything in plain language.
    </p>
    <div className="mt-10">
      <a href={wa()} target="_blank" rel="noopener" className="btn-wa inline-flex items-center justify-center gap-3 rounded-xl px-8 py-5 text-[18px] font-extrabold">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M.06 24l1.69-6.16A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.47 0 12.04 0a11.86 11.86 0 0 1 11.9 11.9c0 6.56-5.33 11.89-11.9 11.89a11.9 11.9 0 0 1-5.69-1.45L.06 24z"/></svg>
        Reserve on WhatsApp — 65,000 FCFA
      </a>
      <div className="mt-3 mono text-[11.5px] text-yilc-fg2">Replies within ~1hr · +237 680 262 136</div>
    </div>
  </div>
</section>

{/* Footer */}
<footer className="bg-yilc-bg border-t border-yilc-line">
  <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div className="flex items-center gap-2">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-yilc-hi text-yilc-bg font-extrabold text-[15px] leading-none">Y</span>
      <span className="text-[13px] tracking-yilc-tightish text-yilc-fg">YIL Young Innovators Lab · Yaoundé</span>
    </div>
    <div className="mono text-[11px] tracking-wider text-yilc-fg2">© 2026 · YIL × KIDDYKODE × PLASTIBYTES</div>
  </div>
</footer>

</main>

{/* Sticky mobile bottom */}
<div className="md:hidden fixed bottom-0 inset-x-0 z-50 safe-bottom">
  <div className="m-3 p-2 rounded-xl bg-yilc-card border border-yilc-hi/30 flex items-center gap-3 shadow-2xl">
    <div className="pl-2">
      <div className="mono text-[9.5px] text-yilc-fg2 tracking-wider">EARLY BIRD ENDS</div>
      <div className="text-[14px] font-extrabold leading-none mt-0.5 text-yilc-hi mono" id="cd-mini-3">— : — : —</div>
    </div>
    <a href={wa()} target="_blank" rel="noopener" className="ml-auto btn-wa inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-extrabold">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M.06 24l1.69-6.16A11.86 11.86 0 0 1 .14 11.9C.14 5.33 5.47 0 12.04 0a11.86 11.86 0 0 1 11.9 11.9c0 6.56-5.33 11.89-11.9 11.89a11.9 11.9 0 0 1-5.69-1.45L.06 24z"/></svg>
      Reserve now
    </a>
  </div>
</div>




    </div>
  );
}
