export const SITE_CONFIG = {
  url: 'https://www.ananoronha.eng',
  name: 'Ana Laura Noronha',
  brandName: 'AN Engenharia',
  tagline: 'Engenharia civil + curadoria de interiores',
  description:
    'Ana Laura Noronha — engenheira civil e curadora de interiores. Projetos residenciais integrados em Horizontina/RS e Sul do Brasil.',
  locale: 'pt-BR',
  author: {
    name: 'Ana Laura Noronha',
    jobTitle: 'Engenheira Civil e Curadora de Interiores',
    url: 'https://www.ananoronha.eng',
    email: 'contato@ananoronha.eng',
    telephone: '+55-55-XXXX-XXXX',
    image: 'https://www.ananoronha.eng/ana-laura-perfil.jpg',
    sameAs: [] as string[],
    address: {
      locality: 'Horizontina',
      region: 'RS',
      country: 'BR',
    },
  },
  organization: {
    name: 'AN Engenharia',
    legalName: 'Ana Laura Noronha - Engenharia e Interiores',
    url: 'https://www.ananoronha.eng',
    logo: 'https://www.ananoronha.eng/logo.svg',
    foundingDate: '2019',
    founder: 'Ana Laura Noronha',
  },
} as const;

export type CategoryKey = 'blog' | 'normas' | 'curiosidades' | 'sketch';

export const CATEGORY_META: Record<
  CategoryKey,
  { slug: string; label: string; description: string }
> = {
  blog: {
    slug: 'blog',
    label: 'Blog',
    description:
      'Guias práticos sobre reforma, orçamento e projeto residencial.',
  },
  normas: {
    slug: 'normas-tecnicas',
    label: 'Normas Técnicas',
    description: 'NBR, ART, RRT e normas que protegem seu projeto.',
  },
  curiosidades: {
    slug: 'curiosidades',
    label: 'Curiosidades',
    description:
      'Design, iluminação, paletas e detalhes que fazem diferença.',
  },
  sketch: {
    slug: 'brainstorming-sketch',
    label: 'Brainstorming Sketch',
    description:
      'Conceitos de projeto, princípios estéticos e referências.',
  },
};
