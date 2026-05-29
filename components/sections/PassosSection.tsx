'use client';

import { MessageCircle, Calendar, Ruler, Box, Edit3, ClipboardCheck, LayoutTemplate, Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const passos: { num: string; title: string; description: string; Icon: LucideIcon }[] = [
  { num: '1', Icon: MessageCircle, title: 'Reunião de Briefing',    description: 'Entendemos a fundo suas necessidades e a essência do seu espaço.' },
  { num: '2', Icon: Calendar,      title: 'Proposta e Cronograma',  description: 'Alinhamento de escopo, prazos e direcionamento inicial.' },
  { num: '3', Icon: Ruler,         title: 'Levantamento Técnico',   description: 'Medição detalhada para garantir total precisão e evitar retrabalho.' },
  { num: '4', Icon: Box,           title: 'Estudo Preliminar',      description: 'Primeira leitura do projeto em 3D, validando o layout principal.' },
  { num: '5', Icon: Edit3,         title: 'Revisão de Projeto',     description: 'Ajustes a partir da apresentação inicial, refinando escolhas.' },
  { num: '6', Icon: ClipboardCheck,title: 'Consolidação Final',     description: 'Garantia de que tudo esteja alinhado antes da etapa técnica.' },
  { num: '7', Icon: LayoutTemplate, title: 'Projeto Executivo',     description: 'Documentação técnica para execução de móveis e obras.' },
  { num: '8', Icon: Download,      title: 'Entrega Digital',        description: 'Manual do cliente e detalhamentos técnicos em drive.' },
];

export function PassosSection() {
  return (
    <section
      id="passos"
      aria-label="Passo a Passo — Ana Laura Noronha"
      className="relative overflow-hidden py-20 px-6 sm:px-8 lg:py-28 lg:px-12 xl:px-14"
      style={{
        scrollMarginTop: '88px',
        background:
          'radial-gradient(circle at 80% 10%, rgba(255,255,255,0.72), transparent 30%), ' +
          'radial-gradient(circle at 20% 90%, rgba(221,211,198,0.28), transparent 36%), ' +
          'var(--color-background)',
      }}
    >
      <div className="max-w-[1510px] mx-auto">

        {/* Header */}
        <div className="mb-14 lg:mb-18 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 block bg-[#9a744d]" />
            <span
              className="text-[0.78rem] font-bold tracking-[0.12em] uppercase"
              style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
            >
              Passo a Passo
            </span>
            <span className="h-px w-8 block bg-[#9a744d]" />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(36px,4.5vw,68px)',
              lineHeight: 0.97,
              letterSpacing: '-0.055em',
              color: '#171411',
            }}
          >
            Cada etapa pensada
            <br />
            <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
              para o seu projeto.
            </em>
          </h2>

          <p
            className="mt-5 max-w-[560px] mx-auto"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(18px,2vw,26px)',
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              color: '#3a332d',
            }}
          >
            Da concepção arquitetônica ao último detalhe da marcenaria, um método integrado.
          </p>

          {/* Divisor */}
          <div
            className="mx-auto mt-10"
            style={{ height: '1px', width: '80px', background: 'rgba(154,116,77,0.40)' }}
          />

          {/* Título complementar — o que está contemplado */}
          <h3
            className="mx-auto mt-10 max-w-[840px]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(26px,3vw,42px)',
              lineHeight: 1.1,
              letterSpacing: '-0.045em',
              color: '#171411',
            }}
          >
            O que está contemplado no{' '}
            <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
              desenvolvimento do seu projeto
            </em>
          </h3>
        </div>

        {/* Grid 2 × 4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-0">
          {passos.map((p, i) => {
            // setas entre cards: não no final de cada linha (posição 3 e 7) e não no último
            const isLastInRow = (i + 1) % 4 === 0;
            const isLast = i === passos.length - 1;
            const showConnector = !isLastInRow && !isLast;

            return (
              <div key={p.num} className="relative flex">
                <PassoCard {...p} />

                {/* Conector horizontal com ponto correndo */}
                {showConnector && (
                  <div
                    aria-hidden="true"
                    className="absolute top-[38px] left-full z-10 hidden md:block"
                    style={{ width: '100%', transform: 'translateX(-50%)' }}
                  >
                    <div
                      className="passo-line relative h-[2px] w-full overflow-hidden"
                      style={{ borderRadius: '1px' }}
                    >
                      <span className="passo-dot" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PassoCard ────────────────────────────────────────────────────────────────

type PassoCardProps = {
  num: string;
  Icon: LucideIcon;
  title: string;
  description: string;
};

function PassoCard({ num, Icon, title, description }: PassoCardProps) {
  return (
    <div
      className="group flex flex-col items-center text-center px-3 lg:px-5 w-full"
    >
      {/* Círculo numerado */}
      <div
        className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full transition-all duration-500 group-hover:-translate-y-1"
        style={{
          background: '#f4ede2',
          border: '1.5px solid #d1c4b7',
          boxShadow: '0 8px 24px rgba(42,31,22,0.08), inset 0 1px 0 rgba(255,255,255,0.80)',
        }}
      >
        <Icon
          size={22}
          strokeWidth={1.5}
          aria-hidden="true"
          style={{ color: '#9a744d' }}
        />
        {/* Número pequeno */}
        <span
          className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[0.62rem] font-bold"
          style={{
            background: '#9a744d',
            color: '#fff',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0',
          }}
        >
          {num}
        </span>
      </div>

      {/* Título */}
      <h3
        className="mt-5"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'clamp(15px,1.4vw,18px)',
          lineHeight: 1.1,
          letterSpacing: '-0.035em',
          color: '#171411',
        }}
      >
        {title}
      </h3>

      {/* Descrição */}
      <p
        className="mt-2"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: '0.82rem',
          lineHeight: 1.55,
          letterSpacing: '-0.01em',
          color: '#756b60',
        }}
      >
        {description}
      </p>
    </div>
  );
}
