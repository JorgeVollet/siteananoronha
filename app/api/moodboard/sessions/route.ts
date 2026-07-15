import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { createMoodboardAdminClient } from '@/lib/moodboard/supabase-admin';
import {
  getSessionRateLimit,
  getClientIp,
} from '@/lib/moodboard/rate-limit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  const rl = getSessionRateLimit();
  if (rl) {
    const { success } = await rl.limit(ip);
    if (!success) {
      return NextResponse.json(
        {
          error: 'rate_limit',
          message: 'Limite diário atingido. Tente novamente amanhã.',
        },
        { status: 429 },
      );
    }
  }

  const slug = nanoid(8);
  const supabase = createMoodboardAdminClient();

  const { data, error } = await supabase
    .from('moodboard_sessions')
    .insert({
      slug,
      status: 'created',
      ip_address: ip,
      user_agent: req.headers.get('user-agent'),
    })
    .select()
    .single();

  if (error || !data) {
    console.error('[moodboard/sessions] error:', error);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }

  return NextResponse.json({ sessionId: data.id, slug: data.slug });
}
