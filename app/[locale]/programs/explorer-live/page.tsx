"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sora, Inter } from "next/font/google";
import "./explorer-live.css";
import { RegistrationForm } from "@/app/components/RegistrationForm";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const JOURNEY = [
  { label: "Python Fundamentals", sub: "Talk to the computer", color: "var(--kk-blue)" },
  { label: "Logical Thinking", sub: "If this, then that", color: "var(--kk-red)" },
  { label: "Problem Solving", sub: "Break it down, step by step", color: "var(--kk-yellow)" },
  { label: "Creativity", sub: "Turn ideas into code", color: "var(--kk-green)" },
  { label: "Presentation", sub: "Explain and show your work", color: "var(--kk-purple)" },
  { label: "System Thinking", sub: "See how the pieces connect", color: "var(--kk-blue)" },
  { label: "Situational Awareness", sub: "Read the problem, adapt the plan", color: "var(--kk-red)" },
  { label: "Debugging", sub: "Fix & refine", color: "var(--kk-yellow)" },
];

export default function ExplorerLivePage() {
  const [timeLeft, setTimeLeft] = useState({
    d: "00",
    h: "00",
    m: "00",
    s: "00",
    expired: false,
  });

  useEffect(() => {
    const deadline = new Date("2026-11-06T23:59:59+01:00").getTime();
    const tick = () => {
      const ms = deadline - Date.now();
      if (ms <= 0) {
        setTimeLeft({
          d: "00",
          h: "00",
          m: "00",
          s: "00",
          expired: true,
        });
        return;
      }
      const d = Math.floor(ms / 86400000);
      const h = Math.floor((ms % 86400000) / 3600000) % 24;
      const m = Math.floor((ms % 3600000) / 60000) % 60;
      const s = Math.floor((ms % 60000) / 1000) % 60;
      setTimeLeft({
        d: String(d).padStart(2, "0"),
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
        expired: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`${sora.variable} ${inter.variable} explorer-live-page`}>
      {/* Top early-bird strip with countdown */}
      <div className="topstrip">
        <div className="row">
          {timeLeft.expired ? (
            <span><strong>Early-bird offer closed</strong> · Standard pricing now in effect</span>
          ) : (
            <>
              <span><strong>Register before 6 November 2026</strong></span>
              <span className="sep">·</span>
              <span className="countdown" aria-label="Time remaining">
                <span className="cd-cell"><b>{timeLeft.d}</b><small>d</small></span>
                <span className="cd-cell"><b>{timeLeft.h}</b><small>h</small></span>
                <span className="cd-cell"><b>{timeLeft.m}</b><small>m</small></span>
                <span className="cd-cell"><b>{timeLeft.s}</b><small>s</small></span>
              </span>
              <span className="sep">·</span>
              <span>Save <strong>10% on the program fee</strong></span>
            </>
          )}
        </div>
      </div>

      {/* Brand strip (non-sticky, no nav links) */}
      <div className="brandbar">
        <div className="container row">
          <a className="brand" href="#top" aria-label="KiddyKode">
            <Image src="/kiddykode-logo.png" alt="KiddyKode Logo" width={38} height={38} className="logo-img" />
            <span className="word">
              <b>kiddykode</b>
              <small>Code Early, Build Tomorrow</small>
            </span>
          </a>
          <div className="right">
            <span>Yaoundé · Cameroon</span>
            <a className="wa" href="https://wa.me/237680262136" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3zm-8.5 18.3a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.9 9.9 0 1 1 8.4 4.7z"/>
              </svg>
              +237 680 262 136
            </a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <main id="top">
        <section className="hero">
          <div className="container">
            <div className="heroGrid">
              <div className="heroCopy">
                <span className="lede">
                  <span className="live"><span className="d"></span>Live</span>
                  Online programme · Cameroon &amp; abroad · Ages 8–17
                </span>
                <h1>Give your child more than screen time. <em>Give them the skills to create</em> with technology.</h1>
                <p className="sub">
                  <strong>Explorer Live Session</strong> — a playful, live online cohort where kids build real projects every week. Starts <strong>21 November 2026</strong> · <strong>2 months</strong> · fully online.
                </p>
                <div className="chipRow">
                  <span className="chip">🟢 Live, interactive classes</span>
                  <span className="chip">🧩 Hands-on projects weekly</span>
                  <span className="chip">🌍 2 timing options</span>
                  <span className="chip">🆕 Zero experience needed</span>
                </div>
                <div className="cta-row">
                  <a className="btn btn-primary btn-lg" href="#register">Reserve My Child's Spot →</a>
                  <a className="btn btn-ghost-light btn-lg" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20a%20spot%20for%20Explorer%20Live%20Session.%20My%20child%20is%20___%20years%20old.%20Please%20share%20the%20next%20steps." target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3z"/>
                    </svg>
                    Ask on WhatsApp
                  </a>
                  <span className="note">10% off · ends 6 November 2026</span>
                </div>
              </div>

              <div className="heroArt">
                <div className="posterFrame">
                  <Image
                    src="/explorer-cohort3-nov-2026.jpeg"
                    alt="Explorer Live Session flyer — November 2026 cohort"
                    width={1122}
                    height={1402}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                  />
                </div>
                <div className="mascotFloat">
                  <Image
                    src="/explorer-live-mascot.jpeg"
                    alt="KiddyKode mascot character"
                    width={290}
                    height={233}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            </div>

            {/* Session board mirroring YIL Session 01 / 02 layout */}
            <div className="sessboard">
              <div className="head">
                <span>Class slot</span>
                <span>Time</span>
                <span>Audience</span>
                <span>Seats</span>
              </div>
              <div className="row2">
                <div><span className="lbl">Class slot</span><span className="sid">SLOT 01 · LOCAL</span></div>
                <div><span className="lbl">Time</span><span className="when">5:30 PM<small>Cameroon time</small></span></div>
                <div><span className="lbl">Audience</span><span className="meta"><b>Participants in Cameroon</b>Mon–Fri · live</span></div>
                <div><span className="lbl">Seats</span><span className="seat"><span className="d"></span>Open</span></div>
              </div>
              <div className="row2">
                <div><span className="lbl">Class slot</span><span className="sid">SLOT 02 · ABROAD</span></div>
                <div><span className="lbl">Time</span><span className="when">9:00 PM<small>Cameroon · 4:00 PM EST (USA)</small></span></div>
                <div><span className="lbl">Audience</span><span className="meta"><b>Participants abroad</b>Mon–Fri · live</span></div>
                <div><span className="lbl">Seats</span><span className="seat"><span className="d"></span>Open</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Confirmed-facts strip under hero (cream, hairline) */}
        <div className="factsrow">
          <div className="container row">
            <div className="grp"><span className="lab">Start</span><b>21 November 2026</b></div>
            <div className="grp"><span className="lab">Duration</span><b>2 months</b></div>
            <div className="grp"><span className="lab">Format</span><b>100% online</b></div>
            <div className="grp"><span className="lab">Ages</span><b>8 – 17</b></div>
            <div className="grp"><span className="lab">Early bird</span><b>Until 6 November · 10% off</b></div>
          </div>
        </div>

        {/* ═══════════════ 01 · Why parents choose KiddyKode ═══════════════ */}
        <section className="sec" id="why">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">01</span><span className="bar"></span>Why parents choose KiddyKode</span>
              <h2>Most online classes try to entertain. We're built to teach.</h2>
              <p>Real facilitators, real classes, real projects — creativity first, then code.</p>
            </div>
          </div>

          <div className="proofPhoto">
            <Image
              src="/explorer-live-classroom-grid.jpeg"
              alt="Learners and facilitators in a live Explorer Live class"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="proofCaption"><span><span className="d"></span>Live · real kids, real facilitators, every week</span></div>
          </div>

          <div className="container">
            <div className="proofIcons">
              <div className="pItem"><span className="icon ic-blue">&lt;/&gt;</span>Real coding</div>
              <div className="pItem"><span className="icon ic-green">↻</span>Hands-on builds</div>
              <div className="pItem"><span className="icon ic-yellow">★</span>Creativity first</div>
              <div className="pItem"><span className="icon ic-red">◆</span>Problem solving</div>
              <div className="pItem"><span className="icon ic-sky">♪</span>Confidence on camera</div>
              <div className="pItem"><span className="icon ic-purple">↑</span>Future-ready mindset</div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 02 · Meet the cohort ═══════════════ */}
        <section className="sec dark" id="context">
          <div className="container">
            <div className="sec-head on-dark">
              <span className="kicker on-dark"><span className="num">02</span><span className="bar"></span>Meet the cohort</span>
              <h2>Real learners, real results.</h2>
            </div>

            <div className="facesPhoto">
              <Image
                src="/explorer-live-session-faces.jpeg"
                alt="Learners and facilitators in a live Explorer Live session"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="miniStats">
              <div className="statChip"><div className="n" style={{ color: "var(--kk-sky)" }}>24</div><div className="l">Projects completed</div></div>
              <div className="statChip"><div className="n" style={{ color: "var(--kk-red)" }}>20</div><div className="l">Learners last cohort</div></div>
              <div className="statChip"><div className="n" style={{ color: "var(--kk-yellow)" }}>11.5</div><div className="l">Average age</div></div>
              <div className="statChip"><div className="n" style={{ color: "var(--kk-green)" }}>95%</div><div className="l">Completion rate</div></div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 03 · What your child will gain ═══════════════ */}
        <section className="sec cream" id="skills">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">03</span><span className="bar"></span>What your child will gain</span>
              <h2>8 weeks. 8 skills. 1 finished project.</h2>
            </div>

            <div className="journeyGrid">
              <div className="journeyImg">
                <Image
                  src="/explorer-live-lesson-preview.jpeg"
                  alt="A sample lesson from the Explorer Live curriculum"
                  width={1285}
                  height={693}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="pathSteps">
                {JOURNEY.map((step, i) => (
                  <div className="pathStep" key={step.label}>
                    <span className="pathNum" style={{ background: step.color }}>{i + 1}</span>
                    <div>
                      <h4>{step.label}</h4>
                      <span>{step.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ Mid-strip · countdown + register ═══════════════ */}
        <section style={{ padding: 0 }}>
          <div className="container" style={{ paddingTop: 0 }}>
            <div className="midstrip">
              <div className="wrap">
                <div className="topline">Register before 6 November 2026</div>
                <h2>To get a discount of <span style={{ color: "var(--kk-yellow)" }}>10% off the program fee</span></h2>
                <div className="big-cd">
                  <div className="cell"><div className="v">{timeLeft.d}</div><div className="k">Days</div></div>
                  <div className="cell"><div className="v">{timeLeft.h}</div><div className="k">Hours</div></div>
                  <div className="cell"><div className="v">{timeLeft.m}</div><div className="k">Minutes</div></div>
                  <div className="cell"><div className="v">{timeLeft.s}</div><div className="k">Seconds</div></div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
                  <a className="btn btn-primary btn-lg" href="#register">Reserve My Child's Spot →</a>
                  <a className="btn btn-ghost-light btn-lg" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20a%20spot%20for%20Explorer%20Live%20Session." target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 04 · Know your facilitators ═══════════════ */}
        <section className="sec" id="mentors" style={{ paddingTop: 120 }}>
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">04</span><span className="bar"></span>Know your facilitators</span>
              <h2>Real teachers, small group ratios — every question gets answered.</h2>
              <p>KiddyKode facilitators run the live sessions, support hands-on projects, and give every child individual feedback throughout the cohort.</p>
            </div>
            <div className="mentors">
              <div className="mentor">
                <div className="photo">
                  <Image
                    src="https://res.cloudinary.com/dsbm73ojs/image/upload/v1778875749/Untitled_design_samdro.png"
                    alt="Chiella Harriet"
                    width={120}
                    height={120}
                    className="mentor-photo"
                  />
                </div>
                <div>
                  <span className="role">Programme Director</span>
                  <h3>Chiella Harriet</h3>
                  <ul>
                    <li><span className="ck">✓</span>KiddyKode educator · [ years ] teaching experience</li>
                    <li><span className="ck">✓</span>[ Specialism · e.g. Python, Design Thinking ]</li>
                  </ul>
                  <p className="quote">"Quote from the facilitator — what they're excited about, what your child will walk away with."</p>
                  <span className="ph-note">Insert facilitator profile</span>
                </div>
              </div>
              <div className="mentor">
                <div className="photo">
                  <Image
                    src="https://res.cloudinary.com/dsbm73ojs/image/upload/v1779193923/Deodatus_Bijengsi_hlsjha.png"
                    alt="Deodatus Bijengsi"
                    width={120}
                    height={120}
                    className="mentor-photo"
                  />
                </div>
                <div>
                  <span className="role">Lead Instructor</span>
                  <h3>Deodatus Bijengsi</h3>
                  <ul>
                    <li><span className="ck">✓</span>[ Credential or role ]</li>
                    <li><span className="ck">✓</span>[ Specialism · e.g. project coaching ]</li>
                  </ul>
                  <p className="quote">"Quote from the facilitator — tone is warm, direct, and parent-trust focused."</p>
                  <span className="ph-note">Insert facilitator profile</span>
                </div>
              </div>
            </div>

            {/* Bring this back when we actually have some more partners */}
            {/*
            <div className="partners">
              <div className="label">Programme run by · in partnership with</div>
              <div className="row">
                <div className="logo">KiddyKode</div>
                <div className="logo">Insert partner</div>
                <div className="logo">Insert partner</div>
                <div className="logo">Insert partner</div>
                <div className="logo">Insert partner</div>
              </div>
            </div>
            */}
          </div>
        </section>

        {/* ═══════════════ 05 · Pick your timing & lock the price ═══════════════ */}
        <section className="sec cream" id="pricing">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">05</span><span className="bar"></span>Pick your timing &amp; lock the price</span>
              <h2>Two timing options — one curriculum. Pick the slot that works around your family's day.</h2>
            </div>

            <div className="pricegrid">
              <article className="pricecard">
                <div className="top">
                  <span className="sid">SLOT 01 · 5:30 PM CAMEROON TIME</span>
                  <span className="where">Local</span>
                </div>
                <h3>For participants in Cameroon</h3>
                <ul>
                  <li><span className="ck">✓</span>Ages 8–17 · 2-month cohort</li>
                  <li><span className="ck">✓</span>Live group classes · 100% online</li>
                  <li><span className="ck">✓</span>Same curriculum as Slot 02</li>
                  <li><span className="ck">✓</span><b>50,000 FRS</b> · or <b>45,000 FRS</b> with early bird</li>
                </ul>
                <a className="wa-link" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20a%20Cameroon%20(5%3A30%20PM)%20spot%20for%20Explorer%20Live%20Session.%20My%20child%20is%20___%20years%20old.">Ask about Slot 01 →</a>
              </article>
              <article className="pricecard abroad">
                <div className="top">
                  <span className="sid">SLOT 02 · 9:00 PM / 4:00 PM EST</span>
                  <span className="where">Abroad</span>
                </div>
                <h3>For participants abroad</h3>
                <ul>
                  <li><span className="ck">✓</span>Ages 8–17 · 2-month cohort</li>
                  <li><span className="ck">✓</span>Live group classes · 100% online</li>
                  <li><span className="ck">✓</span>Time zone optimised for North America</li>
                  <li><span className="ck">✓</span><b>65,000 FRS</b> · or <b>58,500 FRS</b> with early bird</li>
                </ul>
                <a className="wa-link" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20an%20abroad%20(9%3A00%20PM%20Cameroon%20%2F%204%3A00%20PM%20EST)%20spot%20for%20Explorer%20Live%20Session.%20My%20child%20is%20___%20years%20old.">Ask about Slot 02 →</a>
              </article>
            </div>

            <div className="earlybird-block" id="earlybird">
              <div>
                <span className="savebadge">★ Early bird · ends 6 November 2026</span>
                <h3>Register before 6 November and save 10% on the program fee</h3>
                <p>Discount applies to both Cameroon and abroad pricing. One transparent fee — paid once, mobile money or cash. Written confirmation issued the same day.</p>
              </div>
              <div className="right">
                <span className="small">Cameroonians · today</span>
                <div className="row" style={{ marginTop: 4 }}>
                  <span className="now">45,000<span style={{ fontSize: 14, color: "var(--kk-muted)", marginLeft: 6 }}>FRS</span></span>
                  <span className="was">50,000 FRS</span>
                </div>
                <span className="footnote">Abroad-based: <b style={{ color: "var(--kk-text)" }}>58,500 FRS</b> <span style={{ textDecoration: "line-through", marginLeft: 4 }}>65,000 FRS</span></span>
                <a className="btn btn-blue" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20claim%20the%20Explorer%20Live%20Session%20early-bird%20discount.">Claim early-bird on WhatsApp →</a>
              </div>
            </div>

            {/* Embedded Registration Form Section */}
            <div className="sec-head center" style={{ marginTop: 80, marginBottom: 40 }}>
              <span className="kicker"><span className="num">★</span><span className="bar"></span>Register Now</span>
              <h2>Secure your child's spot</h2>
              <p>Complete the form below to enroll your child in the Explorer Live cohort. We will confirm your seat and send welcome details.</p>
            </div>
            <div id="register" style={{ maxWidth: 720, margin: '0 auto' }}>
              <RegistrationForm />
            </div>
          </div>
        </section>

        {/* ═══════════════ 06 · How to reserve in 3 steps ═══════════════ */}
        <section className="sec" id="reserve">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">06</span><span className="bar"></span>How to reserve in 3 simple steps</span>
              <h2>One short conversation — and your child's spot is secured.</h2>
            </div>
            <div className="steps">
              <div className="step">
                <span className="stepEmoji" style={{ background: "var(--kk-sky)" }}>💬</span>
                <h3>Tap WhatsApp</h3>
                <p>Your message is pre-filled. Just edit your child's age and tap send.</p>
              </div>
              <div className="step">
                <span className="stepEmoji" style={{ background: "var(--kk-red)" }}>🗓️</span>
                <h3>Pick your slot</h3>
                <p>We confirm 5:30 PM (Cameroon) or 9:00 PM (abroad), plus a parent welcome pack.</p>
              </div>
              <div className="step">
                <span className="stepEmoji" style={{ background: "var(--kk-yellow)" }}>✅</span>
                <h3>Complete payment</h3>
                <p>Mobile money or bank transfer. Receipt lands the same day — seat locked.</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 36 }}>
              <a className="btn btn-wa btn-lg" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20a%20spot%20for%20Explorer%20Live%20Session.%20My%20child%20is%20___%20years%20old.%20Please%20share%20the%20next%20steps." target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3z"/>
                </svg>
                Reserve on WhatsApp — +237 680 262 136
              </a>
            </div>
            <p className="center" style={{ marginTop: 14, fontSize: 13, color: "var(--kk-muted)" }}>Replies within ~1hr · Yaoundé, Cameroon</p>
          </div>
        </section>

        {/* ═══════════════ 07 · FAQ ═══════════════ */}
        <section className="sec cream" id="faq">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">07</span><span className="bar"></span>Frequently asked questions</span>
              <h2>Anything not covered? Send a WhatsApp — we usually reply within an hour.</h2>
            </div>
            <div className="faq">
              <details className="faq-item" open>
                <summary>Does my child need prior coding experience?<span className="plus">+</span></summary>
                <div className="answer">No. Explorer Live starts from zero — exploration and skill-building first. Children with some experience get stretched further by facilitators from day one.</div>
              </details>
              <details className="faq-item">
                <summary>Will classes be live or pre-recorded?<span className="plus">+</span></summary>
                <div className="answer">Live and interactive. Your child joins a real facilitator and peers in real time, with hands-on projects between sessions.</div>
              </details>
              <details className="faq-item">
                <summary>How will my child attend?<span className="plus">+</span></summary>
                <div className="answer">The program is 100% online — your child joins from home with a laptop or desktop. Connection details are shared after registration.</div>
              </details>
              <details className="faq-item">
                <summary>What ages exactly? My child is 9.<span className="plus">+</span></summary>
                <div className="answer">Explorer Live is for children aged 8 to 17. Facilitators adjust pace and depth so the same curriculum fits each age group.</div>
              </details>
              <details className="faq-item">
                <summary>How long is the program?<span className="plus">+</span></summary>
                <div className="answer">The cohort runs for 2 months, starting 21 November 2026.</div>
              </details>
              <details className="faq-item">
                <summary>What are the class times?<span className="plus">+</span></summary>
                <div className="answer">Two options: <strong>5:30 PM Cameroon time</strong> for participants in Cameroon, and <strong>9:00 PM Cameroon time</strong> (equivalent to <strong>4:00 PM EST</strong>) for participants abroad.</div>
              </details>
              <details className="faq-item">
                <summary>How do I claim the 10% early-bird discount?<span className="plus">+</span></summary>
                <div className="answer">Register before <strong>6 November 2026</strong>. The discount is applied automatically — the countdown at the top of this page shows the exact time remaining.</div>
              </details>
              <details className="faq-item">
                <summary>How does payment work?<span className="plus">+</span></summary>
                <div className="answer">Full payment secures a seat. Mobile money. Written confirmation and receipt are issued immediately.</div>
              </details>
            </div>
          </div>
        </section>

        {/* Seat-left urgency strip */}
        <div className="seatstrip">⚡ Limited cohort · early-bird ends 6 November 2026 — secure your seat before pricing increases</div>

        {/* ═══════════════ 08 · The choice every parent makes ═══════════════ */}
        <section className="final-wrap">
          <div className="container">
            <span className="kicker"><span className="num">08</span><span className="bar"></span>The choice every parent makes</span>
            <h2>A productive online cohort is a choice. Help your child <span style={{ color: "var(--kk-red)" }}>build the future</span> — not just consume it.</h2>
            <p>Explorer Live gives children a structured, creative, and confidence-building way to engage with technology through live learning and meaningful projects. Limited seats per cohort. Early-bird pricing ends 6 November.</p>
            <div className="ctas">
              <a className="btn btn-blue btn-lg" href="#register">Reserve My Child's Spot →</a>
              <a className="btn btn-wa btn-lg" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20a%20spot%20for%20Explorer%20Live%20Session." target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3z"/>
                </svg>
                Talk to us on WhatsApp
              </a>
            </div>
            <p className="replies">Questions before enrolling? <b>Call or WhatsApp +237 680 262 136</b> · Replies within ~1hr</p>
          </div>
        </section>

        {/* ═══════════════ Footer countdown bar ═══════════════ */}
        <div className="footdown">
          <div className="container row">
            <span className="label">Early bird ends</span>
            <span className="timer">
              <span className="c"><span>{timeLeft.d}</span><small>Days</small></span>
              <span className="c"><span>{timeLeft.h}</span><small>Hours</small></span>
              <span className="c"><span>{timeLeft.m}</span><small>Min</small></span>
              <span className="c"><span>{timeLeft.s}</span><small>Sec</small></span>
            </span>
            <a className="btn btn-primary" href="#register">Reserve now →</a>
          </div>
        </div>
      </main>
    </div>
  );
}
