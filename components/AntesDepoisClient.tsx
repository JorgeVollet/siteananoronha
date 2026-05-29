'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ProjectMediaViewer } from './portfolio/ProjectMediaViewer';
import { cn } from '@/lib/utils';
import { useRevealOnce } from '@/lib/useRevealOnce';
import type { ProjectWithMedia } from '@/lib/types/database';

type Category = 'engenharia' | 'marcenaria';

type Props = {
  engenharia: ProjectWithMedia[];
  marcenaria: ProjectWithMedia[];
};

export default function AntesDepoisClient({ engenharia, marcenaria }: Props) {
  const { ref: sectionRef, revealed } = useRevealOnce(0.15);
  const [activeCategory, setActiveCategory] = useState<Category>('engenharia');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    engenharia[0]?.id ?? marcenaria[0]?.id ?? null,
  );
  const [featuredOpacity, setFeaturedOpacity] = useState(1);
  const fadeTimer = useRef<ReturnType<typeof setTimeout>>();

  const filtered = activeCategory === 'engenharia' ? engenharia : marcenaria;
  const selected = filtered.find((p) => p.id === selectedProjectId) ?? filtered[0] ?? null;
  const selectedIndex = selected ? filtered.findIndex((p) => p.id === selected.id) : -1;

  const handleCategoryChange = useCallback(
    (cat: Category) => {
      if (cat === activeCategory) return;
      clearTimeout(fadeTimer.current);
      setFeaturedOpacity(0);
      fadeTimer.current = setTimeout(() => {
        setActiveCategory(cat);
        const first = cat === 'engenharia' ? engenharia[0] : marcenaria[0];
        setSelectedProjectId(first?.id ?? null);
        setFeaturedOpacity(1);
      }, 220);
    },
    [activeCategory, engenharia, marcenaria],
  );

  const handleSelectProject = useCallback(
    (id: string) => {
      if (id === selectedProjectId) return;
      clearTimeout(fadeTimer.current);
      setFeaturedOpacity(0);
      fadeTimer.current = setTimeout(() => {
        setSelectedProjectId(id);
        setFeaturedOpacity(1);
      }, 220);
    },
    [selectedProjectId],
  );

  const totalProjects = engenharia.length + marcenaria.length;

  const sectionStyle = {
    scrollMarginTop: '88px',
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(32px)',
    transition:
      'opacity 1100ms cubic-bezier(0.22,1,0.36,1), transform 1100ms cubic-bezier(0.22,1,0.36,1)',
    background:
      'radial-gradient(circle at 20% 10%, rgba(255,255,255,0.72), transparent 30%), ' +
      'radial-gradient(circle at 88% 88%, rgba(221,211,198,0.28), transparent 34%), ' +
      'var(--color-background)',
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef as React.RefObject<HTMLElement>}
      aria-label="Portfólio — Ana Laura Noronha"
      className="relative overflow-hidden py-20 px-6 sm:px-8 lg:py-28 lg:px-12 xl:px-14"
      style={sectionStyle}
    >
      <div className="max-w-[1510px] mx-auto">
        <PortfolioHeader />

        {/* ── TOGGLE ENGENHARIA / MARCENARIA ── */}
        <div className="mb-10 flex justify-center">
          <div
            className="flex gap-1 rounded-full p-1"
            style={{ background: '#e8ddd0', border: '1px solid #d1c4b7' }}
            role="tablist"
            aria-label="Categoria de projetos"
          >
            {(['engenharia', 'marcenaria'] as const).map((cat) => {
              const count = cat === 'engenharia' ? engenharia.length : marcenaria.length;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    'rounded-full px-7 py-2.5 text-[0.88rem] font-bold tracking-[-0.01em]',
                    'transition-all duration-300',
                    activeCategory === cat
                      ? 'bg-[#171614] text-white shadow-[0_8px_20px_rgba(28,22,17,0.22)]'
                      : 'text-[#756b60] hover:text-[#171411]',
                  )}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {cat === 'engenharia' ? 'Engenharia' : 'Marcenaria'}
                  {totalProjects > 0 && (
                    <span className="ml-1.5 text-[0.78rem] opacity-60">({count})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── ESTADO VAZIO GLOBAL ── */}
        {totalProjects === 0 ? (
          <div className="flex justify-center py-8 lg:py-16">
            <div
              className="max-w-sm w-full rounded-[20px] border border-[#d8c9b8] p-10 text-center"
              style={{ background: '#f4ede2' }}
            >
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 block bg-[#9a744d]" />
                <span
                  className="text-[0.78rem] font-bold tracking-[0.09em] uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
                >
                  Em breve
                </span>
                <span className="h-px w-8 block bg-[#9a744d]" />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(22px, 2.2vw, 32px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.04em',
                  color: '#171411',
                }}
              >
                Novos projetos{' '}
                <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
                  sendo finalizados.
                </em>
              </p>
              <p
                className="mt-4"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  color: '#5a5047',
                }}
              >
                O portfólio está sendo atualizado com obras e marcenarias recentes. Volte em breve.
              </p>
            </div>
          </div>
        ) : (
          /* ── SPLIT EDITORIAL ── */
          <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_0.85fr] gap-8 lg:gap-12 items-start">

            {/* ─ COLUNA ESQUERDA — Projeto em destaque ─ */}
            <div
              className="order-2 lg:order-1"
              style={{ opacity: featuredOpacity, transition: 'opacity 220ms ease' }}
            >
              {selected ? (
                <>
                  <ProjectMediaViewer key={selected.id} media={selected.media} />

                  <div className="mt-7">
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className="shrink-0 text-[0.78rem] font-bold tracking-[0.08em] uppercase"
                        style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
                      >
                        {selected.tipologia}
                      </span>
                      <span className="h-px flex-1 bg-[#d1c4b7]" />
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 400,
                        fontSize: 'clamp(28px, 2.8vw, 44px)',
                        lineHeight: 1,
                        letterSpacing: '-0.045em',
                        color: '#171411',
                      }}
                    >
                      {selected.nome}
                    </h3>

                    {selected.servicos.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {selected.servicos.map((s) => (
                          <span
                            key={s}
                            className="rounded-full px-3.5 py-1 text-[0.76rem] font-bold uppercase tracking-[0.06em]"
                            style={{
                              background: '#eee5da',
                              border: '1px solid #d8c9b8',
                              color: '#756b60',
                              fontFamily: 'var(--font-body)',
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>

            {/* ─ COLUNA DIREITA — Lista de projetos ─ */}
            <div className="order-1 lg:order-2">
              <div className="mb-4 hidden lg:flex items-center justify-between">
                <span
                  className="text-[0.82rem] font-bold tracking-[0.08em] uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
                >
                  {activeCategory === 'engenharia' ? 'Obras & Projetos' : 'Móveis & Marcenaria'}
                </span>
                {selected && (
                  <span
                    className="text-[0.8rem] font-bold"
                    style={{ fontFamily: 'var(--font-body)', color: '#756b60' }}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                    {String(filtered.length).padStart(2, '0')}
                  </span>
                )}
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-[14px] border border-[#e3d6c6] bg-[#f4ede2] p-6 text-center">
                  <p
                    className="text-[0.88rem]"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      color: '#756b60',
                    }}
                  >
                    Em breve novos projetos nesta categoria.
                  </p>
                </div>
              ) : (
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory lg:flex-col lg:overflow-visible lg:pb-0 lg:snap-none">
                  {filtered.map((p) => {
                    const isActive = p.id === selected?.id;
                    const thumb =
                      p.media[0]?.url ??
                      p.media[0]?.before_url ??
                      p.media[0]?.video_thumbnail ??
                      null;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectProject(p.id)}
                        aria-pressed={isActive}
                        aria-label={`Selecionar projeto: ${p.nome}`}
                        className={cn(
                          'snap-start shrink-0 w-56 lg:w-full',
                          'flex items-center gap-3 rounded-[12px] border p-3 lg:p-4 text-left',
                          'transition-all duration-300',
                          isActive
                            ? 'border-[#9a744d] bg-[#f8f2ea] shadow-[0_12px_36px_rgba(166,123,79,0.18)]'
                            : 'border-[#e3d6c6] bg-[#f4ede2] hover:border-[#c6b49f] hover:bg-[#f1ebe3] hover:shadow-[0_6px_18px_rgba(42,31,22,0.08)]',
                        )}
                      >
                        <div className="relative h-12 w-12 lg:h-16 lg:w-16 shrink-0 overflow-hidden rounded-[8px] bg-[#eee5da]">
                          {thumb ? (
                            <Image
                              src={thumb}
                              alt={p.nome}
                              fill
                              sizes="64px"
                              className="object-cover"
                              quality={70}
                            />
                          ) : (
                            <span className="absolute inset-0 flex items-center justify-center text-[#c6b49f] text-lg">
                              —
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className="mb-0.5 hidden lg:block text-[0.68rem] font-bold tracking-[0.07em] uppercase truncate"
                            style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
                          >
                            {p.tipologia}
                          </p>
                          <p
                            className="truncate text-[0.88rem] font-bold leading-tight"
                            style={{
                              fontFamily: 'var(--font-display)',
                              color: isActive ? '#171411' : '#3a332d',
                            }}
                          >
                            {p.nome}
                          </p>
                          <p
                            className="mt-0.5 lg:hidden text-[0.68rem] truncate"
                            style={{ fontFamily: 'var(--font-body)', color: '#756b60' }}
                          >
                            {p.tipologia}
                          </p>
                        </div>

                        <div
                          className={cn(
                            'hidden lg:block shrink-0 h-1.5 w-1.5 rounded-full transition-all duration-300',
                            isActive ? 'bg-[#9a744d]' : 'bg-transparent',
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PortfolioHeader() {
  return (
    <div className="mb-12 flex flex-col items-center text-center">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 block bg-[#9a744d]" />
        <span
          className="text-[0.82rem] font-bold tracking-[0.08em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
        >
          Portfólio
        </span>
        <span className="h-px w-8 block bg-[#9a744d]" />
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'clamp(40px, 4.5vw, 72px)',
          lineHeight: 0.98,
          letterSpacing: '-0.055em',
          color: '#171411',
        }}
      >
        Meus{' '}
        <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>projetos.</em>
      </h2>

      <p
        className="mt-5 max-w-[600px]"
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(18px, 1.8vw, 24px)',
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          color: '#3a332d',
        }}
      >
        Arraste a alça em cada projeto para comparar o antes e depois.
      </p>
    </div>
  );
}
