import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // ========== PALETA OFICIAL DO SITE ANA LAURA NORONHA ==========
        // (extraída do index.html original — preservada)
        'hero-gold': '#D3C39D',   // dourado principal (CTAs, headlines hero)
        'hero-dark': '#0A0A0A',   // preto carbono (fundos, hero)
        'bg-nude': '#EFEBE4',     // bege quente (form, vídeo box)
        'bg-light': '#FAFAFA',    // off-white (fundo geral)
        'salvia': '#8A9A86',      // verde sálvia (primary)
        'terracota': '#966A4B',   // marrom terracota (secondary, acentos)
        'text-dark': '#111111',
        'text-muted': '#666666',

        // ========== TONS COMPLEMENTARES (timeline + variantes) ==========
        'azul-tecnico': '#3A5A68',
        'azul-claro': '#A9BCC6',
        'azul-suave': '#C1CCD1',
        'azul-medio': '#5C7A8C',
        'amber-soft': '#D4A373',

        // ========== HOVERS / ESTADOS ==========
        'hero-gold-light': '#E8D7AE',
        'hero-gold-deep': '#B8A77E',
        'nude-soft': '#F7F3EB',
        'nude-deep': '#E0D8C8',

        // ========== ATELIER × SUMMIT DS ==========
        'paper':      '#f5f0e9',
        'panel':      '#eee5da',
        'ink':        '#171411',
        'taupe':      '#a67b4f',
        'warm-muted': '#7d7267',
        'warm-border':'#d8c9b8'
      },
      fontFamily: {
        // Atelier × Summit DS — primárias
        serif: ['var(--font-display)', 'Newsreader', 'Georgia', 'serif'],
        sans:  ['var(--font-body)', 'Manrope', 'system-ui', 'sans-serif'],
        // Legado (backward-compat — não usar em novos componentes)
        display:    ['var(--font-playfair)', 'Playfair Display', 'serif'],
        logo:       ['var(--font-logo)', 'Cormorant Garamond', 'serif'],
        newsreader: ['var(--font-display)', 'Newsreader', 'serif'],
        manrope:    ['var(--font-body)', 'Manrope', 'sans-serif'],
        bodoni:     ['var(--font-display)', 'Newsreader', 'serif'],
      },
      letterSpacing: {
        'wider-2': '0.15em',
        'widest-2': '0.25em',
        'widest-3': '0.35em'
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'fade-right': 'fadeRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'draw': 'draw 2.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 30s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'blueprint-fade': 'blueprintFade 8s ease-in-out infinite'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        draw: {
          '0%': { strokeDashoffset: '2000' },
          '100%': { strokeDashoffset: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        },
        blueprintFade: {
          '0%, 100%': { opacity: '0.08' },
          '50%': { opacity: '0.18' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-shine': 'linear-gradient(90deg, #D3C39D 0%, #F1E4C2 50%, #D3C39D 100%)',
        'paper-noise':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.6 0 0 0 0 0.55 0 0 0 0 0.45 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")"
      },
      boxShadow: {
        'gold-glow': '0 10px 30px rgba(211, 195, 157, 0.25)',
        'card-soft': '0 10px 30px rgba(0,0,0,0.05)',
        'card-hover': '0 25px 50px rgba(0,0,0,0.18)',
        'inner-soft': 'inset 0 2px 8px rgba(0,0,0,0.04)'
      },
      transitionTimingFunction: {
        'silky': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    }
  },
  plugins: []
};

export default config;
