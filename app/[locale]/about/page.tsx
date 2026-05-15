import { Metadata } from "next";
import { PageHero } from "../../components/PageHero";
import { SectionHead } from "../../components/SectionHead";
import { CtaStrip } from "../../components/CtaStrip";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import styles from "./about.module.css";
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: "About — KiddyKode",
  description: "From consumers of technology to authors of it.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        eyebrow="— THE STORY"
        title="We teach children to build with code, not just use technology."
        lede="KiddyKode is a learning initiative helping children move from passive screen use to confident digital creation. Through structured, project-based coding experiences, children learn to think clearly, build solutions, debug with confidence, and present what they create."
        metaItems={[
          { label: "Founded in", value: "2025 | Yaoundé, Cameroon" },
        ]}
      />

      <section
        className={styles.mission}
        id="mission"
        data-screen-label="02 Mission"
      >
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">02 / Mission</span>
            </div>
            <div></div>
          </div>
          <div className={styles.missionGrid}>
            <div className={styles.missionStatement}>
              From consumers to creators.
            </div>
            <div className={styles.missionBody}>
              <p>
                KiddyKode exists to help children move from scrolling and
                consuming to thinking, building, and creating with code. We
                deliver structured, project-based coding experiences that are
                culturally grounded and designed to grow problem-solving,
                logical reasoning, creativity, communication, and confidence.
                Through every project, children learn to see themselves not just
                as users of technology, but as builders of stories, solutions,
                and futures.
              </p>
            </div>
          </div>
          <div className={styles.principles}>
            <div className={styles.principle}>
              <span className={styles.num}>01</span>
              <h4>From consumers of technology to creators with it.</h4>
              <p>
                We use coding to help children move beyond passive screen time
                into active building, making, and problem-solving.
              </p>
            </div>
            <div className={styles.principle}>
              <span className={styles.num}>02</span>
              <h4>Culturally grounded learning</h4>
              <p>
                Our projects, stories, and examples reflect African contexts so
                children can learn through experiences that feel familiar,
                meaningful, and empowering.
              </p>
            </div>
            <div className={styles.principle}>
              <span className={styles.num}>03</span>
              <h4>Built for thinking and confidence</h4>
              <p>
                We do not teach code as memorization alone; we use it to develop
                logic, creativity, resilience, communication, and the confidence
                to present what they build.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.origin} id="origin" data-screen-label="02 Origin">
        <div className="wrap">
          <SectionHead
            eyebrow="02 / THE ORIGIN"
            title="It started small, and it started with real children."
          />
          <div className={styles.originGrid}>
            <div className={styles.originMedia}>
              <ImagePlaceholder tone="warm" photoUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80" caption="Replace ▸ The first cohort, 2023" />
            </div>
            <div className={styles.originBody}>
              <p>KiddyKode began with a small early cohort and a simple idea: children should not only use technology, they should learn to build with it. From the start, the method combined storytelling, logical reasoning, project work, and presentation.</p>
              <p>What became clear very quickly was that children learn faster when coding feels creative, structured, and connected to their world. That insight became the foundation of the KiddyKode method.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stakes} id="why-now" data-screen-label="03 Why Now">
        <div className="wrap">
          <SectionHead
            eyebrow="03 / WHY NOW"
            title="Africa’s children should help build the digital future, not just inherit it."
            lede="Africa’s young population will shape the next generation of systems, stories, and tools. KiddyKode exists to make sure more children grow up not only as users of technology, but as confident creators with it."
          />
          <div className={styles.principles}>
            <div className={styles.principle}>
              <span className={styles.principleNum}>01</span>
              <h4>Digital sovereignty</h4>
              <p>Children should not grow up only consuming technologies built elsewhere. They should learn to shape tools and solutions for their own contexts.</p>
            </div>
            <div className={styles.principle}>
              <span className={styles.principleNum}>02</span>
              <h4>Cultural continuity</h4>
              <p>Coding becomes more meaningful when it is taught through stories, examples, and challenges children recognize.</p>
            </div>
            <div className={styles.principle}>
              <span className={styles.principleNum}>03</span>
              <h4>Systemic thinking</h4>
              <p>Learning to code teaches children how to break complex problems into smaller, solvable parts — a habit of mind that lasts beyond the screen.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pull} data-screen-label="Quote">
        <div className="wrap">
          <span className={styles.eyebrow}>Why we do this</span>
          <div className={styles.pullQ}>When a child builds her first program, the country gains a citizen who knows the world is editable.</div>
          <div className={styles.pullWho}>
            <span><strong>Deodatus Bijengsi</strong> · Co-founder & Curriculum Director</span>
          </div>
        </div>
      </section>

      <section className={styles.people} id="team" data-screen-label="04 People">
        <div className="wrap">
          <SectionHead
            eyebrow="04 / THE PEOPLE"
            title="Built by educators, builders, and believers in creative learning."
            lede="KiddyKode is being shaped by people who care deeply about how children learn: educators, technologists, and mission-aligned partners committed to helping young learners build with confidence."
          />
          <div className={styles.teamGrid}>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="clay" caption="Replace ▸ Headshot" /></div>
              <h4>Chiella Harriet</h4>
              <div className={styles.role}>Co-Founder, CEO</div>
              <p>Leads the mission and strategic direction of KiddyKode.</p>
            </div>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="ink" caption="Replace ▸ Headshot" /></div>
              <h4>Deodatus Bijengsi</h4>
              <div className={styles.role}>Co-Founder, Curriculum Director</div>
              <p>Architect of the KiddyKode method and pedagogical framework.</p>
            </div>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="warm" caption="Replace ▸ Headshot" /></div>
              <h4>Chiella Elvis</h4>
              <div className={styles.role}>Co-Founder, Finance and Logistics</div>
              <p>Ensures sustainable operations and regional delivery scale.</p>
            </div>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="cool" caption="Replace ▸ Role Placeholder" /></div>
              <h4>Learning Experience</h4>
              <div className={styles.role}>Team Lead</div>
              <p>Designing the structured journey for every KiddyKode learner.</p>
            </div>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="sage" caption="Replace ▸ Role Placeholder" /></div>
              <h4>Platform Development</h4>
              <div className={styles.role}>Engineering Lead</div>
              <p>Building the Studio platform to support self-paced creation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.timeline} id="timeline" data-screen-label="05 Journey">
        <div className="wrap">
          <SectionHead eyebrow="05 / THE JOURNEY SO FAR" title="An idea in 2025. A pilot in March 2026." />
          <div className={styles.tlRail}>
            <div className={styles.tlRow}>
              <div className={styles.yr}>June 2025</div>
              <h4>KiddyKode is born.</h4>
              <p>The idea for KiddyKode begins with a question: “How can we help children here in Cameroon learn to think with code, not just use apps?”</p>
            </div>
            <div className={styles.tlRow}>
              <div className={styles.yr}>March 2026</div>
              <h4>Pilot launched</h4>
              <p>We run our first pilot program with a group of 20 learners in our Kiddykode Live program, testing our curriculum and approach in real classrooms.</p>
            </div>
            <div className={styles.tlRow}>
              <div className={styles.yr}>2026</div>
              <h4>Refining and growing.</h4>
              <p>We are expanding our reach, deepening our curriculum, and building the platform to support learning for thousands of children.</p>
            </div>
            {/* <div className={styles.tlRow}>
              <div className={styles.yr}>2026</div>
              <h4>Growth</h4>
              <p>Learning formats, partnerships, and evidence-building continue to develop.</p>
            </div> */}
          </div>
        </div>
      </section>

      <section className={styles.gov} id="governance" data-screen-label="06 Governance">
        <div className="wrap">
          <SectionHead 
            eyebrow="06 / GOVERNANCE" 
            title="Guided by accountability and educational purpose."
            lede="KiddyKode is being built with long-term accountability in mind, with input from educators, operators, and mission-aligned advisors. As the organization grows, its governance structure will continue to formalize around educational quality, child safety, and responsible scale."
          />
        </div>
      </section>

      <section className={styles.partners} id="partners" data-screen-label="07 Funding">
        <div className="wrap">
          <div className={styles.partnersGrid}>
            <div>
              <span className="eyebrow">07 / FUNDING & PARTNERS</span>
              <h2 className="mt-[18px]">Supported by people and partners who believe in the mission.</h2>
              <p className="lede mt-[24px]">KiddyKode is growing through a mix of founder effort, early partners, and mission-aligned support. As the organization expands, partnerships will help widen access, strengthen delivery, and support long-term sustainability.</p>
              <Link href="/partners" className="btn btn--link mt-[32px]">Read our partnership guidelines <span className="arrow">→</span></Link>
            </div>
            <div className={styles.partnersRow}>
              <div className={styles.pcell}>Schools</div>
              <div className={styles.pcell}>Donors</div>
              <div className={styles.pcell}>Mission-aligned organizations</div>
              <div className={styles.pcell}>Future partners</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.press} id="contact" data-screen-label="08 Contact">
        <div className="wrap">
          <SectionHead eyebrow="08 / GET IN TOUCH" title="Partnerships, enquiries, and next steps." />
          <div className={styles.pressGrid}>
            <div className={styles.pressCard}>
              <span className="eyebrow">Card 1</span>
              <h3>Partnerships & enquiries</h3>
              <p>Questions about schools, collaborations, or support opportunities.</p>
              <Link href="/contact" className="btn btn--primary">Contact Us <span className="arrow">→</span></Link>
            </div>
            <div className={styles.pressCard}>
              <span className="eyebrow">Card 2</span>
              <h3>Programs</h3>
              <p>Looking for the right format for a child, school, or group.</p>
              <Link href="/programs" className="btn btn--ghost">Explore Learning Formats <span className="arrow">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip 
        eyebrow="Get involved"
        title="We are helping children move from using technology to building with it."
        buttons={[
          { label: "Join a Program", href: "/programs", variant: "primary" },
          { label: "Partner With Us", href: "/partners", variant: "ghost" },
          { label: "Contact Us", href: "/contact", variant: "link" }
        ]}
      />
    </>
  );
}
