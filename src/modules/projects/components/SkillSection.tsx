import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSkillSections } from "../hooks/useInfoSections";
import type { SkillGroup } from "../../../types/types";

const COLOR_CONFIG = {
    blue: {
        bg: 'bg-blue-400',
        shadow: 'shadow-blue-400/50',
        gradient: 'from-blue-400 to-blue-300',
        textColor: 'text-blue-400',
        textHoverColor: 'group-hover/skill:text-blue-300'
    },
    purple: {
        bg: 'bg-purple-400',
        shadow: 'shadow-purple-400/50',
        gradient: 'from-purple-400 to-purple-300',
        textColor: 'text-purple-400',
        textHoverColor: 'group-hover/skill:text-purple-300'
    },
    green: {
        bg: 'bg-green-400',
        shadow: 'shadow-green-400/50',
        gradient: 'from-green-400 to-green-300',
        textColor: 'text-green-400',
        textHoverColor: 'group-hover/skill:text-green-300'
    }
} as const;

const SkillGroupCard: React.FC<{ readonly group: SkillGroup; readonly index: number }> = ({ group, index }) => {
    const currentColor = COLOR_CONFIG[group.color] ?? COLOR_CONFIG.blue;
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Floating animation
        gsap.to(contentRef.current, {
            y: -2,
            duration: 4.5 + (index % 3) * 0.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: cardRef });

    const handleMouseEnter = () => {
        gsap.to(cardRef.current, { y: -3, scale: 1.02, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    };

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="skill-card relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] min-w-0 break-words overflow-hidden opacity-0 translate-y-5"
        >
            <div className={`absolute -top-2 -right-2 w-3 h-3 rounded-full ${currentColor.bg} shadow-lg ${currentColor.shadow}`} />
            <div
                ref={contentRef}
                className="relative z-10 transform-gpu will-change-transform"
            >
                <h3 className={`font-semibold text-sm md:text-base mb-2.5 bg-gradient-to-r ${currentColor.gradient} bg-clip-text text-transparent`}>
                    {group.title}
                </h3>
                <ul className="space-y-1">
                    {group.items.map((item, idx) => (
                        <li
                            key={idx}
                            className="skill-item flex items-start gap-1.5 text-xs md:text-sm text-slate-300 group/skill cursor-default"
                            onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 2, duration: 0.3, ease: "elastic.out(1, 0.3)" })}
                            onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" })}
                        >
                            <span className={`mt-0.5 flex-shrink-0 transition-colors ${currentColor.textColor} ${currentColor.textHoverColor}`}>•</span>
                            <span className="group-hover/skill:text-white transition-colors">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export const SkillSection: React.FC = () => {
    const { skills, isLoading } = useSkillSections();
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!isLoading && skills.length > 0) {
            gsap.to(".skill-card", {
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
    }, [isLoading, skills]);

    return (
        <article ref={containerRef} className="w-full min-w-0">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-3">
                Información
            </h2>
            <div className="space-y-3 text-base leading-relaxed">
                <p className="text-justify sm:text-left text-slate-200 text-sm sm:text-base">
                    Wilmer Lynch — Programador Full Stack.
                </p>
                {isLoading ? (
                    <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        Cargando...
                    </div>
                ) : (
                    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {skills.map((group, index) => (
                            <SkillGroupCard key={group.id} group={group} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};
