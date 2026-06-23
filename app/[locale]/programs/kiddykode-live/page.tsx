'use client';

import React from "react";
import { Link } from "@/i18n/navigation";
import styles from "./kiddykode-live.module.css";

export default function KiddyKodeLivePage() {
  return (
    <>
      {/* ============== PAGE HERO ============== */}
      <section className="page-hero" data-screen-label="01 Page Hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link>
            <span className="sep text-[var(--color-ink-300)]">/</span>
            <Link href="/programs">Programs</Link>
            <span className="sep text-[var(--color-ink-300)]">/</span>
            <span>KiddyKode Live</span>
          </div>
          <span className="eyebrow">KiddyKode Live · Online cohorts</span>
          <h1 style={{ marginTop: "24px" }} className="text-balance">
            Live, mentor-led cohorts that turn curiosity into finished projects.
          </h1>
          <p className="lede mt-7">
            We do not simply teach coding. We help children become thinkers, builders, innovators, collaborators, and future leaders — one live project at a time. Choose the program that fits your child's age and stage, then join the next cohort.
          </p>
          <span className={styles.liveTag}>Code early. Build tomorrow.</span>
          <div className="meta mt-10 pt-6 border-t border-[var(--color-line)] flex gap-8 flex-wrap font-mono text-xs text-[var(--color-ink-500)] tracking-[0.04em]">
            <span>
              <strong className="text-[var(--color-ink-900)] font-semibold">Three programs</strong> Explorer · Builder · Creator
            </span>
            <span>
              <strong className="text-[var(--color-ink-900)] font-semibold">Ages</strong> 8 – 17
            </span>
            <span>
              <strong className="text-[var(--color-ink-900)] font-semibold">Format</strong> Cohort &amp; one-on-one
            </span>
            <span>
              <strong className="text-[var(--color-ink-900)] font-semibold">Language</strong> Python
            </span>
          </div>
        </div>
      </section>

      {/* ============== COHORT CARDS ============== */}
      <section className={styles.cohorts} id="cohorts" data-screen-label="02 Join a Cohort">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">01 / Join a cohort</span>
              <h2 style={{ marginTop: "18px" }}>Three programs. One learning pathway.</h2>
            </div>
            <div>
              <p className="lede">
                Each program builds on the last — from a child's first lines of Python to shipping a solution that solves a real problem in their community.
              </p>
            </div>
          </div>

          <div className={styles.cohortGrid}>
            {/* Explorer */}
            <div className={`${styles.progCard} ${styles.cExplorer}`} data-screen-label="Explorer card">
              <div className={styles.cardTop}>
                <span className={styles.pn}>01 / Explorer</span>
                <span className={styles.outcome}>
                  Becomes a <b>Thinker</b>
                </span>
              </div>
              <h3>Explorer Live</h3>
              <div className={styles.ages}>
                <span>
                  <span className={styles.dot}></span>Ages 8–17
                </span>
                <span>8 weeks</span>
                <span>Python</span>
              </div>
              <p className={styles.blurb}>
                Children build confidence, curiosity, focus and logical thinking — learning how to think, build and communicate through engaging coding projects and real-world challenges.
              </p>
              <div className={styles.miniLabel}>Focus areas</div>
              <div className={styles.chips}>
                <span className={styles.chip}>Python Fundamentals</span>
                <span className={styles.chip}>Logical Thinking</span>
                <span className={styles.chip}>Problem Solving</span>
                <span className={styles.chip}>Creativity</span>
                <span className={`${styles.chip} ${styles.more}`}>+4 more</span>
              </div>
              <div className={styles.priceBlock}>
                <div className={styles.priceFrom}>Cohort · from</div>
                <div className={styles.price}>
                  50,000 <em>FCFA</em>
                </div>
                <div className={styles.priceSub}>
                  Diaspora $120 · One-on-one from 80,000 FCFA
                </div>
              </div>
              <div className={styles.cardActions}>
                <Link className="btn btn--primary justify-center w-full" href="#register">
                  Register for Explorer <span className="arrow">→</span>
                </Link>
                <Link className={styles.viewLink} href="/programs/kiddykode-live/explorer-live">
                  View full program <span className={styles.arrow}>→</span>
                </Link>
              </div>
            </div>

            {/* Builder */}
            <div className={`${styles.progCard} ${styles.cBuilder}`} data-screen-label="Builder card">
              <div className={styles.cardTop}>
                <span className={styles.pn}>02 / Builder</span>
                <span className={styles.outcome}>
                  Becomes a <b>Builder</b>
                </span>
              </div>
              <h3>Builder Live</h3>
              <div className={styles.ages}>
                <span>
                  <span className={styles.dot}></span>Ages 10–14
                </span>
                <span>10 weeks</span>
                <span>Python</span>
              </div>
              <p className={styles.blurb}>
                Learners move from creating projects to building solutions that matter — using Python, project-based learning, and KiddyKode's Human-Centered Design Framework.
              </p>
              <div className={styles.miniLabel}>Focus areas</div>
              <div className={styles.chips}>
                <span className={styles.chip}>Python Programming</span>
                <span className={styles.chip}>Data Structures</span>
                <span className={styles.chip}>Human-Centered Design</span>
                <span className={styles.chip}>Project Development</span>
                <span className={`${styles.chip} ${styles.more}`}>+7 more</span>
              </div>
              <div className={styles.priceBlock}>
                <div className={styles.priceFrom}>Cohort · from</div>
                <div className={styles.price}>
                  85,000 <em>FCFA</em>
                </div>
                <div className={styles.priceSub}>
                  Diaspora $270 · One-on-one from 100,000 FCFA
                </div>
              </div>
              <div className={styles.cardActions}>
                <Link className="btn btn--primary justify-center w-full" href="#register">
                  Register for Builder <span className="arrow">→</span>
                </Link>
                <Link className={styles.viewLink} href="/programs/kiddykode-live/builder-live">
                  View full program <span className={styles.arrow}>→</span>
                </Link>
              </div>
            </div>

            {/* Creator */}
            <div className={`${styles.progCard} ${styles.cCreator}`} data-screen-label="Creator card">
              <div className={styles.cardTop}>
                <span className={styles.pn}>03 / Creator</span>
                <span className={styles.outcome}>
                  Becomes an <b>Innovator</b>
                </span>
              </div>
              <h3>Creator Live</h3>
              <div className={styles.ages}>
                <span>
                  <span className={styles.dot}></span>Ages 12–17
                </span>
                <span>12 weeks</span>
                <span>Python</span>
              </div>
              <p className={styles.blurb}>
                Learners identify real-world problems, understand the people affected, design meaningful solutions, and create positive impact through technology, creativity and leadership.
              </p>
              <div className={styles.miniLabel}>Focus areas</div>
              <div className={styles.chips}>
                <span className={styles.chip}>Advanced Python</span>
                <span className={styles.chip}>Design Thinking</span>
                <span className={styles.chip}>Innovation</span>
                <span className={styles.chip}>Leadership</span>
                <span className={`${styles.chip} ${styles.more}`}>+2 more</span>
              </div>
              <div className={styles.priceBlock}>
                <div className={styles.priceFrom}>Cohort · from</div>
                <div className={styles.price}>
                  75,000 <em>FCFA</em>
                </div>
                <div className={styles.priceSub}>
                  Diaspora $200 · One-on-one from 120,000 FCFA
                </div>
              </div>
              <div className={styles.cardActions}>
                <Link className="btn btn--primary justify-center w-full" href="#register">
                  Register for Creator <span className="arrow">→</span>
                </Link>
                <Link className={styles.viewLink} href="/programs/kiddykode-live/creator-live">
                  View full program <span className={styles.arrow}>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section className={styles.pricing} data-screen-label="03 Pricing">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">02 / Pricing</span>
              <h2 style={{ marginTop: "18px" }}>Every format, in full.</h2>
            </div>
            <div>
              <p className="lede">
                Cohort learning is the most accessible way in. Families who want one-on-one attention can choose KiddyKode Personal Learning — online or, in Yaoundé, at home.
              </p>
            </div>
          </div>

          <div className={styles.ptableWrap}>
            <table className={styles.ptable}>
              <thead>
                <tr>
                  <th>Format</th>
                  <th className={styles.region}>Region</th>
                  <th className={`${styles.prog} ${styles.hExplorer}`}>Explorer Live</th>
                  <th className={`${styles.prog} ${styles.hBuilder}`}>Builder Live</th>
                  <th className={`${styles.prog} ${styles.hCreator}`}>Creator Live</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.groupHead}>
                  <td colSpan={5}>Cohort Learning</td>
                </tr>
                <tr>
                  <td>
                    <span className={styles.label}>Cohort</span>
                  </td>
                  <td className={styles.region}>Cameroon</td>
                  <td>
                    <span className={styles.amt}>50,000 FCFA</span>
                  </td>
                  <td>
                    <span className={styles.amt}>85,000 FCFA</span>
                  </td>
                  <td>
                    <span className={styles.amt}>75,000 FCFA</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={styles.label}>Cohort</span>
                  </td>
                  <td className={styles.region}>Diaspora</td>
                  <td>
                    <span className={styles.amt}>$120</span>
                    <div className={styles.usd}>USD</div>
                  </td>
                  <td>
                    <span className={styles.amt}>$270</span>
                    <div className={styles.usd}>USD</div>
                  </td>
                  <td>
                    <span className={styles.amt}>$200</span>
                    <div className={styles.usd}>USD</div>
                  </td>
                </tr>

                <tr className={styles.groupHead}>
                  <td colSpan={5}>KiddyKode Personal Learning (one-on-one)</td>
                </tr>
                <tr>
                  <td>
                    <span className={styles.label}>Online</span>
                  </td>
                  <td className={styles.region}>Africa</td>
                  <td>
                    <span className={styles.amt}>80,000 FCFA</span>
                  </td>
                  <td>
                    <span className={styles.amt}>100,000 FCFA</span>
                  </td>
                  <td>
                    <span className={styles.amt}>120,000 FCFA</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={styles.label}>Online</span>
                  </td>
                  <td className={styles.region}>Diaspora</td>
                  <td>
                    <span className={styles.amt}>$150</span>
                    <div className={styles.usd}>USD</div>
                  </td>
                  <td>
                    <span className={styles.amt}>$270</span>
                    <div className={styles.usd}>USD</div>
                  </td>
                  <td>
                    <span className={styles.amt}>$250</span>
                    <div className={styles.usd}>USD</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className={styles.label}>Home Sessions</span>
                  </td>
                  <td className={styles.region}>Yaoundé only</td>
                  <td>
                    <span className={styles.amt}>100,000 FCFA</span>
                  </td>
                  <td>
                    <span className={styles.amt}>120,000 FCFA</span>
                  </td>
                  <td>
                    <span className={styles.amt}>150,000 FCFA</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.pricingNote}>
            — Prices are per program for the full duration. Scholarship places are available through local chapters.
          </p>
        </div>
      </section>

      {/* ============== COMPARISON ============== */}
      <section className={styles.compare} id="compare" data-screen-label="04 Comparison">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">03 / Compare</span>
              <h2 style={{ marginTop: "18px" }}>What grows from one program to the next.</h2>
            </div>
            <div>
              <p className="lede">
                Every program covers the fundamentals. What deepens across the pathway is judgement — systems thinking, design, leadership, and real-world impact.
              </p>
            </div>
          </div>

          <div className={styles.ctableWrap}>
            <table className={styles.ctable}>
              <thead>
                <tr>
                  <th className={styles.feat}>Feature</th>
                  <th className={styles.hExplorer}>Explorer Live</th>
                  <th className={styles.hBuilder}>Builder Live</th>
                  <th className={styles.hCreator}>Creator Live</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.feat}>Python Fundamentals</td>
                  <td><span className={styles.tick}>✓</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Logical Thinking</td>
                  <td><span className={styles.tick}>✓</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Problem Solving</td>
                  <td><span className={styles.tick}>✓</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Creativity</td>
                  <td><span className={styles.tick}>✓</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Focus &amp; Attention</td>
                  <td><span className={styles.tick}>✓</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Systems Thinking</td>
                  <td><span className={`${styles.lvl} ${styles.l1}`}>Introductory</span></td>
                  <td><span className={`${styles.lvl} ${styles.l2}`}>Intermediate</span></td>
                  <td><span className={`${styles.lvl} ${styles.l3}`}>Advanced</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Project Building</td>
                  <td><span className={`${styles.lvl} ${styles.l1}`}>Basic</span></td>
                  <td><span className={`${styles.lvl} ${styles.l2}`}>Intermediate</span></td>
                  <td><span className={`${styles.lvl} ${styles.l3}`}>Advanced</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Debugging</td>
                  <td><span className={`${styles.lvl} ${styles.l1}`}>Basic</span></td>
                  <td><span className={`${styles.lvl} ${styles.l2}`}>Intermediate</span></td>
                  <td><span className={`${styles.lvl} ${styles.l3}`}>Advanced</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Communication &amp; Presentations</td>
                  <td><span className={`${styles.lvl} ${styles.l1}`}>Basic</span></td>
                  <td><span className={`${styles.lvl} ${styles.l2}`}>Intermediate</span></td>
                  <td><span className={`${styles.lvl} ${styles.l3}`}>Advanced</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Collaboration</td>
                  <td><span className={`${styles.lvl} ${styles.l1}`}>Introductory</span></td>
                  <td><span className={`${styles.lvl} ${styles.l2}`}>Moderate</span></td>
                  <td><span className={`${styles.lvl} ${styles.l3}`}>Advanced</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Situational Awareness</td>
                  <td><span className={`${styles.lvl} ${styles.l1}`}>Introductory</span></td>
                  <td><span className={`${styles.lvl} ${styles.l2}`}>Intermediate</span></td>
                  <td><span className={`${styles.lvl} ${styles.l3}`}>Advanced</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Human-Centered Design</td>
                  <td><span className={styles.dash}>—</span></td>
                  <td><span className={`${styles.lvl} ${styles.l1}`}>Introductory</span></td>
                  <td><span className={`${styles.lvl} ${styles.l3}`}>Advanced</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Innovation Challenges</td>
                  <td><span className={styles.dash}>—</span></td>
                  <td><span className={`${styles.lvl} ${styles.l1}`}>Introductory</span></td>
                  <td><span className={`${styles.lvl} ${styles.l3}`}>Advanced</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Leadership Development</td>
                  <td><span className={styles.dash}>—</span></td>
                  <td><span className={`${styles.lvl} ${styles.l1}`}>Introductory</span></td>
                  <td><span className={`${styles.lvl} ${styles.l3}`}>Advanced</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Future &amp; Anticipatory Thinking</td>
                  <td><span className={`${styles.lvl} ${styles.l1}`}>Introductory</span></td>
                  <td><span className={`${styles.lvl} ${styles.l2}`}>Intermediate</span></td>
                  <td><span className={`${styles.lvl} ${styles.l3}`}>Advanced</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Portfolio Development</td>
                  <td><span className={styles.dash}>—</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                </tr>
                <tr>
                  <td className={styles.feat}>Community Impact Projects</td>
                  <td><span className={styles.dash}>—</span></td>
                  <td><span className={styles.dash}>—</span></td>
                  <td><span className={styles.tick}>✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============== GRADUATION LADDER ============== */}
      <section className={styles.ladder} data-screen-label="05 Graduation Pathway">
        <div className="wrap">
          <span className="eyebrow">04 / Graduation pathway</span>
          <h2 style={{ marginTop: "18px", maxWidth: "20ch" }}>
            Every program graduates a child into who they're becoming.
          </h2>
          <div className={styles.ladderGrid}>
            <div className={`${styles.rung} ${styles.rExplorer}`}>
              <div className={styles.stepN}>Stage 01</div>
              <div className={styles.progName}>Explorer Live</div>
              <div className={styles.becomes}>
                <span className={styles.arrowDn}>→</span>
                <h3>Thinker</h3>
              </div>
              <p>Builds curiosity, confidence, focus, and logical thinking.</p>
            </div>
            <div className={`${styles.rung} ${styles.rBuilder}`}>
              <div className={styles.stepN}>Stage 02</div>
              <div className={styles.progName}>Builder Live</div>
              <div className={styles.becomes}>
                <span className={styles.arrowDn}>→</span>
                <h3>Builder</h3>
              </div>
              <p>Develops problem-solvers who can design, create, and improve meaningful projects.</p>
            </div>
            <div className={`${styles.rung} ${styles.rCreator}`}>
              <div className={styles.stepN}>Stage 03</div>
              <div className={styles.progName}>Creator Live</div>
              <div className={styles.becomes}>
                <span className={styles.arrowDn}>→</span>
                <h3>Innovator</h3>
              </div>
              <p>Empowers young people to identify real-world problems, create solutions, lead projects, and make a positive impact.</p>
            </div>
            <div className={`${styles.rung} ${styles.leader}`}>
              <div className={styles.stepN}>Stage 04</div>
              <div className={styles.progName}>KiddyKode Ambassador</div>
              <div className={styles.becomes}>
                <span className={styles.arrowDn}>→</span>
                <h3>Leader</h3>
              </div>
              <p>Mentors others, represents the KiddyKode community, and inspires the next generation of creators and innovators.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== WHY PARENTS ============== */}
      <section className={styles.why} data-screen-label="06 Why Parents Choose">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">05 / Why parents choose KiddyKode</span>
              <h2 style={{ marginTop: "18px" }}>More than a coding class.</h2>
            </div>
            <div>
              <p className="lede">
                A live, structured, safe learning environment built around small cohorts, real mentorship, and skills that outlast any single language.
              </p>
            </div>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyCell}>
              <div className={styles.wn}>01</div>
              <h4>Small Cohort Learning</h4>
              <p>Tight groups where every child is seen, heard, and known by their facilitator.</p>
            </div>
            <div className={styles.whyCell}>
              <div className={styles.wn}>02</div>
              <h4>Live Facilitator Support</h4>
              <p>Real mentors in every session — not pre-recorded videos a child watches alone.</p>
            </div>
            <div className={styles.whyCell}>
              <div className={styles.wn}>03</div>
              <h4>Project-Based Learning</h4>
              <p>Children learn by building. Every concept is introduced in service of a real project.</p>
            </div>
            <div className={styles.whyCell}>
              <div className={styles.wn}>04</div>
              <h4>Real-World Problem Solving</h4>
              <p>Learners tackle problems that matter to them, their families, and their communities.</p>
            </div>
            <div className={styles.whyCell}>
              <div className={styles.wn}>05</div>
              <h4>Progress Tracking</h4>
              <p>Clear milestones so parents can see how their child grows across the program.</p>
            </div>
            <div className={styles.whyCell}>
              <div className={styles.wn}>06</div>
              <h4>Global Community</h4>
              <p>A network of young creators across Africa and the diaspora, learning together.</p>
            </div>
            <div className={styles.whyCell}>
              <div className={styles.wn}>07</div>
              <h4>Safe Learning Environment</h4>
              <p>Moderated, age-appropriate spaces designed with child safety at the centre.</p>
            </div>
            <div className={styles.whyCell}>
              <div className={styles.wn}>08</div>
              <h4>Structured Learning Pathway</h4>
              <p>A clear route from first program to first published app — and beyond.</p>
            </div>
            <div className={styles.whyCell}>
              <div className={styles.wn}>09</div>
              <h4>Skills Beyond Coding</h4>
              <p>Communication, collaboration, leadership, and confidence that carry everywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className={styles.ctaStrip} id="register" data-screen-label="07 CTA">
        <div className="wrap">
          <span className="eyebrow">Take the next step</span>
          <h2>Ready to join the next cohort?</h2>
          <div className={styles.row}>
            <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/programs/kiddykode-live/explorer-live">
              Start with Explorer Live <span className="arrow">→</span>
            </Link>
            <Link className={`${styles.btn} ${styles.btnGhost}`} href="#compare">
              Compare the programs <span className="arrow">→</span>
            </Link>
            <Link className={`${styles.btn} ${styles.btnGhost}`} href="/stories">
              Read learner stories <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
