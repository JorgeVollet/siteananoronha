import type { CategorizedImage } from './types';

/**
 * Estratégia v3 (Vision Board Denso):
 *
 * Escolhemos até 5 imagens representativas em ordem de prioridade que
 * ajuda o Gemini a "montar mentalmente" um moodboard rico:
 *   1º ambient/architecture (guia o FUNDO fotorrealista)
 *   2º texture/color        (guia os swatches rasgados)
 *   3º furniture            (guia as polaroids de móveis)
 *   4º art                  (guia polaroids de detalhes/obras)
 *   5º qualquer resto (por confidence)
 *
 * Gemini 2.5 Flash Image aceita múltiplas refs. Mais contexto = mais
 * material pra extrapolar variações criativas.
 */

const PREFERRED_ORDER = [
  ['ambient', 'architecture'],
  ['texture', 'color'],
  ['furniture'],
  ['art'],
];

export function pickReferenceImages(
  images: CategorizedImage[],
  maxCount = 5,
): CategorizedImage[] {
  const picked: CategorizedImage[] = [];
  const used = new Set<string>();

  // 1ª passada: uma imagem por grupo preferido (maior confidence)
  for (const group of PREFERRED_ORDER) {
    if (picked.length >= maxCount) break;
    const candidate = images
      .filter((img) => !used.has(img.id) && group.includes(img.category))
      .sort((a, b) => b.confidence - a.confidence)[0];
    if (candidate) {
      picked.push(candidate);
      used.add(candidate.id);
    }
  }

  // 2ª passada: se ainda faltam slots, pega uma SEGUNDA de cada grupo
  // (dá mais material pra Gemini extrapolar em cada eixo)
  for (const group of PREFERRED_ORDER) {
    if (picked.length >= maxCount) break;
    const candidate = images
      .filter((img) => !used.has(img.id) && group.includes(img.category))
      .sort((a, b) => b.confidence - a.confidence)[0];
    if (candidate) {
      picked.push(candidate);
      used.add(candidate.id);
    }
  }

  // 3ª passada: qualquer sobra por confidence
  const rest = images
    .filter((img) => !used.has(img.id))
    .sort((a, b) => b.confidence - a.confidence);

  while (picked.length < maxCount && rest.length > 0) {
    const next = rest.shift()!;
    picked.push(next);
    used.add(next.id);
  }

  return picked;
}
