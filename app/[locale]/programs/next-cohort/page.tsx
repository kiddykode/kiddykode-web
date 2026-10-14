import { Metadata } from "next";
import { SectionHead } from "../../../components/SectionHead";
import { CtaStrip } from "../../../components/CtaStrip";
import { RegistrationForm } from "../../../components/RegistrationForm";
import { ShareActions } from "../../../components/ShareActions";
import styles from "./cohort.module.css";
import { Link } from '@/i18n/navigation';
import Image from "next/image";

export const metadata: Metadata = {
  title: "Next Cohort — KiddyKode Live",
  description: "The next cohort starts soon. Register your child for live, cohort-based coding sessions.",
  openGraph: {
    title: "Explorer Live Session — November 2026",
    description: "KiddyKode is launching a new live coding cohort for kids ages 8-17! Learners build real projects with expert facilitators.",
    url: "https://kiddykode.org/programs/next-cohort",
    siteName: "KiddyKode",
    images: [
      {
        url: "/explorer-cohort3-nov-2026.jpeg",
        width: 1200,
        height: 630,
        alt: "Explorer Live Session Flyer — November 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explorer Live Session — November 2026",
    description: "KiddyKode is launching a new live coding cohort for kids ages 8-17!",
    images: ["/explorer-cohort3-nov-2026.jpeg"],
  },
};

const JOURNEY = [
  { label: "Python Fundamentals", sub: "Talk to the computer", color: "var(--kk-blue)" },
  { label: "Logical Thinking", sub: "If this, then that", color: "var(--kk-red)" },
  { label: "Problem Solving", sub: "Break it down, step by step", color: "var(--kk-gold)" },
  { label: "Creativity", sub: "Turn ideas into code", color: "var(--kk-green)" },
  { label: "Presentation", sub: "Explain and show your work", color: "var(--kk-purple)" },
  { label: "System Thinking", sub: "See how the pieces connect", color: "var(--kk-blue)" },
  { label: "Situational Awareness", sub: "Read the problem, adapt the plan", color: "var(--kk-red)" },
  { label: "Debugging", sub: "Fix & refine", color: "var(--kk-gold)" },
];

export default function NextCohortPage() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link>
            <span className="sep text-[var(--color-ink-300)]">/</span>
            <Link href="/programs">Learning Formats</Link>
            <span className="sep text-[var(--color-ink-300)]">/</span>
            <span>Next Cohort</span>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.badge}><span className={styles.dot} /> Registration Open</span>
              <h1>Your child&apos;s coding adventure <em>starts here.</em></h1>
              <p className={styles.heroSub}>
                Explorer Live — playful, live online coding sessions where kids build real projects, every week.
              </p>

              <div className={styles.factChips}>
                <span className={styles.chip}><span className={styles.ic}>🗓️</span> Starts 21 Nov 2026</span>
                <span className={styles.chip}><span className={styles.ic}>⏳</span> 2 Months</span>
                <span className={styles.chip}><span className={styles.ic}>🧒</span> Ages 8–17</span>
                <span className={styles.chip}><span className={styles.ic}>💻</span> 100% Online</span>
              </div>

              <div className={styles.heroCtas}>
                <a href="#register" className="btn btn--primary">
                  Register Now <span className="arrow">→</span>
                </a>
                <a href="/explorer-cohort3-nov-2026.jpeg" download className="btn btn--white">
                  Download Flyer <span className="arrow">↓</span>
                </a>
              </div>
            </div>

            <div className={styles.heroArt}>
              <div className={styles.posterFrame}>
                <Image
                  src="/explorer-cohort3-nov-2026.jpeg"
                  alt="Explorer Live Session Flyer — November 2026"
                  width={800}
                  height={800}
                  style={{ width: '100%', height: 'auto' }}
                  priority
                />
              </div>
              <div className={styles.mascotFloat}>
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

      {/* FACT / PRICE BAR */}
      <section className={styles.factBar}>
        <div className="wrap">
          <div className={styles.factBarGrid}>
            <div className={styles.factCell}>
              <span className={styles.fl}>Schedule</span>
              <div className={styles.fv}>
                <div className={styles.fvRow}>2 sessions/week <small>1.5 hours each, mostly weekends</small></div>
              </div>
            </div>
            <div className={styles.factCell}>
              <span className={styles.fl}>Program Fee</span>
              <div className={styles.fv}>
                <div className={styles.fvRow}>50,000 FRS <small>Cameroon</small></div>
                <div className={styles.fvRow}>65,000 FRS <small>Abroad</small></div>
              </div>
            </div>
            <div className={styles.factCell}>
              <span className={styles.fl}>Early Bird</span>
              <div className={styles.fv}>
                <div className={styles.fvRow}>10% off <small>Full payment before 6 November 2026</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF BANNER */}
      <section className={styles.proofBanner}>
        <div className={styles.proofImgWrap}>
          <Image
            src="/explorer-live-classroom-grid.jpeg"
            alt="Learners from a live KiddyKode coding session"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="wrap">
          <div className={styles.proofCaption}>
            <span className={styles.eyebrowLight}>Real Cohort</span>
            <h2>Real kids. Real live classes.</h2>
            <p>Learners from Cameroon and abroad, coding together every week with a facilitator who knows their name.</p>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className={styles.journey}>
        <div className="wrap">
          <SectionHead
            eyebrow="01 / The Journey"
            title="8 weeks. 8 skills. 1 finished project."
          />
          <div className={styles.journeyGrid}>
            <div className={styles.journeyImg}>
              <Image
                src="/explorer-live-lesson-preview.jpeg"
                alt="A sample lesson from the Explorer Live curriculum"
                width={1285}
                height={693}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className={styles.pathSteps}>
              {JOURNEY.map((step, i) => (
                <div className={styles.pathStep} key={step.label}>
                  <span className={styles.pathNum} style={{ background: step.color }}>{i + 1}</span>
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

      {/* COMMUNITY / STATS */}
      <section className={styles.community}>
        <div className="wrap">
          <SectionHead
            eyebrow="02 / Meet the Cohort"
            title="Real learners, real results."
          />
          <div className={styles.facesStrip}>
            <Image
              src="/explorer-live-session-faces.jpeg"
              alt="Learners and facilitators in a live Explorer session"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.statRow}>
            <div className={styles.statBadge}>
              <div className={styles.n} style={{ color: 'var(--kk-blue)' }}>24</div>
              <div className={styles.l}>Projects completed</div>
            </div>
            <div className={styles.statBadge}>
              <div className={styles.n} style={{ color: 'var(--kk-red)' }}>20</div>
              <div className={styles.l}>Learners last cohort</div>
            </div>
            <div className={styles.statBadge}>
              <div className={styles.n} style={{ color: 'var(--kk-gold)' }}>11.5</div>
              <div className={styles.l}>Average age</div>
            </div>
            <div className={styles.statBadge}>
              <div className={styles.n} style={{ color: 'var(--kk-green)' }}>95%</div>
              <div className={styles.l}>Completion rate</div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link href="/programs/portfolio" className="btn btn--ghost">
              View the Learner Portfolio <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.steps}>
        <div className="wrap">
          <SectionHead
            eyebrow="03 / How It Works"
            title="Three steps to becoming a creator."
          />
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepEmoji} style={{ background: 'var(--kk-blue)' }}>📝</div>
              <h4>Register</h4>
              <p>Fill out the form below. You&apos;ll get a welcome pack and setup instructions before day one.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepEmoji} style={{ background: 'var(--kk-red)' }}>💻</div>
              <h4>Attend</h4>
              <p>Join live weekly sessions with a facilitator, plus guided practice between classes.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepEmoji} style={{ background: 'var(--kk-gold)' }}>🎤</div>
              <h4>Present</h4>
              <p>Demo Day! Your child shows off their finished project — you&apos;re invited to watch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className="wrap">
          <div className={styles.faqGrid}>
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-[18px]">Common questions.</h2>
            </div>
            <div>
              <div className={styles.faqList}>
                <details className={styles.cq} open>
                  <summary><span>Does my child need coding experience?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>No. Explorer is for complete beginners — we start from the basics of logical thinking.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>What equipment is needed?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>A laptop or desktop with a reliable internet connection. A tablet alone isn&apos;t enough for typing code.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>What if we miss a session?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>Every live session is recorded and shared with parents, so your child can catch up easily.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>What language will they learn?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>Python — powerful enough for real projects, with a readable syntax that&apos;s great for beginners.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTER */}
      <section id="register" className={styles.registerSection}>
        <div className="wrap">
          <SectionHead
            eyebrow="04 / Register"
            title="Secure your child's spot."
            lede="Fill in the form below. You'll get a confirmation email with everything you need."
          />
          <div className={styles.registerGrid}>
            <RegistrationForm />
            <div className={styles.registerSide}>
              <div className={styles.mascotCard}>
                <h4>Know a parent who&apos;d love this?</h4>
                <p>Share the flyer on WhatsApp or social media.</p>
                <div className="mt-5">
                  <ShareActions
                    url="https://kiddykode.org/programs/next-cohort"
                    title="Explorer Live Session — November 2026"
                    text="🚀 KiddyKode is launching a new live coding cohort for kids ages 8-17! Check out the details and register here:"
                  />
                </div>
                <Image
                  src="/explorer-live-mascot.jpeg"
                  alt=""
                  width={290}
                  height={233}
                  className={styles.mascotImg}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.shareCard}>
                <h4>Prefer WhatsApp?</h4>
                <p>Message us directly and we&apos;ll help you register.</p>
                <a href="https://wa.me/237680262136?text=Hello%2C%20I%20want%20to%20register%20for%20the%20Explorer%20Live%20Session." target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        eyebrow="Questions?"
        title="Need help deciding? We're here."
        buttons={[
          { label: "Register Now", href: "#register", variant: "primary" },
          { label: "Ask a Question", href: "/contact", variant: "ghost" },
        ]}
      />
    </div>
  );
}
