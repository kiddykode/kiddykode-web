"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from "../[locale]/home.module.css";

const slideImages = [
  { src: "https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774727/ChatGPT_Image_May_14_2026_08_13_08_PM_kdo9lh.png", alt: "A learner presenting a built project" },
  { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80", alt: "A child learning to code" },
  { src: "https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774726/ChatGPT_Image_May_14_2026_09_08_46_PM_dgfdz9.png", alt: "Students coding in a classroom" },
  { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80", alt: "KiddyKode Studio interface" },
  { src: "https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774727/ChatGPT_Image_May_14_2026_09_17_40_PM_ma3741.png", alt: "A student presenting an app about African stories" },
];

const slidePrimaryCtas = ["/programs", "/programs", "/partner", "/programs", "/#stories"];
const slideSecondaryCtas = ["/partner", "/#mission", "/programs", "/#studio", "/partner"];

const AUTOPLAY_INTERVAL = 5500;

export default function HeroCarousel() {
  const t = useTranslations('HomePage.hero');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % 5);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + 5) % 5);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;
    const interval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevSlide();
    else if (e.key === "ArrowRight") nextSlide();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    touchStartX.current = null;
  };

  return (
    <section
      className={styles.heroCarouselSection}
      id="hero"
      data-screen-label="01 Hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Homepage hero carousel"
      tabIndex={0}
    >
      <div className="wrap">
        <div className={styles.heroTrack}>
          {[0, 1, 2, 3, 4].map((index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={index}
                className={`${styles.heroSlide} ${isActive ? styles.heroSlideActive : ""}`}
                aria-hidden={!isActive}
              >
                <div className={styles.heroGrid}>
                  <div className={styles.heroCopy}>
                    <span className="eyebrow">{t(`slides.${index}.eyebrow`)}</span>
                    <h1>
                      {t(`slides.${index}.title`).split(t(`slides.${index}.titleEm`))[0]}
                      <em>{t(`slides.${index}.titleEm`)}</em>
                      {t(`slides.${index}.title`).split(t(`slides.${index}.titleEm`))[1] || ''}
                    </h1>
                    <p className="lede mt-[26px]">{t(`slides.${index}.description`)}</p>
                    <div className={styles.heroCta}>
                      <Link
                        className="btn btn--primary"
                        href={slidePrimaryCtas[index]}
                        tabIndex={isActive ? 0 : -1}
                      >
                        {t(`slides.${index}.primaryCta`)} <span className="arrow">→</span>
                      </Link>
                      <Link
                        className="btn btn--ghost"
                        href={slideSecondaryCtas[index]}
                        tabIndex={isActive ? 0 : -1}
                      >
                        {t(`slides.${index}.secondaryCta`)}
                      </Link>
                    </div>
                    <div className={styles.heroMeta}>
                      <span className="mono">— {t(`slides.${index}.meta`)}</span>
                    </div>
                  </div>
                  <figure className={styles.heroMedia}>
                    <div className={styles.heroMediaInner}>
                      <img
                        src={slideImages[index].src}
                        alt={slideImages[index].alt}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  </figure>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.heroNav}>
          <div className={styles.heroDots} role="tablist" aria-label="Slides">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                className={`${styles.heroDot} ${index === activeSlide ? styles.heroDotActive : ""}`}
                role="tab"
                aria-selected={index === activeSlide}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
          <div className={styles.heroArrows}>
            <button className={styles.heroArrow} onClick={prevSlide} aria-label="Previous slide">←</button>
            <button className={styles.heroArrow} onClick={nextSlide} aria-label="Next slide">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
