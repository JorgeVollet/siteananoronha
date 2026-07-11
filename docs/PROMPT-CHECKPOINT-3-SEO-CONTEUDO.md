# 🎯 PROMPT PARA CLAUDE CODE — Checkpoint 3: SEO técnico + Dropdown Conteúdo

**Como usar:** cola tudo daqui pra baixo no Claude Code (na raiz do projeto `E:\DESENVOLVIMENTO DE SITES\SITE ANA LAURA NORONHA\SITE NOVO ANA LAURA`).

---

## 📋 CONTEXTO DO PROJETO

Site institucional da **Ana Laura Noronha** (engenheira civil + curadora de interiores) construído em Next.js 14 App Router + Supabase + TypeScript + Tailwind.

**Design System — Atelier × Summit:**
- Cores: paper `#f5f0e9`, panel `#eee5da`, taupe `#9a744d`, ink `#171411`, border `#d8c9b8`, olive `#7a8064`
- Fontes: **Newsreader** (serif títulos) + **Manrope** (sans corpo) — já configuradas em `tailwind.config.ts`
- URL produção: `https://analauranoronha.com.br` (Vercel)

**O que já foi feito (Checkpoints 1 e 2):**
- Migration `006_articles.sql` + `007_articles_featured.sql` aplicadas
- Tabela `public.articles` com 20 artigos publicados em 4 categorias:
  - `blog` (8 artigos)
  - `normas` (5 artigos)
  - `curiosidades` (4 artigos)
  - `sketch` (3 artigos)
- Páginas públicas funcionando: `/blog`, `/normas-tecnicas`, `/curiosidades`, `/brainstorming-sketch`, `/[categoria]/[slug]`
- Painel admin em `/admin/artigos` com TipTap editor
- `lib/articles.ts` com helpers: `getAllSlugsForCategory`, `getLatestArticles`, `getLatestArticlesByCategory`, `getArticleBySlug`, `createAdminClient`
- Capas locais salvas em `public/capas/` com nomes tipo `01-quanto-custa-reformar-uma-casa.jpeg` até `20-detalhe-nao-se-ve.jpeg`

**Schema da tabela `articles` (colunas relevantes):**
```
id uuid, slug text, category text ('blog'|'normas'|'curiosidades'|'sketch'),
title text, subtitle text, excerpt text, content jsonb,
cover_image text, cover_alt text, tags text[], author text,
reading_time_minutes int, seo_meta_description text, seo_keywords text[],
is_published boolean, is_featured boolean,
published_at timestamptz, updated_at timestamptz
```

---

## 🎯 OBJETIVO DO CHECKPOINT 3

Implementar **5 features de SEO técnico + navegação** que fazem o sistema editorial ficar profissional aos olhos do Google, do Google Discover, de AI Overviews e do próprio usuário navegando o site:

1. **`sitemap.xml` dinâmico** — Google descobre todas as páginas e artigos automaticamente
2. **RSS feed** — permite que agregadores e leitores de RSS acompanhem novos artigos
3. **Schema.org JSON-LD** — dá contexto estruturado para Google/Bing/AI entenderem que aquilo é um Article de uma Person (Ana Laura) de uma Organization (AN Engenharia)
4. **Dropdown "Conteúdo" no header** — substitui link único por menu com as 4 categorias
5. **`robots.txt` + OG tags dinâmicas** — completar higiene SEO técnica

---

## 📁 ARQUIVOS A CRIAR / MODIFICAR

### CRIAR:
```
app/sitemap.ts                                    → sitemap.xml dinâmico
app/robots.ts                                     → robots.txt
app/rss.xml/route.ts                              → RSS feed
components/seo/ArticleJsonLd.tsx                  → Schema.org Article
components/seo/BreadcrumbJsonLd.tsx               → Schema.org BreadcrumbList
components/seo/PersonJsonLd.tsx                   → Schema.org Person (Ana Laura)
components/seo/OrganizationJsonLd.tsx             → Schema.org Organization
components/navigation/ContentDropdown.tsx         → dropdown "Conteúdo" (client)
lib/seo/site-config.ts                            → constantes SEO (URL, autor, org)
```

### MODIFICAR:
```
components/Header.tsx (ou onde estiver a nav)     → adicionar ContentDropdown
app/[categoria]/[slug]/page.tsx                   → inserir ArticleJsonLd + BreadcrumbJsonLd
app/layout.tsx                                    → inserir PersonJsonLd + OrganizationJsonLd (globais)
next.config.js                                    → garantir headers de cache no sitemap/rss (opcional)
```

