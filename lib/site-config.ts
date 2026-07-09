/**
 * Configuração central de conteúdo do site Ana Laura Noronha.
 * Tudo o que é texto/contato/serviço/etapa fica AQUI — não duplicar nos componentes.
 */

export const siteConfig = {
  name: 'Ana Laura Noronha',
  tagline: 'Engenharia e Interiores',
  url: 'https://siteananoronha.vercel.app',

  contact: {
    phone: '(55) 9 9994-2637',
    phoneRaw: '5555999942637',
    email: 'analauramcb@hotmail.com',
    instagram: '@im.analaura',
    instagramUrl: 'https://instagram.com/im.analaura',
    address: {
      street: 'Rua Santa Cruz, 376',
      complement: '',
      city: 'Horizontina - RS'
    },
    crea: 'CREA-RS 222362.2305'
  },

  hero: {
    main: ['Projetos de engenharia e', 'interiores completos,', 'pensados para que cada', 'detalhe faça sentido.'],
    sub: ['Arquitetura e', 'engenharia sob uma', 'nova luz.'],
    cta: 'Solicitar Orçamento'
  },

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Filosofia', href: '#filosofia' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Orçamentos', href: '#contato' }
  ],

  philosophy: {
    titleMain: ['Projetos não', 'fracassam por', 'falta de', 'criatividade.'],
    titleSub: ['Fracassam por', 'falta de método.'],
    manifesto: [
      { text: 'Referências soltas.', weight: 'normal' as const, color: 'dark' as const },
      { text: 'Decisões sem critério.', weight: 'italic' as const, color: 'light' as const },
      {
        text: 'Dúvidas que crescem conforme o projeto avança.',
        weight: 'bold' as const,
        color: 'dark' as const
      },
      {
        text: 'Quando tudo é integrado desde o início — do layout aos acabamentos',
        weight: 'italic' as const,
        color: 'light' as const
      },
      { text: '— O resultado', weight: 'black' as const, color: 'dark' as const, block: true },
      { text: 'reflete exatamente o que foi pensado. Aqui,', weight: 'bold' as const, color: 'dark' as const },
      { text: 'cada etapa é orientada.', weight: 'black' as const, color: 'dark' as const },
      {
        text: 'Cada escolha faz sentido. Cada detalhe conversa com o outro.',
        weight: 'italic' as const,
        color: 'light' as const,
        block: true
      },
      {
        text: 'Porque engenharia e móveis sob medida não podem rodar no improviso.',
        weight: 'italic' as const,
        color: 'dark' as const
      }
    ]
  },

  pillars: [
    {
      title: ['Projeto', 'Arquitetônico'],
      desc: 'Concept, planta base, visualização 3D.',
      icon: 'triangle'
    },
    {
      title: ['Design de', 'Interiores'],
      desc: 'Moodboard, acabamentos, mobiliário.',
      icon: 'palette'
    },
    {
      title: ['Consultoria', 'Técnica'],
      desc: 'Aprovações, engenharia de estruturas.',
      icon: 'document'
    },
    {
      title: ['Gestão de', 'Obra'],
      desc: 'Cronogramas, fiscalização e entrega.',
      icon: 'grid'
    }
  ],

  steps: [
    { n: 1, title: 'Reunião de Briefing', desc: 'Entendemos a fundo suas necessidades e a essência do seu espaço.', barColor: '#A9BCC6' },
    { n: 2, title: 'Proposta e Cronograma', desc: 'Alinhamento de escopo, prazos e direcionamento inicial.', barColor: '#C1CCD1' },
    { n: 3, title: 'Levantamento Técnico', desc: 'Medição detalhada para garantir total precisão e evitar retrabalho.', barColor: '#8A9A86' },
    { n: 4, title: 'Estudo Preliminar', desc: 'Primeira leitura do projeto em 3D, validando o layout principal.', barColor: '#5C7A8C' },
    { n: 5, title: 'Revisão de Projeto', desc: 'Ajustes a partir da apresentação inicial, refinando escolhas.', barColor: '#D4A373' },
    { n: 6, title: 'Consolidação Final', desc: 'Garantia de que tudo esteja alinhado antes da etapa técnica.', barColor: '#A9BCC6' },
    { n: 7, title: 'Projeto Executivo', desc: 'Documentação técnica para a execução de móveis sob medida e obras.', barColor: '#966A4B' },
    { n: 8, title: 'Entrega Digital', desc: 'Acesso ao manual do cliente e detalhamentos técnicos em um drive.', barColor: '#5C7A8C' }
  ],

  services: [
    {
      title: ['Projeto', 'Arquitetônico'],
      desc: 'Concepção e detalhamento de estruturas que unem funcionalidade, estética e sustentabilidade, criando espaços que refletem sua identidade com precisão técnica e autoral. O ponto de partida para o seu sonho.',
      icon: 'triangle'
    },
    {
      title: ['Design de', 'Interiores'],
      desc: 'Curadoria especializada de mobiliário, texturas, iluminação e arte para transformar ambientes em refúgios de conforto e elegância, focando no seu bem-estar e sofisticação.',
      icon: 'palette'
    },
    {
      title: ['Design de', 'Interiores'],
      desc: 'Execução de projetos residenciais e corporativos de alto padrão, harmonizando cada detalhe para uma experiência espacial única e atemporal. Da planta ao toque final.',
      icon: 'sofa'
    },
    {
      title: ['Consultoria', 'Técnica'],
      desc: 'Análise estratégica e técnica de espaços e materiais, garantindo soluções otimizadas, precisão em metragens e viabilidade para cada etapa do seu projeto, com foco em segurança e economia.',
      icon: 'grid'
    },
    {
      title: ['Consultoria', 'Técnica'],
      desc: 'Avaliação detalhada de normas, sistemas construtivos e integração de sistemas (como automação), oferecendo suporte para escolhas inteligentes e preventivas durante todo o processo.',
      icon: 'grid'
    },
    {
      title: ['Gestão', 'de Obra'],
      desc: 'Acompanhamento rigoroso de cronogramas, fornecedores e orçamentos, assegurando a fidelidade ao projeto original e minimizando imprevistos para uma entrega impecável, sem estresse para você.',
      icon: 'compass'
    }
  ],

  faqs: [
    {
      q: 'Quanto tempo leva para desenvolver um projeto?',
      a: 'O prazo varia de acordo com o escopo, mas, em média, o desenvolvimento completo leva a partir de 3 meses, considerando todas as etapas até o projeto executivo.'
    },
    {
      q: 'O projeto já vem pronto para execução?',
      a: 'Sim, o projeto executivo é entregue com todos os detalhamentos necessários para a equipe de obra seguir sem dúvidas — plantas, detalhamentos, especificações de materiais e cronograma.'
    },
    {
      q: 'Atendem apenas presencial ou também online?',
      a: 'Atendemos presencialmente em Horizontina, RS, e também possuímos metodologia exclusiva para projetos 100% online — com reuniões por vídeo, levantamento remoto orientado e entregas digitais.'
    },
    {
      q: 'Como funciona a primeira reunião de briefing?',
      a: 'A reunião de briefing é uma conversa estruturada (presencial ou por vídeo) onde entendo a fundo o seu estilo de vida, suas referências, prioridades e investimento previsto. É a base de tudo — sem briefing claro, não existe projeto bem conduzido.'
    },
    {
      q: 'O que está incluso no projeto executivo?',
      a: 'Plantas arquitetônicas, paginação de pisos e forro, projeto elétrico e hidráulico orientado, layouts de marcenaria sob medida com detalhamento técnico, especificação de acabamentos, mobiliário, iluminação e cronograma físico-financeiro.'
    },
    {
      q: 'Vocês acompanham a obra ou só entregam o projeto?',
      a: 'Trabalhamos com pacote opcional de Gestão de Obra: acompanhamento rigoroso de cronograma, fornecedores e fiscalização técnica. Isso garante que o que foi projetado seja exatamente o que será executado.'
    },
    {
      q: 'É possível alterar o projeto durante o desenvolvimento?',
      a: 'Sim. Cada projeto inclui rodadas formais de revisão (etapa 5 do processo). Alterações estruturais após a etapa de Consolidação Final podem implicar em ajustes de prazo e custo, sempre alinhados antes.'
    },
    {
      q: 'Vocês indicam fornecedores e marceneiros?',
      a: 'Indicamos uma rede curada de fornecedores e marceneiros parceiros, todos previamente testados em obra. Você também pode trabalhar com fornecedores próprios — o projeto é entregue em padrão técnico compreensível por qualquer profissional qualificado.'
    },
    {
      q: 'Qual a faixa de investimento para um projeto?',
      a: 'O investimento depende do escopo (projeto arquitetônico, interiores, executivo, gestão de obra) e da metragem. Após o briefing inicial, enviamos uma proposta personalizada com escopo detalhado e parcelas alinhadas com seu cronograma.'
    },
    {
      q: 'Em quanto tempo recebo o orçamento?',
      a: 'O orçamento personalizado é enviado em até 5 dias úteis após o briefing inicial. Para responder mais rápido, descreva no formulário a metragem do espaço, tipo de projeto desejado e prazo ideal.'
    }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
