export type Project = {
  id: string;
  category: 'engenharia' | 'marcenaria';
  nome: string;
  tipologia: string;
  servicos: string[];
  beforeSrc: string;
  afterSrc: string;
  thumbnail: string;
};

// Imagens locais de /public/img/ como placeholders.
// Substituir por pares reais de antes/depois quando disponíveis.
export const projects: Project[] = [
  // ── ENGENHARIA ──────────────────────────────────────────────
  {
    id: 'eng-01',
    category: 'engenharia',
    nome: 'Residencial Schneider',
    tipologia: 'Residencial · Reforma completa',
    servicos: ['Arquitetura', 'Gestão de Obra'],
    beforeSrc: '/img/2.png',
    afterSrc: '/img/3.png',
    thumbnail: '/img/3.png',
  },
  {
    id: 'eng-02',
    category: 'engenharia',
    nome: 'Cobertura Petrópolis',
    tipologia: 'Residencial · Ampliação',
    servicos: ['Arquitetura', 'Consultoria Técnica'],
    beforeSrc: '/img/4.png',
    afterSrc: '/img/5.png',
    thumbnail: '/img/5.png',
  },
  {
    id: 'eng-03',
    category: 'engenharia',
    nome: 'Comercial Moinhos',
    tipologia: 'Comercial · Retrofit',
    servicos: ['Arquitetura', 'Gestão de Obra', 'Interiores'],
    beforeSrc: '/img/6.png',
    afterSrc: '/img/7.png',
    thumbnail: '/img/7.png',
  },
  // ── MARCENARIA ──────────────────────────────────────────────
  {
    id: 'marc-01',
    category: 'marcenaria',
    nome: 'Cozinha Vetro Nero',
    tipologia: 'Cozinha · Sob medida',
    servicos: ['Marcenaria', 'Design de Interiores'],
    beforeSrc: '/img/1.png',
    afterSrc: '/img/8.png',
    thumbnail: '/img/8.png',
  },
  {
    id: 'marc-02',
    category: 'marcenaria',
    nome: 'Home Office Carvalho',
    tipologia: 'Escritório · Móveis planejados',
    servicos: ['Marcenaria'],
    beforeSrc: '/img/3.png',
    afterSrc: '/img/9.png',
    thumbnail: '/img/9.png',
  },
  {
    id: 'marc-03',
    category: 'marcenaria',
    nome: 'Closet Carvalho Fumê',
    tipologia: 'Dormitório · Closet integrado',
    servicos: ['Marcenaria', 'Design de Interiores'],
    beforeSrc: '/img/5.png',
    afterSrc: '/img/2.png',
    thumbnail: '/img/2.png',
  },
];
