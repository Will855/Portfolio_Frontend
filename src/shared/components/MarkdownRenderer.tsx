import React, { Suspense, lazy } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Lazy load the Mermaid block so it doesn't block the main bundle
const MermaidBlock = lazy(() => import('./MermaidBlock'));

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown, className = '' }) => {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Override the standard code block to support mermaid
          code(props) {
            const { children, className, node: _node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            if (language === 'mermaid') {
              return (
                <Suspense fallback={
                  <div className="flex items-center justify-center p-8 rounded-xl bg-slate-800/10 border border-slate-800/20 animate-pulse">
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-sm opacity-60">Cargando motor de diagramas...</span>
                  </div>
                }>
                  <MermaidBlock code={codeString} />
                </Suspense>
              );
            }

            // Normal inline code or other language blocks
            return match ? (
              <pre className="bg-slate-900 p-4 rounded-xl overflow-x-auto my-4 text-blue-300">
                <code className={`text-sm font-mono ${className}`} {...rest}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-slate-800/10 px-1.5 py-0.5 rounded text-sm font-mono text-blue-600 dark:text-blue-300" {...rest}>
                {children}
              </code>
            );
          },
          // Customize other standard HTML elements (only structurally, colors handled by parent prose)
          h1: ({ node: _node, ...props }) => <h1 className="mt-8 mb-4 font-bold" {...props} />,
          h2: ({ node: _node, ...props }) => <h2 className="mt-6 mb-3 font-bold" {...props} />,
          h3: ({ node: _node, ...props }) => <h3 className="mt-5 mb-2 font-bold" {...props} />,
          p: ({ node: _node, ...props }) => <p className="mb-4" {...props} />,
          a: ({ node: _node, ...props }) => <a className="text-blue-500 hover:text-blue-400 underline transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
          ul: ({ node: _node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
          ol: ({ node: _node, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
          li: ({ node: _node, ...props }) => <li className="pl-1" {...props} />,
          blockquote: ({ node: _node, ...props }) => (
            <blockquote className="border-l-4 border-blue-500/50 pl-4 py-1 my-4 bg-blue-500/5 rounded-r-lg italic" {...props} />
          ),
          table: ({ node: _node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full text-left border-collapse" {...props} />
            </div>
          ),
          th: ({ node: _node, ...props }) => <th className="border-b p-3 font-medium bg-black/5" {...props} />,
          td: ({ node: _node, ...props }) => <td className="border-b border-black/5 p-3" {...props} />,
          hr: ({ node: _node, ...props }) => <hr className="border-black/10 my-8" {...props} />,
        }}
      >
        {markdown || ''}
      </ReactMarkdown>
    </div>
  );
};
