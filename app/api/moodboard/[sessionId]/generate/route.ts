import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { createMoodboardAdminClient } from '@/lib/moodboard/supabase-admin';
import { categorizeImage } from '@/lib/moodboard/categorize';
import { buildBrief, type RoomType } from '@/lib/moodboard/build-brief';
import { pickReferenceImages } from '@/lib/moodboard/pick-references';
import { buildGeminiPrompt } from '@/lib/moodboard/build-prompt';
import {
  generateMoodboardWithGemini,
  type ReferenceImage,
} from '@/lib/moodboard/gemini-generate';
import {
  getGenerateRateLimit,
  getClientIp,
} from '@/lib/moodboard/rate-limit';
import type { CategorizedImage } from '@/lib/moodboard/types';

export const maxDuration = 60; // Vercel Pro necessário para >10s
export const runtime = 'nodejs';

/**
 * Pipeline v3 — Moodboard Generativo (Casa Vogue Brasil vibe)
 *
 * Fluxo:
 * 1. Categoriza cada foto com Claude Vision (mood, cores, categoria)
 * 2. Consolida os descritores em briefing curatorial (Claude Sonnet)
 * 3. Escolhe até 3 fotos representativas + baixa+converte pra JPEG
 * 4. Monta prompt em 3 camadas (identidade + estrutura + sessão)
 * 5. Envia pro Gemini 2.5 Flash Image
 * 6. Salva PNG no Supabase Storage
 */

// Prepara uma imagem remota como referência pro Gemini (JPEG base64, max 1200px)
async function fetchAsGeminiReference(url: string): Promise<ReferenceImage> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch reference failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const jpg = await sharp(buf)
    .rotate()
    .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return {
    base64: jpg.toString('base64'),
    mimeType: 'image/jpeg',
  };
}

