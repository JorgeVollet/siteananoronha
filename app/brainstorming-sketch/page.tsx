import type { Metadata } from 'next';
import { SketchHub } from '@/components/articles/SketchHub';
import { getPublishedArticles } from '@/lib/articles';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Brainstorming Sketch — Ana Laura Noronha',
  description:
    'Caderno visual de ideias, rascunhos e referências do processo criativo de Ana Laura Noronha.',
};

export default async function SketchPage() {
  const articles = await getPublishedArticles('sketch');
  return <SketchHub articles={articles} />;
}
