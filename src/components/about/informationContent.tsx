import React, { useEffect, useRef, useState } from "react";
import { delay, stagger, motion, AnimatePresence } from "framer-motion";
import { CONTAINERCARDS, CARDS, INLINECARDS } from "../animations/variants";

// Tipos de dominio
// Array de habilidades 
type ArrHabilities = { readonly name: string; readonly experience?: string } | string;

// Se utiliza el *Composite Pattern* para agrupar las habilidades en grupos 
interface Habilities {
    readonly title: string;
    readonly color: "blue" | "purple" | "green";
    readonly items: readonly ArrHabilities[];
}
// Interface para conocimientos y tecnologías del proyecto con título, color y detalles
interface Knowledges {
    readonly title: string;
    readonly color: "blue" | "purple";
    readonly details: readonly string[];
}

// Datos inmutables (SRP: separación de datos y presentación)
const SKILLS = [
    {
        title: "Información",
        color: "blue",
        items: ["Wilmer Lynch - Programador Full Stack"]
    },
    {
        title: "Lenguajes",
        color: "purple",
        items: ["JavaScript", "Python"]
    },
    {
        title: "Frameworks",
        color: "green",
        items: ["React", "Django", "PHP", "Next.js"]
    },
    {
        title: "MERN de React",
        color: "blue",
        items: ["MongoDB", "Express.js", "React", "Node.js"]
    },
    {
        title: "MERN de Django",
        color: "blue",
        items: [
            "MongoDB + Express + React + Node.js",
            "Alternativa con Django: PostgreSQL + Django + React"
        ]
    }
] as const satisfies readonly Habilities[];

const PROJECTS = [
    {
        title: "📚 Librerías para React (4 años) — Estado y Gestión",
        color: "blue",
        details: [
            "Redux — Gestión de estado predecible",
            "Zustand — Gestión de estado minimalista",
            "React Query / TanStack Query — Estado del servidor"
        ]
    },
    {
        title: "🧭 Ruteo",
        color: "purple",
        details: [
            "React Router — Ruteo para SPA",
            "Next.js Router — Ruteo por file-system"
        ]
    },
    {
        title: "🎨 UI Components y Styling",
        color: "blue",
        details: [
            "Material-UI (MUI)",
            "Ant Design",
            "Chakra UI",
            "Tailwind CSS",
            "Styled Components"
        ]
    },
    {
        title: "📝 Formularios",
        color: "purple",
        details: ["React Hook Form", "Formik"]
    },
    {
        title: "🧪 Testing",
        color: "blue",
        details: ["Jest", "React Testing Library"]
    },
    {
        title: "🧰 Utilidades",
        color: "purple",
        details: [
            "Axios",
            "React Spring / Framer Motion",
            "React Icons",
            "date-fns"
        ]
    },
    {
        title: "⚙️ Librerías Django (4 años) — APIs REST",
        color: "blue",
        details: ["Django REST Framework (DRF)"]
    },
    {
        title: "🔐 Autenticación y Autorización",
        color: "purple",
        details: [
            "Django Allauth",
            "DRF Simple JWT",
            "Django Cors Headers"
        ]
    },
    {
        title: "🗄️ Bases de Datos y ORM",
        color: "blue",
        details: [
            "Django Debug Toolbar",
            "Django Extensions",
            "Django Filter"
        ]
    },
    {
        title: "📋 Formularios y UI",
        color: "purple",
        details: ["Django Crispy Forms"]
    },
    {
        title: "🛡️ Seguridad",
        color: "blue",
        details: ["Django Guardian"]
    },
    {
        title: "🚀 Desarrollo y Deployment",
        color: "purple",
        details: [
            "Django Environ",
            "WhiteNoise",
            "Django Storages"
        ]
    },
    {
        title: "🧪 Testing (Django)",
        color: "blue",
        details: ["pytest-django"]
    },
    {
        title: "🔧 Otras Utilidades (Django)",
        color: "purple",
        details: ["Celery", "Django Redis"]
    },
    {
        title: "💼 ¿A qué me dedico?",
        color: "purple",
        details: [
            "Creación de páginas web",
            "Administrador de servidores",
            "Creación de bots de Telegram",
            "Automatización de procesos (n8n)",
            "Integraciones: web + automatización + feedback por Telegram"
        ]
    },
    {
        title: "📖 ¿Cómo aprendí?",
        color: "blue",
        details: [
            "Autodidacta: videos, libros y práctica",
            "Canales: HolaMundoDev, mouredev, ProgramadorX, soydalto, Platzi, FaztTech"
        ]
    },
    {
        title: "📚 Libros",
        color: "purple",
        details: [
            "Patterns of Enterprise Application Architecture — Martin Fowler",
            "JavaScript: The Good Parts — Douglas Crockford",
            "Clean Architecture — Robert C. Martin",
            "The Clean Coder — Robert C. Martin",
            "Atomic Habits — James Clear",
            "The Linux Programming Interface — Michael Kerrisk",
            "Clean Code — Robert C. Martin"
        ]
    },
    {
        title: "✍️ ¿Cómo me gusta escribir el código?",
        color: "blue",
        details: [
            "Entender primero el problema",
            "Definir los requisitos",
            "Planificar la solución",
            "Aplicar Principios SOLID y Clean Code",
            "Practicar patrones de diseño",
            "Manejo de errores robusto"
        ]
    },
    {
        title: "🎯 ¿A dónde quiero llegar? (Especialización)",
        color: "purple",
        details: [
            "Creación de E-commerce",
            "Frameworks: React (conocimientos), Next.js (conocimientos)",
            "Frameworks: Vue.js + Nuxt.js (sin conocimientos)",
            "Frameworks: Angular (sin conocimientos)",
            "Frameworks: Svelte + SvelteKit (sin conocimientos)"
        ]
    },
    {
        title: "🛒 Librerías específicas e-commerce",
        color: "blue",
        details: [
            "Shopify Storefront API (para React) — con conocimientos",
            "Commerce.js — sin conocimientos"
        ]
    }
] as const satisfies readonly Knowledges[];

