import { Metadata } from "next";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import HeroCarousel from "../components/HeroCarousel";
import styles from "./home.module.css";
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'HomePage' });

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
              <span className="eyebrow">{t("mission.eyebrow")}</span>
            </div>
            <div></div>
          </div>
          <div className={styles.missionGrid}>
            <div className={styles.missionStatement}>
              {t("mission.statement")}
            </div>
            <div className={styles.missionBody}>
              <p>{t("mission.body")}</p>
            </div>
          </div>
          <div className={styles.principles}>
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.principle}>
                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4>{t(`mission.principles.${i}.title`)}</h4>
                <p>{t(`mission.principles.${i}.body`)}</p>
              </div>
            ))}
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
              <span className="eyebrow">{t("impact.eyebrow")}</span>
              <h2 className="mt-[18px]">{t("impact.title")}</h2>
            </div>
            <div>
              <p className="lede">{t("impact.lede")}</p>
            </div>
          </div>
          <div className={styles.impactGrid}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={styles.impactCell}>
                <div className={styles.label}>
                  {t(`impact.cells.${i}.label`)}
                </div>
                {t.has(`impact.cells.${i}.num`) && (
                  <div className={styles.num}>{t(`impact.cells.${i}.num`)}</div>
                )}
                <div className={styles.desc}>{t(`impact.cells.${i}.desc`)}</div>
              </div>
            ))}
          </div>
          <div className={styles.impactFootnote}>
            <span className="mono">{t("impact.source")}</span>
            <Link href="#" className="btn btn--link">
              {t("impact.reportLink")}
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
              <span className="eyebrow">{t("pathways.eyebrow")}</span>
              <h2 className="mt-[18px]">{t("pathways.title")}</h2>
            </div>
            <div>
              <p className="lede">{t("pathways.lede")}</p>
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
                  photoUrl="https://res.cloudinary.com/dsbm73ojs/image/upload/v1778847213/kiddykode_at_partner_school_lz8nrt.png?auto=format&fit=crop&w=1200&q=80"
                  // caption="Replace ▸ Classroom — students at a partner school working at shared devices"
                />
              </div>
              <div className={styles.pathwayBody}>
                <div className={styles.meta}>
                  <span>
                    <span className={styles.dot}></span>
                    {t("pathways.featured")}
                  </span>
                  <span>Ages 8 – 17</span>
                  <span>In-school</span>
                </div>
                <h3>{t("pathways.schoolClubs.title")}</h3>
                <p>{t("pathways.schoolClubs.body")}</p>
                <span className={styles.pathwayCta}>
                  {t("pathways.schoolClubs.cta")} <span>→</span>
                </span>
              </div>
            </Link>

            <Link className={styles.pathway} href="/programs">
              <div className={styles.pathwayImage}>
                <ImagePlaceholder
                  tone="sage"
                  photoUrl="https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774726/ChatGPT_Image_May_14_2026_09_08_46_PM_dgfdz9.png"
                  // caption="Replace ▸ Community club night, mentor + peers"
                />
              </div>
              <div className={styles.pathwayBody}>
                <div className={styles.meta}>
                  <span>
                    <span className={styles.dot}></span>Live Online
                  </span>
                  <span>Ages 8–17</span>
                </div>
                <h3>{t("pathways.live.title")}</h3>
                <p>{t("pathways.live.body")}</p>
                <span className={styles.pathwayCta}>
                  {t("pathways.live.cta")} <span>→</span>
                </span>
              </div>
            </Link>

            <Link className={styles.pathway} href="/programs">
              <div className={styles.pathwayImage}>
                <ImagePlaceholder
                  tone="cool"
                  photoUrl="https://res.cloudinary.com/dsbm73ojs/image/upload/v1779197414/kiddykode_studio_ml3y6q.png"
                  // caption="Replace ▸ Community club night, mentor + peers"
                />
              </div>
              <div className={styles.pathwayBody}>
                <div className={styles.meta}>
                  <span>
                    <span className={styles.dot}></span>SELF-PACED Online
                  </span>
                  <span>Ages 8–17</span>
                </div>
                <h3>{t("pathways.studio.title")}</h3>
                <p>{t("pathways.studio.body")}</p>
                <span className={styles.pathwayCta}>
                  {t("pathways.studio.cta")} <span>→</span>
                </span>
              </div>
            </Link>

            <Link className={styles.pathway} href="/programs">
              <div className={styles.pathwayImage}>
                <ImagePlaceholder
                  tone="clay"
                  photoUrl="https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774727/ChatGPT_Image_May_14_2026_09_17_40_PM_ma3741.png"
                  // caption="Replace ▸ Holiday creator camp"
                />
              </div>
              <div className={styles.pathwayBody}>
                <div className={styles.meta}>
                  <span>
                    <span className={styles.dot}></span>Holiday
                  </span>
                  <span>4-week intensive</span>
                </div>
                <h3>{t("pathways.bootcamps.title")}</h3>
                <p>{t("pathways.bootcamps.body")}</p>
                <span className={styles.pathwayCta}>
                  {t("pathways.bootcamps.cta")} <span>→</span>
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
              <span className={styles.eyebrow}>{t("why.eyebrow")}</span>
            </div>
            <div></div>
          </div>
          <div className={styles.whyGrid}>
            <div>
              <h2>{t("why.headline")}</h2>
            </div>
            <div className={styles.whyBody}>
              <p>{t("why.body")}</p>
            </div>
          </div>
          <div className={styles.pullquote}>
            <div>
              <div className={styles.quote}>{t("why.quote")}</div>
              <div className={styles.attribution}>{t("why.attribution")}</div>
            </div>
            <div></div>
          </div>
          <div className={styles.whyThemes}>
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.theme}>
                <span className={styles.marker}>
                  // {String(i + 1).padStart(2, "0")}
                </span>
                <h4>{t(`why.themes.${i}.title`)}</h4>
                <p>{t(`why.themes.${i}.body`)}</p>
              </div>
            ))}
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
              <span className="eyebrow">{t("stories.eyebrow")}</span>
              <h2 className="mt-[18px]">{t("stories.title")}</h2>
            </div>
            <div>
              <p className="lede">{t("stories.lede")}</p>
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
                {t("stories.readAll")} <span className="arrow">→</span>
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
              <span className="eyebrow">{t("chapters.eyebrow")}</span>
              <h2 className="mt-[18px]">{t("chapters.title")}</h2>
            </div>
            <div>
              <p className={styles.missionBody}>{t("chapters.body")}</p>
            </div>
          </div>
          <div className={styles.principles4}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={styles.principle}>
                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4>{t(`chapters.principles.${i}.title`)}</h4>
                <p>{t(`chapters.principles.${i}.body`)}</p>
              </div>
            ))}
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
              <span className="eyebrow">{t("partners.eyebrow")}</span>
              <h2 className="mt-[18px]">{t("partners.title")}</h2>
            </div>
            <div>
              <p className="lede">{t("partners.lede")}</p>
            </div>
          </div>
          <div className={styles.partnersGrid}>
            <div className={styles.partner}>
              <div className={styles.name}>Atlas Ventures</div>
              <div className={styles.kind}>Strategic Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>MTN Foundation</div>
              <div className={styles.kind}>Infrastructure Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Lagos State MoE</div>
              <div className={styles.kind}>School or Government Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Google.org</div>
              <div className={styles.kind}>Institutional Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Safaricom</div>
              <div className={styles.kind}>Access Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>ALX Africa</div>
              <div className={styles.kind}>Talent Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Western Cape Gov</div>
              <div className={styles.kind}>School or Government Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Mastercard Fdn</div>
              <div className={styles.kind}>Ecosystem Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>Paystack</div>
              <div className={styles.kind}>Technology Partner</div>
            </div>
            <div className={styles.partner}>
              <div className={styles.name}>UNICEF Innovation</div>
              <div className={styles.kind}>Institutional Partner</div>
            </div>
          </div>
          <div className={styles.partnersNote}>
            <span className={styles.label}>{t("partners.partnerCta")}</span>
            <p>
              {t("partners.partnerNote")}{" "}
              <Link
                href="/partners"
                className="btn btn--link"
                style={{ display: "inline-block", marginLeft: "8px" }}
              >
                {t("partners.partnerLink")}
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
              <span className="eyebrow">{t("studioSection.eyebrow")}</span>
            </div>
            <div></div>
          </div>
          <div className={styles.studioGrid}>
            <div className={styles.studioCopy}>
              <h2>{t("studioSection.title")}</h2>
              <p>{t("studioSection.body")}</p>
              <div className={styles.studioFeatures}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className={styles.studioFeature}>
                    <div className={styles.n}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h4>{t(`studioSection.features.${i}.title`)}</h4>
                      <p>{t(`studioSection.features.${i}.body`)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/programs" className="btn btn--ghost">
                {t("studioSection.cta")}
                <span className="arrow">→</span>
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
                    <span className={styles.com}>
                      {"// Medicine Map Logic"}
                    </span>
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
          <span className={styles.eyebrow}>{t("final.eyebrow")}</span>
          <h2>{t("final.title")}</h2>
          <div className={styles.finalPaths}>
            <div className={styles.finalPath}>
              <span className={styles.pn}>{t("final.schools.label")}</span>
              <h3>{t("final.schools.title")}</h3>
              <p>{t("final.schools.body")}</p>
              <Link href="/contact" className="btn btn--primary">
                {t("final.schools.cta")}
              </Link>
            </div>
            <div className={styles.finalPath}>
              <span className={styles.pn}>{t("final.parents.label")}</span>
              <h3>{t("final.parents.title")}</h3>
              <p>{t("final.parents.body")}</p>
              <Link href="/programs" className="btn btn--ghost">
                {t("final.parents.cta")}
              </Link>
            </div>
            <div className={styles.finalPath}>
              <span className={styles.pn}>{t("final.partnersPath.label")}</span>
              <h3>{t("final.partnersPath.title")}</h3>
              <p>{t("final.partnersPath.body")}</p>
              <Link href="/partners" className="btn btn--ghost">
                {t("final.partnersPath.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
