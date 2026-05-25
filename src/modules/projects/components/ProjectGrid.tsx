import React from "react";
import { Link } from "react-router-dom";
import Card from "./components_Card";
import { useCards } from "../../hooks/useCards";

const Grid: React.FC = () => {
  const { cards } = useCards();
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
      {cards.map((card) => (
        <Link to={`/page/${card.id}`} key={card.id}>
          <Card
            id={card.id}
            title={card.title}
            description={card.description}
            img={card.img}
            buttonText={card.buttonText}
          />
        </Link>
      ))}
    </div>
  );
};

export default Grid;

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT que implementa una grilla de tarjetas
// usando datos externos y navegación con React Router. Es un ejemplo perfecto
// de cómo crear layouts responsivos y reutilizables. Te explico paso a paso:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente contenedor que renderiza múltiples tarjetas en una grilla
// responsiva. Combina datos externos, navegación, y diseño responsivo para
// crear una galería de proyectos interactiva.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-4):
//    - React: Para crear el componente funcional
//    - Link: Componente de React Router para navegación
//    - Card: Componente de tarjeta importado localmente
//    - cards: Array de datos desde config/cards
//    - ¿Por qué esta estructura? Separación clara de responsabilidades
//
// 2. COMPONENTE PRINCIPAL (líneas 6-22):
//    - Grid: Componente funcional sin props
//    - return: JSX que renderiza la grilla
//    - ¿Por qué sin props? Los datos vienen de la configuración externa
//
// 3. LAYOUT RESPONSIVO (línea 8):
//    - grid: Clase base de CSS Grid
//    - grid-cols-1: 1 columna en móvil
//    - sm:grid-cols-2: 2 columnas en tablet
//    - md:grid-cols-3: 3 columnas en desktop
//    - gap-6: Espaciado entre elementos
//    - p-6: Padding interno del contenedor
//    - ¿Por qué responsivo? Funciona en todos los dispositivos
//
// 4. RENDERIZADO DINÁMICO (líneas 9-19):
//    - cards.map(): Itera sobre el array de datos
//    - Link: Envuelve cada tarjeta para navegación
//    - to={`/page/${card.id}`}: Ruta dinámica basada en ID
//    - key={card.id}: Identificador único para React
//    - Card: Componente de tarjeta con props
//    - ¿Por qué map? Renderiza dinámicamente basado en datos
//
// 5. PROPS DE TARJETA (líneas 12-16):
//    - id: Identificador único del proyecto
//    - title: Título del proyecto
//    - description: Descripción del proyecto
//    - img: URL de la imagen
//    - buttonText: Texto del botón
//    - ¿Por qué estas props? Permiten personalizar cada tarjeta
//
// 🎨 CONCEPTOS DE DISEÑO:
//
// 1. CSS GRID:
//    - grid: Sistema de layout bidimensional
//    - grid-cols-*: Define número de columnas
//    - gap: Espaciado entre elementos
//    - ¿Por qué Grid? Mejor control del layout que Flexbox
//
// 2. RESPONSIVE BREAKPOINTS:
//    - sm: 640px y superior (tablet)
//    - md: 768px y superior (desktop)
//    - grid-cols-1: Móvil (por defecto)
//    - ¿Por qué breakpoints? Adapta el layout al dispositivo
//
// 3. COMPONENT COMPOSITION:
//    - Grid: Componente contenedor
//    - Card: Componente hijo reutilizable
//    - Link: Componente de navegación
//    - ¿Por qué composición? Mejor mantenibilidad y reutilización
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. REACT OPTIMIZATIONS:
//    - key prop: Identificador único para React
//    - Component composition: Reutilización de componentes
//    - Data separation: Datos en archivo externo
//    - ¿Por qué optimización? Mejor rendimiento y mantenibilidad
//
// 2. NAVIGATION OPTIMIZATION:
//    - Link component: Navegación optimizada de React Router
//    - Dynamic routes: Rutas basadas en datos
//    - ¿Por qué Link? Mejor rendimiento que navegación programática
//
// 3. LAYOUT OPTIMIZATION:
//    - CSS Grid: Layout nativo del navegador
//    - Responsive design: Una sola implementación para todos los dispositivos
//    - ¿Por qué Grid? Mejor rendimiento que JavaScript para layouts
//
// 🎯 PATRONES APLICADOS:
//
// 1. CONTAINER PATTERN:
//    - Grid: Componente contenedor
//    - Card: Componente presentacional
//    - Separación: Lógica de layout vs presentación
//    - ¿Por qué contenedor? Mejor separación de responsabilidades
//
// 2. DATA-DRIVEN RENDERING:
//    - cards.map(): Renderizado basado en datos
//    - Configuración externa: Datos separados del componente
//    - ¿Por qué data-driven? Fácil mantenimiento y actualización
//
// 3. RESPONSIVE DESIGN:
//    - Mobile-first: Diseño desde móvil hacia desktop
//    - Breakpoints: Adaptación a diferentes tamaños
//    - ¿Por qué responsive? Mejor experiencia en todos los dispositivos
//
// 🚀 FLUJO DE EJECUCIÓN:
// 1. Componente se monta
// 2. Importa datos desde config/cards
// 3. Renderiza la grilla con CSS Grid
// 4. Itera sobre el array de cards
// 5. Para cada card, crea un Link con Card
// 6. Usuario puede hacer click para navegar
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Component composition patterns
// - CSS Grid para layouts responsivos
// - Data-driven rendering
// - React Router navigation
// - Responsive design principles
// - Container vs presentational components
// - Performance optimization
// - Code organization
//
// ¡Es un ejemplo excelente de cómo crear layouts responsivos y mantenibles!
// ===========================================