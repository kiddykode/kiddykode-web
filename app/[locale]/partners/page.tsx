import { Metadata } from "next";
import { PageHero } from "../../components/PageHero";
import { SectionHead } from "../../components/SectionHead";
import { CtaStrip } from "../../components/CtaStrip";
import styles from "./partners.module.css";
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: "Partner With Us — KiddyKode",
  description: "Work with KiddyKode to bring coding education to the next generation.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Partners", href: "/partners" },
        ]}
        eyebrow="Work with us"
        title="Partner with KiddyKode."
        lede="We believe that systemic change requires systemic collaboration. We partner with public schools, philanthropic foundations, and corporate sponsors to ensure our curriculum remains free and accessible where it is needed most."
      />

      <section className={styles.why} data-screen-label="Why Partner">
        <div className="wrap">
          <SectionHead
            eyebrow="01 / The Model"
            title="Why partner with us?"
            lede="Our partnership model is designed for scale, measurable impact, and long-term sustainability."
          />
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.icon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3>Unprecedented Reach</h3>
              <p>With active chapters in nine cities and a proven model for public school integration, your support reaches thousands of learners directly through their existing daily routines.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.icon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <h3>Tested Pedagogy</h3>
              <p>Our curriculum is not a generic import. It has been rigorously tested and localized for African classrooms, ensuring high engagement and retention rates.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.icon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <h3>Measurable Outcomes</h3>
              <p>We don't measure success by certificates printed, but by projects shipped. Partners receive detailed impact reports on the applications and tools built by the cohorts they sponsor.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.types} data-screen-label="Partnership Types">
        <div className="wrap">
          <SectionHead
            eyebrow="02 / Opportunities"
            title="Ways to collaborate."
            lede="We have structured partnership tiers to align with different organizational goals and capacities."
          />
          <div className={styles.typesGrid}>
            <div className={styles.typeCard}>
              <span className="eyebrow">For Educators</span>
              <h3>School Partnership</h3>
              <p>Integrate KiddyKode into your school's official timetable or run it as a sanctioned after-school club.</p>
              <ul>
                <li>Free curriculum access</li>
                <li>Teacher training provided</li>
                <li>Termly assessment tools</li>
              </ul>
              <Link href="/contact" className="btn btn--ghost">Apply as a school</Link>
            </div>
            
            <div className={`${styles.typeCard} ${styles.feature}`}>
              <span className="eyebrow">For Philanthropists</span>
              <h3>Foundation Grant</h3>
              <p>Fund the deployment of KiddyKode in a specific public school district or help launch a new city chapter.</p>
              <ul>
                <li>Direct deployment funding</li>
                <li>Custom impact reporting</li>
                <li>Naming rights for hubs/camps</li>
              </ul>
              <Link href="/contact" className="btn btn--primary">Discuss a grant</Link>
            </div>

            <div className={styles.typeCard}>
              <span className="eyebrow">For Companies</span>
              <h3>Corporate CSR</h3>
              <p>Sponsor a cohort, provide hardware grants, or encourage your engineering team to join our mentor network.</p>
              <ul>
                <li>Hardware/connectivity grants</li>
                <li>Employee volunteering</li>
                <li>Brand presence at Demo Nights</li>
              </ul>
              <Link href="/contact" className="btn btn--ghost">View CSR options</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.process} data-screen-label="Process">
        <div className="wrap">
          <SectionHead
            eyebrow="03 / The Process"
            title="How it works."
            lede="We move quickly from conversation to deployment. Here is the typical timeline for establishing a new institutional partnership."
          />
          <div className={styles.processGrid}>
            <div className={styles.step}>
              <span className={styles.n}>01 / Discovery</span>
              <h4>Initial Alignment</h4>
              <p>We meet to understand your goals, whether it's adopting the curriculum for your school or sponsoring a deployment in a new region.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.n}>02 / Proposal</span>
              <h4>The Plan</h4>
              <p>Our team drafts a custom proposal detailing timelines, required resources, KPIs, and the specific cohorts that will be impacted.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.n}>03 / Pilot</span>
              <h4>Testing the waters</h4>
              <p>We typically begin with a 6-week pilot program or a single Creator Camp to prove the model and iron out operational logistics before scaling.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.n}>04 / Scale</span>
              <h4>Full Rollout</h4>
              <p>Following a successful pilot, we execute the full deployment plan, complete with regular impact reporting and joint press announcements.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.current} data-screen-label="Current Partners">
        <div className="wrap">
          <SectionHead
            eyebrow="04 / Network"
            title="Our current partners."
            lede="Join an ecosystem of forward-thinking organizations investing in the digital infrastructure of tomorrow."
          />
          <div className={styles.currentGrid}>
            <div className={styles.partner}>
              <div className={styles.name}>Atlas Ventures</div>
              <div className={styles.kind}>Seed Funder</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>MTN Foundation</div>
              <div className={styles.kind}>Connectivity Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Lagos State MoE</div>
              <div className={styles.kind}>Gov Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Google.org</div>
              <div className={styles.kind}>Grant Funder</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Safaricom</div>
              <div className={styles.kind}>Chapter Sponsor</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>ALX Africa</div>
              <div className={styles.kind}>Talent Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Western Cape Gov</div>
              <div className={styles.kind}>Gov Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Mastercard Fdn</div>
              <div className={styles.kind}>Scale Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Paystack</div>
              <div className={styles.kind}>Payment Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>UNICEF Innovation</div>
              <div className={styles.kind}>Impact Partner</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonial} data-screen-label="Testimonial">
        <div className="wrap">
          <span className={styles.eyebrow}>The Impact</span>
          <div className={styles.q}>Partnering with KiddyKode was the catalyst for our entire STEAM overhaul. The curriculum is world-class, but it's the mentor support that makes the difference.</div>
          <div className={styles.who}>David Ochieng · Headmaster, Nairobi Partner School</div>
        </div>
      </section>

      <CtaStrip 
        eyebrow="Start the conversation"
        title="Ready to partner?"
        buttons={[
          { label: "Contact our Partnerships Desk", href: "/contact", variant: "primary" },
          { label: "Learn about our Programs", href: "/programs", variant: "ghost" },
        ]}
      />
    </>
  );
}
