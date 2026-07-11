import type { Metadata } from 'next';
import { CategoryHub } from '@/components/articles/CategoryHub';
import { getPublishedArticles } from '@/lib/articles';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Normas Técnicas — Ana Laura Noronha',
  description:
    'Artigos técnicos sobre normas NBR, ART e regulamentações da construção. Explicações claras e práticas.',
};

export default async function NormasPage() {
  const articles = await getPublishedArticles('normas');
  return <CategoryHub category="normas" articles={articles} />;
}
