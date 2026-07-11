'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { getCategoryConfig } from '@/lib/articles-constants';
import type { ArticleListItem } from '@/lib/articles';
import { cn } from '@/lib/utils';

type Category = 'blog' | 'normas' | 'curiosidades' | 'sketch';

type Props = {
  blog: ArticleListItem[];
  normas: ArticleListItem[];
  curiosidades: ArticleListItem[];
  sketch: ArticleListItem[];
};

/**
 * Carrossel editorial da homepage.
 *
 * Layout:
 *  ┌──────────────────────────────────────────────────────────────┐
 *  │  — CONTEÚDO EDITORIAL                                        │
 *  │  Do meu caderno de projetos                    [Ver todos ↗] │
 *  │  para a sua obra.                                            │
 *  ├──────────────────────────────────────────────────────────────┤
 *  │  [Blog] [Normas] [Curiosidades] [Sketch]           01 / 04   │
 *  ├──────────────────────────────────────────────────────────────┤
 *  │  [<]  ┌─featured─┐  ┌─small─┐   [>]                          │
 *  │       │          │  │       │                                │
 *  │       └──────────┘  ├───────┤                                │
 *  │                     │       │                                │
 *  │                     └───────┘                                │
 *  └──────────────────────────────────────────────────────────────┘
 *
 * Categorias vazias ficam com pill em opacity reduzida, mas não bloqueia
 * navegação — se clicar em uma vazia, mostra estado "Em breve" elegante.
 */

// Ordem fixa das categorias no carrossel
const CATEGORY_ORDER: Category[] = ['blog', 'normas', 'curiosidades', 'sketch'];

