import type { Metadata } from 'next';
import { CategoryHub } from '@/components/articles/CategoryHub';
import { getPublishedArticles } from '@/lib/articles';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog — Ana Laura Noronha',
  description:
    'Artigos editoriais sobre engenharia, interiores e marcenaria sob medida. Conteúdo prático de Ana Laura Noronha.',
};

export default async function BlogPage() {
  const articles = await getPublishedArticles('blog');
  return <CategoryHub category="blog" articles={articles} />;
}
