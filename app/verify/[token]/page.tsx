import type { Metadata } from 'next';
import Link from 'next/link';
import { verifyCertificate } from '@/app/actions/certificates';
import { CertificateTemplate } from '@/app/components/CertificateTemplate';
import styles from '../verify.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kiddykode.com';

interface Props {
  params: Promise<{ token: string }>;
}

export const revalidate = 60; // ISR — refresh cached page every 60 s

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const result = await verifyCertificate(token);
  if (!result.found) {
    return {
      title: 'Certificate Not Found — KiddyKode',
      robots: { index: false, follow: false },
    };
  }
  const c = result.certificate;
  return {
    title: `${c.recipient_name} — ${c.course_title} | KiddyKode Verification`,
    description: `Verify the authenticity of a KiddyKode certificate issued to ${c.recipient_name} for completing ${c.course_title}.`,
    robots: { index: false, follow: false },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; icon: string; label: string }> = {
    valid:    { cls: styles.statusValid,    icon: '✓', label: 'Valid' },
    revoked:  { cls: styles.statusRevoked,  icon: '✕', label: 'Revoked' },
    replaced: { cls: styles.statusReplaced, icon: '↻', label: 'Replaced' },
    expired:  { cls: styles.statusExpired,  icon: '⏱', label: 'Expired' },
  };
  const { cls, icon, label } = map[status] ?? map.expired;
  return (
    <span className={`${styles.statusBadge} ${cls}`}>
      <span aria-hidden="true">{icon}</span> {label}
    </span>
  );
}

