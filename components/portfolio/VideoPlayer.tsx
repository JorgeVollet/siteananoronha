'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

type Props = {
  url: string;
  source: 'upload' | 'youtube' | 'vimeo';
  poster?: string | null;
  className?: string;
};

function extractYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  );
  return m ? m[1] : null;
}

function extractVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

const CONTAINER =
  'relative aspect-[4/3] lg:aspect-[16/10] w-full overflow-hidden rounded-[1.35rem] border border-[#d8c9b8] bg-[#171411] shadow-[0_24px_64px_rgba(42,31,22,0.14)] transition-all duration-500 hover:shadow-[0_28px_84px_rgba(166,123,79,0.28),0_0_0_1px_rgba(166,123,79,0.18)]';

export function VideoPlayer({ url, source, poster, className }: Props) {
  const [playing, setPlaying] = useState(false);

  if (source === 'upload') {
    return (
      <div className={`${CONTAINER} ${className ?? ''}`}>
        <video
          src={url}
          poster={poster ?? undefined}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  if (source === 'youtube') {
    const id = extractYouTubeId(url);
    if (!id) return <div className={CONTAINER}>URL de YouTube inválida</div>;

    const thumbnailSrc = poster ?? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

    return (
      <div className={`group ${CONTAINER} ${className ?? ''}`}>
        {!playing ? (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Reproduzir vídeo"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailSrc}
              alt="Preview do vídeo"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_24px_rgba(42,31,22,0.28)] ring-1 ring-[#d1c4b7] transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:ring-[#9a744d] group-hover:shadow-[0_8px_32px_rgba(166,123,79,0.35)]">
              <Play size={22} className="translate-x-0.5 text-[#9a744d]" fill="#9a744d" />
            </div>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
    );
  }

  if (source === 'vimeo') {
    const id = extractVimeoId(url);
    if (!id) return <div className={CONTAINER}>URL de Vimeo inválida</div>;

    return (
      <div className={`group ${CONTAINER} ${className ?? ''}`}>
        {!playing ? (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Reproduzir vídeo"
          >
            {poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={poster}
                alt="Preview do vídeo"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            )}
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_24px_rgba(42,31,22,0.28)] ring-1 ring-[#d1c4b7] transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:ring-[#9a744d] group-hover:shadow-[0_8px_32px_rgba(166,123,79,0.35)]">
              <Play size={22} className="translate-x-0.5 text-[#9a744d]" fill="#9a744d" />
            </div>
          </button>
        ) : (
          <iframe
            src={`https://player.vimeo.com/video/${id}?autoplay=1`}
            title="Vimeo video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
    );
  }

  return null;
}
