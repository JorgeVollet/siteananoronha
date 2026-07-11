-- =============================================
-- TABELA: articles
-- Sistema editorial (Blog + Normas + Curiosidades + Brainstorming Sketch)
-- =============================================
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null check (category in ('blog', 'normas', 'curiosidades', 'sketch')),
  title text not null,
  subtitle text,
  excerpt text,
  content jsonb, -- estrutura TipTap (JSON) ou fallback string
  cover_image text,
  cover_alt text,
  tags text[] not null default '{}',
  author text default 'Ana Laura Noronha',
  reading_time_minutes integer,
  seo_meta_description text,
  seo_keywords text[],
  is_published boolean not null default false,
  published_at timestamptz,
  views integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

-- Índices para performance
create index idx_articles_category_published
  on public.articles(category, published_at desc)
  where is_published = true;

create index idx_articles_slug
  on public.articles(slug);

create index idx_articles_published_at
  on public.articles(published_at desc)
  where is_published = true;

-- =============================================
-- RLS Policies
-- =============================================
alter table public.articles enable row level security;

-- Leitura pública apenas de artigos publicados COM data no passado (respeita agendamento)
create policy "articles_public_read"
  on public.articles for select
  using (
    is_published = true
    and (published_at is null or published_at <= now())
  );

-- Escrita: apenas usuários autenticados (admin)
create policy "articles_admin_write"
  on public.articles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- =============================================
-- Trigger touch_updated_at
-- =============================================
create trigger touch_articles
  before update on public.articles
  for each row execute procedure public.touch_updated_at();
