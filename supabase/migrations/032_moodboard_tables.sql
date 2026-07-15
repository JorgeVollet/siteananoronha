-- ============================================================
-- MOODBOARD GENERATOR — 3 tabelas + RLS + índices
-- ============================================================

-- 1. Sessões
create table if not exists public.moodboard_sessions (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  status text not null default 'created' check (status in (
    'created', 'uploading', 'processing', 'generated', 'delivered', 'failed'
  )),
  cover_url text,
  palette jsonb,
  template_variant text default 'sereno',
  ip_address text,
  user_agent text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  generated_at timestamptz
);

create index if not exists moodboard_sessions_slug_idx
  on public.moodboard_sessions(slug);
create index if not exists moodboard_sessions_status_idx
  on public.moodboard_sessions(status);
create index if not exists moodboard_sessions_ip_created_idx
  on public.moodboard_sessions(ip_address, created_at desc);

-- 2. Imagens
create table if not exists public.moodboard_images (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.moodboard_sessions(id) on delete cascade,
  original_url text not null,
  processed_url text,
  category text check (category in (
    'furniture', 'texture', 'color', 'art', 'architecture', 'other'
  )),
  descriptor text,
  confidence numeric,
  slot_position text,
  created_at timestamptz default now()
);

create index if not exists moodboard_images_session_idx
  on public.moodboard_images(session_id);

-- 3. Leads
create table if not exists public.moodboard_leads (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.moodboard_sessions(id) on delete cascade,
  name text not null,
  email text not null,
  whatsapp text,
  consent_marketing boolean default true,
  email_sent boolean default false,
  ana_notified boolean default false,
  created_at timestamptz default now()
);

create index if not exists moodboard_leads_email_idx
  on public.moodboard_leads(email);
create index if not exists moodboard_leads_session_idx
  on public.moodboard_leads(session_id);
create index if not exists moodboard_leads_created_idx
  on public.moodboard_leads(created_at desc);

-- ============================================================
-- RLS
-- ============================================================

alter table public.moodboard_sessions enable row level security;
alter table public.moodboard_images enable row level security;
alter table public.moodboard_leads enable row level security;

-- Sessions: anon pode criar e ler (slug é público por design)
create policy "moodboard_sessions_public_insert"
  on public.moodboard_sessions for insert to anon with check (true);
create policy "moodboard_sessions_public_read"
  on public.moodboard_sessions for select to anon using (true);
create policy "moodboard_sessions_public_update"
  on public.moodboard_sessions for update to anon using (true) with check (true);

-- Images: mesma política
create policy "moodboard_images_public_insert"
  on public.moodboard_images for insert to anon with check (true);
create policy "moodboard_images_public_read"
  on public.moodboard_images for select to anon using (true);
create policy "moodboard_images_public_update"
  on public.moodboard_images for update to anon using (true) with check (true);

-- Leads: só endpoint (service_role) insere; admin autenticado lê
create policy "moodboard_leads_service_insert"
  on public.moodboard_leads for insert to service_role with check (true);
create policy "moodboard_leads_admin_read"
  on public.moodboard_leads for select to authenticated using (true);
