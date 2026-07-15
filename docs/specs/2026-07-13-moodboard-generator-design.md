# Gerador de Moodboard Editorial — Design Spec

**Status:** aprovado (brainstorming completo) — pendente implementação
**Data:** 2026-07-13
**Autores:** Jorge + Claude
**Contexto:** Site Ana Laura Noronha (Next.js 14 + Supabase)

---

## 1. Objetivo

Adicionar ao site uma ferramenta gratuita chamada "Gerador de Moodboard" que:

1. Permite ao visitante enviar 3 a 12 fotos de referência (móveis, texturas, ambientes, cores, arte)
2. Processa cada imagem com IA (remove fundo, categoriza, extrai paleta)
3. Compõe automaticamente um moodboard editorial no estilo Casa Vogue Brasil
4. Entrega o PNG final ao visitante (via captura de email — lead qualificado pra Ana)

**Motivação de negócio:** virar diferencial competitivo, gerar leads qualificados (o visitante já demonstrou interesse em design), e reforçar o posicionamento "engenharia + curadoria" da Ana.

---

## 2. Decisões-chave (alinhadas no brainstorming)

| Decisão | Escolha | Alternativas rejeitadas |
|---|---|---|
| Estética do output | **Composição editorial estruturada** (Casa Vogue) | Colagem Pinterest / ambiente 3D IA |
| Lead capture | **Na hora de baixar/receber** (padrão SaaS) | Antes de começar / totalmente aberto / login social |
| Custo/cota | **Grátis com rate limit anti-abuso** (Ana paga IA) | 1 grátis + refinação paga / ilimitado / créditos pagos |
| Grau de controle | **Mágica automática** (só clica "gerar") | Semi-manual / drag-drop completo |
| Local no site | Botão adicional em `/sketch/moodboard` ao lado do CTA WhatsApp | — |

---

## 3. Arquitetura de alto nível

### 3.1 Stack proposto

| Camada | Ferramenta | Custo por moodboard |
|---|---|---|
| Frontend | Next.js 14 App Router (existente) | 0 |
| Upload/Storage | Supabase Storage (existente) | 0 |
| Background removal | `@imgly/background-removal` WASM (client-side) | 0 |
| Vision/Categorização | Claude Sonnet 4 API (`@anthropic-ai/sdk`) | ~R$ 0.20 (8 imgs × R$ 0.025) |
| Extração de paleta | `colorthief` (client-side) | 0 |
| Composição final | `@vercel/og` (edge function → PNG via JSX) | 0 |
| Envio email | Resend (free tier 3.000/mês) | 0 |
| Rate limit | Upstash Redis + `@upstash/ratelimit` (free tier 10k req/dia) | 0 |
| Persistência | Supabase Postgres (existente) | 0 |
| Bot protection | Google reCAPTCHA v3 (grátis) | 0 |
| **Total** | | **~R$ 0.20/moodboard** |

**Custo mensal projetado:**
- 50 moodboards: R$ 10
- 500 moodboards: R$ 100
- 2.000 moodboards: R$ 400
- 10.000 moodboards: R$ 2.000

### 3.2 Fluxo end-to-end

```
[1] Visitante clica "Crie seu moodboard" em /sketch/moodboard
     ↓
[2] Landing da ferramenta: /moodboard/criar
     ↓
[3] Upload de 3-12 fotos (drag & drop)
     ↓
[4] Preview grid com thumbnails
     ↓
[5] Click "Gerar meu moodboard" → pipeline dispara:
     ├─ Remove fundo de cada imagem (client-side)
     ├─ Classifica categoria via Claude Vision (server, paralelo)
     ├─ Extrai paleta dominante (client)
     └─ Compõe template editorial (server, @vercel/og)
     ↓
[6] Preview do resultado na tela
     ↓
[7] "Baixar" → modal pede nome + email → cria lead
     ↓
[8] Emails enviados: visitante + Ana (notificação)
     ↓
[9] Ana no admin vê lista de moodboards + contatos
```

### 3.3 Novos módulos no projeto

