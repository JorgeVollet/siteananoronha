import { getSectionContent } from '@/lib/site-content';
import { FooterEditor } from './FooterEditor';

export default async function FooterAdminPage() {
  const content = await getSectionContent('footer');

  return (
    <div className="flex flex-col gap-6">
      <div>
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
          Footer &amp;{' '}
          <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Contato.</em>
        </h1>
        <p
          className="mt-2 text-[0.88rem] text-[#756b60]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Atualize os dados de contato exibidos no rodapé do site.
        </p>
      </div>
      <FooterEditor initialValues={content} />
    </div>
  );
}
