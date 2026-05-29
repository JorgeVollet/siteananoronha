// Schema de conteúdo: lib/content-schema.ts → section "servicos"
// Edição via: /admin/conteudo → Seção de Serviços
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Ruler,
  Palette,
  ClipboardCheck,
  Clock,
  Hammer,
  Layers,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRevealOnScroll } from '@/lib/useRevealOnScroll';
import { trackCtaClick } from '@/lib/track-cta';

// ---------------------------------------------------------------------------
// Analytics stub — integra com gtag se disponível, loga em dev
// ---------------------------------------------------------------------------
const trackEvent = (event: string, props?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    if (typeof w.gtag === 'function') {
      w.gtag('event', event, props);
    }
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('[track]', event, props);
  }
};

// ---------------------------------------------------------------------------
// Dados dos serviços
// ---------------------------------------------------------------------------
interface ServiceItem {
  n: string;
  Icon: LucideIcon;
  id: string;
  title: string;
  body: string;
}

const SERVICES: ServiceItem[] = [
  {
    n: '01',
    Icon: Ruler,
    id: 'arquitetonico',
    title: 'Projeto Arquitetônico',
    body: 'Concepção e detalhamento de estruturas que unem funcionalidade, estética e sustentabilidade, criando espaços que refletem sua identidade com precisão técnica e autoral. O ponto de partida para o seu sonho.',
  },
  {
    n: '02',
    Icon: Palette,
    id: 'interiores',
    title: 'Design de Interiores',
    body: 'Execução de projetos residenciais e corporativos de alto padrão, harmonizando cada detalhe para uma experiência espacial única e atemporal. Da planta ao toque final.',
  },
  {
    n: '03',
    Icon: ClipboardCheck,
    id: 'consultoria-tecnica',
    title: 'Consultoria Técnica',
    body: 'Avaliação detalhada de normas, sistemas construtivos e integração de sistemas (como automação), oferecendo suporte para escolhas inteligentes e preventivas durante todo o processo — com precisão em metragens, viabilidade, segurança e economia.',
  },
  {
    n: '04',
    Icon: Clock,
    id: 'gestao-obra',
    title: 'Gestão de Obra',
    body: 'Acompanhamento rigoroso de cronogramas, fornecedores e orçamentos, assegurando a fidelidade ao projeto original e minimizando imprevistos para uma entrega impecável, sem estresse para você.',
  },
  {
    n: '05',
    Icon: Hammer,
    id: 'marcenaria',
    title: 'Marcenaria Sob Medida',
    body: 'Móveis planejados com acabamento autoral, integrados ao projeto arquitetônico desde a primeira linha. Cada peça desenhada para conversar com o espaço e com o cliente — nada genérico, nada improvisado.',
  },
  {
    n: '06',
    Icon: Layers,
    id: 'materiais',
    title: 'Consultoria de Materiais',
    body: 'Análise estratégica e técnica de espaços e materiais, garantindo soluções otimizadas, precisão em metragens e viabilidade para cada etapa do seu projeto, com foco em segurança e economia.',
  },
];

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------
type Props = {
  subtitulo?: string;
  imagemAna?: string;
  whatsapp?: string;
};

