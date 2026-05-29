'use client';

import { createClient } from '@/lib/supabase/client';

export type CtaLocation =
  | 'hero'
  | 'footer'
  | 'sticky'
  | 'contato'
  | 'portfolio'
  | 'servicos';

export async function trackCtaClick(location: CtaLocation): Promise<void> {
  try {
    const supabase = createClient();
    await supabase.from('cta_clicks').insert({
      cta_location: location,
      user_agent:
        typeof navigator !== 'undefined'
          ? navigator.userAgent.slice(0, 200)
          : null,
      referrer:
        typeof document !== 'undefined'
          ? document.referrer.slice(0, 200)
          : null,
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[trackCtaClick] error:', err);
    }
  }
}
