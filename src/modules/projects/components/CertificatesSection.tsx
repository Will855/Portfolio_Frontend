"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCertificates } from "../hooks/useCertificates";
import { CertificateWidget } from "./CertificateWidget";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const CertificatesSection: React.FC = () => {
    const { certificates, isLoading } = useCertificates();
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!isLoading && certificates.length > 0) {
            gsap.fromTo(
                ".certificate-item",
                { opacity: 0, y: 25 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%"
                    }
                }
            );
        }
    }, [isLoading, certificates]);

    if (!isLoading && certificates.length === 0) {
        return null;
    }

    return (
        <section ref={sectionRef} className="w-full max-w-4xl mx-auto px-4 sm:px-0">
            <div className="mb-6">
                <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-2">
                    Certificaciones Profesionales
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                    Acreditaciones técnicas y credenciales oficiales en infraestructura Cloud y arquitectura de software.
                </p>
            </div>

            {isLoading ? (
                <div className="flex items-center gap-2 text-slate-400 text-sm py-8 justify-center">
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    Cargando certificaciones...
                </div>
            ) : (
                <div className="space-y-6">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="certificate-item opacity-0">
                            <CertificateWidget certificate={cert} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};
