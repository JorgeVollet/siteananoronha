import Link from 'next/link';
import { ChevronLeft, Clock, Calendar } from 'lucide-react';
import { TipTapRenderer, extractTOC } from './TipTapRenderer';
import { ArticleCard } from './ArticleCard';
import { ArticleSidebar } from './ArticleSidebar';
import { ArticleStickyBanner } from './ArticleStickyBanner';
import { ArticleFooterCTA } from './ArticleFooterCTA';
import { getCategoryConfig } from '@/lib/articles-constants';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { SITE_CONFIG, CATEGORY_META, type CategoryKey } from '@/lib/seo/site-config';
import type { ArticleListItem } from '@/lib/articles';

type Props = {
  article: any;
  relatedArticles: ArticleListItem[];
  whatsapp: string;
  showSidebar: boolean;
};

export function ArticlePage({
  article,
  relatedArticles,
  whatsapp,
  showSidebar,
}: Props) {
  const cfg = getCategoryConfig(article.category);
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;
  const toc = showSidebar ? extractTOC(article.content) : [];

  const categoryMeta = CATEGORY_META[article.category as CategoryKey];
  const articleUrl = `${SITE_CONFIG.url}/${categoryMeta.slug}/${article.slug}`;
  const jsonLdDescription =
    article.seo_meta_description ?? article.excerpt ?? article.subtitle ?? '';

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={jsonLdDescription}
        coverImage={article.cover_image}
        publishedAt={article.published_at ?? article.updated_at}
        updatedAt={article.updated_at}
        url={articleUrl}
        category={categoryMeta.label}
        tags={article.tags ?? []}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Início', url: SITE_CONFIG.url },
          { name: categoryMeta.label, url: `${SITE_CONFIG.url}/${categoryMeta.slug}` },
          { name: article.title, url: articleUrl },
        ]}
      />

      <article className="scroll-mt-[88px] bg-[#f5f0e9] px-6 pb-16 pt-[136px] sm:px-8 lg:px-12 lg:pb-24 lg:pt-[168px] xl:px-14">
        <div className="mx-auto max-w-[1200px]">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-[0.78rem] text-[#756b60]">
            <Link href="/" className="hover:text-[#9a744d]">
              Início
            </Link>
            <span>/</span>
            <Link
              href={cfg?.urlPath ?? '/'}
              className="hover:text-[#9a744d]"
            >
              {cfg?.label}
            </Link>
            <span>/</span>
            <span className="truncate text-[#171411]">{article.title}</span>
          </div>

          {/* Header editorial */}
          <header className="mx-auto mb-12 max-w-[780px] text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white"
                style={{ background: cfg?.color ?? '#9a744d' }}
              >
                {cfg?.label ?? article.category}
              </span>
            </div>
            <h1 className="mb-5 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.05em] text-[#171411]">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="mx-auto mb-8 max-w-[640px] font-serif italic text-[clamp(1.1rem,1.9vw,1.5rem)] leading-[1.3] text-[#3a332d]">
                {article.subtitle}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[0.82rem] text-[#756b60]">
              {article.author && <span>Por {article.author}</span>}
              {publishedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {publishedDate}
                </span>
              )}
              {article.reading_time_minutes && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />{' '}
                  {article.reading_time_minutes} min de leitura
                </span>
              )}
            </div>
          </header>

          {/* Cover */}
          {article.cover_image && (
            <div className="mb-12 overflow-hidden rounded-[1.35rem] border border-[#d8c9b8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.cover_image}
                alt={article.cover_alt ?? article.title}
                className="w-full"
              />
            </div>
          )}

          {/* Conteúdo — grid com/sem sidebar */}
          <div
            className={
              showSidebar
                ? 'grid grid-cols-1 gap-12 lg:grid-cols-[1fr_260px]'
                : ''
            }
          >
            <div className="mx-auto max-w-[720px] lg:mx-0">
              <TipTapRenderer content={article.content} />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-[#d8c9b8] pt-8">
                  {article.tags.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#d1c4b7] bg-[#f1ebe3] px-3 py-1 text-[0.75rem] font-bold text-[#9a744d]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA rodapé */}
              <ArticleFooterCTA whatsapp={whatsapp} />
            </div>

            {showSidebar && toc.length > 0 && <ArticleSidebar toc={toc} />}
          </div>
        </div>
      </article>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#eee5da] px-6 py-20 sm:px-8 lg:px-12 xl:px-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 text-center">
              <div className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#9a744d]">
                Continue lendo
              </div>
              <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.045em] text-[#171411]">
                Artigos relacionados
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href={cfg?.urlPath ?? '/'}
                className="inline-flex items-center gap-2 rounded-[10px] border border-[#d1c4b7] bg-[#f1ebe3] px-6 py-3 text-[0.88rem] font-bold text-[#171411] transition-all hover:-translate-y-0.5 hover:bg-[#f8f2ea]"
              >
                <ChevronLeft className="h-4 w-4" /> Voltar à listagem
              </Link>
            </div>
          </div>
        </section>
      )}

      <ArticleStickyBanner whatsapp={whatsapp} />
    </>
  );
}
