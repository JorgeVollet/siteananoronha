// Server Component — Conteúdo editorial na homepage.
// Busca artigos recentes das 4 categorias (Blog, Normas Técnicas, Curiosidades, Brainstorming Sketch)
// e passa para o carrossel client que faz a navegação por abas + setas.
//
// Schema: cadastrado via /admin/artigos

import { EditorialCarousel } from './EditorialCarousel';
import { getLatestArticlesByCategory } from '@/lib/articles';

export async function BlogPreviewSection() {
  const [blog, normas, curiosidades, sketch] = await Promise.all([
    getLatestArticlesByCategory('blog', 3),
    getLatestArticlesByCategory('normas', 3),
    getLatestArticlesByCategory('curiosidades', 3),
    getLatestArticlesByCategory('sketch', 3),
  ]);

  // Se todas categorias vazias, não renderiza a seção
  const total = blog.length + normas.length + curiosidades.length + sketch.length;
  if (total === 0) return null;

  return (
    <EditorialCarousel
      blog={blog}
      normas={normas}
      curiosidades={curiosidades}
      sketch={sketch}
    />
  );
}