```
app/
  moodboard/
    criar/
      page.tsx                       ← landing + uploader
    [sessionSlug]/
      page.tsx                       ← página do resultado (compartilhável)
  api/moodboard/
    sessions/route.ts                ← POST cria session
    [sessionId]/
      upload/route.ts                ← POST recebe imagem processada
      generate/route.ts              ← POST monta composição (SSE progresso)
      deliver/route.ts               ← POST captura lead + envia emails

components/moodboard/
  MoodboardUploader.tsx              ← dropzone, preview, estados
  MoodboardCanvas.tsx                ← preview do template
  MoodboardResult.tsx                ← tela do resultado
  LeadCaptureModal.tsx               ← modal nome+email
  OgTemplate.tsx                     ← JSX → PNG via @vercel/og

lib/moodboard/
  background-remove.ts               ← wrapper @imgly
  categorize.ts                      ← wrapper Claude Vision
  color-extract.ts                   ← wrapper colorthief
  template-engine.ts                 ← lógica de posicionamento
  rate-limit.ts                      ← Upstash config
  mailer.ts                          ← Resend + templates

supabase/migrations/
  999_moodboard_tables.sql           ← 2 tabelas + RLS + índices

app/admin/moodboards/
  page.tsx                           ← lista de leads pra Ana
```

---

## 4. Componentes e UX detalhado

### 4.1 Tela `/moodboard/criar` (Landing + Uploader)

**Wireframe textual:**

```
┌────────────────────────────────────────────────────────┐
│  [Header AN Engenharia]                                │
├────────────────────────────────────────────────────────┤
│   ─── SUA FERRAMENTA EXCLUSIVA ───                     │
│   Crie seu moodboard editorial                         │
│   com as SUAS referências.                             │
│   (subtítulo italic)                                   │
├────────────────────────────────────────────────────────┤
│   ┌──────────────────────────────────────────┐         │
│   │       [ícone drag drop]                  │         │
│   │   Arraste suas fotos aqui                │         │
│   │   ou CLIQUE PRA SELECIONAR               │         │
│   │   Suporta JPG, PNG · 3 a 12 imagens      │         │
│   └──────────────────────────────────────────┘         │
│                                                         │
│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│   │ img │ │ img │ │ img │ │ img │ │ img │ │  +  │    │
│   │  ✕  │ │  ✕  │ │  ✕  │ │  ✕  │ │  ✕  │ │     │    │
│   └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘    │
│                                                         │
│   [        Gerar meu moodboard  →                ]     │
│         (bloqueado até ter 3 imagens)                  │
│                                                         │
│   💡 Dica: quanto mais variadas suas referências,      │
│      mais rico será o seu moodboard.                   │
└────────────────────────────────────────────────────────┘
```

**Estado do componente `MoodboardUploader`:**

```typescript
type UploadState = {
  images: Array<{
    id: string;                       // uuid client-side
    file: File;
    previewUrl: string;               // blob URL local
    processedUrl?: string;            // após bg-removal
    status: 'uploading' | 'ready' | 'processing' | 'processed' | 'error';
  }>;
  sessionId?: string;                 // criado no primeiro upload
  sessionSlug?: string;
  status: 'idle' | 'uploading' | 'processing' | 'generating' | 'done' | 'error';
  errorMessage?: string;
};
```

**Interações:**

| Ação | Comportamento |
|---|---|
| Drop/select arquivo | Valida tipo/tamanho → adiciona ao array com status `uploading` |
| Ao adicionar imagem | Roda `@imgly/background-removal` no browser → status vira `ready` |
| Click X | Remove imagem do array |
| Click "Gerar" | Manda imagens pro backend, dispara pipeline server-side |
| Erro em qualquer imagem | Thumbnail vira vermelho + botão "tentar novamente" |

**Validações:**
- Tipos aceitos: `image/jpeg`, `image/png`, `image/webp`
- Máx 5 MB por arquivo
- Máx 12 arquivos por sessão
- Mín 3 arquivos para gerar
- Redimensionar client-side para máx 1600px antes de enviar

### 4.2 Estados de loading (poéticos, não genéricos)

Durante processamento após click "Gerar":

```
1. "Removendo fundos e revelando as peças..."        [barra 25%]
2. "Identificando o que cada referência traz..."     [barra 50%]
3. "Extraindo a paleta que unifica seu estilo..."    [barra 75%]
4. "Compondo seu moodboard editorial..."             [barra 100%]
5. → redireciona pra /moodboard/[slug]
```

