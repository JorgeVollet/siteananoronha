import type { MetadataRoute } from 'next';
import { createAdminClient } from '@/lib/supabase/admin';
import { SITE_CONFIG, CATEGORY_META, type CategoryKey } from '@/lib/seo/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_CONFIG.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/normas-tecnicas`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/curiosidades`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/brainstorming-sketch`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createAdminClient();
    const { data: articles } = await supabase
      .from('articles')
      .select('slug, category, published_at, updated_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    articlePages = (articles ?? []).map((a) => {
      const meta = CATEGORY_META[a.category as CategoryKey];
      return {
        url: `${SITE_CONFIG.url}/${meta.slug}/${a.slug}`,
        lastModified: new Date(a.updated_at ?? a.published_at ?? now),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    });
  } catch (err) {
    console.error('sitemap: falha ao ler artigos', err);
  }

  return [...staticPages, ...articlePages];
}
