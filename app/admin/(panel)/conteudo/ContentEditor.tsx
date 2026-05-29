'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { CONTENT_SECTIONS } from '@/lib/content-schema';
import { ImageFieldEditor } from '@/app/admin/_components/ImageFieldEditor';
import { updateContentBatch } from '@/app/admin/_actions/content';

type Props = {
  initialValues: Record<string, Record<string, string>>;
};

export function ContentEditor({ initialValues }: Props) {
  const [values, setValues] = useState<Record<string, Record<string, string>>>(initialValues);
  const [openSection, setOpenSection] = useState<string | null>(
    CONTENT_SECTIONS[0]?.section ?? null,
  );
  const [saving, setSaving] = useState<string | null>(null);

  function setValue(section: string, key: string, value: string) {
    setValues((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  }

  async function handleSave(section: string) {
    setSaving(section);
    const result = await updateContentBatch(section, values[section] ?? {});
    setSaving(null);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Salvo com sucesso!');
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {CONTENT_SECTIONS.map((sectionDef) => {
        const isOpen = openSection === sectionDef.section;
        const isSaving = saving === sectionDef.section;
        const sectionValues = values[sectionDef.section] ?? {};

        return (
          <div
            key={sectionDef.section}
            className="overflow-hidden rounded-[14px] border border-[#d8c9b8]"
            style={{ background: '#faf6f0' }}
          >
            {/* Header */}
            <button
              type="button"
              onClick={() => setOpenSection(isOpen ? null : sectionDef.section)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-[#f1ebe3]"
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: '1.05rem',
                    letterSpacing: '-0.03em',
                    color: '#171411',
                    display: 'block',
                  }}
                >
                  {sectionDef.label}
                </span>
                {!isOpen && (
                  <span className="mt-0.5 block text-[0.78rem] text-[#9a7a60]">
                    {sectionDef.fields.length} campo{sectionDef.fields.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 shrink-0 text-[#9a744d]" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0 text-[#9a744d]" />
              )}
            </button>

            {/* Body */}
            {isOpen && (
              <div className="border-t border-[#d8c9b8] px-6 py-6">
                {sectionDef.description && (
                  <p className="mb-5 text-[0.82rem] leading-[1.55] text-[#756b60]">
                    {sectionDef.description}
                  </p>
                )}

                <div className="flex flex-col gap-5">
                  {sectionDef.fields.map((field) => {
                    const val = sectionValues[field.key] ?? '';

                    if (field.type === 'image') {
                      return (
                        <div key={field.key}>
                          <ImageFieldEditor
                            label={field.label}
                            value={val}
                            onChange={(url) => setValue(sectionDef.section, field.key, url)}
                            disabled={isSaving}
                          />
                          {field.hint && (
                            <p className="mt-1.5 text-[0.75rem] text-[#9a7a60]">{field.hint}</p>
                          )}
                        </div>
                      );
                    }

                    if (field.type === 'textarea') {
                      return (
                        <div key={field.key} className="flex flex-col gap-1.5">
                          <label className="text-[0.80rem] font-bold uppercase tracking-[0.06em] text-[#756b60]">
                            {field.label}
                          </label>
                          <textarea
                            value={val}
                            onChange={(e) => setValue(sectionDef.section, field.key, e.target.value)}
                            disabled={isSaving}
                            rows={4}
                            placeholder={field.placeholder}
                            className="w-full resize-y rounded-[8px] border border-[#d1c4b7] bg-white px-3 py-2.5 text-[0.88rem] text-[#171411] placeholder:text-[#c0b0a0] focus:border-[#9a744d] focus:outline-none focus:ring-2 focus:ring-[#9a744d]/20 disabled:opacity-60"
                          />
                          {field.hint && (
                            <p className="text-[0.75rem] text-[#9a7a60]">{field.hint}</p>
                          )}
                        </div>
                      );
                    }

                    return (
                      <div key={field.key} className="flex flex-col gap-1.5">
                        <label className="text-[0.80rem] font-bold uppercase tracking-[0.06em] text-[#756b60]">
                          {field.label}
                        </label>
                        <input
                          type={field.type === 'url' ? 'url' : 'text'}
                          value={val}
                          onChange={(e) => setValue(sectionDef.section, field.key, e.target.value)}
                          disabled={isSaving}
                          placeholder={field.placeholder}
                          className="w-full rounded-[8px] border border-[#d1c4b7] bg-white px-3 py-2.5 text-[0.88rem] text-[#171411] placeholder:text-[#c0b0a0] focus:border-[#9a744d] focus:outline-none focus:ring-2 focus:ring-[#9a744d]/20 disabled:opacity-60"
                        />
                        {field.hint && (
                          <p className="text-[0.75rem] text-[#9a7a60]">{field.hint}</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSave(sectionDef.section)}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-[8px] bg-[#171411] px-5 py-2.5 text-[0.82rem] font-bold text-white transition-all hover:bg-[#29231f] disabled:opacity-60"
                  >
                    {isSaving ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Save className="h-3.5 w-3.5" />
                    )}
                    Salvar {sectionDef.label}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
