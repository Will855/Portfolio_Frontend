import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const BackgroundStars = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // Propósito: Referencia al elemento DOM que contendrá el canvas de Three.js
    // Tipo: HTMLDivElement - contenedor específico para el renderizador
    // @returns {React.RefObject<HTMLDivElement>} Referencia al contenedor del canvas
    const scene = useRef<THREE.Scene>(new THREE.Scene());
    // Propósito: Referencia a la escena 3D
    // Tipo: THREE.Scene - escena 3D de Three.js
    // @returns {React.RefObject<THREE.Scene>} Referencia a la escena 3D
    const camera = useRef<THREE.PerspectiveCamera>(
        new THREE.PerspectiveCamera(
            100,   //100 - Campo de visión vertical en grados
            window.innerWidth / window.innerHeight,  //window.innerWidth / window.innerHeight - Relación de aspecto inicial
            0.5,  //0.1 - Plano cercano (near clipping plane)
            300  //300 - Plano lejano (far clipping plane)
        )
    );
     // Renderizador con optimizaciones para transparencia y antialiasing
    const renderer = useRef<THREE.WebGLRenderer>(
        new THREE.WebGLRenderer({
            alpha: true, //true - Permite transparencia
            antialias: true //true - Suaviza los bordes
        })
    );

    const stars = useRef<THREE.Points>(new THREE.Points());
    // Referencia a las estrellas 3D

/**
 * useEffect para configurar la escena 3D y las estrellas
 * @returns {void}
 */
    useEffect(() => {
        // Verificar si el contenedor existe
        if (!containerRef.current) return;

        // Configurar renderizador 3D
        renderer.current = new THREE.WebGLRenderer({
            alpha: true, //true - Permite transparencia
            antialias: true //true - Suaviza los bordes
        });
        // Ajustar el tamaño del canvas al viewport
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        // Optimizar para pantallas de alta densidad
        renderer.current.setPixelRatio(window.devicePixelRatio);
        // Agregar el canvas al DOM
        containerRef.current.appendChild(renderer.current.domElement);

        // Configurar cámara    
        camera.current.position.z = 5;

        // Crear estrellas
        const starGeometry = new THREE.BufferGeometry();
        // Número de estrellas
        const starCount = 500;
        // Array de posiciones
        const positions = new Float32Array(starCount * 3);
        // Loop para generar posiciones aleatorias
        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100; // X
            positions[i + 1] = (Math.random() - 0.5) * 100; // Y
            positions[i + 2] = (Math.random() - 0.5) * 100; // Z
        }

        // Asignar las posiciones a la geometría
        starGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        // Material para renderizar las estrellas
        const starMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF, // Blanco
            size: 0.2, // Tamaño de las estrellas
            transparent: true, //true - Permite transparencia
            opacity: 0.8, // Opacidad de las estrellas
            blending: THREE.AdditiveBlending // AdditiveBlending - Las estrellas se suman en lugar de mezclarse
        });
        // Crear las estrellas
        stars.current = new THREE.Points(starGeometry, starMaterial);
        // Agregar las estrellas a la escena
        scene.current.add(stars.current);

        // Animación
        const animate = () => {
            // Solicitar el próximo frame de animación
            requestAnimationFrame(animate);

            // Actualizar posiciones
            const positions = starGeometry.attributes.position.array as Float32Array;
            // Loop para actualizar las posiciones
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= 0.3; // Velocidad de caída
                if (positions[i + 1] < -50) positions[i + 1] = 50; // Reiniciar posición
            }

            // Marcar que la geometría ha cambiado
            starGeometry.attributes.position.needsUpdate = true;

            // Renderizar la escena
            if (renderer.current) {
                // Renderizar la escena
                renderer.current.render(scene.current, camera.current);
            }
        };

        // Manejar resize
        const handleResize = () => {
            // Actualizar la relación de aspecto de la cámara
            camera.current.aspect = window.innerWidth / window.innerHeight;
            // Actualizar la matriz de proyección
            camera.current.updateProjectionMatrix();
            // Ajustar el tamaño del canvas al viewport
            renderer.current?.setSize(window.innerWidth, window.innerHeight);
        };

        // Agregar el listener de resize
        window.addEventListener("resize", handleResize);
        // Iniciar la animación
        animate();

        return () => {
            // Eliminar el listener de resize
            window.removeEventListener("resize", handleResize);
            // Eliminar el canvas del DOM
            if (containerRef.current && renderer.current?.domElement) {
                containerRef.current.removeChild(renderer.current.domElement);
            }
            // Liberar memoria de la geometría
            starGeometry.dispose();
            // Liberar memoria del material
            starMaterial.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            // Div contenedor con posición fija, tamaño completo y overflow oculto
            className="fixed inset-0 w-full h-full overflow-hidden" 
            style={{
                // Estilos para el div contenedor
                zIndex: -1, // -1 - Va detrás del contenido
                // Gradiente de negro a azul oscuro
                background: "linear-gradient(to bottom, #000000 0%, #1a1a2e 100%)", 
            }}
        />
    );
};

