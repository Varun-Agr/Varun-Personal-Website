"use client";

import { useState } from "react";

export default function ImageCarousel({
  images,
  alt,
  gradient,
  accent,
  stat,
  statLabel,
}: {
  images?: string[];
  alt: string;
  gradient: string;
  accent: string;
  stat: string;
  statLabel: string;
}) {
  const [idx, setIdx] = useState(0);
  const hasImages = images && images.length > 0;
  const multipleImages = images && images.length > 1;

  return (
    <div
      className="aspect-[4/3] rounded-lg overflow-hidden relative"
      style={{ background: gradient }}
    >
      {hasImages ? (
        <>
          <img
            src={images[idx]}
            alt={`${alt} — ${idx + 1}`}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
          />
          {multipleImages && (
            <>
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className=""
                    style={{
                      width: idx === i ? 20 : 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: idx === i ? "#fff" : "rgba(255,255,255,0.4)",
                      transition: "all 0.3s",
                    }}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
              {/* Prev / Next */}
              {idx > 0 && (
                <button
                  onClick={() => setIdx(idx - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/80 hover:bg-black/60 transition-colors z-10"
                  aria-label="Previous image"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}
              {idx < images.length - 1 && (
                <button
                  onClick={() => setIdx(idx + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/80 hover:bg-black/60 transition-colors z-10"
                  aria-label="Next image"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div
              className="text-6xl font-bold"
              style={{ color: `${accent}33` }}
            >
              {stat}
            </div>
            <div
              className="text-sm tracking-widest uppercase"
              style={{ color: `${accent}55` }}
            >
              {statLabel}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
