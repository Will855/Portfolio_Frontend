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
 * Componente principal de documentación del sistema backend
 * @component
 * @description Muestra la documentación técnica completa del sistema SecureCRUD API
 * @returns {JSX.Element} Componente React con todas las secciones de información técnica
 */
const BackendSystemDocumentation: React.FC = () => {
    return (
        <div className="bg-gray-50 p-4 sm:p-6 md:p-12 font-mono">
            {/* Encabezado oculto para SEO */}
            <h1 className="sr-only">Documentación del Sistema SecureCRUD API</h1>

            {/* Título principal */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                SecureCRUD API
            </h2>

            {/* Descripción de arquitectura */}
            <div className="mb-8 text-center">
                <p className="text-gray-500 text-sm">
                    Arquitectura de capas - MVC con seguridad JWT
                </p>
            </div>

            {/* Sección de características principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                {/* Bloque: Funcionalidades principales */}
                <div className="space-y-4 border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Core Features</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                        <li>CRUD completo con validaciones</li>
                        <li>Autenticación JWT con refresh tokens</li>
                        <li>Conexión segura a MySQL con connection pooling</li>
                        <li>Hashing de contraseñas con bcrypt (10 salt rounds)</li>
                        <li>Manejo centralizado de errores</li>
                    </ul>
                </div>

                {/* Bloque: Medidas de seguridad */}
                <div className="space-y-4 border-l-4 border-cyan-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Seguridad</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                        <li>CORS dinámico (dev/prod)</li>
                        <li>Protección contra timing attacks</li>
                        <li>Headers de seguridad (x-powered-by disabled)</li>
                        <li>Variables de entorno sensibles</li>
                        <li>Queries parametrizadas</li>
                    </ul>
                </div>
            </div>

            {/* Sección de tecnologías */}
            <div className="mb-8">
                <SectionHeader>Tecnologías Clave</SectionHeader>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <TechPill colorClass="bg-blue-100 text-blue-800">Node.js 18</TechPill>
                    <TechPill colorClass="bg-cyan-100 text-cyan-800">Express 4</TechPill>
                    <TechPill colorClass="bg-purple-100 text-purple-800">MySQL2</TechPill>
                    <TechPill colorClass="bg-green-100 text-green-800">JWT</TechPill>
                    <TechPill colorClass="bg-red-100 text-red-800">Bcrypt</TechPill>
                </div>
            </div>

            {/* Sección de autenticación */}
            <div className="border-t pt-6">
                <SectionHeader>Flujo de Autenticación</SectionHeader>
                <div className="bg-black rounded-xl p-4 sm:p-6 overflow-x-auto">
                    <pre className="text-green-400 text-xs sm:text-sm">
                        <code>
                            {`// Generación de Token JWT
const token = jwt.sign(
  { id: user.id },
  process.env.JWT_SECRET,
  { 
    expiresIn: '1h',
    algorithm: 'HS256' 
  }
);

// Validación de Password
const isValid = await bcrypt.compare(
  plainPassword, 
  hashedPassword
);

// Middleware de Auth
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Acceso denegado');
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Token inválido');
  }
};`}
                        </code>
                    </pre>
                </div>
            </div>

            {/* Sección de configuración de base de datos */}
            <div className="border-t pt-6">
                <SectionHeader>Conexión Avanzada a MySQL</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4 border-l-4 border-sky-400 pl-4">
                        <h4 className="text-lg sm:text-xl font-semibold">Pool Config:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                            <li>Connection Limit: 10</li>
                            <li>Charset: utf8mb4_unicode_ci</li>
                            <li>Named Placeholders</li>
                            <li>Timezone: local</li>
                        </ul>
                    </div>

                    <div className="space-y-4 border-l-4 border-sky-500 pl-4">
                        <h4 className="text-lg sm:text-xl font-semibold">Eventos:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                            <li>acquire: Log de conexión</li>
                            <li>release: Liberación controlada</li>
                            <li>enqueue: Manejo de colas</li>
                            <li>connect: Prueba inicial</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sección de patrones de diseño */}
            <div className="pt-6">
                <SectionHeader>Patrones de Diseño</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4 border-l-4 border-blue-600 pl-4">
                        <h4 className="text-lg sm:text-xl font-semibold">Estrategias:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                            <li>Connection Pooling</li>
                            <li>Controller-Service-DAO</li>
                            <li>Inyección de dependencias</li>
                            <li>Logging estratificado</li>
                        </ul>
                    </div>
                    <div className="space-y-4 border-l-4 border-indigo-600 pl-4">
                        <h4 className="text-lg sm:text-xl font-semibold">Seguridad:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                            <li>BCrypt con salt rounds</li>
                            <li>JWT firmado con HS256</li>
                            <li>Validación de CORS dinámica</li>
                            <li>Protección contra SQLi</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(BackendSystemDocumentation);