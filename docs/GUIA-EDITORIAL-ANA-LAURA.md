# Guia Editorial — Ana Laura Noronha

**Versão 1.0** · atualizado em 2026-07-09

Documento de referência para produção de conteúdo editorial do site. Vale para todas as 4 categorias: Blog, Normas Técnicas, Curiosidades e Brainstorming Sketch.

Serve para Ana escrever sozinha, para Jorge revisar, e para qualquer terceiro que venha a colaborar (redator, estagiário, IA de apoio). A ideia é blindar a marca contra dois riscos que já matamos uma vez: **conteúdo fabricado como se fosse vivência** e **conteúdo genérico sem posicionamento**.

---

## 1. Princípios inegociáveis

### 1.1 A Ana só assina o que ela pode ter dito

O padrão que a gente estabeleceu, refatorando 20 artigos que estavam com casos fabricados, virou lei: **nenhuma matéria pode inventar experiências, clientes ou diálogos que a Ana não viveu**. A autoridade da Ana vem do conhecimento técnico e da opinião profissional, não de social proof falso.

**Regra prática de auto-checagem:** se você lê a frase para a Ana e ela responderia *"eu não vivi isso"*, corta ou reescreve.

### 1.2 Voz da Ana em primeira pessoa é bem-vinda

Primeira pessoa como opinião profissional legítima é o que dá alma ao conteúdo — não é contra a regra 1.1. A diferença é sutil mas fundamental:

| ✅ Permitido | ❌ Proibido |
|---|---|
| "Eu recomendo" | "Cliente meu disse" |
| "Na minha visão" | "Vi cliente que" |
| "Costumo aplicar" | "Estava passando por [lugar]" |
| "Uma regra prática que uso" | "Depois de dezenas de obras..." |
| "Acredito que" | "Aprendi com meus clientes que..." |
| "Defendo em quase todo projeto" | "Uma vez tive um caso em que..." |
| "Uma abordagem que costumo" | "Ela chegou até mim dizendo..." |

### 1.3 Todo artigo assume risco de opinião

Conteúdo neutro é conteúdo esquecível. Ana toma posição: **"prefere sob medida a modular"**, **"não recomenda mármore branco em bancada"**, **"considera atraso de obra sintoma de projeto incompleto"**. Isso é o que separa autoridade de vitrine.

A opinião pode ser argumentada — não precisa ser radical — mas precisa aparecer.

### 1.4 Ana só trabalha com MDF (na marcenaria)

Não escrever nada sugerindo que Ana usa "madeira maciça". Esse é um posicionamento técnico dela: MDF de alta qualidade + acabamento premium. Se um artigo comentar sobre marcenaria, deve reforçar esse ponto.

---

## 2. Voz por categoria

Cada categoria tem um tom distinto. Escreva com o tom certo e o artigo já nasce ancorado no lugar certo do site.

### 2.1 Blog — didático e orçamentário

**Missão:** ajudar quem vai reformar/construir a decidir com informação.

**Tom:** direto, prático, "eu-com-você". Frases médias. Bullets quando cabem. Números concretos (R$ por m², prazos em dias).

**Estrutura típica:** problema → causas reais → critérios de decisão → faixas de investimento → o que fazer antes de contratar → CTA suave.

**Referências de tom:** ligar SPFW ao dia a dia, resolver dúvida honesta sem soar arrogante.

### 2.2 Normas Técnicas — técnico com cuidado

**Missão:** traduzir norma seca (NBR, ART, RRT) para pessoa não-engenheira sem perder rigor.

**Tom:** professor competente. Menos "eu" pessoal, mais fato + interpretação profissional. Sempre nomear a norma pelo número + nome oficial.

**Estrutura típica:** o que é a norma → por que existe → o que ela exige em pontos objetivos → como se aplica na prática → como o consumidor a usa a favor → disclaimer robusto.

**Regra específica:** disclaimer final é obrigatório em normas — *"Este texto é orientação geral. Para casos concretos, sempre consulte engenheiro civil ou arquiteto."*

### 2.3 Curiosidades — leve e prático

**Missão:** capturar leitor casual que veio pelo Instagram/Pinterest e ainda não é cliente. É a categoria mais viral em potencial.

**Tom:** conversacional, com boa dose de "sabia que" e "regra prática". Pode brincar com o formato — listas ("7 truques"), rankings ("10 erros"), princípios ("regra 60-30-10").

**Estrutura típica:** promessa clara no título → introdução curta → itens numerados ou princípios → combinação/exemplo → dica de aplicação hoje.

**Não fazer:** conteúdo tipo "cliqueai" barato ("VOCÊ NÃO VAI ACREDITAR"). Curiosidade elegante, não sensacionalista.

### 2.4 Brainstorming Sketch — reflexivo e conceitual

**Missão:** mostrar o pensamento de projeto da Ana. Não é blog operacional — é o "caderno criativo" público.

**Tom:** reflexivo, contemplativo, mas ancorado em decisão técnica. Nunca vivência inventada ("estava passando por"). Sempre conceito/princípio ("por que o concreto queimado voltou").

