// ===========================================
// 🎬 Variantes de animación unificadas (Framer Motion)
// ===========================================
// Este módulo centraliza y documenta las variantes de animación utilizadas
// en la UI para mantener un solo punto de verdad, mejorar la mantenibilidad
// y evitar duplicación de código entre componentes.

// Sistema de timing escalable
export const atimationThemes = {
    sub: {
        stagger: 0.08, // El stagger distribuye los cálculos de animación en el tiempo
        delay: 0.1, // El delay define el tiempo de espera antes de que se inicie la animación
        ease: "easeOut" // La easing define la curva de la animación
    },
    Dramatic: {
        stagger: 0.15, // El stagger distribuye los cálculos de animación en el tiempo
        delay: 0.3, // El delay define el tiempo de espera antes de que se inicie la animación
        ease: "easeOut" // La easing define la curva de la animación
    },
    Smooth: {
        stagger: 0.03, // El stagger distribuye los cálculos de animación en el tiempo
        delay: 0.5, // El delay define el tiempo de espera antes de que se inicie la animación
        ease: "easeInOut" // La easing define la curva de la animación
    }
} as const;

/*
Efecto de aparición escalonada (stagger) con transiciones suaves.
Controla cómo los elementos hijos dentro de un contenedor se revelan
progresivamente con un delay entre cada uno.
*/
export const CONTAINERCARDS = {
    hidden: { opacity: 0 }, // estado inicial de opacidad 0 (invisible)
    visible: {
        opacity: 1, // estado final de opacidad 1 (visible)
        transition: {
            // Nota: usamos el tema de timing para controlar el stagger a nivel global
            staggerChildren: atimationThemes.sub.stagger, // delay entre cada elemento hijo
            delayChildren: atimationThemes.sub.delay, // delay inicial para el contenedor
            when: "beforeChildren" // asegura que los elementos hijos se rendericen antes del contenedor
        }
    }
} as const;

// Animación para las tarjetas individuales
export const CARDS = {
    hidden: {
        opacity: 0, // estado inicial de opacidad 0 (invisible)
        y: 30, // estado inicial de desplazamiento 30px hacia abajo
        scale: 0.95 // estado inicial de escala 0.95
    },
    visible: {
        opacity: 1, // estado final de opacidad 1 (visible)
        y: 0, // estado final de desplazamiento 0px
        scale: 1, // estado final de escala 1
        transition: {
            type: "spring",
            stiffness: 100, // rigidez de la animación
            damping: 15, // amortiguación de la animación
            duration: 0.6 // duración de la animación
        }
    }
} as const;

// Animación para las tarjetas individuales en línea
export const INLINECARDS = {
    hidden: {
        opacity: 0, // estado inicial de opacidad 0 (invisible)
        x: -20, // estado inicial de desplazamiento 20px hacia la izquierda
        scale: 0.98 // estado inicial de escala 0.98
    },
    visible: {
        opacity: 1, // estado final de opacidad 1 (visible)
        x: 0, // estado final de desplazamiento 0px
        scale: 1, // estado final de escala 1
        transition: {
            type: "spring",
            stiffness: 120, // rigidez de la animación
            damping: 14 // amortiguación de la animación
        }
    }
} as const;

// ===========================================
// 📦 Cómo usar
// import { CONTAINERCARDS, CARDS, INLINECARDS } from "../animations/variants";
// ===========================================


