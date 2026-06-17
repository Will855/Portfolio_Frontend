// utils/cardAnimations.ts
import gsap from "gsap";

/**
 * Maneja el efecto de movimiento 3D en la tarjeta basado en la posición del mouse
 * @function handleMouseMove
 * @param {MouseEvent} e - Evento del mouse
 * @param {HTMLDivElement} card - Elemento DOM de la tarjeta
 * @param {HTMLDivElement} content - Elemento DOM del contenido interno
 * @param {number} [sensitivity=1] - Intensidad del efecto (0.5 = suave, 2 = intenso)
 * @description Calcula la posición relativa del mouse y aplica transformaciones 3D
 * 
 * @example
 * // Uso básico con sensibilidad predeterminada
 * handleMouseMove(event, cardElement, contentElement);
 * 
 * // Uso con sensibilidad personalizada
 * handleMouseMove(event, cardElement, contentElement, 1.5);
 */
export const handleMouseMove = (
    e: MouseEvent,
    card: HTMLDivElement,
    content: HTMLDivElement,
    sensitivity: number = 1
) => {
    // Configuración base del efecto
    const baseStrength = 25;
    const normalizedSensitivity = Math.min(Math.max(sensitivity, 0.1), 3); // Limitar rango 0.1-3

    // Cálculo de fuerza del movimiento
    const movementStrength = baseStrength * normalizedSensitivity;
    const heightRatio = movementStrength / card.offsetHeight;
    const widthRatio = movementStrength / card.offsetWidth;

    // ponytail: clientX/Y y getBoundingClientRect previene desajustes de scroll/posicionamiento
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // Cálculo de valores transform
    const rotateX = (heightRatio * mouseY * -5) / (50 / normalizedSensitivity);
    const rotateY = (widthRatio * mouseX * 5) / (50 / normalizedSensitivity);
    const translateX = (widthRatio * mouseX * 5) / (10 / normalizedSensitivity);
    const translateY = (heightRatio * mouseY * -5) / (10 / normalizedSensitivity);

    // Animación suave usando GSAP
    gsap.to(card, {
        duration: 0.5,
        rotationY: rotateY,
        rotationX: rotateX,
        ease: "power2.out",
        overwrite: "auto"
    });

    gsap.to(content, {
        duration: 0.5,
        x: translateX,
        y: translateY,
        ease: "power2.out",
        overwrite: "auto"
    });
};

/**
 * Restablece la posición y rotación de la tarjeta a su estado inicial
 * @function resetCardPosition
 * @param {HTMLDivElement} card - Elemento DOM de la tarjeta
 * @param {HTMLDivElement} content - Elemento DOM del contenido interno
 * @description Aplica animación de reseteo usando GSAP con curva elástica
 */
export const resetCardPosition = (
    card: HTMLDivElement,
    content: HTMLDivElement
) => {
    // Animación de reset para la tarjeta
    gsap.to(card, {
        duration: 1.2,
        rotationY: 0,
        rotationX: 0,
        ease: "elastic.out(1.2, 0.4)",
        overwrite: "auto"
    });

    // Animación de reset para el contenido
    gsap.to(content, {
        duration: 1.4,
        x: 0,
        y: 0,
        ease: "elastic.out(1.2, 0.4)",
        overwrite: "auto"
    });
};