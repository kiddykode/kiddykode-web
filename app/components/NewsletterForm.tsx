'use client';

import { useActionState } from 'react';
import { subscribeNewsletter, type NewsletterState } from '../actions/newsletter';

const initialState: NewsletterState = {
  success: false,
  message: '',
};

interface NewsletterFormProps {
  source?: 'footer' | 'stories' | 'cohort' | 'homepage' | 'promo-modal';
  /** Placeholder text for the email input */
  placeholder?: string;
  /** Button label */
  buttonText?: string;
  /** Additional className for the form wrapper */
  className?: string;
  /** Style variant: 'footer' for dark bg, 'inline' for light bg */
  variant?: 'footer' | 'inline';
}

export function NewsletterForm({
  source = 'footer',
  placeholder = 'you@example.com',
  buttonText = 'Join',
  className = '',
  variant = 'footer',
}: NewsletterFormProps) {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  if (state.success) {
    return (
      <div className={className} style={{ marginTop: variant === 'footer' ? 14 : 0 }}>
        <p style={{
          fontSize: 13,
          color: variant === 'footer' ? '#a3d9a5' : '#16a34a',
          fontWeight: 500,
          margin: 0,
          padding: '12px 0',
        }}>
          ✓ {state.message}
        </p>
      </div>
    );
  }

  const isFooter = variant === 'footer';

  return (
    <div className={className}>
      <form action={formAction} className="newsletter" style={{ display: 'flex', marginTop: isFooter ? 14 : 0 }}>
        <input type="hidden" name="source" value={source} />
        <input
          type="email"
          name="email"
          placeholder={placeholder}
          required
          style={{
            flex: 1,
            padding: '12px 14px',
            background: isFooter ? 'rgba(247,243,236,0.06)' : 'var(--color-sand-50)',
            border: `1px solid ${isFooter ? 'rgba(247,243,236,0.18)' : 'var(--color-line)'}`,
            borderRight: 0,
            borderRadius: '6px 0 0 6px',
            color: isFooter ? 'var(--color-sand-50)' : 'var(--color-ink-900)',
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            minWidth: 0,
          }}
        />
        <button
          type="submit"
          disabled={pending}
          style={{
            padding: '12px 16px',
            background: 'var(--color-accent)',
            color: 'var(--color-ink-900)',
            border: 0,
            borderRadius: '0 6px 6px 0',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: 13,
            cursor: pending ? 'wait' : 'pointer',
            opacity: pending ? 0.7 : 1,
            transition: 'background .15s',
          }}
        >
          {pending ? '…' : buttonText}
        </button>
      </form>
      {state.message && !state.success && (
        <p style={{
          fontSize: 12,
          color: '#ef4444',
          margin: '6px 0 0',
        }}>
          {state.message}
        </p>
      )}
    </div>
  );
}
