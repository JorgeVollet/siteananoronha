import { getSectionContent } from '@/lib/site-content';
import { ContentEditor } from './ContentEditor';

export default async function ConteudoPage() {
  const [hero, sobre, servicos] = await Promise.all([
    getSectionContent('hero'),
    getSectionContent('sobre'),
    getSectionContent('servicos'),
  ]);

  const initialValues: Record<string, Record<string, string>> = {
    hero,
    sobre,
    servicos,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho explicativo */}
      <div>
        <div
          className="mb-2 text-[0.78rem] font-bold uppercase tracking-[0.12em]"
          style={{ color: '#9a744d' }}
        >
          — Conteúdo do site —
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(22px,2vw,30px)',
            letterSpacing: '-0.04em',
            color: '#171411',
            lineHeight: 1.1,
          }}
        >
          Editor de{' '}
          <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>conteúdo.</em>
        </h1>
        <p
          className="mt-2 max-w-[720px] text-[0.95rem] leading-[1.65] text-[#3a332d]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Cada campo aqui corresponde a algo visível no site público. Edite, salve e a mudança aparece
          em tempo real após recarregar a página inicial.
        </p>
        <div
          className="mt-4 inline-flex items-start gap-2.5 rounded-[10px] border border-[#d8c9b8] px-4 py-3 text-[0.85rem] leading-[1.55] text-[#3a332d]"
          style={{ background: 'rgba(238,229,218,0.60)' }}
        >
          <span className="mt-0.5 text-[#9a744d]">ⓘ</span>
          <span>
            Não vê o resultado da sua alteração? Pode ser que o campo tenha sido removido do site em
            uma atualização visual. Avise o desenvolvedor para realinhar o painel.
          </span>
        </div>
      </div>

      <ContentEditor initialValues={initialValues} />
    </div>
  );
}
