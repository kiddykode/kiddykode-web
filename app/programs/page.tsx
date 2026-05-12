import { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { SectionHead } from "../components/SectionHead";
import { CtaStrip } from "../components/CtaStrip";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import styles from "./programs.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programs — KiddyKode",
  description: "Curriculum designed to turn curious minds into confident creators.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
        ]}
        eyebrow="The Curriculum"
        title="We don't teach syntax. We teach creation."
        lede="KiddyKode programs are structured around building things. From a seven-year-old's first interactive story to a fifteen-year-old's community health app, the code is just the tool. The project is the goal."
        metaItems={[
          { label: "Ages", value: "8–16" },
          { label: "Languages", value: "Block-based, Python, JS" },
          { label: "Format", value: "In-person & hybrid" },
        ]}
      />

      <section className={styles.overview} id="overview" data-screen-label="Overview">
        <div className="wrap">
          <SectionHead eyebrow="01 / Overview" />
          <div className={styles.overviewGrid}>
            <div className={styles.overviewMedia}>
              <ImagePlaceholder tone="cool" photoUrl="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80" caption="Replace ▸ Students collaborating around a single laptop" />
            </div>
            <div className={styles.overviewBody}>
              <h3>Code is a team sport.</h3>
              <p>Our pedagogy rejects the stereotype of the isolated programmer in a dark room. KiddyKode classrooms are loud. Students pair-program, debate logic solutions across tables, and present their broken code for group debugging.</p>
              <p>We train our educators to act as product managers rather than lecturers: defining the brief, supplying the tools, and letting the children figure out the architecture.</p>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.n}>1:12</div>
                  <div className={styles.lbl}>Maximum mentor to student ratio</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.n}>4</div>
                  <div className={styles.lbl}>Projects shipped per term</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.n}>0</div>
                  <div className={styles.lbl}>Multiple-choice tests</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pathways} id="pathways" data-screen-label="Pathways">
        <div className="wrap">
          <SectionHead
            eyebrow="02 / Pathways"
            title="How to join."
            lede="We deliver the curriculum through five distinct pathways, depending on where the child lives and how they learn best."
          />
          
          <div className={styles.pathRow}>
            <div className={styles.pathImg}>
              <ImagePlaceholder tone="warm" photoUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80" caption="Replace ▸ Classroom setting" />
            </div>
            <div className={styles.pathBody}>
              <div className={styles.meta}>
                <span><span className={styles.dot}></span>In-School</span>
                <span>Ages 8–16</span>
              </div>
              <h3>School Partnerships</h3>
              <p>Our flagship model. We partner with public and low-fee private schools to integrate coding into the standard timetable. We provide the curriculum, train the school's teachers, and supply the assessment rubrics.</p>
              <Link href="/contact" className="btn btn--primary">Partner your school <span className="arrow">→</span></Link>
            </div>
          </div>

          <div className={styles.pathRow}>
            <div className={styles.pathImg}>
              <ImagePlaceholder tone="clay" photoUrl="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80" caption="Replace ▸ Weekend club, mentor helping student" />
            </div>
            <div className={styles.pathBody}>
              <div className={styles.meta}>
                <span><span className={styles.dot}></span>After-School</span>
                <span>Ages 10–16</span>
              </div>
              <h3>Community Clubs</h3>
              <p>Weekend and after-school meetups hosted in community halls, libraries, and tech hubs. Led by KiddyKode volunteer mentors, these clubs focus on collaborative projects and prepare students for regional hackathons.</p>
              <Link href="/contact" className="btn btn--ghost">Find a club near you <span className="arrow">→</span></Link>
            </div>
          </div>

          <div className={styles.pathRow}>
            <div className={styles.pathImg}>
              <ImagePlaceholder tone="sage" photoUrl="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=80" caption="Replace ▸ Summer camp group photo" />
            </div>
            <div className={styles.pathBody}>
              <div className={styles.meta}>
                <span><span className={styles.dot}></span>Holiday</span>
                <span>2-week intensive</span>
              </div>
              <h3>Creator Camps</h3>
              <p>Two-week intensive holiday camps where students go from zero to a shipped project. Each camp is themed (e.g., "Build a Physics Game" or "Code a Local Guide App") and culminates in a Demo Day for parents.</p>
              <Link href="#" className="btn btn--ghost">Join the waitlist <span className="arrow">→</span></Link>
            </div>
          </div>

        </div>
      </section>

      <section className={styles.how} id="how" data-screen-label="How it Works">
        <div className="wrap">
          <SectionHead
            eyebrow="03 / Methodology"
            title="The anatomy of a project."
            lede="Every unit in the KiddyKode curriculum follows the same four-step cycle."
          />
          <div className={styles.howGrid}>
            <div className={styles.step}>
              <span className={styles.n}>01 / The Brief</span>
              <h4>Define the problem</h4>
              <p>We don't say "today we learn loops." We say "today we're building a drum machine, and we need a way to make the beat repeat automatically."</p>
            </div>
            <div className={styles.step}>
              <span className={styles.n}>02 / The Draft</span>
              <h4>Ugly code first</h4>
              <p>Students write pseudocode or block logic to get the basic mechanics working. Errors are celebrated as the first step of the design process.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.n}>03 / The Refactor</span>
              <h4>Make it elegant</h4>
              <p>This is where the syntax matters. Mentors help students clean up their code, introduce new concepts (like arrays or functions) to replace repetitive blocks.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.n}>04 / The Demo</span>
              <h4>Ship it</h4>
              <p>Every project ends with a presentation. Students explain not just what they built, but what broke along the way and how they fixed it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.spine} id="curriculum" data-screen-label="Curriculum">
        <div className="wrap">
          <span className={styles.eyebrow}>04 / The Spine</span>
          <h2>A four-year progression.</h2>
          <p className="lede">The core curriculum takes a child from absolute beginner to competent junior developer, capable of building full-stack web applications.</p>
          
          <div className={styles.spineTable}>
            <div className={styles.spineRow}>
              <div className={styles.yr}>Year 1</div>
              <div>
                <h4>Visual Logic & Storytelling</h4>
                <span className={styles.age}>Ages 8–10</span>
              </div>
              <p>Block-based programming (Scratch/Snap). Focus on sequencing, coordinates, basic events, and digital storytelling.</p>
              <div className={styles.out}>
                <span>Interactive animations</span>
                <span>2D maze games</span>
              </div>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.yr}>Year 2</div>
              <div>
                <h4>Intro to Scripting</h4>
                <span className={styles.age}>Ages 10–12</span>
              </div>
              <p>Transition from blocks to syntax via Python. Variables, loops, conditionals, and basic data structures.</p>
              <div className={styles.out}>
                <span>Text-based adventures</span>
                <span>Basic calculators</span>
              </div>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.yr}>Year 3</div>
              <div>
                <h4>Web Foundations</h4>
                <span className={styles.age}>Ages 12–14</span>
              </div>
              <p>HTML, CSS, and Vanilla JavaScript. The DOM, event listeners, and building interfaces for the browser.</p>
              <div className={styles.out}>
                <span>Personal portfolio</span>
                <span>Interactive web toys</span>
              </div>
            </div>
            <div className={styles.spineRow}>
              <div className={styles.yr}>Year 4</div>
              <div>
                <h4>Data & Applications</h4>
                <span className={styles.age}>Ages 14–16</span>
              </div>
              <p>APIs, basic databases, and modern JS frameworks. Focus on solving real community problems.</p>
              <div className={styles.out}>
                <span>Weather dashboards</span>
                <span>Community noticeboards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cost} id="eligibility" data-screen-label="Eligibility">
        <div className="wrap">
          <SectionHead
            eyebrow="05 / Eligibility & Cost"
            title="Access by right, not revenue."
            lede="We operate a cross-subsidy model. Paid camps and private school partnerships fund our free public school deployments."
          />
          <div className={styles.costGrid}>
            <div className={styles.costCard}>
              <span className={styles.lbl}>Public Schools</span>
              <h3>Public Partner</h3>
              <p>Fully subsidized curriculum integration for state-funded primary and secondary schools.</p>
              <div className={styles.price}>Free</div>
              <ul>
                <li>Full curriculum access</li>
                <li>Teacher training & certification</li>
                <li>Termly assessment reports</li>
                <li>Hardware grants (where eligible)</li>
              </ul>
              <Link href="/contact" className="btn btn--ghost">Apply as a school</Link>
            </div>
            
            <div className={`${styles.costCard} ${styles.feature}`}>
              <span className={styles.lbl}>Community</span>
              <h3>Weekend Clubs</h3>
              <p>Subsidized community learning hubs run by our volunteer network.</p>
              <div className={styles.price}>Free <span>/ variable</span></div>
              <ul>
                <li>2 hours of weekly instruction</li>
                <li>Access to KiddyKode Studio</li>
                <li>Entry to regional hackathons</li>
                <li>Some hubs charge a tiny venue fee</li>
              </ul>
              <Link href="/contact" className="btn btn--primary">Find a club</Link>
            </div>

            <div className={styles.costCard}>
              <span className={styles.lbl}>Private & Camps</span>
              <h3>Creator Camps</h3>
              <p>Paid intensive holiday programs that cross-fund our public deployments.</p>
              <div className={styles.price}>$150 <span>/ 2 weeks</span></div>
              <ul>
                <li>Intensive daily instruction</li>
                <li>Guest tech mentors</li>
                <li>Catered lunches & equipment</li>
                <li>Funds one public school student</li>
              </ul>
              <Link href="#" className="btn btn--ghost">Join waitlist</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faq} data-screen-label="FAQ">
        <div className="wrap">
          <div className={styles.faqGrid}>
            <div>
              <span className="eyebrow">Program FAQ</span>
              <h2 className="mt-[18px]">Common questions.</h2>
            </div>
            <div>
              <div className={styles.faqList}>
                <details className={styles.cq} open>
                  <summary><span>Does my child need their own laptop?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>No. In school programs and community clubs, we provide hardware or use the school's existing lab. We specifically design the curriculum to work effectively with pair-programming (two students to one machine), which actually improves learning outcomes through peer debugging.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>Do they need internet access at home?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>No. While KiddyKode Studio is cloud-based, our in-classroom and club tools are fully functional offline. Students can save their projects to a local drive or USB and sync them to the Studio when they are next connected.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>What if my child has never coded before?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>That is exactly who the Year 1 and Year 2 programs are for. We assume zero prior knowledge. We don't even assume strong typing skills — which is why we start with visual, block-based logic.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>Do you teach AI or robotics?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>Our core spine is software engineering (web and application logic). We occasionally run specialized Creator Camps focusing on basic hardware (Arduino/Raspberry Pi) or machine learning concepts, but the primary curriculum focuses on foundational code.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>Are your mentors vetted?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>Strictly. Every KiddyKode mentor, whether staff or volunteer, undergoes a background check, safeguarding training, and a technical pedagogy evaluation before they are allowed in a room with learners.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>Can I enroll my 6-year-old?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>Our current curriculum is strictly designed for ages 8 and up (approximate reading level equivalent to Year 4/Grade 3). We are developing an early-years (ages 5–7) unplugged curriculum, but it is currently in closed pilot.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip 
        eyebrow="Next Steps"
        title="Ready to build?"
        buttons={[
          { label: "Find a Program", href: "/contact", variant: "primary" },
          { label: "Partner your School", href: "/contact", variant: "ghost" },
        ]}
      />
    </>
  );
}
