"use client";

import React, { useEffect, useState, useId, useRef, useCallback } from 'react';

interface MermaidBlockProps {
  code: string;
}

const CUSTOM_DIAGRAM_CSS = `
  /* Global CSS overrides for Mermaid diagram legibility */
  svg {
    font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
    max-width: 100% !important;
    width: 100% !important;
    height: auto !important;
  }
  .node rect, .node circle, .node polygon, .node path {
    fill: #1e3a8a !important;
    stroke: #60a5fa !important;
    stroke-width: 2px !important;
  }
  .node .label, .node text, .node span, .node tspan, g.subgraph title, .cluster span, .cluster text, .nodeLabel {
    fill: #ffffff !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    font-size: 15px !important;
  }
  .edgeLabel, .edgeLabel text, .edgeLabel tspan, g.edgeLabel text, g.edgeLabel tspan {
    fill: #7dd3fc !important;
    color: #7dd3fc !important;
    font-weight: 600 !important;
    font-size: 13px !important;
    font-family: 'Montserrat', 'Inter', sans-serif !important;
  }
  .edgeLabel rect, g.edgeLabel rect {
    fill: #0f172a !important;
    stroke: #38bdf8 !important;
    stroke-width: 1px !important;
    opacity: 0.95 !important;
    rx: 4px;
    ry: 4px;
  }
  .edgePath path {
    stroke: #38bdf8 !important;
    stroke-width: 2px !important;
  }
  .cluster rect {
    fill: #090d16 !important;
    stroke: #3b82f6 !important;
    stroke-width: 1.5px !important;
  }
`;

const MermaidBlock: React.FC<MermaidBlockProps> = ({ code }) => {
  const [svgContent, setSvgContent]     = useState<string | null>(null);
  const [error, setError]               = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale]               = useState(1.4);
  const [translate, setTranslate]       = useState({ x: 0, y: 0 });
  const dragging  = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const containerId = `mermaid-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        if (!isMounted) return;

        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          flowchart: {
            htmlLabels: false,
            curve: 'basis',
          },
          themeVariables: {
            darkMode: true,
            background: 'transparent',
            primaryColor: '#1e3a8a',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#60a5fa',
            lineColor: '#38bdf8',
            secondaryColor: '#0f172a',
            tertiaryColor: '#0f172a',
            edgeLabelBackground: '#0f172a',
            nodeTextColor: '#ffffff',
          },
          fontSize: 14,
          securityLevel: 'loose',
        });

        let { svg } = await mermaid.render(containerId, code);

        // Inject custom CSS into the SVG string for 100% styling override
        const styleTag = `<style>${CUSTOM_DIAGRAM_CSS}</style>`;
        svg = svg.replace(/<svg([^>]*)>/, `<svg$1>${styleTag}`);

        if (isMounted) {
          setSvgContent(svg);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Mermaid render error:', err);
          setError(err?.message || 'Error rendering diagram');
        }
      }
    };

    renderDiagram();
    return () => { isMounted = false; };
  }, [code, containerId]);

  // ── Zoom controls ──────────────────────────────────────────────────────────
  const zoom = useCallback((delta: number) => {
    setScale((s) => Math.min(5, Math.max(0.5, +(s + delta).toFixed(2))));
  }, []);

  const resetView = useCallback(() => {
    setScale(1.4);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const handleOpenFullscreen = () => {
    resetView();
    setIsFullscreen(true);
  };

  // ── Drag (pan) ─────────────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, tx: translate.x, ty: translate.y };
    e.preventDefault();
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current) return;
    setTranslate({
      x: dragStart.current.tx + (e.clientX - dragStart.current.x),
      y: dragStart.current.ty + (e.clientY - dragStart.current.y),
    });
  }, []);

  const onMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [isFullscreen, onMouseMove, onMouseUp]);

  // ── Wheel zoom ─────────────────────────────────────────────────────────────
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoom(e.deltaY < 0 ? 0.15 : -0.15);
  };

  // ── Keyboard close ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ─── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="relative p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono overflow-x-auto my-6">
        <p className="font-bold mb-2">Error en el diagrama Mermaid:</p>
        <pre className="whitespace-pre-wrap bg-black/20 p-3 rounded-lg text-xs leading-relaxed border border-red-500/10 text-red-200">
          {error}
        </pre>
      </div>
    );
  }

  // ─── Loading state ─────────────────────────────────────────────────────────
  if (!svgContent) {
    return (
      <div className="flex items-center justify-center p-8 rounded-xl bg-white/5 border border-white/10 animate-pulse">
        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-sm text-slate-400">Generando diagrama...</span>
      </div>
    );
  }

  // ─── Fullscreen overlay ───────────────────────────────────────────────────
  if (isFullscreen) {
    return (
      <div
        className="mermaid-wrapper fixed inset-0 z-[9999] bg-slate-950 flex flex-col select-none"
        onWheel={onWheel}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-slate-900 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => zoom(0.25)}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-base font-bold transition-all active:scale-95"
              title="Acercar"
            >
              ＋
            </button>
            <button
              onClick={() => zoom(-0.25)}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-base font-bold transition-all active:scale-95"
              title="Alejar"
            >
              －
            </button>
            <button
              onClick={resetView}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium transition-all active:scale-95"
            >
              Restablecer (140%)
            </button>
            <span className="text-blue-400 font-mono text-xs ml-3 font-semibold">
              {Math.round(scale * 100)}%
            </span>
          </div>

          <button
            onClick={() => {
              setIsFullscreen(false);
              resetView();
            }}
            className="px-4 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-sm font-medium transition-all flex items-center gap-1.5 shadow-lg active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cerrar (Esc)
          </button>
        </div>

        {/* Diagram canvas */}
        <div className="flex-1 flex items-center justify-center overflow-hidden p-8">
          <div
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: dragging.current ? 'none' : 'transform 0.1s ease-out',
              cursor: dragging.current ? 'grabbing' : 'grab',
            }}
            onMouseDown={onMouseDown}
            className="[&_svg]:w-full [&_svg]:h-auto [&_svg]:max-w-[85vw] [&_svg]:max-h-[80vh] [&_svg]:min-w-[700px]"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>

        <p className="text-center text-slate-400 text-xs py-2.5 bg-slate-900/60 border-t border-white/5 shrink-0">
          💡 Tip: Arrastra con el ratón para mover · Usa la rueda para hacer zoom (o los botones ＋ / －)
        </p>
      </div>
    );
  }

  // ─── Inline preview ────────────────────────────────────────────────────────
  return (
    <div className="mermaid-wrapper relative group my-6">
      {/* Expand button */}
      <button
        onClick={handleOpenFullscreen}
        title="Expandir diagrama"
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity
                   p-1.5 rounded-lg bg-blue-600/80 border border-blue-400/20
                   text-white hover:bg-blue-500 shadow-lg backdrop-blur-sm cursor-pointer"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </button>

      <div
        onClick={handleOpenFullscreen}
        className="w-full overflow-x-auto rounded-2xl bg-slate-900 border border-white/10 shadow-xl p-4 sm:p-6 cursor-pointer hover:border-blue-500/40 transition-all [&_svg]:w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

export default MermaidBlock;
