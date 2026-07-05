"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Click-to-play YouTube embed. Renders only a thumbnail + play button until
 * clicked, so no third-party JavaScript loads with the page (Lighthouse),
 * then swaps in a youtube-nocookie iframe with autoplay.
 */
export function YouTubeEmbed({
  youtubeId,
  title,
  start,
}: {
  youtubeId: string;
  title: string;
  start?: number;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1${
            start ? `&start=${start}` : ""
          }`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-line bg-black text-left"
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 1024px) 640px, 100vw"
        className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-ink/80 text-paper transition-transform group-hover:scale-105"
        >
          {/* play triangle */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 4l10 6-10 6V4z" />
          </svg>
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-medium text-white">
        {title}
      </span>
    </button>
  );
}
