"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

import { useKnowledgeSections } from "../hooks/useInfoSections";
import { useCertificates } from "../hooks/useCertificates";
import { KnowledgeTimelineItem } from "./KnowledgeTimelineItem";
import { CertificateWidget } from "./CertificateWidget";

export const ExpAndTecnologies: React.FC = () => {
    const { knowledges, isLoading: isLoadingKnowledges } = useKnowledgeSections();
    const { certificates, isLoading: isLoadingCertificates } = useCertificates();
    const isLoading = isLoadingKnowledges || isLoadingCertificates;
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
                    {certificates.map(cert => (
                        <CertificateWidget key={cert.id} certificate={cert} />
                    ))}
                </>
            )}
        </article>
    );
};
