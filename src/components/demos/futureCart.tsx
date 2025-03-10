import React from "react";

/**
 * Componente reutilizable para encabezados de sección
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido del encabezado
 */
const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
        {children}
    </h2>
);

/**
 * Componente para mostrar tecnologías en formato de píldora
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.colorClass - Clases de Tailwind para el color
 * @param {React.ReactNode} props.children - Contenido de la píldora
 */
const TechPill: React.FC<{ colorClass: string; children: React.ReactNode }> = ({
    colorClass,
    children
}) => (
    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm ${colorClass}`}>
        {children}
    </span>
);

/**
 * Componente principal de la plataforma e-commerce FutureCart
 * @component
 * @description Plataforma especializada en teclados gaming con sistema de carrito interactivo y animaciones avanzadas
 * @returns {JSX.Element} Componente React con todas las secciones técnicas
 */
const FutureCart: React.FC = () => {
    return (
        <div className="bg-white p-4 sm:p-6 md:p-12 font-sans">
            {/* Encabezado oculto para SEO */}
            <h1 className="sr-only">Plataforma e-commerce FutureCart para teclados gaming</h1>

            {/* Título principal */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-gray-700 to-gray-950 bg-clip-text text-transparent">
                FutureCart
            </h2>

            {/* Descripción del sistema */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                {/* Bloque: Propósito del sistema */}
                <div className="space-y-4 border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Qué es</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Plataforma e-commerce especializada en teclados gaming con sistema de carrito interactivo
                        y animaciones fluidas para una experiencia de compra moderna.
                    </p>
                </div>

                {/* Bloque: Características diferenciadoras */}
                <div className="space-y-4 border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Diferenciales</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                        <li>Animaciones con GSAP y ScrollTrigger</li>
                        <li>Actualizaciones en tiempo real del carrito</li>
                        <li>Diseño responsive con enfoque mobile-first</li>
                        <li>Sistema de filtrado avanzado</li>
                        <li>Integración con pasarelas de pago</li>
                    </ul>
                </div>
            </div>

            {/* Sección de tecnologías */}
            <div className="mb-8">
                <SectionHeader>Tecnologías</SectionHeader>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <TechPill colorClass="bg-green-100 text-green-800">JavaScript</TechPill>
                    <TechPill colorClass="bg-blue-100 text-blue-800">GSAP</TechPill>
                    <TechPill colorClass="bg-yellow-100 text-yellow-800">CSS3</TechPill>
                    <TechPill colorClass="bg-gray-100 text-gray-800">HTML5</TechPill>
                </div>
            </div>

            {/* Sección de implementación técnica */}
            <div className="border-t pt-6">
                <SectionHeader>Implementación de Animaciones</SectionHeader>
                <div className="bg-black rounded-xl p-4 sm:p-6 overflow-x-auto">
                    <pre className="text-blue-400 text-xs sm:text-sm">
                        <code>
                            {`// Configuración de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animación de cards de productos
gsap.from('.product-card', {
  scrollTrigger: {
    trigger: '#products',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 50,
  opacity: 0,
  stagger: 0.1
});

// Animación del carrito
function toggleCart() {
  gsap.to('.cart-panel', {
    x: showCart ? 0 : 300,
    duration: 0.5,
    ease: 'power3.out'
  });
}`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default React.memo(FutureCart);