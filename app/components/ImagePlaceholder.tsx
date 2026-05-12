import Image from "next/image";
import React from "react";

export interface ImagePlaceholderProps {
  tone?: "warm" | "cool" | "ink" | "clay" | "sage";
  photoUrl?: string;
  caption?: string;
  className?: string;
}

export function ImagePlaceholder({ tone = "warm", photoUrl, caption, className = "" }: ImagePlaceholderProps) {
  const hasPhoto = Boolean(photoUrl);
  
  return (
    <div className={`img-placeholder tone-${tone} ${hasPhoto ? "photo" : ""} ${className}`} style={hasPhoto ? { backgroundImage: `url('${photoUrl}')` } : undefined}>
      {caption && (
        <div className="img-cap">
          {caption.startsWith("Replace ▸") ? (
            <>
              <strong>Replace ▸</strong> {caption.replace("Replace ▸ ", "")}
            </>
          ) : (
            caption
          )}
        </div>
      )}
    </div>
  );
}
