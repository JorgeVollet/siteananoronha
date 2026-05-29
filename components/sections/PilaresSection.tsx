'use client';

import { Ruler, Palette, ClipboardCheck, Clock } from 'lucide-react';

const pilares = [
  {
    Icon: Ruler,
    title: 'Projeto Arquitetônico',
    description: 'Concept, planta base, visualização 3D e documentação técnica.',
    num: '01',
  },
  {
    Icon: Palette,
    title: 'Design de Interiores',
    description: 'Moodboard, seleção de acabamentos e mobiliário integrado.',
    num: '02',
  },
  {
    Icon: ClipboardCheck,
    title: 'Consultoria Técnica',
    description: 'Aprovações, normas e engenharia de estruturas e sistemas.',
    num: '03',
  },
  {
    Icon: Clock,
    title: 'Gestão de Obra',
    description: 'Cronogramas, fiscalização, fornecedores e entrega sem surpresas.',
    num: '04',
  },
];

export function PilaresSection() {
  return (
    <section
      id="pilares"
      aria-label="Pilares de Atuação — Ana Laura Noronha"
      className="relative overflow-hidden py-20 px-6 sm:px-8 lg:py-24 lg:px-12 xl:px-14"
      style={{
        scrollMarginTop: '88px',
        backgroundImage: `linear-gradient(rgba(245,240,233,0.78), rgba(245,240,233,0.78)), url('/fundosecaopilares.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-[1510px] mx-auto">

        {/* Container alinhado: header (centralizado em cima das caixas) + grid 2x2 */}
        <div className="max-w-[640px] mx-auto lg:mx-0 lg:ml-[230px]">

          {/* Header — centralizado em cima das caixas */}
          <div className="mb-12 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 block bg-[#9a744d]" />
              <span
                className="text-[0.78rem] font-bold tracking-[0.12em] uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
              >
                Pilares de Atuação
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
              Quando tudo é integrado
              <br />
              <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
                desde o início
              </em>
            </h2>

            <p
              className="mt-5 max-w-[520px] mx-auto"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '1rem',
                lineHeight: 1.6,
                letterSpacing: '-0.015em',
                color: '#5a5047',
              }}
            >
              Do layout aos acabamentos — porque engenharia e móveis sob medida não podem rodar no improviso.
            </p>
          </div>

          {/* Grid 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pilares.map((p) => (
              <PilarCard key={p.num} {...p} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── PilarCard ────────────────────────────────────────────────────────────────

type PilarCardProps = {
  Icon: React.ElementType;
  title: string;
  description: string;
  num: string;
};

function PilarCard({ Icon, title, description, num }: PilarCardProps) {
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        aspectRatio: '1.4 / 1',
        borderRadius: 'var(--radius-frame)',
        background: '#f1ebe3',
        border: '1px solid rgba(227,214,198,0.6)',
        transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(0.99)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 18px 44px rgba(154,116,77,0.15)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Glow rotativo taupe na borda */}
      <div
        className="pilar-glow"
        aria-hidden="true"
        style={{ borderRadius: 'var(--radius-frame)' }}
      />

      {/* Camada de conteúdo */}
      <div
        className="absolute inset-[2px] flex flex-col p-5 lg:p-6 transition-colors duration-400 group-hover:bg-[#f8f2ea]"
        style={{
          borderRadius: 'calc(var(--radius-frame) - 2px)',
          background: '#f1ebe3',
          zIndex: 1,
        }}
      >
        {/* Topo: ícone + número decorativo */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-[8px]"
            style={{
              background: '#f4ede2',
              border: '1px solid #d1c4b7',
              color: '#9a744d',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.72)',
            }}
          >
            <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(28px,3vw,42px)',
              lineHeight: 1,
              letterSpacing: '-0.06em',
              color: 'rgba(154,116,77,0.13)',
            }}
          >
            {num}
          </span>
        </div>

        {/* Título */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(17px,1.6vw,22px)',
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
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
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
            color: '#5a5047',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
