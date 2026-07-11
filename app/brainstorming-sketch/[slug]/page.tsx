import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/components/articles/ArticlePage';
import {
  getArticleBySlug,
  getRelatedArticles,
  getAllSlugsForCategory,
} from '@/lib/articles';
import { getSectionContent } from '@/lib/site-content';
import { buildArticleMetadata } from '@/lib/seo/article-metadata';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugsForCategory('sketch');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug('sketch', slug);
  if (!article) return { title: 'Artigo não encontrado' };
  return buildArticleMetadata({ ...article, category: 'sketch' });
}

export default async function SketchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug('sketch', slug);
  if (!article) notFound();
  const [related, footer] = await Promise.all([
    getRelatedArticles('sketch', article.id, 3),
    getSectionContent('footer'),
  ]);
  return (
    <ArticlePage
      article={article}
      relatedArticles={related}
      whatsapp={footer.whatsapp ?? '5555999942637'}
      showSidebar={false}
    />
  );
}
