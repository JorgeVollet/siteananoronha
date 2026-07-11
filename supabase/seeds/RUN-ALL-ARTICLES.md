# 🚀 Como popular todos os 20 artigos de uma vez

## Ordem de execução no SQL Editor do Supabase

Rode **um arquivo por vez**, na ordem abaixo. Cada um cola-e-roda:

1. `articles-blog-01-03.sql` — 3 artigos do Blog (Ana Laura destaque)
2. `articles-blog-04-08.sql` — 5 artigos do Blog
3. `articles-normas-09-13.sql` — 5 artigos de Normas Técnicas
4. `articles-curiosidades-14-17.sql` — 4 artigos de Curiosidades
5. `articles-sketch-18-20.sql` — 3 posts do Brainstorming Sketch

**Total: 20 artigos publicados, cada um com destaque marcado por categoria.**

## Depois de rodar todos

Confirme no admin (`/admin/artigos`) que os 20 aparecem na lista.

Verifique cada categoria pública:
- `/blog` — 8 artigos (1 destaque hero + 2 sub-featured + 5 na lista)
- `/normas-tecnicas` — 5 artigos (1 destaque + 2 sub-featured + 2 na lista)
- `/curiosidades` — 4 artigos (1 destaque + 2 sub-featured + 1 na lista)
- `/brainstorming-sketch` — 3 posts (grid masonry Pinterest)

E a home:
- `/` → mini seção Conteúdo Editorial → carrossel navega entre as 4 categorias

## Se der erro

**`syntax error at or near "on"`** → provavelmente algum caractere escapado ficou errado. Confira que os arquivos foram baixados/salvos com encoding UTF-8.

**`duplicate key value violates unique constraint`** → os artigos já estão no banco. O `on conflict (slug) do nothing` deveria prevenir isso, mas se persistir, apague o slug conflitante primeiro:
```sql
delete from public.articles where slug = 'nome-do-slug';
```

**`relation "public.articles" does not exist`** → migration 006 e 007 ainda não foram aplicadas. Rode-as primeiro.

## Prompts para gerar as capas em IA

Ver arquivo `PROMPTS-IA-CAPAS.md` neste mesmo diretório. Contém 3 versões de prompt (Midjourney, DALL-E 3, Ideogram) para cada um dos 20 artigos.

## Distribuição de destaques

Cada categoria tem 1 artigo marcado como `is_featured = true` (aparece hero grande):
- **Blog:** "Quanto custa reformar uma casa?"
- **Normas Técnicas:** "NBR 15575 explicada"
- **Curiosidades:** "7 truques de iluminação"
- **Brainstorming Sketch:** "A textura que virou projeto"

## Estatísticas do conteúdo produzido

- 20 artigos completos
- ~180 min de leitura total
- Padrão editorial consistente (formato Ângela)
- SEO otimizado (meta description + keywords em cada)
- Capas Unsplash placeholder (substituir por IA depois)
- Publicações espaçadas nos últimos 65 dias (parece produção contínua)
