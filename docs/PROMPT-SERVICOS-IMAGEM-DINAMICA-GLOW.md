# 🎨 PROMPT PARA CLAUDE CODE — Serviços: imagem dinâmica + glow no card ativo

**Como usar:** cola tudo daqui pra baixo no Claude Code na raiz do projeto.

---

## 📋 Contexto

O componente `components/Servicos.tsx` renderiza a seção Serviços da home:

- **Coluna esquerda:** eyebrow + headline "Você contrata uma vez — e não pensa mais nisso" + subtítulo + CTA "Falar com a Ana" + carrossel Embla com 6 cards (Projeto Arquitetônico, Design de Interiores, Consultoria Técnica, Gestão de Obra, Marcenaria Sob Medida, Consultoria de Materiais)
- **Coluna direita:** foto vertical da Ana Laura sentada em preto, com badge "Engenharia · Interiores · Marcenaria"

Já existe estado `selectedIndex` (0-5) sincronizado com Embla via listener `onSelect`. Já existe controle por dots + setas + drag.

## 🎯 Objetivo

Duas mudanças coordenadas:

### Mudança A — Glow no card ativo

Quando o usuário navega no carrossel (via setas, dots ou drag), o card do `selectedIndex` atual deve ganhar um **glow sutil e elegante** — nada exagerado, no espírito Atelier × Summit. Os outros cards permanecem com aparência normal.

O glow deve:
- Aparecer com transição suave (0.5s ease)
- Cor taupe/dourada consistente com o design system (`#9a744d` como base)
- Ser um `box-shadow` externo suave + eventual `outline`/borda mais destacada
- Elevar levemente o card (translate-y menor que o hover atual, tipo `-translate-y-0.5`)
- Não competir visualmente com o hover — o hover é "posso interagir"; o glow é "estou selecionado"

### Mudança B — Imagem da coluna direita muda por card

Ao invés de sempre mostrar a foto da Ana (`/img/9.png`), a imagem da coluna direita deve trocar dinamicamente conforme o `selectedIndex`.

Cada índice mapeia para uma foto específica em `public/img/servicos/` (usuário vai gerar via Nano Banana):

```
0 (Projeto Arquitetônico)    → /img/servicos/01-arquitetonico.jpeg
1 (Design de Interiores)     → /img/servicos/02-interiores.jpeg
2 (Consultoria Técnica)      → /img/servicos/03-consultoria-tecnica.jpeg
3 (Gestão de Obra)           → /img/servicos/04-gestao-obra.jpeg
4 (Marcenaria Sob Medida)    → /img/servicos/05-marcenaria.jpeg
5 (Consultoria de Materiais) → /img/servicos/06-materiais.jpeg
```

A transição entre imagens deve ser **crossfade suave** (opacity 0 → 1 em ~0.6s), não corte seco.

O badge "Engenharia · Interiores · Marcenaria" continua fixo no canto inferior esquerdo, sobre qualquer foto.

O `alt` da imagem deve mudar junto: `alt="Ilustração para {title}"`.

---

## 📁 Arquivos a modificar

Apenas 1:

```
components/Servicos.tsx
```

---

## ⚙️ Instruções detalhadas

### PASSO 1 — Adicionar campo `image` ao array `SERVICES`

Localizar a definição do array `SERVICES` (linhas ~49-92) e adicionar o campo `image` em cada item:

