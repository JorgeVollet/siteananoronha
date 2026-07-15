/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' }
    ]
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    // @resvg/resvg-js tem um binário nativo (.node) que o webpack não sabe processar.
    // Marcamos como externo pra que seja require()d em runtime pelo Node, não empacotado.
    serverComponentsExternalPackages: ['@resvg/resvg-js', 'sharp']
  }
};

module.exports = nextConfig;
