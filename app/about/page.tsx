import { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { SectionHead } from "../components/SectionHead";
import { CtaStrip } from "../components/CtaStrip";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import styles from "./about.module.css";
import Link from "next/link";

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
        eyebrow="The Story"
        title="We teach children to build the things they use."
        lede="KiddyKode is a non-profit learning movement. We believe the next century of African culture, commerce, and civic life will be written in code — and the children writing it deserve more than borrowed curricula."
        metaItems={[
          { label: "Founded", value: "2025" },
          { label: "HQ", value: "Yaounde, Cameroon" },
        ]}
      />

      <section className={styles.mission} id="mission" data-screen-label="Mission">
        <div className="wrap">
          <SectionHead eyebrow="01 / Mission" />
          <div className={styles.missionGrid}>
            <div className={styles.missionStatement}>
              From consumers of technology to authors of it.
            </div>
            <div className={styles.missionBody}>
              <p>Technology is not a passive utility; it is the material of modern power. We exist to ensure Africa's youngest generation learns to wield it.</p>
              <p className="mt-[18px]">We teach children how to code, but code is just the medium. The outcome we care about is agency: the moment a ten-year-old realizes she doesn't just have to play the game, she can change the rules.</p>
            </div>
          </div>
          <div className={styles.principles}>
            <div className={styles.principle}>
              <span className={styles.principleNum}>01</span>
              <h4>Creativity first</h4>
              <p>We do not teach syntax for the sake of syntax. Every lesson begins with a brief to build something tangible: a story, a game, a tool for their family.</p>
            </div>
            <div className={styles.principle}>
              <span className={styles.principleNum}>02</span>
              <h4>Context matters</h4>
              <p>Our curriculum is not translated from San Francisco. The examples, the logic puzzles, and the constraints are drawn from the realities of African cities.</p>
            </div>
            <div className={styles.principle}>
              <span className={styles.principleNum}>03</span>
              <h4>Built for all</h4>
              <p>Coding is not a luxury enrichment activity. We partner with public school systems to ensure access does not depend on a parent's income.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.origin} id="origin" data-screen-label="Origin Story">
        <div className="wrap">
          <SectionHead
            eyebrow="02 / The Origin"
            title="It started with a borrowed church hall in Surulere."
          />
          <div className={styles.originGrid}>
            <div className={styles.originMedia}>
              <ImagePlaceholder tone="warm" photoUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80" caption="Replace ▸ The first cohort, 2023" />
            </div>
            <div className={styles.originBody}>
              <p>In 2023, our founders — two software engineers and a primary school teacher — ran a six-week Saturday coding club for 12 children in Lagos. The curriculum was entirely offline: algorithms taught via clapping games, loops taught via relay races.</p>
              <p>By week four, the children were writing basic Python scripts on three borrowed laptops. By week six, they had built a text-based adventure game in Yoruba.</p>
              <p>The demand from parents was overwhelming. But what became clear was that the magic wasn't the laptops — it was the pedagogy. When you remove the intimidation of "computer science" and replace it with "making things," children learn at astonishing speed.</p>
              <p>We formalized KiddyKode later that year to scale that pedagogy across the continent.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stakes} id="scale" data-screen-label="Stakes">
        <div className="wrap">
          <SectionHead
            eyebrow="03 / The Scale"
            title="The largest youth population in human history."
            lede="By 2050, one in three young people in the world will live in Africa. The economic and cultural future of the globe depends on what this generation is equipped to build."
          />
          <div className={styles.stakesGrid}>
            <div className={styles.stake}>
              <div className={styles.stakeN}>60<sup>%</sup></div>
              <p>Of Africa's population is currently under the age of 25.</p>
            </div>
            <div className={styles.stake}>
              <div className={styles.stakeN}>12<sup>M</sup></div>
              <p>Youth enter the African workforce every year, competing for 3M formal jobs.</p>
            </div>
            <div className={styles.stake}>
              <div className={styles.stakeN}>&lt; 5<sup>%</sup></div>
              <p>Of primary schools on the continent currently offer structured computing education.</p>
            </div>
            <div className={styles.stake}>
              <div className={styles.stakeN}>100<sup>K</sup></div>
              <p>The number of creators KiddyKode aims to train by the year 2030.</p>
            </div>
          </div>
          <div className={styles.stakesSrc}>Source — UN Population Fund / African Development Bank</div>
        </div>
      </section>

      <section className={styles.pull} data-screen-label="Quote">
        <div className="wrap">
          <span className={styles.eyebrow}>Why we do this</span>
          <div className={styles.pullQ}>When a child builds her first program, the country gains a citizen who knows the world is editable.</div>
          <div className={styles.pullWho}>
            <span><strong>Adaeze Okonkwo</strong> · Co-founder & Curriculum Director</span>
          </div>
        </div>
      </section>

      <section className={styles.people} id="team" data-screen-label="Team">
        <div className="wrap">
          <SectionHead
            eyebrow="04 / The People"
            title="Built by teachers, engineers, and parents."
            lede="Our core team spans three countries and combines deep experience in primary pedagogy, scalable software architecture, and community organizing."
          />
          <div className={styles.teamGrid}>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="clay" caption="Replace ▸ Headshot" /></div>
              <h4>Adaeze Okonkwo</h4>
              <div className={styles.role}>Co-founder, Curriculum</div>
              <p>Former primary teacher and curriculum designer. Writes the pedagogy.</p>
            </div>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="ink" caption="Replace ▸ Headshot" /></div>
              <h4>Kweku Ofori</h4>
              <div className={styles.role}>Co-founder, Operations</div>
              <p>Scales the chapter model. Previously ran logistics for a pan-African NGO.</p>
            </div>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="warm" caption="Replace ▸ Headshot" /></div>
              <h4>Thandi Mbeki</h4>
              <div className={styles.role}>Head of Storytelling</div>
              <p>Documents the movement. Former education journalist.</p>
            </div>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="cool" caption="Replace ▸ Headshot" /></div>
              <h4>Samuel Kamau</h4>
              <div className={styles.role}>Engineering Lead</div>
              <p>Builds the Studio platform. Open-source contributor.</p>
            </div>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="sage" caption="Replace ▸ Headshot" /></div>
              <h4>Mariam El-Sayed</h4>
              <div className={styles.role}>Regional Lead, North</div>
              <p>Manages the Cairo and Alexandria chapters and Arabic localization.</p>
            </div>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="ink" caption="Replace ▸ Headshot" /></div>
              <h4>Zola Nkosi</h4>
              <div className={styles.role}>Regional Lead, South</div>
              <p>Coordinates partner schools across the Western Cape.</p>
            </div>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="clay" caption="Replace ▸ Headshot" /></div>
              <h4>David Ochieng</h4>
              <div className={styles.role}>Head of Partnerships</div>
              <p>Works with sponsors and ministries to fund public school deployments.</p>
            </div>
            <div className={styles.person}>
              <div className={styles.img}><ImagePlaceholder tone="warm" caption="Replace ▸ Headshot" /></div>
              <h4>Esther Adekunle</h4>
              <div className={styles.role}>Lead Mentor</div>
              <p>Trains our volunteer network and writes the mentor handbook.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gov} id="governance" data-screen-label="Governance">
        <div className="wrap">
          <SectionHead eyebrow="05 / Governance" />
          <div className={styles.govGrid}>
            <div>
              <h3 className="mb-[24px]">Board of Directors</h3>
              <div className={styles.govList}>
                <div className={styles.govItem}>
                  <h4>Dr. Funmilayo Sowande (Chair)</h4>
                  <p>Dean of Education, Lagos State University</p>
                </div>
                <div className={styles.govItem}>
                  <h4>Tarik Mansour</h4>
                  <p>Partner, Atlas Ventures Africa</p>
                </div>
                <div className={styles.govItem}>
                  <h4>Grace Njoroge</h4>
                  <p>Former Minister of ICT, Kenya</p>
                </div>
                <div className={styles.govItem}>
                  <h4>Adaeze Okonkwo</h4>
                  <p>Co-founder, KiddyKode</p>
                </div>
                <div className={styles.govItem}>
                  <h4>Kweku Ofori</h4>
                  <p>Co-founder, KiddyKode</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-[24px]">Advisory Council</h3>
              <div className={styles.govList}>
                <div className={styles.govItem}>
                  <h4>Prof. Sarah Olanrewaju</h4>
                  <p>Child Psychology & Early Development</p>
                </div>
                <div className={styles.govItem}>
                  <h4>James Mwangi</h4>
                  <p>Technology Infrastructure Strategy</p>
                </div>
                <div className={styles.govItem}>
                  <h4>Fatima Al-Fayed</h4>
                  <p>Policy & Government Relations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.timeline} id="timeline" data-screen-label="Timeline">
        <div className="wrap">
          <SectionHead eyebrow="06 / The Journey So Far" />
          <div className={styles.tlRail}>
            <div className={styles.tlRow}>
              <div className={styles.yr}>2023</div>
              <h4>The First Cohort</h4>
              <p>12 students in a borrowed hall in Surulere, Lagos. The curriculum is tested and proven.</p>
            </div>
            <div className={styles.tlRow}>
              <div className={styles.yr}>2024</div>
              <h4>Formalization</h4>
              <p>Registered as a non-profit. First 5 partner schools onboarded. The 'Studio' platform prototype is built.</p>
            </div>
            <div className={styles.tlRow}>
              <div className={styles.yr}>2025</div>
              <h4>Regional Expansion</h4>
              <p>Chapters open in Nairobi and Cape Town. Curriculum localized into Swahili. 5,000 learners reached.</p>
            </div>
            <div className={styles.tlRow}>
              <div className={styles.yr}>2026</div>
              <h4>The Network Effect</h4>
              <p>9 active cities. 40k+ projects shipped. Launch of the continental demo night series.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.partners} id="partners" data-screen-label="Funding">
        <div className="wrap">
          <div className={styles.partnersGrid}>
            <div>
              <span className="eyebrow">07 / Funding & Partners</span>
              <h2 className="mt-[18px]">Backed by organizations that believe in the mission.</h2>
              <p className="lede mt-[24px]">KiddyKode is supported by philanthropic grants, corporate CSR partnerships, and a network of individual donors. This ensures our curriculum remains free for public school partners.</p>
              <Link href="/partners" className="btn btn--link mt-[32px]">Read our partnership guidelines <span className="arrow">→</span></Link>
            </div>
            <div className={styles.partnersRow}>
              <div className={styles.pcell}>Partner Logomark</div>
              <div className={styles.pcell}>Partner Logomark</div>
              <div className={styles.pcell}>Partner Logomark</div>
              <div className={styles.pcell}>Partner Logomark</div>
              <div className={styles.pcell}>Partner Logomark</div>
              <div className={styles.pcell}>Partner Logomark</div>
              <div className={styles.pcell}>Partner Logomark</div>
              <div className={styles.pcell}>Partner Logomark</div>
              <div className={styles.pcell}>Partner Logomark</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.press} id="contact" data-screen-label="Contact">
        <div className="wrap">
          <SectionHead eyebrow="08 / Get in Touch" />
          <div className={styles.pressGrid}>
            <div className={styles.pressCard}>
              <span className="eyebrow">Press & Media</span>
              <h3>Writing a story?</h3>
              <p>We can provide high-res assets, impact data, and interviews with leadership, teachers, or parents (with consent).</p>
              <Link href="/contact" className="btn btn--ghost">Visit the Press Desk <span className="arrow">→</span></Link>
            </div>
            <div className={styles.pressCard}>
              <span className="eyebrow">General Enquiries</span>
              <h3>Want to get involved?</h3>
              <p>Whether you want to enroll a child, partner as a school, or open a chapter in your city, our contact team will route your message.</p>
              <Link href="/contact" className="btn btn--primary">Contact Us <span className="arrow">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip 
        eyebrow="Join the movement"
        title="We are building the future, one line of code at a time."
        buttons={[
          { label: "Join a Program", href: "/programs", variant: "primary" },
          { label: "Partner With Us", href: "/partners", variant: "ghost" },
          { label: "Read the Stories", href: "/stories", variant: "link" }
        ]}
      />
    </>
  );
}
