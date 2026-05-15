'use client';

import { useActionState } from 'react';
import { submitContact, type ContactState } from '../actions/contact';
import styles from '../[locale]/contact/contact.module.css';
import { Link } from '@/i18n/navigation';

const initialState: ContactState = {
  success: false,
  message: '',
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.success) {
    return (
      <div className={styles.formBox}>
        <div style={{
          textAlign: 'center',
          padding: 'clamp(32px, 4vw, 64px) 24px',
        }}>
          <div style={{
            width: 56,
            height: 56,
            margin: '0 auto 20px',
            borderRadius: '50%',
            background: 'var(--color-sand-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}>
            ✓
          </div>
          <h3 style={{ fontSize: 22, marginBottom: 12 }}>Message sent</h3>
          <p style={{
            fontSize: 15,
            color: 'var(--color-ink-700)',
            lineHeight: 1.6,
            maxWidth: '36ch',
            margin: '0 auto',
          }}>
            {state.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formBox}>
      <form action={formAction}>
        {state.message && !state.success && (
          <div style={{
            padding: '12px 16px',
            marginBottom: 24,
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 8,
            fontSize: 14,
            color: '#991b1b',
          }}>
            {state.message}
          </div>
        )}

        <div className={styles.intentPicker}>
          <label className={styles.intentLabel}>
            <input type="radio" name="intent" value="parent" defaultChecked />
            <span>I am a parent</span>
          </label>
          <label className={styles.intentLabel}>
            <input type="radio" name="intent" value="school" />
            <span>I represent a school</span>
          </label>
          <label className={styles.intentLabel}>
            <input type="radio" name="intent" value="partner" />
            <span>I want to partner</span>
          </label>
          <label className={styles.intentLabel}>
            <input type="radio" name="intent" value="other" />
            <span>Other inquiry</span>
          </label>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label>First Name</label>
            <input type="text" name="firstName" placeholder="e.g. Jane" required />
            {state.errors?.firstName && (
              <span style={{ fontSize: 12, color: '#dc2626' }}>{state.errors.firstName[0]}</span>
            )}
          </div>
          <div className={styles.field}>
            <label>Last Name</label>
            <input type="text" name="lastName" placeholder="e.g. Doe" required />
            {state.errors?.lastName && (
              <span style={{ fontSize: 12, color: '#dc2626' }}>{state.errors.lastName[0]}</span>
            )}
          </div>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label>Email Address</label>
            <input type="email" name="email" placeholder="jane@example.com" required />
            {state.errors?.email && (
              <span style={{ fontSize: 12, color: '#dc2626' }}>{state.errors.email[0]}</span>
            )}
          </div>
          <div className={styles.field}>
            <label>City / Country</label>
            <input type="text" name="city" placeholder="e.g. Nairobi, KE" required />
            {state.errors?.city && (
              <span style={{ fontSize: 12, color: '#dc2626' }}>{state.errors.city[0]}</span>
            )}
          </div>
        </div>

        <div className={styles.field} style={{ marginBottom: 20 }}>
          <label>Subject</label>
          <select name="subject">
            <option>Enrolling my child in a program</option>
            <option>Bringing KiddyKode to my school</option>
            <option>Opening a chapter in my city</option>
            <option>Funding or sponsorship</option>
            <option>Press inquiry</option>
            <option>Other</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Message</label>
          <textarea name="message" placeholder="How can we help?" required></textarea>
          {state.errors?.message && (
            <span style={{ fontSize: 12, color: '#dc2626' }}>{state.errors.message[0]}</span>
          )}
        </div>

        <div className={styles.consent}>
          <input type="checkbox" id="consent" name="consent" required />
          <label htmlFor="consent">
            I agree to the <Link href="#">Privacy Policy</Link> and consent to KiddyKode storing my data to respond to this inquiry.
          </label>
        </div>
        {state.errors?.consent && (
          <span style={{ fontSize: 12, color: '#dc2626', display: 'block', marginTop: -16, marginBottom: 16 }}>
            {state.errors.consent[0]}
          </span>
        )}

        <button
          type="submit"
          className="btn btn--primary"
          disabled={pending}
          style={{ width: '100%', justifyContent: 'center', opacity: pending ? 0.7 : 1 }}
        >
          {pending ? 'Sending…' : 'Send Message'} <span className="arrow">→</span>
        </button>
      </form>
    </div>
  );
}
