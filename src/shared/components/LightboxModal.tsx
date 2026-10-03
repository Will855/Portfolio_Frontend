"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LightboxModalProps {
    readonly src: string;
    readonly onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ src, onClose }) => {
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

    const handleClose = useCallback(() => {
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
    }, [onClose]);

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
    }, [handleClose]);

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
                    alt="Imagen en pantalla completa" 
                    className="max-w-full max-h-[85vh] md:max-h-[88vh] object-contain rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.25)] border border-white/15"
                />
            </div>
        </div>
    );
};
