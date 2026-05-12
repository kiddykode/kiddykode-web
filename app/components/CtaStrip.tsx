import Link from "next/link";
import React from "react";

export interface CtaStripProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  buttons: {
    label: string;
    href: string;
    variant: "primary" | "ghost" | "link";
  }[];
}

export function CtaStrip({ eyebrow, title, buttons }: CtaStripProps) {
  return (
    <section className="bg-[var(--color-ink-900)] text-[var(--color-sand-50)] py-[clamp(96px,10vw,160px)]">
      <div className="wrap flex flex-col items-center text-center">
        {eyebrow && <span className="eyebrow text-[var(--color-accent-soft)] before:bg-[var(--color-accent-soft)]">{eyebrow}</span>}
        
        <h2 className="text-[var(--color-sand-50)] text-[clamp(40px,5.4vw,72px)] leading-[1.02] max-w-[18ch] mt-6 mb-10 text-balance">
          {title}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {buttons.map((btn, index) => {
            if (btn.variant === "primary") {
              return (
                <Link key={index} href={btn.href} className="btn bg-[var(--color-sand-50)] text-[var(--color-ink-900)] hover:bg-[#fff]">
                  {btn.label} <span className="arrow">→</span>
                </Link>
              );
            }
            if (btn.variant === "ghost") {
              return (
                <Link key={index} href={btn.href} className="btn border border-[var(--color-sand-50)] text-[var(--color-sand-50)] hover:bg-[var(--color-sand-50)] hover:text-[var(--color-ink-900)]">
                  {btn.label}
                </Link>
              );
            }
            return (
              <Link key={index} href={btn.href} className="btn btn--link text-[var(--color-sand-50)] border-b-[var(--color-sand-50)] hover:text-[var(--color-accent)] hover:border-b-[var(--color-accent)]">
                {btn.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
