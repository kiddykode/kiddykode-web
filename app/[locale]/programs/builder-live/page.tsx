"use client";

import Image from "next/image";
import { Sora, Inter } from "next/font/google";
import "./builder-live.css";
import { RegistrationForm } from "@/app/components/RegistrationForm";
import { VideoEmbed } from "@/app/components/VideoEmbed";

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
  { label: "Python Programming", sub: "Go deeper than the basics", color: "var(--kk-blue)" },
  { label: "Human-Centered Design", sub: "Notice a real problem worth solving", color: "var(--kk-red)" },
  { label: "Functions & Modular Thinking", sub: "Build in reusable pieces", color: "var(--kk-yellow)" },
  { label: "Problem Solving", sub: "Design a solution, not just an answer", color: "var(--kk-green)" },
  { label: "Systems Thinking", sub: "See how the pieces connect", color: "var(--kk-purple)" },
  { label: "Creativity & Innovation", sub: "Turn a need into a project", color: "var(--kk-blue)" },
  { label: "Debugging & Improvement", sub: "Refine it through feedback", color: "var(--kk-yellow)" },
  { label: "Communication & Presentation", sub: "Ship it, then show it", color: "var(--kk-red)" },
];

export default function BuilderLivePage() {
  return (
    <div className={`${sora.variable} ${inter.variable} builder-live-page`}>
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
                  Online programme · Cameroon &amp; abroad · Ages 10–14
                </span>
                <h1>From creating projects to <em>building solutions that matter.</em></h1>
                <p className="sub">
                  <strong>Builder Live</strong> — a live online cohort where learners use Python and Human-Centered Design to ship a project that solves a real problem. <strong>10 weeks</strong> · fully online.
                </p>
                <div className="chipRow">
                  <span className="chip">🟢 Live, interactive classes</span>
                  <span className="chip">🧠 Human-Centered Design</span>
                  <span className="chip">🛠️ Ships a real project</span>
                  <span className="chip">🎤 Ends with Demo Night</span>
                </div>
                <div className="cta-row">
                  <a className="btn btn-primary btn-lg" href="#register">Reserve My Child&apos;s Spot →</a>
                  <a className="btn btn-ghost-light btn-lg" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20a%20spot%20for%20Builder%20Live.%20My%20child%20is%20___%20years%20old.%20Please%20share%20the%20next%20steps." target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3z"/>
                    </svg>
                    Ask on WhatsApp
                  </a>
                  <span className="note">Dates confirmed on registration</span>
                </div>
              </div>

              <div className="heroArt">
                <div className="posterFrame">
                  <Image
                    src="https://res.cloudinary.com/dsbm73ojs/image/upload/v1792790051/Builder-live-flyer_fw8agq.jpg"
                    alt="Builder Live cohort flyer"
                    width={1122}
                    height={1402}
                    sizes="(max-width: 900px) 100vw, 520px"
                    priority
                    style={{ width: "100%", height: "auto", display: "block" }}
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
          </div>
        </section>

        {/* Confirmed-facts strip under hero (cream, hairline) */}
        <div className="factsrow">
          <div className="container row">
            <div className="grp"><span className="lab">Start</span><b>Date TBC</b></div>
            <div className="grp"><span className="lab">Duration</span><b>10 weeks</b></div>
            <div className="grp"><span className="lab">Format</span><b>100% online</b></div>
            <div className="grp"><span className="lab">Ages</span><b>10 – 14</b></div>
            <div className="grp"><span className="lab">From</span><b>85,000 FCFA</b></div>
          </div>
        </div>

        {/* ═══════════════ 01 · Why parents choose ═══════════════ */}
        <section className="sec" id="why">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">01</span><span className="bar"></span>Why parents choose Builder Live</span>
              <h2>Past "I made a game." Into "I built something that helps people."</h2>
              <p>Real facilitators, real cohort, a real finished project — design thinking first, then code.</p>
            </div>
          </div>

          <div className="proofPhoto">
            {/* TODO: replace with a real Builder Live classroom/cohort photo */}
            <div
              className="img-placeholder tone-sage photo"
              style={{ height: "100%", borderRadius: 0 }}
            >
              <div className="img-cap">Replace ▸ Builder cohort designing a project with mentor feedback</div>
            </div>
            <div className="proofCaption"><span><span className="d"></span>Live · real learners, real facilitators, every week</span></div>
          </div>

          <div className="container">
            <div className="proofIcons">
              <div className="pItem"><span className="icon ic-blue">&lt;/&gt;</span>Real coding</div>
              <div className="pItem"><span className="icon ic-red">◆</span>Human-Centered Design</div>
              <div className="pItem"><span className="icon ic-yellow">★</span>Problem solving</div>
              <div className="pItem"><span className="icon ic-green">↻</span>Ships a real project</div>
              <div className="pItem"><span className="icon ic-sky">♪</span>Confidence presenting</div>
              <div className="pItem"><span className="icon ic-purple">↑</span>Future-ready mindset</div>
            </div>
            <div style={{ marginTop: 40 }}>
              {/* TODO: replace with the real Builder Live classroom/Demo Night video */}
              <VideoEmbed youtubeId="REPLACE_WITH_YOUTUBE_ID" caption="See a Builder Live Demo Night" />
            </div>
          </div>
        </section>

        {/* ═══════════════ 02 · What your child will gain ═══════════════ */}
        <section className="sec cream" id="skills">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">02</span><span className="bar"></span>What your child will gain</span>
              <h2>10 weeks. 8 focus areas. 1 shipped project.</h2>
            </div>

            <div className="journeyGrid">
              <div className="journeyImg">
                {/* TODO: replace with a real Builder Live curriculum/lesson preview */}
                <div
                  className="img-placeholder tone-cool photo"
                  style={{ aspectRatio: "1285 / 693" }}
                >
                  <div className="img-cap">Replace ▸ A sample lesson from the Builder Live curriculum</div>
                </div>
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

        {/* ═══════════════ Mid-strip · reserve CTA ═══════════════ */}
        <section style={{ padding: 0 }}>
          <div className="container" style={{ paddingTop: 0 }}>
            <div className="midstrip">
              <div className="wrap">
                <div className="topline">Builder Live · Cohort 01</div>
                <h2>Ends with a <span style={{ color: "var(--kk-yellow)" }}>Demo Night</span> where your child presents their own project</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
                  <a className="btn btn-primary btn-lg" href="#register">Reserve My Child&apos;s Spot →</a>
                  <a className="btn btn-ghost-light btn-lg" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20a%20spot%20for%20Builder%20Live." target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 03 · Know your facilitators ═══════════════ */}
        <section className="sec" id="mentors" style={{ paddingTop: 120 }}>
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">03</span><span className="bar"></span>Know your facilitators</span>
              <h2>Real teachers, small group ratios — every question gets answered.</h2>
              <p>KiddyKode facilitators run the live sessions, support each project, and give every child individual feedback throughout the cohort.</p>
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
                  <p className="quote">"Quote from the facilitator — what they're excited about, what your child will walk away with."</p>
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
                  <p className="quote">"Quote from the facilitator — tone is warm, direct, and parent-trust focused."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 04 · Lock your child's spot ═══════════════ */}
        <section className="sec cream" id="pricing">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">04</span><span className="bar"></span>Lock your child&apos;s spot</span>
              <h2>One cohort, one transparent fee.</h2>
            </div>

            <div className="pricegrid">
              <article className="pricecard">
                <div className="top">
                  <span className="sid">CAMEROON</span>
                  <span className="where">Local</span>
                </div>
                <h3>For participants in Cameroon</h3>
                <ul>
                  <li><span className="ck">✓</span>Ages 10–14 · 10-week cohort</li>
                  <li><span className="ck">✓</span>Live group classes · 100% online</li>
                  <li><span className="ck">✓</span>Ends with a Demo Night</li>
                  <li><span className="ck">✓</span><b>85,000 FCFA</b></li>
                </ul>
                <a className="wa-link" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20a%20Cameroon%20spot%20for%20Builder%20Live.%20My%20child%20is%20___%20years%20old.">Ask about Cameroon pricing →</a>
              </article>
              <article className="pricecard abroad">
                <div className="top">
                  <span className="sid">DIASPORA</span>
                  <span className="where">Abroad</span>
                </div>
                <h3>For participants abroad</h3>
                <ul>
                  <li><span className="ck">✓</span>Ages 10–14 · 10-week cohort</li>
                  <li><span className="ck">✓</span>Live group classes · 100% online</li>
                  <li><span className="ck">✓</span>Ends with a Demo Night</li>
                  <li><span className="ck">✓</span><b>$270 USD</b></li>
                </ul>
                <a className="wa-link" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20an%20abroad%20spot%20for%20Builder%20Live.%20My%20child%20is%20___%20years%20old.">Ask about diaspora pricing →</a>
              </article>
            </div>

            {/* Embedded Registration Form Section */}
            <div className="sec-head center" style={{ marginTop: 80, marginBottom: 40 }}>
              <span className="kicker"><span className="num">★</span><span className="bar"></span>Register Now</span>
              <h2>Secure your child&apos;s spot</h2>
              <p>Complete the form below to enroll your child in the Builder Live cohort. We will confirm your seat and send welcome details.</p>
            </div>
            <div id="register" style={{ maxWidth: 720, margin: '0 auto' }}>
              <RegistrationForm program="builder-live" />
            </div>
          </div>
        </section>

        {/* ═══════════════ 05 · How to reserve in 3 steps ═══════════════ */}
        <section className="sec" id="reserve">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">05</span><span className="bar"></span>How to reserve in 3 simple steps</span>
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
                <h3>Confirm your slot</h3>
                <p>We confirm cohort dates and timing, plus a parent welcome pack.</p>
              </div>
              <div className="step">
                <span className="stepEmoji" style={{ background: "var(--kk-yellow)" }}>✅</span>
                <h3>Complete payment</h3>
                <p>Mobile money or bank transfer. Receipt lands the same day — seat locked.</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 36 }}>
              <a className="btn btn-wa btn-lg" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20a%20spot%20for%20Builder%20Live.%20My%20child%20is%20___%20years%20old.%20Please%20share%20the%20next%20steps." target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3z"/>
                </svg>
                Reserve on WhatsApp — +237 680 262 136
              </a>
            </div>
            <p className="center" style={{ marginTop: 14, fontSize: 13, color: "var(--kk-muted)" }}>Replies within ~1hr · Yaoundé, Cameroon</p>
          </div>
        </section>

        {/* ═══════════════ 06 · FAQ ═══════════════ */}
        <section className="sec cream" id="faq">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">06</span><span className="bar"></span>Frequently asked questions</span>
              <h2>Anything not covered? Send a WhatsApp — we usually reply within an hour.</h2>
            </div>
            <div className="faq">
              <details className="faq-item" open>
                <summary>Does my child need prior coding experience?<span className="plus">+</span></summary>
                <div className="answer">Some is helpful but not required. Builder Live is the step up from Explorer Live, but a motivated first-time coder can join and will be supported from day one.</div>
              </details>
              <details className="faq-item">
                <summary>How is this different from Explorer Live?<span className="plus">+</span></summary>
                <div className="answer">Explorer Live builds the foundations. Builder Live goes deeper into Python and adds KiddyKode's Human-Centered Design framework, so your child ships one real project that solves a problem — not just an exercise.</div>
              </details>
              <details className="faq-item">
                <summary>What ages exactly?<span className="plus">+</span></summary>
                <div className="answer">Builder Live is for learners aged 10 to 14. Facilitators adjust pace and depth so the same curriculum fits each age group.</div>
              </details>
            </div>
          </div>
        </section>

        {/* ═══════════════ 07 · The choice every parent makes ═══════════════ */}
        <section className="final-wrap">
          <div className="container">
            <span className="kicker"><span className="num">07</span><span className="bar"></span>The choice every parent makes</span>
            <h2>Give your child the chance to <span style={{ color: "var(--kk-red)" }}>build something that matters</span> — not just finish an exercise.</h2>
            <p>Builder Live gives children a structured, creative, and confidence-building way to ship a real project through live learning and mentor feedback. Limited seats per cohort.</p>
            <div className="ctas">
              <a className="btn btn-blue btn-lg" href="#register">Reserve My Child&apos;s Spot →</a>
              <a className="btn btn-wa btn-lg" href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20reserve%20a%20spot%20for%20Builder%20Live." target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3z"/>
                </svg>
                Talk to us on WhatsApp
              </a>
            </div>
            <p className="replies">Questions before enrolling? <b>Call or WhatsApp +237 680 262 136</b> · Replies within ~1hr</p>
          </div>
        </section>

        {/* ═══════════════ Footer CTA bar ═══════════════ */}
        <div className="footdown">
          <div className="container row">
            <span className="label">Builder Live · Cohort 01</span>
            <a className="btn btn-primary" href="#register">Reserve now →</a>
          </div>
        </div>
      </main>
    </div>
  );
}
