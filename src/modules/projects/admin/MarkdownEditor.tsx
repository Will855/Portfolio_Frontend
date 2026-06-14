import React, { useRef, useCallback, useState } from 'react';
import DOMPurify from 'dompurify';
import { ALLOWED_HTML_TAGS, parseMarkdownToHtml } from '../utils/markdown';

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, placeholder }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const preview = previewRef.current;
    if (!textarea || !preview) return;

    const scrollPercentage = textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight);
    preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
  }, []);

  const insertMarkdown = useCallback((prefix: string, suffix: string, defaultText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || defaultText;

    const before = value.substring(0, start);
    const after = value.substring(end);

    const newValue = before + prefix + textToInsert + suffix + after;

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      const newStart = start + prefix.length;
      const newEnd = newStart + textToInsert.length;
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  }, [value, onChange]);

  const handleImportMarkdown = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.md')) {
      setError('Solo se admiten archivos Markdown (.md)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        onChange(text);
        setError(null);
      }
    };
    reader.onerror = () => {
      setError('Error al leer el archivo markdown.');
    };
    reader.readAsText(file);

    e.target.value = '';
  }, [onChange]);

  return (
    <div className="space-y-3">
      {error && (
        <div className="p-2 rounded bg-red-500/10 text-red-400 text-xs">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Editor Column */}
        <div className="flex flex-col space-y-2">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md min-h-[38px]">
            <button
              type="button"
              onClick={() => insertMarkdown('**', '**', 'Texto')}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
              title="Negrita"
            >
              Negrita
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('## ', '', 'Título')}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
              title="Título"
            >
              Título
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('```javascript\n', '\n```', '')}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
              title="Código"
            >
              Código
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('[', '](https://link.com)', 'Texto')}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
              title="Enlace"
            >
              Enlace
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('![', '](https://url-imagen.com)', 'Descripción')}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-white/90 transition-all active:scale-95"
              title="Imagen"
            >
              Imagen
            </button>
            
            <div className="h-4 w-px bg-white/10 mx-0.5" />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/40 text-[11px] font-semibold text-blue-400 transition-all flex items-center gap-1 active:scale-95"
              title="Importar archivo .md"
            >
              📥 Cargar .md
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportMarkdown}
              accept=".md"
              className="hidden"
            />
          </div>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            className="w-full h-[220px] md:h-[280px] px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                       focus:ring-1 focus:ring-blue-500/20 transition-all resize-none font-mono text-sm overflow-y-auto"
            placeholder={placeholder || "Escribe markdown..."}
          />
        </div>

        {/* Live Preview Column */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center px-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md h-[38px]">
            <span className="text-xs font-semibold text-slate-400">Previsualización en Vivo</span>
          </div>

          <div
            ref={previewRef}
            className="prose max-w-none text-slate-700 leading-relaxed font-sans bg-white p-4 rounded-xl border border-slate-200 overflow-y-auto h-[220px] md:h-[280px]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                parseMarkdownToHtml(value || '_Escribe en el editor o carga un archivo .md para previsualizar_'),
                { ALLOWED_TAGS: ALLOWED_HTML_TAGS }
              )
            }}
          />
        </div>
      </div>
    </div>
  );
};
