'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { lookupCertificateByNumber } from '@/app/actions/certificates';
import styles from './verify.module.css';

export default function VerifyIndexPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [certNumber, setCertNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'token' | 'number'>('token');

  function handleTokenSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = token.trim().toLowerCase();
    if (!cleaned) return;
    router.push(`/verify/${cleaned}`);
  }

  function handleNumberSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!certNumber.trim() || !lastName.trim()) return;

    startTransition(async () => {
      const result = await lookupCertificateByNumber(certNumber.trim(), lastName.trim());
      if (result.found) {
        router.push(`/verify/${result.token}`);
      } else {
        setError('No certificate found with that number and last name. Please check your details.');
      }
    });
  }

  return (
    <main className={styles.page}>
      {/* Brand header */}
      <header className={styles.header}>
        <a href="https://kiddykode.com" className={styles.logoLink} aria-label="KiddyKode home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kiddykode-logo.png" alt="KiddyKode" className={styles.logo} />
        </a>
        <span className={styles.portalLabel}>Certificate Verification</span>
      </header>

      {/* Card */}
      <section className={styles.cardWrap}>
        <div className={styles.card}>
          <div className={styles.cardIcon} aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="#E9DBC7" />
              <path d="M20 10L22.9 16.9L30.5 17.6L25 22.5L26.6 30L20 26.3L13.4 30L15 22.5L9.5 17.6L17.1 16.9L20 10Z" fill="#A66A2C" />
            </svg>
          </div>
          <h1 className={styles.title}>Verify a Certificate</h1>
          <p className={styles.subtitle}>
            Confirm the authenticity of any KiddyKode certificate using the QR code, verification
            link, or certificate number.
          </p>

          {/* Tabs */}
          <div className={styles.tabs} role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'token'}
              className={`${styles.tab} ${activeTab === 'token' ? styles.tabActive : ''}`}
              onClick={() => { setActiveTab('token'); setError(''); }}
            >
              Verification Link / QR
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'number'}
              className={`${styles.tab} ${activeTab === 'number' ? styles.tabActive : ''}`}
              onClick={() => { setActiveTab('number'); setError(''); }}
            >
              Certificate Number
            </button>
          </div>

          {/* Tab: Token */}
          {activeTab === 'token' && (
            <form onSubmit={handleTokenSubmit} className={styles.form} noValidate>
              <label htmlFor="verify-token" className={styles.label}>
                Paste the verification link or scan code ID
              </label>
              <div className={styles.inputRow}>
                <input
                  id="verify-token"
                  type="text"
                  className={styles.input}
                  placeholder="e.g. kk-8f2k9xq7m1b3a0c4d5e"
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={!token.trim() || isPending}
                >
                  Verify
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          )}

          {/* Tab: Certificate Number */}
          {activeTab === 'number' && (
            <form onSubmit={handleNumberSubmit} className={styles.form} noValidate>
              <div className={styles.fieldGroup}>
                <div>
                  <label htmlFor="cert-number" className={styles.label}>Certificate number</label>
                  <input
                    id="cert-number"
                    type="text"
                    className={styles.input}
                    placeholder="e.g. KK-2026-000001"
                    value={certNumber}
                    onChange={e => setCertNumber(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className={styles.label}>Recipient last name</label>
                  <input
                    id="last-name"
                    type="text"
                    className={styles.input}
                    placeholder="e.g. Okonkwo"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>
              </div>
              {error && (
                <p className={styles.errorMsg} role="alert">{error}</p>
              )}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!certNumber.trim() || !lastName.trim() || isPending}
              >
                {isPending ? 'Looking up…' : 'Look up Certificate'}
                {!isPending && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </form>
          )}

          <p className={styles.hint}>
            Certificates are issued by{' '}
            <a href="https://kiddykode.com" className={styles.hintLink}>KiddyKode</a>
            {' '}and verified against our official records.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} KiddyKode</span>
        <a href="https://kiddykode.com/contact">Contact us</a>
      </footer>
    </main>
  );
}
