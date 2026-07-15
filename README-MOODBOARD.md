# Gerador de Moodboard — Setup (Fase 1 MVP)

Ferramenta que transforma 3–12 fotos de referência do visitante em um moodboard
editorial (PNG), captura o lead por email e notifica a Ana.

Spec completo: [`docs/specs/2026-07-13-moodboard-generator-design.md`](docs/specs/2026-07-13-moodboard-generator-design.md).

> ⚠️ Esta Fase 1 **não roda de ponta a ponta** até os passos abaixo serem
> concluídos. O código foi escrito com **falha graciosa**: se Resend/Upstash não
> estiverem configurados, o site **não quebra** — apenas loga um aviso e pula o
> passo (rate limit e email ficam desativados). A categorização via Claude
> também tem fallback (categoria `other`) se a API falhar.

---

## 1. Criar contas e chaves

| Serviço | Para quê | Onde |
|---|---|---|
| **Anthropic** | Claude Vision (categorização) | https://console.anthropic.com → API Keys → `ANTHROPIC_API_KEY` |
| **Resend** | Envio de email (já usado no /contato) | https://resend.com → API Keys → `RESEND_API_KEY` |
| **Upstash Redis** | Rate limiting serverless | https://upstash.com → Create Database (Redis) → REST URL + Token |

## 2. Popular `.env.local`

Copie [`.env.local.example`](.env.local.example) para `.env.local` e preencha as
chaves novas:

```
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
ANA_NOTIFICATION_EMAIL=contato@ananoronha.eng
NEXT_PUBLIC_SITE_URL=https://www.ananoronha.eng
```

> O domínio remetente dos emails (`hello@ananoronha.eng`) precisa estar
> **verificado no Resend** (SPF/DKIM) para não cair em spam. Enquanto não estiver,
> use um remetente `@resend.dev` em `lib/moodboard/mailer.ts`.

## 3. Criar os 3 buckets no Supabase Storage (manual)

No Supabase Dashboard → **Storage** → New bucket. Crie os três como **públicos**:

- `moodboard-originals` (público)
- `moodboard-processed` (público)
- `moodboard-outputs` (público)

> Não dá para criar buckets via SQL — é configuração manual do Storage.
> Opcional (spec §6.2): configurar lifecycle para auto-deletar
> `moodboard-originals` após 30 dias.

## 4. Rodar a migration

Aplique [`supabase/migrations/032_moodboard_tables.sql`](supabase/migrations/032_moodboard_tables.sql)
manualmente (Supabase Dashboard → SQL Editor → cole e execute, ou via
`supabase db push`). Cria 3 tabelas (`moodboard_sessions`, `moodboard_images`,
`moodboard_leads`), índices e políticas RLS.

## 5. Testar o fluxo local

1. Home → `/sketch/moodboard` → clicar em **"Criar meu moodboard com nossa ferramenta →"**
2. Vai para `/moodboard/criar`
3. Subir 3–12 fotos (drag & drop) → fundo removido no browser (WASM)
4. Clicar **"Gerar meu moodboard"** → categoriza (Claude) + compõe PNG (@vercel/og)
5. Redireciona para `/moodboard/[slug]` com o preview
6. Clicar **"Baixar"** → modal captura nome/email → envia PNG por email + notifica Ana

---

## Notas de implementação (Fase 1)

- **Gerenciador de pacotes:** o projeto usa **npm** (`package-lock.json`), então
  as deps foram instaladas com `npm install` (o spec mencionava `pnpm`).
- **Modelo Claude:** `categorize.ts` usa `claude-sonnet-4-6` (válido e ativo,
  tier econômico para categorização em volume). Pode migrar para `claude-sonnet-5`
  no futuro (mais capaz e, com preço introdutório, mais barato até 31/08/2026).
- **Template PNG (Satori):** `@vercel/og`/Satori **não suporta CSS grid** — o
  layout de 4 slots foi reproduzido com **flexbox** aninhado (mesmo resultado
  visual do wireframe do spec §5.1). Só afeta runtime, não o build.
- **Runtime do `/generate`:** `nodejs` (não edge), porque usa `@anthropic-ai/sdk`.
  `maxDuration = 60` requer plano Vercel Pro.
- **Paleta:** Fase 1 usa paleta fixa (`colorthief` instalado mas ainda não
  cabeado — refinamento é Fase 2, conforme spec §11).
- **reCAPTCHA v3:** dependência instalada e vars reservadas, mas **não cabeado**
  (é Fase 3 no spec).
- **Background removal (CDN):** `@imgly/background-removal` empacota builds
  `.mjs` do onnxruntime que quebram o minificador do Next 14 (bug conhecido da
  lib). Solução escolhida: carregar a lib do **CDN jsDelivr em runtime** via
  `import(/* webpackIgnore: true */ url)` no `onDrop` do
  [`MoodboardUploader.tsx`](components/moodboard/MoodboardUploader.tsx) — o
  webpack não empacota a lib e o build passa limpo. A lib baixa o modelo/wasm
  sozinha do próprio CDN. A dependência npm fica instalada (pinning de versão:
  `@1.7.0` na URL), mas não é bundlada. Se preferir self-host no futuro,
  configure o `publicPath` do @imgly e sirva os assets de `/public`.
- **HeroHeader/Navbar legados:** intocados.
