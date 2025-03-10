import React from "react";

/**
 * Componente reutilizable para encabezados de sección
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
 * Componente principal del sistema de autenticación
 * @component
 * @description Muestra la documentación técnica y características del sistema de autenticación FormGuard
 * @returns {JSX.Element} Componente React con la información completa del sistema
 */
const AuthSystem: React.FC = () => {
    return (
        <div className="bg-white p-4 sm:p-6 md:p-12 font-sans">
            {/* Encabezado oculto para SEO */}
            <h1 className="sr-only">Sistema de Autenticación Segura FormGuard</h1>

            {/* Título principal con gradiente */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                FormGuard
            </h2>

            {/* Sección de características principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                {/* Bloque: Descripción del sistema */}
                <div className="space-y-4 border-l-4 border-emerald-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Qué es</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Sistema de autenticación seguro con transiciones fluidas, validación en tiempo real y
                        protección contra CSRF. Desarrollado para integración en aplicaciones web modernas.
                    </p>
                </div>

                {/* Bloque: Características diferenciadoras */}
                <div className="space-y-4 border-l-4 border-cyan-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Diferenciales</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                        <li>Validación en tiempo real con PHP 8+</li>
                        <li>Hash seguro de contraseñas (bcrypt)</li>
                        <li>Integración con 4 métodos de autenticación social</li>
                        <li>Transiciones CSS personalizadas</li>
                    </ul>
                </div>
            </div>

            {/* Sección de tecnologías utilizadas */}
            <div className="mb-8">
                <SectionHeader>Stack Tecnológico</SectionHeader>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <TechPill colorClass="bg-blue-100 text-blue-800">PHP 8.2</TechPill>
                    <TechPill colorClass="bg-gray-100 text-gray-800">MySQL</TechPill>
                    <TechPill colorClass="bg-yellow-100 text-yellow-800">JavaScript ES6</TechPill>
                    <TechPill colorClass="bg-purple-100 text-purple-800">IonIcons</TechPill>
                </div>
            </div>

            {/* Sección de implementación técnica */}
            <div className="border-t pt-6">
                <SectionHeader>Arquitectura Segura</SectionHeader>

                {/* Componente de bloque de código*/}
                <div className="bg-gray-900 rounded-xl p-4 sm:p-6 overflow-x-auto">
                    <pre className="text-emerald-400 text-xs sm:text-sm">
                        <code>
                            {`// Ejemplo de protección CSRF
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Hash de contraseña con costo óptimo
$hashed_password = password_hash(
    $password, 
    PASSWORD_DEFAULT, 
    ['cost' => 12]
);`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AuthSystem);