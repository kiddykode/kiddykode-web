"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import styles from "../home.module.css";

const heroSlides = [
  {
    id: "slide-1",
    eyebrow: "Coding education for Africa’s next generation of creators",
    title: (
      <>
        We are building Africa’s next generation of{" "}
        <em>problem solvers and creators</em> — through code.
      </>
    ),
    description:
      "KiddyKode is a continental learning movement. We help children become creators by pairing rigorous coding education with cultural storytelling, project-based learning, and school partnerships across the continent.",
    primaryCtaLabel: "Join a Program",
    primaryCtaHref: "/programs",
    secondaryCtaLabel: "Partner With Us",
    secondaryCtaHref: "/partner",
    meta: "Active in nine cities across Africa",
    imageSrc:
      "https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774727/ChatGPT_Image_May_14_2026_08_13_08_PM_kdo9lh.png",
    imageAlt: "A learner presenting a built project",
  },
  {
    id: "slide-2",
    eyebrow: "For parents raising builders",
    title: (
      <>
        Turn curiosity into code, <em>confidence, and creativity.</em>
      </>
    ),
    description:
      "KiddyKode helps children move from passive screen time into active making through guided coding, storytelling, and project-based learning that builds real thinking skills.",
    primaryCtaLabel: "Find a Program",
    primaryCtaHref: "/programs",
    secondaryCtaLabel: "How It Works",
    secondaryCtaHref: "/#mission",
    meta: "Built for ages 8–16",
    imageSrc:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A child learning to code",
  },
  {
    id: "slide-3",
    eyebrow: "For schools and educators",
    title: (
      <>
        Bring structured <em>coding education</em> into your classroom.
      </>
    ),
    description:
      "We partner with schools to deliver practical, culturally grounded coding experiences that help learners build logic, creativity, communication, and confidence.",
    primaryCtaLabel: "Partner Your School",
    primaryCtaHref: "/partner",
    secondaryCtaLabel: "Explore Programs",
    secondaryCtaHref: "/programs",
    meta: "In-school, live online, and bootcamp formats",
    imageSrc:
      "https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774726/ChatGPT_Image_May_14_2026_09_08_46_PM_dgfdz9.png",
    imageAlt: "Students coding in a classroom",
  },
  {
    id: "slide-4",
    eyebrow: "Self-paced learning, guided growth",
    title: (
      <>
        Learn step by step. <em>Build project by project.</em>
      </>
    ),
    description:
      "KiddyKode Studio helps learners move from guided lessons into independent creation through a structured journey from Explorer to Builder to Creator.",
    primaryCtaLabel: "Start Exploring",
    primaryCtaHref: "/programs",
    secondaryCtaLabel: "See Studio",
    secondaryCtaHref: "/#studio",
    meta: "Explorer → Builder → Creator",
    imageSrc:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80",
    imageAlt: "KiddyKode Studio interface",
  },
  {
    id: "slide-5",
    eyebrow: "A movement for African creators",
    title: (
      <>
        Coding education rooted in <em>African stories, learners, and futures.</em>
      </>
    ),
    description:
      "We teach children to see technology not just as something to use, but as something they can shape, question, and build for their own communities.",
    primaryCtaLabel: "Read Our Story",
    primaryCtaHref: "/#stories",
    secondaryCtaLabel: "Partner With Us",
    secondaryCtaHref: "/partner",
    meta: "From consumers to creators",
    imageSrc:
      "https://res.cloudinary.com/dsbm73ojs/image/upload/v1778774727/ChatGPT_Image_May_14_2026_09_17_40_PM_ma3741.png",
    imageAlt: "A student presenting an app about African stories",
  },
];

const AUTOPLAY_INTERVAL = 5500;

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
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
          {heroSlides.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={slide.id}
                className={`${styles.heroSlide} ${isActive ? styles.heroSlideActive : ""}`}
                aria-hidden={!isActive}
              >
                <div className={styles.heroGrid}>
                  <div className={styles.heroCopy}>
                    <span className="eyebrow">{slide.eyebrow}</span>
                    <h1>{slide.title}</h1>
                    <p className="lede mt-[26px]">{slide.description}</p>
                    <div className={styles.heroCta}>
                      <Link
                        className="btn btn--primary"
                        href={slide.primaryCtaHref}
                        tabIndex={isActive ? 0 : -1}
                      >
                        {slide.primaryCtaLabel} <span className="arrow">→</span>
                      </Link>
                      <Link
                        className="btn btn--ghost"
                        href={slide.secondaryCtaHref}
                        tabIndex={isActive ? 0 : -1}
                      >
                        {slide.secondaryCtaLabel}
                      </Link>
                    </div>
                    <div className={styles.heroMeta}>
                      <span className="mono">— {slide.meta}</span>
                    </div>
                  </div>
                  <figure className={styles.heroMedia}>
                    <div className={styles.heroMediaInner}>
                      <img
                        src={slide.imageSrc}
                        alt={slide.imageAlt}
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
            {heroSlides.map((_, index) => (
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
            <button
              className={styles.heroArrow}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              className={styles.heroArrow}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
