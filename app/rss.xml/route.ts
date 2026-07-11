import { createAdminClient } from '@/lib/supabase/admin';
import { SITE_CONFIG, CATEGORY_META, type CategoryKey } from '@/lib/seo/site-config';

export const revalidate = 3600;

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function absoluteCover(cover: string | null): string | null {
  if (!cover) return null;
  return cover.startsWith('http') ? cover : `${SITE_CONFIG.url}${cover}`;
}

export async function GET() {
  let items = '';

  try {
    const supabase = createAdminClient();
    const { data: articles } = await supabase
      .from('articles')
      .select('slug, category, title, excerpt, cover_image, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(50);

    items = (articles ?? [])
      .map((a) => {
        const meta = CATEGORY_META[a.category as CategoryKey];
        const link = `${SITE_CONFIG.url}/${meta.slug}/${a.slug}`;
        const cover = absoluteCover(a.cover_image);
        const pubDate = a.published_at
          ? new Date(a.published_at).toUTCString()
          : new Date().toUTCString();
        const enclosure = cover
          ? `\n      <enclosure url="${cover}" type="image/jpeg" />`
          : '';
        return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(a.excerpt ?? '')}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(meta.label)}</category>${enclosure}
    </item>`;
      })
      .join('');
  } catch (err) {
    console.error('rss: falha ao ler artigos', err);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)} — Conteúdo Editorial</title>
    <link>${SITE_CONFIG.url}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>${SITE_CONFIG.locale}</language>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
