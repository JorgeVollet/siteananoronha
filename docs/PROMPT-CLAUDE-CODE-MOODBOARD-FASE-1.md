# 🎯 PROMPT PARA CLAUDE CODE — Gerador de Moodboard (Fase 1 MVP)

**Como usar:** cola tudo daqui pra baixo no Claude Code na raiz do projeto.

**⚠️ Antes de começar, LEIA o spec completo:** `docs/specs/2026-07-13-moodboard-generator-design.md`. Todas as decisões arquiteturais estão lá. Este prompt executa a **Fase 1 (MVP)** definida no item 11 do spec.

---

## 📋 Contexto do projeto

Site institucional da **Ana Laura Noronha** (Engenheira Civil + Curadora de Interiores) em Next.js 14 App Router + Supabase + TypeScript + Tailwind.

**Domínio:** `https://www.ananoronha.eng`

**Design System — Atelier × Summit:**
- Cores: `paper #f5f0e9`, `panel #eee5da`, `taupe #9a744d`, `ink #171411`, `border #d8c9b8`
- Fontes: **Newsreader** serif (`--font-display`), **Manrope** sans (`--font-body`), **Caveat** manuscrita (`--font-handwriting`)

**Stack existente:**
- Next.js 14 (App Router, RSC, Edge)
- Supabase (auth + postgres + storage já configurados)
- TipTap para editor de artigos
- Vercel deploy
- Padrão de components: inline styles + Tailwind, alguns componentes usam `useRevealOnScroll`

**Já existe:** `/sketch/moodboard` — página empática com CTA WhatsApp. Vamos ADICIONAR um segundo botão ao lado do atual chamado "Criar meu moodboard com nossa ferramenta exclusiva →" que leva para `/moodboard/criar`.

---

## 🎯 Objetivo desta Fase 1 (MVP)

Implementar a ferramenta funcional end-to-end com **1 template editorial** ("Sereno"), sem variantes. Objetivo é:

1. Visitante em `/sketch/moodboard` clica no novo botão
2. Vai para `/moodboard/criar`
3. Sobe 3-12 fotos (drag & drop)
4. Cada foto tem fundo removido via WASM no client
5. Click "Gerar meu moodboard" → categoriza via Claude Vision → gera PNG editorial via `@vercel/og`
6. Redireciona para `/moodboard/[slug]` com preview do resultado
7. Click "Baixar" → modal captura email → envia PNG por email pro visitante + notifica Ana

---

## 📦 PASSO 1 — Instalar dependências

```bash
pnpm add @imgly/background-removal @anthropic-ai/sdk @vercel/og resend @upstash/redis @upstash/ratelimit colorthief nanoid react-dropzone react-google-recaptcha-v3 sharp
pnpm add -D @types/colorthief
```

**Justificativas:**
- `@imgly/background-removal` — remove fundo client-side (WASM/WebGPU, grátis)
- `@anthropic-ai/sdk` — Claude Vision para categorização
- `@vercel/og` — renderização PNG via JSX no Edge
- `resend` — envio de emails
- `@upstash/redis` + `@upstash/ratelimit` — rate limiting serverless
- `colorthief` — extração de paleta client-side
- `nanoid` — gerar slugs curtos únicos
- `react-dropzone` — dropzone acessível para uploads
- `sharp` — compressão server-side quando necessário

---

## 🔐 PASSO 2 — Variáveis de ambiente

Adicione ao `.env.local` (NÃO commitar):

```
# Já existentes — não mexer
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Novas — para o Moodboard Generator
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
ANA_NOTIFICATION_EMAIL=contato@ananoronha.eng
NEXT_PUBLIC_SITE_URL=https://www.ananoronha.eng
```

**⚠️ IMPORTANTE:** o Jorge vai criar essas contas depois. Por enquanto, deixe `.env.local.example` com todos os placeholders e **suporte falha graciosa** se `RESEND_API_KEY` ou `UPSTASH_REDIS_REST_URL` estiverem ausentes (loga aviso em dev, mas não crasha).

---

## 🗄️ PASSO 3 — Migration Supabase

Crie o arquivo `supabase/migrations/032_moodboard_tables.sql`:

```sql
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
```

**⚠️ SOBRE STORAGE:** o Jorge vai criar manualmente os 3 buckets no Supabase Dashboard depois:
- `moodboard-originals` (público)
- `moodboard-processed` (público)
- `moodboard-outputs` (público)

Documente isso no `README-MOODBOARD.md` na raiz. Não tente criar via SQL — depende de configuração manual do Supabase.

---

## 📁 PASSO 4 — Estrutura de arquivos a criar

### Backend (Server)

