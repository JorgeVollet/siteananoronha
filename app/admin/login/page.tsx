import Link from 'next/link';
import { LoginForm } from './LoginForm';

export default function LoginPage() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center px-4"
      style={{
        background:
          'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.70), transparent 40%), ' +
          'radial-gradient(circle at 80% 80%, rgba(221,211,198,0.40), transparent 40%), ' +
          '#f5f0e9',
      }}
    >
      {/* Marca d'água sutil */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden="true"
      >
        <span
          className="text-[18vw] font-bold leading-none tracking-[-0.04em] opacity-[0.03]"
          style={{ fontFamily: 'var(--font-display)', color: '#9a744d' }}
        >
          AN
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[400px]">
        {/* Logo / Wordmark */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#171614] shadow-[0_12px_32px_rgba(28,22,17,0.22)]">
            <span
              className="text-[1.1rem] font-bold tracking-[-0.02em] text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AN
            </span>
          </div>
          <p
            className="text-[0.78rem] font-bold tracking-[0.10em] uppercase"
            style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
          >
            Painel administrativo
          </p>
        </div>

        {/* Card de login */}
        <div
          className="rounded-[20px] border border-[#d8c9b8] p-8 shadow-[0_24px_64px_rgba(42,31,22,0.10)]"
          style={{ background: '#faf6f0' }}
        >
          <h1
            className="mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: '1.5rem',
              letterSpacing: '-0.04em',
              color: '#171411',
              lineHeight: 1.1,
            }}
          >
            Bem-vinda de volta,{' '}
            <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Ana.</em>
          </h1>
          <LoginForm />
        </div>

        {/* Voltar ao site */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-[0.78rem] font-bold tracking-[0.08em] uppercase text-[#9a744d] transition-colors hover:text-[#171411]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </main>
  );
}