export default function Servicos({ subtitulo, imagemAna, whatsapp }: Props) {
  const phoneRaw = whatsapp ?? '5521996621363';
  const whatsappUrl = `https://wa.me/${phoneRaw}?text=${encodeURIComponent('Olá Ana, gostaria de conversar sobre um projeto.')}`;

  const sectionRef = useRevealOnScroll();
  const viewedRef = useRef(false);
  const prevIndexRef = useRef(0);

  // Embla carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: false,
    containScroll: 'trimSnaps',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  // Sincronizar estado com Embla
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const current = emblaApi.selectedScrollSnap();
      const prev = prevIndexRef.current;

      setSelectedIndex(current);
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());

      if (current !== prev) {
        trackEvent('services_carousel_navigate', {
          direction: current > prev ? 'next' : 'prev',
          from_index: prev,
          to_index: current,
        });
        prevIndexRef.current = current;
      }
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  // Analytics: dispara services_carousel_view quando a seção entra no viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          trackEvent('services_carousel_view');
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      id="servicos"
      aria-label="Serviços — Ana Laura Noronha"
      className="relative overflow-hidden py-16 px-6 sm:px-8 md:py-20 lg:py-28 lg:px-12 xl:px-14"
      style={{
        scrollMarginTop: '88px',
        background:
          'radial-gradient(circle at 88% 14%, rgba(255,255,255,0.78), transparent 32%), ' +
          'radial-gradient(circle at 14% 80%, rgba(221,211,198,0.30), transparent 36%), ' +
          'var(--color-background)',
      }}
    >
      <div className="max-w-[1510px] mx-auto">
        {/*
         * Grid assimétrico: coluna editorial (com carrossel) + coluna foto.
         * items-start alinha ambas ao topo — sem espaço vazio ao lado da foto.
         */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-12 items-start">

          {/* ══ COLUNA ESQUERDA — Eyebrow + Headline + Subtítulo + Carrossel ══ */}
          <div className="order-2 lg:order-1 flex flex-col">

            {/* Eyebrow */}
            <div className="reveal-on-scroll delay-150 mb-5 flex flex-col items-start gap-3">
              <span
                className="text-[0.95rem] font-bold tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
              >
                Serviços
              </span>
              <span className="h-px w-12 block bg-[#9f7851]" />
            </div>

            {/* Headline */}
            <h2
              className="reveal-on-scroll max-w-[640px]"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(36px, 4.2vw, 66px)',
                lineHeight: 0.98,
                letterSpacing: '-0.055em',
                color: '#171411',
              }}
            >
              Você contrata uma vez —
              <br />
              <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
                e não pensa mais nisso.
              </em>
            </h2>

            {/* Subtítulo */}
            <p
              className="reveal-on-scroll delay-150 mt-6 max-w-[560px]"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(18px, 2.2vw, 26px)',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: '#3a332d',
              }}
            >
              {subtitulo ?? 'Engenharia, interiores e marcenaria sob medida na mesma mão. Menos fornecedores, mais resultado.'}
            </p>

            {/* CTA dark */}
            <div className="reveal-on-scroll delay-150 mt-8 mb-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick('servicos')}
                className="inline-flex h-[54px] items-center gap-3 rounded-[12px] bg-[#171614] px-7 text-[0.92rem] font-bold tracking-[-0.01em] text-white shadow-[0_18px_44px_rgba(28,22,17,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#29231f]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Falar com a Ana
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            {/* ── CARROSSEL ── */}
            <div className="reveal-on-scroll delay-300 relative">

              {/* Embla viewport */}
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex gap-5">
                  {SERVICES.map(({ n, id, Icon, title, body }) => (
                    <article
                      key={n}
                      className={cn(
                        // Card base — layout e visual Atelier × Summit
                        'premium-panel',
                        'group/card relative flex shrink-0 flex-col',
                        'rounded-[16px]',
                        'border border-[#d8c9b8] bg-[#eee5da] p-5 lg:p-6',
                        'transition-all duration-500 hover:-translate-y-1',
                        // Mobile: 85% → 1 card + peek; sm+: 2 cards visíveis
                        'w-[85%] sm:w-[calc(50%_-_10px)]',
                      )}
                    >
                      {/* Ícone + numeração */}
                      <header className="mb-8 flex items-start justify-between">
                        <span
                          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px]"
                          style={{
                            border: '1px solid #d1c4b7',
                            background: '#f8f2ea',
                            color: '#9d7650',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.72)',
                          }}
                        >
                          <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <span
                          className="text-[0.82rem] font-bold tracking-[0.08em] uppercase"
                          style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
                        >
                          {n} / 06
                        </span>
                      </header>

                      {/* Título */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 400,
                          fontSize: 'clamp(18px, 1.6vw, 22px)',
                          lineHeight: 1.05,
                          letterSpacing: '-0.045em',
                          color: '#171411',
                        }}
                      >
                        {title}
                      </h3>

                      {/* Corpo */}
                      <p
                        className="mt-2 flex-1 line-clamp-3"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 500,
                          fontSize: '0.85rem',
                          lineHeight: 1.55,
                          letterSpacing: '-0.015em',
                          color: '#3a332d',
                        }}
                      >
                        {body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              {/* ── Controles: dots (esquerda) + contador + setas (direita) ── */}
              <div className="mt-8 flex items-center justify-between">

                {/* Dots indicadores */}
                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Navegação de serviços"
                >
                  {scrollSnaps.map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={selectedIndex === i}
                      aria-label={`Ir para serviço ${i + 1} de ${SERVICES.length}`}
                      onClick={() => {
                        trackEvent('services_carousel_navigate', {
                          direction: 'dot',
                          from_index: selectedIndex,
                          to_index: i,
                        });
                        scrollTo(i);
                      }}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-300',
                        selectedIndex === i
                          ? 'w-8 bg-[#9a744d]'
                          : 'w-4 bg-[#d1c4b7] hover:bg-[#c6b49f]',
                      )}
                    />
                  ))}
                </div>

                {/* Contador + Setas de navegação */}
                <div className="flex items-center gap-3">
                  <span
                    className="hidden sm:block text-[0.82rem] font-bold tracking-[0.08em] uppercase"
                    style={{ fontFamily: 'var(--font-body)', color: '#756b60' }}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                    {String(SERVICES.length).padStart(2, '0')}
                  </span>

                  <button
                    onClick={() => {
                      trackEvent('services_carousel_navigate', {
                        direction: 'prev',
                        from_index: selectedIndex,
                        to_index: Math.max(0, selectedIndex - 1),
                      });
                      scrollPrev();
                    }}
                    disabled={!canScrollPrev}
                    aria-label="Serviço anterior"
                    className={cn(
                      'group/btn flex h-12 w-12 items-center justify-center rounded-full',
                      'border border-[#d1c4b7] bg-[#f1ebe3] text-[#1c1915]',
                      'transition-all duration-300',
                      'hover:-translate-y-0.5 hover:border-[#c6b49f] hover:bg-[#f8f2ea]',
                      'disabled:opacity-40 disabled:pointer-events-none',
                    )}
                  >
                    <ArrowLeft
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/btn:-translate-x-0.5"
                    />
                  </button>

                  <button
                    onClick={() => {
                      trackEvent('services_carousel_navigate', {
                        direction: 'next',
                        from_index: selectedIndex,
                        to_index: Math.min(SERVICES.length - 1, selectedIndex + 1),
                      });
                      scrollNext();
                    }}
                    disabled={!canScrollNext}
                    aria-label="Próximo serviço"
                    className={cn(
                      'group/btn flex h-12 w-12 items-center justify-center rounded-full',
                      'bg-[#171614] text-white',
                      'transition-all duration-300',
                      'hover:-translate-y-0.5 hover:bg-[#29231f]',
                      'disabled:opacity-40 disabled:pointer-events-none',
                    )}
                  >
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ══ COLUNA DIREITA — Foto editorial da Ana ══ */}
          <div className="order-1 lg:order-2 reveal-on-scroll delay-300 w-full mx-auto lg:mx-0">
            <div
              className="relative w-full overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[640px] xl:h-[720px]"
              style={{
                borderRadius: 'var(--radius-frame)',
                border: '1px solid #dfd4c8',
                background: '#d7cabc',
                boxShadow: '0 34px 90px rgba(71,56,42,0.17)',
              }}
            >
              <Image
                src={imagemAna ?? '/img/9.png'}
                alt="Ana Laura Noronha — engenheira civil e projetista em seu atelier"
                fill
                quality={90}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 38vw"
                className="object-cover object-center"
              />

              {/* Overlay gradiente inferior */}
              <div
                className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(33,25,19,0.30), rgba(33,25,19,0.08) 50%, transparent)',
                }}
              />

              {/* Badge credenciais */}
              <div
                className="absolute bottom-5 left-5 z-20 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.82rem] font-extrabold uppercase"
                style={{
                  border: '1px solid #d8c9b8',
                  background: '#eee5da',
                  letterSpacing: '0.08em',
                  color: '#9a744d',
                  boxShadow:
                    '0 10px 22px rgba(42,31,22,0.16), inset 0 1px 0 rgba(255,255,255,0.68)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Engenharia · Interiores · Marcenaria
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