```
app/api/moodboard/
  sessions/
    route.ts                   # POST cria session
  [sessionId]/
    upload/route.ts            # POST recebe imagem processada
    generate/route.ts          # POST roda pipeline (SSE)
    deliver/route.ts           # POST captura lead + envia emails

lib/moodboard/
  supabase-admin.ts            # cliente admin isolado
  categorize.ts                # wrapper Claude Vision
  template-engine.ts           # assignToSlots + variant picker
  mailer.ts                    # Resend + templates HTML
  rate-limit.ts                # Upstash wrappers
  types.ts                     # tipos compartilhados
```

### Frontend (Client)

```
app/moodboard/
  criar/
    page.tsx                   # landing + uploader
  [sessionSlug]/
    page.tsx                   # resultado

components/moodboard/
  MoodboardUploader.tsx        # dropzone + preview + estados
  MoodboardResult.tsx          # tela do resultado
  LeadCaptureModal.tsx         # modal nome+email
  LoadingSteps.tsx             # loading poético
  PaletteChips.tsx             # bolinhas de paleta
```

### Template PNG

```
app/api/moodboard/[sessionId]/generate/
  route.ts                     # export runtime = 'edge'
  templates/
    sereno.tsx                 # JSX que vira PNG via @vercel/og
```

---

## 🔨 PASSO 5 — Implementação por camada

### 5.1 Tipos compartilhados (`lib/moodboard/types.ts`)

```typescript
export type ImageCategory =
  | 'furniture'
  | 'texture'
  | 'color'
  | 'art'
  | 'architecture'
  | 'other';

export type SlotPosition = 'A' | 'B' | 'C' | 'D';

export type TemplateVariant = 'sereno' | 'vibrante' | 'contraste';

export type MoodboardSession = {
  id: string;
  slug: string;
  status: 'created' | 'uploading' | 'processing' | 'generated' | 'delivered' | 'failed';
  cover_url: string | null;
  palette: string[] | null;
  template_variant: TemplateVariant;
  created_at: string;
  generated_at: string | null;
};

export type MoodboardImage = {
  id: string;
  session_id: string;
  original_url: string;
  processed_url: string | null;
  category: ImageCategory | null;
  descriptor: string | null;
  confidence: number | null;
  slot_position: SlotPosition | null;
};

export type CategorizedImage = MoodboardImage & {
  category: ImageCategory;
  confidence: number;
};
```

### 5.2 Cliente Supabase admin (`lib/moodboard/supabase-admin.ts`)

```typescript
import { createClient } from '@supabase/supabase-js';

export function createMoodboardAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
```

### 5.3 Rate limit (`lib/moodboard/rate-limit.ts`)

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

function getRedis() {
  if (redis) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    console.warn('[moodboard] Upstash Redis não configurado — rate limit desabilitado');
    return null;
  }
  redis = new Redis({ url, token });
  return redis;
}

// 3 sessions criadas por IP em 24h
export function getSessionRateLimit() {
  const r = getRedis();
  if (!r) return null;
  return new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(3, '24h'),
    prefix: 'moodboard:session',
  });
}

// 3 gerações por IP em 24h
export function getGenerateRateLimit() {
  const r = getRedis();
  if (!r) return null;
  return new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(3, '24h'),
    prefix: 'moodboard:generate',
  });
}

export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}
```

### 5.4 Categorização (`lib/moodboard/categorize.ts`)

```typescript
import Anthropic from '@anthropic-ai/sdk';
import type { ImageCategory } from './types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export type CategoryResult = {
  category: ImageCategory;
  should_remove_background: boolean;
  descriptor: string;
  confidence: number;
};

export async function categorizeImage(imageUrl: string): Promise<CategoryResult> {
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'url', url: imageUrl },
          },
          {
            type: 'text',
            text: `Analise esta imagem de referência de design de interiores.
Retorne APENAS um JSON estrito, sem texto adicional:
{
  "category": "furniture" | "texture" | "color" | "art" | "architecture",
  "should_remove_background": boolean,
  "descriptor": "string curta (3-5 palavras em português)",
  "confidence": 0.0 a 1.0
}

Categorias:
- furniture: móveis, cadeiras, sofás, poltronas, mesas
- texture: texturas, pisos, tecidos, revestimentos, papéis
- color: amostras de cor, tintas, superfícies coloridas puras
- art: obras de arte, quadros, esculturas, cerâmica
- architecture: ambientes, arquitetura, plantas, projetos completos

should_remove_background: true para objetos isolados, false para ambientes/cenas.`,
          },
        ],
      }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const parsed = JSON.parse(jsonMatch[0]) as CategoryResult;
    return parsed;
  } catch (error) {
    console.error('[moodboard/categorize] fallback:', error);
    // Fallback: categoria genérica com confidence baixa
    return {
      category: 'other' as ImageCategory,
      should_remove_background: true,
      descriptor: 'referência visual',
      confidence: 0.3,
    };
  }
}
```

### 5.5 Engine de slots (`lib/moodboard/template-engine.ts`)

```typescript
import type { CategorizedImage, SlotPosition, ImageCategory, TemplateVariant } from './types';

