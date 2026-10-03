"use client";

import React, { useEffect, useState, useId, useRef, useCallback } from 'react';

interface MermaidBlockProps {
  code: string;
}

const CUSTOM_DIAGRAM_CSS = `
  svg {
    font-family: 'Montserrat', system-ui, -apple-system, sans-serif !important;
  }
  .edgeLabel {
    background-color: #0f172a !important;
    color: #7dd3fc !important;
    fill: #7dd3fc !important;
    font-size: 13px !important;
  }
  .edgePath path {
    stroke: #38bdf8 !important;
    stroke-width: 2px !important;
  }
  .cluster rect {
    fill: #0b1120 !important;
    stroke: #3b82f6 !important;
    stroke-width: 1.5px !important;
  }
`;

const getViewBoxDimensions = (svgStr: string | null) => {
  if (!svgStr) return null;
  const match = svgStr.match(/viewBox=["']([0-9.-]+)\s+([0-9.-]+)\s+([0-9.-]+)\s+([0-9.-]+)["']/);
  if (match) {
    return {
      w: parseFloat(match[3]),
      h: parseFloat(match[4]),
    };
  }
  return null;
};

const MermaidBlock: React.FC<MermaidBlockProps> = ({ code }) => {
  const [svgContent, setSvgContent]     = useState<string | null>(null);
  const [error, setError]               = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale]               = useState(1);
  const [translate, setTranslate]       = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging]     = useState(false);

  const isDraggingRef = useRef(false);
  const dragStartRef  = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const canvasRef     = useRef<HTMLDivElement>(null);
  const containerId   = `mermaid-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        if (!isMounted) return;

        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            darkMode: true,
            background: 'transparent',
            primaryColor: '#1e3a8a',
            primaryTextColor: '#f8fafc',
            primaryBorderColor: '#60a5fa',
            lineColor: '#38bdf8',
            secondaryColor: '#0f172a',
            tertiaryColor: '#1e293b',
            mainBkg: '#1e3a8a',
            nodeBorder: '#60a5fa',
            nodeTextColor: '#f8fafc',
            clusterBkg: '#0b1120',
            clusterBorder: '#3b82f6',
            defaultLinkColor: '#38bdf8',
            titleColor: '#f1f5f9',
            edgeLabelBackground: '#0f172a',
            actorBkg: '#1e3a8a',
            actorBorder: '#60a5fa',
            actorTextColor: '#f8fafc',
            actorLineColor: '#38bdf8',
            signalColor: '#38bdf8',
            signalTextColor: '#f1f5f9',
            labelBoxBkgColor: '#0f172a',
            labelBoxBorderColor: '#38bdf8',
            labelTextColor: '#f1f5f9',
            fontFamily: 'Montserrat, Inter, system-ui, sans-serif',
            fontSize: '14px',
          },
          flowchart: {
            htmlLabels: false,
            curve: 'basis',
            useMaxWidth: false,
          },
          sequence: {
            useMaxWidth: false,
            actorMargin: 50,
            boxMargin: 10,
          },
          securityLevel: 'loose',
        });

        let { svg } = await mermaid.render(containerId, code);

        // Inject custom CSS into the SVG string for crisp typography and cluster borders
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

  // ── Fit & Reset ────────────────────────────────────────────────────────────
  const resetView = useCallback(() => {
    const dims = getViewBoxDimensions(svgContent);
    if (dims && dims.w > 0 && dims.h > 0) {
      const availableW = window.innerWidth * 0.9;
      const availableH = (window.innerHeight - 120) * 0.9;
      const fitScale = Math.min(1.2, Math.max(0.35, Math.min(availableW / dims.w, availableH / dims.h)));
      setScale(Number(fitScale.toFixed(2)));
    } else {
      setScale(1);
    }
    setTranslate({ x: 0, y: 0 });
  }, [svgContent]);

  const handleOpenFullscreen = () => {
    resetView();
    setIsFullscreen(true);
  };

  // ── Drag (Pan) ─────────────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      tx: translate.x,
      ty: translate.y,
    };
    e.preventDefault();
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setTranslate({
      x: dragStartRef.current.tx + dx,
      y: dragStartRef.current.ty + dy,
    });
  }, []);

  const onMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
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

  // ── Wheel Zoom with cursor tracking ─────────────────────────────────────────
  useEffect(() => {
    const el = canvasRef.current;
    if (!el || !isFullscreen) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - (rect.left + rect.width / 2);
      const mouseY = e.clientY - (rect.top + rect.height / 2);

      const factor = Math.exp(-e.deltaY * 0.002);

      setScale((prevScale) => {
        const nextScale = Math.min(6, Math.max(0.2, Number((prevScale * factor).toFixed(3))));
        const ratio = nextScale / prevScale;

        setTranslate((prev) => ({
          x: mouseX - (mouseX - prev.x) * ratio,
          y: mouseY - (mouseY - prev.y) * ratio,
        }));

        return nextScale;
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isFullscreen]);

  // ── Button Zoom ────────────────────────────────────────────────────────────
  const zoomIn = () => {
    setScale((s) => Math.min(6, Number((s * 1.25).toFixed(2))));
  };

  const zoomOut = () => {
    setScale((s) => Math.max(0.2, Number((s * 0.8).toFixed(2))));
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
      <div className="mermaid-wrapper fixed inset-0 z-[9999] bg-slate-950 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-slate-900/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={zoomIn}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-base font-bold transition-all active:scale-95 cursor-pointer"
              title="Acercar (+25%)"
            >
              ＋
            </button>
            <button
              onClick={zoomOut}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-base font-bold transition-all active:scale-95 cursor-pointer"
              title="Alejar (-20%)"
            >
              －
            </button>
            <button
              onClick={resetView}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium transition-all active:scale-95 cursor-pointer"
              title="Ajustar diagrama a la pantalla"
            >
              Ajustar pantalla
            </button>
            <span className="text-blue-400 font-mono text-xs ml-3 font-semibold">
              {Math.round(scale * 100)}%
            </span>
          </div>

          <button
            onClick={() => { setIsFullscreen(false); }}
            className="px-4 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-sm font-medium transition-all flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cerrar (Esc)
          </button>
        </div>

        {/* Diagram canvas */}
        <div
          ref={canvasRef}
          className="relative flex-1 w-full h-full overflow-hidden select-none bg-slate-950 flex items-center justify-center"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={onMouseDown}
          onDoubleClick={resetView}
        >
          <div
            style={{
              transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.08s ease-out',
            }}
            className="flex items-center justify-center [&_svg]:max-w-none [&_svg]:max-h-none"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>

        <p className="text-center text-slate-400 text-xs py-2.5 bg-slate-900/60 border-t border-white/5 shrink-0">
          💡 Arrastra para mover · Rueda del ratón para zoom · Doble clic para ajustar a pantalla
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
        title="Ampliar diagrama"
        className="absolute top-3 right-3 z-10 opacity-70 group-hover:opacity-100 transition-all
                   flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-blue-600/90 border border-white/20
                   text-white text-xs font-medium shadow-lg backdrop-blur-md cursor-pointer"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        <span>Ampliar</span>
      </button>

      <div
        onClick={handleOpenFullscreen}
        className="w-full overflow-x-auto rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl p-4 sm:p-6 cursor-pointer hover:border-blue-500/40 transition-all flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

export default MermaidBlock;
