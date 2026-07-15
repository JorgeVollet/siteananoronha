import { NextRequest, NextResponse } from 'next/server';
import { createMoodboardAdminClient } from '@/lib/moodboard/supabase-admin';

export async function POST(
  req: NextRequest,
  { params }: { params: { sessionId: string } },
) {
  const formData = await req.formData();
  const original = formData.get('original') as File | null;
  const processed = formData.get('processed') as File | null;

  if (!original) {
    return NextResponse.json({ error: 'missing_file' }, { status: 400 });
  }

  // Validação básica
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(original.type)) {
    return NextResponse.json({ error: 'invalid_mime' }, { status: 400 });
  }
  if (original.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'too_large' }, { status: 400 });
  }

  const supabase = createMoodboardAdminClient();

  // Verificar session existe
  const { data: session } = await supabase
    .from('moodboard_sessions')
    .select('slug')
    .eq('id', params.sessionId)
    .single();
  if (!session) {
    return NextResponse.json({ error: 'session_not_found' }, { status: 404 });
  }

  const imageId = crypto.randomUUID();
  const originalPath = `${session.slug}/${imageId}-original.${original.name.split('.').pop()}`;
  const processedPath = processed
    ? `${session.slug}/${imageId}-processed.png`
    : null;

  // Upload original
  const originalBuffer = Buffer.from(await original.arrayBuffer());
  const { error: origErr } = await supabase.storage
    .from('moodboard-originals')
    .upload(originalPath, originalBuffer, {
      contentType: original.type,
      upsert: false,
    });
  if (origErr) {
    console.error('[upload] original error:', origErr);
    return NextResponse.json({ error: 'storage_failed' }, { status: 500 });
  }

  const { data: origUrl } = supabase.storage
    .from('moodboard-originals')
    .getPublicUrl(originalPath);

  let processedUrl: string | null = null;
  if (processed && processedPath) {
    const processedBuffer = Buffer.from(await processed.arrayBuffer());
    await supabase.storage
      .from('moodboard-processed')
      .upload(processedPath, processedBuffer, {
        contentType: 'image/png',
        upsert: false,
      });
    const { data } = supabase.storage
      .from('moodboard-processed')
      .getPublicUrl(processedPath);
    processedUrl = data.publicUrl;
  }

  const { data: imageRow, error: imgErr } = await supabase
    .from('moodboard_images')
    .insert({
      id: imageId,
      session_id: params.sessionId,
      original_url: origUrl.publicUrl,
      processed_url: processedUrl,
    })
    .select()
    .single();

  if (imgErr) {
    console.error('[upload] db error:', imgErr);
    return NextResponse.json({ error: 'db_failed' }, { status: 500 });
  }

  return NextResponse.json({
    imageId: imageRow.id,
    originalUrl: imageRow.original_url,
    processedUrl: imageRow.processed_url,
  });
}
