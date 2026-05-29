'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { waLink } from '@/lib/utils';
import { trackCtaClick } from '@/lib/track-cta';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={waLink(siteConfig.contact.phoneRaw, 'Olá Ana! Vim do site e gostaria de conversar sobre meu projeto.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={() => trackCtaClick('sticky')}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 left-8 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-[0_10px_30px_rgba(37,211,102,0.5)] transition-shadow"
    >
      <MessageCircle size={26} strokeWidth={2} />
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping" style={{ animationDuration: '2.5s' }} />
    </motion.a>
  );
}
