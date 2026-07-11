import { SITE_CONFIG } from '@/lib/seo/site-config';

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.organization.name,
    legalName: SITE_CONFIG.organization.legalName,
    url: SITE_CONFIG.organization.url,
    logo: SITE_CONFIG.organization.logo,
    foundingDate: SITE_CONFIG.organization.foundingDate,
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.organization.founder,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