Tempo médio: **8-15 segundos** ponta a ponta.

### 4.3 Tela `/moodboard/[sessionSlug]` (Resultado)

**Wireframe textual:**

```
┌────────────────────────────────────────────────────────┐
│  [Header AN Engenharia]                                │
├────────────────────────────────────────────────────────┤
│   ─── SEU MOODBOARD EDITORIAL ───                      │
│                                                         │
│   ┌──────────────────────────────────────────┐         │
│   │    [ IMAGEM DO MOODBOARD GERADO ]        │         │
│   │        (composição editorial)             │         │
│   └──────────────────────────────────────────┘         │
│                                                         │
│   Paleta detectada:                                    │
│   ●●●●● (5 círculos com cores dominantes)              │
│                                                         │
│   [ Baixar meu moodboard PNG ]  [ Compartilhar link ]  │
│                                                         │
│   ┌──────────────────────────────────────────┐         │
│   │  Gostou? Vamos transformar essas ideias  │         │
│   │  em projeto real?                        │         │
│   │  [ Conversar com Ana no WhatsApp → ]     │         │
│   └──────────────────────────────────────────┘         │
│                                                         │
│   ↺ Fazer outro moodboard                              │
└────────────────────────────────────────────────────────┘
```

**Fluxo "Baixar":**

1. Click "Baixar meu moodboard PNG"
2. Se lead JÁ capturado nessa session → download direto
3. Se NÃO → abre `LeadCaptureModal`:

```
┌──────────────────────────────────┐
│  Só falta um passo pra levar seu │
│  moodboard.                       │
│                                    │
│  Nome:    [________]               │
│  Email:   [________]               │
│  WhatsApp: [________] (opcional)   │
│                                    │
│  [x] Aceito receber o material    │
│      e novidades da AN             │
│                                    │
│  [ Baixar meu moodboard → ]        │
└──────────────────────────────────┘
```

4. Submit → `POST /api/moodboard/[sessionId]/deliver`
5. Insere `moodboard_leads`, dispara 2 emails (visitante + Ana), retorna URL assinada de download
6. Frontend força download do PNG

### 4.4 Edge cases visuais

| Caso | Comportamento |
|---|---|
| < 3 imagens | Botão "Gerar" desabilitado com tooltip |
| Rate limit atingido | Modal: "Já criou 3 moodboards hoje" + CTA WhatsApp |
| Background removal falhou | Marca imagem como "sem fundo removível", mantém original no template |
| Categorização IA falhou | Imagem cai em `other`, template ainda funciona |
| Geração final falhou | Fallback: grid simples + botão "tentar novamente" |
| Aba fechada durante processamento | Session salva 24h — retomar via link |

---

## 5. Template Editorial + Engine de composição

### 5.1 Template base

Grid modular editorial 16:11 (1600×1100px), com **4 slots pré-definidos**:

```
┌────────────────────────────────────────────────────────┐
│  ── AN ENGENHARIA · MOODBOARD EDITORIAL ──             │
├─────────────────────┬───────────┬──────────────────────┤
│                     │  SLOT B   │      SLOT C          │
│      SLOT A         │  Textura  │      Objeto          │
│   HERO/MÓVEL        │  ou cor   │      destacado       │
│  (peça grande)      ├───────────┴──────────────────────┤
│                     │        SLOT D                    │
│                     │      Ambiente ou arte            │
├─────────────────────┴──────────────────────────────────┤
│  ●●●●●  paleta: pale-taupe · warm-terracota · ...      │
│  ─── Curadoria automatizada por AN Engenharia ──       │
└────────────────────────────────────────────────────────┘
```

### 5.2 Categorização (Claude Vision)

**5 categorias:**
```typescript
type ImageCategory =
  | 'furniture'      // móveis, cadeiras, sofás, poltronas, mesas
  | 'texture'        // texturas, pisos, tecidos, revestimentos
  | 'color'          // amostras de cor, tintas, superfícies coloridas
  | 'art'            // obras de arte, quadros, esculturas
  | 'architecture';  // ambientes, arquitetura, plantas, projetos
```

