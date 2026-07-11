import Link from 'next/link';
import { Clock } from 'lucide-react';
import { getCategoryConfig } from '@/lib/articles-constants';
import type { ArticleListItem } from '@/lib/articles';

type Props = {
  article: ArticleListItem;
  variant?: 'default' | 'featured' | 'compact';
};

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function ArticleCard({ article, variant = 'default' }: Props) {
  const cfg = getCategoryConfig(article.category);
  const href = `${cfg?.urlPath}/${article.slug}`;
  const publishedDate = formatDate(article.published_at);

  if (variant === 'featured') {
    return (
      <Link
        href={href}
        className="group grid grid-cols-1 gap-6 overflow-hidden rounded-[1.35rem] border border-[#d8c9b8] bg-[#eee5da] shadow-[0_24px_64px_rgba(42,31,22,0.10)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_80px_rgba(42,31,22,0.18)] md:grid-cols-[1.4fr_1fr]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#f1ebe3] md:aspect-auto md:h-full">
          {article.cover_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.cover_image}
              alt={article.cover_alt ?? article.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f1ebe3] to-[#eee5da]">
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#9a744d]/40">
                Sem capa
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="mb-4 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white"
              style={{ background: cfg?.color ?? '#9a744d' }}
            >
              {cfg?.label ?? article.category}
            </span>
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#9a744d]">
              Destaque
            </span>
          </div>
          <h2 className="mb-3 font-serif text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[1.05] tracking-[-0.04em] text-[#171411] transition-colors duration-300 group-hover:text-[#9a744d]">
            {article.title}
          </h2>
          {article.excerpt && (
            <p className="mb-6 text-[0.98rem] leading-[1.65] text-[#3a332d] line-clamp-3">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-[0.78rem] text-[#756b60]">
            {publishedDate && <span>{publishedDate}</span>}
            {article.reading_time_minutes && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {article.reading_time_minutes} min
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(42,31,22,0.14)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f1ebe3]">
        {article.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover_image}
            alt={article.cover_alt ?? article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#9a744d]/40">
              Sem capa
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <div className="mb-3 flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.10em] text-white"
            style={{ background: cfg?.color ?? '#9a744d' }}
          >
            {cfg?.label ?? article.category}
          </span>
        </div>
        <h3 className="mb-2 font-serif text-[1.15rem] leading-[1.2] tracking-[-0.025em] text-[#171411] transition-colors duration-300 group-hover:text-[#9a744d] lg:text-[1.25rem]">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mb-4 flex-1 text-[0.88rem] leading-[1.55] text-[#3a332d] line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between border-t border-[#d8c9b8]/60 pt-3 text-[0.72rem] text-[#756b60]">
          {publishedDate && <span>{publishedDate}</span>}
          {article.reading_time_minutes && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {article.reading_time_minutes} min
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
