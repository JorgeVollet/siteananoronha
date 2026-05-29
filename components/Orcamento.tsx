'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { fadeUp, fadeRight, stagger, viewportConfig } from '@/lib/animations';
import { siteConfig } from '@/lib/site-config';
import { waLink } from '@/lib/utils';
import { trackCtaClick } from '@/lib/track-cta';

// ====== Schema de validação ======
const schema = z.object({
  nome: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone incompleto'),
  tipoProjeto: z.enum(
    ['arquitetonico', 'interiores', 'consultoria', 'gestao-obra', 'completo'],
    { required_error: 'Selecione um tipo' }
  ),
  metragem: z.string().optional(),
  prazo: z.enum(['urgente', '3-meses', '6-meses', 'flexivel']).optional(),
  investimento: z
    .enum(['ate-30k', '30-80k', '80-150k', '150-300k', 'acima-300k', 'a-definir'])
    .optional(),
  mensagem: z.string().min(15, 'Conte um pouco mais sobre o seu projeto')
});

type FormData = z.infer<typeof schema>;

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Orcamento() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { tipoProjeto: undefined, prazo: undefined, investimento: undefined }
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Falha ao enviar — tente pelo WhatsApp.');
      }

      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado.');
    }
  };

  const buildWhatsAppMessage = () => {
    const v = getValues();
    const lines = [
      `Olá Ana! Quero solicitar um orçamento.`,
      ``,
      `*Nome:* ${v.nome || '—'}`,
      `*Email:* ${v.email || '—'}`,
      `*Tipo de projeto:* ${v.tipoProjeto || '—'}`,
      v.metragem ? `*Metragem:* ${v.metragem}` : '',
      v.prazo ? `*Prazo:* ${v.prazo}` : '',
      v.investimento ? `*Faixa de investimento:* ${v.investimento}` : '',
      ``,
      `*Sobre o projeto:*`,
      v.mensagem || '—'
    ].filter(Boolean);
    return waLink(siteConfig.contact.phoneRaw, lines.join('\n'));
  };

  return (
    <section id="contato" className="relative overflow-hidden bg-bg-nude">
      {/* Background foto + overlay claro (mantém estética do site original) */}
      <div className="absolute inset-0">
        <Image
          src="/img/8.png"
          alt=""
          fill
          quality={85}
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-bg-nude/95 via-bg-nude/85 to-bg-nude/95" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* COLUNA ESQUERDA — foto Ana + headline */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="lg:col-span-5"
        >
          <motion.div variants={fadeRight} className="relative max-w-[440px] aspect-[3/4] rounded-md overflow-hidden shadow-2xl mx-auto lg:mx-0">
            <Image
              src="/img/6.png"
              alt="Ana Laura Noronha"
              fill
              quality={88}
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 border-2 border-hero-gold/40" />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 max-w-md mx-auto lg:mx-0">
            {/* Eyebrow Atelier × Summit */}
            <div className="flex items-center gap-3">
              <span
                className="text-[0.78rem] font-bold tracking-[0.12em] uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
              >
                Vamos conversar
              </span>
              <span className="h-px w-12 bg-[#9a744d]/70" />
            </div>

            <h2
              className="mt-5"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(32px,3.6vw,56px)',
                lineHeight: 1.0,
                letterSpacing: '-0.045em',
                color: '#171411',
              }}
            >
              Solicite um{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-display)',
                  color: '#9a744d',
                }}
              >
                orçamento.
              </em>
            </h2>

            <p
              className="mt-5"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '1rem',
                lineHeight: 1.65,
                letterSpacing: '-0.015em',
                color: '#5a5047',
              }}
            >
              Preencha o formulário ou fale direto pelo WhatsApp. Respondo em até 5 dias úteis com proposta personalizada.
            </p>
          </motion.div>
        </motion.div>

        {/* COLUNA DIREITA — Formulário completo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="bg-white rounded-lg shadow-2xl p-7 md:p-10 border border-gray-100">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 size={64} className="text-green-600 mx-auto mb-4" />
                <h3 className="font-bodoni text-2xl text-text-dark uppercase font-bold mb-3">
                  Mensagem enviada!
                </h3>
                <p className="font-sans text-text-muted max-w-md mx-auto">
                  Recebi sua solicitação. Em até 5 dias úteis você receberá uma proposta personalizada por email.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm bg-hero-dark text-hero-gold uppercase tracking-widest-2 font-bodoni font-bold rounded hover:bg-terracota transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <header className="mb-6">
                  <h3 className="font-bodoni text-2xl md:text-3xl text-text-dark uppercase font-bold">
                    Conte sobre seu projeto
                  </h3>
                  <p className="mt-1 font-sans text-sm text-text-muted">
                    Quanto mais detalhe, mais precisa será a proposta.
                  </p>
                </header>

                <Field label="Nome completo *" error={errors.nome?.message}>
                  <input
                    {...register('nome')}
                    type="text"
                    placeholder="Como você se chama?"
                    className={inputClass}
                  />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="E-mail *" error={errors.email?.message}>
                    <input {...register('email')} type="email" placeholder="seu@email.com" className={inputClass} />
                  </Field>
                  <Field label="Telefone / WhatsApp *" error={errors.telefone?.message}>
                    <input {...register('telefone')} type="tel" placeholder="(21) 9 9999-9999" className={inputClass} />
                  </Field>
                </div>

                <Field label="Tipo de projeto *" error={errors.tipoProjeto?.message}>
                  <select {...register('tipoProjeto')} className={selectClass} defaultValue="">
                    <option value="" disabled>
                      Selecione...
                    </option>
                    <option value="arquitetonico">Projeto Arquitetônico</option>
                    <option value="interiores">Design de Interiores</option>
                    <option value="consultoria">Consultoria Técnica</option>
                    <option value="gestao-obra">Gestão de Obra</option>
                    <option value="completo">Pacote Completo (todos)</option>
                  </select>
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <Field label="Metragem (m²)" error={errors.metragem?.message}>
                    <input {...register('metragem')} type="text" placeholder="ex: 120" className={inputClass} />
                  </Field>
                  <Field label="Prazo desejado" error={errors.prazo?.message}>
                    <select {...register('prazo')} className={selectClass} defaultValue="">
                      <option value="">A definir</option>
                      <option value="urgente">Urgente (até 60 dias)</option>
                      <option value="3-meses">Até 3 meses</option>
                      <option value="6-meses">Até 6 meses</option>
                      <option value="flexivel">Flexível</option>
                    </select>
                  </Field>
                  <Field label="Faixa de investimento" error={errors.investimento?.message}>
                    <select {...register('investimento')} className={selectClass} defaultValue="">
                      <option value="">A definir</option>
                      <option value="ate-30k">Até R$ 30 mil</option>
                      <option value="30-80k">R$ 30 – 80 mil</option>
                      <option value="80-150k">R$ 80 – 150 mil</option>
                      <option value="150-300k">R$ 150 – 300 mil</option>
                      <option value="acima-300k">Acima de R$ 300 mil</option>
                      <option value="a-definir">A definir</option>
                    </select>
                  </Field>
                </div>

                <Field label="Conte sobre seu espaço e o que você deseja *" error={errors.mensagem?.message}>
                  <textarea
                    {...register('mensagem')}
                    rows={5}
                    placeholder="Descreva o ambiente, suas referências, o que mais te incomoda hoje e o que você quer alcançar..."
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                {status === 'error' && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <span>{errorMsg ?? 'Falha ao enviar. Use o WhatsApp como alternativa.'}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  {/* CTA primário — dark Atelier × Summit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group flex-1 inline-flex items-center justify-center gap-3 h-[58px] rounded-[12px] bg-[#171614] px-7 text-[0.95rem] font-bold tracking-[-0.01em] text-white shadow-[0_18px_44px_rgba(28,22,17,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#29231f] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {status === 'loading' ? (
                      'Enviando...'
                    ) : (
                      <>
                        <span>Enviar mensagem</span>
                        <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  {/* CTA secundário — light bege Atelier × Summit */}
                  <a
                    href={buildWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCtaClick('contato')}
                    className="group flex-1 inline-flex items-center justify-center gap-3 h-[58px] rounded-[12px] border border-[#d1c4b7] bg-[#f1ebe3] px-7 text-[0.95rem] font-bold tracking-[-0.01em] text-[#1c1915] shadow-[0_12px_28px_rgba(88,72,58,0.055)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c6b49f] hover:bg-[#f8f2ea]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <MessageCircle size={16} className="text-[#9a744d] transition-transform group-hover:translate-x-0.5" />
                    <span>Falar no WhatsApp</span>
                  </a>
                </div>

                <p className="text-xs text-text-muted text-center pt-2">
                  Ao enviar, você concorda em receber retorno por e-mail ou WhatsApp.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============== INPUT WRAPPER ============== */
const inputClass =
  'w-full bg-bg-light border border-gray-200 rounded px-4 py-3 font-sans text-sm text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:border-terracota focus:ring-2 focus:ring-terracota/20 transition-all';

const selectClass = `${inputClass} appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23966A4B' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`;

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-sans text-xs text-text-dark font-semibold uppercase tracking-wider-2 mb-2">
        {label}
      </span>
      {children}
      {error && <span className="block mt-1 text-xs text-red-600 font-sans">{error}</span>}
    </label>
  );
}
