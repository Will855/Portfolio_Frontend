import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';
import { trackButtonClick } from '../../utils/analytics';

/**
 * Propiedades para el componente MagneticBtn.
 * @interface MagneticBtnProps
 * @property {"link"} iconName - Nombre del icono de IonIcon a mostrar
 * @property {string} subtitle - Texto complementario debajo del icono
 */
interface MagneticBtnProps {
    iconName: "link";
    subtitle: string;
}

/**
 * Componente de botón interactivo con efecto magnético que redirige a la ruta '/informacion'
 * @component
 * @param {MagneticBtnProps} props - Propiedades del componente
 * @returns {JSX.Element} Elemento JSX del botón magnético
 */
const MagneticBtn: React.FC<MagneticBtnProps> = ({ iconName, subtitle }) => {
    const magneticBtnRef = useRef<HTMLButtonElement | null>(null);
    const magneticBtnTextRef = useRef<HTMLSpanElement | null>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const touchStartTime = useRef(0);
    const touchStartPos = useRef({ x: 0, y: 0 });
    const navigate = useNavigate();

    /**
     * Restablece la posición del botón y su texto usando animación elástica
     * @function resetPosition
     */
    const resetPosition = () => {
        gsap.to([magneticBtnRef.current, magneticBtnTextRef.current], {
            x: 0,
            y: 0,
            duration: 1.4,
            ease: "elastic.out(1.2, 0.4)"
        });
    };

    /**
     * Maneja el efecto magnético durante el movimiento del cursor/touch
     * @function handleMove
     * @param {number} clientX - Posición X del cursor
     * @param {number} clientY - Posición Y del cursor
     */
    const handleMove = (clientX: number, clientY: number) => {
        if (!magneticBtnRef.current) return;
        const bounds = magneticBtnRef.current.getBoundingClientRect();
        const strength = 40;
        const textStrength = 60;

        const relX = (clientX - bounds.left - bounds.width / 2) / bounds.width;
        const relY = (clientY - bounds.top - bounds.height / 2) / bounds.height;

        lastPosition.current.x = gsap.utils.interpolate(
            lastPosition.current.x,
            relX * strength,
            0.2
        );
        lastPosition.current.y = gsap.utils.interpolate(
            lastPosition.current.y,
            relY * strength,
            0.2
        );

        gsap.to(magneticBtnRef.current, {
            x: lastPosition.current.x,
            y: lastPosition.current.y,
            duration: 1.2,
            ease: "power4.out",
            overwrite: 'auto'
        });

        if (magneticBtnTextRef.current) {
            gsap.to(magneticBtnTextRef.current, {
                x: relX * textStrength,
                y: relY * textStrength,
                duration: 1.8,
                ease: "power4.out",
                overwrite: 'auto'
            });
        }
    };

    /**
     * Maneja la redirección a la página de información
     * @function handleRedirect
     */
    const handleRedirect = () => {
        trackButtonClick('Magnetic Button', 'Home Section');
        navigate('/informacion');
    };

    /**
     * Efecto para manejar eventos de interacción
     * @effect
     */
    useEffect(() => {
        const btn = magneticBtnRef.current;
        if (!btn) return;

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartTime.current = Date.now();
            touchStartPos.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        };

        const handleTouchEnd = () => {
            const timeDiff = Date.now() - touchStartTime.current;
            const dist = Math.hypot(
                lastPosition.current.x - touchStartPos.current.x,
                lastPosition.current.y - touchStartPos.current.y
            );

            if (timeDiff < 300 && dist < 10) {
                handleRedirect();
            }
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', resetPosition);
        btn.addEventListener('touchmove', handleTouchMove);
        btn.addEventListener('touchstart', handleTouchStart);
        btn.addEventListener('touchend', handleTouchEnd);

        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', resetPosition);
            btn.removeEventListener('touchmove', handleTouchMove);
            btn.removeEventListener('touchstart', handleTouchStart);
            btn.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <button
            ref={magneticBtnRef}
            onClick={handleRedirect}
            className="group relative w-40 h-40 rounded-full bg-transparent backdrop-blur-lg border hover:bg-slate-100 transition-all duration-300 hover:scale-105 cursor-alias"
            aria-label="Ver información adicional"
            role="link"
        >
            <span
                ref={magneticBtnTextRef}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white hover:text-black group-hover:scale-110 transition-transform"
            >
                <IonIcon
                    name={iconName}
                    className="text-3xl motion-safe:animate-pulse"
                    aria-hidden="true"
                />
                <span className="text-sm font-medium">{subtitle}</span>
            </span>
        </button>
    );
};

export default MagneticBtn;

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT AVANZADO que implementa un botón
// con efecto magnético usando GSAP y manejo de eventos complejos.
// Es un ejemplo perfecto de cómo crear interacciones sofisticadas
// que funcionan tanto en desktop como en móvil. Te explico paso a paso:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente que crea un botón circular que "atrae" al cursor/touch,
// creando un efecto magnético suave. Combina GSAP para animaciones,
// React Router para navegación, y analytics para tracking de eventos.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-5):
//    - React: useEffect, useRef para manejo de estado y referencias
//    - GSAP: Biblioteca de animaciones de alto rendimiento
//    - useNavigate: Hook de React Router para navegación
//    - IonIcon: Iconos de Ionicons
//    - trackButtonClick: Función de analytics personalizada
//    - ¿Por qué esta combinación? Cada herramienta tiene su propósito específico
//
// 2. INTERFACE Y TIPADO (líneas 7-16):
//    - MagneticBtnProps: Interface TypeScript para las props
//    - iconName: "link" - Tipo literal para el icono
//    - subtitle: string - Texto complementario
//    - JSDoc: Documentación completa de la interface
//    - ¿Por qué tipado fuerte? Previene errores y mejora la experiencia de desarrollo
//
// 3. REFS Y ESTADO (líneas 25-30):
//    - magneticBtnRef: Referencia al botón principal
//    - magneticBtnTextRef: Referencia al texto del botón
//    - lastPosition: Posición anterior para interpolación suave
//    - touchStartTime: Tiempo de inicio del touch para detección de tap
//    - touchStartPos: Posición inicial del touch
//    - navigate: Hook de React Router
//    - ¿Por qué múltiples refs? Permite animar elementos independientemente
//
// 4. FUNCIÓN RESET (líneas 36-43):
//    - resetPosition: Restablece la posición del botón y texto
//    - gsap.to(): Anima hacia x: 0, y: 0
//    - duration: 1.4s para animación suave
//    - ease: "elastic.out(1.2, 0.4)" para efecto elástico
//    - ¿Por qué elástico? Crea un efecto natural de "rebote"
//
// 5. FUNCIÓN MAGNÉTICA (líneas 51-88):
//    - handleMove: Función principal del efecto magnético
//    - getBoundingClientRect(): Obtiene posición y tamaño del botón
//    - strength: 40 para el botón, 60 para el texto
//    - Cálculo de posición relativa: relX, relY
//    - gsap.utils.interpolate(): Suaviza el movimiento
//    - Animaciones separadas: Botón y texto se mueven independientemente
//    - ¿Por qué interpolación? Evita movimientos bruscos y erráticos
//
// 6. MANEJO DE REDIRECCIÓN (líneas 94-97):
//    - handleRedirect: Función de navegación
//    - trackButtonClick: Registra el evento en analytics
//    - navigate('/informacion'): Redirige a la página de información
//    - ¿Por qué analytics? Permite medir la efectividad del botón
//
// 7. EVENT HANDLING (líneas 103-146):
//    - useEffect: Configura todos los event listeners
//    - handleMouseMove: Maneja el movimiento del mouse
//    - handleTouchMove: Maneja el movimiento del touch
//    - handleTouchStart: Registra el inicio del touch
//    - handleTouchEnd: Detecta taps vs swipes
//    - Cleanup: Remueve todos los event listeners
//    - ¿Por qué cleanup? Previene memory leaks
//
// 🎨 CONCEPTOS DE INTERACCIÓN:
//
// 1. MAGNETIC EFFECT:
//    - Cálculo de distancia: relX, relY basados en posición del cursor
//    - Fuerza magnética: strength controla la intensidad del efecto
//    - Interpolación: Suaviza el movimiento para evitar saltos
//    - ¿Por qué magnético? Crea una sensación de "atracción" natural
//
// 2. TOUCH DETECTION:
//    - TouchStart: Registra tiempo y posición inicial
//    - TouchEnd: Detecta si fue un tap (tiempo < 300ms, distancia < 10px)
//    - Math.hypot(): Calcula la distancia euclidiana
//    - ¿Por qué detección? Distingue entre taps y swipes
//
// 3. ANIMATION LAYERING:
//    - Botón: Se mueve con fuerza 40
//    - Texto: Se mueve con fuerza 60 (más exagerado)
//    - Duración diferente: 1.2s vs 1.8s
//    - ¿Por qué capas? Crea profundidad visual
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. GSAP BENEFITS:
//    - Hardware acceleration: Usa GPU automáticamente
//    - Batch updates: Agrupa cambios para mejor rendimiento
//    - overwrite: 'auto': Evita conflictos de animaciones
//    - ¿Por qué GSAP? Mejor rendimiento que CSS para animaciones complejas
//
// 2. EVENT OPTIMIZATION:
//    - Event delegation: Un solo listener por evento
//    - Cleanup automático: Previene memory leaks
//    - Touch vs mouse: Manejo diferenciado para cada dispositivo
//    - ¿Por qué optimización? Mejor experiencia de usuario
//
// 3. INTERPOLATION:
//    - gsap.utils.interpolate(): Suaviza el movimiento
//    - Factor 0.2: Controla la suavidad
//    - lastPosition: Mantiene la posición anterior
//    - ¿Por qué interpolación? Evita movimientos bruscos
//
// 🎯 PATRONES APLICADOS:
//
// 1. INTERACTIVE DESIGN:
//    - Magnetic effect: Crea sensación de atracción
//    - Touch detection: Distingue entre taps y swipes
//    - Visual feedback: Animaciones que responden al input
//    - ¿Por qué interactivo? Mejora la experiencia de usuario
//
// 2. RESPONSIVE INTERACTION:
//    - Mouse: Movimiento continuo
//    - Touch: Detección de taps
//    - Cursor: cursor-alias para indicar interactividad
//    - ¿Por qué responsive? Funciona en todos los dispositivos
//
// 3. ACCESSIBILITY:
//    - aria-label: Descripción para lectores de pantalla
//    - role="link": Indica que es un enlace
//    - aria-hidden: Oculta iconos decorativos
//    - ¿Por qué accesibilidad? Inclusión para todos los usuarios
//
// 🚀 FLUJO DE INTERACCIÓN:
// 1. Usuario mueve el cursor sobre el botón
// 2. handleMove calcula la posición relativa
// 3. GSAP anima el botón hacia la posición del cursor
// 4. El texto se mueve con mayor intensidad
// 5. Al salir del botón, resetPosition restablece la posición
// 6. Al hacer click/tap, handleRedirect navega a la página
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Efectos magnéticos con GSAP
// - Detección de touch vs mouse
// - Interpolación para movimientos suaves
// - Event handling avanzado
// - Analytics integration
// - Accessibility patterns
// - Performance optimization
// - Cross-device compatibility
//
// ¡Es un ejemplo excelente de cómo crear interacciones sofisticadas y accesibles!
// ===========================================