**Prompt Claude Vision (por imagem):**
```
Analise esta imagem de referência de design de interiores.
Retorne JSON estrito:
{
  "category": "furniture" | "texture" | "color" | "art" | "architecture",
  "should_remove_background": boolean,
  "descriptor": "string curta (3-5 palavras)",
  "confidence": number (0-1)
}
```

### 5.3 Engine de posicionamento nos slots

```typescript
function assignToSlots(images: CategorizedImage[]): SlotAssignment {
  // SLOT A (HERO): prioridade furniture → architecture → art
  // SLOT B (textura pequena): prioridade texture → color
  // SLOT C (objeto destacado, bg removido): prioridade furniture (2ª) → art
  // SLOT D (ambiente panorâmico): prioridade architecture

  // Se faltar categoria: usa imagem sobrando com maior confidence
  // Se sobrar imagens: escolhe as com maior confidence + diversidade
}
```

### 5.4 Extração de paleta

Client-side com `colorthief`:

```typescript
async function extractPalette(imageUrls: string[]): Promise<string[]> {
  const allColors: RGB[] = [];
  for (const url of imageUrls) {
    const img = await loadImage(url);
    const colors = new ColorThief().getPalette(img, 3);
    allColors.push(...colors);
  }
  return clusterAndPickDominant(allColors, 5); // 5 hex codes finais
}
```

### 5.5 Renderização com `@vercel/og`

```tsx
// app/api/moodboard/[sessionId]/generate/route.ts
import { ImageResponse } from '@vercel/og';
export const runtime = 'edge';

export async function POST(req: Request, { params }) {
  const data = await getMoodboardData(params.sessionId);

  return new ImageResponse(
    (<div style={{...}}>
      {/* Grid 4 slots + paleta + header/footer editorial */}
    </div>),
    { width: 1600, height: 1100 }
  );
}
```

Restrições `@vercel/og`:
- Suporta subset de CSS (flexbox e grid CSS sim)
- Fonts precisam ser carregadas via `fetch` no início da função
- Máx execução: 25s

### 5.6 3 variantes de template

Baseado na paleta detectada, engine escolhe:

- **Sereno** — >60% tons frios/neutros → layout com respiro, tipografia grande
- **Vibrante** — pelo menos 1 cor quente saturada → layout denso, sobreposições
- **Contraste** — preto/marinho + claros → preto/branco alternando

---

## 6. Banco de dados, Storage e Endpoints

### 6.1 Schema Supabase (2 tabelas + 1 auxiliar)

```sql
-- 1. Sessões (sempre criadas, mesmo sem virar lead)
create table public.moodboard_sessions (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  status text not null default 'created' check (status in (
    'created', 'uploading', 'processing', 'generated', 'delivered', 'failed'
  )),
  cover_url text,
  palette jsonb,
  template_variant text,
  ip_address text,
  user_agent text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  generated_at timestamptz
);

-- 2. Imagens de cada sessão
create table public.moodboard_images (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references moodboard_sessions(id) on delete cascade,
  original_url text not null,
  processed_url text,
  category text check (category in ('furniture','texture','color','art','architecture','other')),
  descriptor text,
  confidence numeric,
  slot_position text,  -- 'A' | 'B' | 'C' | 'D' | null
  created_at timestamptz default now()
);

-- 3. Leads capturados (só quando visitante fornece email)
create table public.moodboard_leads (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references moodboard_sessions(id) on delete cascade,
  name text not null,
  email text not null,
  whatsapp text,
  consent_marketing boolean default true,
  email_sent boolean default false,
  ana_notified boolean default false,
  created_at timestamptz default now()
);
```

**Índices:**
```sql
create index on moodboard_sessions(slug);
create index on moodboard_sessions(status);
create index on moodboard_sessions(ip_address, created_at desc);
create index on moodboard_images(session_id);
create index on moodboard_leads(email);
create index on moodboard_leads(session_id);
create index on moodboard_leads(created_at desc);
```

**RLS:**
- `moodboard_sessions/images`: public insert/read (anon key)
- `moodboard_leads`: service_role insert, admin (authenticated) read

### 6.2 Supabase Storage

3 buckets novos:

```
moodboard-originals/{sessionSlug}/{imageId}.jpg    ← originais (público)
moodboard-processed/{sessionSlug}/{imageId}.png    ← bg-removed (público)
moodboard-outputs/{sessionSlug}.png                 ← moodboard final (público)
```

