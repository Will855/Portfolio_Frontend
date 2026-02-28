import React, { useMemo, useState } from "react";

export type CircleProfileSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface CircleProfileProps {
    /** URL de la imagen a mostrar dentro del círculo */
    src: string;
    /** Texto alternativo para accesibilidad; también se usa para fallback iniciales */
    alt: string;
    /** Tamaño base del avatar (responsive por defecto) */
    size?: CircleProfileSize;
    /** Añade clases extra para personalizar (se agregan al contenedor raíz) */
    className?: string;
    /** Muestra un aro (ring) alrededor del avatar */
    ring?: boolean;
}

/**
 * CircleProfile
 * Componente de avatar circular, pequeño y responsivo, similar a un perfil de Facebook.
 * - Imagen recortada en círculo con object-cover
 * - Tamaños predefinidos y breakpoints por defecto
 * - Fallback con iniciales si la imagen falla
 */
const CircleProfile: React.FC<CircleProfileProps> = ({
    src,
    alt,
    size = "lg",
    className,
    ring = true
}) => {
    const [hasError, setHasError] = useState(false);

    const sizeClasses = useMemo(() => {
        // Tamaños base; añadimos escalado responsivo por defecto
        const base: Record<CircleProfileSize, string> = {
            xs: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24",
            sm: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
            md: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32",
            lg: "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36",
            xl: "w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48"
        };
        return base[size];
    }, [size]);

    const initials = useMemo(() => {
        const words = alt.trim().split(/\s+/);
        const chars = words.slice(0, 2).map(w => w.charAt(0).toUpperCase());
        return chars.join("") || "?";
    }, [alt]);

    return (
        <div
            className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-white/5 ${sizeClasses} ${ring ? "ring-2 ring-white/20" : ""} ${className || ""}`}
            role="img"
            aria-label={alt}
        >
            {!hasError ? (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                    decoding="async"
                    onError={() => setHasError(true)}
                    draggable={false}
                />
            ) : (
                <span className="text-xs sm:text-sm md:text-base font-semibold text-white/90">
                    {initials}
                </span>
            )}
        </div>
    );
};

export default CircleProfile;


