import { Metadata } from "next";
import { PageHero } from "../../components/PageHero";
import { SectionHead } from "../../components/SectionHead";
import { CtaStrip } from "../../components/CtaStrip";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import styles from "./stories.module.css";
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: "Stories — KiddyKode",
  description: "Dispatches from the classrooms, demo nights, and homes of the children, teachers, and partners building this movement.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Stories", href: "/stories" },
        ]}
        eyebrow="The Journal"
        title="Dispatches from the work."
        lede="We document the movement as it happens. These are the stories of the children building, the teachers learning, and the communities shifting around them."
      />

      <section className={styles.feature} data-screen-label="Featured Story">
        <div className="wrap">
          <div className={styles.featureGrid}>
            <div className={styles.featureMedia}>
              <ImagePlaceholder
                tone="clay"
                photoUrl="https://res.cloudinary.com/dsbm73ojs/image/upload/v1779204743/Britney_Chenwi_mqdjeg.jpg"
                // caption="Replace ▸ Zola at the Cape Town demo night"
              />
            </div>
            <div className={styles.featureBody}>
              <div className={styles.meta}>
                <span className={styles.tag}>Student Story</span>
                <span>USA</span>
              </div>
              <h2>Britney, age 13, built an air pollution awareness game.</h2>
              <p>
                Britney, a student from the United States, built an air
                pollution awareness game. “I wanted my friends to know more
                about air pollution and how to stop it while playing the game.”
                What began as a 12-week beginner session turned into a powerful
                awareness project, where Britney used coding and storytelling to
                transform a serious environmental issue into an interactive
                learning experience. Through her game, players explore real-life
                causes of air pollution and make choices that show how everyday
                actions can help protect the environment. In her own words, she
                shared: “If people see this more often, they will be able to
                find and see more ways to stop air pollution. It will also
                educate people on how to stop the damages they are causing to
                the air.” She is now taking this project to the next level so it
                can be shared as a classroom learning tool, sparking discussions
                among peers about sustainability and climate responsibility.
              </p>
              <div className={styles.byline}>
                By KiddyKode Editorial Team · 5 min read
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.filterBar}>
        <div className={`wrap ${styles.filterWrap}`}>
          <div className={styles.chips}>
            <button className={`${styles.chip} ${styles.active}`}>
              All Stories
            </button>
            <button className={styles.chip}>Student Projects</button>
            <button className={styles.chip}>Teacher Notes</button>
            <button className={styles.chip}>Impact Data</button>
            <button className={styles.chip}>Chapter News</button>
          </div>
          <div className={styles.sort}>
            Sort by
            <select defaultValue="newest">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>
      </div>

      <section className={styles.mag} data-screen-label="Magazine Grid">
        <div className="wrap">
          <div className={styles.magGrid}>
            <Link href="#" className={`${styles.card} ${styles.span4}`}>
              <div className={styles.img}>
                <ImagePlaceholder
                  tone="warm"
                  photoUrl="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80"
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.tag}>Parent</span>
                <span>USA</span>
              </div>
              <h3>
                "When she finishes her coding assignments, she presents it to me proudly and she always says her classmate did it very well and she wants to do it even better next time."
              </h3>
              <p>
                A mother in the USA on what changes at home when a child becomes
                a creator.
              </p>
              <div className={styles.byline}>3 min read</div>
            </Link>

            <Link href="#" className={`${styles.card} ${styles.span4}`}>
              <div className={styles.img}>
                <ImagePlaceholder
                  tone="sage"
                  photoUrl="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=800&q=80"
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.tag}>School</span>
                <span>Lagos</span>
              </div>
              <h3>Iyeru Okin Primary doubled enrolment after Year 1.</h3>
              <p>
                How a Lagos primary school turned an after-school club into a
                flagship STEAM strategy.
              </p>
              <div className={styles.byline}>5 min read</div>
            </Link>

            <Link href="#" className={`${styles.card} ${styles.span4}`}>
              <div className={styles.img}>
                <ImagePlaceholder tone="ink" />
              </div>
              <div className={styles.meta}>
                <span className={styles.tag}>Chapter</span>
                <span>Accra</span>
              </div>
              <h3>The Accra chapter officially launches with 40 mentors.</h3>
              <p>
                Our first expansion into Ghana begins with a week-long mentor
                training bootcamp.
              </p>
              <div className={styles.byline}>2 min read</div>
            </Link>

            <Link href="#" className={`${styles.card} ${styles.span8}`}>
              <div className={styles.img}>
                <ImagePlaceholder
                  tone="cool"
                  photoUrl="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.tag}>Pedagogy</span>
                <span>Global</span>
              </div>
              <h3>Why we don't teach syntax first.</h3>
              <p>
                A deep dive into the KiddyKode methodology: why starting with a
                broken project is better than starting with a perfect "Hello
                World".
              </p>
              <div className={styles.byline}>
                By Adaeze Okonkwo · 8 min read
              </div>
            </Link>

            <Link href="#" className={`${styles.card} ${styles.span4}`}>
              <div className={styles.img}>
                <ImagePlaceholder
                  tone="clay"
                  photoUrl="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80"
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.tag}>Project</span>
                <span>USA</span>
              </div>
              <h3>She built a text-based interactive game to explore Africa.</h3>
              <p>Using public API data to solve a local transit problem.</p>
              <div className={styles.byline}>4 min read</div>
            </Link>

            <Link href="#" className={`${styles.card} ${styles.span6}`}>
              <div className={styles.img}>
                <ImagePlaceholder
                  tone="warm"
                  photoUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.meta}>
                  <span className={styles.tag}>Impact</span>
                  <span>Q1 2026</span>
                </div>
                <h3>The first 10,000 learners.</h3>
                <p>
                  We crossed our first major milestone this month. Here is what
                  we learned, what broke, and how we are adjusting the model for
                  the next 90,000.
                </p>
                <div className={styles.byline}>By Kweku Ofori · 6 min read</div>
              </div>
            </Link>

            <Link href="#" className={`${styles.card} ${styles.span6}`}>
              <div className={styles.img}>
                <ImagePlaceholder tone="sage" />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.meta}>
                  <span className={styles.tag}>Platform</span>
                  <span>Studio Update</span>
                </div>
                <h3>Introducing offline sync for Studio.</h3>
                <p>
                  How we rebuilt our browser IDE to handle intermittent
                  connectivity without losing a single line of student code.
                </p>
                <div className={styles.byline}>
                  By Samuel Kamau · 5 min read
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.quoteBreak} data-screen-label="Quote Break">
        <div className="wrap">
          <span className={styles.eyebrow}>The View from the Classroom</span>
          <div className={styles.q}>
            My students stopped asking me when class ends. That is the only
            review you need.
          </div>
          <div className={styles.who}>
            Esther Adekunle · Teacher, Ibadan partner school
          </div>
        </div>
      </section>

      <section className={styles.series} data-screen-label="Series">
        <div className="wrap">
          <SectionHead
            eyebrow="Series"
            title="Demo Night Diaries"
            lede="Every term ends with a Demo Night. We profile one project from each city's event."
          />
          <div className={styles.seriesGrid}>
            <Link href="#" className={styles.sCard}>
              <div className={styles.ep}>Episode 01 — Lagos</div>
              <h4>A game to teach Yoruba tonal marks.</h4>
              <p>Built by a 9-year-old student at our Surulere club.</p>
            </Link>
            <Link href="#" className={styles.sCard}>
              <div className={styles.ep}>Episode 02 — Nairobi</div>
              <h4>Automating the tuck shop inventory.</h4>
              <p>
                A Year 6 class collaborated to replace their school's paper
                ledger.
              </p>
            </Link>
            <Link href="#" className={styles.sCard}>
              <div className={styles.ep}>Episode 03 — Cape Town</div>
              <h4>The load-shedding homework planner.</h4>
              <p>
                An app that reschedules tasks based on the Eskom power grid API.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.submit} data-screen-label="Submit">
        <div className="wrap">
          <div className={styles.submitGrid}>
            <div>
              <span className="eyebrow">Pitch us</span>
              <h2 className="mt-[18px]">Submit a story.</h2>
              <p className="lede mt-[24px]">
                We rely on chapter leads, mentors, and teachers to surface the
                best projects and stories from the ground.
              </p>
              <a
                href="mailto:press@kiddykode.org"
                className="btn btn--primary mt-[32px]"
              >
                Email the Editor <span className="arrow">→</span>
              </a>
            </div>
            <div className={styles.subCard}>
              <div className={styles.stepRow}>
                <div className={styles.n}>1</div>
                <div>
                  <h4>Keep it brief</h4>
                  <p>
                    Send a 3-4 sentence pitch. What was built, who built it, and
                    why does it matter?
                  </p>
                </div>
              </div>
              <div className={styles.stepRow}>
                <div className={styles.n}>2</div>
                <div>
                  <h4>Get consent</h4>
                  <p>
                    If pitching a student story, ensure you have verbal approval
                    from the parents before we begin interviewing.
                  </p>
                </div>
              </div>
              <div className={styles.stepRow}>
                <div className={styles.n}>3</div>
                <div>
                  <h4>Include visuals</h4>
                  <p>
                    A link to the Studio project or a photo of the demo goes a
                    long way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        eyebrow="Newsletter"
        title="One dispatch a month. No fluff."
        buttons={[
          { label: "Subscribe via Email", href: "#", variant: "primary" },
        ]}
      />
    </>
  );
}
