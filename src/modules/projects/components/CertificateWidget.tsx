"use client";

import React, { useState, useRef } from "react";
import { LightboxModal } from "../../../shared/components/LightboxModal";
import type { CertificateProps } from "../../../types/types";

interface CertificateWidgetProps {
    readonly certificate: CertificateProps;
    readonly className?: string;
}

export const CertificateWidget: React.FC<CertificateWidgetProps> = ({ certificate, className = "" }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);

    return (
        <div 
            ref={widgetRef}
            className={`relative bg-slate-900/75 rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden group ${className}`}
        >
            {/* Background glowing gradients */}
            <div className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/15 transition-all duration-500" />
            <div className="absolute -left-24 -top-24 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/15 transition-all duration-500" />

            <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
                {/* Certificate info */}
                <div className="flex-1 space-y-4 text-left w-full">
                    <div className="flex items-center gap-2">
                        {certificate.type_badge && (
                            <span className="px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-blue-300 bg-blue-500/15 border border-blue-500/30 rounded-full uppercase tracking-wider">
                                {certificate.type_badge}
                            </span>
                        )}
                        {certificate.status_badge && (
                            <span className="px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-purple-300 bg-purple-500/15 border border-purple-500/30 rounded-full uppercase tracking-wider">
                                {certificate.status_badge}
                            </span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-blue-300 transition-colors">
                            {certificate.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium">
                            Avalado por <span className="text-white font-semibold">{certificate.issuer}</span> • Distribuido por <span className="text-white font-semibold">{certificate.provider}</span>
                        </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {certificate.description}
                    </p>

                    {certificate.tags && certificate.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                            {certificate.tags.map((badge: string, idx: number) => (
                                <span 
                                    key={idx} 
                                    className="text-[10px] sm:text-xs text-slate-200 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Certificate Image Frame */}
                {certificate.img && (
                    <div className="w-full max-w-sm md:max-w-none md:w-64 flex-shrink-0 mx-auto md:mx-0">
                        <button
                            onClick={() => setIsLightboxOpen(true)}
                            className="relative w-full rounded-xl border border-white/10 overflow-hidden shadow-lg group/img focus:outline-none focus:ring-2 focus:ring-blue-400/60 block cursor-zoom-in"
                            aria-label={`Ampliar certificado de ${certificate.issuer}`}
                        >
                            {/* Overlay hover effect */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                                <div className="bg-slate-900/80 rounded-full p-2.5 border border-white/20 transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637zM10.5 7.5v6m3-3h-6" />
                                    </svg>
                                </div>
                            </div>

                            <img 
                                src={certificate.img} 
                                alt={certificate.title} 
                                className="w-full aspect-[4/3] object-cover object-top transform group-hover/img:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                        </button>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && certificate.img && (
                <LightboxModal 
                    src={certificate.img} 
                    onClose={() => setIsLightboxOpen(false)} 
                />
            )}
        </div>
    );
};
