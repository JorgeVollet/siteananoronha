'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-hero-dark/85 backdrop-blur-md py-3 shadow-xl'
          : 'bg-gradient-to-b from-black/40 to-transparent py-6'
      )}
    >
      <div className="w-full px-6 md:px-16 flex items-center justify-between">
        {/* Logo (texto) */}
        <a
          href="#home"
          className="font-bodoni text-hero-gold text-xl md:text-2xl tracking-widest uppercase font-bold transition-colors hover:text-white"
        >
          AN <span className="text-white/60 text-xs ml-1 font-sans tracking-wider">Engenharia & Interiores</span>
        </a>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex gap-10">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav-link font-display text-white uppercase tracking-wider-2 text-sm font-bold hover:text-hero-gold transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-white p-2"
          aria-label="Abrir menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-hero-dark/95 backdrop-blur-lg overflow-hidden"
          >
            <ul className="px-6 py-6 flex flex-col gap-5">
              {siteConfig.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    onClick={() => setOpen(false)}
                    href={item.href}
                    className="block font-display text-white uppercase tracking-wider-2 text-base font-bold hover:text-hero-gold transition-colors"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
