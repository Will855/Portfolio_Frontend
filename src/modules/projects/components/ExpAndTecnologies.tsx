import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useKnowledgeSections } from "../hooks/useInfoSections";
import type { CareerGroup, CareerItem } from "../../../types/types";
import DOMPurify from "dompurify";
import { ALLOWED_HTML_TAGS, parseMarkdownToHtml } from "../utils/markdown";

const COLOR_CONFIG = {
    blue: {
        bg: 'bg-blue-400',
        shadow: 'shadow-blue-400/50',
    },
    purple: {
        bg: 'bg-purple-400',
        shadow: 'shadow-purple-400/50',
    },
    green: {
        bg: 'bg-green-400',
        shadow: 'shadow-green-400/50',
    }
} as const;

const KnowledgeTimelineItem: React.FC<{ readonly item: CareerGroup; readonly index: number }> = ({ item, index }) => {
    const currentColor = COLOR_CONFIG[item.color] ?? COLOR_CONFIG.blue;
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node | null;
            if (!containerRef.current || !target) return;
            if (!containerRef.current.contains(target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('touchstart', handlePointerDown);
        };
    }, []);

    useEffect(() => {
        if (isOpen) containerRef.current?.focus();
    }, [isOpen]);

    useGSAP(() => {
        // Floating animation
        gsap.to(contentRef.current, {
            y: -1.5,
            duration: 5 + (index % 3) * 0.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: containerRef });

    useGSAP(() => {
        if (isOpen && detailsRef.current) {
            gsap.fromTo(detailsRef.current, 
                { height: 0, opacity: 0 }, 
                { height: "auto", opacity: 1, duration: 0.25, ease: "power2.out" }
            );
        } else if (!isOpen && detailsRef.current) {
            gsap.to(detailsRef.current, { height: 0, opacity: 0, duration: 0.25, ease: "power2.out" });
        }
    }, [isOpen]);

    const handleMouseEnter = () => {
        gsap.to(containerRef.current, { y: -2, scale: 1.01, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        gsap.to(containerRef.current, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    };

    return (
        <li className="knowledge-card opacity-0 translate-y-5 group relative animate-gpu">
            <div
                ref={containerRef}
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-400/60 cursor-pointer"
            >
                <div className={`absolute -top-2 -left-2 w-3 h-3 rounded-full ${currentColor.bg} shadow-lg ${currentColor.shadow}`} />
                <div
                    ref={contentRef}
                    className="relative z-10 transform-gpu will-change-transform"
                >
                    <h3 className="text-sm sm:text-base font-semibold mb-2.5 text-white pr-4 leading-snug">
                        {item.title}
                    </h3>
                    
                    <ul
                        ref={detailsRef}
                        className={`space-y-3 mt-3 border-t border-white/5 pt-3 overflow-hidden ${!isOpen ? 'hidden' : ''}`}
                        aria-hidden={!isOpen}
                        style={{ display: isOpen ? 'block' : 'none' }}
                    >
                        {item.items.map((detail: CareerItem, idx: number) => (
                            <li
                                key={idx}
                                className="flex flex-col gap-1 text-xs sm:text-sm text-slate-300 group/item border-l-2 border-blue-500/30 pl-3 pb-3 last:pb-0"
                                onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 2, duration: 0.3, ease: "elastic.out(1, 0.3)" })}
                                onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" })}
                            >
                                <div className="flex items-center gap-1.5">
                                    <span className="text-blue-400 group-hover/item:text-blue-300 transition-colors">▸</span>
                                    <strong className="text-white group-hover/item:text-blue-300 transition-colors font-semibold">
                                        {detail.title}
                                    </strong>
                                </div>
                                {detail.body && (
                                    <p 
                                        className="text-slate-400 text-xs sm:text-sm pl-4 leading-relaxed whitespace-pre-wrap"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                parseMarkdownToHtml(detail.body),
                                                { 
                                                    ALLOWED_TAGS: ALLOWED_HTML_TAGS,
                                                    ALLOWED_ATTR: ['href', 'class', 'target', 'rel']
                                                }
                                            )
                                        }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    );
};

interface LightboxModalProps {
    readonly src: string;
    readonly onClose: () => void;
}

const LightboxModal: React.FC<LightboxModalProps> = ({ src, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Overlay fade in
        gsap.fromTo(modalRef.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        // Content scale and fade in
        gsap.fromTo(contentRef.current, 
            { scale: 0.9, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.5)" }
        );
    }, { scope: modalRef });

    const handleClose = () => {
        gsap.to(contentRef.current, { 
            scale: 0.9, 
            opacity: 0, 
            duration: 0.2, 
            ease: "power2.in" 
        });
        gsap.to(modalRef.current, { 
            opacity: 0, 
            duration: 0.25, 
            ease: "power2.in",
            onComplete: onClose 
        });
    };

    // ESC key and scroll lock
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        
        // Prevent scroll on body while open
        document.body.style.overflow = "hidden";
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div 
            ref={modalRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 cursor-zoom-out"
            onClick={handleClose}
        >
            {/* Close Button */}
            <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
                aria-label="Cerrar vista completa"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Image Wrapper */}
            <div 
                ref={contentRef}
                className="relative max-w-5xl w-full flex items-center justify-center p-2 cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <img 
                    src={src} 
                    alt="Certificado en pantalla completa" 
                    className="max-w-full max-h-[85vh] md:max-h-[88vh] object-contain rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.25)] border border-white/15"
                />
            </div>
        </div>
    );
};

const GcpCertificateWidget: React.FC = () => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);

    return (
        <div 
            ref={widgetRef}
            className="mt-8 relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden group"
        >
            {/* Background glowing gradients */}
            <div className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/15 transition-all duration-500" />
            <div className="absolute -left-24 -top-24 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/15 transition-all duration-500" />

            <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
                {/* Certificate info */}
                <div className="flex-1 space-y-4 text-left w-full">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full uppercase tracking-wider">
                            Certificación
                        </span>
                        <span className="px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full uppercase tracking-wider">
                            En Preparación
                        </span>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-blue-300 transition-colors">
                            Google Cloud Associate Cloud Engineer
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 font-medium">
                            Avalado por <span className="text-white">Google Cloud</span> • Distribuido por <span className="text-white">Coursera</span>
                        </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Programa de preparación oficial centrado en la implementación, diseño, planificación y configuración de soluciones de infraestructura y servicios de almacenamiento, computación y red en Google Cloud Platform (GCP).
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                        {["GCP", "Cloud Infrastructure", "Kubernetes", "IAM", "VPC Networks", "Compute Engine"].map((badge, idx) => (
                            <span 
                                key={idx} 
                                className="text-[10px] sm:text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 hover:border-white/10 hover:bg-white/10 transition-colors"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Certificate Image Frame */}
                <div className="w-full max-w-sm md:max-w-none md:w-64 flex-shrink-0 mx-auto md:mx-0">
                    <button
                        onClick={() => setIsLightboxOpen(true)}
                        className="relative w-full rounded-xl border border-white/10 overflow-hidden shadow-lg group/img focus:outline-none focus:ring-2 focus:ring-blue-400/60 block cursor-zoom-in"
                        aria-label="Ampliar certificado de Google Cloud"
                    >
                        {/* Overlay hover effect */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-[1px]">
                            <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 border border-white/20 transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637zM10.5 7.5v6m3-3h-6" />
                                </svg>
                            </div>
                        </div>

                        <img 
                            src="/assets/Certificado_GCP_1.png" 
                            alt="Certificado Google Cloud Associate Cloud Engineer" 
                            className="w-full aspect-[4/3] object-cover object-top transform group-hover/img:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                    </button>
                </div>
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <LightboxModal 
                    src="/assets/Certificado_GCP_1.png" 
                    onClose={() => setIsLightboxOpen(false)} 
                />
            )}
        </div>
    );
};

export const ExpAndTecnologies: React.FC = () => {
    const { knowledges, isLoading } = useKnowledgeSections();
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!isLoading && knowledges.length > 0) {
            gsap.to(".knowledge-card", {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%"
                }
            });
        }
    }, [isLoading, knowledges]);

    return (
        <article ref={containerRef}>
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-4">
                Carrera y Experiencia
            </h2>
            {isLoading ? (
                <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    Cargando...
                </div>
            ) : (
                <>
                    <ul className="mt-4 grid gap-4 sm:gap-5 lg:grid-cols-2">
                        {knowledges.map((item, index) => (
                            <KnowledgeTimelineItem key={item.id} item={item} index={index} />
                        ))}
                    </ul>
                    <GcpCertificateWidget />
                </>
            )}
        </article>
    );
};
