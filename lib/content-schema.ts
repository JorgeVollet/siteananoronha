/**
 * Schema declarativo do conteúdo editável do site.
 *
 * REGRA DE OURO: cada campo aqui DEVE corresponder a algo visível em uma seção
 * do site público. Quando uma seção for redesenhada, este schema é a PRIMEIRA
 * coisa a atualizar — adicionando, removendo ou renomeando campos.
 *
 * Como manter a sincronia:
 *   1. Redesenhou uma seção? Liste todos os textos/imagens editáveis dela.
 *   2. Compare com os fields aqui. Adicione novos, remova obsoletos.
 *   3. Adicione/atualize o comentário-âncora no Server Component dessa seção.
 *
 * Server Components que consomem essas chaves devem ter no topo:
 *   // Schema de conteúdo: lib/content-schema.ts → section "X"
 *   // Edição via: /admin/conteudo → Seção X
 */

export type ContentFieldType = 'text' | 'textarea' | 'image' | 'url';

export type ContentField = {
  key: string;
  label: string;
  type: ContentFieldType;
  placeholder?: string;
  hint?: string;
  imageBucket?: 'site-images';
};

export type ContentSection = {
  section: string;
  label: string;
  description: string;
  fields: ContentField[];
};

export const CONTENT_SECTIONS: ContentSection[] = [
  // =========================================================
  // HERO — primeira dobra do site
  // Elementos visíveis: eyebrow + H1 + subtítulo + botão CTA + foto de fundo
  // =========================================================
  {
    section: 'hero',
    label: 'Hero (topo do site)',
    description:
      'Primeira coisa que o visitante vê. Mini-título de abertura, título principal, frase complementar, texto do botão e foto de fundo.',
    fields: [
      {
        key: 'eyebrow',
        label: 'Mini-título de abertura',
        type: 'text',
        placeholder: '01 / Manifesto',
        hint: 'Aparece em uppercase taupe no topo do bloco editorial.',
      },
      {
        key: 'titulo',
        label: 'Título principal',
        type: 'textarea',
        placeholder: 'Cada projeto é único, cada execução é precisa.',
        hint: 'Dica: a parte após a ÚLTIMA vírgula fica destacada em italic dourado automaticamente.',
      },
      {
        key: 'subtitulo',
        label: 'Frase complementar',
        type: 'textarea',
        placeholder:
          'Engenharia, arquitetura e marcenaria sob medida — um método integrado, do conceito à entrega.',
        hint: 'Aparece em italic abaixo do título principal.',
      },
      {
        key: 'cta_texto',
        label: 'Texto do botão de orçamento',
        type: 'text',
        placeholder: 'Solicitar Orçamento',
        hint: 'O botão sempre abre o WhatsApp configurado em Footer & Contato.',
      },
      {
        key: 'imagem_principal',
        label: 'Foto de fundo',
        type: 'image',
        hint: 'Foto ocupa toda a primeira tela. Use imagens 1920×1080 ou maiores.',
        imageBucket: 'site-images',
      },
    ],
  },

  // =========================================================
  // SOBRE — seção institucional (FilosofiaManifesto)
  // Elementos visíveis: eyebrow editável + corpo do texto + foto da Ana
  // =========================================================
  {
    section: 'sobre',
    label: 'Manifesto (ex-Sobre)',
    description: 'Seção do manifesto da marca — NÃO é a biografia da Ana. Eyebrow, corpo do texto e foto são editáveis.',
    fields: [
      {
        key: 'titulo',
        label: 'Label da seção (eyebrow)',
        type: 'text',
        placeholder: '01 / Manifesto',
        hint: 'Mini-label exibido acima do título editorial.',
      },
      {
        key: 'corpo',
        label: 'Corpo do manifesto',
        type: 'textarea',
        placeholder:
          'Referências soltas. Decisões sem critério. Dúvidas que crescem conforme o projeto avança.',
        hint: 'Separe parágrafos com uma linha em branco.',
      },
      {
        key: 'imagem',
        label: 'Foto da Ana (seção Manifesto)',
        type: 'image',
        hint: 'Foto vertical ao lado do texto. Recomendado: 800×1000.',
        imageBucket: 'site-images',
      },
    ],
  },

  // =========================================================
  // SOBRE (NOVA) — biografia da Ana Laura entre Manifesto e Pilares
  // Elementos visíveis: eyebrow + título + subtítulo + corpo + foto de fundo
  // =========================================================
  {
    section: 'sobre_novo',
    label: 'Sobre (a Ana Laura)',
    description: 'Nova seção entre Manifesto e Pilares — biografia profissional da Ana. Foto ocupa o background inteiro.',
    fields: [
      {
        key: 'eyebrow',
        label: 'Mini-título',
        type: 'text',
        placeholder: 'Sobre',
      },
      {
        key: 'titulo',
        label: 'Título principal',
        type: 'text',
        placeholder: 'Olá, eu sou a Ana Laura.',
      },
      {
        key: 'subtitulo',
        label: 'Subtítulo',
        type: 'text',
        placeholder: 'Engenheira Civil & Curadora de Interiores',
      },
      {
        key: 'corpo',
        label: 'Biografia',
        type: 'textarea',
        placeholder: 'Formada pela Universidade do Vale do Itajaí...',
        hint: 'Use linha em branco para separar parágrafos.',
      },
      {
        key: 'imagem',
        label: 'Foto de fundo',
        type: 'image',
        hint: 'Foto da Ana que ocupa o background da seção inteira. Use foto editorial horizontal.',
        imageBucket: 'site-images',
      },
    ],
  },

  // =========================================================
  // SERVIÇOS — bloco editorial + carrossel de cards
  // Elementos editáveis: subtítulo e foto lateral
  // (Os 6 cards de serviços têm conteúdo fixo no código)
  // =========================================================
  {
    section: 'servicos',
    label: 'Seção de Serviços',
    description:
      'Frase introdutória e foto da Ana ao lado dos cards. Os 6 cards de serviços têm conteúdo fixo no código — para alterar, peça ao desenvolvedor.',
    fields: [
      {
        key: 'subtitulo',
        label: 'Frase introdutória',
        type: 'textarea',
        placeholder: 'Da concepção arquitetônica ao último detalhe da marcenaria, um método integrado.',
        hint: "Aparece em italic abaixo do título 'Cada etapa pensada...'",
      },
      {
        key: 'imagem_ana',
        label: 'Foto editorial (seção Serviços)',
        type: 'image',
        hint: 'Foto vertical ao lado dos cards. Recomendado: 800×1000.',
        imageBucket: 'site-images',
      },
    ],
  },
];

// =========================================================
// FOOTER — dados de contato e identidade
// Editado em /admin/footer (lista separada)
// =========================================================
export const FOOTER_FIELDS: ContentField[] = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    type: 'text',
    placeholder: '5555999942637',
    hint: 'Apenas números, com código do país e DDD. Ex: 5555999942637',
  },
  {
    key: 'email',
    label: 'Email comercial',
    type: 'text',
    placeholder: 'analauramcb@hotmail.com',
  },
  {
    key: 'instagram',
    label: 'URL do Instagram',
    type: 'url',
    placeholder: 'https://instagram.com/im.analaura',
    hint: 'URL completa começando com https://',
  },
  {
    key: 'cidade',
    label: 'Cidade e estado',
    type: 'text',
    placeholder: 'Horizontina - RS',
  },
  {
    key: 'crea',
    label: 'Número do CREA',
    type: 'text',
    placeholder: 'CREA-RS 222362.2305',
  },
];