type SlotAssignment = {
  A?: CategorizedImage; // hero — móvel/arquitetura/arte
  B?: CategorizedImage; // textura/cor
  C?: CategorizedImage; // objeto destacado
  D?: CategorizedImage; // ambiente panorâmico
};

const PRIORITIES: Record<SlotPosition, ImageCategory[]> = {
  A: ['furniture', 'architecture', 'art'],
  B: ['texture', 'color'],
  C: ['furniture', 'art'],
  D: ['architecture'],
};

export function assignToSlots(images: CategorizedImage[]): SlotAssignment {
  const assigned: SlotAssignment = {};
  const used = new Set<string>();

  function pick(slot: SlotPosition) {
    for (const cat of PRIORITIES[slot]) {
      const candidates = images
        .filter((img) => !used.has(img.id) && img.category === cat)
        .sort((a, b) => b.confidence - a.confidence);
      if (candidates.length > 0) {
        assigned[slot] = candidates[0];
        used.add(candidates[0].id);
        return;
      }
    }
    // Fallback: qualquer imagem sobrando com melhor confidence
    const fallback = images
      .filter((img) => !used.has(img.id))
      .sort((a, b) => b.confidence - a.confidence);
    if (fallback[0]) {
      assigned[slot] = fallback[0];
      used.add(fallback[0].id);
    }
  }

  pick('A');
  pick('D');
  pick('C');
  pick('B');

  return assigned;
}

export function pickTemplateVariant(palette: string[]): TemplateVariant {
  // Fase 1: sempre 'sereno'. Fases 2+ implementam decisão real.
  return 'sereno';
}
```

### 5.6 Endpoint: criar session (`app/api/moodboard/sessions/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { createMoodboardAdminClient } from '@/lib/moodboard/supabase-admin';
import { getSessionRateLimit, getClientIp } from '@/lib/moodboard/rate-limit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  const rl = getSessionRateLimit();
  if (rl) {
    const { success, remaining } = await rl.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'rate_limit', message: 'Limite diário atingido. Tente novamente amanhã.' },
        { status: 429 }
      );
    }
  }

  const slug = nanoid(8);
  const supabase = createMoodboardAdminClient();

  const { data, error } = await supabase
    .from('moodboard_sessions')
    .insert({
      slug,
      status: 'created',
      ip_address: ip,
      user_agent: req.headers.get('user-agent'),
    })
    .select()
    .single();

  if (error || !data) {
    console.error('[moodboard/sessions] error:', error);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }

  return NextResponse.json({ sessionId: data.id, slug: data.slug });
}
```

### 5.7 Endpoint: upload (`app/api/moodboard/[sessionId]/upload/route.ts`)

Recebe multipart com arquivo já processado (bg-removed) do client. Faz upload no Storage.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createMoodboardAdminClient } from '@/lib/moodboard/supabase-admin';

export async function POST(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const formData = await req.formData();
  const original = formData.get('original') as File | null;
  const processed = formData.get('processed') as File | null;

  if (!original) {
    return NextResponse.json({ error: 'missing_file' }, { status: 400 });
  }

  // Validação básica
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(original.type)) {
    return NextResponse.json({ error: 'invalid_mime' }, { status: 400 });
  }
  if (original.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'too_large' }, { status: 400 });
  }

  const supabase = createMoodboardAdminClient();

  // Verificar session existe
  const { data: session } = await supabase
    .from('moodboard_sessions')
    .select('slug')
    .eq('id', params.sessionId)
    .single();
  if (!session) return NextResponse.json({ error: 'session_not_found' }, { status: 404 });

  const imageId = crypto.randomUUID();
  const originalPath = `${session.slug}/${imageId}-original.${original.name.split('.').pop()}`;
  const processedPath = processed
    ? `${session.slug}/${imageId}-processed.png`
    : null;

  // Upload original
  const originalBuffer = Buffer.from(await original.arrayBuffer());
  const { error: origErr } = await supabase.storage
    .from('moodboard-originals')
    .upload(originalPath, originalBuffer, {
      contentType: original.type,
      upsert: false,
    });
  if (origErr) {
    console.error('[upload] original error:', origErr);
    return NextResponse.json({ error: 'storage_failed' }, { status: 500 });
  }

  const { data: origUrl } = supabase.storage
    .from('moodboard-originals')
    .getPublicUrl(originalPath);

  let processedUrl: string | null = null;
  if (processed && processedPath) {
    const processedBuffer = Buffer.from(await processed.arrayBuffer());
    await supabase.storage
      .from('moodboard-processed')
      .upload(processedPath, processedBuffer, {
        contentType: 'image/png',
        upsert: false,
      });
    const { data } = supabase.storage.from('moodboard-processed').getPublicUrl(processedPath);
    processedUrl = data.publicUrl;
  }

  const { data: imageRow, error: imgErr } = await supabase
    .from('moodboard_images')
    .insert({
      id: imageId,
      session_id: params.sessionId,
      original_url: origUrl.publicUrl,
      processed_url: processedUrl,
    })
    .select()
    .single();

  if (imgErr) {
    console.error('[upload] db error:', imgErr);
    return NextResponse.json({ error: 'db_failed' }, { status: 500 });
  }

  return NextResponse.json({
    imageId: imageRow.id,
    originalUrl: imageRow.original_url,
    processedUrl: imageRow.processed_url,
  });
}
```

