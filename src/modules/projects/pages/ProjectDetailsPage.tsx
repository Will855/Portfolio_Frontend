'use client';

import React from "react";
import { useParams } from "next/navigation";
import { showInfo, hideInfo } from "../../../shared/utils/infoHandler";
import { useCards } from "../hooks/useCards";
import { useProjectContent, type ProjectContentBlock } from "../hooks/useProjectContent";
import { getStoragePublicUrl } from "../../../shared/services/supabase/supabaseStorage";
import { MarkdownRenderer } from "../../../shared/components/MarkdownRenderer";
import { useGithubReadme } from "../hooks/useGithubReadme";

const DynamicContent: React.FC<{ blocks: ProjectContentBlock[] }> = ({ blocks }) => (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-12 space-y-6">
        {blocks.map((block) => {
            if (block.type === 'text' && block.content) {
                return (
                    <div key={block.id} className="prose max-w-none text-gray-700 leading-relaxed">
                        <MarkdownRenderer markdown={block.content} />
                    </div>
                );
            }
            if (block.type === 'image') {
                const src = getStoragePublicUrl(block.content) || block.content;
                return (
                    <figure key={block.id} className="space-y-2">
                        <img
                            src={src}
                            alt={block.caption || ''}
                            className="w-full max-h-[600px] object-contain rounded-xl"
                            loading="lazy"
                        />
                        {block.caption && (
                            <figcaption className="text-sm text-gray-500 text-center">{block.caption}</figcaption>
                        )}
                    </figure>
                );
            }
            if (block.type === 'video') {
                const src = getStoragePublicUrl(block.content) || block.content;
                const isGif = block.content.endsWith('.gif');
                return (
                    <figure key={block.id} className="space-y-2">
                        {isGif ? (
                            <img
                                src={src}
                                alt={block.caption || ''}
                                className="w-full max-h-[600px] object-contain rounded-xl"
                                loading="lazy"
                            />
                        ) : (
                            <video
                                src={src}
                                className="w-full max-h-[600px] rounded-xl"
                                controls
                                muted
                                loop
                                playsInline
                            />
                        )}
                        {block.caption && (
                            <figcaption className="text-sm text-gray-500 text-center">{block.caption}</figcaption>
                        )}
                    </figure>
                );
            }
            return null;
        })}
    </div>
);

const CardDetails: React.FC = () => {
    const params = useParams();
    const id = params?.id as string;
    const { cards } = useCards();
    const { blocks, isLoading: contentLoading } = useProjectContent(id);
    const card = cards.find((c) => c.id === id);
    const codeUrl = card?.codeUrl ?? '';
    const { data: readme, isLoading: readmeLoading } = useGithubReadme(codeUrl);

    if (!id || !card) {
        return (
            <div className="error-message text-red-500 text-center p-8">
                Caso de Estudio no encontrado
            </div>
        );
    }


    const demoUrl = card.demoUrl ?? '';
    const hasDynamicContent = blocks.length > 0;
    const coverImage = card.img || card.bgImage;
    const cleanedReadme = readme ? readme.replace(/!\[.*?\]\(https?:\/\/via\.placeholder\.com\/.*?\)/gi, '') : '';

    return (
        <>
            <header
                className="header h-[50vh] sm:h-[60vh] flex justify-center items-center relative text-white bg-slate-950 overflow-hidden"
                style={
                    coverImage
                        ? {
                              backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.95)), url(${coverImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                          }
                        : undefined
                }
            >
                <div className="button flex gap-4 z-10">
                    {codeUrl && (
                        <button
                            className="info-btn border-2 px-6 py-2 font-bold relative hover:bg-white hover:text-black transition-colors"
                            onMouseOver={(e) => showInfo(e.currentTarget, "Este botón te lleva al código del proyecto.")}
                            onMouseOut={hideInfo}
                            onClick={() => window.open(codeUrl, "_blank")}
                        >
                            Código
                        </button>
                    )}
                    {demoUrl && (
                        <button
                            className="info-btn border-2 border-white px-6 py-2 font-bold relative hover:bg-white hover:text-black transition-colors"
                            onMouseOver={(e) => showInfo(e.currentTarget, "Este botón te lleva a la vista del proyecto.")}
                            onMouseOut={hideInfo}
                            onClick={() => demoUrl.startsWith('http') ? window.open(demoUrl, "_blank") : window.location.href = demoUrl}
                        >
                            Ver Proyecto
                        </button>
                    )}
                </div>
            </header>

            <div className="bg-slate-300 md:mx-6 pb-12">
                <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 pt-8">
                    {/* Caso de Estudio Fixed Narratives */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
                        {card.img && (
                            <div className="w-full h-56 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                                <img
                                    src={card.img}
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <section className="space-y-3">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 border-slate-200">
                                Descripción
                            </h2>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                                {card.description}
                            </p>
                        </section>

                        {card.problem_solved && card.problem_solved.trim().length > 0 && (
                            <section className="space-y-3">
                                <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 border-slate-200">
                                    El problema
                                </h2>
                                <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                                    {card.problem_solved}
                                </p>
                            </section>
                        )}

                        {(readmeLoading || readme || (card.architectural_doc && card.architectural_doc.trim().length > 0)) && (
                            <section className="space-y-3">
                                <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 border-slate-200">
                                    {readmeLoading || readme ? 'Documentación del Repositorio (README)' : 'Documentación de Arquitectura'}
                                </h2>
                                {readmeLoading ? (
                                    <div className="flex items-center gap-2 text-slate-500 py-4">
                                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                        Obteniendo README desde GitHub...
                                    </div>
                                ) : (
                                    <div className="prose max-w-none text-slate-800">
                                        <MarkdownRenderer markdown={cleanedReadme || card.architectural_doc} />
                                    </div>
                                )}
                            </section>
                        )}
                    </div>

                    {/* Dynamic implementation content blocks */}
                    {hasDynamicContent && (
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10">
                            <h2 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200 mb-6">
                                Detalles de la Implementación
                            </h2>
                            <DynamicContent blocks={blocks} />
                        </div>
                    )}

                    {contentLoading && (
                        <div className="flex items-center justify-center py-16">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CardDetails;