Lifecycle: auto-deletar `moodboard-originals` após **30 dias**. PNG final fica.

### 6.3 API Endpoints

| Endpoint | Método | Descrição |
|---|---|---|
| `/api/moodboard/sessions` | POST | Cria session, retorna `{ sessionId, slug }` |
| `/api/moodboard/[id]/upload` | POST | Upload de imagem (multipart) |
| `/api/moodboard/[id]/generate` | POST | Roda pipeline (SSE de progresso) |
| `/api/moodboard/[id]/deliver` | POST | Captura lead + envia emails |
| `/moodboard/[slug]` | GET | Página pública compartilhável |
| `/admin/moodboards` | GET | Dashboard admin (auth required) |

Detalhamento em código na implementação.

---

## 7. Segurança e anti-abuso

### 7.1 Rate limiting em camadas

**Upstash Redis:**
- 3 sessions criadas por IP em 24h
- 20 uploads por sessão em 1h
- 3 gerações por IP em 24h

**Banco (leads):**
- 3 leads por email em 24h

**reCAPTCHA v3:**
- Validado antes de `/generate`
- Score ≥ 0.5 pra passar

### 7.2 Validação de uploads

- Tipos: `image/jpeg`, `image/png`, `image/webp`
- Tamanho: máx 5MB (redimensionar client-side pra 1600px)
- Total: máx 12 arquivos
- Magic bytes: verificar (não confiar em extensão)
- EXIF: strip antes de salvar

### 7.3 Segredos e variáveis de ambiente

```
# Existentes
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY

# Novos
ANTHROPIC_API_KEY               # Claude Vision — nunca no cliente
RESEND_API_KEY                  # email
UPSTASH_REDIS_REST_URL          # rate limit
UPSTASH_REDIS_REST_TOKEN
NEXT_PUBLIC_RECAPTCHA_SITE_KEY  # público (é seguro)
RECAPTCHA_SECRET_KEY            # server-only
```

---

## 8. Testes

### 8.1 Unit (Vitest)
- `template-engine.assignToSlots` — priorização + fallbacks
- `template-engine.pickTemplateVariant` — variante correta por paleta
- `color-extract.clusterAndPickDominant` — clustering agrupa cores próximas
- `rate-limit.checkLimit` — bloqueia após N tentativas

### 8.2 Integration (`app/api/moodboard/*.test.ts`)
- `POST /sessions` — cria + rate limit
- `POST /upload` — valida mime, tamanho, banco
- `POST /generate` — pipeline completo (mock Claude + fake Storage)
- `POST /deliver` — cria lead + rate limit por email

### 8.3 E2E (Playwright — opcional MVP)
- Happy path (sobe 5 imgs → gera → recebe PNG → captura lead)
- Path com falha de upload
- Rate limit

---

## 9. Edge cases técnicos

| Cenário | Mitigação |
|---|---|
| Claude Vision 5xx | Retry com backoff 3x → categoriza como `other` como fallback |
| `@vercel/og` timeout >25s | Marca `failed`, permite retentar |
| Imagem quebrada | Marca erro, permite retentar aquela específica |
| Bg-removal client falhou (WebGPU indisponível) | Fallback server-side via Replicate rembg |
| Sessão abandonada | Cron limpa após 24h |
| Email Ana em spam | SPF + DKIM configurados no domínio (guia Resend) |
| Concurrent generates | Endpoint idempotente — se `processing`, retorna estado |
| PNG >5MB | Comprime via `sharp` antes de subir |
| reCAPTCHA offline | Rate limit por IP fica 2/dia (mais rígido) |

---

## 10. Métricas e analytics

**Eventos custom (Vercel Analytics):**
- `moodboard_session_started` — quando cria session
- `moodboard_upload_completed` — quando upload termina
- `moodboard_generated` — quando PNG gerado (com metadata: imageCount, templateVariant, processingTimeMs)
- `moodboard_lead_captured` — quando modal submit
- `moodboard_shared` — quando compartilha link (opcional)

**Dashboard admin:**
- Total moodboards/mês
- Total leads/mês
- Taxa conversão session → lead (meta 30-40%)
- Distribuição templates
- Categorias mais comuns

---

