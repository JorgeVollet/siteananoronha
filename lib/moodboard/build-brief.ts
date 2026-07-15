import Anthropic from '@anthropic-ai/sdk';
import type { CategorizedImage } from './types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

/**
 * Tipos de ambiente que o Gemini sabe renderizar bem no estilo Casa Vogue.
 * Se a pessoa não escolher, o Claude Sonnet infere a partir das fotos.
 */
export type RoomType =
  | 'living-room'
  | 'kitchen'
  | 'bedroom'
  | 'bathroom'
  | 'home-office'
  | 'dining-room'
  | 'entryway'
  | 'closet'
  | 'outdoor-area'
  | 'spa-wellness'
  | 'generic-interior';

export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  'living-room': 'Sala de estar',
  'kitchen': 'Cozinha',
  'bedroom': 'Quarto',
  'bathroom': 'Banheiro',
  'home-office': 'Home office',
  'dining-room': 'Sala de jantar',
  'entryway': 'Entrada / Hall',
  'closet': 'Closet',
  'outdoor-area': 'Área externa / Varanda',
  'spa-wellness': 'Spa / Área de bem-estar',
  'generic-interior': 'Ambiente genérico',
};

export type BriefResult = {
  brief: string;
  roomType: RoomType;
};

/**
 * Consolida os descritores das N imagens em:
 * 1. Um "briefing" curatorial de 2-3 frases (mood do projeto)
 * 2. Um roomType inferido pelo conjunto (pra guiar o fundo do Gemini)
 *
 * Se roomTypeOverride vier preenchido (usuário escolheu no dropdown),
 * pula a inferência e usa direto.
 */
export async function buildBrief(
  images: CategorizedImage[],
  roomTypeOverride?: RoomType,
): Promise<BriefResult> {
  const descriptorLines = images
    .map(
      (img, i) =>
        `${i + 1}. [${img.category}] ${img.descriptor} — mood: ${img.mood_keyword}`,
    )
    .join('\n');

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Você é um diretor de arte de uma revista de decoração (tipo Casa Vogue Brasil).

Um cliente enviou ${images.length} imagens de referência para um projeto de arquitetura de interiores. Analise o CONJUNTO das referências e responda com um JSON estrito:

{
  "brief": "briefing curatorial em INGLÊS, 2-3 frases capturando o mood atmosférico, materiais, paleta e sensação alvo (ex: 'quiet luxury', 'artisanal warmth'). NÃO citar objetos individuais. Estilo sofisticado, poético, curatorial.",
  "roomType": "um destes valores exatos: living-room | kitchen | bedroom | bathroom | home-office | dining-room | entryway | closet | outdoor-area | spa-wellness | generic-interior"
}

Como decidir o roomType:
- Se as fotos mostram claramente objetos de um cômodo específico (geladeira/fogão/panelas → kitchen; banheira/pia → bathroom; cama/travesseiro → bedroom; sofá/TV → living-room), escolha esse cômodo
- Se são objetos genéricos (só amostras de textura, cores, luminárias soltas), tente inferir pelo mood/estilo — mas se ambíguo, use "generic-interior"
- Sempre em minúsculas, exato como listado

Descritores da sessão:
${descriptorLines}

Responda APENAS com o JSON, sem explicação nem texto adicional.`,
        },
      ],
    });

    const text =
      response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const parsed = JSON.parse(jsonMatch[0]) as BriefResult;
    return {
      brief: parsed.brief || defaultBrief(),
      roomType: roomTypeOverride || parsed.roomType || 'generic-interior',
    };
  } catch (err) {
    console.error('[moodboard/build-brief] fallback:', err);
    return {
      brief: defaultBrief(),
      roomType: roomTypeOverride || 'generic-interior',
    };
  }
}

function defaultBrief(): string {
  return (
    'A refined interior design mood featuring warm earth tones, ' +
    'natural materials and quiet sophistication. Textures of raw wood, ' +
    'linen and stone in muted terracotta and off-white palette. ' +
    'Atmosphere of artisanal warmth and contemplative luxury.'
  );
}