**Estrutura típica:** conceito ou material como ponto de partida → o que ele carrega → uso maduro vs uso amador → aplicações que a Ana defende → princípio maior por trás → blockquote poético fecha.

**Diferencial:** blockquotes elegantes com quase-provérbios de projeto. É a categoria onde a Ana pode ser mais autoral estilisticamente.

---

## 3. Estrutura padrão de todo artigo

Cada campo abaixo é uma coluna da tabela `articles` no Supabase.

| Campo | Regra | Exemplo bom |
|---|---|---|
| `title` | ≤ 70 caracteres, sem clickbait, promessa clara | *"Marcenaria sob medida vale a pena?"* |
| `subtitle` | 1 linha, complemento com ângulo/promessa | *"Custo, prazo, durabilidade e aproveitamento de espaço."* |
| `excerpt` | ≤ 160 caracteres, gancho para clique | *"Se você está entre sob medida e modular, esse é o comparativo técnico sem marketing."* |
| `content` | JSONB TipTap — ver seção 4 | — |
| `cover_image` | `/capas/NN-slug.jpeg` (2000×1375, ~800KB) | — |
| `cover_alt` | descrição rica em keywords secundárias | — |
| `tags` | 3-5 tags únicas, minúsculas, sem repetir entre artigos | `['marcenaria','custo-benefício','projeto']` |
| `author` | sempre `'Ana Laura Noronha'` | — |
| `reading_time_minutes` | contar 220 palavras/min, arredondar | 7, 8, 9 |
| `seo_meta_description` | 155-160 caracteres, focada em keyword-alvo | — |
| `seo_keywords` | 3-5 keywords long-tail | `['marcenaria sob medida','vale a pena','comparativo']` |
| `is_published` | `false` até revisão final | — |
| `is_featured` | 1 por categoria por vez, no máximo | — |
| `published_at` | data real de publicação | — |

---

## 4. Estrutura de `content` (JSONB TipTap)

Todo artigo segue o esqueleto:

```
1. Parágrafo de abertura (gancho + contexto)
2. Parágrafo mostrando o que o leitor vai levar
3. H2: primeira seção de fundo
4. Parágrafos de desenvolvimento
5. H2: segunda seção
6. (opcional) bulletList ou nested H3s
7. Blockquote pedagógico ou provocativo (1 por artigo, no mínimo)
8. H2: seção prática / passo a passo
9. bulletList com ação-por-item
10. H2: fechamento / CTA suave
11. Parágrafo de CTA ("se você quer conversar...")
12. Blockquote com disclaimer legal em itálico
```

### 4.1 Comprimentos-alvo por categoria

| Categoria | Palavras | Tempo leitura |
|---|---|---|
| Blog | 900-1400 | 7-9 min |
| Normas | 1500-2200 | 10-12 min |
| Curiosidades | 700-1000 | 5-7 min |
| Sketch | 500-800 | 3-4 min |

### 4.2 Elementos que devem aparecer

- **Mínimo 4 H2s** por artigo (o sumário lateral usa `headings`)
- **Pelo menos 1 blockquote** com aspa forte
- **Pelo menos 1 bulletList** com 3-5 itens
- **Zero H1** (o `title` do artigo é o H1 da página)

---

## 5. SEO on-page — o essencial

### 5.1 Keyword-alvo

Uma keyword-alvo por artigo. Exemplo: *"vale a pena marcenaria sob medida"*.

Deve aparecer:
- No `title`
- No `subtitle` ou no primeiro parágrafo
- Em pelo menos 2 H2s
- Na `seo_meta_description`
- No `cover_alt`

### 5.2 Palavras que puxam intenção de compra

Blog/Curiosidades:
- "quanto custa", "vale a pena", "melhor", "como escolher", "guia", "checklist"

Normas:
- "o que é", "para que serve", "quando é obrigatório", "como cumprir"

Sketch: SEO importa menos — foca em Instagram/Pinterest.

### 5.3 Link interno

Todo artigo deve ter 1-2 links para outros artigos do site (usar sintaxe TipTap `linkMark`). Ajuda SEO e mantém leitor no domínio.

---

## 6. Capas — regras e nomenclatura

### 6.1 Padrão visual

Todas as capas seguem o mesmo DNA — arquitetura residencial brasileira contemporânea, estilo Casa Vogue BR / Kinfolk. Studio MK27, Guilherme Torres como referências recorrentes.

**Paleta unificada:** bege quente, taupe, travertino, freijó, verde-oliva pontual, preto fosco.

**Modelo IA de referência:** Nano Banana (Gemini 2.5 Flash Image). Prompts arquivados em `supabase/seeds/PROMPTS-CAPAS-NANO-BANANA.md`.

### 6.2 Especificação técnica

- Aspect ratio: **16:11** (landscape editorial)
- Dimensão: **2000×1375 px**
- Formato: **.jpeg**
- Peso alvo: **~800 KB** (Nano Banana já entrega perto disso)

### 6.3 Nomenclatura

`NN-slug-curto.jpeg` onde NN é o número sequencial do artigo (01 a 20 já usados).

**Localização:** `public/capas/`

**Referência no banco:** `cover_image = '/capas/NN-slug.jpeg'`

