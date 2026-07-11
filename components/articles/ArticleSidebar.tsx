'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type TOCItem = { id: string; text: string; level: number };
type Props = { toc: TOCItem[] };

export function ArticleSidebar({ toc }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 },
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[100px]">
        <div className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#9a744d]">
          Neste artigo
        </div>
        <nav aria-label="Sumário do artigo">
          <ul className="space-y-2">
            {toc.map((item) => (
              <li key={item.id} className={cn(item.level === 3 && 'pl-4')}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'block text-[0.85rem] leading-[1.4] transition-colors duration-200 hover:text-[#171411]',
                    activeId === item.id
                      ? 'font-bold text-[#9a744d]'
                      : 'text-[#756b60]',
                  )}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
