import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import {
  SKETCH_STEPS,
  getSketchStep,
  getSketchStepSlugs,
} from '@/lib/sketch-content';
import { SITE_CONFIG } from '@/lib/seo/site-config';
import { getSectionContent } from '@/lib/site-content';

// Pré-render das 6 páginas em build time
export async function generateStaticParams() {
  return getSketchStepSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const step = getSketchStep(params.slug);
  if (!step) return {};

  const title = `${step.eyebrow} ${step.title}`;
  const url = `${SITE_CONFIG.url}/sketch/${step.slug}`;

  return {
    title: `${step.postItLabel} — Sketch de Ideias | ${SITE_CONFIG.name}`,
    description: step.intro,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description: step.intro,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: step.intro,
    },
  };
}

export default async function SketchStepPage({
  params,
}: {
  params: { slug: string };
}) {
  const step = getSketchStep(params.slug);
  if (!step) notFound();

  // WhatsApp do footer para o CTA
  const footer = await getSectionContent('footer');
  const whatsapp = footer.whatsapp ?? '5555999942637';
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(step.ctaMessage)}`;

  // Steps vizinhos (anterior/próximo) — para navegar entre eles
  const currentIdx = SKETCH_STEPS.findIndex((s) => s.slug === step.slug);
  const prev = currentIdx > 0 ? SKETCH_STEPS[currentIdx - 1] : null;
  const next =
    currentIdx < SKETCH_STEPS.length - 1
      ? SKETCH_STEPS[currentIdx + 1]
      : null;
  const outrosSteps = SKETCH_STEPS.filter((s) => s.slug !== step.slug);

  return (
    <main
      id="sketch-step"
      className="scroll-mt-[88px] bg-[#f5f0e9] px-6 pb-24 pt-[152px] sm:px-8 lg:px-12 lg:pb-32 lg:pt-[184px] xl:px-14"
      style={{
        background:
          'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.55), transparent 45%), ' +
          'radial-gradient(circle at 85% 80%, rgba(221,211,198,0.35), transparent 45%), ' +
          'var(--color-background)',
      }}
    >
      <article className="mx-auto max-w-[820px]">

        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#756b60]">
          <Link
            href="/#sketch"
            className="flex items-center gap-1.5 transition-colors hover:text-[#9a744d]"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={2} />
            Sketch de Ideias
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#9a744d]">{step.postItLabel}</span>
        </div>

        {/* Step number + eyebrow */}
        <div className="mb-6 flex items-center gap-4">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3a332d] text-[#3a332d]"
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontWeight: 600,
              fontSize: '20px',
            }}
          >
            {step.step}
          </span>
          <div>
            <span
              className="block text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#9a744d]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {step.postItSubLabel}
            </span>
            <span
              className="block mt-1 text-[1rem] italic text-[#3a332d]"
              style={{ fontFamily: 'var(--font-handwriting)', fontWeight: 500 }}
            >
              {step.eyebrow}
            </span>
          </div>
        </div>

        {/* Título grande */}
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: '#171411',
            marginBottom: '32px',
          }}
        >
          {step.title}
        </h1>

        {/* Sublinhado desenhado à mão sutil */}
        <svg
          width="180"
          height="10"
          viewBox="0 0 180 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-10"
        >
          <path
            d="M2 6 Q 30 2, 60 5 T 120 4 T 178 6"
            stroke="#9a744d"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Intro em destaque */}
        <p
          className="mb-10 font-serif italic"
          style={{
            fontSize: 'clamp(1.2rem, 1.75vw, 1.55rem)',
            lineHeight: 1.4,
            color: '#3a332d',
          }}
        >
          {step.intro}
        </p>

        {/* Corpo */}
        <div className="space-y-6">
          {step.body.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '1.05rem',
                lineHeight: 1.72,
                letterSpacing: '-0.01em',
                color: '#3a332d',
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Blockquote da aspa */}
        <blockquote
          className="my-14 border-l-2 pl-6 py-2"
          style={{
            borderColor: '#9a744d',
          }}
        >
          <p
            className="font-serif italic"
            style={{
              fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)',
              lineHeight: 1.35,
              color: '#171411',
            }}
          >
            “{step.quote}”
          </p>
          <cite
            className="mt-3 block text-[0.75rem] uppercase tracking-[0.16em] text-[#9a744d] not-italic"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
          >
            — Ana Laura Noronha
          </cite>
        </blockquote>

        {/* CTA card */}
        <div
          className="rounded-[16px] border p-8 lg:p-10"
          style={{
            background: '#eee5da',
            borderColor: '#d8c9b8',
            boxShadow: '0 20px 50px rgba(23,20,17,0.08)',
          }}
        >
          <p
            className="font-serif italic mb-6"
            style={{
              fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
              lineHeight: 1.4,
              color: '#3a332d',
            }}
          >
            Se algo aqui fez sentido pra você, posso te ajudar a organizar isso
            na prática — sem compromisso na primeira conversa.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-[12px] bg-[#171614] px-7 py-4 text-[0.9rem] font-bold tracking-[-0.01em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#29231f]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {step.ctaLabel}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>

        {/* Navegação anterior/próximo */}
        <div className="mt-16 flex flex-col gap-6 border-t border-[#d8c9b8] pt-8 sm:flex-row sm:items-center sm:justify-between">
          {prev ? (
            <Link
              href={`/sketch/${prev.slug}`}
              className="group flex items-center gap-2 text-[0.85rem] text-[#3a332d] transition-colors hover:text-[#9a744d]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                strokeWidth={2}
              />
              <span>
                <span className="block text-[0.68rem] uppercase tracking-[0.14em] text-[#9a744d]">
                  Anterior · {prev.step}
                </span>
                <span
                  className="block font-serif italic"
                  style={{ fontSize: '1.05rem', color: '#171411' }}
                >
                  {prev.postItLabel}
                </span>
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}

          {next ? (
            <Link
              href={`/sketch/${next.slug}`}
              className="group flex items-center gap-2 text-right text-[0.85rem] text-[#3a332d] transition-colors hover:text-[#9a744d]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              <span>
                <span className="block text-[0.68rem] uppercase tracking-[0.14em] text-[#9a744d]">
                  Próximo · {next.step}
                </span>
                <span
                  className="block font-serif italic"
                  style={{ fontSize: '1.05rem', color: '#171411' }}
                >
                  {next.postItLabel}
                </span>
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </div>

        {/* Outros steps do sketch */}
        <section className="mt-20 border-t border-[#d8c9b8] pt-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#9a744d]" aria-hidden="true" />
            <span
              className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#9a744d]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Outras etapas do sketch
            </span>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {outrosSteps.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/sketch/${s.slug}`}
                  className="group flex items-center gap-4 rounded-[12px] border border-[#d8c9b8] bg-[#f5f0e9] p-4 transition-all hover:-translate-y-0.5 hover:border-[#9a744d]"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3a332d] text-[#3a332d]"
                    style={{
                      fontFamily: 'var(--font-handwriting)',
                      fontWeight: 600,
                      fontSize: '15px',
                    }}
                  >
                    {s.step}
                  </span>
                  <div className="flex-1">
                    <div
                      className="font-serif text-[1.05rem] leading-tight text-[#171411] transition-colors group-hover:text-[#9a744d]"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {s.postItLabel}
                    </div>
                    <div className="mt-0.5 text-[0.78rem] text-[#756b60]">
                      {s.postItSubLabel}
                    </div>
                  </div>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-[#9a744d] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>

      </article>
    </main>
  );
}
