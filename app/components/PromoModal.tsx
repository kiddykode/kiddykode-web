"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { UPCOMING_COHORT } from '@/lib/cohort-config';
import { NewsletterForm } from './NewsletterForm';
import { Link } from '@/i18n/navigation';
import styles from './PromoModal.module.css';

/**
 * PromoModal displays a marketing message (Flyer or Newsletter)
 * 2 minutes after the user enters the site.
 */
export function PromoModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // 1. Check if already dismissed in this session
    // We use sessionStorage so it only pops up once per browser session
    const isDismissed = sessionStorage.getItem('kiddykode-promo-dismissed');
    if (isDismissed) return;

    // 2. Set timer for 2 minutes (120,000ms)
    const timer = setTimeout(() => {
      setShouldRender(true);
      // Small delay to trigger CSS transition
      setTimeout(() => setIsVisible(true), 100);
    }, 120000); 

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('kiddykode-promo-dismissed', 'true');
    // Remove from DOM after transition finishes
    setTimeout(() => setShouldRender(false), 600);
  };

  if (!shouldRender) return null;

  return (
    <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={handleClose} aria-label="Close modal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {UPCOMING_COHORT.active ? (
          <>
            <div className={styles.image}>
              <Image 
                src={UPCOMING_COHORT.image} 
                alt={UPCOMING_COHORT.title}
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div className={styles.content}>
              <span className={styles.eyebrow}>Upcoming Cohort</span>
              <h3 className={styles.title}>{UPCOMING_COHORT.title}</h3>
              <p className={styles.description}>{UPCOMING_COHORT.description}</p>
              <Link href={UPCOMING_COHORT.href} className={`btn btn--primary ${styles.cta}`} onClick={handleClose}>
                Secure your child's spot <span className="arrow">→</span>
              </Link>
            </div>
          </>
        ) : (
          <div className={styles.content} style={{ paddingTop: 64 }}>
            <span className={styles.eyebrow}>Newsletter</span>
            <h3 className={styles.title}>Never miss a launch.</h3>
            <p className={styles.description}>
              Join our parent community to get notified about new cohorts, school programs, and early-bird discounts.
            </p>
            <NewsletterForm 
              source="promo-modal" 
              variant="inline"
              placeholder="your@email.com"
              buttonText="Join the list"
            />
          </div>
        )}
      </div>
    </div>
  );
}
