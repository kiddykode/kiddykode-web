import { Metadata } from "next";
import { PageHero } from "../../components/PageHero";
import { SectionHead } from "../../components/SectionHead";
import { CtaStrip } from "../../components/CtaStrip";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import styles from "./cohort.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next Cohort — KiddyKode Live",
  description: "The next cohort starts soon. Register your child for live, cohort-based coding sessions.",
};

export default function NextCohortPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Learning Formats", href: "/programs" },
          { label: "Next Cohort", href: "/programs/next-cohort" },
        ]}
        eyebrow="KiddyKode Live"
        title="The next cohort starts soon. Your child's seat is waiting."
        lede="KiddyKode Live is our flagship cohort-based experience. Learners build projects with expert facilitators, practice at home, and present their work on demo day."
        metaItems={[
          { label: "Format", value: "Live on Zoom" },
          { label: "Ages", value: "8–16" },
          { label: "Duration", value: "[TBD from Flyer]" },
          { label: "Start Date", value: "[TBD from Flyer]" },
        ]}
      />

      <section className={styles.overview}>
        <div className="wrap">
          <SectionHead 
            eyebrow="01 / Cohort Details"
            title="Everything you need to know."
          />
          <div className={`${styles.infoCard} ${styles.feature}`}>
            <div className={styles.infoMain}>
              <span className="eyebrow text-[var(--color-accent)] mb-4">Registration Open</span>
              <h2>[Cohort Name from Flyer]</h2>
              <p>Join a guided cohort of learners. Over the course of the program, your child will move from understanding basic logic to presenting a fully functional project.</p>
              <Link href="/contact" className="btn btn--primary">
                Register Now <span className="arrow">→</span>
              </Link>
            </div>
            <div className={styles.infoMeta}>
              <div className={styles.infoGroup}>
                <span className={styles.infoLabel}>Schedule</span>
                <span className={styles.infoValue}>[TBD from Flyer]</span>
              </div>
              <div className={styles.infoGroup}>
                <span className={styles.infoLabel}>Start Date</span>
                <span className={styles.infoValue}>[TBD from Flyer]</span>
              </div>
              <div className={styles.infoGroup}>
                <span className={styles.infoLabel}>Target Age Group</span>
                <span className={styles.infoValue}>[TBD from Flyer]</span>
              </div>
              <div className={styles.infoGroup}>
                <span className={styles.infoLabel}>Level</span>
                <span className={styles.infoValue}>[TBD from Flyer]</span>
              </div>
              <div className={styles.infoGroup}>
                <span className={styles.infoLabel}>Format</span>
                <span className={styles.infoValue}>[TBD from Flyer]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.flyer}>
        <div className="wrap">
          <div className={styles.flyerGrid}>
            <div className={styles.flyerImage}>
              <ImagePlaceholder tone="ink" caption="Replace ▸ Uploaded Flyer Image" />
            </div>
            <div className={styles.flyerBody}>
              <span className="eyebrow mb-4">Help us spread the word</span>
              <h3>Share this cohort with your network.</h3>
              <p>Know other parents, teachers, or schools who might be interested? Download the event flyer to share on WhatsApp or social media.</p>
              <button className="btn btn--primary mb-6">
                Download Flyer <span className="arrow">↓</span>
              </button>
              <div className={styles.shareBox}>
                <strong>Suggested share text:</strong><br /><br />
                KiddyKode is launching their next live coding cohort for kids ages 8-16. Registration is open now at kiddykode.com/programs/next-cohort
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.breakdown}>
        <div className="wrap">
          <span className={styles.eyebrow}>03 / The Journey</span>
          <h2>What your child will learn, week by week.</h2>
          <p className={styles.lede}>A structured path from blank screen to working project.</p>

          <div className={styles.spineTable}>
            <div className={styles.spineRow}>
              <div className={styles.wk}>Week 01</div>
              <div>
                <h4>Story & Introduction</h4>
                <span className={styles.topic}>Logic basics</span>
              </div>
              <p>Meeting the cohort, setting up the tools, and understanding how computers think through simple step-by-step logic challenges.</p>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.wk}>Week 02</div>
              <div>
                <h4>Variables & State</h4>
                <span className={styles.topic}>Python fundamentals</span>
              </div>
              <p>Learning how programs remember information. Learners create their first interactive scripts that ask for and store user input.</p>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.wk}>Week 03</div>
              <div>
                <h4>Conditions & Flow</h4>
                <span className={styles.topic}>Decision making</span>
              </div>
              <p>Teaching the computer how to make choices. Building small text-based games that branch based on user decisions.</p>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.wk}>Week 04</div>
              <div>
                <h4>Loops & Repetition</h4>
                <span className={styles.topic}>Efficiency</span>
              </div>
              <p>Automating repetitive tasks. Learners use loops to generate patterns, run game rounds, and process multiple inputs.</p>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.wk}>Week 05</div>
              <div>
                <h4>Functions & Organization</h4>
                <span className={styles.topic}>Structure</span>
              </div>
              <p>Grouping code into reusable blocks. This week focuses on keeping code clean and preparing for the final project build.</p>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.wk}>Week 06</div>
              <div>
                <h4>Project Build</h4>
                <span className={styles.topic}>Synthesis</span>
              </div>
              <p>Learners start building their final project, applying everything they've learned to solve a problem or create a tool.</p>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.wk}>Week 07</div>
              <div>
                <h4>Debugging & Polish</h4>
                <span className={styles.topic}>Resilience</span>
              </div>
              <p>Testing the projects, finding bugs, and fixing them. Learners practice resilience and refine their user experience.</p>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.wk}>Week 08</div>
              <div>
                <h4>Demo Day</h4>
                <span className={styles.topic}>Presentation</span>
              </div>
              <p>The final session where learners present their projects to the cohort, explain their code, and celebrate their progress.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.steps}>
        <div className="wrap">
          <SectionHead 
            eyebrow="04 / How It Works"
            title="Three steps to becoming a creator."
          />
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <span className={styles.num}>01 / Register</span>
              <h4>Secure your spot</h4>
              <p>Fill out the registration form to join the cohort. You will receive a welcome pack and setup instructions before day one.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.num}>02 / Attend</span>
              <h4>Live weekly sessions</h4>
              <p>Your child joins the live Zoom sessions, learns with a facilitator, and completes guided practice during the week.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.num}>03 / Present</span>
              <h4>Demo Day</h4>
              <p>At the end of the cohort, your child presents their finished project. You are invited to watch and celebrate their work.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.results}>
        <div className="wrap">
          <SectionHead 
            eyebrow="05 / Evidence"
            title="Real results from past cohorts."
          />
          <div className={styles.impactGrid}>
            <div className={styles.impactCell}>
              <div className={styles.label}>Projects completed</div>
              <div className={styles.num}>24</div>
              <div className={styles.desc}>Functional tools, games, and scripts built by learners.</div>
            </div>
            <div className={styles.impactCell}>
              <div className={styles.label}>Learners</div>
              <div className={styles.num}>20</div>
              <div className={styles.desc}>From the last live cohort.</div>
            </div>
            <div className={styles.impactCell}>
              <div className={styles.label}>Average Age</div>
              <div className={styles.num}>11.5</div>
              <div className={styles.desc}>A mix of primary and early secondary students.</div>
            </div>
            <div className={styles.impactCell}>
              <div className={styles.label}>Completion Rate</div>
              <div className={styles.num}>95%</div>
              <div className={styles.desc}>Learners who successfully presented a final project.</div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/programs/portfolio" className="btn btn--ghost">
              View the Learner Portfolio <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className="wrap">
          <div className={styles.faqGrid}>
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-[18px]">Common questions about the cohort.</h2>
            </div>
            <div>
              <div className={styles.faqList}>
                <details className={styles.cq} open>
                  <summary><span>Does my child need previous coding experience?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>No. Our Explorer level cohorts are designed for complete beginners. We start from the very basics of logical thinking.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>What equipment is needed?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>A laptop or desktop computer (Windows, Mac, or Chromebook) with a reliable internet connection. A tablet is not sufficient for typing code.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>What happens if we miss a session?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>All live sessions are recorded and shared with parents securely, so your child can catch up before the next week.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>What language will they learn?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>We use Python because it is powerful enough for real-world applications but has a readable syntax that is great for beginners.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        eyebrow="Don't miss out"
        title="Spots are limited. Register your child today."
        buttons={[
          { label: "Register Now", href: "/contact", variant: "primary" },
          { label: "Ask a Question", href: "/contact", variant: "ghost" },
        ]}
      />
    </>
  );
}
