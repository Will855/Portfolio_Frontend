import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTAINERCARDS, CARDS, INLINECARDS } from "../../../shared/utils/variants";
import { useSkillSections, useKnowledgeSections } from "../hooks/useInfoSections";

interface SkillGroup {
    readonly id: string;
    readonly title: string;
    readonly color: "blue" | "purple" | "green";
    readonly items: readonly string[];
}

interface CareerItem {
    readonly title: string;
    readonly body: string;
}

interface CareerGroup {
    readonly id: string;
    readonly title: string;
    readonly color: "blue" | "purple" | "green";
    readonly items: readonly CareerItem[];
}

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

    return (
        <motion.div
            className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] min-w-0 break-words overflow-hidden"
            variants={CARDS}
            whileHover={{ y: -3, scale: 1.02 }}
            custom={index}
        >
            <div className={`absolute -top-2 -right-2 w-3 h-3 rounded-full ${currentColor.bg} shadow-lg ${currentColor.shadow}`} />
            <motion.div
                className="relative z-10 transform-gpu will-change-transform"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 4.5 + (index % 3) * 0.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
                <h3 className={`font-semibold text-sm md:text-base mb-2.5 bg-gradient-to-r ${currentColor.gradient} bg-clip-text text-transparent`}>
                    {group.title}
                </h3>
                <ul className="space-y-1">
                    {group.items.map((item, idx) => (
                        <motion.li
                            key={idx}
                            className="flex items-start gap-1.5 text-xs md:text-sm text-slate-300 group/skill"
                            whileHover={{ x: 2 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <span className={`mt-0.5 flex-shrink-0 transition-colors ${currentColor.textColor} ${currentColor.textHoverColor}`}>•</span>
                            <span className="group-hover/skill:text-white transition-colors">{item}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
};

const KnowledgeTimelineItem: React.FC<{ readonly item: CareerGroup; readonly index: number }> = ({ item, index }) => {
    const currentColor = COLOR_CONFIG[item.color] ?? COLOR_CONFIG.blue;
    const containerRef = useRef<HTMLDivElement>(null);
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

    return (
        <motion.li className="group relative animate-gpu" variants={INLINECARDS} custom={index}>
            <motion.div
                ref={containerRef}
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-400/60 cursor-pointer"
                whileHover={{ y: -2, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className={`absolute -top-2 -left-2 w-3 h-3 rounded-full ${currentColor.bg} shadow-lg ${currentColor.shadow}`} />
                <motion.div
                    className="relative z-10 transform-gpu will-change-transform"
                    animate={{ y: [0, -1.5, 0] }}
                    transition={{ duration: 5 + (index % 3) * 0.7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                >
                    <h3 className="text-sm sm:text-base font-semibold mb-2.5 text-white pr-4 leading-snug">
                        {item.title}
                    </h3>
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.ul
                                key="details"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="space-y-3 mt-3 border-t border-white/5 pt-3"
                                aria-hidden={!isOpen}
                            >
                                {item.items.map((detail, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="flex flex-col gap-1 text-xs sm:text-sm text-slate-300 group/item border-l-2 border-blue-500/30 pl-3 pb-3 last:pb-0"
                                        whileHover={{ x: 2 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-blue-400 group-hover/item:text-blue-300 transition-colors">▸</span>
                                            <strong className="text-white group-hover/item:text-blue-300 transition-colors font-semibold">
                                                {detail.title}
                                            </strong>
                                        </div>
                                        {detail.body && (
                                            <p className="text-slate-400 text-xs sm:text-sm pl-4 leading-relaxed whitespace-pre-wrap">
                                                {detail.body}
                                            </p>
                                        )}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </motion.li>
    );
};

export const SkillSection: React.FC = () => {
    const { skills, isLoading } = useSkillSections();
    
    // Direct mapping to type SkillGroup
    const data: SkillGroup[] = skills.map(s => ({
        id: s.id,
        title: s.title,
        color: s.color,
        items: s.items
    }));

    return (
        <motion.article
            className="w-full min-w-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={CONTAINERCARDS}
        >
            <motion.h2
                className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-3"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Información
            </motion.h2>
            <div className="space-y-3 text-base leading-relaxed">
                <motion.p
                    className="text-justify sm:text-left text-slate-200 text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Wilmer Lynch — Programador Full Stack.
                </motion.p>
                {isLoading ? (
                    <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        Cargando...
                    </div>
                ) : (
                    <motion.div
                        className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        variants={CONTAINERCARDS}
                    >
                        {data.map((group, index) => (
                            <SkillGroupCard key={group.id} group={group} index={index} />
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.article>
    );
};

export const ExpAndTecnologies: React.FC = () => {
    const { knowledges, isLoading } = useKnowledgeSections();
    
    // Direct mapping to type CareerGroup
    const data: CareerGroup[] = knowledges.map(k => ({
        id: k.id,
        title: k.title,
        color: k.color,
        items: k.items as CareerItem[]
    }));

    return (
        <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={CONTAINERCARDS}
        >
            <motion.h2
                className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Carrera y Experiencia
            </motion.h2>
            {isLoading ? (
                <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    Cargando...
                </div>
            ) : (
                <motion.ul
                    className="mt-4 space-y-4 sm:space-y-5 grid gap-4 sm:gap-5 lg:grid-cols-2"
                    variants={CONTAINERCARDS}
                >
                    {data.map((item, index) => (
                        <KnowledgeTimelineItem key={item.id} item={item} index={index} />
                    ))}
                </motion.ul>
            )}
        </motion.article>
    );
};
