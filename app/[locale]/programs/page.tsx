import { Metadata } from "next";
import { PageHero } from "../../components/PageHero";
import { SectionHead } from "../../components/SectionHead";
import { CtaStrip } from "../../components/CtaStrip";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import styles from "./programs.module.css";
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: "Learning Formats — KiddyKode",
  description: "Structured coding experiences that help children move from using technology to building with it.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Learning Formats", href: "/programs" },
        ]}
        eyebrow="Learning Formats"
        title="Different formats. One KiddyKode method."
        lede="KiddyKode offers a focused set of learning formats for children ages 8–16. Across every format, learners move through the same journey: Story, Logic, Build, Improve, Present."
        metaItems={[
          { label: "Ages", value: "8–16" },
          { label: "Core Method", value: "Story → Logic → Build → Improve → Present" },
          { label: "Formats", value: "Studio, Live, Schools, Bootcamps" },
        ]}
      />

      <section className={styles.overview} id="overview" data-screen-label="Overview">
        <div className="wrap">
          <SectionHead eyebrow="01 / Overview" />
          <div className={styles.overviewGrid}>
            <div className={styles.overviewMedia}>
              <ImagePlaceholder
                tone="cool"
                photoUrl="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
                caption="Replace ▸ Learners building together during a coding session"
              />
            </div>
            <div className={styles.overviewBody}>
              <h3>Children learn best when code becomes something they can make with.</h3>
              <p>
                KiddyKode teaches coding through projects, stories, guided logic, debugging,
                and presentation. The goal is not only to understand syntax, but to help
                children think clearly, solve problems, and build with confidence.
              </p>
              <p>
                Whether a learner is joining online, in school, or through a holiday program,
                the experience stays rooted in the same structured method and the same belief:
                children should not only use technology, they should learn to create with it.
              </p>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.n}>8–16</div>
                  <div className={styles.lbl}>Core learner age range</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.n}>5</div>
                  <div className={styles.lbl}>Steps in the KiddyKode method</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.n}>4</div>
                  <div className={styles.lbl}>Current learning formats</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pathways} id="formats" data-screen-label="Learning Formats">
        <div className="wrap">
          <SectionHead
            eyebrow="02 / Learning Formats"
            title="How children learn with KiddyKode."
            lede="Each format is designed for a different setting, but all follow the same structured approach to creative coding."
          />

          <div className={styles.pathRow}>
            <div className={styles.pathImg}>
              <ImagePlaceholder
                tone="cool"
                photoUrl="https://res.cloudinary.com/dsbm73ojs/image/upload/v1779197414/kiddykode_studio_ml3y6q.png"
                caption="Replace ▸ Learner using KiddyKode Studio on a laptop"
              />
            </div>
            <div className={styles.pathBody}>
              <div className={styles.meta}>
                <span><span className={styles.dot}></span>Self-Paced</span>
                <span>Ages 8–16</span>
              </div>
              <h3>KiddyKode Studio</h3>
              <p>
                Our self-paced platform where learners move from Explorer to Builder to Creator
                through structured lessons, guided practice, and project work. Studio helps
                children keep learning beyond live sessions and build at their own pace.
              </p>
              <Link href="/contact" className="btn btn--primary">
                Explore Studio <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          <div className={styles.pathRow}>
            <div className={styles.pathImg}>
              <ImagePlaceholder
                tone="sage"
                photoUrl="https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774726/ChatGPT_Image_May_14_2026_09_08_46_PM_dgfdz9.png"
                caption="Replace ▸ Live online coding session with children on Zoom"
              />
            </div>
            <div className={styles.pathBody}>
              <div className={styles.meta}>
                <span><span className={styles.dot}></span>Live Online</span>
                <span>Ages 8–16</span>
              </div>
              <h3>KiddyKode Live</h3>
              <p>
                Cohort-based coding sessions delivered live online. Learners build projects with
                facilitators, practice at home, present their work, and grow through guided
                cohorts that follow the KiddyKode method from story to presentation.
              </p>
              <Link href="/contact" className="btn btn--ghost">
                Join a cohort <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          <div className={styles.pathRow}>
            <div className={styles.pathImg}>
              <ImagePlaceholder
                tone="warm"
                photoUrl="https://res.cloudinary.com/dsbm73ojs/image/upload/v1778847213/kiddykode_at_partner_school_lz8nrt.png?auto=format&fit=crop&w=1200&q=80"
                caption="Replace ▸ School-based coding session with learners and facilitator"
              />
            </div>
            <div className={styles.pathBody}>
              <div className={styles.meta}>
                <span><span className={styles.dot}></span>In-School</span>
                <span>Ages 8–16</span>
              </div>
              <h3>School Clubs</h3>
              <p>
                Weekly structured coding sessions delivered in school settings. School Clubs help
                learners build logical thinking, creativity, and project confidence within a
                consistent school-based learning rhythm.
              </p>
              <Link href="/contact" className="btn btn--ghost">
                Partner your school <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          <div className={styles.pathRow}>
            <div className={styles.pathImg}>
              <ImagePlaceholder
                tone="clay"
                photoUrl="https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774727/ChatGPT_Image_May_14_2026_09_17_40_PM_ma3741.png"
                caption="Replace ▸ Holiday coding intensive or bootcamp session"
              />
            </div>
            <div className={styles.pathBody}>
              <div className={styles.meta}>
                <span><span className={styles.dot}></span>Holiday Intensive</span>
                <span>Ages 8–16</span>
              </div>
              <h3>Holiday Bootcamps</h3>
              <p>
                Short, focused programs during school breaks where learners move through a
                concentrated cycle of building, improving, and presenting a complete project.
              </p>
              <Link href="/contact" className="btn btn--ghost">
                Ask about bootcamps <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.how} id="how" data-screen-label="How it Works">
        <div className="wrap">
          <SectionHead
            eyebrow="03 / Method"
            title="The KiddyKode learning cycle."
            lede="Every KiddyKode experience follows the same five-step method."
          />
          <div className={styles.howGrid}>
            <div className={styles.step}>
              <span className={styles.n}>01 / Story</span>
              <h4>Start with meaning</h4>
              <p>
                Every lesson begins with a story, challenge, or real-world prompt that gives
                the coding task purpose and context.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.n}>02 / Logic</span>
              <h4>Think before coding</h4>
              <p>
                Learners break the problem into steps, patterns, and decisions before they begin
                writing code.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.n}>03 / Build</span>
              <h4>Turn ideas into code</h4>
              <p>
                Children implement their solution through guided project work, learning by making
                rather than memorizing.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.n}>04 / Improve</span>
              <h4>Debug and refine</h4>
              <p>
                Learners strengthen their projects through testing, debugging, and iteration,
                building resilience as they go.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.n}>05 / Present</span>
              <h4>Explain what you built</h4>
              <p>
                Every project ends with presentation, helping learners grow in confidence,
                communication, and ownership of their work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.spine} id="curriculum" data-screen-label="Progression">
        <div className="wrap">
          <span className={styles.eyebrow}>04 / Progression</span>
          <h2>One method, three levels of growth.</h2>
          <p className="lede">
            KiddyKode learners grow through three stages that increase independence,
            complexity, and creative ownership.
          </p>

          <div className={styles.spineTable}>
            <div className={styles.spineRow}>
              <div className={styles.yr}>01</div>
              <div>
                <h4>Explorer</h4>
                <span className={styles.age}>Beginner</span>
              </div>
              <p>
                Learners begin with guided coding experiences, foundational logic, and simple
                projects that build confidence and curiosity.
              </p>
              <div className={styles.out}>
                <span>Guided tasks</span>
                <span>First projects</span>
              </div>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.yr}>02</div>
              <div>
                <h4>Builder</h4>
                <span className={styles.age}>Intermediate</span>
              </div>
              <p>
                Learners take on larger projects, apply stronger logic, debug more independently,
                and begin making more of their own design decisions.
              </p>
              <div className={styles.out}>
                <span>Project building</span>
                <span>Independent debugging</span>
              </div>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.yr}>03</div>
              <div>
                <h4>Creator</h4>
                <span className={styles.age}>Advanced</span>
              </div>
              <p>
                Learners design and improve projects with greater independence, stronger
                presentation skills, and a deeper sense of ownership over what they build.
              </p>
              <div className={styles.out}>
                <span>Original ideas</span>
                <span>Confident presentation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cost} id="eligibility" data-screen-label="Access">
        <div className="wrap">
          <SectionHead
            eyebrow="05 / Access"
            title="Built for different entry points."
            lede="KiddyKode is developing multiple ways for children, schools, and families to access structured coding experiences."
          />
          <div className={styles.costGrid}>
            <div className={styles.costCard}>
              <span className={styles.lbl}>Self-Paced</span>
              <h3>KiddyKode Studio</h3>
              <p>
                A flexible way for learners to keep progressing through structured courses,
                guided practice, and project work.
              </p>
              <div className={styles.price}>Explorer → Creator</div>
              <ul>
                <li>Self-paced lessons</li>
                <li>Project-based learning</li>
                <li>Independent progression</li>
                <li>Structured practice</li>
              </ul>
              <Link href="/contact" className="btn btn--ghost">Learn about Studio</Link>
            </div>

            <div className={`${styles.costCard} ${styles.feature}`}>
              <span className={styles.lbl}>Live Learning</span>
              <h3>KiddyKode Live</h3>
              <p>
                Guided cohorts for learners who benefit from facilitator support,
                live instruction, and shared presentation.
              </p>
              <div className={styles.price}>Cohort-based</div>
              <ul>
                <li>Live sessions</li>
                <li>Facilitator guidance</li>
                <li>Project presentations</li>
                <li>Home practice</li>
              </ul>
              <Link href="/contact" className="btn btn--primary">Join a program</Link>
            </div>

            <div className={styles.costCard}>
              <span className={styles.lbl}>Schools & Holidays</span>
              <h3>Clubs & Bootcamps</h3>
              <p>
                School-based and intensive formats that make the KiddyKode method available in
                structured group settings.
              </p>
              <div className={styles.price}>By format</div>
              <ul>
                <li>School Clubs</li>
                <li>Holiday Bootcamps</li>
                <li>Group learning</li>
                <li>Project showcase</li>
              </ul>
              <Link href="/contact" className="btn btn--ghost">Talk to the team</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faq} data-screen-label="FAQ">
        <div className="wrap">
          <div className={styles.faqGrid}>
            <div>
              <span className="eyebrow">Learning Formats FAQ</span>
              <h2 className="mt-[18px]">Common questions.</h2>
            </div>
            <div>
              <div className={styles.faqList}>
                <details className={styles.cq} open>
                  <summary><span>What age group is KiddyKode for?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>
                    KiddyKode is currently designed for children ages 8 to 16, with learning
                    formats and support structured around that age range.
                  </p>
                </details>
                <details className={styles.cq}>
                  <summary><span>Does my child need previous coding experience?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>
                    No. KiddyKode is designed for beginners as well as learners who are ready
                    to grow into more independent project work.
                  </p>
                </details>
                <details className={styles.cq}>
                  <summary><span>What is the difference between Studio and Live?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>
                    Studio is the self-paced learning platform, while KiddyKode Live is the
                    facilitator-led cohort experience delivered through live sessions.
                  </p>
                </details>
                <details className={styles.cq}>
                  <summary><span>Do all formats use the same method?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>
                    Yes. Every KiddyKode format is built around the same five-step cycle:
                    Story, Logic, Build, Improve, Present.
                  </p>
                </details>
                <details className={styles.cq}>
                  <summary><span>Can schools partner with KiddyKode?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>
                    Yes. KiddyKode is developing school-based formats and welcomes conversations
                    with schools that want structured creative coding experiences for learners.
                  </p>
                </details>
                <details className={styles.cq}>
                  <summary><span>How do I know which format is right?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>
                    The best format depends on the learner’s age, setting, and level of support
                    needed. The team can help parents and schools choose the right fit.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        eyebrow="Next Steps"
        title="Ready to start building?"
        buttons={[
          { label: "Join a Program", href: "/contact", variant: "primary" },
          { label: "Partner With Us", href: "/contact", variant: "ghost" },
        ]}
      />
    </>
  );
}