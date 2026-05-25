import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTAINERCARDS, CARDS, INLINECARDS } from "../animations/variants";
import { useSkillSections, useKnowledgeSections } from "../../hooks/useInfoSections";

interface SkillGroup {
    readonly title: string;
    readonly color: "blue" | "purple" | "green";
    readonly items: readonly string[];
}

interface KnowledgeGroup {
    readonly title: string;
    readonly color: "blue" | "purple" | "green";
    readonly items: readonly string[];
}

const FALLBACK_SKILLS: SkillGroup[] = [
    { title: "Información", color: "blue", items: ["Wilmer Lynch - Programador Full Stack"] },
    { title: "Lenguajes", color: "purple", items: ["JavaScript", "Python"] },
    { title: "Frameworks", color: "green", items: ["React", "Django", "PHP", "Next.js"] },
    { title: "MERN de React", color: "blue", items: ["MongoDB", "Express.js", "React", "Node.js"] },
    { title: "MERN de Django", color: "blue", items: ["MongoDB + Express + React + Node.js", "Alternativa con Django: PostgreSQL + Django + React"] },
];

const FALLBACK_KNOWLEDGES: KnowledgeGroup[] = [
    { title: "📚 Librerías para React (4 años) — Estado y Gestión", color: "blue", items: ["Redux — Gestión de estado predecible", "Zustand — Gestión de estado minimalista", "React Query / TanStack Query — Estado del servidor"] },
    { title: "🧭 Ruteo", color: "purple", items: ["React Router — Ruteo para SPA", "Next.js Router — Ruteo por file-system"] },
    { title: "🎨 UI Components y Styling", color: "blue", items: ["Material-UI (MUI)", "Ant Design", "Chakra UI", "Tailwind CSS", "Styled Components"] },
    { title: "📝 Formularios", color: "purple", items: ["React Hook Form", "Formik"] },
    { title: "🧪 Testing", color: "blue", items: ["Jest", "React Testing Library"] },
    { title: "🧰 Utilidades", color: "purple", items: ["Axios", "React Spring / Framer Motion", "React Icons", "date-fns"] },
    { title: "⚙️ Librerías Django (4 años) — APIs REST", color: "blue", items: ["Django REST Framework (DRF)"] },
    { title: "🔐 Autenticación y Autorización", color: "purple", items: ["Django Allauth", "DRF Simple JWT", "Django Cors Headers"] },
    { title: "🗄️ Bases de Datos y ORM", color: "blue", items: ["Django Debug Toolbar", "Django Extensions", "Django Filter"] },
    { title: "📋 Formularios y UI", color: "purple", items: ["Django Crispy Forms"] },
    { title: "🛡️ Seguridad", color: "blue", items: ["Django Guardian"] },
    { title: "🚀 Desarrollo y Deployment", color: "purple", items: ["Django Environ", "WhiteNoise", "Django Storages"] },
    { title: "🧪 Testing (Django)", color: "blue", items: ["pytest-django"] },
    { title: "🔧 Otras Utilidades (Django)", color: "purple", items: ["Celery", "Django Redis"] },
    { title: "💼 ¿A qué me dedico?", color: "purple", items: ["Creación de páginas web", "Administrador de servidores", "Creación de bots de Telegram", "Automatización de procesos (n8n)", "Integraciones: web + automatización + feedback por Telegram"] },
    { title: "📖 ¿Cómo aprendí?", color: "blue", items: ["Autodidacta: videos, libros y práctica", "Canales: HolaMundoDev, mouredev, ProgramadorX, soydalto, Platzi, FaztTech"] },
    { title: "📚 Libros", color: "purple", items: ["Patterns of Enterprise Application Architecture — Martin Fowler", "JavaScript: The Good Parts — Douglas Crockford", "Clean Architecture — Robert C. Martin", "The Clean Coder — Robert C. Martin", "Atomic Habits — James Clear", "The Linux Programming Interface — Michael Kerrisk", "Clean Code — Robert C. Martin"] },
    { title: "✍️ ¿Cómo me gusta escribir el código?", color: "blue", items: ["Entender primero el problema", "Definir los requisitos", "Planificar la solución", "Aplicar Principios SOLID y Clean Code", "Practicar patrones de diseño", "Manejo de errores robusto"] },
    { title: "🎯 ¿A dónde quiero llegar? (Especialización)", color: "purple", items: ["Creación de E-commerce", "Frameworks: React (conocimientos), Next.js (conocimientos)", "Frameworks: Vue.js + Nuxt.js (sin conocimientos)", "Frameworks: Angular (sin conocimientos)", "Frameworks: Svelte + SvelteKit (sin conocimientos)"] },
    { title: "🛒 Librerías específicas e-commerce", color: "blue", items: ["Shopify Storefront API (para React) — con conocimientos", "Commerce.js — sin conocimientos"] },
];

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

const KnowledgeTimelineItem: React.FC<{ readonly item: KnowledgeGroup; readonly index: number }> = ({ item, index }) => {
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
        <motion.li className="group relative" variants={INLINECARDS} custom={index}>
            <motion.div
                ref={containerRef}
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-400/60"
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
                                className="space-y-1.5"
                                aria-hidden={!isOpen}
                            >
                                {item.items.map((detail, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 group/item"
                                        whileHover={{ x: 2 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                    >
                                        <span className="text-blue-400 mt-0.5 flex-shrink-0 group-hover/item:text-blue-300 transition-colors">▸</span>
                                        <span className="group-hover/item:text-white transition-colors">{detail}</span>
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
    const data: SkillGroup[] = skills.length > 0
        ? skills.map(s => ({ title: s.title, color: s.color, items: s.items }))
        : FALLBACK_SKILLS;

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
                            <SkillGroupCard key={index} group={group} index={index} />
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.article>
    );
};

export const ExpAndTecnologies: React.FC = () => {
    const { knowledges, isLoading } = useKnowledgeSections();
    const data: KnowledgeGroup[] = knowledges.length > 0
        ? knowledges.map(k => ({ title: k.title, color: k.color, items: k.items }))
        : FALLBACK_KNOWLEDGES;

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
                Tecnologías y Experiencia
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
                        <KnowledgeTimelineItem key={index} item={item} index={index} />
                    ))}
                </motion.ul>
            )}
        </motion.article>
    );
};
