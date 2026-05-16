'use client';

import { useActionState, useEffect } from 'react';
import { registerForYil } from '@/app/actions/yil-register';

// Simple user-plus icon
const UserPlusIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
    />
  </svg>
);

const ArrowRight = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function YilRegistrationModal({ isOpen, onClose }: Props) {
  const [state, formAction, isPending] = useActionState(registerForYil, {
    success: false,
    message: '',
  });

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-yil-bg border border-yil-line rounded-xl shadow-2xl overflow-hidden flex flex-col font-yil-sans">
        {/* Header */}
        <div className="bg-yil-card border-b border-yil-line text-yil-fg px-6 py-4 flex items-center gap-3">
          <UserPlusIcon />
          <h2 className="text-xl font-extrabold tracking-tight">Register Now</h2>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {state.success ? (
            <div className="text-center py-6">
              <div className="mx-auto w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-yil-fg mb-2">Registration Received!</h3>
              <p className="text-yil-fg2 text-sm mb-6">{state.message}</p>
              <button
                onClick={onClose}
                className="w-full yil-btn-wa font-bold py-3 px-4 rounded-lg transition-colors text-[#062B16]"
              >
                CLOSE
              </button>
            </div>
          ) : (
            <form action={formAction} className="space-y-5">
              {state.message && (
                <div className="bg-red-50 text-red-600 border border-red-200 text-sm rounded-lg p-3">
                  {state.message}
                </div>
              )}

              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-extrabold text-yil-fg mb-1"
                >
                  Full name / Nom et prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full bg-transparent border border-yil-line rounded-lg px-3 py-2.5 text-yil-fg focus:outline-none focus:border-yil-hi focus:ring-1 focus:ring-yil-hi transition-colors"
                />
                {state.errors?.fullName && (
                  <p className="mt-1 text-xs text-red-500">{state.errors.fullName[0]}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="whatsappNumber"
                  className="block text-sm font-extrabold text-yil-fg mb-1"
                >
                  Number (WhatsApp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  required
                  className="w-full bg-transparent border border-yil-line rounded-lg px-3 py-2.5 text-yil-fg focus:outline-none focus:border-yil-hi focus:ring-1 focus:ring-yil-hi transition-colors"
                />
                <p className="mt-1.5 text-xs text-yil-fg2">
                  Enter your WhatsApp number
                </p>
                {state.errors?.whatsappNumber && (
                  <p className="mt-1 text-xs text-red-500">{state.errors.whatsappNumber[0]}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="numberOfKids"
                  className="block text-sm font-extrabold text-yil-fg mb-1"
                >
                  # of children <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="numberOfKids"
                  name="numberOfKids"
                  required
                  min="1"
                  max="20"
                  className="w-full bg-transparent border border-yil-line rounded-lg px-3 py-2.5 text-yil-fg focus:outline-none focus:border-yil-hi focus:ring-1 focus:ring-yil-hi transition-colors"
                />
                <p className="mt-1.5 text-xs text-yil-fg2">
                  How many youths will be coming?
                </p>
                {state.errors?.numberOfKids && (
                  <p className="mt-1 text-xs text-red-500">{state.errors.numberOfKids[0]}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 yil-btn-wa disabled:opacity-70 disabled:cursor-not-allowed text-[#062B16] font-extrabold py-3.5 px-4 rounded-xl transition-colors text-[15px] tracking-wide"
                >
                  {isPending ? 'SUBMITTING...' : 'JOIN WHATSAPP GROUP'}
                  {!isPending && <ArrowRight />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
