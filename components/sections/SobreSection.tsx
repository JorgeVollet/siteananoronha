// Schema de conteúdo: lib/content-schema.ts → section "sobre_novo"
// Edição via: /admin/conteudo → Sobre (a Ana Laura)

import { getSectionContent } from '@/lib/site-content';

export async function SobreSection() {
  const sobre = await getSectionContent('sobre_novo');

  const eyebrow = sobre.eyebrow ?? 'Sobre';
  const titulo = sobre.titulo ?? 'Olá, eu sou a Ana Laura.';
  const subtitulo = sobre.subtitulo ?? 'Engenheira Civil & Curadora de Interiores';
  const corpo =
    sobre.corpo ??
    `Formada pela Universidade do Vale do Itajaí — SC, sou Engenheira Civil apaixonada por transformar sonhos em realidade. Em 11 anos de trajetória pude conhecer várias áreas dessa linda profissão.

Pós-graduanda em Planejamento e Gerenciamento de Obra, hoje trabalho em várias frentes — projetos residenciais, comerciais, industriais — e também com curadoria de transformação de interiores e marcenaria especializada.

Combinando criatividade, inovação e técnica, sinto-me à vontade para criar espaços completos e eficientes que inspiram e refletem a personalidade e os objetivos de meus clientes.`;
  const imagem = sobre.imagem ?? '/img/7.png';

  const paragrafos = corpo.split(/\n\s*\n|\n/).filter((p) => p.trim());

  return (
    <section
      id="sobre"
      aria-label="Sobre Ana Laura Noronha"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        scrollMarginTop: '88px',
      }}
    >
      {/* Foto fullbleed background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imagem}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      />

      {/* Overlay editorial — escurece as bordas, deixa o centro aberto para a foto */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(90deg, rgba(17,13,10,0.75) 0%, rgba(17,13,10,0.30) 22%, rgba(17,13,10,0.08) 40%, rgba(17,13,10,0.08) 60%, rgba(17,13,10,0.30) 78%, rgba(17,13,10,0.75) 100%),
            linear-gradient(180deg, transparent 60%, rgba(17,13,10,0.40) 100%)
          `,
        }}
      />

      {/* Container: dois cards flutuantes espelhados (esquerda + direita) */}
      <div
        className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1510px',
          margin: '0 auto',
          padding: 'clamp(64px,10vh,120px) clamp(24px,4vw,56px)',
        }}
      >
        {/* ══ CARD ESQUERDO — Identidade ══ */}
        <div
          className="lg:translate-x-[30px] lg:-translate-y-[20px]"
          style={{
            width: '100%',
            maxWidth: '460px',
            background: 'rgba(245,240,233,0.07)',
            border: '1px solid rgba(215,196,175,0.22)',
            borderRadius: '1.5rem',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            padding: 'clamp(32px,4vw,48px)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
        >
          {/* Eyebrow */}
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#caa57c',
              }}
            >
              {eyebrow}
            </span>
            <span
              style={{
                display: 'block',
                height: '1px',
                width: '40px',
                background: 'rgba(202,165,124,0.60)',
              }}
            />
          </div>

          {/* Título */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(36px,4.5vw,68px)',
              lineHeight: 0.95,
              letterSpacing: '-0.055em',
              color: '#ffffff',
              margin: '0 0 20px',
            }}
          >
            {titulo}
          </h2>

          {/* Separador */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(202,165,124,0.50), transparent)',
              marginBottom: '20px',
            }}
          />

          {/* Subtítulo */}
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(16px,1.8vw,22px)',
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              color: '#caa57c',
              margin: 0,
            }}
          >
            {subtitulo}
          </p>
        </div>

        {/* ══ CARD DIREITO — Biografia ══ */}
        <div
          className="lg:translate-x-[60px] lg:translate-y-[30px]"
          style={{
            width: '100%',
            maxWidth: '460px',
            background: 'rgba(245,240,233,0.07)',
            border: '1px solid rgba(215,196,175,0.22)',
            borderRadius: '1.5rem',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            padding: 'clamp(32px,4vw,48px)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
        >
          {/* Parágrafos do corpo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {paragrafos.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: 'clamp(0.88rem,1.1vw,1rem)',
                  lineHeight: 1.72,
                  letterSpacing: '-0.01em',
                  color: 'rgba(255,255,255,0.82)',
                  margin: 0,
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Separador */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(202,165,124,0.50), transparent)',
              margin: '32px 0 24px',
            }}
          />

          {/* Assinatura */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span
              style={{
                display: 'block',
                height: '1px',
                width: '32px',
                background: 'rgba(202,165,124,0.50)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(18px,2vw,26px)',
                letterSpacing: '-0.04em',
                color: '#caa57c',
              }}
            >
              Ana Noronha.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
