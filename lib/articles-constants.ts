export const ARTICLE_CATEGORIES = [
  {
    value: 'blog',
    label: 'Blog',
    description: 'Artigos editoriais e conteúdo geral',
    urlPath: '/blog',
    color: '#9a744d',
  },
  {
    value: 'normas',
    label: 'Normas Técnicas',
    description: 'Artigos técnicos sobre normas NBR, ART, regulamentações',
    urlPath: '/normas-tecnicas',
    color: '#5C7A8C',
  },
  {
    value: 'curiosidades',
    label: 'Curiosidades',
    description: 'Conteúdo leve, curiosidades, tendências e dicas',
    urlPath: '/curiosidades',
    color: '#8A9A86',
  },
  {
    value: 'sketch',
    label: 'Brainstorming Sketch',
    description: 'Ideias, sketches e observações — formato visual scrapbook',
    urlPath: '/brainstorming-sketch',
    color: '#A67C52',
  },
] as const;

export type ArticleCategoryConfig = (typeof ARTICLE_CATEGORIES)[number];

export function getCategoryConfig(value: string) {
  return ARTICLE_CATEGORIES.find((c) => c.value === value);
}
