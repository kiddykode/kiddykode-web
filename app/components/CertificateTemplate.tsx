'use client';

import { useEffect, useState } from 'react';
import styles from './CertificateTemplate.module.css';

/* ────────────────────────────────────────────────────────────
   Types
──────────────────────────────────────────────────────────── */
export interface CertificateTemplateProps {
  recipientName: string;
  /** e.g. "KiddyKode Explorer Program" */
  courseTitle?: string;
  cohortName?: string;
  /** ISO date string */
  issuedAt: string;
  certificateNumber?: string | null;
  /** base64 PNG data URI for the QR code */
  qrDataUri?: string | null;
  verifyUrl?: string;
  /** Override signatory names (defaults to Explorer Live facilitators) */
  instructorName?: string;
  directorName?: string;
}

/* ────────────────────────────────────────────────────────────
   Helpers
──────────────────────────────────────────────────────────── */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function buildAchievementText(courseTitle?: string): string {
  const prog = courseTitle ?? 'the KiddyKode Explorer Program';
  return `For successfully completing ${prog} and demonstrating creativity,
logical thinking, debugging skills, problem solving, and confidence in coding.`;
}

/* ────────────────────────────────────────────────────────────
   SVG Corner Ornament (matches the gold L-bracket style in the
   reference image — decorative Celtic/Art-Deco corner)
──────────────────────────────────────────────────────────── */
function CornerOrnament() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer L-bracket */}
      <path
        d="M4 4 L4 60 M4 4 L60 4"
        stroke="#8B7D3A"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      {/* Inner L-bracket (inset) */}
      <path
        d="M10 10 L10 44 M10 10 L44 10"
        stroke="#8B7D3A"
        strokeWidth="1.2"
        strokeLinecap="square"
        opacity="0.6"
      />
      {/* Decorative diamond at corner */}
      <rect x="2" y="2" width="5" height="5" fill="#8B7D3A" opacity="0.9" transform="rotate(45 4.5 4.5)" />
      {/* Small accent squares along arms */}
      <rect x="2.5" y="18" width="3" height="3" fill="#8B7D3A" opacity="0.55" />
      <rect x="2.5" y="30" width="3" height="3" fill="#8B7D3A" opacity="0.4" />
      <rect x="18" y="2.5" width="3" height="3" fill="#8B7D3A" opacity="0.55" />
      <rect x="30" y="2.5" width="3" height="3" fill="#8B7D3A" opacity="0.4" />
      {/* Inner corner dot */}
      <circle cx="10" cy="10" r="2" fill="#8B7D3A" opacity="0.5" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   SVG Signature scribbles — approximate handwriting curves
   matching the two signature styles visible in the reference
──────────────────────────────────────────────────────────── */
function InstructorSignature() {
  return (
    <svg
      className={styles.sigSvg}
      viewBox="0 0 140 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Instructor signature"
    >
      {/* Flowing cursive-style signature scribble */}
      <path
        d="M 8 38 C 14 22 20 16 30 20 C 38 24 34 36 42 28 C 48 22 44 14 54 18
           C 62 22 58 34 66 30 C 72 26 70 18 78 20 C 86 22 84 32 92 28
           C 98 24 96 16 106 18 C 114 20 112 32 120 30 L 128 28"
        stroke="#1a1a1a"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Underline flourish */}
      <path
        d="M 6 44 Q 40 48 80 45 Q 110 42 132 44"
        stroke="#1a1a1a"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Ascender dot */}
      <circle cx="32" cy="15" r="1.5" fill="#1a1a1a" opacity="0.7" />
    </svg>
  );
}

function DirectorSignature() {
  return (
    <svg
      className={styles.sigSvg}
      viewBox="0 0 140 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Director signature"
    >
      {/* Different style — more angular / looped */}
      <path
        d="M 10 36 C 16 24 22 14 30 18 C 40 22 36 38 44 32
           C 50 28 52 18 62 20 C 74 22 70 36 78 30
           C 84 24 82 16 92 18 C 102 20 100 34 110 30
           C 116 26 118 20 126 22 L 132 30"
        stroke="#1a1a1a"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Loop accent */}
      <path
        d="M 44 32 C 44 24 52 20 56 28 C 58 34 52 40 44 36"
        stroke="#1a1a1a"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Underline */}
      <path
        d="M 8 44 Q 50 50 90 46 Q 116 43 132 45"
        stroke="#1a1a1a"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   Main Component
