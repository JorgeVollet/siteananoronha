import { NextRequest, NextResponse } from 'next/server';
import { createMoodboardAdminClient } from '@/lib/moodboard/supabase-admin';
import { sendAnaNotification } from '@/lib/moodboard/mailer';

export async function POST(
  req: NextRequest,
  { params }: { params: { sessionId: string } },
) {
  const body = await req.json();
  const { name, email, whatsapp, consent } = body;

  if (!name || !email || !consent) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const supabase = createMoodboardAdminClient();

  // Buscar session gerada
  const { data: session } = await supabase
    .from('moodboard_sessions')
    .select('*')
    .eq('id', params.sessionId)
    .single();

  if (!session || session.status !== 'generated') {
    return NextResponse.json({ error: 'not_generated' }, { status: 400 });
  }

  // Rate limit por email (máx 3/dia)
  const { count } = await supabase
    .from('moodboard_leads')
    .select('*', { count: 'exact', head: true })
    .eq('email', email)
    .gte('created_at', new Date(Date.now() - 24 * 3600 * 1000).toISOString());

  if ((count ?? 0) >= 3) {
    return NextResponse.json({ error: 'email_rate_limit' }, { status: 429 });
  }

  // Cria lead
  const { data: lead, error } = await supabase
    .from('moodboard_leads')
    .insert({
      session_id: params.sessionId,
      name,
      email,
      whatsapp: whatsapp || null,
      consent_marketing: consent,
    })
    .select()
    .single();

  if (error) {
    console.error('[deliver] lead error:', error);
    return NextResponse.json({ error: 'db_failed' }, { status: 500 });
  }

  // Notifica a Ana sobre o lead novo (falha graciosa se Resend indisponível).
  // Removido o email pro visitante — download é direto no browser agora.
  await Promise.allSettled([
    sendAnaNotification({
      leadName: name,
      leadEmail: email,
      whatsapp,
      slug: session.slug,
    }),
  ]);

  // Atualiza flags: email_sent=false (não mandamos pro visitante), ana_notified=true
  await supabase
    .from('moodboard_leads')
    .update({ email_sent: false, ana_notified: true })
    .eq('id', lead.id);

  await supabase
    .from('moodboard_sessions')
    .update({ status: 'delivered' })
    .eq('id', params.sessionId);

  return NextResponse.json({ ok: true, downloadUrl: session.cover_url });
}
