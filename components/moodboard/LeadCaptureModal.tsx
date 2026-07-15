'use client';

import { useState } from 'react';

type Props = {
  sessionId: string;
  onClose: () => void;
  onDelivered: (downloadUrl: string) => void;
};

export function LeadCaptureModal({ sessionId, onClose, onDelivered }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !consent) {
      setError('Preencha nome, email e aceite o consentimento.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/moodboard/${sessionId}/deliver`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, whatsapp, consent }),
      });
      if (res.status === 429) {
        setError('Você já baixou muitos moodboards hoje. Tente amanhã.');
        return;
      }
      if (!res.ok) throw new Error('deliver_failed');
      const { downloadUrl } = await res.json();
      onDelivered(downloadUrl);
    } catch {
      setError('Algo deu errado. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] rounded-[20px] bg-[#f5f0e9] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif text-[1.6rem] leading-tight text-[#171411]">
          Só falta um passo pra levar seu moodboard.
        </h2>
        <p className="mt-2 text-[0.9rem] text-[#756b60]">
          O download em alta resolução começa automaticamente após enviar.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#9a744d]">
              Nome
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12 rounded-[10px] border border-[#d8c9b8] bg-white px-4 text-[#171411] outline-none focus:border-[#9a744d]"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#9a744d]">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-[10px] border border-[#d8c9b8] bg-white px-4 text-[#171411] outline-none focus:border-[#9a744d]"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#9a744d]">
              WhatsApp <span className="normal-case text-[#756b60]">(opcional)</span>
            </span>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="h-12 rounded-[10px] border border-[#d8c9b8] bg-white px-4 text-[#171411] outline-none focus:border-[#9a744d]"
            />
          </label>

          <label className="flex items-start gap-2.5 text-[0.85rem] text-[#3a332d]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#9a744d]"
            />
            <span>Aceito receber o material e novidades da AN Engenharia.</span>
          </label>

          {error && <p className="text-[#c53030] text-[0.85rem]">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 h-14 rounded-[12px] bg-[#171614] text-white font-bold hover:bg-[#29231f] disabled:opacity-50 transition-all"
          >
            {submitting ? 'Enviando...' : 'Baixar meu moodboard →'}
          </button>
        </form>
      </div>
    </div>
  );
}
