import type { Metadata } from 'next';
import { getLatestArticles } from '@/lib/articles';
import { ConteudoExplorer } from '@/components/articles/ConteudoExplorer';
import { SITE_CONFIG } from '@/lib/seo/site-config';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Conteúdo Editorial | ${SITE_CONFIG.name}`,
  description:
    'Blog, normas técnicas, curiosidades e sketch — todo o conteúdo editorial da Ana Laura Noronha em um só lugar.',
  alternates: { canonical: `${SITE_CONFIG.url}/conteudo` },
  openGraph: {
    type: 'website',
    title: `Conteúdo Editorial | ${SITE_CONFIG.name}`,
    description:
      'Blog, normas técnicas, curiosidades e sketch — todo o conteúdo editorial da Ana Laura Noronha em um só lugar.',
    url: `${SITE_CONFIG.url}/conteudo`,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
  },
};

export default async function ConteudoPage() {
  // Carrega todos os artigos publicados (limite alto o suficiente)
  const artigos = await getLatestArticles(200);

  return <ConteudoExplorer artigos={artigos} />;
}
