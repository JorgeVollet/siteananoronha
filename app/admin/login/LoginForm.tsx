'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast.error('Email ou senha incorretos');
        setLoading(false);
        return;
      }

      toast.success('Bem-vinda, Ana!');
      router.push('/admin');
      router.refresh();
    } catch {
      toast.error('Erro ao fazer login. Tente novamente.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-[0.82rem] font-bold tracking-[0.06em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: '#756b60' }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.95rem] text-[#171411] outline-none transition-colors placeholder:text-[#b8a89a] focus:border-[#9a744d] focus:bg-white"
          placeholder="seu@email.com"
          style={{ fontFamily: 'var(--font-body)' }}
        />
      </div>

      {/* Senha */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-[0.82rem] font-bold tracking-[0.06em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: '#756b60' }}
        >
          Senha
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 pr-12 text-[0.95rem] text-[#171411] outline-none transition-colors placeholder:text-[#b8a89a] focus:border-[#9a744d] focus:bg-white"
            placeholder="••••••••"
            style={{ fontFamily: 'var(--font-body)' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a8878] transition-colors hover:text-[#171411]"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-1 flex items-center justify-center gap-2.5 rounded-[10px] bg-[#171614] px-6 py-3.5 text-[0.92rem] font-bold text-white shadow-[0_8px_24px_rgba(28,22,17,0.22)] transition-all duration-300 hover:bg-[#29231f] hover:shadow-[0_8px_28px_rgba(166,123,79,0.25)] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Entrando...
          </>
        ) : (
          <>
            <LogIn size={18} />
            Entrar
          </>
        )}
      </button>
    </form>
  );
}