### 5.8 Endpoint: generate (`app/api/moodboard/[sessionId]/generate/route.ts`)

**Este é o coração.** Não pode ser edge runtime porque usa `@anthropic-ai/sdk` (requer node). Usa nodejs runtime.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';
import { createMoodboardAdminClient } from '@/lib/moodboard/supabase-admin';
import { categorizeImage } from '@/lib/moodboard/categorize';
import { assignToSlots, pickTemplateVariant } from '@/lib/moodboard/template-engine';
import { getGenerateRateLimit, getClientIp } from '@/lib/moodboard/rate-limit';
import { SerenoTemplate } from './templates/sereno';

export const maxDuration = 60; // Vercel Pro necessário para >10s
export const runtime = 'nodejs';

export async function POST(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const ip = getClientIp(req);
  const rl = getGenerateRateLimit();
  if (rl) {
    const { success } = await rl.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
    }
  }

  const supabase = createMoodboardAdminClient();

  // Buscar imagens da session
  const { data: images } = await supabase
    .from('moodboard_images')
    .select('*')
    .eq('session_id', params.sessionId);

  if (!images || images.length < 3) {
    return NextResponse.json(
      { error: 'not_enough_images', message: 'Envie pelo menos 3 imagens.' },
      { status: 400 }
    );
  }

  // Marca processing
  await supabase
    .from('moodboard_sessions')
    .update({ status: 'processing' })
    .eq('id', params.sessionId);

  try {
    // 1. Categoriza em paralelo
    const categorized = await Promise.all(
      images.map(async (img) => {
        const cat = await categorizeImage(img.processed_url || img.original_url);
        await supabase
          .from('moodboard_images')
          .update({
            category: cat.category,
            descriptor: cat.descriptor,
            confidence: cat.confidence,
          })
          .eq('id', img.id);
        return { ...img, ...cat };
      })
    );

    // 2. Paleta — placeholder simples (Fase 1: pega palete fixa; refinar na Fase 2)
    const palette = ['#f5f0e9', '#eee5da', '#c19366', '#9a744d', '#171411'];

    // 3. Slot assignment
    const slots = assignToSlots(categorized as any);

    // Salva slot_position no banco
    for (const [pos, img] of Object.entries(slots)) {
      if (img) {
        await supabase
          .from('moodboard_images')
          .update({ slot_position: pos })
          .eq('id', img.id);
      }
    }

    // 4. Variant
    const variant = pickTemplateVariant(palette);

    // 5. Renderiza PNG via @vercel/og
    const imgResponse = new ImageResponse(
      SerenoTemplate({ slots, palette }),
      { width: 1600, height: 1100 }
    );

    // 6. Salva no Storage
    const pngBuffer = Buffer.from(await imgResponse.arrayBuffer());
    const { data: sess } = await supabase
      .from('moodboard_sessions')
      .select('slug')
      .eq('id', params.sessionId)
      .single();

    const outputPath = `${sess!.slug}.png`;
    await supabase.storage
      .from('moodboard-outputs')
      .upload(outputPath, pngBuffer, {
        contentType: 'image/png',
        upsert: true,
      });
    const { data: outUrl } = supabase.storage
      .from('moodboard-outputs')
      .getPublicUrl(outputPath);

    // 7. Update final
    await supabase
      .from('moodboard_sessions')
      .update({
        status: 'generated',
        cover_url: outUrl.publicUrl,
        palette,
        template_variant: variant,
        generated_at: new Date().toISOString(),
      })
      .eq('id', params.sessionId);

    return NextResponse.json({
      slug: sess!.slug,
      coverUrl: outUrl.publicUrl,
      palette,
    });
  } catch (err) {
    console.error('[moodboard/generate] error:', err);
    await supabase
      .from('moodboard_sessions')
      .update({ status: 'failed' })
      .eq('id', params.sessionId);
    return NextResponse.json({ error: 'generation_failed' }, { status: 500 });
  }
}
```

### 5.9 Template Sereno (`app/api/moodboard/[sessionId]/generate/templates/sereno.tsx`)

```tsx
import React from 'react';
import type { SlotPosition, MoodboardImage } from '@/lib/moodboard/types';

