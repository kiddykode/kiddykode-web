'use client';

import React from "react";
import { Link } from "@/i18n/navigation";
import styles from "./explorer-live.module.css";

export default function ExplorerLivePage() {
  return (
    <div className={styles.pageWrapper}>
      {/* ============== HERO ============== */}
      <section className={styles.progHero} data-screen-label="01 Program Hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link>
            <span className="sep text-[var(--color-ink-300)]">/</span>
            <Link href="/programs">Programs</Link>
            <span className="sep text-[var(--color-ink-300)]">/</span>
            <Link href="/programs/kiddykode-live">KiddyKode Live</Link>
            <span className="sep text-[var(--color-ink-300)]">/</span>
            <span>Explorer Live</span>
          </div>
          <div className={styles.progHeroGrid}>
            <div>
              <span className="eyebrow">Program 01 · KiddyKode Live</span>
              <div className={styles.outcomeBadge}>
                <span className={styles.arr}>→</span> Graduates as a <b>Thinker</b>
              </div>
              <h1 className="text-balance">Explorer Live</h1>
              <p className="lede mt-7">
                Explorer Live helps children develop confidence, curiosity, focus, logical thinking, creativity, problem-solving, observation and digital confidence — while learning how to think, build and communicate through engaging coding projects and real-world challenges.
              </p>
              <span className={styles.liveTag}>Code early. Build tomorrow.</span>
              <div className={styles.meta}>
                <span>
                  <strong>Ages</strong> 8 – 17
                </span>
                <span>
                  <strong>Duration</strong> 8 weeks
                </span>
                <span>
                  <strong>Language</strong> Python
                </span>
                <span>
                  <strong>From</strong> 50,000 FCFA
                </span>
              </div>
              <div className={styles.heroActions}>
                <Link className="btn btn--primary" href="#register">
                  Register for Explorer Live <span className="arrow">→</span>
                </Link>
                <Link className="btn btn--ghost" href="/programs/kiddykode-live#compare">
                  Compare programs <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div className={styles.progHeroMedia}>
              <div
                className="img-placeholder tone-warm photo"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=80')",
                  height: "100%",
                }}
              >
                <div className="img-cap">Replace ▸ Explorer cohort in a first Python session</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== LEARN: FOCUS + SKILLS ============== */}
      <section className={styles.learn} data-screen-label="02 What they learn">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">02 / What they learn</span>
              <h2 style={{ marginTop: "18px" }}>Eight focus areas, one finished project.</h2>
            </div>
            <div>
              <p className="lede">
                Concepts are introduced as a child needs them for their project — never in isolation. By week eight, every Explorer has built and presented something of their own.
              </p>
            </div>
          </div>

          <div className={styles.learnGrid}>
            <div className={styles.focusList}>
              <div className={styles.focusItem}>
                <span className={styles.fn}>01</span>
                <span className={styles.ft}>Python Fundamentals</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>02</span>
                <span className={styles.ft}>Logical &amp; Computational Thinking</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>03</span>
                <span className={styles.ft}>Problem Solving</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>04</span>
                <span className={styles.ft}>Creativity</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>05</span>
                <span className={styles.ft}>Focus &amp; Observation</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>06</span>
                <span className={styles.ft}>Systems Thinking</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>07</span>
                <span className={styles.ft}>Communication &amp; Presentation</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>08</span>
                <span className={styles.ft}>Debugging &amp; Improvement</span>
              </div>
            </div>

            <div className={styles.skillsPanel}>
              <span className="eyebrow">Skills developed</span>
              <h3 style={{ marginTop: "16px" }}>What an Explorer walks away with.</h3>
              <p>
                The point isn't just code. Explorer Live grows the habits of mind that make a confident, curious learner — in coding and well beyond it.
              </p>
              <div className={styles.skillTags}>
                <span className={styles.chip}>Curiosity</span>
                <span className={styles.chip}>Focus</span>
                <span className={styles.chip}>Logical Thinking</span>
                <span className={styles.chip}>Creativity</span>
                <span className={styles.chip}>Problem Solving</span>
                <span className={styles.chip}>Systems Thinking</span>
                <span className={styles.chip}>Communication</span>
                <span className={styles.chip}>Confidence</span>
                <span className={styles.chip}>Digital Confidence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== RHYTHM ============== */}
      <section className={styles.rhythm} data-screen-label="03 8-week rhythm">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">03 / The 8-week rhythm</span>
              <h2 style={{ marginTop: "18px" }}>Imagine, build, ship, share.</h2>
            </div>
            <div>
              <p className="lede">
                Live sessions follow the same studio rhythm across the program — every cohort ends with a Demo Night where Explorers present their project to family and peers.
              </p>
            </div>
          </div>
          <div className={styles.rhythmSteps}>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 01</div>
              <h4>Imagine</h4>
              <p>
                Explorers meet their cohort and sketch a first project idea rooted in something they care about — before touching a line of code.
              </p>
              <div className={styles.when}>Weeks 1 – 2</div>
            </div>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 02</div>
              <h4>Build</h4>
              <p>
                Live, mentor-led Python sessions. New concepts arrive exactly when the project needs them, with hands-on practice each week.
              </p>
              <div className={styles.when}>Weeks 3 – 6</div>
            </div>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 03</div>
              <h4>Ship</h4>
              <p>
                Explorers finish a working project, debug it with their facilitator, and improve it through structured peer feedback.
              </p>
              <div className={styles.when}>Week 7</div>
            </div>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 04</div>
              <h4>Share</h4>
              <p>
                Demo Night. Each Explorer presents what they built, why it matters, and what they learned — to family and the cohort.
              </p>
              <div className={styles.when}>Week 8</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section className={styles.pricing} data-screen-label="04 Pricing">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">04 / Pricing</span>
              <h2 style={{ marginTop: "18px" }}>Choose how your child learns.</h2>
            </div>
            <div>
              <p className="lede">
                Join a live cohort for the most accessible, community-driven experience — or choose KiddyKode Personal Learning for one-on-one attention, online or at home in Yaoundé.
              </p>
            </div>
          </div>

          <div className={styles.priceGrid}>
            <div className={`${styles.priceCard} ${styles.featured}`}>
              <span className={styles.tag}>Most popular</span>
              <h3>Cohort Learning</h3>
              <div className={styles.sub}>Live, small-group cohort · 8 weeks</div>
              <div className={styles.priceRows}>
                <div className={styles.priceRow}>
                  <div className={styles.where}>Cameroon</div>
                  <div className={styles.amt}>
                    50,000 <small>FCFA</small>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <div className={styles.where}>Diaspora</div>
                  <div className={styles.amt}>
                    $120 <small>USD</small>
                  </div>
                </div>
              </div>
              <Link className="btn btn--primary justify-center w-full mt-6" href="/contact">
                Register for a cohort <span className="arrow">→</span>
              </Link>
              <p className={styles.note}>
                Includes live facilitator sessions, project mentorship and a Demo Night place.
              </p>
            </div>

            <div className={`${styles.priceCard} ${styles.personal}`}>
              <span className={styles.tag}>One-on-one</span>
              <h3>KiddyKode Personal Learning</h3>
              <div className={styles.sub}>Private sessions · online or at home</div>
              <div className={styles.priceRows}>
                <div className={styles.priceRow}>
                  <div className={styles.where}>
                    Online <small>Africa</small>
                  </div>
                  <div className={styles.amt}>
                    80,000 <small>FCFA</small>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <div className={styles.where}>
                    Online <small>Diaspora</small>
                  </div>
                  <div className={styles.amt}>
                    $150 <small>USD</small>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <div className={styles.where}>
                    Home Sessions <small>Yaoundé only</small>
                  </div>
                  <div className={styles.amt}>
                    100,000 <small>FCFA</small>
                  </div>
                </div>
              </div>
              <Link className="btn btn--ghost justify-center w-full mt-6" href="/contact">
                Request personal learning <span className="arrow">→</span>
              </Link>
              <p className={styles.note}>
                Best for learners who want depth, flexible scheduling, or focused one-on-one pacing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FORMATS ============== */}
      <section className={styles.formats} data-screen-label="05 Learning formats">
        <div className="wrap">
          <span className="eyebrow">05 / Available learning formats</span>
          <h2 style={{ marginTop: "18px", maxWidth: "18ch" }}>One curriculum, three ways to learn it.</h2>
          <div className={styles.formatGrid}>
            <div className={styles.fcell}>
              <div className={styles.fn}>Format 01</div>
              <h4>Cohort Learning</h4>
              <p>
                A live, small-group cohort that moves through the 8 weeks together — peer review, demo days, and a shared community of Explorers.
              </p>
            </div>
            <div className={styles.fcell}>
              <div className={styles.fn}>Format 02</div>
              <h4>Personal — Online</h4>
              <p>
                One-on-one sessions with a KiddyKode facilitator over video, available across Africa and the diaspora on a flexible schedule.
              </p>
            </div>
            <div className={styles.fcell}>
              <div className={styles.fn}>Format 03</div>
              <h4>Personal — Home (Yaoundé)</h4>
              <p>
                In-person, one-on-one coaching at home for families in Yaoundé who prefer face-to-face learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className={styles.ctaStrip} id="register" data-screen-label="06 Register CTA">
        <div className="wrap">
          <span className="eyebrow">Register</span>
          <h2>Register for Explorer Live.</h2>
          <p className="lede" style={{ color: "rgba(247,243,236,0.72)", marginTop: "20px" }}>
            Pick a learning format above, then start your child's first cohort. Scholarship places are available through local chapters.
          </p>
          <div className={styles.row}>
            <Link className="btn btn--primary" href="/contact">
              Register for Explorer Live <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/programs/kiddykode-live">
              See all programs <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost" href="/contact">
              Talk to us <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
