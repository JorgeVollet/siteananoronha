# 🔧 PROMPT PARA CLAUDE CODE — Fix urgente: Header global nas páginas editoriais

**Como usar:** cola tudo daqui pra baixo no Claude Code na raiz do projeto.

---

## 🐛 Bug reportado

Ao entrar em `/blog`, `/normas-tecnicas`, `/curiosidades`, `/brainstorming-sketch` e em qualquer artigo (`/blog/[slug]` etc.), **NÃO aparece o header**. Usuário fica preso na página sem forma de voltar para a home ou navegar.

## 🔍 Diagnóstico já feito

- `app/layout.tsx` não renderiza header nenhum globalmente
- O único header do site está em `components/sections/HeroHeader.tsx` e é montado dentro do `HeroSection` — que só existe na home (`app/page.tsx`)
- Todos os links de navegação são âncoras (`#manifesto`, `#sobre`, `#portfolio`, etc.) — apontam para seções da própria home. Copiar direto para outra rota quebra os links.
- O `HeroHeader` também depende de uma prop `scrolled` (é o `HeroSection` que decide isso via IntersectionObserver do Hero)
- Na home, o header começa **transparente com texto branco** (sobre a foto do Hero) e vira **bege com texto escuro** depois de scroll
- Nas páginas internas não existe Hero por trás, então header precisa já começar **bege com texto escuro** direto

---

## 🎯 Objetivo

Criar um **SiteHeader global** que:

1. Renderiza em **todas as páginas** via `app/layout.tsx`
2. **Detecta a rota** (via `usePathname`) — se for `/` (home), age como antes (transparente → bege ao scroll); se for qualquer outra, começa direto no modo bege sólido
3. **Links de navegação inteligentes** — na home usam âncoras (`#manifesto`); em outras páginas usam links absolutos (`/#manifesto`) que voltam pra home e âncoram
4. **Logo AN** — sempre aponta para `/` (nunca `#home`)
5. **Preserva o `ContentDropdown` (Blog/Normas/etc)** exatamente como está
6. **Preserva mobile drawer** com `MobileContentAccordion`
7. **Não duplica** — o `HeroSection` da home NÃO deve mais renderizar seu próprio `HeroHeader`

---

## 📁 Arquivos a criar / modificar

### CRIAR:
```
components/site/SiteHeader.tsx    → novo header global, é o que vai no layout
```

### MODIFICAR:
```
app/layout.tsx                              → renderizar <SiteHeader /> antes do {children}
components/sections/HeroSection.tsx         → REMOVER a renderização do HeroHeader dele
components/sections/HeroHeader.tsx          → pode ser deletado ao final, ou deixado como está (não vai ser mais importado)
```

---

## ⚙️ Instruções detalhadas

### PASSO 1 — Criar `components/site/SiteHeader.tsx`

Copie a lógica do `HeroHeader.tsx` atual, mas com estas 6 mudanças:

**Mudança 1 — Detectar rota atual:**

```tsx
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
// ...restante dos imports iguais ao HeroHeader

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(!isHome); // páginas internas já começam scrolled
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // scroll listener SÓ na home (nas outras já começa scrolled fixo)
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll(); // inicializa
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome, pathname]);

  // ...resto do componente
}
```

**Mudança 2 — Links inteligentes por rota:**

Crie um helper local que decide se o link é âncora local ou volta pra home:

```tsx
const buildLink = (anchor: string) => (isHome ? anchor : `/${anchor}`);

// menuItems fica com hrefs relativos que passam pelo builder:
const menuItems = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Pilares', href: '#pilares' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Passo a Passo', href: '#passos', hideAtLg: true },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Contato', href: '#contato' },
];

// e no map, aplique buildLink(item.href) em vez de item.href diretamente
```

**Mudança 3 — Logo aponta sempre para `/`:**

```tsx
<a
  href="/"                    // <-- em vez de "#home"
  style={{ ... }}             // mesmo estilo de antes
>
  AN
</a>
```

**Mudança 4 — Whatsapp/CTA:**

O `HeroHeader` recebia `whatsapp` e `ctaTexto` como props. Como agora o header é global, ele precisa buscar esses dados de outro lugar. **Sugestão simples**: hardcode para ficar rápido. Os valores atuais parecem ser:

```tsx
const whatsapp = '5555XXXXXXXX'; // <-- USE O MESMO QUE HeroSection.tsx passa hoje
const ctaTexto = 'Solicitar orçamento'; // <-- USE O MESMO
```

**IMPORTANTE:** antes de escrever, **abra `components/sections/HeroSection.tsx` e veja qual whatsapp e ctaTexto ele passa pro `HeroHeader`**. Reproduza esses valores exatos no novo `SiteHeader`. Depois vamos refatorar em `SITE_CONFIG` se ficar limpo.

**Mudança 5 — Comportamento na rota `/`:**

Na home, header começa transparente (letras brancas sobre o Hero) e vira bege ao scrollar. **Isso já está feito** no `HeroHeader` original — apenas garantir que o `scrolled` state seja controlado pelo scroll listener quando `isHome === true`.

**Mudança 6 — Comportamento em qualquer outra rota:**

Nunca fica transparente. Sempre bege sólido com texto escuro. `scrolled` fica travado em `true`.

### PASSO 2 — Modificar `app/layout.tsx`

Adicione o import e renderize o `SiteHeader` no topo do `<body>`, antes do `SmoothScroll`:

```tsx
import { SiteHeader } from '@/components/site/SiteHeader';

// dentro do body:
<body className="bg-bg-nude text-text-dark font-sans antialiased">
  <PersonJsonLd />
  <OrganizationJsonLd />
  <SiteHeader />                          {/* <-- ADICIONAR */}
  <SmoothScroll>{children}</SmoothScroll>
  <Toaster position="bottom-right" richColors />
  <Analytics />
  <SpeedInsights />
</body>
```

### PASSO 3 — Modificar `components/sections/HeroSection.tsx`

Localize onde ele importa e renderiza `<HeroHeader ... />` e **remova essa renderização**. O `HeroSection` fica só com o conteúdo do Hero em si (título, foto, CTA). O header agora é responsabilidade do layout global.

**⚠️ Cuidado:** o `HeroSection` provavelmente controla um estado `scrolled` interno via IntersectionObserver do próprio hero. Esse controle **não é mais necessário para o header** — se o observer só existia por causa do header, pode remover. Se controla outras coisas (opacidade do próprio Hero, animações), preserve.

### PASSO 4 — Padding-top nas páginas internas

O header é `position: fixed` com `height: 72px`. Na home, o Hero ocupa 100vh e a foto passa por trás do header, então não precisa de padding. **Nas páginas internas** o conteúdo começa colado no topo — vai ficar escondido atrás do header fixo.

**Solução:** adicionar `padding-top: 72px` no wrapper das páginas internas.

**Onde aplicar:**

Opção 1 (limpa) — criar um `app/(editorial)/layout.tsx` que envolva `/blog`, `/normas-tecnicas`, `/curiosidades`, `/brainstorming-sketch` com esse padding. Mas isso exige mover as pastas para dentro de `(editorial)`.

Opção 2 (rápida) — adicionar `pt-[72px]` (Tailwind) na primeira div de cada uma dessas páginas.

**Recomendação:** Opção 2. É rápida, não muda estrutura de pastas, resolve o problema. Aplicar em:

```
app/blog/page.tsx
app/blog/[slug]/page.tsx
app/normas-tecnicas/page.tsx
app/normas-tecnicas/[slug]/page.tsx
app/curiosidades/page.tsx
app/curiosidades/[slug]/page.tsx
app/brainstorming-sketch/page.tsx
app/brainstorming-sketch/[slug]/page.tsx
```

Na wrapper mais externa de cada uma dessas páginas (geralmente um `<main>` ou `<div>`), adicionar `className="pt-[72px]"` ou `style={{ paddingTop: 72 }}`. Se essas páginas usam um componente compartilhado (`ArticlePage.tsx`, `CategoryHub.tsx`), aplique no wrapper desse componente.

### PASSO 5 — Verificação

Rodar `pnpm build` (ou `npm run build`). Testar navegando:

1. Abrir `/` — header transparente com texto branco no topo, vira bege ao scrollar. Logo "AN" no canto esquerdo.
2. Scrollar até o final e clicar em "Blog" no dropdown "Conteúdo" — deve ir pra `/blog` com header **bege sólido desde o carregamento**
3. Em `/blog`, clicar no logo "AN" — deve voltar pra `/`
4. Em `/blog`, clicar em "Manifesto" no menu — deve ir pra `/` e âncorar em `#manifesto`
5. Repetir para `/normas-tecnicas`, `/curiosidades`, `/brainstorming-sketch` e para artigos individuais
6. Mobile: hamburger abre drawer, drawer tem link "Conteúdo" com acordeão das 4 categorias

---

## 🚫 Restrições

- **NÃO adicionar** biblioteca nova
- **NÃO mudar** o visual do header (cores, fontes, animação) — só o comportamento cross-rota
- **NÃO mexer** no `ContentDropdown` nem no `MobileContentAccordion` (funcionam bem)
- **NÃO tentar** transformar as âncoras `#manifesto` em rotas reais `/manifesto`. As seções continuam sendo da home; os links de páginas internas só voltam pra home e ancoram (via `/#manifesto`)
- **NÃO deletar** `HeroHeader.tsx` no mesmo commit — deixar como está no filesystem. Faremos limpeza depois de validar que o `SiteHeader` funciona 100%.

---

## ✅ Checklist antes de reportar pronto

- [ ] `pnpm build` (ou `npm run build`) passa sem erro
- [ ] Home carrega: header transparente no topo, vira bege ao scroll — sem regressão
- [ ] `/blog` carrega: header bege sólido desde o início, texto escuro
- [ ] `/blog/quanto-custa-reformar-uma-casa` (ou qualquer artigo): header bege sólido no topo
- [ ] Clicar no logo "AN" em qualquer página volta pra `/`
- [ ] Clicar em "Manifesto" em `/blog` vai pra `/#manifesto`
- [ ] Dropdown "Conteúdo" funciona em qualquer página
- [ ] Mobile drawer funciona em qualquer página
- [ ] Conteúdo das páginas internas não fica escondido atrás do header fixo (padding-top de 72px aplicado)

---

## 📤 Formato de saída esperado

1. Lista de arquivos criados e modificados
2. Confirmação de build ok
3. Print/descrição do comportamento em `/` e em `/blog` (comparativo)

Se qualquer coisa deste prompt for ambígua ou você precisar decidir algo não documentado, PARE e pergunte antes de assumir.