export default async function VerifyTokenPage({ params }: Props) {
  const { token } = await params;
  const result = await verifyCertificate(token);

  /* ─── Not found ─── */
  if (!result.found) {
    return (
      <main className={styles.page}>
        <Header />
        <section className={styles.cardWrap}>
          <div className={styles.notFoundCard}>
            <div className={styles.notFoundIcon} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 9V15M14 19H14.01M6 26H22C24.2 26 26 24.2 26 22V6C26 3.8 24.2 2 22 2H6C3.8 2 2 3.8 2 6V22C2 24.2 3.8 26 6 26Z" stroke="#A66A2C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className={styles.notFoundTitle}>Certificate Not Found</h1>
            <p className={styles.notFoundText}>
              We couldn&apos;t find a certificate matching that code. The link may be incorrect, or the
              certificate may have been revoked.
            </p>
            <Link href="/verify" className={styles.backLink}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M11 7H3M6 3L2 7L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Try manual lookup
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const c = result.certificate;
  const isValid = c.status === 'valid';

  const verifyUrl = `${BASE_URL}/verify/${token}`;
  const instructorName = typeof c.metadata === 'object' && c.metadata && 'instructor_name' in c.metadata
    ? String((c.metadata as Record<string, unknown>).instructor_name)
    : 'Dedoatus Buengsi';
  const directorName = typeof c.metadata === 'object' && c.metadata && 'director_name' in c.metadata
    ? String((c.metadata as Record<string, unknown>).director_name)
    : 'Chiella Harriet';
  const instructorSignatureUrl = typeof c.metadata === 'object' && c.metadata && 'instructor_signature_url' in c.metadata
    ? String((c.metadata as Record<string, unknown>).instructor_signature_url)
    : null;
  const directorSignatureUrl = typeof c.metadata === 'object' && c.metadata && 'director_signature_url' in c.metadata
    ? String((c.metadata as Record<string, unknown>).director_signature_url)
    : null;

  /* ─── Found ─── */
  return (
    <main className={styles.page}>
      <Header />
      <div className={styles.resultPageWrap}>
        <div className={styles.cardWrapColumn}>
        <div className={styles.resultCard}>

          <StatusBadge status={c.status} />

          <h1 className={styles.recipientName}>{c.recipient_name}</h1>
          <p className={styles.courseTitle}>
            {c.course_title}
            {c.cohort_name ? ` — ${c.cohort_name}` : ''}
          </p>

          <div className={styles.divider} aria-hidden="true" />

          <dl className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <dt><span className={styles.metaLabel}>Certificate ID</span></dt>
              <dd className={styles.metaValue} style={{ margin: 0 }}>
                {c.certificate_number ?? '—'}
              </dd>
            </div>

            <div className={styles.metaItem}>
              <dt><span className={styles.metaLabel}>Issued by</span></dt>
              <dd className={styles.metaValue} style={{ margin: 0 }}>KiddyKode</dd>
            </div>

            <div className={styles.metaItem}>
              <dt><span className={styles.metaLabel}>Issue date</span></dt>
              <dd className={styles.metaValue} style={{ margin: 0 }}>
                {formatDate(c.issued_at)}
              </dd>
            </div>

            {c.level && (
              <div className={styles.metaItem}>
                <dt><span className={styles.metaLabel}>Level</span></dt>
                <dd className={styles.metaValue} style={{ margin: 0 }}>{c.level}</dd>
              </div>
            )}

            {c.expires_at && (
              <div className={styles.metaItem}>
                <dt><span className={styles.metaLabel}>Valid until</span></dt>
                <dd
                  className={styles.metaValue}
                  style={{ margin: 0 }}
                >
                  {formatDate(c.expires_at)}
                </dd>
              </div>
            )}

            <div className={styles.metaItem}>
              <dt><span className={styles.metaLabel}>Verification token</span></dt>
              <dd
                className={styles.metaValueMuted}
                style={{ margin: 0, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}
              >
                {token}
              </dd>
            </div>
          </dl>

          {/* Revoke / replaced notice */}
          {(c.status === 'revoked' || c.status === 'replaced') && (
            <div className={styles.revokeNotice} role="alert">
              <p>
                {c.status === 'revoked' ? (
                  <>
                    This certificate was <strong>revoked</strong>
                    {c.revoked_at ? ` on ${formatDate(c.revoked_at)}` : ''}.
                    {c.revoke_reason ? ` Reason: ${c.revoke_reason}` : ''}
                  </>
                ) : (
                  <>This certificate has been <strong>replaced</strong> by a newer version.</>
                )}
              </p>
            </div>
          )}

          <div className={styles.divider} aria-hidden="true" />

          {/* Issuer strip */}
          <div className={styles.issuerStrip}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/kiddykode-logo.png" alt="KiddyKode" className={styles.issuerLogo} />
            <p className={styles.issuerText}>
              Issued and verified by <span className={styles.issuerName}>KiddyKode</span>.
              This record is maintained in our official database.
            </p>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {isValid && c.pdf_url && (
              <a
                href={c.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M7.5 1V10M7.5 10L4 7M7.5 10L11 7M2 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Certificate
              </a>
            )}
            <Link
              href="/verify"
              className={`${styles.actionBtn} ${styles.actionBtnGhost}`}
            >
              Verify another
            </Link>
            <a
              href="https://kiddykode.com/contact"
              className={`${styles.actionBtn} ${styles.actionBtnGhost}`}
            >
              Contact KiddyKode
            </a>
          </div>
        </div>
        </div>

        {/* ── Certificate template (valid only) ── */}
        {isValid && (
          <div className={styles.certSection}>
            <div className={styles.certSectionHead} aria-hidden="true">
              <span className={styles.certSectionTitle}>Your Certificate</span>
              <div className={styles.certSectionDivider} />
            </div>
            <CertificateTemplate
              recipientName={c.recipient_name}
              courseTitle={c.course_title}
              cohortName={c.cohort_name ?? undefined}
              issuedAt={c.issued_at}
              certificateNumber={c.certificate_number}
              verifyUrl={verifyUrl}
              instructorName={instructorName}
              directorName={directorName}
              instructorSignatureUrl={instructorSignatureUrl}
              directorSignatureUrl={directorSignatureUrl}
            />
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

/* ─── Shared sub-components ─── */

function Header() {
  return (
    <header className={styles.header}>
      <a href="https://kiddykode.com" className={styles.logoLink} aria-label="KiddyKode home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/kiddykode-logo.png" alt="KiddyKode" className={styles.logo} />
      </a>
      <span className={styles.portalLabel}>Certificate Verification</span>
    </header>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} KiddyKode</span>
      <a href="https://kiddykode.com/contact">Contact us</a>
    </footer>
  );
}
