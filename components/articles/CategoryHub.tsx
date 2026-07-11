import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import { getCategoryConfig } from '@/lib/articles-constants';
import type { ArticleListItem } from '@/lib/articles';

type Props = {
  category: 'blog' | 'normas' | 'curiosidades';
  articles: ArticleListItem[];
};

/**
 * Layout editorial premium com hierarquia em 3 níveis:
 *
 *  ┌─────────────────────┐  ← DESTAQUE (featured, aspect 16/9, texto ao lado)
 *  │  IMG   │  Título     │
 *  │        │  Subtítulo  │
 *  └─────────────────────┘
 *
 *  ┌───────┐  ┌───────┐   ← SUB-DESTAQUES (2 medium cards)
 *  │  01   │  │  02   │
 *  └───────┘  └───────┘
 *
 *  ═══════════════════════  ← LISTA EDITORIAL (rest)
 *  Título 1                Data · min
 *  Excerpt breve...
 *  ───────────────────────
 *  Título 2                Data · min
 *  Excerpt breve...
 */
export function CategoryHub({ category, articles }: Props) {
  const cfg = getCategoryConfig(category);
  const featured = articles.find((a) => a.is_featured) ?? articles[0];
  const withoutFeatured = articles.filter((a) => a.id !== featured?.id);
  const subFeatured = withoutFeatured.slice(0, 2);
  const listArticles = withoutFeatured.slice(2);

  return (
    <section className="scroll-mt-[88px] bg-[#f5f0e9] px-6 pb-20 pt-[152px] sm:px-8 lg:px-12 lg:pb-28 lg:pt-[184px] xl:px-14">
      <div className="mx-auto max-w-[1360px]">
        {/* ── HEADER EDITORIAL ─────────────────────────────────────── */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-center gap-3 border-b border-[#d8c9b8] pb-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#9a744d]" aria-hidden="true" />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#9a744d]">
                {cfg?.label ?? category}
              </span>
            </div>
            <span className="ml-auto text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#756b60]">
              {articles.length}{' '}
              {articles.length === 1 ? 'artigo publicado' : 'artigos publicados'}
            </span>
          </div>

          <h1 className="mt-8 font-serif text-[clamp(2.25rem,4vw,4rem)] leading-[1.02] tracking-[-0.045em] text-[#171411]">
            {category === 'blog' && (
              <>
                Ensaios sobre engenharia,
                <br />
                interiores e o <em className="not-italic italic font-serif text-[#9a744d]">método integrado.</em>
              </>
            )}
            {category === 'normas' && (
              <>
                Normas técnicas
                <br />
                <em className="not-italic italic font-serif text-[#9a744d]">explicadas com clareza.</em>
              </>
            )}
            {category === 'curiosidades' && (
              <>
                Curiosidades do universo
                <br />
                <em className="not-italic italic font-serif text-[#9a744d]">de engenharia e interiores.</em>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-[620px] font-serif italic text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.4] text-[#3a332d]">
            {category === 'blog' &&
              'Reflexões, guias práticos e bastidores de obra — para quem quer entender antes de decidir.'}
            {category === 'normas' &&
              'NBRs, ARTs e regulamentações traduzidas em linguagem que qualquer cliente entende.'}
            {category === 'curiosidades' &&
              'Detalhes técnicos, tendências e observações que só quem vive obra percebe.'}
          </p>
        </div>

        {/* ── EMPTY STATE ──────────────────────────────────────────── */}
        {articles.length === 0 && (
          <div className="rounded-[16px] border border-dashed border-[#d8c9b8] bg-[#eee5da]/40 px-6 py-24 text-center">
            <p className="mb-2 text-[0.82rem] font-bold uppercase tracking-[0.12em] text-[#9a744d]">
              Em breve
            </p>
            <h3 className="mb-3 font-serif text-[1.5rem] leading-tight tracking-[-0.03em] text-[#171411]">
              Primeiros artigos sendo escritos.
            </h3>
            <p className="mx-auto max-w-[420px] text-[0.95rem] leading-[1.6] text-[#3a332d]">
              Volte em breve — novos conteúdos são publicados regularmente.
            </p>
          </div>
        )}

        {/* ── DESTAQUE HERO ────────────────────────────────────────── */}
        {featured && (
          <FeaturedHero article={featured} />
        )}

        {/* ── SUB-DESTAQUES (2 cards médios) ───────────────────────── */}
        {subFeatured.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-10">
            {subFeatured.map((a) => (
              <MediumCard key={a.id} article={a} />
            ))}
          </div>
        )}

        {/* ── LISTA EDITORIAL (resto) ──────────────────────────────── */}
        {listArticles.length > 0 && (
          <div className="mt-20 lg:mt-24">
            <div className="mb-8 flex items-center gap-4">
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#9a744d]">
                Todos os artigos
              </span>
              <span className="h-px flex-1 bg-[#d8c9b8]" aria-hidden="true" />
            </div>
            <ul className="divide-y divide-[#d8c9b8]">
              {listArticles.map((a) => (
                <li key={a.id}>
                  <EditorialRow article={a} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

function FeaturedHero({ article }: { article: ArticleListItem }) {
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
      className="group grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14 items-center"
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
        <div className="mb-5 flex items-center gap-3">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#9a744d]">
            {cfg?.label ?? article.category}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#9a744d]" aria-hidden="true" />
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#9a744d]/70">
            Destaque
          </span>
        </div>

        <h2 className="font-serif text-[clamp(1.75rem,3vw,3rem)] leading-[1.05] tracking-[-0.04em] text-[#171411] transition-colors duration-300 group-hover:text-[#9a744d]">
          {article.title}
        </h2>

        {article.excerpt && (
          <p className="mt-5 font-serif italic text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.45] text-[#3a332d]">
            {article.excerpt}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#d8c9b8] pt-5 text-[0.78rem] uppercase tracking-[0.12em] text-[#756b60]">
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

function MediumCard({ article }: { article: ArticleListItem }) {
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
      <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] border border-[#d8c9b8] bg-[#eee5da]">
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

      <div className="mt-5 flex-1">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#9a744d]">
            {cfg?.label ?? article.category}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#9a744d]/50" aria-hidden="true" />
          {publishedDate && (
            <span className="text-[0.72rem] uppercase tracking-[0.1em] text-[#756b60]">
              {publishedDate}
            </span>
          )}
        </div>

        <h3 className="font-serif text-[clamp(1.25rem,1.8vw,1.65rem)] leading-[1.15] tracking-[-0.035em] text-[#171411] transition-colors duration-300 group-hover:text-[#9a744d]">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="mt-3 text-[0.95rem] leading-[1.6] text-[#3a332d] line-clamp-2">
            {article.excerpt}
          </p>
        )}

        <div className="mt-4 flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#9a744d] transition-transform duration-300 group-hover:translate-x-0.5">
          Ler artigo
          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
}

function EditorialRow({ article }: { article: ArticleListItem }) {
  const cfg = getCategoryConfig(article.category);
  const href = `${cfg?.urlPath}/${article.slug}`;
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short',
      })
    : null;

  return (
    <Link
      href={href}
      className="group grid grid-cols-1 items-start gap-6 py-6 transition-colors duration-300 hover:bg-[#eee5da]/40 lg:grid-cols-[80px_1fr_auto] lg:gap-10 lg:py-7"
    >
      {/* Data */}
      <div className="hidden text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#9a744d] lg:block lg:pt-1">
        {publishedDate}
      </div>

      {/* Título + excerpt */}
      <div className="flex-1">
        <h3 className="font-serif text-[clamp(1.15rem,1.6vw,1.5rem)] leading-[1.2] tracking-[-0.03em] text-[#171411] transition-colors duration-300 group-hover:text-[#9a744d]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 text-[0.9rem] leading-[1.55] text-[#3a332d] line-clamp-2">
            {article.excerpt}
          </p>
        )}
        {/* Mobile: data inline */}
        <div className="mt-2 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.12em] text-[#756b60] lg:hidden">
          {publishedDate && <span>{publishedDate}</span>}
          {article.reading_time_minutes && (
            <>
              <span aria-hidden="true">·</span>
              <span>{article.reading_time_minutes} min</span>
            </>
          )}
        </div>
      </div>

      {/* Reading time (desktop) */}
      <div className="hidden items-center gap-4 text-[0.72rem] uppercase tracking-[0.12em] text-[#756b60] lg:flex lg:pt-1">
        {article.reading_time_minutes && (
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" strokeWidth={2} />
            {article.reading_time_minutes} min
          </span>
        )}
        <ArrowUpRight
          className="h-3.5 w-3.5 text-[#9a744d] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      </div>
    </Link>
  );
}
