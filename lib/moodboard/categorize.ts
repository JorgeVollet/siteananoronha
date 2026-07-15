import Anthropic from '@anthropic-ai/sdk';
import type { ImageCategory } from './types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export type CategoryResult = {
  category: ImageCategory;
  should_isolate: boolean;
  descriptor: string;
  mood_keyword: string;
  dominant_colors: string[];
  confidence: number;
};

/**
 * Analisa imagem via Claude Vision e retorna:
 * - category: tipo (móvel, textura, ambiente, etc.)
 * - should_isolate: true SÓ pra objetos com fundo limpo (produto isolado).
 *   false pra qualquer foto com contexto (ambiente, cena) — evita recortar
 *   pedaços importantes tipo "sobrou só o vaso, cortou a mesa"
 * - descriptor: legenda curta em pt-BR
 * - mood_keyword: 1-2 palavras autorais pra virar anotação à mão no moodboard
 * - dominant_colors: até 3 cores em hex
 * - confidence: 0-1
 */
export async function categorizeImage(
  imageUrl: string,
): Promise<CategoryResult> {
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 400,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'url', url: imageUrl },
            },
            {
              type: 'text',
              text: `Você é um curador visual analisando uma imagem de referência de design de interiores para compor um moodboard editorial.

Retorne APENAS um JSON estrito, sem texto adicional, no formato:
{
  "category": "furniture" | "texture" | "color" | "art" | "architecture" | "ambient",
  "should_isolate": boolean,
  "descriptor": "string curta (3-5 palavras em português)",
  "mood_keyword": "1-2 palavras autorais em português",
  "dominant_colors": ["#RRGGBB", "#RRGGBB", "#RRGGBB"],
  "confidence": 0.0 a 1.0
}

Categorias:
- furniture: móveis específicos (cadeira, sofá, poltrona, mesa, luminária, banheira)
- texture: texturas, pisos, tecidos, revestimentos, papéis
- color: amostras puras de cor, tintas, superfícies coloridas sem objeto
- art: obras de arte, quadros, esculturas, cerâmica isolada
- architecture: plantas, projetos, fachadas, elementos arquitetônicos
- ambient: fotos de ambiente completo, cena de decoração, cômodo montado

should_isolate — REGRA CRÍTICA:
- true APENAS quando o objeto está isolado contra fundo NEUTRO/LIMPO (foto de e-commerce, catálogo, estúdio branco/cinza uniforme)
- false para QUALQUER foto com contexto visual (ambiente, cena, foto com sombra natural, objeto numa mesa/prateleira/parede real, etc.)
- Se em dúvida, false. Recortar contexto errado destrói a referência.

mood_keyword: palavra evocativa que resume a sensação da imagem. Exemplos:
"aconchego", "luz suave", "materialidade", "vazio pensado", "linhas puras",
"artesanal", "vintage discreto", "brutal e macio", "cor terra", "acalento"

dominant_colors: 3 cores em hex #RRGGBB extraídas visualmente. Foque em cores
predominantes que definem o clima (não cores acessórias). Ordem: mais dominante primeiro.`,
            },
          ],
        },
      ],
    });

    const text =
      response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const parsed = JSON.parse(jsonMatch[0]) as CategoryResult;

    // Sanitiza dominant_colors (garante hex válidos)
    parsed.dominant_colors = (parsed.dominant_colors || [])
      .filter((c) => typeof c === 'string' && /^#[0-9a-fA-F]{6}$/.test(c))
      .slice(0, 3);
    if (parsed.dominant_colors.length === 0) {
      parsed.dominant_colors = ['#c19366'];
    }

    // Defaults defensivos
    parsed.mood_keyword = parsed.mood_keyword || 'referência';
    parsed.descriptor = parsed.descriptor || 'inspiração visual';
    parsed.should_isolate = parsed.should_isolate ?? false;
    parsed.confidence =
      typeof parsed.confidence === 'number' ? parsed.confidence : 0.7;

    return parsed;
  } catch (error) {
    console.error('[moodboard/categorize] fallback:', error);
    return {
      category: 'other' as ImageCategory,
      should_isolate: false,
      descriptor: 'referência visual',
      mood_keyword: 'inspiração',
      dominant_colors: ['#c19366'],
      confidence: 0.3,
    };
  }
}
