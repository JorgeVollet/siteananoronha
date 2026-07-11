import { getSectionContent } from '@/lib/site-content';
import { HeroSection } from '@/components/sections/HeroSection';
import { SobreSection } from '@/components/sections/SobreSection';
import { PilaresSection } from '@/components/sections/PilaresSection';
import { PassosSection } from '@/components/sections/PassosSection';
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection';
import FilosofiaManifesto from '@/components/FilosofiaManifesto';
import Servicos from '@/components/Servicos';
import AntesDepois from '@/components/AntesDepois';
import FAQ from '@/components/FAQ';
import Orcamento from '@/components/Orcamento';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default async function HomePage() {
  const [sobre, servicos, footer] = await Promise.all([
    getSectionContent('sobre'),
    getSectionContent('servicos'),
    getSectionContent('footer'),
  ]);

  return (
    <main className="relative">
      {/* HeroSection fetches its own data (hero + footer.whatsapp) */}
      <HeroSection />

      {/* Manifesto — id="manifesto" */}
      <FilosofiaManifesto
        tituloSecao={sobre.titulo || undefined}
        corpo={sobre.corpo || undefined}
        imagemUrl={sobre.imagem || undefined}
      />

      {/* Nova seção Sobre (biografia) — id="sobre" */}
      <SobreSection />

      {/* Pilares de Atuação — id="pilares" */}
      <PilaresSection />

      {/* Serviços — id="servicos" */}
      <Servicos
        subtitulo={servicos.subtitulo || undefined}
        imagemAna={servicos.imagem_ana || undefined}
        whatsapp={footer.whatsapp || undefined}
      />

      {/* Passo a Passo — id="passos" */}
      <PassosSection />

      {/* Portfólio — id="portfolio" */}
      <AntesDepois />

      {/* Blog / Conteúdo editorial — id="conteudo" */}
      <BlogPreviewSection />

      <FAQ />
      <Orcamento />

      <Footer
        whatsapp={footer.whatsapp || undefined}
        email={footer.email || undefined}
        instagram={footer.instagram || undefined}
        cidade={footer.cidade || undefined}
        crea={footer.crea || undefined}
      />

      <BackToTop />
      <WhatsAppFloat />
    </main>
  );
}
