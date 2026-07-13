// Conteúdo das 6 páginas /sketch/[slug]
// Cada slug corresponde a um post-it do mural na seção "Sketch de Ideias"
// Textos escritos na voz da Ana — empáticos, primeira pessoa quando é opinião
// legítima, sem casos fabricados. Regra 1 do Guia Editorial aplicada.

export type SketchStep = {
  slug: string;
  step: string; // "01", "02"...
  postItLabel: string; // como aparece no post-it
  postItSubLabel: string; // subtítulo do post-it
  eyebrow: string; // "Você sabia..." ou "A melhor forma de..."
  title: string; // headline manuscrita
  intro: string; // parágrafo de abertura empático
  body: string[]; // parágrafos do desenvolvimento
  quote: string; // aspa/blockquote curto
  ctaLabel: string; // texto do botão CTA
  ctaMessage: string; // mensagem WhatsApp
};

export const SKETCH_STEPS: SketchStep[] = [
  {
    slug: 'briefing',
    step: '01',
    postItLabel: 'Briefing',
    postItSubLabel: 'Alinhamento inicial',
    eyebrow: 'Você sabia...',
    title: 'que quase todo projeto que dá errado começa sem uma conversa honesta?',
    intro:
      'Se você já tentou reformar ou começar um projeto e sentiu que "não sabia nem por onde começar", saiba que essa sensação é o começo mais comum de qualquer obra — e também o momento mais decisivo.',
    body: [
      'Existe uma etapa antes do desenho, antes do orçamento, antes de qualquer decisão estética: é a conversa em que a gente senta junto e desenha suas vontades, seus receios, suas rotinas e o seu orçamento real. Sem essa etapa, o resto vira palpite disfarçado de projeto.',
      'Eu chamo essa etapa de Briefing porque tem nome técnico, mas na prática é o momento em que você fala mais e eu escuto mais. Você conta o que te incomoda hoje. Descreve como quer se sentir na casa nova. Aponta os detalhes que te tiram do sério em outros lugares. E é a partir daí — do que você vive de verdade — que o projeto começa a existir.',
      'Se você chegou aqui pensando "eu quero mudar minha casa mas não sei nem explicar direito o que quero" — está no lugar certo. Meu papel na primeira conversa é te ajudar a organizar essas ideias, não já jogar solução na sua mesa.',
    ],
    quote:
      'Um bom projeto não começa com resposta pronta. Começa com pergunta bem feita.',
    ctaLabel: 'Marcar uma primeira conversa',
    ctaMessage:
      'Olá Ana, gostaria de conversar sobre um projeto que estou começando a pensar.',
  },
  {
    slug: 'moodboard',
    step: '02',
    postItLabel: 'Moodboard',
    postItSubLabel: 'Referências visuais',
    eyebrow: 'A melhor forma...',
    title: 'de fugir do "não sei explicar o que quero" é olhar imagens juntos.',
    intro:
      'Palavra escrita é traiçoeira em projeto. "Aconchegante" pra você pode ser bem diferente do "aconchegante" na minha cabeça. É por isso que a segunda etapa nunca é decisão — é curadoria de referências.',
    body: [
      'O moodboard é um painel de imagens que costuro com você antes de qualquer traço. A gente olha juntos: essa parede te agrada? Essa iluminação faz sentido? Essa cadeira tem a ver com o que você vive?',
      'Nesse momento você não precisa ter opinião fechada. Precisa ter reações. O que te chamou atenção? O que te incomodou? O que passou batido? Cada reação é um dado — e junta tudo vira uma direção estética honesta, sua, sem fórmula.',
      'Se você é do tipo que salva prints no Pinterest e depois não sabe o que fazer com eles, esse é o momento em que a gente traduz essas referências soltas em decisão de projeto. Nada se perde. Tudo vira ponto de partida.',
    ],
    quote:
      'Não existe "gosto ruim" em projeto. Existe gosto ainda não organizado.',
    ctaLabel: 'Começar meu moodboard',
    ctaMessage:
      'Olá Ana, gostaria de começar um moodboard para meu projeto — tenho algumas referências, mas preciso organizar as ideias.',
  },
  {
    slug: 'materiais',
    step: '03',
    postItLabel: 'Materiais',
    postItSubLabel: 'Escolha técnica',
    eyebrow: 'Você sabia...',
    title:
      'que o material errado custa 3× mais em manutenção do que a economia inicial?',
    intro:
      'Uma das perguntas que mais escuto é "esse material aqui é bom?" — e a resposta honesta é: depende de onde ele vai, quem vai usar, e quanto tempo você planeja morar aí.',
    body: [
      'Escolher revestimento, piso, bancada, marcenaria — cada decisão dessas tem consequência de 10, 15, 20 anos. Um piso bonito na loja pode virar problema de umidade em 2 anos. Um mármore claro pode parecer sofisticado e virar mancha permanente na primeira taça de vinho. Uma marcenaria com ferragem barata dá defeito antes do quarto aniversário da reforma.',
      'Na minha visão, a escolha de material não é gosto — é engenharia aplicada ao dia a dia. Eu penso em como você usa cada ambiente, quantas pessoas convivem, se tem criança, se tem animal, quanta luz natural entra, se limpeza é prioridade ou não. Aí sim eu proponho os materiais.',
      'E aqui vai um princípio: material que se cuida sozinho vale mais que material caro que exige atenção constante. Sofisticação real é aquela que envelhece com dignidade.',
    ],
    quote:
      'O material certo é o que ainda vai estar bonito quando você esquecer que ele existe.',
    ctaLabel: 'Conversar sobre materiais',
    ctaMessage:
      'Olá Ana, tenho dúvida sobre escolha de materiais para meu projeto — gostaria de conversar.',
  },
  {
    slug: 'layout',
    step: '04',
    postItLabel: 'Layout',
    postItSubLabel: 'Setorização de ambientes',
    eyebrow: 'A melhor forma...',
    title:
      'de pensar num layout começa escutando o que a família faz de verdade.',
    intro:
      'Se você está começando a desenhar sua planta mentalmente, provavelmente já pegou lápis, papel e desenhou uma versão dela. E provavelmente descobriu que "não fecha".',
    body: [
      'Layout não é sobre encaixar cômodos no papel. É sobre entender como você vive. Você cozinha todo dia ou pede delivery? Recebe visita com frequência? Trabalha em casa? Tem hobby que precisa de espaço próprio? Cada resposta muda a planta inteira.',
      'Um erro comum é copiar layout do Pinterest sem considerar a metragem, o formato do terreno, a orientação solar, a estrutura do imóvel. Aí a "sala espaçosa" da referência vira sala apertada com sofá que não cabe. O "quarto integrado" vira quarto barulhento que ninguém dorme.',
      'Minha abordagem é sempre setorização primeiro, decoração depois. Primeiro definimos onde cada função da casa vive — descanso, convívio, trabalho, refeição, guarda. Só depois disso a gente escolhe estética. Assim a beleza serve o funcionamento, não o contrário.',
    ],
    quote:
      'Casa não é papel de parede em cima de planta. É planta bem feita que aceita qualquer papel de parede.',
    ctaLabel: 'Discutir o layout ideal',
    ctaMessage:
      'Olá Ana, preciso repensar o layout do meu imóvel e gostaria de conversar.',
  },
  {
    slug: 'medidas',
    step: '05',
    postItLabel: 'Medidas',
    postItSubLabel: 'Guia de medidas práticas',
    eyebrow: 'Você sabia...',
    title:
      'que existem medidas padrão para cada tipo de uso — conforme a ergonomia correta?',
    intro:
      'Se você já se sentiu desconfortável em um ambiente sem saber explicar o motivo — bancada muito baixa, corredor muito estreito, mesa que não cabe cadeira embaixo — provavelmente foi uma questão de medida, não de decoração.',
    body: [
      'Existem medidas técnicas que a arquitetura usa há décadas — não são regras rígidas, são referências de ergonomia que fazem o corpo humano se sentir bem no espaço. Altura de bancada de cozinha, largura de circulação, profundidade de degrau, distância entre TV e sofá, altura de tomada, altura de espelho. Cada uma dessas medidas tem um "ponto ideal" testado em milhares de projetos.',
      'Na minha visão, projeto bem feito é aquele em que você não pensa nas medidas — porque tudo simplesmente funciona. Bancada na altura certa para cozinhar sem doer as costas. Corredor largo o suficiente para passar com sacola sem raspar na parede. Iluminação na altura certa para o rosto ficar bem no espelho.',
      'A ergonomia não é luxo. É o que separa um espaço que serve o corpo de um espaço que exige o corpo. Se você está pensando num projeto — pequeno ou grande, reforma ou construção — vale conversar sobre as medidas antes de pensar em estética. A estética entra depois. As medidas entram primeiro.',
    ],
    quote:
      'Boas medidas não se veem — se sentem. Todo dia, sem esforço.',
    ctaLabel: 'Conversar sobre medidas ideais',
    ctaMessage:
      'Olá Ana, gostaria de conversar sobre medidas ergonômicas para meu projeto.',
  },
  {
    slug: 'orcamento',
    step: '06',
    postItLabel: 'Orçamento',
    postItSubLabel: 'Viabilidade + planejamento',
    eyebrow: 'A melhor forma...',
    title:
      'de evitar surpresas é fazer uma pré-análise de viabilidade — com profissional do seu lado.',
    intro:
      'Se você já ouviu histórias de obra que "estourou o orçamento" (todo mundo já ouviu), saiba que o problema quase nunca está durante a obra. Está antes dela começar — na ausência de planejamento sério.',
    body: [
      'Uma pré-análise de viabilidade honesta considera tudo: metragem real, estrutura do imóvel, materiais que fazem sentido para o uso, mão de obra qualificada da região, prazos coerentes, imprevistos previsíveis, aditivos possíveis. Ela responde a pergunta que importa: "Esse projeto cabe na minha realidade — de dinheiro, de tempo e de expectativa?"',
      'E aqui está o ponto mais importante: essa análise precisa vir junto do planejamento e do gerenciamento da obra. Não adianta ter um orçamento inicial bem-feito se ninguém acompanha a execução, controla cronograma, valida etapas com o fornecedor, ajusta rumos quando algo muda. O planejamento é o que faz o orçamento se cumprir.',
      'Meu jeito de trabalhar é integrar essas três coisas — viabilidade, planejamento e gestão — na mesma mão. Você conversa com uma pessoa, não com cinco. Cada decisão passa por quem vai executar. E cada surpresa vira ajuste, não crise. Porque o profissional certo, no lugar certo, faz toda a diferença entre um projeto que se cumpre e um projeto que vira dor de cabeça.',
    ],
    quote: 'O profissional certo faz toda a diferença.',
    ctaLabel: 'Solicitar análise de viabilidade',
    ctaMessage:
      'Olá Ana, gostaria de fazer uma análise de viabilidade e orçamento inicial — com planejamento e gerenciamento da obra.',
  },
];

export function getSketchStep(slug: string): SketchStep | undefined {
  return SKETCH_STEPS.find((s) => s.slug === slug);
}

export function getSketchStepSlugs(): string[] {
  return SKETCH_STEPS.map((s) => s.slug);
}