──────────────────────────────────────────────────────────── */
export function CertificateTemplate({
  recipientName,
  courseTitle,
  cohortName,
  issuedAt,
  certificateNumber,
  qrDataUri,
  verifyUrl,
  instructorName = 'Dedoatus Bijengsi',
  directorName = 'Chiella Harriet',
}: CertificateTemplateProps) {
  const [qr, setQr] = useState<string | null>(qrDataUri ?? null);
  const achievementText = buildAchievementText(courseTitle);

  /* Generate QR client-side if not pre-computed */
  useEffect(() => {
    if (qr) return;
    if (!verifyUrl) return;

    let cancelled = false;
    import('qrcode').then((QRCode) => {
      QRCode.default
        .toDataURL(verifyUrl, {
          errorCorrectionLevel: 'H',
          margin: 1,
          width: 200,
          color: { dark: '#1B4332', light: '#FFFFFF' },
        })
        .then((uri) => {
          if (!cancelled) setQr(uri);
        })
        .catch(() => {/* silently skip if QR fails */});
    });

    return () => { cancelled = true; };
  }, [qr, verifyUrl]);

  function handlePrint() {
    window.print();
  }

  const programLabel = courseTitle
    ? `${courseTitle}${cohortName ? ` — ${cohortName}` : ''}`
    : `KiddyKode Explorer Program${cohortName ? ` — ${cohortName}` : ''}`;

  return (
    <div className={styles.printRoot} id="cert-print-root">
      {/* ── Certificate paper ── */}
      <div className={styles.certificate} role="img" aria-label={`Certificate of Completion for ${recipientName}`}>

        {/* Border frames */}
        <div className={styles.outerBorder} aria-hidden="true" />
        <div className={styles.innerBorder} aria-hidden="true" />

        {/* Corner ornaments */}
        <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true">
          <CornerOrnament />
        </div>
        <div className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true">
          <CornerOrnament />
        </div>
        <div className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true">
          <CornerOrnament />
        </div>
        <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true">
          <CornerOrnament />
        </div>

        {/* Main content */}
        <div className={styles.content}>

          {/* ── Top: title + preamble + name ── */}
          <div className={styles.top}>
            <h1 className={styles.title}>Certificate</h1>
            <p className={styles.subtitle}>of Completion</p>

            <p className={styles.preamble}>
              This certificate proudly<br />
              presented to
            </p>

            <h2 className={styles.recipientName}>{recipientName}</h2>

            {/* Divider ornament */}
            <div className={styles.dividerOrnament} aria-hidden="true">
              <div className={styles.dividerLine} />
              <div className={styles.dividerDots}>
                <div className={styles.dividerDot} />
                <div className={styles.dividerDot} />
                <div className={styles.dividerDot} />
              </div>
              <div className={styles.dividerLine} />
            </div>

            <p className={styles.achievementText}>
              {achievementText}
            </p>
          </div>

          {/* ── Signature row ── */}
          <div className={styles.sigRow}>
            {/* Left: Instructor */}
            <div className={styles.sigBlock}>
              <InstructorSignature />
              <div className={styles.sigLine} />
              <span className={styles.sigName}>{instructorName}</span>
              <span className={styles.sigRole}>Instructor</span>
            </div>

            {/* Centre: KiddyKode logo */}
            <div className={styles.centerLogo}>
              <div className={styles.logoCircle}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/kiddykode-logo.png"
                  alt="KiddyKode"
                  className={styles.logoImg}
                />
              </div>
            </div>

            {/* Right: Director */}
            <div className={styles.sigBlock}>
              <DirectorSignature />
              <div className={styles.sigLine} />
              <span className={styles.sigName}>{directorName}</span>
              <span className={styles.sigRole}>Director</span>
            </div>
          </div>
        </div>

        {/* ── QR code (bottom-right) ── */}
        {qr && (
          <div className={styles.qrBlock}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qr}
              alt="Scan to verify"
              className={styles.qrImg}
              width={64}
              height={64}
            />
            <span className={styles.qrLabel}>Scan to verify</span>
          </div>
        )}

        {/* ── Certificate number (bottom-left) ── */}
        {certificateNumber && (
          <div className={styles.certNumber} aria-label={`Certificate number: ${certificateNumber}`}>
            {certificateNumber}
          </div>
        )}

        {/* ── Issue date (bottom centre) ── */}
        <div className={styles.issuedDate}>
          Issued {formatDate(issuedAt)}
        </div>
      </div>

      {/* ── Print button (hidden at print time via CSS) ── */}
      <button
        id="cert-print-btn"
        onClick={handlePrint}
        className={styles.printBtn}
        type="button"
        aria-label="Print or save certificate as PDF"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M4 6V2H12V6M4 12H2C1.4 12 1 11.6 1 11V7C1 6.4 1.4 6 2 6H14C14.6 6 15 6.4 15 7V11C15 11.6 14.6 12 14 12H12M4 10H12V15H4V10Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Print / Save as PDF
      </button>
    </div>
  );
}