```tsx
interface ServiceItem {
  n: string;
  Icon: LucideIcon;
  id: string;
  title: string;
  body: string;
  image: string;   // ← NOVO campo
}

const SERVICES: ServiceItem[] = [
  {
    n: '01',
    Icon: Ruler,
    id: 'arquitetonico',
    title: 'Projeto Arquitetônico',
    body: 'Concepção e detalhamento...',
    image: '/img/servicos/01-arquitetonico.jpeg',
  },
  {
    n: '02',
    Icon: Palette,
    id: 'interiores',
    title: 'Design de Interiores',
    body: 'Execução de projetos residenciais...',
    image: '/img/servicos/02-interiores.jpeg',
  },
  {
    n: '03',
    Icon: ClipboardCheck,
    id: 'consultoria-tecnica',
    title: 'Consultoria Técnica',
    body: 'Avaliação detalhada de normas...',
    image: '/img/servicos/03-consultoria-tecnica.jpeg',
  },
  {
    n: '04',
    Icon: Clock,
    id: 'gestao-obra',
    title: 'Gestão de Obra',
    body: 'Acompanhamento rigoroso...',
    image: '/img/servicos/04-gestao-obra.jpeg',
  },
  {
    n: '05',
    Icon: Hammer,
    id: 'marcenaria',
    title: 'Marcenaria Sob Medida',
    body: 'Móveis planejados com acabamento autoral...',
    image: '/img/servicos/05-marcenaria.jpeg',
  },
  {
    n: '06',
    Icon: Layers,
    id: 'materiais',
    title: 'Consultoria de Materiais',
    body: 'Análise estratégica e técnica...',
    image: '/img/servicos/06-materiais.jpeg',
  },
];
```

### PASSO 2 — Aplicar glow no card ativo

Localizar o `<article>` dentro do `SERVICES.map(...)` (linha ~270-333). Ele precisa saber qual é seu índice para comparar com `selectedIndex`.

Modificar o `.map` para incluir índice:

```tsx
{SERVICES.map(({ n, id, Icon, title, body }, idx) => (
  <article
    key={n}
    data-active={selectedIndex === idx}
    className={cn(
      'premium-panel',
      'group/card relative flex shrink-0 flex-col',
      'rounded-[16px]',
      'border bg-[#eee5da] p-5 lg:p-6',
      'transition-all duration-500',
      'w-[85%] sm:w-[calc(50%_-_10px)]',
      // Estado padrão
      'border-[#d8c9b8] hover:-translate-y-1',
      // Estado ATIVO (glow)
      selectedIndex === idx && [
        'border-[#c19366]',
        '-translate-y-1',
        'shadow-[0_20px_50px_-12px_rgba(154,116,77,0.35),0_0_0_1px_rgba(154,116,77,0.25),inset_0_1px_0_rgba(255,255,255,0.7)]',
      ],
    )}
  >
    {/* Glow interno sutil no fundo do card ativo */}
    {selectedIndex === idx && (
      <div
        className="pointer-events-none absolute inset-0 rounded-[16px] transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(193,147,102,0.14), transparent 60%)',
          opacity: 1,
        }}
        aria-hidden="true"
      />
    )}

    {/* ...header, título, body como estão hoje... */}
  </article>
))}
```

**Notas sobre o glow:**
- `box-shadow` de 3 camadas: sombra dourada externa + halo dourado 1px (simula ring) + inset white sutil pro topo brilhar
- `border` muda de `#d8c9b8` (cinza-bege padrão) para `#c19366` (taupe mais dourado)
- Radial gradient interno no topo do card cria efeito de "luz caindo" — dá o toque premium sem exagero

### PASSO 3 — Imagem dinâmica na coluna direita com crossfade

Localizar o bloco `{/* ══ COLUNA DIREITA */}` (linhas ~438-483). O `<Image>` atual usa `src={imagemAna ?? '/img/9.png'}`.

**Substituir** por renderização das 6 imagens empilhadas, com apenas a do índice ativo visível via opacity — isso dá crossfade real (não FOUC):

