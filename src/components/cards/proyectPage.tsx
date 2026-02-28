import React from "react";
import { useParams } from "react-router-dom";
import { projects, Project } from "../../config/project";
import { showInfo, hideInfo } from "../utils/infoHandler";
import { useProjectsMeta } from "../../hooks/useProjectsMeta";

const CardDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getMeta, fallbackMeta } = useProjectsMeta();
    const project = projects.find((p: Project) => p.id === id);
    const meta = id ? (getMeta(id) ?? fallbackMeta(id)) : null;

    if (!project || !meta) {
        return (
            <div className="error-message text-red-500 text-center p-8">
                ⚠️ Proyecto no encontrado
            </div>
        );
    }
    const ContentComponent = project.content;
    return (
        <>
            <header
                className="header h-[80vh] bg-opacity-85 flex justify-center items-center relative text-white bg-cover bg-center brightness-75"
                style={{ backgroundImage: `url(${meta.bgProyect})` }}
            >
                <div className="button flex gap-4">
                    <button
                        className="info-btn border-2 px-6 py-2 font-bold relative hover:bg-white hover:text-black transition-colors"
                        onMouseOver={(e) => showInfo(e.currentTarget, "Este botón te lleva al código del proyecto.")}
                        onMouseOut={hideInfo}
                        onClick={() => window.open(meta.codeUrl, "_blank")}
                    >
                        Código
                    </button>
                    <button
                        className="info-btn border-2 border-white px-6 py-2 font-bold relative hover:bg-white hover:text-black transition-colors"
                        onMouseOver={(e) => showInfo(e.currentTarget, "Este botón te lleva a la vista del proyecto.")}
                        onMouseOut={hideInfo}
                        onClick={() => window.open(meta.demoUrl, "_blank")}
                    >
                        Ver Proyecto
                    </button>
                </div>
            </header>

            <div className="bg-slate-300 md:mx-6">
                <div className="h-auto max-w-6xl mx-auto">

                    <ContentComponent />
                </div>
            </div>
        </>
    );
};

export default CardDetails;

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT que implementa una página de detalles
// de proyecto con navegación dinámica y contenido dinámico. Es un ejemplo
// perfecto de cómo crear páginas dinámicas con React Router. Te explico paso a paso:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente que renderiza la página de detalles de un proyecto específico.
// Combina navegación dinámica, contenido dinámico, y manejo de errores para
// crear una experiencia de usuario completa y robusta.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-4):
//    - React: Para crear el componente funcional
//    - useParams: Hook para obtener parámetros de la URL
//    - useNavigate: Hook para navegación programática
//    - projects: Array de datos desde config/project
//    - showInfo, hideInfo: Funciones utilitarias para tooltips
//    - ¿Por qué esta estructura? Separación clara de responsabilidades
//
// 2. OBTENCIÓN DE PARÁMETROS (líneas 7-9):
//    - useParams: Extrae el ID del proyecto de la URL
//    - navigate: Hook para navegación interna
//    - projects.find(): Busca el proyecto por ID
//    - ¿Por qué find? Permite obtener datos específicos basados en la URL
//
// 3. MANEJO DE ERRORES (líneas 11-17):
//    - if (!project): Verifica si el proyecto existe
//    - return: Renderiza mensaje de error si no existe
//    - ¿Por qué manejo de errores? Mejora la experiencia de usuario
//
// 4. CONTENIDO DINÁMICO (línea 18):
//    - ContentComponent: Componente dinámico del proyecto
//    - project.content: Propiedad que contiene el componente
//    - ¿Por qué dinámico? Permite contenido específico por proyecto
//
// 5. HEADER CON FONDO (líneas 21-43):
//    - header: Elemento semántico para el encabezado
//    - h-[80vh]: Altura del 80% del viewport
//    - bg-cover: Imagen de fondo que cubre el contenedor
//    - brightness-75: Reduce el brillo para mejor legibilidad
//    - ¿Por qué header? Mejora la semántica y accesibilidad
//
// 6. BOTONES DE ACCIÓN (líneas 25-42):
//    - Código: Botón que abre el repositorio en nueva pestaña
//    - Ver Proyecto: Botón que abre el demo en nueva pestaña
//    - showInfo/hideInfo: Tooltips informativos
//    - ¿Por qué tooltips? Mejora la experiencia de usuario
//
// 7. CONTENIDO PRINCIPAL (líneas 45-50):
//    - div contenedor: Layout responsivo
//    - ContentComponent: Renderiza el contenido específico
//    - ¿Por qué contenido dinámico? Permite personalización por proyecto
//
// 🎨 CONCEPTOS DE DISEÑO:
//
// 1. DYNAMIC ROUTING:
//    - useParams: Obtiene parámetros de la URL
//    - ID-based: Navegación basada en identificadores
//    - ¿Por qué dinámico? Permite URLs específicas por proyecto
//
// 2. CONTENT COMPOSITION:
//    - ContentComponent: Componente dinámico
//    - project.content: Propiedad que contiene el componente
//    - ¿Por qué composición? Permite contenido específico por proyecto
//
// 3. ERROR HANDLING:
//    - if (!project): Verifica existencia del proyecto
//    - Error message: Mensaje claro para el usuario
//    - ¿Por qué manejo de errores? Mejora la robustez de la aplicación
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. REACT OPTIMIZATIONS:
//    - useParams: Hook optimizado para parámetros
//    - useNavigate: Hook optimizado para navegación
//    - ¿Por qué hooks? Mejor rendimiento que métodos alternativos
//
// 2. CONTENT OPTIMIZATION:
//    - Dynamic content: Carga solo el contenido necesario
//    - Lazy loading: Contenido se carga cuando se necesita
//    - ¿Por qué dinámico? Mejor rendimiento y experiencia
//
// 3. NAVIGATION OPTIMIZATION:
//    - window.open: Abre enlaces en nueva pestaña
//    - _blank: Target para nueva pestaña
//    - ¿Por qué nueva pestaña? Mejor experiencia de usuario
//
// 🎯 PATRONES APLICADOS:
//
// 1. DYNAMIC ROUTING:
//    - URL parameters: Navegación basada en parámetros
//    - Content matching: Contenido basado en la URL
//    - ¿Por qué dinámico? Permite URLs específicas y SEO
//
// 2. COMPONENT COMPOSITION:
//    - ContentComponent: Componente dinámico
//    - Header: Componente fijo
//    - ¿Por qué composición? Mejor mantenibilidad y reutilización
//
// 3. ERROR BOUNDARIES:
//    - if (!project): Verificación de existencia
//    - Error message: Mensaje claro para el usuario
//    - ¿Por qué manejo de errores? Mejora la robustez
//
// 🚀 FLUJO DE EJECUCIÓN:
// 1. Usuario navega a /page/:id
// 2. useParams extrae el ID de la URL
// 3. projects.find busca el proyecto por ID
// 4. Si existe, renderiza la página
// 5. Si no existe, muestra mensaje de error
// 6. ContentComponent renderiza el contenido específico
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Dynamic routing con React Router
// - Content composition patterns
// - Error handling en React
// - URL parameter extraction
// - Component dynamic rendering
// - Navigation optimization
// - User experience patterns
// - Robust application design
//
// ¡Es un ejemplo excelente de cómo crear páginas dinámicas y robustas!
// ===========================================