import React from "react";

export interface SectionHeadProps {
  eyebrow?: string | React.ReactNode;
  title?: string | React.ReactNode;
  lede?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function SectionHead({ eyebrow, title, lede, children, className = "" }: SectionHeadProps) {
  return (
    <div className={`section-head ${className}`}>
      <div className="heading">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {title && <h2 className="mt-[18px]">{title}</h2>}
      </div>
      <div>
        {lede && typeof lede === "string" ? <p className="lede">{lede}</p> : lede}
        {children}
      </div>
    </div>
  );
}