## 11. Roadmap de fases

### Fase 1 — MVP funcional (12-16h)
- Upload + bg-removal client-side
- Categorização Claude Vision
- 1 template editorial (Sereno)
- Geração PNG via `@vercel/og`
- Lead capture + envio email
- Rate limit básico

### Fase 2 — Refinamento (4-6h)
- 3 variantes template (Sereno/Vibrante/Contraste)
- Estados de loading elegantes
- Página compartilhamento pública
- Dashboard admin básico

### Fase 3 — Analytics + polimento (2-4h)
- Eventos analytics completos
- Retry logic robusta
- Compressão automática output
- reCAPTCHA v3 integrado

**Total até produção estável: ~22h de dev**

---

## 12. Fora de escopo (YAGNI)

Explicitamente NÃO vamos fazer no MVP:

- ❌ Login/cadastro persistente do visitante (só lead capture pontual)
- ❌ Salvar histórico de moodboards por usuário
- ❌ Compartilhamento com edição colaborativa
- ❌ Editor manual de composição (drag/drop pós-geração)
- ❌ Múltiplos templates para o visitante escolher
- ❌ Geração via IA generativa pura (só template estruturado)
- ❌ Renderização 3D
- ❌ Cobrança/checkout (100% grátis)
- ❌ App mobile nativo
- ❌ Integração Instagram/Pinterest

Podem entrar em v4+ se produto validar.

---

## 13. Riscos e mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Claude Vision cara demais em volume | Baixa | Médio | Métricas em tempo real, cap absoluto R$ 500/mês, fallback pra GPT-4o mini se preciso |
| `@vercel/og` gera PNG feio (font issues) | Média | Alto | Testar fonts embarcadas cedo, ter Puppeteer como plano B |
| Bg-removal WASM não suporta browsers antigos | Média | Baixo | Fallback server-side pra Replicate |
| Abuso/spam (bots) | Média | Médio | Múltiplas camadas de rate limit + reCAPTCHA |
| Emails Ana em spam | Média | Alto | SPF/DKIM configurados, warmup domínio |
| Categorização IA erra (moodboard fica torto) | Média | Médio | Confidence score, categoria `other` como fallback, template resiliente |
| Visitantes esperam qualidade Nano Banana | Alta | Médio | Copy honesta ("composição editorial", não "arte gerada por IA") |

---

## 14. Critérios de sucesso do MVP

- ✅ Visitante sobe 5 imagens e recebe moodboard em ≤ 15s
- ✅ Qualidade visual do output: 8/10 subjetivo (a Ana avalia)
- ✅ Taxa conversão session → lead ≥ 30%
- ✅ Zero incidentes de abuso no primeiro mês
- ✅ Custo médio real ≤ R$ 0.30 por moodboard gerado
- ✅ Ana recebe ≥ 10 leads qualificados no primeiro mês pós-lançamento

---

## 15. Referências e inspiração

- **Casa Vogue Brasil** — estética editorial de referência
- **Havenly** — moodboard generator online (paga)
- **Modsy** — visualização de projetos
- **Coohom** — design tool
- **Behold.so** — inspiração de UX para lead magnet

---

## 16. Próximos passos após aprovação

1. Auto-review deste spec (item 17)
2. Aprovação final do Jorge no documento consolidado
3. Invocar skill `writing-plans` para criar plano de implementação
4. Criar migrations
5. Instalar dependências novas
6. Implementar Fase 1

---

## 17. Self-review checklist

Ao final da escrita, revisar:

- [x] Sem placeholders (`TBD`, `TODO`, `?`) no texto final
- [x] Sem contradições internas (ex: dizer que é grátis em uma seção e cobrado em outra)
- [x] Escopo bem definido (item 12 diz o que NÃO fazer)
- [x] Todas 5 seções do brainstorming refletidas
- [x] Decisões-chave explícitas (item 2)
- [x] Números concretos onde aplicável (custos, timing, quotas)
- [x] Testes cobertos (item 8)
- [x] Riscos documentados (item 13)
- [x] Critérios de sucesso mensuráveis (item 14)

---

*Este documento é o único fonte de verdade para o Gerador de Moodboard. Qualquer decisão futura fora do que está aqui deve atualizar o spec ou ser questionada.*
