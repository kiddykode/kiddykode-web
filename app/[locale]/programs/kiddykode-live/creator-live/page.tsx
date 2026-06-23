'use client';

import React from "react";
import { Link } from "@/i18n/navigation";
import styles from "./creator-live.module.css";

export default function CreatorLivePage() {
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
            <span>Creator Live</span>
          </div>
          <div className={styles.progHeroGrid}>
            <div>
              <span className="eyebrow">Program 03 · KiddyKode Live</span>
              <div className={styles.outcomeBadge}>
                <span className={styles.arr}>→</span> Graduates as an <b>Innovator</b>
              </div>
              <h1 className="text-balance">Creator Live</h1>
              <p className="lede mt-7">
                Creator Live empowers learners to identify real-world problems, understand the people affected, design meaningful solutions, build innovative projects, and create positive impact — through technology, creativity and leadership.
              </p>
              <span className={styles.liveTag}>Code early. Build tomorrow.</span>
              <div className={styles.meta}>
                <span>
                  <strong>Ages</strong> 12 – 17
                </span>
                <span>
                  <strong>Duration</strong> 12 weeks
                </span>
                <span>
                  <strong>Language</strong> Python
                </span>
                <span>
                  <strong>From</strong> 75,000 FCFA
                </span>
              </div>
              <div className={styles.heroActions}>
                <Link className="btn btn--primary" href="#register">
                  Register for Creator Live <span className="arrow">→</span>
                </Link>
                <Link className="btn btn--ghost" href="/programs/kiddykode-live#compare">
                  Compare programs <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div className={styles.progHeroMedia}>
              <div
                className="img-placeholder tone-clay photo"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80')",
                  height: "100%",
                }}
              >
                <div className="img-cap">Replace ▸ Creator cohort presenting a community-impact project</div>
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
              <h2 style={{ marginTop: "18px" }}>Six focus areas, one project with real impact.</h2>
            </div>
            <div>
              <p className="lede">
                Creators work with advanced Python and design thinking to identify a real problem, build an innovative solution, and lead it from idea to impact.
              </p>
            </div>
          </div>

          <div className={styles.learnGrid}>
            <div className={styles.focusList}>
              <div className={styles.focusItem}>
                <span className={styles.fn}>01</span>
                <span className={styles.ft}>Advanced Python Projects</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>02</span>
                <span className={styles.ft}>Problem Identification</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>03</span>
                <span className={styles.ft}>Innovation</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>04</span>
                <span className={styles.ft}>Design Thinking</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>05</span>
                <span className={styles.ft}>Collaboration</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>06</span>
                <span className={styles.ft}>Leadership</span>
              </div>
            </div>

            <div className={styles.skillsPanel}>
              <span className="eyebrow">Skills developed</span>
              <h3 style={{ marginTop: "16px" }}>What a Creator walks away with.</h3>
              <p>
                Creators develop the situational awareness and leadership to see problems others miss — and the solution-design skills to do something about them.
              </p>
              <div className={styles.skillTags}>
                <span className={styles.chip}>Situational Awareness</span>
                <span className={styles.chip}>Human-Centered Thinking</span>
                <span className={styles.chip}>Innovation &amp; Creativity</span>
                <span className={styles.chip}>Critical Thinking</span>
                <span className={styles.chip}>Systems Thinking</span>
                <span className={styles.chip}>Anticipatory Thinking</span>
                <span className={styles.chip}>Solution Design</span>
                <span className={styles.chip}>Leadership</span>
                <span className={styles.chip}>Collaboration</span>
                <span className={styles.chip}>Communication &amp; Presentation</span>
                <span className={styles.chip}>Project Management</span>
                <span className={styles.chip}>Social Impact Mindset</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== RHYTHM ============== */}
      <section className={styles.rhythm} data-screen-label="03 12-week rhythm">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">03 / The 12-week rhythm</span>
              <h2 style={{ marginTop: "18px" }}>Imagine, build, ship, share.</h2>
            </div>
            <div>
              <p className="lede">
                Live sessions follow the same studio rhythm across the program — every cohort ends with a Demo Night where Creators present their project and its real-world impact.
              </p>
            </div>
          </div>
          <div className={styles.rhythmSteps}>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 01</div>
              <h4>Imagine</h4>
              <p>
                Creators investigate a real-world problem, study the people it affects, and frame a solution worth building.
              </p>
              <div className={styles.when}>Weeks 1 – 2</div>
            </div>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 02</div>
              <h4>Build</h4>
              <p>
                Live, mentor-led advanced Python. Creators build an innovative project, applying design thinking as they go.
              </p>
              <div className={styles.when}>Weeks 3 – 9</div>
            </div>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 03</div>
              <h4>Ship</h4>
              <p>
                Creators ship a working solution, test it with real users, and refine it through structured feedback.
              </p>
              <div className={styles.when}>Weeks 10 – 11</div>
            </div>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 04</div>
              <h4>Share</h4>
              <p>
                Demo Night. Each Creator presents their project, its impact, and what they'd build next — leading the room.
              </p>
              <div className={styles.when}>Week 12</div>
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
              <div className={styles.sub}>Live, small-group cohort · 12 weeks</div>
              <div className={styles.priceRows}>
                <div className={styles.priceRow}>
                  <div className={styles.where}>Cameroon</div>
                  <div className={styles.amt}>
                    75,000 <small>FCFA</small>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <div className={styles.where}>Diaspora</div>
                  <div className={styles.amt}>
                    $200 <small>USD</small>
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
                    120,000 <small>FCFA</small>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <div className={styles.where}>
                    Online <small>Diaspora</small>
                  </div>
                  <div className={styles.amt}>
                    $250 <small>USD</small>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <div className={styles.where}>
                    Home Sessions <small>Yaoundé only</small>
                  </div>
                  <div className={styles.amt}>
                    150,000 <small>FCFA</small>
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
                A live, small-group cohort that moves through the 12 weeks together — peer review, demo days, and a shared community of Creators.
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
          <h2>Register for Creator Live.</h2>
          <p className="lede" style={{ color: "rgba(247,243,236,0.72)", marginTop: "20px" }}>
            Pick a learning format above, then start your child's first cohort. Scholarship places are available through local chapters.
          </p>
          <div className={styles.row}>
            <Link className="btn btn--primary" href="/contact">
              Register for Creator Live <span className="arrow">→</span>
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
