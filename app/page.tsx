import { Metadata } from "next";
import { ImagePlaceholder } from "./components/ImagePlaceholder";
import styles from "./home.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KiddyKode — Coding education for Africa's next generation of creators",
  description: "KiddyKode is a continental learning movement teaching Africa's youngest generation to build with code.",
};

export default function HomePage() {
  return (
    <>
      <section className={styles.hero} id="hero" data-screen-label="01 Hero">
        <div className="wrap">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className="eyebrow">Coding education for Africa's next generation of creators</span>
              <h1>We are building Africa's next generation of <em>makers, storytellers, and creators</em> — through code.</h1>
              <p className="lede mt-[26px]">KiddyKode is a continental learning movement. We help children become creators by pairing rigorous coding education with cultural storytelling, project-based learning, and school partnerships across the continent.</p>
              <div className={styles.heroCta}>
                <Link className="btn btn--primary" href="/programs">Join a Program <span className="arrow">→</span></Link>
                <Link className="btn btn--ghost" href="/#partner">Partner With Us</Link>
              </div>
              <div className={styles.heroMeta}>
                <span className="mono">— Active in nine cities across Africa</span>
              </div>
            </div>
            <figure className={styles.heroMedia}>
              <ImagePlaceholder tone="warm" photoUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80" />
              <figcaption className={styles.caption}>
                <span><strong>Replace ▸</strong> Portrait — a learner presenting a built project, classroom or demo-night setting</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.mission} id="mission" data-screen-label="02 Mission">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">02 / Mission</span>
            </div>
            <div></div>
          </div>
          <div className={styles.missionGrid}>
            <div className={styles.missionStatement}>
              From consumers of technology to authors of it.
            </div>
            <div className={styles.missionBody}>
              <p>KiddyKode exists because the next century of African creation will be built in code — and the children writing that code deserve more than borrowed curricula. We design coding education that is rigorous, culturally rooted, and project-based. We teach children to see themselves as authors: of stories, of systems, of futures.</p>
            </div>
          </div>
          <div className={styles.principles}>
            <div className={styles.principle}>
              <span className={styles.num}>01</span>
              <h4>Creativity is the curriculum</h4>
              <p>Every lesson begins and ends with a project the learner imagined. Code is the medium; creation is the point.</p>
            </div>
            <div className={styles.principle}>
              <span className={styles.num}>02</span>
              <h4>Culturally rooted</h4>
              <p>Curriculum, examples, and stories draw from African languages, histories, and contemporary life — not translated from elsewhere.</p>
            </div>
            <div className={styles.principle}>
              <span className={styles.num}>03</span>
              <h4>Built for the future</h4>
              <p>We prepare learners not only for jobs that exist, but for the new industries, art forms, and civic tools they will invent.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.impact} id="impact" data-screen-label="03 Impact">
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className="eyebrow">03 / Proof of impact</span>
              <h2 className="mt-[18px]">A movement measured in evidence, not enthusiasm.</h2>
            </div>
            <div>
              <p className="lede">We publish our numbers because trust is built on specifics. The figures below reflect cumulative reach through Q1 2026 across partner schools, community clubs, and KiddyKode Studio.</p>
            </div>
          </div>
          <div className={styles.impactGrid}>
            <div className={styles.impactCell}>
              <div className={styles.label}>Learners reached</div>
              <div className={styles.num}>12,400<sup>+</sup></div>
              <div className={styles.desc}>Children enrolled across school programs, weekend clubs, and summer camps since launch.</div>
            </div>
            <div className={styles.impactCell}>
              <div className={styles.label}>Schools engaged</div>
              <div className={styles.num}>86</div>
              <div className={styles.desc}>Public and private partner schools running KiddyKode curriculum or after-school clubs.</div>
            </div>
            <div className={styles.impactCell}>
              <div className={styles.label}>Projects shipped</div>
              <div className={styles.num}>41k</div>
              <div className={styles.desc}>Student-built apps, games, animations, and stories published through KiddyKode Studio.</div>
            </div>
            <div className={styles.impactCell}>
              <div className={styles.label}>Cities active</div>
              <div className={styles.num}>9</div>
              <div className={styles.desc}>From Cape Town to Accra — local chapters operating with regional curriculum leads.</div>
            </div>
          </div>
          <div className={styles.impactFootnote}>
            <span className="mono">Source — KiddyKode internal reporting, March 2026</span>
            <Link href="#" className="btn btn--link">Read the 2025 impact report →</Link>
          </div>
        </div>
      </section>

      <section className={styles.pathways} id="programs" data-screen-label="04 Programs">
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className="eyebrow">04 / Program pathways</span>
              <h2 className="mt-[18px]">Five ways a child enters the work.</h2>
            </div>
            <div>
              <p className="lede">Each pathway is built around a different setting — classroom, community, family, studio — and all share the same outcome: a child with a finished project and the confidence to start the next one.</p>
            </div>
          </div>

          <div className={styles.pathwaysGrid}>
            <Link className={`${styles.pathway} ${styles.feature}`} href="/programs">
              <div className={styles.pathwayImage}>
                <ImagePlaceholder tone="warm" photoUrl="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80" caption="Replace ▸ Classroom — students at a partner school working at shared devices" />
              </div>
              <div className={styles.pathwayBody}>
                <div className={styles.meta}>
                  <span><span className={styles.dot}></span>Featured pathway</span>
                  <span>Ages 8 – 16</span>
                  <span>In-school</span>
                </div>
                <h3>School Programs</h3>
                <p>A full-year coding curriculum delivered inside partner schools — co-taught with teachers we train, assessed against the KiddyKode rubric, and aligned with national learning frameworks where they exist.</p>
                <span className={styles.pathwayCta}>Explore school programs <span>→</span></span>
              </div>
            </Link>

            <Link className={styles.pathway} href="/programs">
              <div className={styles.pathwayImage}>
                <ImagePlaceholder tone="cool" photoUrl="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80" caption="Replace ▸ Community club night, mentor + peers" />
              </div>
              <div className={styles.pathwayBody}>
                <div className={styles.meta}><span><span className={styles.dot}></span>Weekly</span><span>Ages 10–14</span></div>
                <h3>Community Clubs</h3>
                <p>Neighborhood meet-ups led by local mentors. Project nights, demo days, and peer review.</p>
                <span className={styles.pathwayCta}>Find a club <span>→</span></span>
              </div>
            </Link>

            <Link className={styles.pathway} href="/programs">
              <div className={styles.pathwayImage}>
                <ImagePlaceholder tone="clay" photoUrl="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80" caption="Replace ▸ Holiday creator camp — group demo" />
              </div>
              <div className={styles.pathwayBody}>
                <div className={styles.meta}><span><span className={styles.dot}></span>Holiday</span><span>2-week intensive</span></div>
                <h3>Creator Camps</h3>
                <p>Two-week intensive camps where learners ship a finished project with a guest creator.</p>
                <span className={styles.pathwayCta}>Browse upcoming camps <span>→</span></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.why} data-screen-label="05 Why now">
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className={styles.eyebrow}>05 / Why KiddyKode, why now</span>
            </div>
            <div></div>
          </div>
          <div className={styles.whyGrid}>
            <div>
              <h2>Africa's children are the largest generation of digital natives the world has ever seen — and they are still being trained as users.</h2>
            </div>
            <div className={styles.whyBody}>
              <p>By 2030, more than 60% of the continent's population will be under 25. They will grow up shaping markets, governments, and culture with software they did not write, in languages they did not author, against assumptions made elsewhere.</p>
              <p>KiddyKode exists to invert that trajectory. We teach the youngest cohort — primary through early secondary — to move from consumption to authorship: from playing the app to making it, from reading the story to writing one in code, from using the tool to designing a better one for their context.</p>
            </div>
          </div>
          <div className={styles.pullquote}>
            <div>
              <div className={styles.quote}>When a child builds her first program, the country gains a citizen who knows the world is editable.</div>
              <div className={styles.attribution}>— Adaeze Okonkwo, KiddyKode Co-founder & Curriculum Director</div>
            </div>
            <div></div>
          </div>
          <div className={styles.whyThemes}>
            <div className={styles.theme}>
              <span className={styles.marker}>// 01</span>
              <h4>Digital Sovereignty</h4>
              <p>We cannot build resilient African economies on imported software alone. The next generation of civic and commercial infrastructure must be built locally, by people who understand the nuance of the problems.</p>
            </div>
            <div className={styles.theme}>
              <span className={styles.marker}>// 02</span>
              <h4>Cultural Continuity</h4>
              <p>Code is a storytelling medium. When children learn to code using Anansi stories, local proverbs, and familiar geography, technology ceases to be "foreign" and becomes a natural extension of their own culture.</p>
            </div>
            <div className={styles.theme}>
              <span className={styles.marker}>// 03</span>
              <h4>Systemic Thinking</h4>
              <p>Learning to code is learning to break large, complex problems into small, solvable parts. It is a framework for critical thinking that applies long after the child steps away from the keyboard.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.stories} id="stories" data-screen-label="06 Stories">
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className="eyebrow">06 / Stories</span>
              <h2 className="mt-[18px]">Dispatches from the work.</h2>
            </div>
            <div>
              <p className="lede">Stories, field notes, and interviews from the classrooms, demo nights, and homes of the children, teachers, and partners building this movement.</p>
            </div>
          </div>
          <div className={styles.storiesGrid}>
            <div className={styles.storyFeature}>
              <div className={styles.img}>
                <ImagePlaceholder tone="clay" photoUrl="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80" caption="Replace ▸ Zola at the Cape Town demo night" />
              </div>
              <div>
                <div className={styles.meta}><span className={styles.tag}>Student story</span><span>Cape Town</span></div>
                <h3>Zola, age 11, built an app that maps her grandmother's herbal medicine knowledge.</h3>
                <p>"I wanted Gogo's plants to be somewhere even after she isn't here." What began as a six-week Creator Camp turned into a year-long archive project — now in trial use at two community clinics in the Western Cape.</p>
                <div className={styles.byline}>By Thandi Mbeki · 6 min read</div>
              </div>
            </div>
            <div className={styles.storySecondary}>
              <div className={styles.storySmall}>
                <div className={styles.thumb}>
                  <ImagePlaceholder tone="sage" photoUrl="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=400&q=80" />
                </div>
                <div>
                  <div className={styles.meta}>School story · Lagos</div>
                  <h4>Iyeru Okin Primary doubled enrolment after Year 1.</h4>
                  <p>How a Lagos primary school turned an after-school club into a flagship STEAM strategy.</p>
                </div>
              </div>
              <div className={styles.storySmall}>
                <div className={styles.thumb}>
                  <ImagePlaceholder tone="cool" photoUrl="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=400&q=80" />
                </div>
                <div>
                  <div className={styles.meta}>Parent · Nairobi</div>
                  <h4>"He shows me his code now, the way he used to show me drawings."</h4>
                  <p>A father in Nairobi on what changes at home when a child becomes a maker.</p>
                </div>
              </div>
              <div className={styles.storyQuote}>
                <div className={styles.q}>My students stopped asking me when class ends. That is the only review you need.</div>
                <div className={styles.who}>Esther Adekunle · Teacher, Ibadan partner school</div>
              </div>
              <Link className="btn btn--link" href="/stories" style={{alignSelf:"flex-start",marginTop:"8px"}}>Read all dispatches <span className="arrow">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.chapters} id="chapters" data-screen-label="07 Chapters">
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className="eyebrow">07 / Chapters</span>
              <h2 className="mt-[18px]">A decentralized, continental network.</h2>
            </div>
            <div>
              <p className="lede">KiddyKode operates through regional chapters. We provide the curriculum, the platform, and the pedagogical training; local chapter leads manage the school partnerships, mentor networks, and demo nights.</p>
            </div>
          </div>
          <div className={styles.chaptersGrid}>
            <div className={styles.map}>
              <div className={styles.mapFrame}></div>
              <div className={styles.mapLabel}>Network Map</div>
              <div className={`${styles.marker} ${styles.live}`} style={{top:"45%",left:"35%"}}>
                <div className={styles.pin}></div>
                <div className={styles.pinLabel}>Lagos</div>
              </div>
              <div className={`${styles.marker} ${styles.live}`} style={{top:"55%",left:"65%"}}>
                <div className={styles.pin}></div>
                <div className={styles.pinLabel}>Nairobi</div>
              </div>
              <div className={`${styles.marker} ${styles.live}`} style={{top:"85%",left:"45%"}}>
                <div className={styles.pin}></div>
                <div className={styles.pinLabel}>Cape Town</div>
              </div>
              <div className={`${styles.marker} ${styles.planned}`} style={{top:"30%",left:"50%"}}>
                <div className={styles.pin}></div>
              </div>
            </div>
            <div>
              <div className={styles.chaptersList}>
                <div className={styles.chapterRow}>
                  <div className={styles.idx}>01</div>
                  <div><div className={styles.city}>Lagos</div><div className={styles.country}>Nigeria</div></div>
                  <div>HQ / West Africa Hub</div>
                  <div className={`${styles.status} ${styles.live}`}>Live</div>
                </div>
                <div className={styles.chapterRow}>
                  <div className={styles.idx}>02</div>
                  <div><div className={styles.city}>Nairobi</div><div className={styles.country}>Kenya</div></div>
                  <div>East Africa Hub</div>
                  <div className={`${styles.status} ${styles.live}`}>Live</div>
                </div>
                <div className={styles.chapterRow}>
                  <div className={styles.idx}>03</div>
                  <div><div className={styles.city}>Cape Town</div><div className={styles.country}>South Africa</div></div>
                  <div>Southern Hub</div>
                  <div className={`${styles.status} ${styles.live}`}>Live</div>
                </div>
                <div className={styles.chapterRow}>
                  <div className={styles.idx}>04</div>
                  <div><div className={styles.city}>Accra</div><div className={styles.country}>Ghana</div></div>
                  <div>Chapter</div>
                  <div className={`${styles.status} ${styles.live}`}>Live</div>
                </div>
                <div className={styles.chapterRow}>
                  <div className={styles.idx}>05</div>
                  <div><div className={styles.city}>Cairo</div><div className={styles.country}>Egypt</div></div>
                  <div>Chapter</div>
                  <div className={`${styles.status} ${styles.planned}`}>Planned Q3</div>
                </div>
              </div>
              <div className={styles.chaptersCta}>
                <span className={styles.mono}>Showing 5 of 12 chapters</span>
                <Link href="/contact" className="btn btn--link">Apply to open a chapter <span className="arrow">→</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.partners} id="partner" data-screen-label="08 Partners">
        <div className="wrap">
          <div className={styles.partnersHead}>
            <div>
              <span className="eyebrow">08 / Partners</span>
              <h2 className="mt-[18px]">Funded by organizations investing in the next generation.</h2>
            </div>
            <div>
              <p className="lede">Our cross-subsidy model relies on philanthropic grants, corporate CSR, and foundation partners to keep the curriculum free for public schools.</p>
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
            <p>We are currently taking on new corporate and foundation partners for the 2026/2027 school year, particularly those interested in sponsoring specific city chapters or providing hardware grants. <Link href="/partners" className="btn btn--link" style={{display:"inline-block",marginLeft:"8px"}}>Read our partnership guidelines →</Link></p>
          </div>
        </div>
      </section>

      <section className={styles.studio} id="studio" data-screen-label="09 Studio">
        <div className="wrap">
          <div className="section-head">
            <div className="heading">
              <span className="eyebrow">09 / The Platform</span>
            </div>
            <div></div>
          </div>
          <div className={styles.studioGrid}>
            <div className={styles.studioCopy}>
              <h2>KiddyKode Studio</h2>
              <p>The curriculum comes to life in Studio — our custom, browser-based coding environment designed specifically for primary and secondary learners. No installations, no complex local environments. Just open the browser and build.</p>
              <div className={styles.studioFeatures}>
                <div className={styles.studioFeature}>
                  <div className={styles.n}>01</div>
                  <div>
                    <h4>Progressive Complexity</h4>
                    <p>Learners start in a block-based visual editor. When they're ready, they toggle to the exact same logic represented in Python or JavaScript.</p>
                  </div>
                </div>
                <div className={styles.studioFeature}>
                  <div className={styles.n}>02</div>
                  <div>
                    <h4>Offline Resilience</h4>
                    <p>Designed for intermittent connectivity. Studio caches locally; if the school internet drops, the child keeps coding and syncs later.</p>
                  </div>
                </div>
                <div className={styles.studioFeature}>
                  <div className={styles.n}>03</div>
                  <div>
                    <h4>Peer Review Built-in</h4>
                    <p>Students can securely share project links with their cohort to request code reviews or playtest each other's games.</p>
                  </div>
                </div>
              </div>
              <Link href="/programs" className="btn btn--ghost">Learn more about the curriculum <span className="arrow">→</span></Link>
            </div>
            <div className={styles.browser}>
              <div className={styles.browserChrome}>
                <div className={styles.browserDots}><span></span><span></span><span></span></div>
                <div className={styles.browserUrl}>studio.kiddykode.org<span>/projects/zola/medicine-map</span></div>
                <div></div>
              </div>
              <div className={styles.browserBody}>
                <div className={styles.studioSide}>
                  <div className={styles.group}>
                    <div className={styles.groupLabel}>Project Files</div>
                    <div className={`${styles.item} ${styles.active}`}>app.js</div>
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
                    <span className={styles.ln}>1</span><span className={styles.com}>// Medicine Map Logic</span><br/>
                    <span className={styles.ln}>2</span><span className={styles.kw}>const</span> herbs = [<br/>
                    <span className={styles.ln}>3</span>  &#123; <span className={styles.kw}>name</span>: <span className={styles.str}>'Umhlonyane'</span>, <span className={styles.kw}>use</span>: <span className={styles.str}>'Cold'</span> &#125;,<br/>
                    <span className={styles.ln}>4</span>  &#123; <span className={styles.kw}>name</span>: <span className={styles.str}>'Imphepho'</span>, <span className={styles.kw}>use</span>: <span className={styles.str}>'Calm'</span> &#125;<br/>
                    <span className={styles.ln}>5</span>];<br/>
                    <span className={styles.ln}>6</span><br/>
                    <span className={styles.ln}>7</span><span className={styles.kw}>function</span> <span className={styles.fn}>findHerb</span>(symptom) &#123;<br/>
                    <span className={styles.ln}>8</span>  <span className={styles.kw}>return</span> herbs.<span className={styles.fn}>filter</span>(h =&gt; h.use === symptom);<br/>
                    <span className={styles.ln}>9</span>&#125;<br/>
                    <span className={styles.ln}>10</span><br/>
                    <span className={styles.ln}>11</span><span className={styles.fn}>playAudio</span>(<span className={styles.str}>'gogo_audio.mp3'</span>);
                  </pre>
                </div>
                <div className={styles.studioPreview}>
                  <div className={styles.previewLabel}><span>Preview</span><span className={styles.dot}>● Live</span></div>
                  <div className={styles.previewStage}>
                    <div className={styles.previewConfetti}>
                      <span></span><span></span><span></span><span></span><span></span><span></span>
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
              <p>We provide the curriculum, the platform, and the teacher training.</p>
              <Link href="/contact" className="btn btn--primary">Partner your school</Link>
            </div>
            <div className={styles.finalPath}>
              <span className={styles.pn}>02 / Parents</span>
              <h3>Enroll your child</h3>
              <p>Find a community club or join the waitlist for the next Creator Camp.</p>
              <Link href="/programs" className="btn btn--ghost">Find a program</Link>
            </div>
            <div className={styles.finalPath}>
              <span className={styles.pn}>03 / Partners</span>
              <h3>Fund a chapter</h3>
              <p>Sponsor a public school deployment or help us open a new city hub.</p>
              <Link href="/partners" className="btn btn--ghost">Partner with us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