---

## ⚙️ INSTRUÇÕES DETALHADAS (passo a passo)

### PASSO 1 — Criar `lib/seo/site-config.ts`

Centraliza constantes de SEO/autoria pra evitar strings mágicas espalhadas.

```typescript
// lib/seo/site-config.ts
export const SITE_CONFIG = {
  url: 'https://analauranoronha.com.br',
  name: 'Ana Laura Noronha',
  brandName: 'AN Engenharia',
  tagline: 'Engenharia civil + curadoria de interiores',
  description:
    'Ana Laura Noronha — engenheira civil e curadora de interiores. Projetos residenciais integrados em Horizontina/RS e Sul do Brasil.',
  locale: 'pt-BR',
  author: {
    name: 'Ana Laura Noronha',
    jobTitle: 'Engenheira Civil e Curadora de Interiores',
    url: 'https://analauranoronha.com.br',
    email: 'contato@analauranoronha.com.br',
    telephone: '+55-55-XXXX-XXXX', // substituir pelo real depois
    image: 'https://analauranoronha.com.br/ana-laura-perfil.jpg',
    sameAs: [
      // preencher com Instagram/LinkedIn quando forem definidos
    ],
    address: {
      locality: 'Horizontina',
      region: 'RS',
      country: 'BR',
    },
  },
  organization: {
    name: 'AN Engenharia',
    legalName: 'Ana Laura Noronha - Engenharia e Interiores',
    url: 'https://analauranoronha.com.br',
    logo: 'https://analauranoronha.com.br/logo.png',
    foundingDate: '2019',
    founder: 'Ana Laura Noronha',
  },
} as const;

export const CATEGORY_META: Record<
  'blog' | 'normas' | 'curiosidades' | 'sketch',
  { slug: string; label: string; description: string }
> = {
  blog: {
    slug: 'blog',
    label: 'Blog',
    description: 'Guias práticos sobre reforma, orçamento e projeto residencial.',
  },
  normas: {
    slug: 'normas-tecnicas',
    label: 'Normas Técnicas',
    description: 'NBR, ART, RRT e normas que protegem seu projeto.',
  },
  curiosidades: {
    slug: 'curiosidades',
    label: 'Curiosidades',
    description: 'Design, iluminação, paletas e detalhes que fazem diferença.',
  },
  sketch: {
    slug: 'brainstorming-sketch',
    label: 'Brainstorming Sketch',
    description: 'Conceitos de projeto, princípios estéticos e referências.',
  },
};
```

---

### PASSO 2 — `app/sitemap.ts`

