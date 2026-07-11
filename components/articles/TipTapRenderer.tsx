import React from 'react';
import Link from 'next/link';

type Mark = { type: string; attrs?: Record<string, any> };

type Node = {
  type: string;
  attrs?: Record<string, any>;
  content?: Node[];
  text?: string;
  marks?: Mark[];
};

type Props = { content: any };

export function TipTapRenderer({ content }: Props) {
  if (!content) return null;
  return <div className="article-body">{renderNode(content, 'root')}</div>;
}

function renderNode(
  node: Node | Node[] | any,
  keyPrefix: string | number,
): React.ReactNode {
  if (node == null) return null;

  if (Array.isArray(node)) {
    return node.map((n, i) => (
      <React.Fragment key={`${keyPrefix}-${i}`}>
        {renderNode(n, `${keyPrefix}-${i}`)}
      </React.Fragment>
    ));
  }

  if (node.type === 'doc' || node.type === 'content') {
    return renderNode(node.content ?? [], keyPrefix);
  }

  const children = node.content ? renderNode(node.content, keyPrefix) : null;

  switch (node.type) {
    case 'text':
      return renderText(node);

    case 'heading': {
      const level = node.attrs?.level ?? 2;
      const id = slugifyText(extractText(node));
      if (level === 1) return <h1 id={id}>{children}</h1>;
      if (level === 2) return <h2 id={id}>{children}</h2>;
      return <h3 id={id}>{children}</h3>;
    }

    case 'paragraph':
      return <p>{children}</p>;

    case 'bulletList':
      return <ul>{children}</ul>;

    case 'orderedList':
      return <ol>{children}</ol>;

    case 'listItem':
      return <li>{children}</li>;

    case 'blockquote':
      return <blockquote>{children}</blockquote>;

    case 'horizontalRule':
      return <hr />;

    case 'hardBreak':
      return <br />;

    case 'image': {
      const src = node.attrs?.src as string | undefined;
      const alt = (node.attrs?.alt as string | undefined) ?? '';
      const title = node.attrs?.title as string | undefined;
      if (!src) return null;
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full rounded-[12px] border border-[#d8c9b8]"
            loading="lazy"
          />
          {(title || alt) && (
            <figcaption className="mt-2 text-center text-[0.85rem] italic text-[#756b60]">
              {title || alt}
            </figcaption>
          )}
        </figure>
      );
    }

    default:
      return children;
  }
}

function renderText(node: Node): React.ReactNode {
  let el: React.ReactNode = node.text ?? '';
  if (!node.marks) return el;

  for (const mark of node.marks) {
    if (mark.type === 'bold') el = <strong>{el}</strong>;
    else if (mark.type === 'italic') el = <em>{el}</em>;
    else if (mark.type === 'code') el = <code>{el}</code>;
    else if (mark.type === 'link' && mark.attrs?.href) {
      const href = mark.attrs.href as string;
      const isExternal =
        /^https?:\/\//.test(href) && !href.includes('siteananoronha');
      el = isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {el}
        </a>
      ) : (
        <Link href={href}>{el}</Link>
      );
    }
  }
  return el;
}

function extractText(node: Node | any): string {
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractText).join(' ');
  if (node.type === 'text' && node.text) return node.text;
  if (node.content) return extractText(node.content);
  return '';
}

export function slugifyText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export type TOCItem = { id: string; text: string; level: number };

export function extractTOC(content: any): TOCItem[] {
  const toc: TOCItem[] = [];

  function walk(node: any) {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (
      node.type === 'heading' &&
      (node.attrs?.level === 2 || node.attrs?.level === 3)
    ) {
      const text = extractText(node);
      const id = slugifyText(text);
      if (text && id) toc.push({ id, text, level: node.attrs.level });
    }
    if (node.content) walk(node.content);
  }

  walk(content);
  return toc;
}
