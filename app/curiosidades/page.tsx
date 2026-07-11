import type { Metadata } from 'next';
import { CategoryHub } from '@/components/articles/CategoryHub';
import { getPublishedArticles } from '@/lib/articles';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Curiosidades — Ana Laura Noronha',
  description:
    'Conteúdo leve, curiosidades, tendências e dicas do universo Ana Laura Noronha.',
};

export default async function CuriosidadesPage() {
  const articles = await getPublishedArticles('curiosidades');
  return <CategoryHub category="curiosidades" articles={articles} />;
}
