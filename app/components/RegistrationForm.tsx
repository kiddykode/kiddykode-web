'use client';

import { useActionState } from 'react';
import { registerForCohort, type RegistrationState } from '../actions/register';
import { Link } from '@/i18n/navigation';

const initialState: RegistrationState = {
  success: false,
  message: '',
};

export function RegistrationForm() {
  const [state, formAction, pending] = useActionState(registerForCohort, initialState);

  if (state.success) {
    return (
      <div style={{
        background: 'var(--color-white)',
        border: '1px solid var(--color-line)',
        borderRadius: 12,
        padding: 'clamp(32px, 4vw, 48px)',
        textAlign: 'center',
      }}>
        <div style={{
          width: 64,
          height: 64,
          margin: '0 auto 20px',
          borderRadius: '50%',
          background: '#dcfce7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
        }}>
          🎉
        </div>
        <h3 style={{ fontSize: 22, marginBottom: 12 }}>Registration confirmed!</h3>
        <p style={{
          fontSize: 15,
          color: 'var(--color-ink-700)',
          lineHeight: 1.6,
          maxWidth: '42ch',
          margin: '0 auto 24px',
        }}>
          {state.message}
        </p>
        <Link href="/programs" className="btn btn--ghost">
          Explore other formats <span className="arrow">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--color-white)',
      border: '1px solid var(--color-line)',
      borderRadius: 12,
      padding: 'clamp(24px, 4vw, 48px)',
    }}>
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

        {/* Child Details */}
        <div style={{ marginBottom: 28 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}>
            Learner Details
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.04em',
              color: 'var(--color-ink-700)',
            }}>
              Child&apos;s Full Name
            </label>
            <input
              type="text"
              name="childName"
              placeholder="e.g. Zola Nkosi"
              required
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                padding: '12px 14px',
                border: '1px solid var(--color-line)',
                borderRadius: 6,
                background: 'var(--color-sand-50)',
                color: 'var(--color-ink-900)',
              }}
            />
            {state.errors?.childName && (
              <span style={{ fontSize: 12, color: '#dc2626' }}>{state.errors.childName[0]}</span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.04em',
              color: 'var(--color-ink-700)',
            }}>
              Age
            </label>
            <input
              type="number"
              name="childAge"
              placeholder="e.g. 11"
              min={5}
              max={18}
              required
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                padding: '12px 14px',
                border: '1px solid var(--color-line)',
                borderRadius: 6,
                background: 'var(--color-sand-50)',
                color: 'var(--color-ink-900)',
              }}
            />
            {state.errors?.childAge && (
              <span style={{ fontSize: 12, color: '#dc2626' }}>{state.errors.childAge[0]}</span>
            )}
          </div>
        </div>

        {/* Guardian Details */}
        <div style={{ marginBottom: 28, marginTop: 36 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}>
            Parent / Guardian
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.04em',
              color: 'var(--color-ink-700)',
            }}>
              Your Full Name
            </label>
            <input
              type="text"
              name="guardianName"
              placeholder="e.g. Sarah Nkosi"
              required
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                padding: '12px 14px',
                border: '1px solid var(--color-line)',
                borderRadius: 6,
                background: 'var(--color-sand-50)',
                color: 'var(--color-ink-900)',
              }}
            />
            {state.errors?.guardianName && (
              <span style={{ fontSize: 12, color: '#dc2626' }}>{state.errors.guardianName[0]}</span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.04em',
              color: 'var(--color-ink-700)',
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="guardianEmail"
              placeholder="e.g. sarah@email.com"
              required
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                padding: '12px 14px',
                border: '1px solid var(--color-line)',
                borderRadius: 6,
                background: 'var(--color-sand-50)',
                color: 'var(--color-ink-900)',
              }}
            />
            {state.errors?.guardianEmail && (
              <span style={{ fontSize: 12, color: '#dc2626' }}>{state.errors.guardianEmail[0]}</span>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.04em',
              color: 'var(--color-ink-700)',
            }}>
              WhatsApp Number (including country code)
            </label>
            <input
              type="tel"
              name="guardianPhone"
              placeholder="e.g. 237677123456"
              required
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                padding: '12px 14px',
                border: '1px solid var(--color-line)',
                borderRadius: 6,
                background: 'var(--color-sand-50)',
                color: 'var(--color-ink-900)',
              }}
            />
            {state.errors?.guardianPhone && (
              <span style={{ fontSize: 12, color: '#dc2626' }}>{state.errors.guardianPhone[0]}</span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.04em',
              color: 'var(--color-ink-700)',
            }}>
              City / Country
            </label>
            <input
              type="text"
              name="city"
              placeholder="e.g. Douala, CM"
              required
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                padding: '12px 14px',
                border: '1px solid var(--color-line)',
                borderRadius: 6,
                background: 'var(--color-sand-50)',
                color: 'var(--color-ink-900)',
              }}
            />
            {state.errors?.city && (
              <span style={{ fontSize: 12, color: '#dc2626' }}>{state.errors.city[0]}</span>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.04em',
              color: 'var(--color-ink-700)',
            }}>
              How did you hear about us?
            </label>
            <select
              name="referralSource"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                padding: '12px 14px',
                border: '1px solid var(--color-line)',
                borderRadius: 6,
                background: 'var(--color-sand-50)',
                color: 'var(--color-ink-900)',
              }}
            >
              <option value="">Select an option</option>
              <option value="social_media">Social Media</option>
              <option value="school">School / Teacher</option>
              <option value="friend">Friend / Word of Mouth</option>
              <option value="website">Website / Search</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Consent */}
        <div style={{
          margin: '24px 0 32px',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
        }}>
          <input type="checkbox" id="reg-consent" name="consent" required style={{ marginTop: 4 }} />
          <label htmlFor="reg-consent" style={{
            fontSize: 13,
            color: 'var(--color-ink-700)',
            lineHeight: 1.5,
          }}>
            I confirm that I am the parent or legal guardian of this child and consent to their participation in KiddyKode Live.
            I agree to the <Link href="#" style={{ textDecoration: 'underline' }}>Terms of Service</Link> and <Link href="#" style={{ textDecoration: 'underline' }}>Privacy Policy</Link>.
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
          style={{
            width: '100%',
            justifyContent: 'center',
            opacity: pending ? 0.7 : 1,
          }}
        >
          {pending ? 'Registering…' : 'Register Now'} <span className="arrow">→</span>
        </button>
      </form>
    </div>
  );
}
