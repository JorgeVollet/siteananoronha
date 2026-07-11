import Link from 'next/link';
import { getCategoryConfig } from '@/lib/articles-constants';
import type { ArticleListItem } from '@/lib/articles';

type Props = { articles: ArticleListItem[] };

export function SketchHub({ articles }: Props) {
  const cfg = getCategoryConfig('sketch');

  return (
    <section className="scroll-mt-[88px] bg-[#f5f0e9] px-6 pb-20 pt-[152px] sm:px-8 lg:px-12 lg:pb-28 lg:pt-[184px] xl:px-14">
      <div className="mx-auto max-w-[1510px]">
        {/* Header */}
        <div className="mb-14 text-center">
          <div
            className="mb-6 inline-block rounded-full px-6 py-2.5"
            style={{ background: '#171614' }}
          >
            <span className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#caa57c]">
              Brainstorming Sketch
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[1.0] tracking-[-0.05em] text-[#171411]">
            Caderno de{' '}
            <em className="font-serif italic text-[#9a744d]">
              ideias visuais.
            </em>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[1.05rem] leading-[1.6] text-[#3a332d]">
            Rascunhos, referências, texturas e insights do meu processo
            criativo. Volte sempre — sempre tem algo novo.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-[#d8c9b8] bg-[#eee5da]/40 px-6 py-24 text-center">
            <p className="mb-2 text-[0.82rem] font-bold uppercase tracking-[0.12em] text-[#9a744d]">
              Em breve
            </p>
            <h3 className="mb-3 font-serif text-[1.5rem] leading-tight tracking-[-0.03em] text-[#171411]">
              As primeiras ideias em construção.
            </h3>
          </div>
        ) : (
          /* Grid masonry via CSS columns — visual Pinterest */
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {articles.map((a) => {
              const href = `${cfg?.urlPath}/${a.slug}`;
              const publishedDate = a.published_at
                ? new Date(a.published_at).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'short',
                  })
                : null;
              return (
                <Link
                  key={a.id}
                  href={href}
                  className="group mb-6 block break-inside-avoid overflow-hidden rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(42,31,22,0.14)]"
                >
                  {a.cover_image && (
                    <div className="overflow-hidden bg-[#f1ebe3]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.cover_image}
                        alt={a.cover_alt ?? a.title}
                        className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                        style={{ display: 'block' }}
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="mb-2 font-serif text-[1.05rem] leading-[1.25] tracking-[-0.02em] text-[#171411] transition-colors duration-300 group-hover:text-[#9a744d]">
                      {a.title}
                    </h3>
                    {a.excerpt && (
                      <p className="mb-3 text-[0.85rem] leading-[1.55] text-[#3a332d] line-clamp-3">
                        {a.excerpt}
                      </p>
                    )}
                    {publishedDate && (
                      <div className="text-[0.7rem] uppercase tracking-[0.08em] text-[#756b60]">
                        {publishedDate}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
