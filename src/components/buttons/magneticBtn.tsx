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