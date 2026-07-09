# Ana Laura Noronha — Engenharia e Interiores

Site institucional reconstruído do zero em **Next.js 14 + Tailwind + Framer Motion + GSAP**, com base na identidade visual oficial da Ana Laura (paleta dourado/preto/sálvia/terracota, tipografias Bodoni Moda + Playfair Display + Plus Jakarta Sans).

---

## Stack

- **Next.js 14** (App Router) + React 18 + TypeScript
- **Tailwind CSS 3.4** com tokens custom (paleta + fontes via `next/font`)
- **Framer Motion 11** para animações reveal/stagger/hover
- **GSAP 3 + ScrollTrigger** disponível para scrollytelling extra
- **Lenis** para smooth scroll cinematográfico
- **react-hook-form + Zod** no formulário de orçamento
- **Resend** para envio transacional de email
- **lucide-react** para ícones

---

## Como rodar localmente

```bash
# 1. instalar dependências
npm install

# 2. copiar variáveis de ambiente
cp .env.local.example .env.local
# (edite .env.local com sua RESEND_API_KEY)

# 3. rodar em dev
npm run dev
```

Acesse <http://localhost:3000>

---

## Estrutura

```
SITE NOVO ANA LAURA/
├── app/
│   ├── layout.tsx          # Fonts + smooth scroll global
│   ├── page.tsx            # Composição de seções
│   ├── globals.css         # Tokens + utilitários custom
│   └── api/contato/
│       └── route.ts        # POST /api/contato — envia email via Resend
├── components/
│   ├── Navbar.tsx          # Header transparente que vira sólido
│   ├── Hero.tsx            # Hero full-screen com foto + headline animada
│   ├── FilosofiaManifesto.tsx  # PARTE 1: foto B&W + manifesto editorial
│   ├── FilosofiaPilares.tsx    # PARTE 2: 4 pilares em cards
│   ├── PassoAPasso.tsx     # Timeline 8 etapas com linha que desenha
│   ├── Servicos.tsx        # 6 cards + foto + parallax
│   ├── AntesDepois.tsx     # 9 sliders interativos
│   ├── FAQ.tsx             # 10 perguntas com accordion
│   ├── Orcamento.tsx       # Form completo + WhatsApp fallback
│   ├── Footer.tsx          # Marca + contato + nav + crédito
│   ├── BackToTop.tsx       # Botão flutuante
│   ├── WhatsAppFloat.tsx   # CTA WhatsApp fixo
│   ├── Watermark.tsx       # SVGs decorativos (monograma, compasso, planta, régua)
│   └── SmoothScroll.tsx    # Wrapper Lenis
├── lib/
│   ├── utils.ts            # cn() + waLink()
│   ├── animations.ts       # Variants Framer Motion reutilizáveis
│   └── site-config.ts      # ÚNICA FONTE DE VERDADE para textos/contatos
├── public/
│   ├── img/                # 9 fotos novas da Ana (1.png a 9.png)
│   └── logo.svg            # Logo monograma AN
├── tailwind.config.ts      # Paleta + animações + tokens
├── next.config.js          # Otimização de imagens + remotePatterns
└── package.json
```

---

## Conteúdo — onde editar

Todos os textos, contatos, serviços, etapas e FAQ ficam em **um único arquivo**: `lib/site-config.ts`.

Quer mudar uma copy? Vai lá. Quer adicionar uma pergunta no FAQ? Vai lá. Quer trocar telefone/email? Vai lá.

---

## Deploy (Vercel)

```bash
# 1. push pro GitHub
git init && git add . && git commit -m "site v1"
git remote add origin https://github.com/SEU-USER/ana-laura-site.git
git push -u origin main

# 2. importar no Vercel — selecionar o repo
# 3. adicionar variáveis de ambiente no painel:
#    RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM
# 4. deploy automático
```

---

## Próximos passos sugeridos

- [ ] Conectar **Resend** com domínio verificado (a definir — usar `resend.dev` até lá)
- [ ] Substituir as 9 imagens placeholder do Antes/Depois pelas fotos reais dos projetos
- [ ] Adicionar **Google Analytics 4** ou **Plausible** para tracking
- [ ] Habilitar **Vercel Analytics** + **Speed Insights**
- [ ] Adicionar OG image (`/public/og-image.jpg` 1200x630)
- [ ] Schema.org JSON-LD (LocalBusiness) para SEO
- [ ] Página `/projetos/[slug]` com case studies completos
- [ ] CMS leve (Sanity ou Payload) caso queira editar conteúdo sem código

---

## Design notes

**Animações premium aplicadas:**
- Lenis smooth scroll global
- Reveal stagger em todas as seções (Framer Motion)
- Parallax sutil em fotos do Filosofia / Serviços
- Linha do tempo do Passo a Passo que "desenha" com `useTransform`
- Hover com brilho dourado nos cards
- CTA com gradient shimmer no hover
- Cursor de scroll animado no hero
- WhatsApp float com pulse ring

**Marcas d'água SVG** (`components/Watermark.tsx`):
- Monograma AN
- Compasso técnico
- Planta baixa / blueprint
- Régua arquitetônica

Aparecem sutis (`opacity: 0.06–0.18`) em diferentes seções compondo a vibe "atelier de engenharia".

---

Desenvolvido por **jvstudio.art** para Ana Laura Noronha.
