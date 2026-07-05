"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/cn";

const AUTO_ADVANCE_MS = 8000;

/**
 * Auto-advancing quote carousel. Pauses on hover, focus, or when the user
 * prefers reduced motion; always navigable with the arrow buttons and dots.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const go = useCallback(
    (next: number) => setIndex((next + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (paused || reducedMotion.current) return;
    const t = setInterval(() => go(index + 1), AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [index, paused, go]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Quotes from recommendation letters"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((t, i) => (
            <figure
              key={i}
              aria-hidden={i !== index}
              className="w-full shrink-0 px-8 py-10 sm:px-12"
            >
              <blockquote className="mx-auto max-w-2xl text-balance text-center text-lg leading-relaxed sm:text-xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-center">
                <span className="block font-medium">{t.name}</span>
                <span className="mt-0.5 block text-sm text-muted">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous quote"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to quote ${i + 1} of ${items.length}`}
              aria-current={i === index}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-ink" : "w-2 bg-line hover:bg-muted",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next quote"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
