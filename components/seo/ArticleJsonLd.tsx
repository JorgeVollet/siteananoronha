import { SITE_CONFIG } from '@/lib/seo/site-config';

type Props = {
  title: string;
  description: string;
  coverImage: string | null;
  publishedAt: string;
  updatedAt?: string | null;
  url: string;
  category: string;
  tags?: string[];
};

export function ArticleJsonLd({
  title,
  description,
  coverImage,
  publishedAt,
  updatedAt,
  url,
  category,
  tags = [],
}: Props) {
  const absoluteCover = coverImage
    ? coverImage.startsWith('http')
      ? coverImage
      : `${SITE_CONFIG.url}${coverImage}`
    : undefined;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    ...(absoluteCover ? { image: [absoluteCover] } : {}),
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.organization.name,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.organization.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: category,
    keywords: tags.join(', '),
    inLanguage: SITE_CONFIG.locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