---

## 7. Checklist antes de publicar

Passar rapidinho antes de virar a chave `is_published = true`:

- [ ] Título ≤ 70 caracteres
- [ ] Excerpt ≤ 160 caracteres, com gancho
- [ ] `seo_meta_description` entre 155-160 caracteres
- [ ] Pelo menos 4 H2s
- [ ] Pelo menos 1 blockquote
- [ ] Pelo menos 1 CTA suave para conversar com a Ana
- [ ] Disclaimer legal em itálico no final (obrigatório em Normas)
- [ ] Capa gerada, salva em `public/capas/`, nomeada corretamente
- [ ] `cover_alt` descritivo com keywords secundárias
- [ ] Sem nenhum caso fabricado (auto-teste "a Ana viveu isso?")
- [ ] Zero menção a "madeira maciça" — Ana trabalha com MDF
- [ ] Se marcado como `is_featured`, os outros da mesma categoria estão como `false`
- [ ] `reading_time_minutes` bate com a contagem real (220 palavras/min)
- [ ] `published_at` com data correta
- [ ] Preview em `/admin/artigos/[id]` está OK

---

## 8. Fluxo operacional recomendado

### 8.1 Da ideia ao publicado

1. **Pauta** — sai do calendário editorial (ver `CALENDARIO-EDITORIAL-60-DIAS.md`)
2. **Outline em Markdown local** — Ana rascunha os 4-6 H2s e as ideias-chave em bullets
3. **Redação** — 90 min por artigo, no fluxo focado
4. **Auto-checagem contra o checklist da seção 7**
5. **Capa** — usar o prompt já pronto do arquivo `PROMPTS-CAPAS-NANO-BANANA.md`; ou gerar novo prompt no mesmo padrão para pauta nova
6. **Input no admin** — `/admin/artigos/nova` com editor TipTap
7. **Preview** — abrir a URL do artigo em janela anônima
8. **Publicar** — flag `is_published = true` + `published_at = now()`
9. **Distribuir** — link no Instagram Stories, WhatsApp Business, e-mail para lista se existir

### 8.2 Cadência combinada

**2 artigos por mês**, alternando:

- **Semana 1:** artigo de Blog
- **Semana 3:** artigo alternando entre Normas / Curiosidades / Sketch

Ao final de 6 meses: 12 artigos novos, totalizando 32 no site.

---

## 9. Erros a evitar (lição das 20 primeiras matérias)

### 9.1 Fabricação de vivência

Já coberto na seção 1. Vale reforçar: **é o pior erro possível** porque destrói confiança em toda a marca se detectado.

### 9.2 Muita opinião sem argumento

Ana pode dizer "não recomendo mármore branco em bancada" — mas precisa explicar por que (mancha, manutenção, custo de restauração). Opinião sem por-quê parece capricho.

### 9.3 Valores sem contexto

"Reforma custa R$ 2.500/m²" isolado não ajuda. Sempre acompanhar de:
- Ano (2026, para não datar mal)
- Faixa (padrão econômico, médio, alto)
- Ressalva ("varia por região")
- Contexto ("com projeto executivo incluso")

### 9.4 Copiar tom de outros criadores

Se você lê e reconhece "ah, isso é jeito de escrever do Fulano", tem coisa errada. Ana tem tom próprio — reflexivo, técnico, direto sem ser seco.

### 9.5 CTA agressivo demais

Nunca "AGENDE JÁ SUA CONSULTORIA GRATUITA!!!". Sempre suave — *"Se você está começando um projeto e quer conversar sem compromisso, posso ajudar com essa análise inicial."*

---

## 10. Quando quebrar as regras

Este guia é orientação, não lei. Existem momentos em que quebrar uma regra faz sentido:

- Artigo de manifesto (Ana escrevendo sobre visão de mundo) — pode ser mais longo, mais autoral, sem H2s tradicionais
- Nota curta em Sketch (menos de 300 palavras) — pode dispensar bulletList e H2s
- Matéria de reação (evento do setor, mudança de norma) — pode ser publicada em 24h com estrutura menos rígida

Quando quebrar, escreva uma linha no fim do artigo (comentário oculto no admin): "*Quebra intencional: X, porque Y.*"

---

## 11. Ferramentas de apoio

- **TipTap editor** em `/admin/artigos/[id]` — WYSIWYG para o corpo do artigo
- **Nano Banana (Gemini)** para gerar capa
- **Google Trends** para validar keyword-alvo antes de escrever
- **Hemingway Editor** ou similar para checar legibilidade (target: nota 8-9)
- **Grammarly BR / LanguageTool** para revisão final
- **https://search.google.com/test/rich-results** para confirmar Schema.org depois do deploy

---

## 12. Governança e revisão

**Frequência de revisão deste guia:** a cada 20 novos artigos publicados, ou a cada 6 meses (o que vier primeiro).

**Responsável:** Ana Laura e Jorge conjuntamente.

**Como propor mudança:** editar este arquivo em pull request no repositório do site com justificativa no commit.

---

*Documento vivo. Se algo não faz sentido na prática, atualize aqui em vez de trabalhar contra o guia.*
