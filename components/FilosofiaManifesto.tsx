// Schema de conteúdo: lib/content-schema.ts → section "sobre"
// Edição via: /admin/conteudo → Sobre / Manifesto
'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useRevealOnScroll } from '@/lib/useRevealOnScroll';

type Props = {
  tituloSecao?: string;
  corpo?: string;
  imagemUrl?: string;
};

export default function FilosofiaManifesto({ tituloSecao, corpo, imagemUrl }: Props) {
  const sectionRef = useRevealOnScroll();
  const photoSrc = imagemUrl ?? '/img/7.png';

  const corpoParagraphs = corpo
    ? corpo.split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean)
    : null;

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      aria-label="Manifesto — Ana Laura Noronha"
      className="relative overflow-hidden py-16 px-6 sm:px-8 md:py-20 lg:py-28 lg:px-12 xl:px-14"
      style={{
        scrollMarginTop: '88px',
        background:
          'radial-gradient(circle at 12% 16%, rgba(255,255,255,0.82), transparent 30%), ' +
          'radial-gradient(circle at 82% 10%, rgba(221,211,198,0.34), transparent 34%), ' +
          'var(--color-background)',
      }}
    >
      <div className="max-w-[1510px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.75fr] gap-14 xl:gap-20 items-center">

          {/* ── COLUNA ESQUERDA: Manifesto ── */}
          <div className="order-2 lg:order-1">

            {/* Eyebrow */}
            <div className="reveal-on-scroll delay-150 mb-5 flex flex-col items-start gap-3">
              <span
                className="text-[0.82rem] font-bold tracking-[0.12em] uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
              >
                {tituloSecao ?? 'Manifesto'}
              </span>
              <span className="h-px w-12 block bg-[#9f7851]" />
            </div>

            {/* Setup — em segundo plano, texto menor e discreto */}
            <p
              className="reveal-on-scroll"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(20px, 2.2vw, 32px)',
                lineHeight: 1.2,
                letterSpacing: '-0.025em',
                color: '#756b60',
                marginBottom: '14px',
              }}
            >
              Projetos não fracassam por falta de criatividade —
            </p>

            {/* Punchline — o verdadeiro protagonista, fluindo natural */}
            <h2
              className="reveal-on-scroll delay-150"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(44px, 5.4vw, 88px)',
                lineHeight: 0.95,
                letterSpacing: '-0.06em',
                color: '#151310',
              }}
            >
              <span style={{ color: 'var(--color-primary)' }}>Fracassam</span>{' '}
              por{' '}
              <span style={{ color: 'var(--color-primary)' }}>falta</span>{' '}
              de{' '}
              <span style={{ color: 'var(--color-primary)' }}>método.</span>
            </h2>

            {/* Divisor */}
            <div className="reveal-on-scroll delay-300 my-7 h-px w-16 bg-[#d8c9b8]" />

            {/* Corpo do manifesto */}
            <div
              className="reveal-on-scroll delay-500 space-y-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '1.15rem',
                lineHeight: 1.72,
                letterSpacing: '-0.025em',
                color: '#3a332d',
              }}
            >
              {corpoParagraphs ? (
                corpoParagraphs.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <>
                  <p>
                    Engenheira civil e projetista de interiores, com método integrado que une arquitetura, gestão de obra e marcenaria sob medida.
                  </p>
                  <p>
                    Referências soltas. Decisões sem critério. Dúvidas que crescem conforme o projeto avança. Quando tudo é integrado desde o início — do layout aos acabamentos — o resultado reflete exatamente o que foi pensado. Aqui, cada etapa é orientada. Cada escolha faz sentido. Cada detalhe conversa com o outro. Porque engenharia e móveis sob medida não podem rodar no improviso.
                  </p>
                </>
              )}
            </div>

            {/* CTA */}
            <div className="reveal-on-scroll delay-700 mt-10">
              <a
                href="#orcamento"
                aria-label="Solicitar orçamento agora"
                className="
                  inline-flex h-[66px] items-center justify-center gap-4
                  rounded-[12px] bg-[#171614] px-8
                  text-[1rem] font-bold text-white
                  shadow-[0_24px_54px_rgba(28,22,17,0.18)]
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:bg-[#29231f]
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-[#a67b4f]
                  sm:min-w-[260px]
                "
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Solicitar orçamento
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* ── COLUNA DIREITA: Foto ── */}
          <div className="order-1 lg:order-2 reveal-on-scroll delay-300 max-w-[420px] w-full mx-auto lg:max-w-none lg:mx-0 lg:justify-self-end">
            <div
              className="relative aspect-[4/5] overflow-hidden"
              style={{
                borderRadius: 'var(--radius-frame)',
                border: '1px solid #dfd4c8',
                boxShadow: '0 34px 90px rgba(71,56,42,0.17)',
              }}
            >
              <Image
                src={photoSrc}
                alt="Ana Laura Noronha — engenheira civil e projetista de interiores e marcenaria sob medida"
                fill
                quality={90}
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 55vw"
                className="object-cover object-top"
              />

              {/* Overlay gradiente no rodapé */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(71,56,42,0.18), transparent)',
                }}
              />

              {/* Legenda pill */}
              <div
                className="absolute bottom-5 left-5 z-20 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.82rem] font-extrabold uppercase"
                style={{
                  border: '1px solid #d8c9b8',
                  background: '#eee5da',
                  letterSpacing: '0.08em',
                  color: '#9a744d',
                  boxShadow: '0 10px 22px rgba(42,31,22,0.16), inset 0 1px 0 rgba(255,255,255,0.68)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                ENG. CIVIL · PROJETISTA
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
