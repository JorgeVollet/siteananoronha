import { SITE_CONFIG } from '@/lib/seo/site-config';

export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.author.name,
    jobTitle: SITE_CONFIG.author.jobTitle,
    url: SITE_CONFIG.author.url,
    email: SITE_CONFIG.author.email,
    image: SITE_CONFIG.author.image,
    sameAs: SITE_CONFIG.author.sameAs,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.author.address.locality,
      addressRegion: SITE_CONFIG.author.address.region,
      addressCountry: SITE_CONFIG.author.address.country,
    },
    worksFor: {
      '@type': 'Organization',
      name: SITE_CONFIG.organization.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