```tsx
{/* ══ COLUNA DIREITA — Foto dinâmica por serviço ══ */}
<div className="order-1 lg:order-2 reveal-on-scroll delay-300 w-full mx-auto lg:mx-0">
  <div
    className="relative w-full overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[640px] xl:h-[720px]"
    style={{
      borderRadius: 'var(--radius-frame)',
      border: '1px solid #dfd4c8',
      background: '#d7cabc',
      boxShadow: '0 34px 90px rgba(71,56,42,0.17)',
    }}
  >
    {/* Todas as 6 imagens empilhadas, controle por opacity */}
    {SERVICES.map((service, idx) => (
      <Image
        key={service.id}
        src={service.image}
        alt={`Ilustração — ${service.title}`}
        fill
        quality={90}
        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 38vw"
        priority={idx === 0}
        className={cn(
          'object-cover object-center transition-opacity duration-[600ms] ease-out',
          selectedIndex === idx ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden={selectedIndex !== idx}
      />
    ))}

    {/* Overlay gradiente inferior — permanece por cima de todas */}
    <div
      className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-10"
      style={{
        background:
          'linear-gradient(to top, rgba(33,25,19,0.30), rgba(33,25,19,0.08) 50%, transparent)',
      }}
    />

    {/* Badge credenciais — fixo, sempre visível */}
    <div
      className="absolute bottom-5 left-5 z-20 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.82rem] font-extrabold uppercase"
      style={{
        border: '1px solid #d8c9b8',
        background: '#eee5da',
        letterSpacing: '0.08em',
        color: '#9a744d',
        boxShadow:
          '0 10px 22px rgba(42,31,22,0.16), inset 0 1px 0 rgba(255,255,255,0.68)',
        fontFamily: 'var(--font-body)',
      }}
    >
      Engenharia · Interiores · Marcenaria
    </div>
  </div>
</div>
```

**Notas:**
- Empilhar 6 `<Image>` com `fill` + `object-cover` funciona porque o container tem `position: relative`
- `priority={idx === 0}` faz o Next.js pré-carregar só a primeira, o resto vai por lazy
- `transition-opacity duration-[600ms]` dá o crossfade elegante
- `aria-hidden={selectedIndex !== idx}` mantém acessibilidade correta

### PASSO 4 — Prop `imagemAna` fica obsoleta

A prop `imagemAna?: string` (linha ~99) não é mais usada. **Manter na assinatura** por retrocompatibilidade (se for chamada com o valor, ignorar silenciosamente), mas remover do JSX. Deixar comentário:

```tsx
type Props = {
  subtitulo?: string;
  imagemAna?: string; // legado — ignorado após dinamização de imagens por serviço
  whatsapp?: string;
};
```

### PASSO 5 — Analytics do novo comportamento

Não precisa adicionar tracking novo. O evento `services_carousel_navigate` já registra qual índice foi selecionado — o crossfade da imagem é consequência visual disso.

---

## 🚫 Restrições

- **NÃO alterar** a lógica do Embla, os dots, as setas nem o CTA "Falar com a Ana"
- **NÃO adicionar** biblioteca nova
- **NÃO mudar** o texto, headline, subtítulo ou eyebrow — só o comportamento visual dos cards e da foto
- **NÃO deletar** a foto `/img/9.png` do repositório — deixar como fallback histórico
- **NÃO renderizar** um `<img>` fallback se as imagens dos serviços não existirem ainda em `public/img/servicos/`. O usuário vai subir as fotos por conta própria via Nano Banana; se rodar `next build` antes das fotos existirem, o Next.js só vai gerar warning no console, não crashar
- **NÃO tocar** no `SiteHeader.tsx` nem em `HeroSection.tsx` — esse prompt é escopo Serviços apenas

---

## ✅ Checklist de verificação

- [ ] `pnpm build` (ou `npm run build`) passa sem erro
- [ ] Ao abrir a home: primeiro card (Projeto Arquitetônico) aparece com glow, foto correspondente na direita
- [ ] Ao clicar seta ► ou dot: crossfade suave da imagem (~0.6s), glow migra pro novo card, cards anteriores voltam ao normal
- [ ] Drag no mobile também funciona (dispara `onSelect` do Embla)
- [ ] Badge "Engenharia · Interiores · Marcenaria" continua fixo em todas as fotos
- [ ] Se uma imagem ainda não estiver em `public/img/servicos/` (ex: 03 e 04 pendentes), site não crasha — só a foto fica em branco naquele índice específico
- [ ] Nenhuma regressão na home fora dessa seção

---

## 📤 Formato de saída esperado

1. Lista de linhas modificadas em `Servicos.tsx`
2. Build ok
3. Descrição de comportamento (comparativo antes → depois)
4. Print/menção se algum warning apareceu (ex: imagem não encontrada)

Se algo estiver ambíguo ou precisar decisão, PARE e pergunte antes de assumir.
