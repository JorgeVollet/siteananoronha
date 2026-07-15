import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

function getRedis() {
  if (redis) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    console.warn(
      '[moodboard] Upstash Redis não configurado — rate limit desabilitado',
    );
    return null;
  }
  redis = new Redis({ url, token });
  return redis;
}

// Em desenvolvimento, limites bem generosos pra permitir testes.
// Em produção (NODE_ENV === 'production'), volta pros limites do spec.
const IS_DEV = process.env.NODE_ENV !== 'production';

// sessions criadas por IP em 24h
export function getSessionRateLimit() {
  const r = getRedis();
  if (!r) return null;
  return new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(IS_DEV ? 100 : 3, '24h'),
    prefix: 'moodboard:session',
  });
}

// gerações por IP em 24h
export function getGenerateRateLimit() {
  const r = getRedis();
  if (!r) return null;
  return new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(IS_DEV ? 100 : 3, '24h'),
    prefix: 'moodboard:generate',
  });
}

export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}
