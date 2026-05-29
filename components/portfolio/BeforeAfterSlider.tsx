'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDemoed, setHasDemoed] = useState(false);

  // Demo única: 50 → 70 → 50 ao entrar no viewport pela primeira vez.
  // Skipa se prefers-reduced-motion.
  useEffect(() => {
    if (!containerRef.current || hasDemoed) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setHasDemoed(true);
      return;
    }
    const el = containerRef.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const duration = 2400;
        const animate = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // Curva seno: 50 → 70 → 50
          setPosition(50 + 20 * Math.sin(t * Math.PI));
          if (t < 1) {
            rafRef.current = requestAnimationFrame(animate);
          } else {
            setPosition(50);
            setHasDemoed(true);
          }
        };
        rafRef.current = requestAnimationFrame(animate);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [hasDemoed]);

  const getPosition = (clientX: number): number => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(rafRef.current);
    setHasDemoed(true);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setPosition(getPosition(e.clientX));
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition(getPosition(e.clientX));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'group relative w-full select-none overflow-hidden',
        'rounded-[1.35rem] border border-[#d8c9b8] bg-[#eee5da]',
        'aspect-[4/3] lg:aspect-[16/10]',
        'shadow-[0_24px_64px_rgba(42,31,22,0.14)]',
        'transition-all duration-500',
        'hover:-translate-y-1',
        'hover:shadow-[0_28px_84px_rgba(166,123,79,0.28),0_0_0_1px_rgba(166,123,79,0.18)]',
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        touchAction: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      aria-label={`Comparação antes e depois: arraste para revelar`}
      role="img"
    >
      {/* Depois — imagem de fundo completa */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        draggable={false}
        sizes="(max-width: 1024px) 100vw, 63vw"
        className="object-cover pointer-events-none"
        quality={85}
      />

      {/* Antes — revelada pelo clipPath conforme posição da alça */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          draggable={false}
          sizes="(max-width: 1024px) 100vw, 63vw"
          className="object-cover"
          quality={85}
        />
      </div>

      {/* Linha divisora + alça */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Linha */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.6)]" />

        {/* Handle */}
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'flex h-12 w-12 items-center justify-center rounded-full',
            'bg-white shadow-[0_8px_24px_rgba(42,31,22,0.22)]',
            'ring-1 ring-[#d1c4b7]',
            'transition-all duration-200',
            'group-hover:ring-[#9a744d] group-hover:shadow-[0_8px_28px_rgba(166,123,79,0.30)]',
          )}
        >
          <ArrowLeftRight size={16} className="text-[#9a744d]" aria-hidden="true" />
        </div>
      </div>

      {/* Label ANTES */}
      <span
        className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.08em]"
        style={{
          background: 'rgba(23,20,17,0.72)',
          backdropFilter: 'blur(6px)',
          color: '#f5f0e9',
          fontFamily: 'var(--font-body)',
        }}
      >
        Antes
      </span>

      {/* Label DEPOIS */}
      <span
        className="absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.08em]"
        style={{
          background: '#9a744d',
          color: '#f5f0e9',
          fontFamily: 'var(--font-body)',
        }}
      >
        Depois
      </span>

      {/* Hint "Arraste para comparar" — some após a demo completar */}
      <div
        className={cn(
          'pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2',
          'rounded-full px-4 py-1.5 text-[0.74rem] font-bold uppercase tracking-[0.06em]',
          'transition-opacity duration-500',
          hasDemoed ? 'opacity-0' : 'opacity-100',
        )}
        style={{
          background: 'rgba(23,20,17,0.60)',
          backdropFilter: 'blur(6px)',
          color: '#f5f0e9',
          fontFamily: 'var(--font-body)',
        }}
        aria-hidden="true"
      >
        Arraste para comparar
      </div>
    </div>
  );
}
