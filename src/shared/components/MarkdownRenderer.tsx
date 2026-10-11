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
          pre(props) {
            const { children, node: _node, ...rest } = props;
            const childProps = React.isValidElement(children) ? (children.props as { className?: string }) : null;
            const childClass = childProps?.className || '';

            // If the code block is a mermaid diagram, avoid wrapping it in a <pre> element
            if (/language-mermaid/.test(childClass)) {
              return <div className="my-6 overflow-x-auto">{children}</div>;
            }

            return (
              <pre
                className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto my-4 border border-slate-800 font-mono text-sm leading-relaxed"
                {...rest}
              >
                {children}
              </pre>
            );
          },
          code(props) {
            const { children, className, node: _node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            if (language === 'mermaid') {
              return (
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center p-8 rounded-xl bg-slate-800/10 border border-slate-800/20 animate-pulse">
                      <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      <span className="ml-3 text-sm opacity-60">Cargando motor de diagramas...</span>
                    </div>
                  }
                >
                  <MermaidBlock code={codeString} />
                </Suspense>
              );
            }

            const isInline = !className && !String(children).endsWith('\n');

            if (isInline) {
              return (
                <code
                  className="bg-slate-800/10 dark:bg-slate-800/40 text-purple-600 dark:text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono font-medium"
                  {...rest}
                >
                  {children}
                </code>
              );
            }

            return (
              <code className={`text-sm font-mono ${className || ''}`} {...rest}>
                {children}
              </code>
            );
          },
          h1: ({ node: _node, ...props }) => (
            <h1 className="mt-8 mb-4 font-bold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2" {...props} />
          ),
          h2: ({ node: _node, ...props }) => (
            <h2 className="mt-6 mb-3 font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-1" {...props} />
          ),
          h3: ({ node: _node, ...props }) => (
            <h3 className="mt-5 mb-2 font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-200" {...props} />
          ),
          p: ({ node: _node, ...props }) => (
            <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed" {...props} />
          ),
          a: ({ node: _node, ...props }) => (
            <a
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ node: _node, ...props }) => (
            <ul className="list-disc pl-5 mb-4 space-y-1.5 text-slate-700 dark:text-slate-300" {...props} />
          ),
          ol: ({ node: _node, ...props }) => (
            <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-slate-700 dark:text-slate-300" {...props} />
          ),
          li: ({ node: _node, ...props }) => <li className="pl-1" {...props} />,
          blockquote: ({ node: _node, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50/60 dark:bg-blue-950/20 text-slate-700 dark:text-slate-300 rounded-r-lg italic" {...props} />
          ),
          table: ({ node: _node, ...props }) => (
            <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-xl">
              <table className="w-full text-left border-collapse text-sm" {...props} />
            </div>
          ),
          th: ({ node: _node, ...props }) => (
            <th className="border-b border-slate-200 dark:border-slate-800 p-3 font-semibold bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100" {...props} />
          ),
          td: ({ node: _node, ...props }) => (
            <td className="border-b border-slate-100 dark:border-slate-800/50 p-3 text-slate-700 dark:text-slate-300" {...props} />
          ),
          hr: ({ node: _node, ...props }) => (
            <hr className="border-slate-200 dark:border-slate-800 my-8" {...props} />
          ),
        }}
      >
        {markdown || ''}
      </ReactMarkdown>
    </div>
  );
};
