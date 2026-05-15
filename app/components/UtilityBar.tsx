'use client'

import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';

export function UtilityBar() {
  const t = useTranslations('UtilityBar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: 'en' | 'fr') {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="utility hidden sm:block border-b border-white/5">
      <div className="wrap flex items-center justify-between h-10 gap-6">
        <nav className="flex gap-8 text-[rgba(247,243,236,0.65)] font-medium tracking-tight">
          <Link href="/programs" className="hover:text-white transition-colors duration-200">{t('applyJoin')}</Link>
          <Link href="/#partner" className="hover:text-white transition-colors duration-200">{t('becomePartner')}</Link>
          <Link href="/#support" className="hover:text-white transition-colors duration-200">{t('supportMission')}</Link>
          <Link href="/contact" className="hover:text-white transition-colors duration-200">{t('contact')}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <span className="lang inline-flex items-center gap-2 text-[rgba(247,243,236,0.65)] text-xs font-mono tracking-widest uppercase before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-[var(--color-accent)]">
            <button
              onClick={() => switchLocale('en')}
              className={`transition-colors duration-200 cursor-pointer hover:text-white ${locale === 'en' ? 'text-white font-bold' : ''}`}
            >
              EN
            </button>
            <span className="text-[rgba(247,243,236,0.3)]">·</span>
            <button
              onClick={() => switchLocale('fr')}
              className={`transition-colors duration-200 cursor-pointer hover:text-white ${locale === 'fr' ? 'text-white font-bold' : ''}`}
            >
              FR
            </button>
            <span className="text-[rgba(247,243,236,0.3)]">·</span>
            <span className="text-[rgba(247,243,236,0.25)] cursor-default" title="Swahili — Coming soon">SW</span>
            <span className="text-[rgba(247,243,236,0.3)]">·</span>
            <span className="text-[rgba(247,243,236,0.25)] cursor-default" title="Arabic — Coming soon">AR</span>
          </span>
        </div>
      </div>
    </div>
  );
}
