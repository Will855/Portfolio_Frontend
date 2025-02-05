import React from "react";

const FutureCart: React.FC = () => {
    return (
        <div className="bg-white p-4 sm:p-6 md:p-12 font-sans">
            {/* Nombre del Proyecto */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-gray-700 to-gray-950 bg-clip-text text-transparent">
                FutureCart
            </h2>

            {/* Imagen o GIF */}
            <div className="mb-8">
                <p className="text-gray-500 text-sm text-center">
                    Interfaz dinámica - Gestión de productos y animaciones
                </p>
            </div>

            {/* Descripción */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div className="space-y-4 border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Qué es</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Plataforma e-commerce especializada en teclados gaming con sistema de carrito interactivo
                        y animaciones fluidas para una experiencia de compra moderna.
                    </p>
                </div>

                <div className="space-y-4 border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Diferenciales</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                        <li>Animaciones con GSAP y ScrollTrigger</li>
                        <li>Actualizaciones en tiempo real del carrito</li>
                        <li>Diseño responsive con enfoque mobile-first</li>
                    </ul>
                </div>
            </div>

            {/* Tecnologías */}
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Tecnologías
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs sm:text-sm">
                        JavaScript
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm">
                        GSAP
                    </span>
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs sm:text-sm">
                        CSS3
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs sm:text-sm">
                        HTML5
                    </span>
                </div>
            </div>

            {/* Detalles Técnicos */}
            <div className="border-t pt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Implementación de Animaciones
                </h2>
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

export default FutureCart;