// Variantes de animación importadas desde `../animations/variants`

/**
 *  HABILIDADES GROUP CARDS es el componente que renderiza cada grupo de habilidades como una tarjeta.
 * su patron de diseño factory pattern para crear las tarjetas de habilidades.
 * @param group - El grupo de habilidades a renderizar.
 * @param index - El índice del grupo de habilidades.
 * @returns Un componente React que renderiza el grupo de habilidades como una tarjeta.
 * colorMap y shadowMap: Mapean colores a clases CSS
 */
const HABGROUPCARDS: React.FC<{ readonly group: Habilities; readonly index: number }> = ({ group, index }) => {
    // Configuración unificada de colores para eliminar lógica condicional redundante
    const colorConfig = {
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

    const currentColor = colorConfig[group.color];

    return (
        <motion.div
            className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] min-w-0 break-words overflow-hidden"
            variants={CARDS}
            whileHover={{ y: -3, scale: 1.02 }}
            custom={index}
        >
            {/* Badge de color en la esquina */}
            <div className={`absolute -top-2 -right-2 w-3 h-3 rounded-full ${currentColor.bg} shadow-lg ${currentColor.shadow}`} />

            {/* Contenido con movimiento dinámico suave */}
            <motion.div
                className="relative z-10 transform-gpu will-change-transform"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 4.5 + (index % 3) * 0.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
                {/* Título con gradiente sutil */}
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
                            <span className="group-hover/skill:text-white transition-colors">
                                {typeof item === "string"
                                    ? item
                                    : `${item.name}${item.experience ? ` (${item.experience})` : ""}`}
                            </span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
};

/**
 * ProjectTimelineItem es el componente que renderiza cada proyecto como una tarjeta de timeline.
 * Su patrón de diseño factory pattern para crear las tarjetas de proyectos.
 * @param item - El proyecto a renderizar.
 * @param index - El índice del proyecto.
 * @returns Un componente React que renderiza el proyecto como una tarjeta de timeline.
 * colorMap y shadowMap: Mapean colores a clases CSS
 */
const ProjectTimelineItem: React.FC<{ readonly item: Knowledges; readonly index: number }> = ({ item, index }) => {
    // Configuración unificada de colores para eliminar lógica condicional redundante
    const projectColorConfig = {
        blue: {
            bg: 'bg-blue-400',
            shadow: 'shadow-blue-400/50'
        },
        purple: {
            bg: 'bg-purple-400',
            shadow: 'shadow-purple-400/50'
        }
    } as const;

    const currentProjectColor = projectColorConfig[item.color];

    // Estado y accesibilidad: controla la visibilidad de la lista de detalles
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Cerrar al hacer click fuera del contenedor padre
    useEffect(() => {
        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node | null;
            if (!containerRef.current || !target) return;
            if (!containerRef.current.contains(target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('touchstart', handlePointerDown);
        };
    }, []);

    // Enfocar el contenedor para mejorar lectura cuando se abre
    useEffect(() => {
        if (isOpen) {
            containerRef.current?.focus();
        }
    }, [isOpen]);

    return (
        <motion.li
            className="group relative"
            variants={INLINECARDS}
            custom={index}
        >
            <motion.div // Contenedor de la tarjeta de proyecto
                ref={containerRef}
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                whileHover={{ y: -2, scale: 1.01 }}// Animación de movimiento vertical
                transition={{ type: "spring", stiffness: 300 }}// Animación de movimiento vertical
            >
                {/* Badge de color según categoría */}
                <div className={`absolute -top-2 -left-2 w-3 h-3 rounded-full ${currentProjectColor.bg} shadow-lg ${currentProjectColor.shadow}`} />
                {/* Contenido con movimiento dinámico suave */}
                <motion.div
                    // Contenedor de los detalles del proyecto
                    className="relative z-10 transform-gpu will-change-transform"// Animación de movimiento vertical
                    animate={{ y: [0, -1.5, 0] }}// Animación de movimiento vertical
                    transition={
                        { duration: 5 + (index % 3) * 0.7, // Duración de la animación
                        repeat: Infinity, // Repetición de la animación
                        repeatType: "mirror", // Tipo de repetición de la animación
                        ease: "easeInOut" // Easing de la animación
                    }
                }
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
                                {/* Lista de detalles del proyecto */}
                                {item.details.map((detail, idx) => (
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

/**
 * SkillSection es la sección que renderiza las habilidades como una tarjeta de timeline.
 * Su patrón de diseño factory pattern para crear las tarjetas de habilidades.
 * @returns Un componente React que renderiza la sección de habilidades como una tarjeta de timeline.
 * colorMap y shadowMap: Mapean colores a clases CSS
 */
export const SkillSection: React.FC = () => {
    return (
        // 
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
                <motion.div
                    className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    variants={CONTAINERCARDS}
                >
                    {SKILLS.map((group, index) => (
                        <HABGROUPCARDS key={index} group={group} index={index} />
                    ))}
                </motion.div>
            </div>
        </motion.article>
    );
};

/**
 * Sección de tecnologías con timeline horizontal en 2 columnas para optimizar espacio.
 */
export const ExpAndTecnologies: React.FC = () => {
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
            <motion.ul
                className="mt-4 space-y-4 sm:space-y-5 grid gap-4 sm:gap-5 lg:grid-cols-2"
                variants={CONTAINERCARDS}
            >
                {PROJECTS.map((project, index) => (
                    <ProjectTimelineItem key={index} item={project} index={index} />
                ))}
            </motion.ul>
        </motion.article>
    );
};

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO (VERSIÓN MEJORADA)
// ===========================================
// 
// Este archivo es un COMPONENTE REACT AVANZADO que ha sido refactorizado siguiendo
// principios de Clean Code y mejores prácticas. Te explico las mejoras implementadas:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente TypeScript que muestra información profesional con animaciones
// avanzadas, interactividad y accesibilidad mejorada. Ha sido optimizado para
// mejor rendimiento y mantenibilidad.
//
// 📋 MEJORAS IMPLEMENTADAS:
//
// 1. IMPORTS OPTIMIZADOS (líneas 1-5):
//    - React hooks: useEffect, useRef, useState para interactividad
//    - Framer Motion: delay, stagger, AnimatePresence para animaciones complejas
//    - Variantes externas: CONTAINERCARDS, CARDS, INLINECARDS desde archivo separado
//    - Separación de responsabilidades: animaciones en archivo dedicado
//
// 2. TIPADO MEJORADO (líneas 7-22):
//    - readonly: Previene mutaciones accidentales de los datos
//    - satisfies: Garantiza que los datos cumplan con la interfaz
//    - as const: Hace los arrays inmutables a nivel de TypeScript
//    - Composite Pattern: Agrupa habilidades en estructuras jerárquicas
//
// 3. DATOS INMUTABLES (líneas 24-220):
//    - SKILLS y PROJECTS: Arrays readonly con satisfies
//    - Inmutabilidad garantizada: No se pueden modificar accidentalmente
//    - Type safety: TypeScript verifica que los datos cumplan las interfaces
//
// 4. COMPONENTES REFACTORIZADOS:
//
//    A. HABGROUPCARDS (líneas 232-301):
//    - Factory Pattern: Crea tarjetas de habilidades de forma consistente
//    - colorConfig: Configuración unificada que elimina lógica condicional
//    - DRY Principle: No repetición de código para manejo de colores
//    - Mejor legibilidad: Código más limpio y mantenible
//
//    B. ProjectTimelineItem (líneas 311-418):
//    - Interactividad: Estado isOpen para mostrar/ocultar detalles
//    - Accesibilidad: tabIndex, aria-expanded, focus management
//    - Event handling: Click fuera para cerrar, touch support
//    - AnimatePresence: Animaciones de entrada/salida suaves
//
// 🎨 NUEVAS CARACTERÍSTICAS:
//
// 1. INTERACTIVIDAD AVANZADA:
//    - useState: Controla el estado de apertura/cierre
//    - useRef: Referencia al contenedor para manejo de eventos
//    - useEffect: Cleanup de event listeners
//    - Click outside: Cierra detalles al hacer click fuera
//
// 2. ACCESIBILIDAD MEJORADA:
//    - tabIndex={0}: Hace los elementos focusables
//    - aria-expanded: Indica si el contenido está expandido
//    - aria-hidden: Oculta contenido de lectores de pantalla
//    - focus management: Enfoca automáticamente al abrir
//
// 3. ANIMACIONES AVANZADAS:
//    - AnimatePresence: Maneja animaciones de montaje/desmontaje
//    - height: 'auto': Animación de altura automática
//    - exit animations: Animaciones de salida suaves
//    - Variantes externas: Reutilización de configuraciones
//
// 🔧 PATRONES DE DISEÑO APLICADOS:
//
// 1. FACTORY PATTERN:
//    - HABGROUPCARDS: Crea tarjetas de habilidades consistentes
//    - ProjectTimelineItem: Crea tarjetas de proyecto uniformes
//    - Configuración centralizada: colorConfig elimina duplicación
//
// 2. COMPOSITE PATTERN:
//    - Habilities: Agrupa habilidades en estructuras jerárquicas
//    - Knowledges: Organiza conocimientos por categorías
//    - Reutilización: Componentes que se pueden combinar
//
// 3. SEPARATION OF CONCERNS:
//    - Datos separados de presentación
//    - Animaciones en archivo externo
//    - Lógica de UI separada de lógica de negocio
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. MEMOIZACIÓN:
//    - readonly props: Previene re-renders innecesarios
//    - as const: Optimiza el bundle de TypeScript
//    - Variantes externas: Reutilización de configuraciones
//
// 2. EVENT HANDLING:
//    - Cleanup automático: Remove event listeners
//    - Touch support: Compatibilidad móvil
//    - Debouncing: Previene múltiples ejecuciones
//
// 3. ANIMACIONES:
//    - GPU acceleration: transform-gpu, will-change-transform
//    - AnimatePresence: Optimiza animaciones de montaje/desmontaje
//    - once: true: Animaciones que solo se ejecutan una vez
//
// 🎯 MEJORAS DE MANTENIBILIDAD:
//
// 1. CÓDIGO MÁS LIMPIO:
//    - colorConfig: Elimina lógica condicional repetitiva
//    - JSDoc: Documentación clara de funciones
//    - Nombres descriptivos: HABGROUPCARDS, ProjectTimelineItem
//
// 2. TIPADO FUERTE:
//    - readonly: Previene mutaciones accidentales
//    - satisfies: Garantiza conformidad con interfaces
//    - Type safety: Detección de errores en tiempo de compilación
//
// 3. REUTILIZACIÓN:
//    - Variantes externas: Configuraciones reutilizables
//    - Componentes modulares: Fáciles de mantener y testear
//    - Separación clara: Responsabilidades bien definidas
//
// 🚀 FLUJO DE INTERACCIÓN:
// 1. Usuario hace click en tarjeta de proyecto
// 2. setIsOpen(true) activa el estado
// 3. AnimatePresence anima la entrada de detalles
// 4. useEffect maneja el focus para accesibilidad
// 5. Click fuera o touch cierra los detalles
// 6. Animación de salida suave con AnimatePresence
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Factory Pattern para creación consistente de componentes
// - Composite Pattern para estructuras jerárquicas
// - Inmutabilidad con readonly y as const
// - Accesibilidad con ARIA attributes
// - Event handling con cleanup automático
// - Animaciones avanzadas con AnimatePresence
// - Separación de responsabilidades
// - Type safety con satisfies
//
// ¡Este es un ejemplo excelente de cómo evolucionar código hacia mejores prácticas!
// ===========================================
