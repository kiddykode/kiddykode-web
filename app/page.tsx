import { Metadata } from "next";
import { ImagePlaceholder } from "./components/ImagePlaceholder";
import HeroCarousel from "./components/HeroCarousel";
import styles from "./home.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KiddyKode — Coding education for Africa's next generation of creators",
  description: "KiddyKode is a continental learning movement teaching Africa's youngest generation to build with code.",
};

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

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
                KiddyKode exists to help children move from passive screen use to active digital creation. We use coding as a tool for problem-solving, creativity, communication, and confidence — not as syntax practice alone.
              </p>
            </div>
          </div>
          <div className={styles.principles}>
            <div className={styles.principle}>
              <span className={styles.num}>01</span>
              <h4>Creativity first</h4>
              <p>
                Every lesson begins with something a child can make: a story, a game, a tool, or a small solution to a real problem.
              </p>
            </div>
            <div className={styles.principle}>
              <span className={styles.num}>02</span>
              <h4>Context matters</h4>
              <p>
                Our stories, examples, and challenges are designed to feel familiar, meaningful, and rooted in African realities.
              </p>
            </div>
            <div className={styles.principle}>
              <span className={styles.num}>03</span>
              <h4>Built for access</h4>
              <p>
                We want coding education to be practical, structured, and reachable for more children, not only a small privileged few.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.impact}
        id="impact"
        data-screen-label="03 Early Evidence"
      >
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className="eyebrow">03 / Early signals of evidence</span>
              <h2 className="mt-[18px]">
                We are early — so we measure carefully.
              </h2>
            </div>
            <div>
              <p className="lede">
                We are still in the early stage of building KiddyKode, so this
                section focuses on what we can honestly measure now: pilot
                learners, baseline assessments, student work, and the thinking
                skills we are tracking over time. We would rather publish small,
                real evidence than oversized claims.
              </p>
            </div>
          </div>
          <div className={styles.impactGrid}>
            <div className={styles.impactCell}>
              <div className={styles.label}>
                {/* Learners Reached */}
                Pilot learners
              </div>
              {/* <div className={styles.num}>
                12,400<sup>+</sup>
              </div> */}
              <div className={styles.desc}>
                The first students helping us test and strengthen the KiddyKode
                method through real sessions and assessments.
              </div>
            </div>
            <div className={styles.impactCell}>
              <div className={styles.label}>
                {/* Schools Engaged */}
                Projects completed
              </div>
              <div className={styles.num}>4</div>
              <div className={styles.desc}>
                Early student work that shows children can move from ideas to
                structured digital creation.
              </div>
            </div>
            <div className={styles.impactCell}>
              <div className={styles.label}>
                {/* Projects Shipped */}
                Skills tracked
              </div>
              {/* <div className={styles.num}>41k</div> */}
              <div className={styles.desc}>
                Logical reasoning, problem-solving, creativity, communication,
                and confidence.
              </div>
            </div>
            <div className={styles.impactCell}>
              <div className={styles.label}>
                {/* Cities active */}
                Evidence building
              </div>
              {/* <div className={styles.num}>9</div> */}
              <div className={styles.desc}>
                We are documenting baseline assessments, student artefacts, and
                progress over time rather than publishing inflated vanity
                metrics.
              </div>
            </div>
          </div>
          <div className={styles.impactFootnote}>
            <span className="mono">
              Source — KiddyKode internal reporting, March 2026
            </span>
            <Link href="#" className="btn btn--link">
              Read the 2025 evidence report →
            </Link>
          </div>
        </div>
      </section>

      <section
        className={styles.pathways}
        id="programs"
        data-screen-label="04 Learning Formats"
      >
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className="eyebrow">04 / LEARNING FORMATS</span>
              <h2 className="mt-[18px]">
                Where children can learn with KiddyKode.
              </h2>
            </div>
            <div>
              <p className="lede">
                KiddyKode keeps its learning formats simple and intentional.
                Every format follows the same structured journey: story, logic,
                build, improve, present.
              </p>
            </div>
          </div>

          <div className={styles.pathwaysGrid}>
            <Link
              className={`${styles.pathway} ${styles.feature}`}
              href="/programs"
            >
              <div className={styles.pathwayImage}>
                <ImagePlaceholder
                  tone="warm"
                  photoUrl="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
                  caption="Replace ▸ Classroom — students at a partner school working at shared devices"
                />
              </div>
              <div className={styles.pathwayBody}>
                <div className={styles.meta}>
                  <span>
                    <span className={styles.dot}></span>Featured pathway
                  </span>
                  <span>Ages 8 – 16</span>
                  <span>In-school</span>
                </div>
                <h3>School Clubs</h3>
                <p>
                  Weekly structured coding sessions delivered in partner
                  schools, designed to help learners build thinking skills and
                  complete hands-on projects.
                </p>
                <span className={styles.pathwayCta}>
                  Explore school programs <span>→</span>
                </span>
              </div>
            </Link>

            <Link className={styles.pathway} href="/programs">
              <div className={styles.pathwayImage}>
                <img
                  src="https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774726/ChatGPT_Image_May_14_2026_09_08_46_PM_dgfdz9.png"
                  alt="Community club night"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className={styles.pathwayBody}>
                <div className={styles.meta}>
                  <span>
                    <span className={styles.dot}></span>Live Online
                  </span>
                  <span>Ages 8–16</span>
                </div>
                <h3>KiddyKode Live</h3>
                <p>
                  Cohort-based coding sessions on Zoom where children learn with
                  facilitators, build projects in Python, practice at home, and
                  present their work.
                </p>
                <span className={styles.pathwayCta}>
                  Register <span>→</span>
                </span>
              </div>
            </Link>

            <Link className={styles.pathway} href="/programs">
              <div className={styles.pathwayImage}>
                <ImagePlaceholder
                  tone="cool"
                  photoUrl="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80"
                  caption="Replace ▸ Community club night, mentor + peers"
                />
              </div>
              <div className={styles.pathwayBody}>
                <div className={styles.meta}>
                  <span>
                    <span className={styles.dot}></span>SELF-PACED Online
                  </span>
                  <span>Ages 8–16</span>
                </div>
                <h3>KiddyKode Studio</h3>
                <p>
                  A guided online platform where learners move from Explorer to
                  Builder to Creator through structured lessons, practice, and
                  project work.
                </p>
                <span className={styles.pathwayCta}>
                  Signup <span>→</span>
                </span>
              </div>
            </Link>

            <Link className={styles.pathway} href="/programs">
              <div className={styles.pathwayImage}>
                <img
                  src="https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774727/ChatGPT_Image_May_14_2026_09_17_40_PM_ma3741.png"
                  alt="Holiday creator camp"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className={styles.pathwayBody}>
                <div className={styles.meta}>
                  <span>
                    <span className={styles.dot}></span>Holiday
                  </span>
                  <span>4-week intensive</span>
                </div>
                <h3>Holiday Bootcamps</h3>
                <p>
                  Short, focused programs during school breaks where learners
                  build and present a complete project in a concentrated format.
                </p>
                <span className={styles.pathwayCta}>
                  Browse upcoming camps <span>→</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.why} data-screen-label="05 Why now">
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className={styles.eyebrow}>
                05 / Why KiddyKode, why now
              </span>
            </div>
            <div></div>
          </div>
          <div className={styles.whyGrid}>
            <div>
              <h2>
                Africa’s children are already living in a digital world. The
                real question is whether they will only use it, or help build
                it.
              </h2>
            </div>
            <div className={styles.whyBody}>
              <p>
                By 2030, Africa’s young population will shape the systems,
                stories, and software that define the continent’s future. Yet
                many children are still learning to use technology without
                learning to build with it. KiddyKode exists to change that by
                helping children move from consumption to authorship through
                structured, project-based coding.
              </p>
              {/* <p>
                KiddyKode exists to invert that trajectory. We teach the
                youngest cohort — primary through early secondary — to move from
                consumption to authorship: from playing the app to making it,
                from reading the story to writing one in code, from using the
                tool to designing a better one for their context.
              </p> */}
            </div>
          </div>
          <div className={styles.pullquote}>
            <div>
              <div className={styles.quote}>
                When a child builds their first program, they begin to
                understand that the digital world is editable.
              </div>
              <div className={styles.attribution}>
                — Deodatus Bijengsi, KiddyKode Co-founder & Curriculum Director
              </div>
            </div>
            <div></div>
          </div>
          <div className={styles.whyThemes}>
            <div className={styles.theme}>
              <span className={styles.marker}>// 01</span>
              <h4>Digital Sovereignty</h4>
              <p>
                WAfrican children should not grow up only consuming technologies
                built elsewhere. They should learn to shape the tools, systems,
                and solutions that affect their own communities.
              </p>
            </div>
            <div className={styles.theme}>
              <span className={styles.marker}>// 02</span>
              <h4>Cultural Continuity</h4>
              <p>
                Coding becomes more meaningful when it is taught through
                stories, language, and contexts children recognize. At
                KiddyKode, technology is not presented as foreign; it becomes a
                medium for African expression.
              </p>
            </div>
            <div className={styles.theme}>
              <span className={styles.marker}>// 03</span>
              <h4>Systemic Thinking</h4>
              <p>
                Learning to code teaches children how to break complex problems
                into smaller, solvable parts. That way of thinking stays with
                them long after the lesson ends.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.stories}
        id="stories"
        data-screen-label="06 Stories"
      >
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className="eyebrow">06 / Stories</span>
              <h2 className="mt-[18px]">Dispatches from the work.</h2>
            </div>
            <div>
              <p className="lede">
                Stories, field notes, and interviews from the classrooms, demo
                nights, and homes of the children, teachers, and partners
                building this movement.
              </p>
            </div>
          </div>
          <div className={styles.storiesGrid}>
            <div className={styles.storyFeature}>
              <div className={styles.img}>
                <ImagePlaceholder
                  tone="clay"
                  photoUrl="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
                  caption="Replace ▸ Zola at the Cape Town demo night"
                />
              </div>
              <div>
                <div className={styles.meta}>
                  <span className={styles.tag}>Student story</span>
                  <span>Cape Town</span>
                </div>
                <h3>
                  Zola, age 11, built an app that maps her grandmother's herbal
                  medicine knowledge.
                </h3>
                <p>
                  "I wanted Gogo's plants to be somewhere even after she isn't
                  here." What began as a six-week Creator Camp turned into a
                  year-long archive project — now in trial use at two community
                  clinics in the Western Cape.
                </p>
                <div className={styles.byline}>
                  By Thandi Mbeki · 6 min read
                </div>
              </div>
            </div>
            <div className={styles.storySecondary}>
              <div className={styles.storySmall}>
                <div className={styles.thumb}>
                  <ImagePlaceholder
                    tone="sage"
                    photoUrl="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=400&q=80"
                  />
                </div>
                <div>
                  <div className={styles.meta}>School story · Lagos</div>
                  <h4>Iyeru Okin Primary doubled enrolment after Year 1.</h4>
                  <p>
                    How a Lagos primary school turned an after-school club into
                    a flagship STEAM strategy.
                  </p>
                </div>
              </div>
              <div className={styles.storySmall}>
                <div className={styles.thumb}>
                  <ImagePlaceholder
                    tone="cool"
                    photoUrl="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=400&q=80"
                  />
                </div>
                <div>
                  <div className={styles.meta}>Parent · Nairobi</div>
                  <h4>
                    "He shows me his code now, the way he used to show me
                    drawings."
                  </h4>
                  <p>
                    A father in Nairobi on what changes at home when a child
                    becomes a maker.
                  </p>
                </div>
              </div>
              <div className={styles.storyQuote}>
                <div className={styles.q}>
                  My students stopped asking me when class ends. That is the
                  only review you need.
                </div>
                <div className={styles.who}>
                  Esther Adekunle · Teacher, Ibadan partner school
                </div>
              </div>
              <Link
                className="btn btn--link"
                href="/stories"
                style={{ alignSelf: "flex-start", marginTop: "8px" }}
              >
                Read all dispatches <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.chapters}
        id="chapters"
        data-screen-label="07 Chapters"
      >
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">07 / Chapters</span>
              <h2 className="mt-[18px]">
                A decentralized network for future growth.
              </h2>
            </div>
            <div>
              <p className="lede">
                KiddyKode is designed to grow through regional chapters led by
                local educators, facilitators, and partners. The central team
                provides the curriculum, platform, and pedagogical framework,
                while chapter leaders help adapt delivery, support schools, and
                expand access in their region. In time, this structure can allow
                KiddyKode to grow across cities and countries without losing the
                consistency of its method.
              </p>
            </div>
            <div className={styles.missionBody}>
              <p>
                KiddyKode is designed to grow through regional chapters led by
                local educators, facilitators, and partners. The central team
                provides the curriculum, platform, and pedagogical framework,
                while chapter leaders help adapt delivery, support schools, and
                expand access in their region. Over time, this structure can
                help KiddyKode grow across cities and countries without losing
                the consistency of its method.
              </p>
            </div>
          </div>
          <div className={styles.chaptersGrid}>
            <div className={styles.map}>
              <div className={styles.mapFrame}></div>
              <div className={styles.mapLabel}>Network Map</div>
              <div
                className={`${styles.marker} ${styles.live}`}
                style={{ top: "45%", left: "35%" }}
              >
                <div className={styles.pin}></div>
                <div className={styles.pinLabel}>Lagos</div>
              </div>
              <div
                className={`${styles.marker} ${styles.live}`}
                style={{ top: "55%", left: "65%" }}
              >
                <div className={styles.pin}></div>
                <div className={styles.pinLabel}>Nairobi</div>
              </div>
              <div
                className={`${styles.marker} ${styles.live}`}
                style={{ top: "85%", left: "45%" }}
              >
                <div className={styles.pin}></div>
                <div className={styles.pinLabel}>Cape Town</div>
              </div>
              <div
                className={`${styles.marker} ${styles.planned}`}
                style={{ top: "30%", left: "50%" }}
              >
                <div className={styles.pin}></div>
              </div>
            </div>
          </div>
          <div className={styles.principles4}>
            <div className={styles.principle}>
              <span className={styles.num}>01</span>
              <h4>Local leadership</h4>
              <p>
                Chapter leads coordinate delivery in their region, build local
                relationships, and help bring the KiddyKode method into schools
                and communities.
              </p>
            </div>
            <div className={styles.principle}>
              <span className={styles.num}>02</span>
              <h4>Shared pedagogy</h4>
              <p>
                Every chapter works from the same structured framework, so
                learners experience a consistent method even when delivery is
                local.
              </p>
            </div>
            <div className={styles.principle}>
              <span className={styles.num}>03</span>
              <h4>Scalable support</h4>
              <p>
                The central team provides curriculum, training, and platform
                support, making it possible for chapters to grow without
                weakening quality.
              </p>
            </div>
            <div className={styles.principle}>
              <span className={styles.num}>04</span>
              <h4>Regional access</h4>
              <p>
                A chapter network makes KiddyKode easier to reach across
                different cities and countries while keeping the brand coherent
                and recognizable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.mission}
        id="mission"
        data-screen-label="02 Mission"
      >
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">07 / Chapter</span>
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
              <h4>Creation over consumption</h4>
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

      <section
        className={styles.partners}
        id="partner"
        data-screen-label="08 Partners"
      >
        <div className="wrap">
          <div className={styles.partnersHead}>
            <div>
              <span className="eyebrow">08 / Partners</span>
              <h2 className="mt-[18px]">
                Funded by organizations investing in the next generation.
              </h2>
            </div>
            <div>
              <p className="lede">
                Our cross-subsidy model relies on philanthropic grants,
                corporate CSR, and foundation partners to keep the curriculum
                free for public schools.
              </p>
            </div>
          </div>
          <div className={styles.partnersGrid}>
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
          <div className={styles.partnersNote}>
            <span className={styles.label}>Become a partner</span>
            <p>
              We are currently taking on new corporate and foundation partners
              for the 2026/2027 school year, particularly those interested in
              sponsoring specific city chapters or providing hardware grants.{" "}
              <Link
                href="/partners"
                className="btn btn--link"
                style={{ display: "inline-block", marginLeft: "8px" }}
              >
                Read our partnership guidelines →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.studio}
        id="studio"
        data-screen-label="09 Studio"
      >
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className="eyebrow">09 / The Studio</span>
            </div>
            <div></div>
          </div>
          <div className={styles.studioGrid}>
            <div className={styles.studioCopy}>
              <h2>KiddyKode Studio turns lessons into projects.</h2>
              <p>
                KiddyKode Studio is our self-paced platform for children to
                follow courses, practice skills, and build projects at their own
                pace. Learners move through Explorer, Builder, and Creator
                levels as they grow from guided work into more independent
                creation.
              </p>
              <div className={styles.studioFeatures}>
                <div className={styles.studioFeature}>
                  <div className={styles.n}>01</div>
                  <div>
                    <h4>Progressive Complexity</h4>
                    <p>
                      Children start with guided activities and simple projects,
                      then move step by step into more open-ended building as
                      their confidence grows.
                    </p>
                  </div>
                </div>
                <div className={styles.studioFeature}>
                  <div className={styles.n}>02</div>
                  <div>
                    <h4>Offline Resilience</h4>
                    <p>
                      Studio is designed so learners can continue building even
                      when connectivity is inconsistent, with progress and
                      project work structured to support uninterrupted learning.
                    </p>
                  </div>
                </div>
                <div className={styles.studioFeature}>
                  <div className={styles.n}>03</div>
                  <div>
                    <h4>Peer Review Built-in</h4>
                    <p>
                      As learners grow, they can share work, compare approaches,
                      and learn from one another through structured feedback and
                      presentation.
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/programs" className="btn btn--ghost">
                Start Exploring<span className="arrow">→</span>
              </Link>
            </div>
            <div className={styles.browser}>
              <div className={styles.browserChrome}>
                <div className={styles.browserDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className={styles.browserUrl}>
                  studio.kiddykode.org<span>/projects/zola/medicine-map</span>
                </div>
                <div></div>
              </div>
              <div className={styles.browserBody}>
                <div className={styles.studioSide}>
                  <div className={styles.group}>
                    <div className={styles.groupLabel}>Project Files</div>
                    <div className={`${styles.item} ${styles.active}`}>
                      app.js
                    </div>
                    <div className={styles.item}>index.html</div>
                    <div className={styles.item}>styles.css</div>
                  </div>
                  <div className={styles.group}>
                    <div className={styles.groupLabel}>Assets</div>
                    <div className={styles.item}>gogo_audio.mp3</div>
                    <div className={styles.item}>plant_sprite.png</div>
                  </div>
                  <div className={styles.badge}>Autosaved 2m ago</div>
                </div>
                <div className={styles.studioCanvas}>
                  <div className={styles.tabs}>
                    <span className={styles.active}>app.js</span>
                    <span>blocks.xml</span>
                  </div>
                  <pre>
                    <span className={styles.ln}>1</span>
                    <span className={styles.com}>// Medicine Map Logic</span>
                    <br />
                    <span className={styles.ln}>2</span>
                    <span className={styles.kw}>const</span> herbs = [<br />
                    <span className={styles.ln}>3</span> &#123;{" "}
                    <span className={styles.kw}>name</span>:{" "}
                    <span className={styles.str}>'Umhlonyane'</span>,{" "}
                    <span className={styles.kw}>use</span>:{" "}
                    <span className={styles.str}>'Cold'</span> &#125;,
                    <br />
                    <span className={styles.ln}>4</span> &#123;{" "}
                    <span className={styles.kw}>name</span>:{" "}
                    <span className={styles.str}>'Imphepho'</span>,{" "}
                    <span className={styles.kw}>use</span>:{" "}
                    <span className={styles.str}>'Calm'</span> &#125;
                    <br />
                    <span className={styles.ln}>5</span>];
                    <br />
                    <span className={styles.ln}>6</span>
                    <br />
                    <span className={styles.ln}>7</span>
                    <span className={styles.kw}>function</span>{" "}
                    <span className={styles.fn}>findHerb</span>(symptom) &#123;
                    <br />
                    <span className={styles.ln}>8</span>{" "}
                    <span className={styles.kw}>return</span> herbs.
                    <span className={styles.fn}>filter</span>(h =&gt; h.use ===
                    symptom);
                    <br />
                    <span className={styles.ln}>9</span>&#125;
                    <br />
                    <span className={styles.ln}>10</span>
                    <br />
                    <span className={styles.ln}>11</span>
                    <span className={styles.fn}>playAudio</span>(
                    <span className={styles.str}>'gogo_audio.mp3'</span>);
                  </pre>
                </div>
                <div className={styles.studioPreview}>
                  <div className={styles.previewLabel}>
                    <span>Preview</span>
                    <span className={styles.dot}>● Live</span>
                  </div>
                  <div className={styles.previewStage}>
                    <div className={styles.previewConfetti}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className={styles.previewSprite}></div>
                  </div>
                  <div className={styles.previewControls}>
                    <span className={styles.run}>Run Code</span>
                    <span>Restart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.final} data-screen-label="10 Final">
        <div className="wrap">
          <span className={styles.eyebrow}>Get Involved</span>
          <h2>Build the future with us.</h2>
          <div className={styles.finalPaths}>
            <div className={styles.finalPath}>
              <span className={styles.pn}>01 / Schools</span>
              <h3>Bring KiddyKode to your classroom</h3>
              <p>
                We provide the curriculum, the platform, and the teacher
                training.
              </p>
              <Link href="/contact" className="btn btn--primary">
                Partner your school
              </Link>
            </div>
            <div className={styles.finalPath}>
              <span className={styles.pn}>02 / Parents</span>
              <h3>Enroll your child</h3>
              <p>
                Find a community club or join the waitlist for the next Creator
                Camp.
              </p>
              <Link href="/programs" className="btn btn--ghost">
                Find a program
              </Link>
            </div>
            <div className={styles.finalPath}>
              <span className={styles.pn}>03 / Partners</span>
              <h3>Fund a chapter</h3>
              <p>
                Sponsor a public school deployment or help us open a new city
                hub.
              </p>
              <Link href="/partners" className="btn btn--ghost">
                Partner with us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
