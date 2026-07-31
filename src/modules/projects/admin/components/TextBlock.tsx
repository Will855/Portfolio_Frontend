import React from 'react';
import { LocalBlock } from '../../hooks/useAdminProjectContent';

interface TextBlockProps {
    readonly block: LocalBlock;
    readonly index: number;
    readonly totalBlocks: number;
    readonly updateBlock: (index: number, data: Partial<LocalBlock>) => void;
    readonly moveBlock: (index: number, direction: 'up' | 'down') => void;
    readonly removeBlock: (index: number) => void;
}

export const TextBlock: React.FC<TextBlockProps> = ({
    block,
    index,
    totalBlocks,
    updateBlock,
    moveBlock,
    removeBlock
}) => {
    return (
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Block header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-blue-500/20 text-blue-300">
                    Texto
                </span>
                <span className="text-xs text-slate-500">#{index + 1}</span>
                <div className="ml-auto flex items-center gap-1">
                    <button
                        onClick={() => moveBlock(index, 'up')}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10
                                 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Subir"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => moveBlock(index, 'down')}
                        disabled={index === totalBlocks - 1}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10
                                 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Bajar"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => removeBlock(index)}
                        className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Eliminar bloque"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Block body */}
            <div className="p-4">
                <textarea
                    value={block.content || ''}
                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                             text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                             focus:ring-1 focus:ring-blue-500/20 transition-all resize-y font-mono text-sm"
                    placeholder="Escribe el contenido del bloque (soporta HTML)..."
                />
            </div>
        </div>
    );
};
