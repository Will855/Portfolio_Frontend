'use client';

import React, { useEffect, useRef } from 'react';

const ALLOWED_TAGS = new Set(['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'span']);

function stripUnsafeTags(html: string): string {
  // Remove script tags and event handlers entirely
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '');
}

interface SafeHtmlProps {
  html: string;
  className?: string;
}

export const SafeHtml: React.FC<SafeHtmlProps> = ({ html, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Client-side only: use DOMParser for safe sanitization
    const parser = new DOMParser();
    const doc = parser.parseFromString(stripUnsafeTags(html), 'text/html');
    // Remove disallowed tags but keep their text content
    doc.body.querySelectorAll('*').forEach((el) => {
      if (!ALLOWED_TAGS.has(el.tagName.toLowerCase())) {
        el.replaceWith(...Array.from(el.childNodes));
      }
    });
    ref.current.innerHTML = doc.body.innerHTML;
  }, [html]);

  return <div ref={ref} className={className} />;
};
