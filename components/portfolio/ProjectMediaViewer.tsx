'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { VideoPlayer } from './VideoPlayer';
import type { ProjectMedia } from '@/lib/types/database';
import { cn } from '@/lib/utils';

type Props = {
  media: ProjectMedia[];
};

export function ProjectMediaViewer({ media }: Props) {
  const [index, setIndex] = useState(0);

  if (!media || media.length === 0) {
    return (
      <div
        className={cn(
          'relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden',
          'rounded-[1.35rem] border border-[#d8c9b8] bg-[#eee5da]',
          'shadow-[0_24px_64px_rgba(42,31,22,0.14)]',
          'flex items-center justify-center',
        )}
      >
        <span
          className="text-[0.82rem] font-bold tracking-[0.06em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
        >
          Sem mídia
        </span>
      </div>
    );
  }

  const current = media[index];
  const hasMultiple = media.length > 1;

  return (
    <div className="relative">
      {/* Tipo: antes/depois */}
      {current.type === 'before_after' && current.before_url && current.url && (
        <BeforeAfterSlider
          beforeSrc={current.before_url}
          afterSrc={current.url}
          beforeAlt={current.before_alt ?? 'Antes'}
          afterAlt={current.alt ?? 'Depois'}
        />
      )}

      {/* Tipo: foto */}
      {current.type === 'photo' && current.url && (
        <div
          className={cn(
            'group relative w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden',
            'rounded-[1.35rem] border border-[#d8c9b8] bg-[#eee5da]',
            'shadow-[0_24px_64px_rgba(42,31,22,0.14)]',
            'transition-all duration-500',
            'hover:-translate-y-1',
            'hover:shadow-[0_28px_84px_rgba(166,123,79,0.28),0_0_0_1px_rgba(166,123,79,0.18)]',
          )}
        >
          <Image
            src={current.url}
            alt={current.alt ?? 'Foto do projeto'}
            fill
            sizes="(max-width: 1024px) 100vw, 63vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            quality={85}
          />
        </div>
      )}

      {/* Tipo: vídeo */}
      {current.type === 'video' && current.video_url && current.video_source && (
        <VideoPlayer
          url={current.video_url}
          source={current.video_source}
          poster={current.video_thumbnail}
        />
      )}

      {/* Navegação entre múltiplas mídias */}
      {hasMultiple && (
        <>
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Mídia anterior"
            className={cn(
              'absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center',
              'rounded-full border border-[#d1c4b7] bg-[#f1ebe3]/95 text-[#1c1915] backdrop-blur-sm',
              'shadow-[0_4px_16px_rgba(42,31,22,0.12)]',
              'transition-all duration-300 hover:scale-105 hover:bg-[#f8f2ea]',
              'disabled:opacity-30 disabled:hover:scale-100',
            )}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => setIndex((i) => Math.min(media.length - 1, i + 1))}
            disabled={index === media.length - 1}
            aria-label="Próxima mídia"
            className={cn(
              'absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center',
              'rounded-full bg-[#171614]/90 text-white backdrop-blur-sm',
              'shadow-[0_4px_16px_rgba(42,31,22,0.22)]',
              'transition-all duration-300 hover:scale-105 hover:bg-[#29231f]',
              'disabled:opacity-30 disabled:hover:scale-100',
            )}
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots indicadores */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir para mídia ${i + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === index
                    ? 'w-6 bg-[#caa57c]'
                    : 'w-1.5 bg-white/50 hover:bg-white/75',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