export function EditorialCarousel({
  blog,
  normas,
  curiosidades,
  sketch,
}: Props) {
  const categoryData = useMemo(
    () => ({
      blog,
      normas,
      curiosidades,
      sketch,
    }),
    [blog, normas, curiosidades, sketch],
  );

  // Começa na primeira categoria que TEM artigos
  const firstWithContent =
    CATEGORY_ORDER.find((c) => categoryData[c].length > 0) ?? 'blog';

  const [activeCategory, setActiveCategory] =
    useState<Category>(firstWithContent);
  // featuredIndex é a posição do artigo em destaque DENTRO da categoria ativa
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const activeIndex = CATEGORY_ORDER.indexOf(activeCategory);
  const activeArticles = categoryData[activeCategory];
  const cfg = getCategoryConfig(activeCategory);
  const total = activeArticles.length;

  // Featured atual + até 2 smalls seguintes (com wrapping via módulo)
  const featured = total > 0 ? activeArticles[featuredIndex % total] : null;
  const smalls = total > 1
    ? Array.from({ length: Math.min(2, total - 1) }, (_, i) => {
        return activeArticles[(featuredIndex + 1 + i) % total];
      })
    : [];

  function goToPrev() {
    if (total === 0) return;
    setDirection('left');
    setFeaturedIndex((prev) => (prev - 1 + total) % total);
  }

  function goToNext() {
    if (total === 0) return;
    setDirection('right');
    setFeaturedIndex((prev) => (prev + 1) % total);
  }

  function goToCategory(cat: Category) {
    const targetIndex = CATEGORY_ORDER.indexOf(cat);
    setDirection(targetIndex > activeIndex ? 'right' : 'left');
    setActiveCategory(cat);
    setFeaturedIndex(0); // reset ao trocar categoria
  }

  // Promover um artigo da lista direita a featured (com direção baseada em índice)
  function promoteToFeatured(articleId: string) {
    const targetIdx = activeArticles.findIndex((a) => a.id === articleId);
    if (targetIdx === -1 || targetIdx === featuredIndex) return;
    setDirection(targetIdx > featuredIndex ? 'right' : 'left');
    setFeaturedIndex(targetIdx);
  }

  return (
    <section
      id="conteudo"
      aria-label="Conteúdo editorial de Ana Laura Noronha"
      className="scroll-mt-[88px] bg-[#eee5da] px-6 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-14"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* ── HEADER EDITORIAL ─────────────────────────────────────── */}
        <div className="mb-10 grid grid-cols-1 items-end gap-8 lg:mb-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-px w-8 bg-[#9a744d]"
                aria-hidden="true"
              />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#9a744d]">
                Conteúdo editorial
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.05] tracking-[-0.045em] text-[#171411]">
              Do meu caderno de projetos
              <br />
              <em className="not-italic italic font-serif text-[#9a744d]">
                para a sua obra.
              </em>
            </h2>
            <p className="mt-5 max-w-[560px] font-serif italic text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.4] text-[#3a332d]">
              Reflexões, guias práticos, normas técnicas explicadas e o
              caderno criativo — tudo em um lugar.
            </p>
          </div>

          <Link
            href={cfg?.urlPath ?? '/blog'}
            className="group inline-flex items-center gap-2 self-start rounded-full border border-[#9a744d]/40 bg-transparent px-5 py-3 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#9a744d] transition-all duration-300 hover:border-[#9a744d] hover:bg-[#9a744d] hover:text-white lg:self-end"
          >
            Ver todo o {cfg?.label.toLowerCase() ?? 'blog'}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>

        {/* ── ABAS DE CATEGORIAS + CONTADOR ────────────────────────── */}
        <div className="mb-10 flex flex-col items-start gap-4 border-y border-[#d8c9b8] py-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Pills de categoria */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_ORDER.map((cat) => {
              const catCfg = getCategoryConfig(cat);
              const hasContent = categoryData[cat].length > 0;
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => goToCategory(cat)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-all duration-300',
                    isActive
                      ? 'border-[#171411] bg-[#171411] text-[#f5f0e9]'
                      : 'border-[#d8c9b8] bg-transparent text-[#756b60] hover:border-[#9a744d] hover:text-[#171411]',
                    !hasContent && !isActive && 'opacity-40',
                  )}
                >
                  {catCfg?.label ?? cat}
                  {hasContent && (
                    <span className="ml-2 text-[0.62rem] opacity-70">
                      {categoryData[cat].length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Indicador de posição + setas (navegam DENTRO da categoria) */}
          <div className="flex items-center gap-4">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] tabular-nums text-[#756b60]">
              {total > 0 ? String(featuredIndex + 1).padStart(2, '0') : '00'}{' '}
              <span className="text-[#9a744d]">/</span>{' '}
              {String(total).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrev}
                disabled={total < 2}
                aria-label="Artigo anterior"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8c9b8] bg-transparent text-[#9a744d] transition-all duration-300 hover:border-[#9a744d] hover:bg-[#9a744d] hover:text-white disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={goToNext}
                disabled={total < 2}
                aria-label="Próximo artigo"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8c9b8] bg-transparent text-[#9a744d] transition-all duration-300 hover:border-[#9a744d] hover:bg-[#9a744d] hover:text-white disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* ── CONTEÚDO DA ABA ATIVA ────────────────────────────────── */}
        <div className="relative">
          {/* Key na chave força re-render + animação a cada troca de featured */}
          <div
            key={`${activeCategory}-${featuredIndex}`}
            className={cn(
              'grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14',
              direction === 'right'
                ? 'animate-slide-in-from-right'
                : 'animate-slide-in-from-left',
            )}
          >
            {total === 0 ? (
              /* Empty state elegante */
              <div className="col-span-full rounded-[8px] border border-dashed border-[#d8c9b8] bg-transparent px-6 py-16 text-center lg:py-20">
                <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#9a744d]">
                  Em breve
                </p>
                <h3 className="mb-2 font-serif text-[1.35rem] leading-tight tracking-[-0.03em] text-[#171411] lg:text-[1.65rem]">
                  {cfg?.label} sendo escritos.
                </h3>
                <p className="mx-auto max-w-[420px] text-[0.9rem] leading-[1.6] text-[#3a332d]">
                  Novos conteúdos são publicados regularmente. Volte em breve.
                </p>
              </div>
            ) : (
              <>
                {/* Featured principal (clique leva para leitura) */}
                {featured && <FeaturedItem article={featured} />}

                {/* Coluna direita: até 2 SmallItems clicáveis para promover a featured */}
                {smalls.length > 0 && (
                  <div className="flex flex-col divide-y divide-[#d8c9b8]">
                    {smalls.map((a, i) => (
                      <div key={a.id} className={i === 0 ? 'pb-8' : 'pt-8'}>
                        <SmallItem
                          article={a}
                          onPromote={() => promoteToFeatured(a.id)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Keyframes locais (CSS-in-JS via <style>) ─────────────── */}
      <style jsx>{`
        @keyframes slide-in-from-right {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-from-left {
          from {
            opacity: 0;
            transform: translateX(-24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        :global(.animate-slide-in-from-right) {
          animation: slide-in-from-right 500ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        :global(.animate-slide-in-from-left) {
          animation: slide-in-from-left 500ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.animate-slide-in-from-right),
          :global(.animate-slide-in-from-left) {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

function FeaturedItem({ article }: { article: ArticleListItem }) {
  const cfg = getCategoryConfig(article.category);
  const href = `${cfg?.urlPath}/${article.slug}`;
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <Link href={href} className="group flex flex-col">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[8px] border border-[#d8c9b8] bg-[#f1ebe3]">
        {article.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover_image}
            alt={article.cover_alt ?? article.title}
            className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f1ebe3] to-[#e3d6c6]">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#9a744d]/50">
              Sem capa
            </span>
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center gap-3">
          <span
            className="rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white"
            style={{ background: cfg?.color ?? '#9a744d' }}
          >
            {cfg?.label ?? article.category}
          </span>
          <span
            className="h-1 w-1 rounded-full bg-[#9a744d]/50"
            aria-hidden="true"
          />
          {publishedDate && (
            <span className="text-[0.72rem] uppercase tracking-[0.1em] text-[#756b60]">
              {publishedDate}
            </span>
          )}
        </div>

        <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.1] tracking-[-0.04em] text-[#171411] transition-colors duration-300 group-hover:text-[#9a744d]">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="mt-3 text-[0.98rem] leading-[1.6] text-[#3a332d] line-clamp-3">
            {article.excerpt}
          </p>
        )}

        <div className="mt-5 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.14em] text-[#9a744d]">
          <span className="font-bold">Ler artigo</span>
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
          {article.reading_time_minutes && (
            <span className="ml-auto flex items-center gap-1.5 text-[#756b60]">
              <Clock className="h-3 w-3" strokeWidth={2} />
              {article.reading_time_minutes} min
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function SmallItem({
  article,
  onPromote,
}: {
  article: ArticleListItem;
  onPromote: () => void;
}) {
  const cfg = getCategoryConfig(article.category);
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <button
      type="button"
      onClick={onPromote}
      aria-label={`Trazer "${article.title}" para o destaque`}
      className="group grid w-full grid-cols-[80px_1fr] gap-4 text-left transition-transform duration-300 hover:-translate-y-0.5 lg:gap-5"
    >
      <div className="relative aspect-square overflow-hidden rounded-[6px] border border-[#d8c9b8] bg-[#f1ebe3]">
        {article.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover_image}
            alt={article.cover_alt ?? article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[#9a744d]/40">
              —
            </span>
          </div>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-white"
            style={{ background: cfg?.color ?? '#9a744d' }}
          >
            {cfg?.label ?? article.category}
          </span>
          {publishedDate && (
            <span className="text-[0.65rem] uppercase tracking-[0.1em] text-[#756b60]">
              {publishedDate}
            </span>
          )}
        </div>
        <h3 className="font-serif text-[1.05rem] leading-[1.2] tracking-[-0.025em] text-[#171411] transition-colors duration-300 group-hover:text-[#9a744d]">
          {article.title}
        </h3>
        <div className="mt-2 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.12em] text-[#756b60]">
          {article.reading_time_minutes && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" strokeWidth={2} />
              {article.reading_time_minutes} min
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 font-bold text-[#9a744d] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Ver
            <ArrowUpRight className="h-3 w-3 rotate-[-90deg]" strokeWidth={2} />
          </span>
        </div>
      </div>
    </button>
  );
}
