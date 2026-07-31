"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { CareerGroup, CareerItem } from "../../../types/types";
import { MarkdownRenderer } from "../../../shared/components/MarkdownRenderer";

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

interface KnowledgeTimelineItemProps {
    readonly item: CareerGroup;
    readonly index: number;
}

export const KnowledgeTimelineItem: React.FC<KnowledgeTimelineItemProps> = ({ item, index }) => {
    const currentColor = COLOR_CONFIG[item.color] ?? COLOR_CONFIG.blue;
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLUListElement>(null);
    const storageKey = `portfolio_career_${item.id}_open`;
    const [isOpen, setIsOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(storageKey) === 'true';
        }
        return false;
    });

    useEffect(() => {
        localStorage.setItem(storageKey, String(isOpen));
    }, [isOpen, storageKey]);

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
                                    <div className="text-slate-400 text-xs sm:text-sm pl-4 leading-relaxed whitespace-pre-wrap">
                                        <MarkdownRenderer markdown={detail.body} />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    );
};
