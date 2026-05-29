// Schema de conteúdo: lib/content-schema.ts → FOOTER_FIELDS
// Edição via: /admin/footer → Footer & Contato
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { fadeUp, stagger, viewportConfig } from '@/lib/animations';
import { waLink } from '@/lib/utils';
import { trackCtaClick } from '@/lib/track-cta';

type Props = {
  whatsapp?: string;
  email?: string;
  instagram?: string;   // full URL (ex: https://instagram.com/analauraarquitetura)
  cidade?: string;
  crea?: string;
};

export default function Footer({ whatsapp, email, instagram, cidade, crea }: Props) {
  const phoneRaw = whatsapp ?? siteConfig.contact.phoneRaw;
  const emailAddr = email ?? siteConfig.contact.email;
  const igUrl = instagram ?? siteConfig.contact.instagramUrl;
  const igHandle = siteConfig.contact.instagram;
  const cidadeStr = cidade ?? siteConfig.contact.address.city;
  const creaStr = crea ?? siteConfig.contact.crea;

  return (
    <footer className="relative bg-hero-dark text-white pt-20 pb-10 border-t-[5px] border-hero-gold overflow-hidden">
      {/* Decorativo */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10"
        >
          {/* Bloco 1 — Marca + CTA */}
          <motion.div variants={fadeUp} className="md:col-span-5">
            <h2 className="font-bodoni text-hero-gold text-3xl md:text-4xl uppercase font-bold tracking-wider-2 leading-tight">
              Vamos iniciar<br />
              <em className="italic font-normal">seu projeto.</em>
            </h2>
            <p className="mt-5 font-sans text-white/70 text-base leading-relaxed max-w-md">
              Entre em contato para entender como o projeto pode ser estruturado de forma adequada ao seu espaço e ao seu momento.
            </p>
            <a
              href={waLink(phoneRaw, 'Olá Ana! Vim do site e gostaria de conversar.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick('footer')}
              className="mt-8 inline-flex items-center gap-3 bg-hero-gold hover:bg-white text-hero-dark px-8 py-4 rounded-full font-bodoni font-bold text-sm uppercase tracking-widest-2 transition-all duration-400 hover:shadow-gold-glow hover:-translate-y-1"
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
            </a>
          </motion.div>

          {/* Bloco 2 — Contato */}
          <motion.div variants={fadeUp} className="md:col-span-4">
            <h3 className="font-bodoni text-hero-gold text-base uppercase tracking-widest-2 font-bold mb-5">
              Contato
            </h3>
            <ul className="space-y-4 text-sm text-white/80 font-sans">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-hero-gold mt-1 flex-shrink-0" />
                <a
                  href={waLink(phoneRaw)}
                  className="link-underline hover:text-hero-gold transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-hero-gold mt-1 flex-shrink-0" />
                <a
                  href={`mailto:${emailAddr}`}
                  className="link-underline hover:text-hero-gold transition-colors break-all"
                >
                  {emailAddr}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-hero-gold mt-1 flex-shrink-0" />
                <span className="leading-relaxed">
                  {siteConfig.contact.address.street}
                  <br />
                  {siteConfig.contact.address.complement}
                  <br />
                  {cidadeStr}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Instagram size={16} className="text-hero-gold mt-1 flex-shrink-0" />
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-hero-gold transition-colors"
                >
                  {igHandle}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Bloco 3 — Navegação rápida */}
          <motion.div variants={fadeUp} className="md:col-span-3">
            <h3 className="font-bodoni text-hero-gold text-base uppercase tracking-widest-2 font-bold mb-5">
              Navegação
            </h3>
            <ul className="space-y-3 text-sm text-white/80 font-sans">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-underline hover:text-hero-gold transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ delay: 0.4, duration: 1 }}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 font-sans"
        >
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} {siteConfig.name}</span>
            <span className="hidden md:inline-block opacity-60">·</span>
            <span className="hidden md:inline-block">{creaStr}</span>
          </div>
          <span className="font-bodoni italic text-hero-gold/60">desenvolvido por jvstudio.art</span>
        </motion.div>

        {/* Staff Only — ponto discreto, canto inferior direito */}
        <div className="mt-3 flex justify-end">
          <Link
            href="/admin/login"
            aria-label="Staff Only"
            title="Staff"
            className="flex h-2.5 w-2.5 rounded-full bg-[#a8997f]/30 transition-all duration-500 hover:scale-[2] hover:bg-[#9a744d]/80"
          >
            <span className="sr-only">Staff Only</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
