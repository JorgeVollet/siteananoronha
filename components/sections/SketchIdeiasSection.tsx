'use client';

import Link from 'next/link';
import { useRevealOnScroll } from '@/lib/useRevealOnScroll';

// ═══════════════════════════════════════════════════════════════
// HOTSPOTS — áreas clicáveis por cima de cada post-it da foto
// Coordenadas em % relativas ao container (que mantém o aspect da foto)
// Ajuste fino aqui se algum ficar desalinhado
// ═══════════════════════════════════════════════════════════════
type Hotspot = {
  id: string;
  label: string;
  sublabel: string;
  href: string;
  // Área clicável — posição e tamanho em % do container da foto
  left: number;
  top: number;
  width: number;
  height: number;
  // Sublinhado da palavra — MILIMETRICAMENTE sob o texto do post-it
  // Coordenadas em % do container da foto (não do hotspot)
  underline: {
    left: number;      // posição horizontal do início do risco
    top: number;       // posição vertical (linha de base da palavra)
    width: number;     // largura do risco (~ largura da palavra)
    rotation: number;  // inclinação em graus, matching a inclinação do post-it
  };
};

const HOTSPOTS: Hotspot[] = [
  {
    id: 'briefing',
    label: 'Briefing',
    sublabel: 'Você sabia...',
    href: '/sketch/briefing',
    left: 30, top: 28, width: 10, height: 26,
    underline: { left: 30.8, top: 47.5, width: 7.5, rotation: -2 },
  },
  {
    id: 'moodboard',
    label: 'Moodboard',
    sublabel: 'A melhor forma...',
    href: '/sketch/moodboard',
    left: 41, top: 25, width: 10, height: 27,
    underline: { left: 41.5, top: 45.8, width: 8.5, rotation: 1 },
  },
  {
    id: 'materiais',
    label: 'Materiais',
    sublabel: 'Você sabia...',
    href: '/sketch/materiais',
    left: 53, top: 22, width: 10, height: 27,
    underline: { left: 53.5, top: 42.5, width: 7.8, rotation: -3 },
  },
  {
    id: 'orcamento',
    label: 'Orçamento',
    sublabel: 'A melhor forma...',
    href: '/sketch/orcamento',
    left: 65, top: 42, width: 10, height: 27,
    underline: { left: 65.5, top: 62, width: 8.2, rotation: 2 },
  },
  {
    id: 'layout',
    label: 'Layout',
    sublabel: 'A melhor forma...',
    href: '/sketch/layout',
    left: 36, top: 52, width: 10, height: 27,
    underline: { left: 36.8, top: 73, width: 5.8, rotation: -2 },
  },
  {
    id: 'medidas',
    label: 'Medidas',
    sublabel: 'Você sabia...',
    href: '/sketch/medidas',
    left: 47, top: 53, width: 10, height: 27,
    // Post-it 05 tem 2 linhas — sublinhado embaixo de "práticas" (segunda linha)
    underline: { left: 48, top: 76, width: 6.5, rotation: 1 },
  },
];

export function SketchIdeiasSection() {
  const sectionRef = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      id="sketch"
      aria-label="Sketch de Ideias — método criativo"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background:
          'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.55), transparent 45%), ' +
          'radial-gradient(circle at 85% 80%, rgba(221,211,198,0.35), transparent 45%), ' +
          'var(--color-background)',
      }}
    >
      {/* Wrapper do HEADER (título/legenda) — limitado ao container do site */}
      <div className="mx-auto max-w-[1360px] px-6 sm:px-8 lg:px-12">

        {/* ── EYEBROW + TITULO SEÇÃO ─────────────────────────────── */}
        <div className="reveal-on-scroll mb-10 lg:mb-14 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-[#9a744d]" aria-hidden="true" />
            <span
              className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#9a744d]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Processo criativo
            </span>
            <span className="h-px w-10 bg-[#9a744d]" aria-hidden="true" />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontWeight: 600,
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              lineHeight: 0.95,
              color: '#171411',
              margin: 0,
              transform: 'rotate(-1.5deg)',
            }}
          >
            Sketch de Ideias
          </h2>

          {/* Sublinhado desenhado à mão */}
          <svg
            width="220"
            height="14"
            viewBox="0 0 220 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginTop: '4px' }}
          >
            <path
              d="M2 8 Q 40 2, 80 6 T 160 5 T 218 7"
              stroke="#9a744d"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <p
            className="mt-6 max-w-[560px] font-serif italic text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.4] text-[#3a332d]"
          >
            O caderno de anotações que estrutura cada projeto —
            do primeiro alinhamento até a viabilidade.
          </p>
        </div>
      </div>
      {/* ↑ Fim do wrapper do HEADER (limitado a 1360px) */}

      {/* ══ BLOCO DA FOTO EM FULL-BLEED — borda a borda da viewport ══ */}
      <div
        className="reveal-on-scroll delay-150 relative w-full"
        style={{
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(23,20,17,0.22)',
        }}
      >
          {/* Foto do mural real */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/sketch-ideias.jpg"
            alt="Sketch de ideias — mural criativo com o processo de projeto de Ana Laura Noronha"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />

          {/* Hotspots clicáveis — brilho dourado suave sobre o post-it no hover */}
          {HOTSPOTS.map((h) => (
            <Link
              key={h.id}
              href={h.href}
              aria-label={`${h.label} — ${h.sublabel}`}
              className="group absolute cursor-pointer"
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
                width: `${h.width}%`,
                height: `${h.height}%`,
              }}
            >
              {/* Camada de brilho radial — como se uma luz dourada caísse sobre o post-it */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(240,201,138,0.35) 0%, rgba(240,201,138,0.18) 45%, transparent 75%)',
                  mixBlendMode: 'screen',
                  borderRadius: '8px',
                }}
              />

              {/* Halo externo dourado — reforça a sensação de que o post-it "acende" */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(193,147,102,0.30) 0%, transparent 65%)',
                  filter: 'blur(6px)',
                }}
              />
            </Link>
          ))}
      </div>
      {/* ↑ Fim do bloco da foto full-bleed */}

      {/* Wrapper da LEGENDA — limitado ao container do site */}
      <div className="mx-auto max-w-[1360px] px-6 sm:px-8 lg:px-12">
        {/* Legenda pequena embaixo — assinatura editorial */}
        <p
          className="reveal-on-scroll delay-300 mt-8 text-center text-[0.75rem] uppercase tracking-[0.14em] text-[#756b60]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          — Do caderno do atelier · Passe o mouse nos post-its para navegar
        </p>
      </div>
    </section>
  );
}
