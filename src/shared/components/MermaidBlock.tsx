"use client";

import React, { useEffect, useState, useId } from 'react';
import { createPortal } from 'react-dom';
import { TransformWrapper, TransformComponent, useTransformEffect } from 'react-zoom-pan-pinch';

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

// Componente que muestra en tiempo real el porcentaje de zoom sin relanzar re-renders innecesarios
const ZoomIndicator: React.FC = () => {
  const [scale, setScale] = useState(1);
  useTransformEffect(({ state }) => {
    setScale(state.scale);
  });
  return (
    <span className="text-blue-400 font-mono text-xs ml-3 font-semibold select-none">
      {Math.round(scale * 100)}%
    </span>
  );
};

const MermaidBlock: React.FC<MermaidBlockProps> = ({ code }) => {
  const [svgContent, setSvgContent]     = useState<string | null>(null);
  const [error, setError]               = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerId                     = `mermaid-${useId().replace(/:/g, '')}`;

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

  // Tecla Escape para salir de pantalla completa
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    if (isFullscreen) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [isFullscreen]);

  // Calcular la escala inicial para ajustar a la pantalla sin deformar
  const getInitialFitScale = () => {
    const dims = getViewBoxDimensions(svgContent);
    if (dims && dims.w > 0 && dims.h > 0 && typeof window !== 'undefined') {
      const availableW = window.innerWidth * 0.88;
      const availableH = (window.innerHeight - 140) * 0.88;
      const fit = Math.min(1.2, Math.max(0.25, Math.min(availableW / dims.w, availableH / dims.h)));
      return Number(fit.toFixed(2));
    }
    return 1;
  };

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

  // ─── Fullscreen overlay (Powered by react-zoom-pan-pinch + React Portal) ────
  if (isFullscreen && typeof document !== 'undefined') {
    const initialFit = getInitialFitScale();

    return createPortal(
      <div className="mermaid-wrapper fixed inset-0 w-screen h-screen z-[99999] bg-slate-950 flex flex-col select-none">
        <TransformWrapper
          initialScale={initialFit}
          minScale={0.15}
          maxScale={6}
          centerOnInit
          limitToBounds={false}
          wheel={{ step: 0.08 }}
          pinch={{ step: 5 }}
          doubleClick={{ mode: 'reset' }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Toolbar */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-slate-900/95 backdrop-blur-md shrink-0 z-10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => zoomIn(0.25)}
                    className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-base font-bold transition-all active:scale-95 cursor-pointer"
                    title="Acercar"
                  >
                    ＋
                  </button>
                  <button
                    onClick={() => zoomOut(0.25)}
                    className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-base font-bold transition-all active:scale-95 cursor-pointer"
                    title="Alejar"
                  >
                    －
                  </button>
                  <button
                    onClick={() => resetTransform()}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium transition-all active:scale-95 cursor-pointer"
                    title="Ajustar diagrama al tamaño inicial"
                  >
                    Ajustar
                  </button>
                  <ZoomIndicator />
                </div>

                <button
                  onClick={() => setIsFullscreen(false)}
                  className="px-4 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-sm font-medium transition-all flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cerrar (Esc)
                </button>
              </div>

              {/* Viewport Canvas interactivo */}
              <div className="relative flex-1 w-full h-[calc(100vh-100px)] overflow-hidden bg-[#070b14] cursor-grab active:cursor-grabbing">
                <TransformComponent
                  wrapperStyle={{ width: "100%", height: "100%" }}
                  contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <div
                    className="flex items-center justify-center p-8 [&_svg]:max-w-none [&_svg]:h-auto"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                </TransformComponent>
              </div>

              <p className="text-center text-slate-400 text-xs py-2 bg-slate-900/60 border-t border-white/5 shrink-0 select-none">
                💡 Arrastra para mover · Rueda o pellizca para zoom · Doble clic para restablecer
              </p>
            </>
          )}
        </TransformWrapper>
      </div>,
      document.body
    );
  }

  // ─── Inline preview ────────────────────────────────────────────────────────
  return (
    <div className="mermaid-wrapper relative group my-6">
      {/* Botón de ampliar */}
      <button
        onClick={() => setIsFullscreen(true)}
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
        onClick={() => setIsFullscreen(true)}
        className="w-full overflow-x-auto rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl p-4 sm:p-6 cursor-pointer hover:border-blue-500/40 transition-all flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

export default MermaidBlock;
