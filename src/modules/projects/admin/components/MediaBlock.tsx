import React from 'react';
import { LocalBlock } from '../../hooks/useAdminProjectContent';

interface MediaBlockProps {
    readonly block: LocalBlock;
    readonly index: number;
    readonly totalBlocks: number;
    readonly updateBlock: (index: number, data: Partial<LocalBlock>) => void;
    readonly handleFileChange: (index: number, file: File | null) => void;
    readonly moveBlock: (index: number, direction: 'up' | 'down') => void;
    readonly removeBlock: (index: number) => void;
}

export const MediaBlock: React.FC<MediaBlockProps> = ({
    block,
    index,
    totalBlocks,
    updateBlock,
    handleFileChange,
    moveBlock,
    removeBlock
}) => {
    const isVideo = block.type === 'video';
    const acceptFormats = isVideo ? ".gif,.mp4,.webm" : ".webp,.jpg,.jpeg,.png";
    const headerColor = isVideo ? "bg-purple-500/20 text-purple-300" : "bg-emerald-500/20 text-emerald-300";
    const headerText = isVideo ? "Video" : "Imagen";

    return (
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Block header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${headerColor}`}>
                    {headerText}
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
            <div className="p-4 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <input
                            type="file"
                            accept={acceptFormats}
                            onChange={(e) => handleFileChange(index, e.target.files?.[0] ?? null)}
                            className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                                       file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                                       file:font-medium file:cursor-pointer hover:file:bg-white/15
                                       file:transition-all cursor-pointer"
                        />
                        <p className="text-xs text-slate-500 mt-1">Formatos: {acceptFormats.replace(/\./g, ' ')}</p>
                    </div>
                    {block.previewUrl && (
                        isVideo && !(block.previewUrl.endsWith('.gif') || block.file?.name.endsWith('.gif')) ? (
                            <video
                                src={block.previewUrl}
                                className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl object-cover border border-white/10"
                                muted
                                loop
                                autoPlay
                                playsInline
                            />
                        ) : (
                            <img
                                src={block.previewUrl}
                                alt="Preview"
                                className="w-32 h-24 sm:w-40 sm:h-28 rounded-xl object-cover border border-white/10"
                            />
                        )
                    )}
                </div>
                <input
                    value={block.caption || ''}
                    onChange={(e) => updateBlock(index, { caption: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10
                               text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                               focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                    placeholder={`Pie de ${isVideo ? 'video' : 'imagen'} (opcional)`}
                />
            </div>
        </div>
    );
};
