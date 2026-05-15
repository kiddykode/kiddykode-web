"use client";

import { useState } from 'react';
import { Link } from '@/i18n/navigation';

interface ShareActionsProps {
  url: string;
  title: string;
  text: string;
}

export function ShareActions({ url, title, text }: ShareActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareData = {
    title,
    text,
    url,
  };

  const handleNativeShare = async () => {
    // Check if Web Share API is available and if it's a mobile-like environment
    if (navigator.share && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error occurred
        console.log("Native share failed or cancelled, falling back to menu");
        setIsOpen(!isOpen);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const shareWhatsApp = () => {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    window.open(waUrl, '_blank');
    setIsOpen(false);
  };

  const shareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(fbUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button 
        onClick={handleNativeShare}
        className="btn btn--white"
      >
        Share Flyer 
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
          <polyline points="16 6 12 2 8 6"></polyline>
          <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 mt-[-16px] p-4 bg-white border border-[var(--color-line)] rounded-xl shadow-2xl z-20 w-64 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--color-ink-500)]">Spread the word via</span>
              <button onClick={() => setIsOpen(false)} className="text-[var(--color-ink-300)] hover:text-[var(--color-ink-900)] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={shareWhatsApp}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[var(--color-sand-50)] transition-all group"
              >
                <div className="w-11 h-11 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
                </div>
                <span className="text-[12px] font-semibold text-[var(--color-ink-900)]">WhatsApp</span>
              </button>
              <button 
                onClick={shareFacebook}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[var(--color-sand-50)] transition-all group"
              >
                <div className="w-11 h-11 flex items-center justify-center bg-[#1877F2] text-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <span className="text-[12px] font-semibold text-[var(--color-ink-900)]">Facebook</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
