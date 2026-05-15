'use client'

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from "next/image";
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[var(--color-ink-900)] text-[rgba(247,243,236,0.78)] py-20 border-t border-[rgba(247,243,236,0.12)]" data-screen-label="Footer">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr] gap-10">
          <div className="footer-brand">
            <Link href="/" className="logo flex-shrink-0 transition-transform duration-200 hover:scale-105" aria-label="KiddyKode home">
              <Image className="logo-img" src="/kiddykode-logo.png" alt="KiddyKode" width={48} height={48} />
            </Link>
            <p className="text-sm leading-relaxed text-[rgba(247,243,236,0.62)] max-w-[32ch] mt-4">
              {t('brandStatement')}
            </p>
          </div>
          
          <div className="footer-col">
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(247,243,236,0.5)] m-0 mb-5 font-medium">{t('colFormats')}</h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-sm">
              <li><Link href="/programs">{t('allFormats')}</Link></li>
              <li><Link href="/programs/portfolio">{t('learnerPortfolio')}</Link></li>
              <li><Link href="/programs/next-cohort">{t('nextCohort')}</Link></li>
              <li><Link href="/#studio">{t('kiddykodeStudio')}</Link></li>
              <li><Link href="/programs">{t('schoolClubs')}</Link></li>
              <li><Link href="/programs">{t('holidayBootcamps')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(247,243,236,0.5)] m-0 mb-5 font-medium">{t('colAbout')}</h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-sm">
              <li><Link href="/about">{t('about')}</Link></li>
              <li><Link href="/about#approach">{t('ourApproach')}</Link></li>
              <li><Link href="/#impact">{t('earlyEvidence')}</Link></li>
              <li><Link href="/#chapters">{t('chapters')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(247,243,236,0.5)] m-0 mb-5 font-medium">{t('colGetInvolved')}</h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-sm">
              <li><Link href="/contact">{t('contactLink')}</Link></li>
              <li><Link href="/partners">{t('partnerWithUs')}</Link></li>
              <li><Link href="/partners">{t('supportMission')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h5 className="font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(247,243,236,0.5)] m-0 mb-5 font-medium">{t('colNewsletter')}</h5>
            <p className="text-sm text-[rgba(247,243,236,0.62)] m-0">{t('newsletterDesc')}</p>
            <NewsletterForm
              source="footer"
              placeholder={t('emailPlaceholder')}
              buttonText={t('join')}
              variant="footer"
            />
          </div>
        </div>
        
        <div className="footer-base mt-16 pt-6 border-t border-[rgba(247,243,236,0.12)] flex justify-between items-center flex-wrap gap-4 text-xs text-[rgba(247,243,236,0.5)] font-mono tracking-[0.04em]">
          <span>{t('copyright')}</span>
          <nav className="flex gap-5">
            <Link href="/privacy">{t('privacy')}</Link>
            <Link href="/terms">{t('terms')}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
