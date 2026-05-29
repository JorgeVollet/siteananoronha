'use client';

import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { FOOTER_FIELDS } from '@/lib/content-schema';
import { updateContentBatch } from '@/app/admin/_actions/content';

type Props = {
  initialValues: Record<string, string>;
};

export function FooterEditor({ initialValues }: Props) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [saving, setSaving] = useState(false);

  function setValue(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    const result = await updateContentBatch('footer', values);
    setSaving(false);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Dados do rodapé salvos!');
    }
  }

  return (
    <div
      className="flex max-w-[640px] flex-col gap-5 rounded-[14px] border border-[#d8c9b8] px-6 py-6"
      style={{ background: '#faf6f0' }}
    >
      {FOOTER_FIELDS.map((field) => (
        <div key={field.key} className="flex flex-col gap-1.5">
          <label className="text-[0.80rem] font-bold uppercase tracking-[0.06em] text-[#756b60]">
            {field.label}
          </label>
          <input
            type={field.type === 'url' ? 'url' : 'text'}
            value={values[field.key] ?? ''}
            onChange={(e) => setValue(field.key, e.target.value)}
            placeholder={field.placeholder}
            disabled={saving}
            className="w-full rounded-[8px] border border-[#d1c4b7] bg-white px-3 py-2.5 text-[0.88rem] text-[#171411] placeholder:text-[#c0b0a0] focus:border-[#9a744d] focus:outline-none focus:ring-2 focus:ring-[#9a744d]/20 disabled:opacity-60"
          />
          {field.hint && (
            <p className="text-[0.75rem] text-[#9a7a60]">{field.hint}</p>
          )}
        </div>
      ))}

      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-[8px] bg-[#171411] px-5 py-2.5 text-[0.82rem] font-bold text-white transition-all hover:bg-[#29231f] disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          Salvar dados do rodapé
        </button>
      </div>
    </div>
  );
}
