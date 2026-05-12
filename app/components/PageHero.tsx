import Link from "next/link";
import React from "react";

export interface PageHeroProps {
  breadcrumb: { label: string; href: string }[];
  eyebrow: string;
  title: string | React.ReactNode;
  lede: string;
  metaItems?: { label: React.ReactNode; value: string }[];
}

export function PageHero({ breadcrumb, eyebrow, title, lede, metaItems }: PageHeroProps) {
  return (
    <section className="page-hero" data-screen-label="Page Hero">
      <div className="wrap">
        <div className="crumb">
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="sep text-[var(--color-ink-300)]">/</span>}
              {index === breadcrumb.length - 1 ? (
                <span>{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <span className="eyebrow">{eyebrow}</span>
        
        <h1 className="mt-6 max-w-[18ch] text-balance">
          {title}
        </h1>
        
        <p className="lede mt-7">
          {lede}
        </p>
        
        {metaItems && metaItems.length > 0 && (
          <div className="meta mt-10 pt-6 border-t border-[var(--color-line)] flex gap-8 flex-wrap font-mono text-xs text-[var(--color-ink-500)] tracking-[0.04em]">
            {metaItems.map((item, index) => (
              <span key={index}>
                <strong className="text-[var(--color-ink-900)] font-semibold">{item.label}</strong> {item.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
