/**
 * Gera imagem via Gemini 2.5 Flash Image (REST direto, sem SDK).
 *
 * Modelo: gemini-2.5-flash-image
 * Custo: ~$0.039 por imagem
 * Latência: ~5-10s
 *
 * Env: GOOGLE_AI_API_KEY (https://aistudio.google.com/apikey)
 */

const GEMINI_MODEL = 'gemini-2.5-flash-image';
const GEMINI_ENDPOINT =
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export type ReferenceImage = {
  base64: string;
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp';
};

export type GeminiResult = {
  buffer: Buffer;
  mimeType: string;
};

export async function generateMoodboardWithGemini(
  prompt: string,
  references: ReferenceImage[],
): Promise<GeminiResult> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error(
      '[moodboard/gemini] GOOGLE_AI_API_KEY não configurada. Adicione em .env.local.',
    );
  }

  // Constrói parts: prompt de texto + N imagens de referência inline
  const parts: any[] = [{ text: prompt }];
  for (const ref of references) {
    parts.push({
      inline_data: {
        mime_type: ref.mimeType,
        data: ref.base64,
      },
    });
  }

  const body = {
    contents: [{ role: 'user', parts }],
    generationConfig: {
      responseModalities: ['Image'],
      // Um único candidato — mais rápido/barato
      candidateCount: 1,
      temperature: 0.9,
      // Força aspect ratio 16:9. Gemini IGNORA o prompt de texto pra aspect
      // ratio — só respeita se passar em imageConfig aqui.
      imageConfig: {
        aspectRatio: '16:9',
      },
    },
  };

  const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(
      `[moodboard/gemini] HTTP ${res.status}: ${errText.slice(0, 300)}`,
    );
  }

  const json = await res.json();

  // Extrai a primeira parte com inline_data (a imagem)
  const candidates = json?.candidates || [];
  for (const c of candidates) {
    const cParts = c?.content?.parts || [];
    for (const p of cParts) {
      const inline = p.inline_data || p.inlineData;
      if (inline?.data) {
        const mimeType = inline.mime_type || inline.mimeType || 'image/png';
        return {
          buffer: Buffer.from(inline.data, 'base64'),
          mimeType,
        };
      }
    }
  }

  throw new Error(
    '[moodboard/gemini] resposta sem imagem — provavelmente bloqueio de safety filter. ' +
      `Response: ${JSON.stringify(json).slice(0, 500)}`,
  );
}
