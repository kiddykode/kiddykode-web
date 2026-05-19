import { Metadata } from "next";
import { PageHero } from "../../components/PageHero";
import { SectionHead } from "../../components/SectionHead";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import { ContactForm } from "../../components/ContactForm";
import styles from "./contact.module.css";
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: "Contact — KiddyKode",
  description: "Get in touch with the KiddyKode team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        eyebrow="Get in touch"
        title="We are here."
        lede="KiddyKode is a distributed team across three time zones. We read every email, and we route them manually. Pick the desk that fits your need."
      />

      <section className={styles.triage} data-screen-label="Triage">
        <div className="wrap">
          <div className={styles.triageGrid}>
            <div className={styles.desk}>
              <span className={styles.n}>01 / Schools</span>
              <h3>School Partnerships</h3>
              <p>For headteachers, district officials, and NGOs wanting to run KiddyKode curriculum.</p>
              <a href="mailto:schools@kiddykode.org" className={styles.mail}>schools@kiddykode.org</a>
            </div>
            <div className={styles.desk}>
              <span className={styles.n}>02 / Development</span>
              <h3>Funding & Grants</h3>
              <p>For philanthropic partners, CSR leads, and individual donors.</p>
              <a href="mailto:partners@kiddykode.org" className={styles.mail}>partners@kiddykode.org</a>
            </div>
            <div className={styles.desk}>
              <span className={styles.n}>03 / Press</span>
              <h3>Media & Stories</h3>
              <p>For journalists, conference organizers, and requests for impact data.</p>
              <a href="mailto:press@kiddykode.org" className={styles.mail}>press@kiddykode.org</a>
            </div>
            <div className={styles.desk}>
              <span className={styles.n}>04 / General</span>
              <h3>Everything else</h3>
              <p>For parents, potential mentors, chapter leads, and general questions.</p>
              <a href="mailto:hello@kiddykode.org" className={styles.mail}>hello@kiddykode.org</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contact} id="form" data-screen-label="Form">
        <div className="wrap">
          <SectionHead
            eyebrow="Direct Line"
            title="Send a message"
            lede="If you prefer not to use email, drop a message here. It goes to the same inbox."
          />
          <div className={styles.contactGrid}>
            <ContactForm />

            <div className={styles.sidebar}>
              <div className={styles.sideCard}>
                <h4>Looking for the Studio?</h4>
                <p>If you're a student trying to log into KiddyKode Studio to access your projects, you're in the wrong place.</p>
                <Link href="#" className="btn btn--link" style={{ marginTop: "16px" }}>Go to Studio Login →</Link>
              </div>
              {/* <div className={styles.sideCard}>
                <h4>Want to open a chapter?</h4>
                <p>We provide the curriculum, the mentor training playbook, and the brand. You provide the space and the community.</p>
                <Link href="#" className="btn btn--link" style={{ marginTop: "16px" }}>Read the chapter guide →</Link>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* <section className={styles.offices} id="offices" data-screen-label="Offices">
        <div className="wrap">
          <SectionHead
            eyebrow="Locations"
            title="Where we work."
            lede="KiddyKode operates out of three primary hubs, supporting chapters in nine cities."
          />
          <div className={styles.officeGrid}>
            <div className={styles.office}>
              <div className={styles.img}>
                <ImagePlaceholder tone="warm" photoUrl="https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80" />
              </div>
              <span className={styles.pin}>West Africa Hub</span>
              <h3>Lagos, Nigeria</h3>
              <p>Yaba Tech District<br />Serving chapters in Nigeria & Ghana</p>
            </div>
            <div className={styles.office}>
              <div className={styles.img}>
                <ImagePlaceholder tone="cool" photoUrl="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80" />
              </div>
              <span className={styles.pin}>East Africa Hub</span>
              <h3>Nairobi, Kenya</h3>
              <p>Kilimani<br />Serving chapters in Kenya, Rwanda & Tanzania</p>
            </div>
            <div className={styles.office}>
              <div className={styles.img}>
                <ImagePlaceholder tone="clay" photoUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80" />
              </div>
              <span className={styles.pin}>Southern Hub</span>
              <h3>Cape Town, SA</h3>
              <p>Woodstock<br />Serving chapters in SA & Zambia</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.directory} data-screen-label="Directory">
        <div className="wrap">
          <SectionHead eyebrow="Directory" />
          <div className={styles.dirList}>
            <div className={styles.dirRow}>
              <div className={styles.name}>Adaeze Okonkwo</div>
              <div className={styles.role}>Curriculum & Pedagogy</div>
              <a href="mailto:adaeze@kiddykode.org" className={styles.mail}>adaeze@kiddykode.org</a>
            </div>
            <div className={styles.dirRow}>
              <div className={styles.name}>Kweku Ofori</div>
              <div className={styles.role}>Operations & Chapters</div>
              <a href="mailto:kweku@kiddykode.org" className={styles.mail}>kweku@kiddykode.org</a>
            </div>
            <div className={styles.dirRow}>
              <div className={styles.name}>Samuel Kamau</div>
              <div className={styles.role}>Engineering (Studio)</div>
              <a href="mailto:samuel@kiddykode.org" className={styles.mail}>samuel@kiddykode.org</a>
            </div>
            <div className={styles.dirRow}>
              <div className={styles.name}>Thandi Mbeki</div>
              <div className={styles.role}>Editorial & Storytelling</div>
              <a href="mailto:thandi@kiddykode.org" className={styles.mail}>thandi@kiddykode.org</a>
            </div>
            <div className={styles.dirRow}>
              <div className={styles.name}>Zola Nkosi</div>
              <div className={styles.role}>Southern Africa Lead</div>
              <a href="mailto:zola@kiddykode.org" className={styles.mail}>zola@kiddykode.org</a>
            </div>
            <div className={styles.dirRow}>
              <div className={styles.name}>Mariam El-Sayed</div>
              <div className={styles.role}>North Africa Lead</div>
              <a href="mailto:mariam@kiddykode.org" className={styles.mail}>mariam@kiddykode.org</a>
            </div>
          </div>
        </div>
      </section> */}

      <section className={styles.safe} id="safeguarding" data-screen-label="Safeguarding">
        <div className="wrap">
          <div className={styles.safeGrid}>
            <div>
              <span className={styles.eyebrow}>Safeguarding</span>
              <h2>Report a concern.</h2>
            </div>
            <div>
              <p>We have a zero-tolerance policy for safeguarding breaches. If you have any concern about the conduct of a mentor, partner, or staff member towards a child, please contact our dedicated safeguarding officer immediately.</p>
              <p>This inbox is monitored 7 days a week and is restricted to the safeguarding lead and the board chair.</p>
              <a href="mailto:safe@kiddykode.org" className={styles.mail}>safe@kiddykode.org</a>
              <div className={styles.anon}>To report anonymously, use our <Link href="#" style={{textDecoration:"underline"}}>secure reporting form</Link>.</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faq} data-screen-label="FAQ">
        <div className="wrap">
          <div className={styles.faqGrid}>
            <div>
              <span className="eyebrow">Mini FAQ</span>
              <h2 className="mt-[18px]">Before you email.</h2>
            </div>
            <div>
              <p className="lede mb-[32px]">If your question is on this list, you can probably skip the form — the answer is right here.</p>
              <div className={styles.faqList}>
                <details className={styles.cq} open>
                  <summary><span>How quickly will I hear back?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>Within two working days for the four main desks, faster for safeguarding (24 hours, every day of the week). If you haven't heard from us in 72 hours, your message probably didn't reach us — please resend, or write directly to the desk lead listed above.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>Can I visit one of your offices?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>Yes, but please write first. We're a small team and don't keep a permanent front-desk presence at any of the three offices. Schedule a visit through the relevant country lead and we'll meet you with the right person in the room.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>Do you take press inquiries from outside the continent?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>Always. Write to the press desk with a one-paragraph brief, your outlet, and your deadline. We can usually arrange a same-week interview with a country director, and a 1–2 week turnaround for learner or teacher voices (with consent).</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>I want to volunteer / mentor / open a chapter.</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>Three different things, but they start in the same place — write to the development desk with your city, what you do, and what you'd like to contribute. We'll route you to the right chapter lead or onboarding cycle.</p>
                </details>
                <details className={styles.cq}>
                  <summary><span>Is KiddyKode hiring?</span><span className={styles.plus}>+</span></summary>
                  <p className={styles.ans}>Open roles are posted on the Careers page. If nothing fits but you'd be a strong addition, we keep an "open application" queue reviewed every quarter — write to <a href="mailto:careers@kiddykode.org" style={{color:"var(--color-accent)",borderBottom:"1px solid var(--color-accent)"}}>careers@kiddykode.org</a>.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
