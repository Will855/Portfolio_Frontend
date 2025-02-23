// Importaciones necesarias
import { useEffect, useRef } from 'react'; // Hooks de React
import { gsap } from 'gsap'; // Librería para animaciones

// Hook personalizado: useGsapAnimation
// Este hook aplica una animación de borde luminoso a un elemento referenciado.
const useGsapAnimation = (ref) => {
    // Referencia para almacenar la línea de tiempo de GSAP
    const timelineRef = useRef(null);

    useEffect(() => {
        // Crea una línea de tiempo de GSAP con animación infinita (repetición y efecto yoyo)
        timelineRef.current = gsap.timeline({ repeat: -1, yoyo: true });

        // Define la animación: un efecto de sombra luminosa
        timelineRef.current.to(ref.current, {
            boxShadow: '0 0 20px rgba(240, 248, 255, 0.5)', // Sombra luminosa
            duration: 2, // Duración de la animación
            repeat: -1, // Repetición infinita
            yoyo: true, // Efecto de ida y vuelta
        });

        // Limpieza: elimina la animación al desmontar el componente
        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill(); // Detiene y elimina la animación
            }
        };
    }, [ref]); // Dependencia: se ejecuta cuando cambia la referencia
};

export default useGsapAnimation; // Exporta el hook para su uso en otros componentes