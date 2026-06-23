'use client';

import React from "react";
import { Link } from "@/i18n/navigation";
import styles from "./builder-live.module.css";

export default function BuilderLivePage() {
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
            <span>Builder Live</span>
          </div>
          <div className={styles.progHeroGrid}>
            <div>
              <span className="eyebrow">Program 02 · KiddyKode Live</span>
              <div className={styles.outcomeBadge}>
                <span className={styles.arr}>→</span> Graduates as a <b>Builder</b>
              </div>
              <h1 className="text-balance">Builder Live</h1>
              <p className="lede mt-7">
                Builder Live helps learners move from creating projects to building solutions that matter. Using Python, project-based learning and KiddyKode's Human-Centered Design framework, learners gain the confidence to identify problems, design solutions, build meaningful projects, improve their work through feedback, and communicate their ideas — thinking like creators, innovators and problem-solvers.
              </p>
              <span className={styles.liveTag}>Code early. Build tomorrow.</span>
              <div className={styles.meta}>
                <span>
                  <strong>Ages</strong> 10 – 14
                </span>
                <span>
                  <strong>Duration</strong> 10 weeks
                </span>
                <span>
                  <strong>Language</strong> Python
                </span>
                <span>
                  <strong>From</strong> 85,000 FCFA
                </span>
              </div>
              <div className={styles.heroActions}>
                <Link className="btn btn--primary" href="#register">
                  Register for Builder Live <span className="arrow">→</span>
                </Link>
                <Link className="btn btn--ghost" href="/programs/kiddykode-live#compare">
                  Compare programs <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div className={styles.progHeroMedia}>
              <div
                className="img-placeholder tone-sage photo"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80')",
                  height: "100%",
                }}
              >
                <div className="img-cap">Replace ▸ Builder cohort designing a project with mentor feedback</div>
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
              <h2 style={{ marginTop: "18px" }}>Eleven focus areas, one solution that matters.</h2>
            </div>
            <div>
              <p className="lede">
                Builders go deeper into Python — functions, data structures, modular thinking — and apply it through KiddyKode's design framework to ship a project that solves a real problem.
              </p>
            </div>
          </div>

          <div className={styles.learnGrid}>
            <div className={styles.focusList}>
              <div className={styles.focusItem}>
                <span className={styles.fn}>01</span>
                <span className={styles.ft}>Python Programming</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>02</span>
                <span className={styles.ft}>Functions &amp; Modular Thinking</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>03</span>
                <span className={styles.ft}>Data Structures</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>04</span>
                <span className={styles.ft}>Project Development</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>05</span>
                <span className={styles.ft}>Human-Centered Design</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>06</span>
                <span className={styles.ft}>Problem Solving</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>07</span>
                <span className={styles.ft}>Systems Thinking</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>08</span>
                <span className={styles.ft}>Creativity &amp; Innovation</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>09</span>
                <span className={styles.ft}>Debugging &amp; Improvement</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>10</span>
                <span className={styles.ft}>Collaboration</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.fn}>11</span>
                <span className={styles.ft}>Communication &amp; Presentation</span>
              </div>
            </div>

            <div className={styles.skillsPanel}>
              <span className="eyebrow">Skills developed</span>
              <h3 style={{ marginTop: "16px" }}>What a Builder walks away with.</h3>
              <p>
                Builders develop intellectual ownership of their work — the judgement and persistence to take a problem from idea to finished, user-ready project.
              </p>
              <div className={styles.skillTags}>
                <span className={styles.chip}>Independent Problem Solving</span>
                <span className={styles.chip}>Intellectual Ownership</span>
                <span className={styles.chip}>Focus &amp; Persistence</span>
                <span className={styles.chip}>Computational Thinking</span>
                <span className={styles.chip}>Systems Thinking</span>
                <span className={styles.chip}>Pattern Recognition</span>
                <span className={styles.chip}>Creativity &amp; Innovation</span>
                <span className={styles.chip}>Empathy &amp; User-Centered Thinking</span>
                <span className={styles.chip}>Collaboration</span>
                <span className={styles.chip}>Project Building</span>
                <span className={styles.chip}>Communication &amp; Presentation</span>
                <span className={styles.chip}>Coding Confidence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== HCD FRAMEWORK ============== */}
      <section className={styles.hcd} data-screen-label="03 HCD Framework">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">03 / Human-Centered Design</span>
              <h2 style={{ marginTop: "18px" }}>The framework behind every Builder project.</h2>
            </div>
            <div>
              <p className="lede">
                Builders don't just learn to code — they learn to design. KiddyKode's Human-Centered Design framework carries a learner from noticing a real need to inspiring others with what they've built.
              </p>
            </div>
          </div>
          <div className={styles.hcdFlow}>
            <div className={styles.hcdStep}>
              <div className={styles.hn}>01</div>
              <h4>Notice</h4>
              <p>Spot a real problem in the world around them.</p>
            </div>
            <div className={styles.hcdStep}>
              <div className={styles.hn}>02</div>
              <h4>Care</h4>
              <p>Understand the people it affects, and why it matters.</p>
            </div>
            <div className={styles.hcdStep}>
              <div className={styles.hn}>03</div>
              <h4>Imagine</h4>
              <p>Generate ideas for a solution worth building.</p>
            </div>
            <div className={styles.hcdStep}>
              <div className={styles.hn}>04</div>
              <h4>Create</h4>
              <p>Build a working project in Python.</p>
            </div>
            <div className={styles.hcdStep}>
              <div className={styles.hn}>05</div>
              <h4>Improve</h4>
              <p>Refine it through testing and feedback.</p>
            </div>
            <div className={styles.hcdStep}>
              <div className={styles.hn}>06</div>
              <h4>Inspire</h4>
              <p>Share the work and move others to act.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== RHYTHM ============== */}
      <section className={styles.rhythm} data-screen-label="04 10-week rhythm">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">04 / The 10-week rhythm</span>
              <h2 style={{ marginTop: "18px" }}>Imagine, build, ship, share.</h2>
            </div>
            <div>
              <p className="lede">
                Live sessions follow the same studio rhythm across the program — every cohort ends with a Demo Night where Builders present the problem, the people, and their solution.
              </p>
            </div>
          </div>
          <div className={styles.rhythmSteps}>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 01</div>
              <h4>Imagine</h4>
              <p>
                Builders identify a real problem worth solving and map who it affects — using the design framework before writing code.
              </p>
              <div className={styles.when}>Weeks 1 – 2</div>
            </div>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 02</div>
              <h4>Build</h4>
              <p>
                Live, mentor-led Python. Functions, data structures and modular thinking arrive exactly when the project needs them.
              </p>
              <div className={styles.when}>Weeks 3 – 7</div>
            </div>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 03</div>
              <h4>Ship</h4>
              <p>
                Builders ship a working solution, debug it with their facilitator, and improve it through structured peer feedback.
              </p>
              <div className={styles.when}>Weeks 8 – 9</div>
            </div>
            <div className={styles.rstep}>
              <div className={styles.pn}>Phase 04</div>
              <h4>Share</h4>
              <p>
                Demo Night. Each Builder presents their solution — the problem, the people, and the impact — to family and the cohort.
              </p>
              <div className={styles.when}>Week 10</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section className={styles.pricing} data-screen-label="05 Pricing">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">05 / Pricing</span>
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
              <div className={styles.sub}>Live, small-group cohort · 10 weeks</div>
              <div className={styles.priceRows}>
                <div className={styles.priceRow}>
                  <div className={styles.where}>Cameroon</div>
                  <div className={styles.amt}>
                    85,000 <small>FCFA</small>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <div className={styles.where}>Diaspora</div>
                  <div className={styles.amt}>
                    $270 <small>USD</small>
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
                    100,000 <small>FCFA</small>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <div className={styles.where}>
                    Online <small>Diaspora</small>
                  </div>
                  <div className={styles.amt}>
                    $270 <small>USD</small>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <div className={styles.where}>
                    Home Sessions <small>Yaoundé only</small>
                  </div>
                  <div className={styles.amt}>
                    120,000 <small>FCFA</small>
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
      <section className={styles.formats} data-screen-label="06 Learning formats">
        <div className="wrap">
          <span className="eyebrow">06 / Available learning formats</span>
          <h2 style={{ marginTop: "18px", maxWidth: "18ch" }}>One curriculum, three ways to learn it.</h2>
          <div className={styles.formatGrid}>
            <div className={styles.fcell}>
              <div className={styles.fn}>Format 01</div>
              <h4>Cohort Learning</h4>
              <p>
                A live, small-group cohort that moves through the 10 weeks together — peer review, demo days, and a shared community of Builders.
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
      <section className={styles.ctaStrip} id="register" data-screen-label="07 Register CTA">
        <div className="wrap">
          <span className="eyebrow">Register</span>
          <h2>Register for Builder Live.</h2>
          <p className="lede" style={{ color: "rgba(247,243,236,0.72)", marginTop: "20px" }}>
            Pick a learning format above, then start your child's first cohort. Scholarship places are available through local chapters.
          </p>
          <div className={styles.row}>
            <Link className="btn btn--primary" href="/contact">
              Register for Builder Live <span className="arrow">→</span>
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
