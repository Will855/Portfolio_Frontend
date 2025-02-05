import React from "react";

const AuthSystem: React.FC = () => {
    return (
        <div className="bg-white p-4 sm:p-6 md:p-12 font-sans">
            {/* 1. Nombre del Proyecto */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                FormGuard
            </h2>

            {/* 2. Imagen/GIF */}
            <div className="mb-8">
                <p className="text-gray-500 text-sm text-center">
                    Transición fluida entre login y registro - Diseño responsivo
                </p>
            </div>

            {/* 3. Descripción */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div className="space-y-4 border-l-4 border-emerald-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Qué es</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Sistema de autenticación seguro con transiciones fluidas, validación en tiempo real y
                        protección contra CSRF. Desarrollado para integración en aplicaciones web modernas.
                    </p>
                </div>

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

            {/* 4. Tecnologías */}
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Stack Tecnológico
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm">
                        PHP 8.2
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs sm:text-sm">
                        MySQL
                    </span>
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs sm:text-sm">
                        JavaScript ES6
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs sm:text-sm">
                        IonIcons
                    </span>
                </div>
            </div>

            {/* 5. Implementación Clave */}
            <div className="border-t pt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Arquitectura Segura
                </h2>
                <div className="bg-black rounded-xl p-4 sm:p-6 overflow-x-auto">
                    <pre className="text-emerald-400 text-xs sm:text-sm">
                        <code>
                            {`// Ejemplo de protección CSRF
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Hash de contraseña
$hashed_password = password_hash($password, PASSWORD_DEFAULT, [
    'cost' => 12
]);`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default AuthSystem;