type SerenoProps = {
  slots: Partial<Record<SlotPosition, MoodboardImage>>;
  palette: string[];
};

export function SerenoTemplate({ slots, palette }: SerenoProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '1600px',
        height: '1100px',
        background: '#f5f0e9',
        padding: '48px',
        fontFamily: 'serif',
      }}
    >
      {/* Header editorial */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          letterSpacing: '0.2em',
          color: '#9a744d',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        <span>— AN ENGENHARIA · MOODBOARD EDITORIAL —</span>
        <span>{new Date().toLocaleDateString('pt-BR', {
          day: 'numeric', month: 'long', year: 'numeric',
        })}</span>
      </div>

      {/* Grid principal */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '24px',
          marginTop: '32px',
          flex: 1,
        }}
      >
        {/* Slot A — hero */}
        {slots.A && (
          <img
            src={slots.A.processed_url || slots.A.original_url}
            style={{
              gridRow: 'span 2',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        )}
        {/* Slot B — textura */}
        {slots.B && (
          <img
            src={slots.B.processed_url || slots.B.original_url}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        )}
        {/* Slot C — objeto (fundo removido) */}
        {slots.C && (
          <img
            src={slots.C.processed_url || slots.C.original_url}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              background: '#eee5da',
              borderRadius: '8px',
            }}
          />
        )}
        {/* Slot D — ambiente */}
        {slots.D && (
          <img
            src={slots.D.processed_url || slots.D.original_url}
            style={{
              gridColumn: 'span 2',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        )}
      </div>

      {/* Paleta */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
        {palette.map((color, i) => (
          <div
            key={i}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: color,
              border: '1px solid #d8c9b8',
            }}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          fontSize: '12px',
          letterSpacing: '0.15em',
          color: '#9a744d',
          textTransform: 'uppercase',
          fontWeight: 700,
          textAlign: 'center',
          marginTop: '16px',
        }}
      >
        — Curadoria automatizada por AN Engenharia —
      </div>
    </div>
  );
}
```

### 5.10 Endpoint: deliver (`app/api/moodboard/[sessionId]/deliver/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createMoodboardAdminClient } from '@/lib/moodboard/supabase-admin';
import { sendVisitorEmail, sendAnaNotification } from '@/lib/moodboard/mailer';

export async function POST(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const body = await req.json();
  const { name, email, whatsapp, consent } = body;

  if (!name || !email || !consent) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const supabase = createMoodboardAdminClient();

  // Buscar session gerada
  const { data: session } = await supabase
    .from('moodboard_sessions')
    .select('*')
    .eq('id', params.sessionId)
    .single();

  if (!session || session.status !== 'generated') {
    return NextResponse.json({ error: 'not_generated' }, { status: 400 });
  }

  // Rate limit por email (máx 3/dia)
  const { count } = await supabase
    .from('moodboard_leads')
    .select('*', { count: 'exact', head: true })
    .eq('email', email)
    .gte('created_at', new Date(Date.now() - 24 * 3600 * 1000).toISOString());

  if ((count ?? 0) >= 3) {
    return NextResponse.json({ error: 'email_rate_limit' }, { status: 429 });
  }

  // Cria lead
  const { data: lead, error } = await supabase
    .from('moodboard_leads')
    .insert({
      session_id: params.sessionId,
      name,
      email,
      whatsapp: whatsapp || null,
      consent_marketing: consent,
    })
    .select()
    .single();

  if (error) {
    console.error('[deliver] lead error:', error);
    return NextResponse.json({ error: 'db_failed' }, { status: 500 });
  }

  // Envia emails em paralelo (falha graciosa se Resend indisponível)
  await Promise.allSettled([
    sendVisitorEmail({ name, email, coverUrl: session.cover_url!, slug: session.slug }),
    sendAnaNotification({ leadName: name, leadEmail: email, whatsapp, slug: session.slug }),
  ]);

  // Atualiza flags
  await supabase
    .from('moodboard_leads')
    .update({ email_sent: true, ana_notified: true })
    .eq('id', lead.id);

  await supabase
    .from('moodboard_sessions')
    .update({ status: 'delivered' })
    .eq('id', params.sessionId);

  return NextResponse.json({ ok: true, downloadUrl: session.cover_url });
}
```

### 5.11 Mailer (`lib/moodboard/mailer.ts`)

```typescript
import { Resend } from 'resend';

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;
const anaEmail = process.env.ANA_NOTIFICATION_EMAIL || 'contato@ananoronha.eng';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ananoronha.eng';

