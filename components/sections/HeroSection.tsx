// Schema de conteúdo: lib/content-schema.ts → section "hero"
// Edição via: /admin/conteudo → Hero (topo do site)
// WhatsApp do CTA: /admin/footer → WhatsApp

import { getSectionContent } from '@/lib/site-content';
import { HeroClient } from './HeroClient';

export async function HeroSection() {
  const [hero, footer] = await Promise.all([
    getSectionContent('hero'),
    getSectionContent('footer'),
  ]);

  return (
    <HeroClient
      titulo={hero.titulo ?? 'Cada projeto é único, cada execução é precisa.'}
      subtitulo={
        hero.subtitulo ??
        'Engenharia, arquitetura e marcenaria sob medida — um método integrado, do conceito à entrega.'
      }
      imagemPrincipal={hero.imagem_principal ?? '/img/1.png'}
      ctaTexto={hero.cta_texto ?? 'Solicitar Orçamento'}
      whatsapp={footer.whatsapp ?? '5521996621363'}
    />
  );
}
