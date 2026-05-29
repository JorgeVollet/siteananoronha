'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  MessageCircle,
  Calendar,
  Ruler,
  Box,
  Edit3,
  ClipboardCheck,
  LayoutTemplate,
  Download
} from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { fadeUp, stagger, viewportConfig } from '@/lib/animations';
import Watermark from './Watermark';

const iconMap = [MessageCircle, Calendar, Ruler, Box, Edit3, ClipboardCheck, LayoutTemplate, Download];

export default function PassoAPasso() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.4']
  });
  // Linha que se "desenha" conforme scroll
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={ref} id="passo-a-passo" className="relative bg-white py-24 md:py-32 overflow-hidden">
      <Watermark variant="compass" className="text-azul-tecnico top-10 left-[5%]" width={200} rotate={-10} opacity={0.05} />
      <Watermark variant="blueprint" className="text-azul-tecnico bottom-10 right-[5%]" width={280} rotate={8} opacity={0.05} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span variants={fadeUp} className="tag">
            Passo a Passo
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-6 font-bodoni text-text-dark text-[clamp(2rem,4vw,3rem)] font-bold leading-tight"
          >
            O que está contemplado no
            <br />
            <em className="font-display italic text-terracota font-semibold">desenvolvimento do seu projeto</em>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha de fundo (placeholder cinza) */}
          <div className="hidden md:block absolute top-[45px] left-0 right-0 h-[2px] bg-gray-200 mx-[80px]" />
          {/* Linha animada (preenche com scroll) */}
          <motion.div
            style={{ width: lineWidth }}
            className="hidden md:block absolute top-[45px] left-[80px] h-[2px] bg-gradient-to-r from-azul-tecnico via-terracota to-hero-gold origin-left"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-12 gap-x-4 relative z-10"
          >
            {siteConfig.steps.map((step, i) => {
              const Icon = iconMap[i];
              return (
                <motion.div
                  key={step.n}
                  variants={fadeUp}
                  className="group flex flex-col items-center text-center px-2"
                >
                  {/* Ícone circular */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="relative z-10 w-[90px] h-[90px] rounded-full bg-white border-[3px] border-azul-tecnico flex items-center justify-center mb-5 shadow-[0_0_0_8px_rgba(58,90,104,0.06)] group-hover:shadow-[0_0_0_12px_rgba(58,90,104,0.1)] transition-all duration-500"
                  >
                    <Icon size={32} strokeWidth={1.4} className="text-azul-tecnico" />
                  </motion.div>

                  {/* Texto */}
                  <div className="space-y-2 max-w-[160px]">
                    <h4 className="font-display text-text-dark text-sm font-bold">
                      {step.n}. {step.title}
                    </h4>
                    <p className="font-sans text-xs text-text-muted leading-snug">{step.desc}</p>
                  </div>

                  {/* Barra colorida */}
                  <div
                    className="mt-4 w-full h-[6px] rounded-full transition-all duration-500 group-hover:h-[8px]"
                    style={{ backgroundColor: step.barColor }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