export async function sendVisitorEmail(params: {
  name: string;
  email: string;
  coverUrl: string;
  slug: string;
}) {
  if (!resend) {
    console.warn('[mailer] Resend não configurado');
    return;
  }
  const { name, email, coverUrl, slug } = params;

  await resend.emails.send({
    from: 'AN Engenharia <hello@ananoronha.eng>',
    to: email,
    subject: `${name}, seu moodboard editorial chegou`,
    html: `
      <div style="font-family: serif; max-width: 600px; margin: 0 auto; color: #171411;">
        <h1 style="font-weight: 400; letter-spacing: -0.03em;">Oi ${name.split(' ')[0]},</h1>
        <p>Aqui está o moodboard que geramos com suas referências.</p>
        <img src="${coverUrl}" alt="Seu moodboard" style="width: 100%; border-radius: 8px; margin: 24px 0;" />
        <p><a href="${coverUrl}" style="color: #9a744d; font-weight: 700;">→ Baixar em alta resolução</a></p>
        <p><a href="${siteUrl}/moodboard/${slug}" style="color: #9a744d;">Ver online e compartilhar</a></p>
        <hr style="border: none; border-top: 1px solid #d8c9b8; margin: 32px 0;" />
        <p style="font-style: italic; color: #3a332d;">Gostou? Que tal transformar essas ideias em projeto real?</p>
        <p><a href="https://wa.me/5555999942637?text=Ol%C3%A1%20Ana%2C%20acabei%20de%20criar%20um%20moodboard%20e%20gostaria%20de%20conversar%20sobre%20o%20meu%20projeto." style="background: #171614; color: #fff; padding: 14px 24px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 700;">Conversar com a Ana no WhatsApp</a></p>
        <p style="font-size: 12px; color: #756b60; margin-top: 32px;">Ana Laura Noronha · Engenharia e Interiores</p>
      </div>
    `,
  });
}

