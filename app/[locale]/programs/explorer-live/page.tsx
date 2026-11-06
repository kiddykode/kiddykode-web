"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sora, Inter } from "next/font/google";
import "./explorer-live.css";
import { RegistrationForm } from "@/app/components/RegistrationForm";
import { VideoEmbed } from "@/app/components/VideoEmbed";
import { useLocale } from "@/i18n/context";
import { en, fr } from "./content";

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

export default function ExplorerLivePage() {
  const locale = useLocale();
  const t = locale === "fr" ? fr : en;

  const [timeLeft, setTimeLeft] = useState({
    d: "00",
    h: "00",
    m: "00",
    s: "00",
    expired: false,
  });

  useEffect(() => {
    const deadline = new Date("2026-11-20T23:59:59+01:00").getTime();
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
            <span>{t.topstrip.expired}</span>
          ) : (
            <>
              <span><strong>{t.topstrip.registerBefore}</strong></span>
              <span className="sep">·</span>
              <span className="countdown" aria-label="Time remaining">
                <span className="cd-cell"><b>{timeLeft.d}</b><small>d</small></span>
                <span className="cd-cell"><b>{timeLeft.h}</b><small>h</small></span>
                <span className="cd-cell"><b>{timeLeft.m}</b><small>m</small></span>
                <span className="cd-cell"><b>{timeLeft.s}</b><small>s</small></span>
              </span>
              {t.topstrip.active}
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

      {/* HERO — full-width headline, then the video after the chips, just before the CTAs */}
      <main id="top">
        <section className="hero">
          <div className="container">
            <div className="heroCopy">
              <span className="lede">
                <span className="live"><span className="d"></span>Live</span>
                {t.lede}
              </span>
              <h1>{t.heroTitlePre}<em>{t.heroTitleEm}</em>{t.heroTitlePost}</h1>
              <p className="sub">{t.heroSub}</p>

              <div className="chipRow">
                {t.chips.map((chip) => (
                  <span className="chip" key={chip}>{chip}</span>
                ))}
              </div>

              <div className="heroVideoWrap">
                <VideoEmbed youtubeId="eMIWi3k1dKo" caption={t.heroVideoCaption} />
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

              <div className="cta-row">
                <a className="btn btn-primary btn-lg" href="#register">{t.reserveCta}</a>
                <a className="btn btn-ghost-light btn-lg" href={`https://wa.me/237680262136?text=${encodeURIComponent(t.waAskReserveText)}`} target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3z"/>
                  </svg>
                  {t.waAsk}
                </a>
                <span className="note">{t.earlybirdNote}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Confirmed-facts strip under hero (cream, hairline) */}
        <div className="factsrow">
          <div className="container row">
            <div className="grp"><span className="lab">{t.factsrow.start.label}</span><b>{t.factsrow.start.value}</b></div>
            <div className="grp"><span className="lab">{t.factsrow.duration.label}</span><b>{t.factsrow.duration.value}</b></div>
            <div className="grp"><span className="lab">{t.factsrow.format.label}</span><b>{t.factsrow.format.value}</b></div>
            <div className="grp"><span className="lab">{t.factsrow.ages.label}</span><b>{t.factsrow.ages.value}</b></div>
            <div className="grp"><span className="lab">{t.factsrow.earlybird.label}</span><b>{t.factsrow.earlybird.value}</b></div>
          </div>
        </div>

        {/* ═══════════════ 01 · The Explorer Live Offer ═══════════════ */}
        <section className="sec cream" id="offer">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">01</span><span className="bar"></span>{t.offer.kicker}</span>
              <h2>{t.offer.title}</h2>
              <p>{t.offer.sub}</p>
            </div>

            <div className="offerFacts">
              <div className="factCard">
                <span className="lab">{t.factsrow.ages.label}</span>
                <span className="val">{t.factsrow.ages.value}</span>
              </div>
              <div className="factCard">
                <span className="lab">{t.factsrow.duration.label}</span>
                <span className="val">{t.factsrow.duration.value}</span>
              </div>
              <div className="factCard">
                <span className="lab">{t.factsrow.format.label}</span>
                <span className="val">{t.factsrow.format.value}</span>
              </div>
              <div className="factCard">
                <span className="lab">{t.offer.languageTrack.label}</span>
                <span className="val">{t.offer.languageTrack.value}</span>
              </div>
            </div>

            {/* Schedule */}
            <div className="offerBlock">
              <span className="subkicker">{t.offer.scheduleKicker}</span>
              <div className="sessboard">
                <div className="head">
                  {t.sessboard.headers.map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </div>
                <div className="row2">
                  <div><span className="lbl">{t.sessboard.headers[0]}</span><span className="sid">{t.sessboard.slot1.id}</span></div>
                  <div><span className="lbl">{t.sessboard.headers[1]}</span><span className="when">{t.sessboard.slot1.time}<small>{t.sessboard.slot1.tz}</small></span></div>
                  <div><span className="lbl">{t.sessboard.headers[2]}</span><span className="meta"><b>{t.sessboard.slot1.audience}</b>{t.sessboard.slot1.schedule}</span></div>
                  <div><span className="lbl">{t.sessboard.headers[3]}</span><span className="seat"><span className="d"></span>{t.sessboard.slot1.seats}</span></div>
                </div>
                <div className="row2">
                  <div><span className="lbl">{t.sessboard.headers[0]}</span><span className="sid">{t.sessboard.slot2.id}</span></div>
                  <div><span className="lbl">{t.sessboard.headers[1]}</span><span className="when">{t.sessboard.slot2.time}<small>{t.sessboard.slot2.tz}</small></span></div>
                  <div><span className="lbl">{t.sessboard.headers[2]}</span><span className="meta"><b>{t.sessboard.slot2.audience}</b>{t.sessboard.slot2.schedule}</span></div>
                  <div><span className="lbl">{t.sessboard.headers[3]}</span><span className="seat"><span className="d"></span>{t.sessboard.slot2.seats}</span></div>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="offerBlock">
              <span className="subkicker">{t.offer.curriculumKicker}</span>
              <h3 style={{ marginBottom: 24 }}>{t.skills.title}</h3>
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
                  {t.skills.journey.map((step, i) => (
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

            {/* Pricing */}
            <div className="offerBlock" id="pricing">
              <span className="subkicker">{t.offer.pricingKicker}</span>
              <div className="pricegrid">
                <article className="pricecard">
                  <div className="top">
                    <span className="sid">{t.pricing.slot1.sid}</span>
                    <span className="where">{t.pricing.slot1.where}</span>
                  </div>
                  <h3>{t.pricing.slot1.title}</h3>
                  <ul>
                    {t.pricing.slot1.bullets.map((b) => (
                      <li key={b}><span className="ck">✓</span>{b}</li>
                    ))}
                    <li><span className="ck">✓</span>{t.pricing.slot1.price}</li>
                  </ul>
                  <a className="wa-link" href={`https://wa.me/237680262136?text=${encodeURIComponent(t.pricing.slot1.waText)}`}>{t.pricing.slot1.waLink}</a>
                </article>
                <article className="pricecard abroad">
                  <div className="top">
                    <span className="sid">{t.pricing.slot2.sid}</span>
                    <span className="where">{t.pricing.slot2.where}</span>
                  </div>
                  <h3>{t.pricing.slot2.title}</h3>
                  <ul>
                    {t.pricing.slot2.bullets.map((b) => (
                      <li key={b}><span className="ck">✓</span>{b}</li>
                    ))}
                    <li><span className="ck">✓</span>{t.pricing.slot2.price}</li>
                  </ul>
                  <a className="wa-link" href={`https://wa.me/237680262136?text=${encodeURIComponent(t.pricing.slot2.waText)}`}>{t.pricing.slot2.waLink}</a>
                </article>
              </div>

              <div className="earlybird-block" id="earlybird">
                <div>
                  <span className="savebadge">{t.pricing.earlybird.badge}</span>
                  <h3>{t.pricing.earlybird.title}</h3>
                  <p>{t.pricing.earlybird.sub}</p>
                </div>
                <div className="right">
                  <span className="small">{t.pricing.earlybird.todayLabel}</span>
                  <div className="row" style={{ marginTop: 4 }}>
                    <span className="now">{t.pricing.earlybird.now}<span style={{ fontSize: 14, color: "var(--kk-muted)", marginLeft: 6 }}>{t.pricing.earlybird.ccy}</span></span>
                    <span className="was">{t.pricing.earlybird.was}</span>
                  </div>
                  <span className="small" style={{ marginTop: 18 }}>{t.pricing.earlybird.abroadLabel}</span>
                  <div className="row" style={{ marginTop: 4 }}>
                    <span className="now">{t.pricing.earlybird.abroadNow}<span style={{ fontSize: 14, color: "var(--kk-muted)", marginLeft: 6 }}>{t.pricing.earlybird.ccy}</span></span>
                    <span className="was">{t.pricing.earlybird.abroadWas}</span>
                  </div>
                  <a className="btn btn-blue" href={`https://wa.me/237680262136?text=${encodeURIComponent(t.pricing.earlybird.waText)}`}>{t.pricing.earlybird.cta}</a>
                </div>
              </div>
            </div>

            {/* Embedded Registration Form Section */}
            <div className="sec-head center" style={{ marginTop: 80, marginBottom: 40 }}>
              <span className="kicker"><span className="num">★</span><span className="bar"></span>{t.pricing.registerKicker}</span>
              <h2>{t.pricing.registerTitle}</h2>
              <p>{t.pricing.registerSub}</p>
            </div>
            <div id="register" style={{ maxWidth: 720, margin: '0 auto' }}>
              <RegistrationForm />
            </div>
          </div>
        </section>

        {/* ═══════════════ Mid-strip · countdown + register ═══════════════ */}
        <section style={{ padding: 0 }}>
          <div className="container" style={{ paddingTop: 0 }}>
            <div className="midstrip">
              <div className="wrap">
                <div className="topline">{t.midstrip.topline}</div>
                <h2>{t.midstrip.titlePre}<span style={{ color: "var(--kk-yellow)" }}>{t.midstrip.titleHighlight}</span></h2>
                <div className="big-cd">
                  <div className="cell"><div className="v">{timeLeft.d}</div><div className="k">{t.midstrip.days}</div></div>
                  <div className="cell"><div className="v">{timeLeft.h}</div><div className="k">{t.midstrip.hours}</div></div>
                  <div className="cell"><div className="v">{timeLeft.m}</div><div className="k">{t.midstrip.minutes}</div></div>
                  <div className="cell"><div className="v">{timeLeft.s}</div><div className="k">{t.midstrip.seconds}</div></div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
                  <a className="btn btn-primary btn-lg" href="#register">{t.reserveCta}</a>
                  <a className="btn btn-ghost-light btn-lg" href={`https://wa.me/237680262136?text=${encodeURIComponent(t.waAskShortText)}`} target="_blank" rel="noopener noreferrer">{t.waAsk}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 02 · Evidence — real learners, real results ═══════════════ */}
        <section className="sec dark" id="evidence">
          <div className="container">
            <div className="sec-head on-dark">
              <span className="kicker on-dark"><span className="num">02</span><span className="bar"></span>{t.context.kicker}</span>
              <h2>{t.context.title}</h2>
              <p>{t.context.sub}</p>
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
              <div className="statChip"><div className="n" style={{ color: "var(--kk-sky)" }}>{t.context.stats[0].n}</div><div className="l">{t.context.stats[0].l}</div></div>
              <div className="statChip"><div className="n" style={{ color: "var(--kk-red)" }}>{t.context.stats[1].n}</div><div className="l">{t.context.stats[1].l}</div></div>
              <div className="statChip"><div className="n" style={{ color: "var(--kk-yellow)" }}>{t.context.stats[2].n}</div><div className="l">{t.context.stats[2].l}</div></div>
              <div className="statChip"><div className="n" style={{ color: "var(--kk-green)" }}>{t.context.stats[3].n}</div><div className="l">{t.context.stats[3].l}</div></div>
            </div>

            <div className="offerBlock">
              <h3 className="testimonialsHeadline">{t.context.testimonialsHeadline}</h3>
              <span className="subkicker on-dark">{t.context.testimonialsKicker}</span>
              <div className="testimonialGrid">
                {t.context.testimonials.map((item, i) => (
                  <div className="testimonialCard" key={i}>
                    <p className="q">{item.quote}</p>
                    <p className="who">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="offerBlock">
              <span className="subkicker on-dark">{t.context.improvementKicker}</span>
              <div className="improveGrid">
                {t.context.improvementExamples.map((item, i) => (
                  <div className="improveCard" key={i}>
                    <div className="shot">
                      <Image src={item.img} alt={item.imgAlt} fill sizes="(max-width: 768px) 100vw, 560px" style={{ objectFit: "cover" }} />
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 03 · Parent reassurance ═══════════════ */}
        <section className="sec" id="reassurance">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">03</span><span className="bar"></span>{t.why.kicker}</span>
              <h2>{t.why.title}</h2>
              <p>{t.why.sub}</p>
            </div>
          </div>

          <div className="proofPhoto">
            <Image
              src="/explorer-live-classroom-grid.jpeg"
              alt="Learners and facilitators in a live Explorer Live class"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="proofCaption"><span><span className="d"></span>{t.why.proofCaption}</span></div>
          </div>

          <div className="container">
            <div className="proofIcons">
              <div className="pItem"><span className="icon ic-blue">&lt;/&gt;</span>{t.why.icons[0]}</div>
              <div className="pItem"><span className="icon ic-green">↻</span>{t.why.icons[1]}</div>
              <div className="pItem"><span className="icon ic-yellow">★</span>{t.why.icons[2]}</div>
              <div className="pItem"><span className="icon ic-red">◆</span>{t.why.icons[3]}</div>
              <div className="pItem"><span className="icon ic-sky">♪</span>{t.why.icons[4]}</div>
              <div className="pItem"><span className="icon ic-purple">↑</span>{t.why.icons[5]}</div>
            </div>

            <div className="offerBlock">
              <div className="offerFacts">
                <div className="factCard">
                  <span className="lab">{t.why.techKicker}</span>
                  <ul>
                    {t.why.techItems.map((item, i) => (
                      <li key={i}><span className="ck">✓</span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="factCard">
                  <span className="lab">{t.why.attendanceKicker}</span>
                  <span className="val">{t.why.attendanceValue}</span>
                </div>
              </div>
              <div className="factCard" style={{ marginTop: 16 }}>
                <span className="lab">{t.why.supportKicker}</span>
                <span className="val">{t.why.supportValue}</span>
              </div>
            </div>

            <div className="offerBlock">
              <span className="subkicker">{t.why.mentorsKicker}</span>
              <p style={{ color: "var(--kk-muted)", marginBottom: 28, maxWidth: 640 }}>{t.why.mentorsSub}</p>
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
                    <span className="role">{t.mentors.director.role}</span>
                    <h3>Chiella Harriet</h3>
                    <p className="quote">{t.mentors.director.quote}</p>
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
                    <span className="role">{t.mentors.instructor.role}</span>
                    <h3>Deodatus Bijengsi</h3>
                    <p className="quote">{t.mentors.instructor.quote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 04 · FAQ ═══════════════ */}
        <section className="sec cream" id="faq">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">04</span><span className="bar"></span>{t.faq.kicker}</span>
              <h2>{t.faq.title}</h2>
            </div>
            <div className="faq">
              {t.faq.items.map((item, i) => (
                <details className="faq-item" key={item.q} open={i === 0}>
                  <summary>{item.q}<span className="plus">+</span></summary>
                  <div className="answer">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 05 · How to reserve in 3 steps ═══════════════ */}
        <section className="sec" id="reserve">
          <div className="container">
            <div className="sec-head">
              <span className="kicker"><span className="num">05</span><span className="bar"></span>{t.reserve.kicker}</span>
              <h2>{t.reserve.title}</h2>
            </div>
            <div className="steps">
              {t.reserve.steps.map((step, i) => (
                <div className="step" key={step.title}>
                  <span className="stepEmoji" style={{ background: i === 0 ? "var(--kk-sky)" : i === 1 ? "var(--kk-red)" : "var(--kk-yellow)" }}>{step.emoji}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 36 }}>
              <a className="btn btn-wa btn-lg" href={`https://wa.me/237680262136?text=${encodeURIComponent(t.waAskReserveText)}`} target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3z"/>
                </svg>
                {t.reserve.waCta}
              </a>
            </div>
            <p className="center" style={{ marginTop: 14, fontSize: 13, color: "var(--kk-muted)" }}>{t.reserve.replies}</p>
          </div>
        </section>

        {/* Seat-left urgency strip */}
        <div className="seatstrip">{t.seatstrip}</div>

        {/* ═══════════════ 06 · The choice every parent makes ═══════════════ */}
        <section className="final-wrap">
          <div className="container">
            <span className="kicker"><span className="num">06</span><span className="bar"></span>{t.final.kicker}</span>
            <h2>{t.final.titlePre}<span style={{ color: "var(--kk-red)" }}>{t.final.titleHighlight}</span>{t.final.titlePost}</h2>
            <p>{t.final.body}</p>
            <div className="ctas">
              <a className="btn btn-blue btn-lg" href="#register">{t.reserveCta}</a>
              <a className="btn btn-wa btn-lg" href={`https://wa.me/237680262136?text=${encodeURIComponent(t.waAskShortText)}`} target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.5-8.3z"/>
                </svg>
                {t.final.waCta}
              </a>
            </div>
            <p className="replies">{t.final.replies}</p>
          </div>
        </section>

        {/* ═══════════════ Footer countdown bar ═══════════════ */}
        <div className="footdown">
          <div className="container row">
            <span className="label">{t.footdown.label}</span>
            <span className="timer">
              <span className="c"><span>{timeLeft.d}</span><small>{t.footdown.days}</small></span>
              <span className="c"><span>{timeLeft.h}</span><small>{t.footdown.hours}</small></span>
              <span className="c"><span>{timeLeft.m}</span><small>{t.footdown.minutes}</small></span>
              <span className="c"><span>{timeLeft.s}</span><small>{t.footdown.seconds}</small></span>
            </span>
            <a className="btn btn-primary" href="#register">{t.footdown.cta}</a>
          </div>
        </div>
      </main>
    </div>
  );
}
