/**
 * @file markdown.ts
 * @description Utilidades de procesamiento de Markdown a HTML para Casos de Estudio.
 */

export const ALLOWED_HTML_TAGS = ['pre', 'code', 'h2', 'h3', 'p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'span'];

export function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';

  // Basic markdown parser
  let html = markdown
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    // Headers (h3, h2, h1)
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Bullet points
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    // Links [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">$1</a>')
    // Line breaks
    .replace(/\n/g, '<br />');

  // Wrap bullet points in ul
  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');

  return html;
}