export async function sendAnaNotification(params: {
  leadName: string;
  leadEmail: string;
  whatsapp?: string | null;
  slug: string;
}) {
  if (!resend) return;
  const { leadName, leadEmail, whatsapp, slug } = params;

  await resend.emails.send({
    from: 'AN Site <hello@ananoronha.eng>',
    to: anaEmail,
    subject: `Novo lead: ${leadName} criou um moodboard`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2>Novo lead qualificado</h2>
        <p><strong>${leadName}</strong> acabou de criar um moodboard no site.</p>
        <ul>
          <li>Email: <a href="mailto:${leadEmail}">${leadEmail}</a></li>
          ${whatsapp ? `<li>WhatsApp: <a href="https://wa.me/${whatsapp.replace(/\D/g, '')}">${whatsapp}</a></li>` : ''}
        </ul>
        <p><a href="${siteUrl}/moodboard/${slug}">Ver o moodboard criado</a></p>
      </div>
    `,
  });
}
```

### 5.12 Frontend: página `/moodboard/criar` (`app/moodboard/criar/page.tsx`)

**Client component** (por causa do dropzone e WASM). Estrutura:

```tsx
'use client';

import { MoodboardUploader } from '@/components/moodboard/MoodboardUploader';

export default function CriarMoodboardPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e9] pt-[120px] pb-24 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[900px]">
        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-[#9a744d]" />
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#9a744d]">
            Sua ferramenta exclusiva
          </span>
        </div>

        {/* Título */}
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.045em',
            color: '#171411',
          }}
        >
          Crie seu moodboard editorial<br />
          <em className="italic text-[#9a744d]">com as suas referências.</em>
        </h1>

        <p className="mt-6 max-w-[560px] font-serif italic text-[1.15rem] leading-[1.5] text-[#3a332d]">
          Nossa IA transforma suas fotos de referência em uma composição editorial no estilo Casa Vogue. Grátis e sem cadastro.
        </p>

        {/* Uploader */}
        <div className="mt-14">
          <MoodboardUploader />
        </div>
      </div>
    </main>
  );
}
```

### 5.13 Frontend: `MoodboardUploader.tsx`

Componente denso — vou dar a estrutura macro. Detalhe fica pro implementador seguindo o padrão do spec.

```tsx
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { removeBackground } from '@imgly/background-removal';
import { LoadingSteps } from './LoadingSteps';

type ImageState = {
  id: string;
  file: File;
  previewUrl: string;
  processedBlob?: Blob;
  status: 'uploading' | 'ready' | 'error';
};

export function MoodboardUploader() {
  const router = useRouter();
  const [images, setImages] = useState<ImageState[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [phase, setPhase] = useState<'idle' | 'processing' | 'generating' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // 1. Dropzone
  const onDrop = useCallback(async (accepted: File[]) => {
    if (images.length + accepted.length > 12) {
      setError('Máximo 12 imagens.');
      return;
    }

    for (const file of accepted) {
      const id = crypto.randomUUID();
      const previewUrl = URL.createObjectURL(file);
      setImages((prev) => [...prev, { id, file, previewUrl, status: 'uploading' }]);

      try {
        const blob = await removeBackground(file);
        setImages((prev) =>
          prev.map((img) =>
            img.id === id ? { ...img, processedBlob: blob, status: 'ready' } : img
          )
        );
      } catch (err) {
        console.error('bg-remove failed:', err);
        setImages((prev) =>
          prev.map((img) => (img.id === id ? { ...img, status: 'error' } : img))
        );
      }
    }
  }, [images.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 5 * 1024 * 1024,
  });

  // 2. Gerar
  async function handleGenerate() {
    if (images.length < 3) {
      setError('Envie pelo menos 3 imagens.');
      return;
    }
    setError(null);
    setPhase('processing');

    try {
      // 2.1 Cria session
      const sessionRes = await fetch('/api/moodboard/sessions', { method: 'POST' });
      if (!sessionRes.ok) throw new Error('session_failed');
      const { sessionId: sid, slug } = await sessionRes.json();
      setSessionId(sid);

      // 2.2 Upload de cada imagem em paralelo
      setLoadingStep(1);
      await Promise.all(
        images.map(async (img) => {
          const formData = new FormData();
          formData.append('original', img.file);
          if (img.processedBlob) formData.append('processed', img.processedBlob, 'processed.png');
          await fetch(`/api/moodboard/${sid}/upload`, { method: 'POST', body: formData });
        })
      );

      // 2.3 Gerar
      setPhase('generating');
      setLoadingStep(2);
      const genRes = await fetch(`/api/moodboard/${sid}/generate`, { method: 'POST' });
      if (!genRes.ok) throw new Error('generate_failed');
      const { slug: finalSlug } = await genRes.json();

      setLoadingStep(3);
      setPhase('done');

      // 2.4 Redireciona
      router.push(`/moodboard/${finalSlug}`);
    } catch (err) {
      console.error('generate flow error:', err);
      setError('Algo deu errado. Tente novamente.');
      setPhase('idle');
    }
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  if (phase !== 'idle') {
    return <LoadingSteps step={loadingStep} />;
  }

  return (
    <div>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          rounded-[20px] border-2 border-dashed p-16 text-center cursor-pointer
          transition-colors
          ${isDragActive ? 'border-[#9a744d] bg-[#eee5da]' : 'border-[#d8c9b8] bg-transparent hover:bg-[#eee5da]/50'}
        `}
      >
        <input {...getInputProps()} />
        <p className="font-serif text-[1.4rem] text-[#171411]">
          {isDragActive ? 'Solte aqui...' : 'Arraste suas fotos aqui'}
        </p>
        <p className="mt-2 text-[0.9rem] text-[#756b60]">
          ou clique pra selecionar · JPG, PNG, WEBP · 3 a 12 imagens
        </p>
      </div>

      {/* Grid de previews */}
      {images.length > 0 && (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border border-[#d8c9b8]">
              <img src={img.previewUrl} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white text-sm hover:bg-black/80"
                aria-label="Remover"
              >
                ✕
              </button>
              {img.status === 'uploading' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs">
                  Processando...
                </div>
              )}
              {img.status === 'error' && (
                <div className="absolute inset-0 bg-red-600/40 flex items-center justify-center text-white text-xs">
                  Erro
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="mt-6 text-center text-[#c53030]">{error}</p>
      )}

      {/* CTA */}
      <button
        type="button"
        disabled={images.length < 3 || images.some((i) => i.status !== 'ready')}
        onClick={handleGenerate}
        className="mt-10 w-full h-16 rounded-[12px] bg-[#171614] text-white font-bold text-[1rem] tracking-[-0.01em] hover:bg-[#29231f] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {images.length < 3 ? `Adicione ${3 - images.length} imagem(ns) pra gerar` : 'Gerar meu moodboard →'}
      </button>

      <p className="mt-4 text-center text-[0.85rem] text-[#756b60] italic">
        💡 Quanto mais variadas suas referências, mais rico será seu moodboard.
      </p>
    </div>
  );
}
```

### 5.14 `LoadingSteps.tsx`

```tsx
'use client';

const STEPS = [
  { label: 'Preparando as suas fotos...', hint: '' },
  { label: 'Removendo fundos e revelando as peças...', hint: '' },
  { label: 'Identificando o que cada referência traz...', hint: '' },
  { label: 'Compondo seu moodboard editorial...', hint: '' },
];

export function LoadingSteps({ step }: { step: number }) {
  return (
    <div className="py-24 text-center">
      <p className="font-serif italic text-[1.6rem] text-[#171411]">
        {STEPS[step]?.label ?? STEPS[0].label}
      </p>
      <div className="mt-8 h-1 bg-[#d8c9b8] rounded-full overflow-hidden max-w-md mx-auto">
        <div
          className="h-full bg-[#9a744d] transition-all duration-1000"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>
      <p className="mt-6 text-[0.85rem] text-[#756b60] italic">
        Isso costuma levar entre 8 e 15 segundos.
      </p>
    </div>
  );
}
```

### 5.15 Página resultado (`app/moodboard/[sessionSlug]/page.tsx`)

Server Component que busca session pelo slug e mostra. Modal de captura de lead é client component separado.

```tsx
import { notFound } from 'next/navigation';
import { createMoodboardAdminClient } from '@/lib/moodboard/supabase-admin';
import { MoodboardResult } from '@/components/moodboard/MoodboardResult';

export const revalidate = 0;

export default async function MoodboardResultPage({
  params,
}: {
  params: { sessionSlug: string };
}) {
  const supabase = createMoodboardAdminClient();
  const { data: session } = await supabase
    .from('moodboard_sessions')
    .select('*')
    .eq('slug', params.sessionSlug)
    .single();

  if (!session || session.status !== 'generated' && session.status !== 'delivered') {
    notFound();
  }

  return <MoodboardResult session={session} />;
}
```

### 5.16 Integração com `/sketch/moodboard`

Localizar o CTA atual em `lib/sketch-content.ts` (step `moodboard`) e a página `app/sketch/[slug]/page.tsx`. Adicionar um SEGUNDO CTA ao lado do WhatsApp:

**Editar `lib/sketch-content.ts` — no step "moodboard":**

Adicionar campo opcional `secondaryCta`:

```typescript
export type SketchStep = {
  // ... campos existentes
  secondaryCta?: {
    label: string;
    href: string;
  };
};

// No step moodboard, adicionar:
{
  slug: 'moodboard',
  // ... campos existentes
  secondaryCta: {
    label: 'Criar meu moodboard com nossa ferramenta →',
    href: '/moodboard/criar',
  },
},
```

**Editar `app/sketch/[slug]/page.tsx`** — no CTA block, se `step.secondaryCta` existir, renderiza um segundo botão logo abaixo do WhatsApp, estilo secundário (borda em vez de fill).

---

## 🚫 Restrições

- **NÃO chame Anthropic API do cliente.** Só server-side em endpoints.
- **NÃO faça upload direto do cliente pro Supabase Storage.** Sempre pelo endpoint /upload (validação de rate limit).
- **NÃO implemente Fase 2** (variantes vibrante/contraste, dashboard admin, drag/drop). Fase 1 estritamente.
- **NÃO instale libs além das listadas** no Passo 1.
- **NÃO altere design system existente** (cores, fontes) — reuse os tokens.
- **NÃO delete arquivos legacy** do projeto (Navbar.tsx, HeroHeader.tsx antigo).
- **NÃO esqueça de tratar falhas graciosas** quando Resend/Upstash não configurados — logs em dev, não crasha em prod.

---

## ✅ Checklist de verificação

Após terminar:

- [ ] `pnpm build` passa sem erros de tipo
- [ ] Migration `032_moodboard_tables.sql` criada (não roda automaticamente — Jorge aplica manual)
- [ ] `README-MOODBOARD.md` na raiz com instruções pro Jorge:
  - Criar contas: Anthropic, Resend, Upstash Redis
  - Popular `.env.local`
  - Criar 3 buckets manualmente no Supabase Storage
  - Rodar migration
- [ ] Testar fluxo local:
  - Home → /sketch/moodboard → clica novo botão → /moodboard/criar
  - Sobe 3 imagens, aguarda bg-removal
  - Click "Gerar" → aparece loading
  - Redireciona pra /moodboard/[slug] com PNG visível
- [ ] Todos endpoints retornam JSON válido (mesmo em erro)
- [ ] Sem `console.log`s desnecessários
- [ ] Componentes seguem padrão de style existente (inline styles + Tailwind)
- [ ] Tipos TypeScript rigorosos (nada de `any` sem justificativa)

---

## 📤 Formato de saída esperado

Ao final, reportar:

1. **Lista completa** de arquivos criados
2. **Lista** de arquivos modificados (só `lib/sketch-content.ts` e `app/sketch/[slug]/page.tsx`)
3. **Confirmação** que `pnpm build` passou
4. **`.env.local.example`** com todas as vars novas listadas (sem valores reais)
5. **Notas** sobre qualquer decisão que teve que tomar sozinho (edge case, ambiguidade)

Se qualquer parte deste prompt estiver ambígua ou você precisar decidir algo não documentado, **PARE e pergunte antes de assumir**. Prefiro alinhar do que refazer.

Boa sorte. Bora fazer essa Ana ganhar leads. 🎨