export default BackgroundStars;

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT que crea un fondo animado de estrellas
// usando Three.js (WebGL). Es un ejemplo perfecto de cómo integrar gráficos
// 3D en una aplicación React. Te explico paso a paso qué hace cada parte:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente que renderiza un fondo de estrellas animadas que caen
// hacia abajo, creando un efecto visual atractivo para el portfolio.
// Usa WebGL (a través de Three.js) para renderizado de alto rendimiento.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-2):
//    - React: useEffect, useRef para manejo de ciclo de vida
//    - THREE: Biblioteca de gráficos 3D para WebGL
//    - ¿Por qué Three.js? Simplifica el trabajo con WebGL
//
// 2. REFS PARA PERSISTENCIA (líneas 5-11):
//    - containerRef: Referencia al div contenedor
//    - scene: Escena 3D donde están todos los objetos
//    - camera: Cámara que define la perspectiva
//    - renderer: Motor que convierte la escena 3D en imagen 2D
//    - stars: Objeto que contiene todas las estrellas
//    - ¿Por qué useRef? Persiste entre renders sin causar re-renders
//
// 3. CONFIGURACIÓN INICIAL (líneas 13-26):
//    - Verificación de contenedor: if (!containerRef.current) return
//    - WebGL Renderer: Motor de renderizado con transparencia y antialiasing
//    - setSize: Ajusta el tamaño del canvas al viewport
//    - setPixelRatio: Optimiza para pantallas de alta densidad
//    - appendChild: Inserta el canvas en el DOM
//    - Cámara: Posicionada en z=5 para ver las estrellas
//
// 4. CREACIÓN DE ESTRELLAS (líneas 28-53):
//    - BufferGeometry: Estructura de datos optimizada para GPU
//    - starCount = 500: Número de estrellas a crear
//    - Float32Array: Array tipado para mejor rendimiento
//    - Loop de posiciones: Genera coordenadas aleatorias en 3D
//    - setAttribute: Asigna las posiciones a la geometría
//    - PointsMaterial: Material para renderizar puntos
//    - AdditiveBlending: Las estrellas se suman en lugar de mezclarse
//
// 5. SISTEMA DE ANIMACIÓN (líneas 55-72):
//    - requestAnimationFrame: Sincroniza con el refresh rate del monitor
//    - Loop infinito: animate() se llama a sí misma
//    - Actualización de posiciones: Mueve estrellas hacia abajo
//    - Reinicio: Cuando una estrella sale por abajo, reaparece arriba
//    - needsUpdate: Marca que la geometría ha cambiado
//    - render: Dibuja la escena en el canvas
//
// 6. MANEJO DE RESIZE (líneas 74-82):
//    - handleResize: Función que ajusta la cámara y renderer
//    - aspect ratio: Mantiene la proporción correcta
//    - updateProjectionMatrix: Recalcula la perspectiva
//    - setSize: Ajusta el tamaño del canvas
//    - addEventListener: Escucha cambios de tamaño de ventana
//
// 7. CLEANUP (líneas 84-91):
//    - removeEventListener: Limpia el listener de resize
//    - removeChild: Remueve el canvas del DOM
//    - dispose: Libera memoria de geometría y material
//    - ¿Por qué es importante? Previene memory leaks
//
// 8. RENDER (líneas 94-103):
//    - div contenedor: Elemento donde se monta el canvas
//    - fixed inset-0: Cubre toda la pantalla
//    - zIndex: -1: Va detrás del contenido
//    - background: Gradiente de negro a azul oscuro
//
// 🎨 CONCEPTOS DE THREE.JS:
//
// 1. ESCENA 3D:
//    - Scene: Contenedor de todos los objetos 3D
//    - Camera: Define desde dónde y cómo vemos la escena
//    - Renderer: Convierte la escena 3D en imagen 2D
//
// 2. GEOMETRÍA Y MATERIALES:
//    - BufferGeometry: Estructura optimizada para GPU
//    - PointsMaterial: Material específico para puntos
//    - BufferAttribute: Datos organizados para el shader
//
// 3. ANIMACIÓN:
//    - requestAnimationFrame: Loop de animación optimizado
//    - needsUpdate: Sistema de invalidación de Three.js
//    - render: Comando para dibujar la escena
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. BUFFER GEOMETRY:
//    - Float32Array: Arrays tipados son más rápidos
//    - BufferAttribute: Datos organizados para GPU
//    - needsUpdate: Solo actualiza cuando es necesario
//
// 2. MEMORY MANAGEMENT:
//    - dispose(): Libera memoria de geometría y materiales
//    - removeChild(): Limpia el DOM
//    - removeEventListener(): Evita memory leaks
//
// 3. RENDERING:
//    - setPixelRatio(): Optimiza para pantallas Retina
//    - antialias: true: Suaviza los bordes
//    - alpha: true: Permite transparencia
//
// 🎯 PATRONES APLICADOS:
//
// 1. IMPERATIVE PROGRAMMING:
//    - Three.js es imperativo (comandos directos)
//    - React es declarativo (describe qué quieres)
//    - useEffect: Puente entre ambos paradigmas
//
// 2. RESOURCE MANAGEMENT:
//    - Cleanup en useEffect: Libera recursos
//    - Event listeners: Se limpian automáticamente
//    - Memory disposal: Evita leaks
//
// 3. SEPARATION OF CONCERNS:
//    - React maneja el DOM y ciclo de vida
//    - Three.js maneja los gráficos 3D
//    - useRef: Comunicación entre ambos
//
// 🚀 FLUJO DE EJECUCIÓN:
// 1. Componente se monta
// 2. useEffect se ejecuta
// 3. Se crea la escena 3D
// 4. Se generan las estrellas
// 5. Se inicia el loop de animación
// 6. Las estrellas caen continuamente
// 7. Al desmontar, se limpia todo
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Integración de WebGL con React
// - Gestión de recursos 3D
// - Animaciones con requestAnimationFrame
// - Optimización de memoria
// - Event handling en componentes 3D
// - Cleanup patterns
// - Buffer geometry y shaders
//
// ¡Es un ejemplo excelente de cómo crear efectos visuales impresionantes!
// ===========================================