Next.js 14 gera automaticamente `sitemap.xml` a partir desse arquivo.

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { createAdminClient } from '@/lib/articles';
import { SITE_CONFIG, CATEGORY_META } from '@/lib/seo/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createAdminClient();

  const { data: articles } = await supabase
    .from('articles')
    .select('slug, category, published_at, updated_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  const now = new Date();

  // páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_CONFIG.url,                                     lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_CONFIG.url}/sobre`,                          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_CONFIG.url}/servicos`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_CONFIG.url}/projetos`,                       lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_CONFIG.url}/contato`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_CONFIG.url}/blog`,                           lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_CONFIG.url}/normas-tecnicas`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_CONFIG.url}/curiosidades`,                   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_CONFIG.url}/brainstorming-sketch`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
  ];

  // artigos dinâmicos
  const articlePages: MetadataRoute.Sitemap = (articles ?? []).map((a) => ({
    url: `${SITE_CONFIG.url}/${CATEGORY_META[a.category as keyof typeof CATEGORY_META].slug}/${a.slug}`,
    lastModified: new Date(a.updated_at ?? a.published_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...articlePages];
}
```

**Verificação:** depois do build, acessar `https://analauranoronha.com.br/sitemap.xml` deve retornar XML com ~29 URLs (9 estáticas + 20 artigos).

---

### PASSO 3 — `app/robots.ts`

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
```

---

### PASSO 4 — RSS Feed em `app/rss.xml/route.ts`

Route handler que retorna XML RSS 2.0.

```typescript
// app/rss.xml/route.ts
import { createAdminClient } from '@/lib/articles';
import { SITE_CONFIG, CATEGORY_META } from '@/lib/seo/site-config';

export const revalidate = 3600; // 1 hora

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const supabase = createAdminClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, category, title, excerpt, cover_image, published_at, tags')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(50);

  const items = (articles ?? [])
    .map((a) => {
      const categoryMeta = CATEGORY_META[a.category as keyof typeof CATEGORY_META];
      const link = `${SITE_CONFIG.url}/${categoryMeta.slug}/${a.slug}`;
      const cover = a.cover_image?.startsWith('http')
        ? a.cover_image
        : `${SITE_CONFIG.url}${a.cover_image}`;
      return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(a.excerpt ?? '')}</description>
      <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
      <category>${escapeXml(categoryMeta.label)}</category>
      <enclosure url="${cover}" type="image/jpeg" />
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)} — Conteúdo Editorial</title>
    <link>${SITE_CONFIG.url}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>${SITE_CONFIG.locale}</language>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

---

### PASSO 5 — Componentes de Schema.org JSON-LD

Crie **4 componentes** em `components/seo/`:

#### 5.1 — `components/seo/PersonJsonLd.tsx`

```typescript
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
```

#### 5.2 — `components/seo/OrganizationJsonLd.tsx`

```typescript
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
```

#### 5.3 — `components/seo/ArticleJsonLd.tsx`

```typescript
import { SITE_CONFIG } from '@/lib/seo/site-config';

interface ArticleJsonLdProps {
  title: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string | null;
  url: string;
  category: string;
  tags?: string[];
}

export function ArticleJsonLd({
  title,
  description,
  coverImage,
  publishedAt,
  updatedAt,
  url,
  category,
  tags = [],
}: ArticleJsonLdProps) {
  const absoluteCover = coverImage.startsWith('http')
    ? coverImage
    : `${SITE_CONFIG.url}${coverImage}`;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: [absoluteCover],
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
```

#### 5.4 — `components/seo/BreadcrumbJsonLd.tsx`

```typescript
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

---

### PASSO 6 — Injetar JSON-LD nos lugares certos

#### 6.1 — Em `app/layout.tsx` (persistente no site inteiro)

Adicione dentro do `<body>` (antes do `{children}`):

```tsx
import { PersonJsonLd } from '@/components/seo/PersonJsonLd';
import { OrganizationJsonLd } from '@/components/seo/OrganizationJsonLd';

// ...

<body>
  <PersonJsonLd />
  <OrganizationJsonLd />
  {/* ...resto do layout */}
  {children}
</body>
```

#### 6.2 — Em `app/[categoria]/[slug]/page.tsx`

Localize o arquivo do artigo individual e adicione:

```tsx
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { SITE_CONFIG, CATEGORY_META } from '@/lib/seo/site-config';

// dentro do componente da página, no return:
const categoryMeta = CATEGORY_META[article.category];
const articleUrl = `${SITE_CONFIG.url}/${categoryMeta.slug}/${article.slug}`;

return (
  <>
    <ArticleJsonLd
      title={article.title}
      description={article.excerpt ?? article.seo_meta_description ?? ''}
      coverImage={article.cover_image}
      publishedAt={article.published_at}
      updatedAt={article.updated_at}
      url={articleUrl}
      category={categoryMeta.label}
      tags={article.tags ?? []}
    />
    <BreadcrumbJsonLd
      items={[
        { name: 'Início', url: SITE_CONFIG.url },
        { name: categoryMeta.label, url: `${SITE_CONFIG.url}/${categoryMeta.slug}` },
        { name: article.title, url: articleUrl },
      ]}
    />
    {/* ...resto da página do artigo */}
  </>
);
```

---

### PASSO 7 — Melhorar `generateMetadata` do artigo (OG dinâmica)

No mesmo `app/[categoria]/[slug]/page.tsx`, garantir que a função `generateMetadata` retorne meta tags completas:

```typescript
export async function generateMetadata({ params }: { params: { categoria: string; slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  const categoryMeta = CATEGORY_META[article.category];
  const url = `${SITE_CONFIG.url}/${categoryMeta.slug}/${article.slug}`;
  const coverAbsolute = article.cover_image.startsWith('http')
    ? article.cover_image
    : `${SITE_CONFIG.url}${article.cover_image}`;

  return {
    title: `${article.title} | ${SITE_CONFIG.name}`,
    description: article.seo_meta_description ?? article.excerpt,
    keywords: article.seo_keywords,
    authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.author.url }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt ?? '',
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [SITE_CONFIG.author.name],
      section: categoryMeta.label,
      tags: article.tags ?? [],
      images: [
        {
          url: coverAbsolute,
          width: 1600,
          height: 1100,
          alt: article.cover_alt ?? article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt ?? '',
      images: [coverAbsolute],
    },
  };
}
```

---

### PASSO 8 — Dropdown "Conteúdo" no Header

#### 8.1 — Criar `components/navigation/ContentDropdown.tsx`

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { CATEGORY_META } from '@/lib/seo/site-config';

export function ContentDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const categories = Object.values(CATEGORY_META);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-medium text-ink hover:text-taupe transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Conteúdo
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 rounded-lg border border-border bg-paper shadow-lg overflow-hidden">
          <div className="p-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group block rounded-md px-4 py-3 hover:bg-panel transition-colors"
                onClick={() => setOpen(false)}
              >
                <div className="font-serif text-base text-ink group-hover:text-taupe transition-colors">
                  {cat.label}
                </div>
                <div className="text-xs text-ink/60 mt-0.5">{cat.description}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

#### 8.2 — Modificar `components/Header.tsx` (ou onde estiver a navegação principal)

Substituir qualquer link antigo que aponte pra `/blog` sozinho pelo componente:

```tsx
import { ContentDropdown } from '@/components/navigation/ContentDropdown';

// no meio dos outros links do header (desktop):
<ContentDropdown />
```

#### 8.3 — Mobile: acordeão dentro do drawer

No mesmo Header, dentro do menu mobile (drawer), substituir o link único de blog por um acordeão simples:

```tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { CATEGORY_META } from '@/lib/seo/site-config';

export function MobileContentAccordion({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const categories = Object.values(CATEGORY_META);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-lg font-serif text-ink"
      >
        Conteúdo
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-4 space-y-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="block pl-4 py-2 text-base text-ink/80"
              onClick={onNavigate}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 🚫 RESTRIÇÕES

- **NÃO instalar bibliotecas novas.** Tudo com Next.js 14 nativo + Tailwind + Supabase que já estão no projeto. Único ícone precisa é `ChevronDown` do `lucide-react` (que já deve estar instalado).
- **NÃO alterar** o schema da tabela `articles` — só ler dela.
- **NÃO alterar** o design system (cores/fontes) — usar as classes Tailwind já configuradas (`bg-paper`, `text-ink`, `text-taupe`, `border-border` etc.).
- **NÃO adicionar** telefone real na `SITE_CONFIG` — deixar o placeholder `+55-55-XXXX-XXXX` até Jorge confirmar o número.
- **NÃO expor** a `SUPABASE_SERVICE_ROLE_KEY` — usar `createAdminClient` que já isola isso.
- **NÃO usar cookies** em nenhum dos handlers de sitemap/RSS — usar `createAdminClient` (service_role) porque esses rodam em build/edge sem contexto de request.
- **NÃO criar** páginas de erro ou fallback — se o Supabase falhar, deixar Next.js retornar sitemap/RSS vazio sem crashar.

---

## ✅ CHECKLIST DE VERIFICAÇÃO (rodar depois do build)

1. `pnpm build` (ou `npm run build`) roda sem erro de tipo
2. Acessar `http://localhost:3000/sitemap.xml` → XML com ~29 URLs
3. Acessar `http://localhost:3000/robots.txt` → deve conter `Sitemap: https://analauranoronha.com.br/sitemap.xml`
4. Acessar `http://localhost:3000/rss.xml` → XML RSS 2.0 com últimos artigos
5. Abrir qualquer artigo, View Source, procurar `application/ld+json` → tem que ter **3 scripts**: Person, Organization, Article, BreadcrumbList
6. Passar a URL do artigo em https://search.google.com/test/rich-results → deve reconhecer Article + BreadcrumbList sem erro
7. Passar a home em https://search.google.com/test/rich-results → deve reconhecer Person + Organization
8. Header desktop: hover em "Conteúdo" abre dropdown com 4 categorias
9. Header mobile: menu drawer tem acordeão "Conteúdo" que expande em 4 links

---

## 📤 FORMATO DE SAÍDA ESPERADO

Ao final, você deve me apresentar:

1. Lista de todos os arquivos criados e modificados
2. Confirmação que `pnpm build` (ou `npm run build`) passou
3. Um resumo em 5 linhas do que ficou instalado

Depois disso, eu (Jorge) faço `git commit` + `git push` e a Vercel builda em produção.

---

**Se qualquer parte estiver ambígua, PARE e pergunte antes de assumir.** Prefiro perder 2 minutos alinhando do que 30 minutos desfazendo.
