import type { Metadata } from 'next';
import { SITE_CONFIG, CATEGORY_META, type CategoryKey } from './site-config';

type ArticleForMeta = {
  slug: string;
  category: CategoryKey;
  title: string;
  subtitle?: string | null;
  excerpt?: string | null;
  seo_meta_description?: string | null;
  seo_keywords?: string[] | null;
  cover_image?: string | null;
  cover_alt?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  tags?: string[] | null;
};

/**
 * Constrói Metadata rica (OG + Twitter + canonical) a partir de um artigo.
 * Usa fallback em cadeia para description: seo_meta_description → excerpt → subtitle → SITE tagline.
 */
export function buildArticleMetadata(article: ArticleForMeta): Metadata {
  const meta = CATEGORY_META[article.category];
  const url = `${SITE_CONFIG.url}/${meta.slug}/${article.slug}`;

  const description =
    article.seo_meta_description ??
    article.excerpt ??
    article.subtitle ??
    SITE_CONFIG.tagline;

  const coverAbsolute = article.cover_image
    ? article.cover_image.startsWith('http')
      ? article.cover_image
      : `${SITE_CONFIG.url}${article.cover_image}`
    : undefined;

  const ogImage = coverAbsolute
    ? [
        {
          url: coverAbsolute,
          width: 1600,
          height: 1100,
          alt: article.cover_alt ?? article.title,
        },
      ]
    : undefined;

  return {
    title: `${article.title} | ${SITE_CONFIG.name}`,
    description,
    keywords: article.seo_keywords ?? article.tags ?? undefined,
    authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.author.url }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at ?? undefined,
      authors: [SITE_CONFIG.author.name],
      section: meta.label,
      tags: article.tags ?? undefined,
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: coverAbsolute ? [coverAbsolute] : undefined,
    },
  };
}