// Agrega paleta simples: concatena dominant_colors únicos, ordena por luminosidade
function aggregatePalette(images: CategorizedImage[]): string[] {
  const all = images
    .flatMap((img) => img.dominant_colors || [])
    .map((c) => c.toLowerCase());

  const unique: string[] = [];
  for (const c of all) {
    if (!/^#[0-9a-f]{6}$/i.test(c)) continue;
    if (!unique.includes(c)) unique.push(c);
  }

  const fallback = ['#f5f0e9', '#eee5da', '#c19366', '#9a744d', '#171411'];
  for (const f of fallback) {
    if (unique.length >= 5) break;
    if (!unique.includes(f)) unique.push(f);
  }
  return unique.slice(0, 5);
}

function pickMoodWords(images: CategorizedImage[]): string[] {
  const words = Array.from(
    new Set(images.map((i) => (i.mood_keyword || '').trim()).filter(Boolean)),
  );
  const defaults = ['aconchego', 'materialidade', 'luz suave'];
  for (const d of defaults) {
    if (words.length >= 3) break;
    if (!words.includes(d)) words.push(d);
  }
  return words.slice(0, 3);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { sessionId: string } },
) {
  const ip = getClientIp(req);
  const rl = getGenerateRateLimit();
  if (rl) {
    const { success } = await rl.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
    }
  }

  // roomType opcional do body — se veio, força esse cômodo; senão IA infere
  let roomTypeOverride: RoomType | undefined;
  try {
    const body = await req.json();
    if (body?.roomType && typeof body.roomType === 'string') {
      roomTypeOverride = body.roomType as RoomType;
    }
  } catch {
    // body vazio, tudo bem
  }

  const supabase = createMoodboardAdminClient();

  const { data: images } = await supabase
    .from('moodboard_images')
    .select('*')
    .eq('session_id', params.sessionId);

  if (!images || images.length < 3) {
    return NextResponse.json(
      { error: 'not_enough_images', message: 'Envie pelo menos 3 imagens.' },
      { status: 400 },
    );
  }

  await supabase
    .from('moodboard_sessions')
    .update({ status: 'processing' })
    .eq('id', params.sessionId);

  try {
    // 1. Categoriza em paralelo (Claude Vision)
    const categorized = await Promise.all(
      images.map(async (img) => {
        const cat = await categorizeImage(img.processed_url || img.original_url);
        await supabase
          .from('moodboard_images')
          .update({
            category: cat.category,
            descriptor: cat.descriptor,
            confidence: cat.confidence,
            mood_keyword: cat.mood_keyword,
            dominant_colors: cat.dominant_colors,
            should_isolate: cat.should_isolate,
          })
          .eq('id', img.id);
        return { ...img, ...cat };
      }),
    );

    // 2. Consolida briefing curatorial + infere roomType (ou usa override)
    const { brief, roomType } = await buildBrief(
      categorized as CategorizedImage[],
      roomTypeOverride,
    );

    // 3. Escolhe até 5 fotos representativas + baixa em paralelo
    // (Gemini aceita mais refs; mais contexto = mais extrapolação criativa)
    const refImages = pickReferenceImages(
      categorized as CategorizedImage[],
      5,
    );
    const references = await Promise.all(
      refImages.map((img) =>
        fetchAsGeminiReference(img.original_url).catch((e) => {
          console.warn('[moodboard/generate] ref fetch failed:', e);
          return null;
        }),
      ),
    );
    const validRefs = references.filter((r): r is ReferenceImage => r !== null);

    if (validRefs.length === 0) {
      throw new Error('no valid reference images could be downloaded');
    }

    // 4. Agrega paleta + mood words
    const palette = aggregatePalette(categorized as CategorizedImage[]);
    const moodWords = pickMoodWords(categorized as CategorizedImage[]);

    // 5. Monta prompt final (3 camadas + roomType dinâmico)
    const prompt = buildGeminiPrompt({
      brief,
      roomType,
      moodWords,
      palette,
      categorized: categorized as CategorizedImage[],
      referenceCount: validRefs.length,
    });

    console.log('[moodboard/generate] roomType:', roomType, roomTypeOverride ? '(user override)' : '(IA inferred)');
    console.log('[moodboard/generate] briefing:', brief);
    console.log('[moodboard/generate] moodWords:', moodWords);
    console.log('[moodboard/generate] palette:', palette);
    console.log('[moodboard/generate] refs:', validRefs.length);

    // 6. Chama Gemini
    const generated = await generateMoodboardWithGemini(prompt, validRefs);

    // 7. Normaliza pra PNG + FORÇA 16:9 (1600×900) via padding bege
    // (Gemini às vezes ignora imageConfig.aspectRatio; fallback garante formato)
    const meta = await sharp(generated.buffer).metadata();
    const w = meta.width ?? 1600;
    const h = meta.height ?? 900;
    const targetRatio = 16 / 9;
    const currentRatio = w / h;

    let normalized: Buffer;
    if (Math.abs(currentRatio - targetRatio) < 0.02) {
      // Já está em 16:9 — só converte pra PNG
      normalized = await sharp(generated.buffer)
        .resize(1600, 900, { fit: 'inside', withoutEnlargement: false })
        .png({ compressionLevel: 6 })
        .toBuffer();
    } else {
      // Fora do 16:9 — adiciona padding bege pra não perder conteúdo
      normalized = await sharp(generated.buffer)
        .resize(1600, 900, {
          fit: 'contain',
          background: { r: 245, g: 240, b: 233, alpha: 1 }, // #f5f0e9
        })
        .png({ compressionLevel: 6 })
        .toBuffer();
    }
    const finalPng = normalized;

    // 8. Salva no Storage
    const { data: sess } = await supabase
      .from('moodboard_sessions')
      .select('slug')
      .eq('id', params.sessionId)
      .single();

    const outputPath = `${sess!.slug}.png`;
    await supabase.storage
      .from('moodboard-outputs')
      .upload(outputPath, finalPng, {
        contentType: 'image/png',
        upsert: true,
      });
    const { data: outUrl } = supabase.storage
      .from('moodboard-outputs')
      .getPublicUrl(outputPath);

    // 9. Update final
    await supabase
      .from('moodboard_sessions')
      .update({
        status: 'generated',
        cover_url: outUrl.publicUrl,
        palette,
        template_variant: 'painel-mental',
        generated_at: new Date().toISOString(),
      })
      .eq('id', params.sessionId);

    return NextResponse.json({
      slug: sess!.slug,
      coverUrl: outUrl.publicUrl,
      palette,
      brief,
      moodWords,
    });
  } catch (err) {
    console.error('[moodboard/generate] error:', err);
    await supabase
      .from('moodboard_sessions')
      .update({ status: 'failed' })
      .eq('id', params.sessionId);
    return NextResponse.json(
      {
        error: 'generation_failed',
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
