-- =============================================
-- TABELA: site_content
-- Conteúdo editável do site (key-value por seção)
-- =============================================
create table public.site_content (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  key text not null,
  value_text text,
  value_json jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  unique(section, key)
);

-- =============================================
-- TABELA: portfolio_projects
-- =============================================
create table public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('engenharia', 'marcenaria')),
  nome text not null,
  tipologia text not null,
  servicos text[] not null default '{}',
  ordem integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_portfolio_category on public.portfolio_projects(category, ordem)
  where is_published = true;

-- =============================================
-- TABELA: portfolio_media
-- Mídias por projeto (modo misto: photo, before_after, video)
-- =============================================
create table public.portfolio_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  type text not null check (type in ('photo', 'before_after', 'video')),
  ordem integer not null default 0,
  url text,
  alt text,
  before_url text,
  before_alt text,
  video_url text,
  video_source text check (video_source in ('upload', 'youtube', 'vimeo')),
  video_thumbnail text,
  created_at timestamptz not null default now()
);

create index idx_media_project on public.portfolio_media(project_id, ordem);

-- =============================================
-- TABELA: cta_clicks (tracking custom)
-- =============================================
create table public.cta_clicks (
  id uuid primary key default gen_random_uuid(),
  cta_location text not null,
  user_agent text,
  referrer text,
  created_at timestamptz not null default now()
);

create index idx_cta_clicks_date on public.cta_clicks(created_at desc);

-- =============================================
-- RLS Policies
-- =============================================
alter table public.site_content enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_media enable row level security;
alter table public.cta_clicks enable row level security;

create policy "site_content_public_read" on public.site_content
  for select using (true);

create policy "portfolio_projects_public_read" on public.portfolio_projects
  for select using (is_published = true);

create policy "portfolio_media_public_read" on public.portfolio_media
  for select using (
    exists (
      select 1 from public.portfolio_projects p
      where p.id = portfolio_media.project_id and p.is_published = true
    )
  );

create policy "site_content_admin_write" on public.site_content
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "portfolio_projects_admin_write" on public.portfolio_projects
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "portfolio_media_admin_write" on public.portfolio_media
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "cta_clicks_anon_insert" on public.cta_clicks
  for insert with check (true);

create policy "cta_clicks_admin_read" on public.cta_clicks
  for select using (auth.role() = 'authenticated');

-- =============================================
-- Trigger touch_updated_at
-- =============================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger touch_site_content
  before update on public.site_content
  for each row execute procedure public.touch_updated_at();

create trigger touch_portfolio_projects
  before update on public.portfolio_projects
  for each row execute procedure public.touch_updated_at();

-- =============================================
-- Seed: site_content defaults
-- (valores iniciais — admin pode sobrescrever pelo painel)
-- =============================================
insert into public.site_content (section, key, value_text) values
  ('hero',     'titulo',           'Cada projeto é único, cada execução é precisa.'),
  ('hero',     'subtitulo',        'Engenharia, arquitetura e marcenaria sob medida — um método integrado, do conceito à entrega.'),
  ('hero',     'imagem_principal', '/img/1.png'),
  ('hero',     'cta_texto',        'Solicitar Orçamento'),
  ('sobre',    'titulo',           'Sobre Ana Laura'),
  ('sobre',    'corpo',            'Engenheira civil e projetista de interiores, com método integrado que une arquitetura, gestão de obra e marcenaria sob medida.'),
  ('sobre',    'imagem',           '/img/9.png'),
  ('servicos', 'subtitulo',        'Da concepção arquitetônica ao último detalhe da marcenaria, um método integrado.'),
  ('servicos', 'imagem_ana',       '/img/9.png'),
  ('footer',   'whatsapp',         '5521996621363'),
  ('footer',   'email',            'contato@analauraarquitetura.com.br'),
  ('footer',   'instagram',        'https://instagram.com/analauraarquitetura'),
  ('footer',   'cidade',           'Barra da Tijuca, RJ'),
  ('footer',   'crea',             'CREA-RS 222362.2305')
on conflict (section, key) do update
  set value_text = excluded.value_text;
