'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowUpRight, Search, X } from 'lucide-react';
import { getCategoryConfig } from '@/lib/articles-constants';
import type { ArticleListItem } from '@/lib/articles';
import { cn } from '@/lib/utils';

type CategoryFilter = 'todos' | 'blog' | 'normas' | 'curiosidades' | 'sketch';

const CATEGORY_ORDER: Exclude<CategoryFilter, 'todos'>[] = [
  'blog',
  'normas',
  'curiosidades',
  'sketch',
];

type Props = {
  artigos: ArticleListItem[];
};

/**
 * Página /conteudo — hub completo do conteúdo editorial.
 *
 * Estrutura:
 *  1. Header editorial grande (title + subtitle + stats)
 *  2. Featured global (o mais recente ou destaque explícito)
 *  3. Pills de filtro (Todos + 4 categorias) com contadores
 *  4. Grid de artigos filtrados
 *  5. Empty state quando categoria não tem artigos
 */
export function ConteudoExplorer({ artigos }: Props) {
  const [filter, setFilter] = useState<CategoryFilter>('todos');
  const [query, setQuery] = useState('');

  // Contadores por categoria (memoized)
  const counts = useMemo(() => {
    const acc: Record<CategoryFilter, number> = {
      todos: artigos.length,
      blog: 0,
      normas: 0,
      curiosidades: 0,
      sketch: 0,
    };
    for (const a of artigos) {
      const cat = a.category as Exclude<CategoryFilter, 'todos'>;
      if (cat in acc) acc[cat]++;
    }
    return acc;
  }, [artigos]);

  // Aplica filtro + busca
  const filtered = useMemo(() => {
    let list = artigos;
    if (filter !== 'todos') list = list.filter((a) => a.category === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((a) => {
        return (
          a.title.toLowerCase().includes(q) ||
          (a.excerpt ?? '').toLowerCase().includes(q) ||
          (a.tags ?? []).some((t) => t.toLowerCase().includes(q))
        );
      });
    }
    return list;
  }, [artigos, filter, query]);

  // Featured — se filtro é "todos", pega o mais recente marcado como is_featured;
  // se filtro é uma categoria específica, pega o featured dessa categoria.
  const featured = useMemo(() => {
    if (query.trim()) return null; // sem featured quando há busca ativa
    const list =
      filter === 'todos' ? artigos : artigos.filter((a) => a.category === filter);
    return list.find((a) => a.is_featured) ?? list[0] ?? null;
  }, [artigos, filter, query]);

  const restList = useMemo(() => {
    if (!featured || query.trim()) return filtered;
    return filtered.filter((a) => a.id !== featured.id);
  }, [filtered, featured, query]);

  return (
    <section
      aria-label="Conteúdo Editorial"
      className="scroll-mt-[88px] bg-[#f5f0e9] px-6 pb-24 pt-[152px] sm:px-8 lg:px-12 lg:pb-32 lg:pt-[184px] xl:px-14"
    >
      <div className="mx-auto max-w-[1360px]">

        {/* ── HEADER EDITORIAL ─────────────────────────────────── */}
        <div className="mb-14 lg:mb-20">
          <div className="mb-8 flex items-center gap-3 border-b border-[#d8c9b8] pb-8">
            <span className="h-px w-8 bg-[#9a744d]" aria-hidden="true" />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#9a744d]">
              Conteúdo Editorial
            </span>
            <span className="ml-auto text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#756b60]">
              {artigos.length}{' '}
              {artigos.length === 1 ? 'artigo publicado' : 'artigos publicados'}
            </span>
          </div>

          <h1 className="font-serif text-[clamp(2.25rem,4.4vw,4.5rem)] leading-[1.02] tracking-[-0.045em] text-[#171411]">
            Do meu caderno de projetos
            <br />
            <em className="not-italic italic font-serif text-[#9a744d]">
              para a sua obra.
            </em>
          </h1>
          <p className="mt-6 max-w-[640px] font-serif italic text-[clamp(1.05rem,1.5vw,1.4rem)] leading-[1.4] text-[#3a332d]">
            Guias práticos de reforma, normas técnicas explicadas com clareza,
            curiosidades do universo do design e reflexões do processo criativo.
            Tudo em um só lugar.
          </p>
        </div>

        {/* ── PILLS DE FILTRO + BUSCA ──────────────────────────── */}
        <div className="mb-10 flex flex-col gap-5 border-y border-[#d8c9b8] py-5 lg:mb-14 lg:flex-row lg:items-center lg:justify-between lg:gap-8">

          {/* Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterPill
              label="Todos"
              count={counts.todos}
              active={filter === 'todos'}
              onClick={() => setFilter('todos')}
            />
            {CATEGORY_ORDER.map((cat) => {
              const cfg = getCategoryConfig(cat);
              return (
                <FilterPill
                  key={cat}
                  label={cfg?.label ?? cat}
                  count={counts[cat]}
                  active={filter === cat}
                  disabled={counts[cat] === 0}
                  onClick={() => setFilter(cat)}
                />
              );
            })}
          </div>

          {/* Busca */}
          <div className="relative flex items-center">
            <Search
              className="pointer-events-none absolute left-3.5 h-3.5 w-3.5 text-[#9a744d]"
              strokeWidth={2}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título, tag..."
              className="w-full rounded-full border border-[#d8c9b8] bg-transparent py-2.5 pl-10 pr-9 text-[0.85rem] text-[#171411] placeholder:text-[#a89a8b] focus:border-[#9a744d] focus:outline-none focus:ring-2 focus:ring-[#9a744d]/20 lg:w-72"
              aria-label="Buscar artigos"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full text-[#9a744d] hover:bg-[#eee5da]"
                aria-label="Limpar busca"
              >
                <X className="h-3 w-3" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>

        {/* ── FEATURED ────────────────────────────────────────── */}
        {featured && !query.trim() && (
          <FeaturedCard article={featured} />
        )}

        {/* ── GRID DE ARTIGOS ─────────────────────────────────── */}
        {restList.length > 0 ? (
          <div
            className={cn(
              'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3',
              featured && !query.trim() ? 'mt-16 lg:mt-20' : 'mt-0',
            )}
          >
            {restList.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <EmptyState hasQuery={!!query.trim()} filter={filter} />
        )}

        {/* ── RESULTADO DE BUSCA ─────────────────────────────── */}
        {query.trim() && (
          <p className="mt-8 text-center text-[0.82rem] uppercase tracking-[0.14em] text-[#756b60]">
            {restList.length}{' '}
            {restList.length === 1 ? 'resultado' : 'resultados'} para “
            <span className="text-[#9a744d]">{query}</span>”
          </p>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SUBCOMPONENTES
// ═══════════════════════════════════════════════════════════════

function FilterPill({
  label,
  count,
  active,
  disabled,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-full border px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-all duration-300',
        active
          ? 'border-[#171411] bg-[#171411] text-[#f5f0e9]'
          : 'border-[#d8c9b8] bg-transparent text-[#756b60] hover:border-[#9a744d] hover:text-[#171411]',
        disabled && !active && 'opacity-40 cursor-not-allowed hover:border-[#d8c9b8] hover:text-[#756b60]',
      )}
    >
      {label}
      <span className={cn('ml-2 text-[0.62rem]', active ? 'opacity-70' : 'opacity-60')}>
        {count}
      </span>
    </button>
  );
}

function FeaturedCard({ article }: { article: ArticleListItem }) {
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
    <Link
      href={href}
      className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14"
    >
      {/* Imagem */}
      <div className="relative aspect-[16/11] overflow-hidden rounded-[8px] border border-[#d8c9b8] bg-[#eee5da]">
        {article.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover_image}
            alt={article.cover_alt ?? article.title}
            className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#eee5da] to-[#e3d6c6]">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#9a744d]/50">
              Sem capa
            </span>
          </div>
        )}
      </div>

      {/* Texto */}
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white"
            style={{ background: cfg?.color ?? '#9a744d' }}
          >
            {cfg?.label ?? article.category}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#9a744d]/50" aria-hidden="true" />
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#9a744d]">
            Destaque
          </span>
        </div>

        <h2 className="font-serif text-[clamp(1.75rem,3vw,3rem)] leading-[1.05] tracking-[-0.04em] text-[#171411] transition-colors duration-300 group-hover:text-[#9a744d]">
          {article.title}
        </h2>

        {article.excerpt && (
          <p className="mt-5 font-serif italic text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.45] text-[#3a332d]">
            {article.excerpt}
          </p>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#d8c9b8] pt-5 text-[0.75rem] uppercase tracking-[0.12em] text-[#756b60]">
          {publishedDate && <span>{publishedDate}</span>}
          {article.reading_time_minutes && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" strokeWidth={2} />
              {article.reading_time_minutes} min
            </span>
          )}
          <span className="ml-auto flex items-center gap-1.5 font-bold text-[#9a744d] transition-transform duration-300 group-hover:translate-x-1">
            Ler artigo
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: ArticleListItem }) {
  const cfg = getCategoryConfig(article.category);
  const href = `${cfg?.urlPath}/${article.slug}`;
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <Link href={href} className="group flex flex-col">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[8px] border border-[#d8c9b8] bg-[#eee5da]">
        {article.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover_image}
            alt={article.cover_alt ?? article.title}
            className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#eee5da] to-[#e3d6c6]">
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#9a744d]/50">
              Sem capa
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex-1">
        <div className="mb-3 flex items-center gap-2.5">
          <span
            className="rounded-full px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white"
            style={{ background: cfg?.color ?? '#9a744d' }}
          >
            {cfg?.label ?? article.category}
          </span>
          {publishedDate && (
            <span className="text-[0.68rem] uppercase tracking-[0.1em] text-[#756b60]">
              {publishedDate}
            </span>
          )}
        </div>

        <h3 className="font-serif text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.2] tracking-[-0.03em] text-[#171411] transition-colors duration-300 group-hover:text-[#9a744d]">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="mt-2.5 text-[0.9rem] leading-[1.55] text-[#3a332d] line-clamp-3">
            {article.excerpt}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.12em] text-[#756b60]">
          {article.reading_time_minutes && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" strokeWidth={2} />
              {article.reading_time_minutes} min
            </span>
          )}
          <span className="ml-auto flex items-center gap-1.5 font-bold text-[#9a744d] transition-transform duration-300 group-hover:translate-x-1">
            Ler
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ hasQuery, filter }: { hasQuery: boolean; filter: CategoryFilter }) {
  return (
    <div className="mt-8 rounded-[16px] border border-dashed border-[#d8c9b8] bg-[#eee5da]/40 px-6 py-24 text-center">
      <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#9a744d]">
        {hasQuery ? 'Sem resultados' : 'Em breve'}
      </p>
      <h3 className="mb-3 font-serif text-[1.5rem] leading-tight tracking-[-0.03em] text-[#171411]">
        {hasQuery
          ? 'Nenhum artigo bate com essa busca.'
          : filter === 'todos'
          ? 'Primeiros artigos sendo escritos.'
          : `Nenhum artigo em ${getCategoryConfig(filter as Exclude<CategoryFilter, 'todos'>)?.label ?? filter} ainda.`}
      </h3>
      <p className="mx-auto max-w-[420px] text-[0.95rem] leading-[1.6] text-[#3a332d]">
        {hasQuery
          ? 'Tente outra palavra-chave, ou remova o filtro atual.'
          : 'Novos conteúdos são publicados regularmente. Volte em breve.'}
      </p>
    </div>
  );
}
