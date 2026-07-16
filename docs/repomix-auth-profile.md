This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/modules/auth/**/*, src/modules/profile/**/*, src/modules/contact/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  modules/
    auth/
      hooks/
        useAdminAuth.ts
      pages/
        AdminLogin.tsx
    contact/
      admin/
        AdminMessages.tsx
      components/
        ContactForm.tsx
    profile/
      admin/
        AdminHero.tsx
      components/
        glitch.css
        GlitchPresentation.tsx
        WordCloud.tsx
      hooks/
        useHeroContent.ts
```

# Files

## File: src/modules/profile/components/glitch.css
```css
/* Estilos para el texto con efecto glitch */
.glitch-text {
    position: relative; /* Posicionamiento relativo para los pseudo-elementos */
    display: inline-block; /* Permitir que el texto se comporte como un bloque en línea */
}

/* Pseudo-elementos para crear el efecto glitch */
.glitch-text::before,
.glitch-text::after {
    content: attr(data-text); /* Usar el texto del atributo data-text */
    position: absolute; /* Posicionamiento absoluto para superponer los elementos */
    top: 0; /* Alinear al top */
    left: 0; /* Alinear a la izquierda */
    width: 100%; /* Ancho completo del contenedor */
    height: 100%; /* Alto completo del contenedor */
}

/* Estilos para el pseudo-elemento antes */
.glitch-text::before {
    left: 2px; /* Desplazar ligeramente a la derecha */
    text-shadow: -2px 0 #ff00c1; /* Sombra de texto en color rosa */
    clip: rect(24px, 550px, 90px, 0); /* Recortar el texto para crear el efecto glitch */
    animation: glitch-anim-1 3s infinite linear alternate-reverse; /* Animación del glitch */
}

/* Estilos para el pseudo-elemento después */
.glitch-text::after {
    left: -2px; /* Desplazar ligeramente a la izquierda */
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1; /* Sombra de texto en colores cian y rosa */
    animation: glitch-anim-2 2s infinite linear alternate-reverse; /* Animación del glitch */
}

/* Animación para el pseudo-elemento antes */
@keyframes glitch-anim-1 {
    0% { clip: rect(51px, 9999px, 28px, 0); }
    10% { clip: rect(33px, 9999px, 60px, 0); }
    20% { clip: rect(74px, 9999px, 71px, 0); }
    30% { clip: rect(41px, 9999px, 98px, 0); }
    40% { clip: rect(16px, 9999px, 35px, 0); }
    50% { clip: rect(89px, 9999px, 24px, 0); }
    60% { clip: rect(22px, 9999px, 53px, 0); }
    70% { clip: rect(68px, 9999px, 15px, 0); }
    80% { clip: rect(39px, 9999px, 99px, 0); }
    90% { clip: rect(81px, 9999px, 77px, 0); }
    100% { clip: rect(10px, 9999px, 47px, 0); }
}

/* Animación para el pseudo-elemento después */
@keyframes glitch-anim-2 {
    0% { clip: rect(18px, 9999px, 82px, 0); }
    10% { clip: rect(64px, 9999px, 31px, 0); }
    20% { clip: rect(95px, 9999px, 4px, 0); }
    30% { clip: rect(7px, 9999px, 69px, 0); }
    40% { clip: rect(52px, 9999px, 26px, 0); }
    50% { clip: rect(13px, 9999px, 86px, 0); }
    60% { clip: rect(79px, 9999px, 11px, 0); }
    70% { clip: rect(36px, 9999px, 93px, 0); }
    80% { clip: rect(46px, 9999px, 21px, 0); }
    90% { clip: rect(57px, 9999px, 73px, 0); }
    100% { clip: rect(30px, 9999px, 88px, 0); }
}

/* ===========================================
 * 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
 * ===========================================
 * 
 * Este archivo CSS crea un EFECTO GLITCH avanzado usando pseudo-elementos
 * y animaciones CSS. Es un ejemplo perfecto de cómo crear efectos visuales
 * impresionantes usando solo CSS. Te explico paso a paso qué hace cada parte:
 *
 * 🎯 ¿QUÉ ES ESTE ARCHIVO?
 * Es un archivo CSS que implementa un efecto de "glitch" (interferencia digital)
 * en texto, simulando errores de visualización como los que se ven en
 * películas de ciencia ficción. Usa técnicas avanzadas de CSS para crear
 * el efecto sin JavaScript.
 *
 * 📋 DESGLOSE POR SECCIONES:
 *
 * 1. CLASE PRINCIPAL (líneas 2-5):
 *    - .glitch-text: Clase base para aplicar el efecto
 *    - position: relative: Permite posicionar pseudo-elementos
 *    - display: inline-block: Comportamiento híbrido inline/block
 *    - ¿Por qué relative? Los pseudo-elementos necesitan un contenedor
 *
 * 2. PSEUDO-ELEMENTOS BASE (líneas 8-16):
 *    - ::before y ::after: Crean capas adicionales del texto
 *    - content: attr(data-text): Usa el texto del atributo data-text
 *    - position: absolute: Superpone las capas sobre el texto original
 *    - top: 0, left: 0: Alineación perfecta con el texto original
 *    - width: 100%, height: 100%: Mismo tamaño que el contenedor
 *    - ¿Por qué pseudo-elementos? Crean capas sin HTML adicional
 *
 * 3. CAPA ROSA (líneas 19-24):
 *    - left: 2px: Desplazamiento hacia la derecha
 *    - text-shadow: -2px 0 #ff00c1: Sombra rosa hacia la izquierda
 *    - clip: rect(): Recorta el texto para crear el efecto glitch
 *    - animation: glitch-anim-1: Animación de 3 segundos
 *    - alternate-reverse: Alterna la dirección de la animación
 *
 * 4. CAPA CIAN (líneas 27-31):
 *    - left: -2px: Desplazamiento hacia la izquierda
 *    - text-shadow: Doble sombra en cian y rosa
 *    - animation: glitch-anim-2: Animación de 2 segundos
 *    - Diferente timing: Crea desincronización visual
 *
 * 5. ANIMACIÓN 1 (líneas 34-46):
 *    - @keyframes: Define los pasos de la animación
 *    - clip: rect(): Recorta diferentes partes del texto
 *    - Valores aleatorios: Simulan interferencia digital
 *    - 10 pasos: 0%, 10%, 20%... hasta 100%
 *    - ¿Por qué rect()? Permite recortar formas rectangulares
 *
 * 6. ANIMACIÓN 2 (líneas 49-61):
 *    - Misma estructura que la animación 1
 *    - Valores diferentes: Crea desincronización
 *    - Timing diferente: 2s vs 3s
 *    - Efecto de interferencia: Las dos capas se superponen
 *
 * 🎨 CONCEPTOS DE CSS AVANZADO:
 *
 * 1. PSEUDO-ELEMENTOS:
 *    - ::before: Crea un elemento antes del contenido
 *    - ::after: Crea un elemento después del contenido
 *    - content: attr(): Usa el valor de un atributo HTML
 *    - position: absolute: Posicionamiento independiente
 *
 * 2. CLIP PROPERTY:
 *    - rect(top, right, bottom, left): Define un rectángulo
 *    - Valores en píxeles: Controla qué parte se muestra
 *    - 9999px: Valor grande para el ancho (truco para clip)
 *    - ¿Por qué clip? Permite mostrar solo partes del elemento
 *
 * 3. TEXT-SHADOW:
 *    - Múltiples sombras: Separa colores
 *    - Desplazamiento: Crea efecto de separación
 *    - Colores vibrantes: #ff00c1 (rosa), #00fff9 (cian)
 *    - ¿Por qué sombras? Simula interferencia de color
 *
 * 4. ANIMACIONES CSS:
 *    - @keyframes: Define los pasos de la animación
 *    - infinite: Repetición infinita
 *    - linear: Velocidad constante
 *    - alternate-reverse: Alterna dirección
 *    - Diferentes duraciones: Crea desincronización
 *
 * ⚡ TÉCNICAS AVANZADAS:
 *
 * 1. LAYERING:
 *    - Múltiples capas: Texto original + 2 pseudo-elementos
 *    - Superposición: Las capas se superponen
 *    - Desplazamiento: Cada capa se mueve independientemente
 *    - ¿Por qué capas? Crea profundidad visual
 *
 * 2. CLIPPING:
 *    - rect(): Función de recorte rectangular
 *    - Valores aleatorios: Simulan interferencia
 *    - Animación: Cambia qué parte se muestra
 *    - ¿Por qué clipping? Crea el efecto de "corte"
 *
 * 3. COLOR SEPARATION:
 *    - RGB separation: Separa colores primarios
 *    - text-shadow: Crea sombras de colores
 *    - Desplazamiento: Separa los colores
 *    - ¿Por qué separación? Simula error de display
 *
 * 4. TIMING:
 *    - Diferentes duraciones: 2s vs 3s
 *    - Desincronización: Las animaciones no coinciden
 *    - alternate-reverse: Cambia dirección
 *    - ¿Por qué timing diferente? Crea caos visual
 *
 * 🎯 PATRONES APLICADOS:
 *
 * 1. GLITCH AESTHETIC:
 *    - Colores vibrantes: Rosa y cian
 *    - Movimiento errático: Animaciones desincronizadas
 *    - Interferencia: Efecto de corte y pegado
 *    - ¿Por qué glitch? Estética cyberpunk/retro
 *
 * 2. LAYER COMPOSITION:
 *    - Múltiples capas: Profundidad visual
 *    - Superposición: Efectos combinados
 *    - Desplazamiento: Movimiento independiente
 *    - ¿Por qué composición? Crea complejidad visual
 *
 * 3. ANIMATION CHAOS:
 *    - Valores aleatorios: Simulan interferencia
 *    - Timing irregular: Crea caos
 *    - Direcciones opuestas: Movimiento errático
 *    - ¿Por qué caos? Simula error digital
 *
 * 🚀 FLUJO DE EJECUCIÓN:
 * 1. Se aplica la clase .glitch-text al elemento
 * 2. Se crean los pseudo-elementos ::before y ::after
 * 3. Cada pseudo-elemento se desplaza y colorea
 * 4. Las animaciones se ejecutan independientemente
 * 5. El clipping cambia constantemente
 * 6. Se crea el efecto de interferencia visual
 *
 * 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
 * - Pseudo-elementos para efectos visuales
 * - Clip property para recorte de elementos
 * - Text-shadow para efectos de color
 * - Animaciones CSS complejas
 * - Layer composition
 * - Glitch aesthetic
 * - CSS sin JavaScript
 * - Efectos de interferencia digital
 *
 * ¡Es un ejemplo excelente de cómo crear efectos visuales impresionantes solo con CSS!
 * =========================================== */
```

## File: src/modules/profile/components/GlitchPresentation.tsx
```typescript
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './glitch.css';

// Interface para las props
interface GlitchProps {
  title?: string;
  subtitle?: string;
}
/**
 * Componente para el efecto glitch
 * @param title - Título del efecto glitch
 * @param subtitle - Subtítulo del efecto glitch
 * @returns Componente con el efecto glitch
 */
const Glitch: React.FC<GlitchProps> = ({ 
  title = "Hi, I'm Wilmer", 
  subtitle = "Web Developer" 
}) => {
    const containerRef = useRef<HTMLDivElement>(null); // Referencia al contenedor principal

  useEffect(() => { // Animación GSAP
    if (containerRef.current) { // Verificación de seguridad
      gsap.to(containerRef.current, {
        duration: 0.6, // Duración de la animación
        x: 1, // Desplazamiento horizontal
        y: 1, // Desplazamiento vertical
        repeat: -1,
        yoyo: true, // Efecto de ida y vuelta
        ease: "power1.inOut" // Easing de la animación
      });
    }
  }, []); // Dependencia: se ejecuta cuando cambia la referencia

  return (
    <div  // Contenedor principal
      ref={containerRef}
      className="relative w-full text-center mx-auto px-4" // Clases Tailwind
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        maxWidth: 'min(100%, 1200px)' // Ancho máximo responsivo
      }}
    >
      <h1 
        className="font-bold text-white mb-2 glitch-text"  // Clases Tailwind
        data-text={title}
        style={{
          fontSize: 'clamp(2.5rem, 10vw, 3.5rem)', // Tamaño responsivo
          lineHeight: '1.2'
        }}
      >
        {title}
      </h1>
      
      <p 
        className="text-gray-300 glitch-text" 
        data-text={subtitle} // Subtítulo con efecto glitch
        style={{
          fontSize: 'clamp(1.25rem, 5vw, 2rem)',
          marginTop: 'clamp(-0.5rem, -2vw, -1rem)' // Márgen superior responsivo
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

export default Glitch;

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT que combina el efecto glitch CSS
// con animaciones GSAP para crear una presentación visual impactante.
// Es un ejemplo perfecto de cómo integrar múltiples tecnologías para
// crear efectos visuales profesionales. Te explico paso a paso:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente que renderiza un título y subtítulo con efecto glitch,
// combinando CSS puro (para el efecto visual) con GSAP (para animaciones
// adicionales). Crea una presentación dinámica y atractiva para portfolios.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-5):
//    - 'use client': Directiva de Next.js para componentes del cliente
//    - React: useEffect, useRef para manejo de estado y referencias
//    - GSAP: Biblioteca de animaciones de alto rendimiento
//    - './glitch.css': Importa los estilos del efecto glitch
//    - ¿Por qué combinar? CSS para efectos visuales + GSAP para animaciones
//
// 2. INTERFACE Y PROPS (líneas 7-11):
//    - GlitchProps: Interface TypeScript para las props
//    - title?: string: Título opcional con valor por defecto
//    - subtitle?: string: Subtítulo opcional con valor por defecto
//    - ¿Por qué opcionales? Permite personalización pero con valores por defecto
//
// 3. COMPONENTE PRINCIPAL (líneas 13-16):
//    - React.FC<GlitchProps>: Componente funcional tipado
//    - Destructuring: Extrae title y subtitle de las props
//    - Valores por defecto: "Hi, I'm Wilmer" y "Web Developer"
//    - ¿Por qué valores por defecto? Funciona sin props obligatorias
//
// 4. REFS Y ESTADO (línea 17):
//    - containerRef: Referencia al contenedor principal
//    - useRef<HTMLDivElement>: Tipado específico para div
//    - ¿Por qué ref? Permite animar el elemento con GSAP
//
// 5. ANIMACIÓN GSAP (líneas 19-30):
//    - useEffect: Se ejecuta al montar el componente
//    - Verificación: if (containerRef.current) para seguridad
//    - gsap.to(): Anima el contenedor hacia x: 1, y: 1
//    - duration: 0.6s para animación suave
//    - repeat: -1 para repetición infinita
//    - yoyo: true para alternar dirección
//    - ease: "power1.inOut" para suavizado
//    - ¿Por qué GSAP? Mejor rendimiento que CSS para animaciones complejas
//
// 6. RENDER PRINCIPAL (líneas 32-63):
//    - div contenedor: Elemento principal con ref
//    - className: Tailwind para estilos base
//    - style: CSS inline para responsive design
//    - h1: Título con efecto glitch
//    - p: Subtítulo con efecto glitch
//
// 🎨 CONCEPTOS DE RESPONSIVE DESIGN:
//
// 1. CLAMP FUNCTION:
//    - clamp(2.5rem, 10vw, 3.5rem): Tamaño responsivo
//    - Mínimo: 2.5rem, Preferido: 10vw, Máximo: 3.5rem
//    - ¿Por qué clamp? Escala automáticamente con el viewport
//
// 2. VIEWPORT UNITS:
//    - 10vw: 10% del ancho del viewport
//    - 5vw: 5% del ancho del viewport
//    - ¿Por qué vw? Escala proporcionalmente
//
// 3. MIN/MAX FUNCTIONS:
//    - min(100%, 1200px): Ancho máximo responsivo
//    - clamp(-0.5rem, -2vw, -1rem): Márgenes responsivos
//    - ¿Por qué min/max? Controla límites de tamaño
//
// ⚡ INTEGRACIÓN DE TECNOLOGÍAS:
//
// 1. CSS + GSAP:
//    - CSS: Efecto glitch visual (pseudo-elementos, clip, text-shadow)
//    - GSAP: Animación de movimiento (x, y, repeat, yoyo)
//    - ¿Por qué combinar? Cada uno hace lo que mejor sabe
//
// 2. REACT + GSAP:
//    - React: Manejo de estado y ciclo de vida
//    - GSAP: Animaciones de alto rendimiento
//    - useRef: Puente entre React y GSAP
//    - ¿Por qué useRef? Permite acceso directo al DOM
//
// 3. TAILWIND + CSS INLINE:
//    - Tailwind: Clases utilitarias para layout
//    - CSS inline: Valores responsivos con clamp
//    - ¿Por qué ambos? Flexibilidad y control preciso
//
// 🎯 PATRONES APLICADOS:
//
// 1. COMPOSITION PATTERN:
//    - Múltiples tecnologías: CSS + GSAP + React
//    - Separación de responsabilidades: Cada tecnología hace su parte
//    - ¿Por qué composición? Mejor mantenibilidad y flexibilidad
//
// 2. RESPONSIVE DESIGN:
//    - clamp(): Escalado automático
//    - viewport units: Proporcionalidad
//    - min/max: Control de límites
//    - ¿Por qué responsive? Funciona en todos los dispositivos
//
// 3. PERFORMANCE:
//    - GSAP: Hardware acceleration automática
//    - CSS: Efectos optimizados por el navegador
//    - useRef: Evita re-renders innecesarios
//    - ¿Por qué performance? Experiencia de usuario fluida
//
// 🚀 FLUJO DE EJECUCIÓN:
// 1. Componente se monta con props (o valores por defecto)
// 2. useEffect se ejecuta y configura la animación GSAP
// 3. Se renderiza el HTML con clases CSS
// 4. CSS aplica el efecto glitch (pseudo-elementos, clip, text-shadow)
// 5. GSAP anima el movimiento del contenedor
// 6. Las animaciones se ejecutan infinitamente
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Integración de CSS con GSAP
// - Responsive design con clamp y viewport units
// - Component composition patterns
// - Performance optimization
// - TypeScript interfaces
// - React lifecycle management
// - Hardware acceleration
// - Cross-technology integration
//
// ¡Es un ejemplo excelente de cómo crear presentaciones visuales impactantes!
// ===========================================
```

## File: src/modules/profile/components/WordCloud.tsx
```typescript
import React, { useEffect, useRef } from 'react'; // Importamos React y useRef
import { gsap } from 'gsap'; // Importamos GSAP para animaciones
import IonIcon from '@reacticons/ionicons'; // Importamos Ionicons para iconos

/*
WordCloud es un componente que renderiza una nube de palabras interactiva
usando GSAP para animaciones suaves. Es un ejemplo perfecto de cómo crear
efectos visuales atractivos con interacción del usuario.
*/

const WordCloud = () => {
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]); // Referencia para los iconos
  const words = [
    { name: 'logo-javascript', icon: <IonIcon name="logo-javascript" className='hover:text-yellow-500'/> },
    { name: 'logo-github', icon: <IonIcon name="logo-github" /> },
    { name: 'logo-sql', icon: <IonIcon name="server" className='hover:text-green-600'/> },
    { name: 'logo-laravel', icon: <IonIcon name="logo-laravel" className='hover:text-orange-600'/> },
    { name: 'logo-sass', icon: <IonIcon name="logo-sass" className='hover:text-purple-700'/> },
    { name: 'logo-python', icon: <IonIcon name="logo-python" className='hover:text-blue-700'/> },
    { name: 'logo-css3', icon: <IonIcon name="logo-css3" className='hover:text-blue-800'/> },
    { name: 'logo-html5', icon: <IonIcon name="logo-html5" className='hover:text-orange-500'/> }
  ]; // Lista de iconos

  // Función para generar un tamaño aleatorio entre 10 y 24
  const getRandomSize = () => Math.floor(Math.random() * (20 - 5 + 5)) + 20;
  // Función que se activa al mover el mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e; // Obtenemos la posición del mouse
    wordsRef.current.forEach((word) => {
      if (word) {
        const rect = word.getBoundingClientRect(); // Obtenemos el tamaño y posición del icono
        const x = rect.left + rect.width / 2; // Calculamos el centro en X
        const y = rect.top + rect.height / 2; // Calculamos el centro en Y
        const deltaX = clientX - x; // Diferencia en X
        const deltaY = clientY - y; // Diferencia en Y

        // Animamos el icono para que se aleje del mouse
        gsap.to(word, {
          x: (deltaX / 10) * -1, // Movemos en dirección opuesta al mouse
          y: (deltaY / 10) * -1, // Movemos en dirección opuesta al mouse
          duration: 0.5,
          ease: 'power1.out'
        });
      }
    });
  };


  // Función que se activa al entrar el mouse en un icono
  const handleMouseEnter = (index: number) => {
    if (wordsRef.current[index]) {
      gsap.to(wordsRef.current[index], {
        scale: 2.5, // Aumentamos el tamaño del icono
        duration: 0.3,
        ease: 'power1.out'
      });
    }
  };


  // Función que se activa al salir el mouse de un icono
  const handleMouseLeave = (index: number) => {
    if (wordsRef.current[index]) {
      gsap.to(wordsRef.current[index], {
        scale: 1.5, // Regresamos al tamaño original
        duration: 0.3,
        ease: 'power1.out'
      });
    }
  };


  // Usamos useEffect para limpiar el código y evitar fugas de memoria
  useEffect(() => {
    const handleMouseLeaveWindow = () => {
      // Función para manejar el evento de salir de la ventana
      wordsRef.current.forEach((word) => {
        if (word) {
          gsap.to(word, {
            x: 0, // Regresamos a la posición original
            y: 0,
            duration: 0.5,
            ease: 'elastic.out'
          });
        }
      });
    };


    window.addEventListener('mouseleave', handleMouseLeaveWindow); // Agregamos el evento

    // Limpiamos el evento al desmontar el componente
    return () => {
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  
  return (
    <div
      onMouseMove={handleMouseMove} // Evento para mover el mouse
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',height : '150px', position: 'relative', alignContent: 'center', color: 'white' }}
      id='skills'
      className='my-20'
    >
      {words.map((word, index) => (
        <div
          key={index}
          ref={el => wordsRef.current[index] = el} // Asignamos la referencia
          style={{
            fontSize: `${getRandomSize()}px`, // Tamaño aleatorio inicial
            margin: '20px',
            opacity: 1,
            transition: 'opacity 0.5s',
            cursor: 'pointer'
          }}
          onMouseEnter={() => handleMouseEnter(index)} // Evento al entrar
          onMouseLeave={() => handleMouseLeave(index)} // Evento al salir
        >
          {word.icon} {/* Renderizamos el icono */}
        </div>
      ))}
    </div>
  );
};

export default WordCloud; // Exportamos el componente

// ===========================================
// 📚 EXPLICACIÓN DIDÁCTICA DEL CÓDIGO
// ===========================================
// 
// Este archivo es un COMPONENTE REACT que crea una nube de palabras interactiva
// usando GSAP para animaciones suaves. Es un ejemplo perfecto de cómo crear
// efectos visuales atractivos con interacción del usuario. Te explico paso a paso:
//
// 🎯 ¿QUÉ ES ESTE ARCHIVO?
// Es un componente que renderiza una colección de iconos de tecnologías que
// reaccionan al movimiento del mouse, creando un efecto de "repulsión" y
// escalado interactivo. Usa GSAP para animaciones fluidas y profesionales.
//
// 📋 DESGLOSE POR SECCIONES:
//
// 1. IMPORTS Y DEPENDENCIAS (líneas 1-3):
//    - React: useEffect, useRef para manejo de estado y referencias
//    - GSAP: Biblioteca de animaciones de alto rendimiento
//    - IonIcon: Iconos de Ionicons para tecnologías
//    - ¿Por qué GSAP? Mejor rendimiento que CSS transitions
//
// 2. CONFIGURACIÓN INICIAL (líneas 5-16):
//    - wordsRef: Array de referencias para cada icono
//    - words: Array de objetos con nombre e icono
//    - Hover classes: Colores específicos para cada tecnología
//    - ¿Por qué array de refs? Permite animar múltiples elementos
//
// 3. FUNCIONES UTILITARIAS (líneas 19-20):
//    - getRandomSize: Genera tamaños aleatorios entre 20-40px
//    - Math.random(): Crea variación visual en los iconos
//    - ¿Por qué aleatorio? Evita que se vea uniforme y aburrido
//
// 4. INTERACCIÓN CON MOUSE (líneas 23-43):
//    - handleMouseMove: Función principal de interacción
//    - clientX, clientY: Posición del mouse en la pantalla
//    - getBoundingClientRect(): Obtiene posición y tamaño del elemento
//    - Cálculo de distancia: deltaX, deltaY para determinar dirección
//    - GSAP.to(): Anima el elemento hacia la dirección opuesta
//    - ¿Por qué /10? Reduce la intensidad del movimiento
//
// 5. ANIMACIONES DE HOVER (líneas 46-67):
//    - handleMouseEnter: Escala el icono a 2.5x
//    - handleMouseLeave: Regresa a escala 1.5x
//    - duration: 0.3s para respuesta rápida
//    - ease: 'power1.out' para animación suave
//    - ¿Por qué diferentes escalas? Crea jerarquía visual
//
// 6. CLEANUP Y RESET (líneas 70-93):
//    - handleMouseLeaveWindow: Resetea posiciones al salir de la ventana
//    - useEffect: Maneja el ciclo de vida del componente
//    - addEventListener/removeEventListener: Gestión de eventos
//    - ¿Por qué reset? Evita que los iconos queden "perdidos"
//
// 7. RENDER (líneas 96-121):
//    - onMouseMove: Escucha el movimiento del mouse
//    - Flexbox: Layout flexible para distribución de iconos
//    - map(): Renderiza cada icono con sus props
//    - ref callback: Asigna referencia a cada elemento
//    - Event handlers: onMouseEnter/onMouseLeave
//
// 🎨 CONCEPTOS DE GSAP:
//
// 1. ANIMACIONES BÁSICAS:
//    - gsap.to(): Anima hacia un valor específico
//    - duration: Tiempo de duración en segundos
//    - ease: Función de suavizado (power1.out, elastic.out)
//
// 2. PROPIEDADES ANIMABLES:
//    - x, y: Transformaciones 2D
//    - scale: Escalado del elemento
//    - opacity: Transparencia
//    - rotation: Rotación
//
// 3. EASING FUNCTIONS:
//    - power1.out: Aceleración suave
//    - elastic.out: Efecto de rebote
//    - bounce.out: Efecto de salto
//
// ⚡ OPTIMIZACIONES DE RENDIMIENTO:
//
// 1. GSAP BENEFITS:
//    - Hardware acceleration: Usa GPU automáticamente
//    - Batch updates: Agrupa cambios para mejor rendimiento
//    - RequestAnimationFrame: Sincroniza con el refresh rate
//
// 2. EVENT HANDLING:
//    - Throttling: GSAP maneja automáticamente el throttling
//    - Debouncing: Evita animaciones excesivas
//    - Cleanup: Remove event listeners correctamente
//
// 3. MEMORY MANAGEMENT:
//    - useEffect cleanup: Previene memory leaks
//    - Event listener removal: Limpia recursos
//    - Ref management: Gestión eficiente de referencias
//
// 🎯 PATRONES APLICADOS:
//
// 1. INTERACTIVE DESIGN:
//    - Mouse tracking: Seguimiento de posición del cursor
//    - Proximity effects: Efectos basados en distancia
//    - Hover states: Estados de interacción
//
// 2. ANIMATION PATTERNS:
//    - Stagger animations: Animaciones escalonadas
//    - Easing functions: Curvas de animación naturales
//    - Reset patterns: Vuelta al estado original
//
// 3. COMPONENT ARCHITECTURE:
//    - Separation of concerns: Lógica separada por función
//    - Event handling: Manejo centralizado de eventos
//    - State management: Estado local con useRef
//
// 🚀 FLUJO DE INTERACCIÓN:
// 1. Usuario mueve el mouse sobre el contenedor
// 2. handleMouseMove calcula distancias a cada icono
// 3. GSAP anima cada icono en dirección opuesta
// 4. Al hacer hover, el icono se escala
// 5. Al salir del hover, regresa a escala normal
// 6. Al salir de la ventana, todos los iconos se resetean
//
// 🎓 CONCEPTOS AVANZADOS APRENDIDOS:
// - Integración de GSAP con React
// - Mouse tracking y cálculos de distancia
// - Event handling avanzado
// - Animation performance
// - Component lifecycle management
// - Interactive design patterns
// - Hardware acceleration
// - Memory management
//
// ¡Es un ejemplo excelente de cómo crear interacciones fluidas y atractivas!
// ===========================================
```

## File: src/modules/auth/hooks/useAdminAuth.ts
```typescript
/**
 * @file useAdminAuth.ts
 * @description Hook de autenticación para el panel de administración.
 * Gestiona sesión de Supabase Auth, login, registro y cierre de sesión.
 * Solo usuarios cuyo email está en la tabla `admin_emails` pueden acceder al admin.
 */
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { User, Session } from '@supabase/supabase-js';

/**
 * Hook que proporciona estado de autenticación y métodos para iniciar/cerrar sesión en el admin.
 * Suscribe a cambios de sesión con onAuthStateChange y expone user, session y loading.
 * @returns Objeto con user, session, loading, signIn, signOut e isConfigured
 * @example
 * const { user, loading, signIn, signOut, isConfigured } = useAdminAuth();
 * if (!isConfigured) return <SetupMessage />;
 * if (!user) return <LoginForm onSubmit={signIn} />;
 * return <AdminPanel />;
 */
export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  /**
   * Inicia sesión con email y contraseña.
   * @param email - Correo del usuario
   * @param password - Contraseña
   * @returns Resultado de signInWithPassword de Supabase
   */
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  /**
   * Cierra la sesión actual del usuario.
   */
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, session, loading, signIn, signOut, isConfigured: isSupabaseConfigured };
}
```

## File: src/modules/auth/pages/AdminLogin.tsx
```typescript
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { testSupabaseConnection, type ConnectionTestResult } from '../../../core/utils/testSupabaseConnection';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dbTest, setDbTest] = useState<ConnectionTestResult | null>(null);
  const { user, loading: authLoading, signIn, isConfigured } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConfigured) return;
    testSupabaseConnection().then(setDbTest);
  }, [isConfigured]);

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 p-4">
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 max-w-sm text-center">
          <p className="text-slate-300">Supabase no está configurado. Añade <code className="text-blue-400">VITE_SUPABASE_URL</code> y <code className="text-blue-400">VITE_SUPABASE_ANON_KEY</code> en .env</p>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span>Cargando...</span>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err.message ?? 'Error al iniciar sesión');
      return;
    }
    navigate('/admin', { replace: true });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200 p-4">
      <div className="w-full max-w-sm space-y-3">
        {dbTest && !dbTest.ok && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-300">
            <strong>Base de datos:</strong> {dbTest.error}
            <p className="mt-1 text-xs text-red-400/70">Comprueba que las migraciones estén aplicadas en Supabase (SQL Editor).</p>
          </div>
        )}
        {dbTest?.ok && (
          <p className="text-center text-xs text-emerald-400">Conexión a la base de datos correcta</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 border border-white/10"
        >
          <h1 className="text-xl font-bold text-center text-white">Admin</h1>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                         text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                         focus:ring-1 focus:ring-blue-500/20 transition-all"
              placeholder="tu@email.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                         text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                         focus:ring-1 focus:ring-blue-500/20 transition-all"
              placeholder="••••••"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                       text-white font-medium hover:from-blue-500 hover:to-blue-400
                       transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                       disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};
```

## File: src/modules/contact/admin/AdminMessages.tsx
```typescript
import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import type { ContactSubmissionRow } from '../../../types/supabase';

export const AdminMessages: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: messages, isLoading } = useQuery({
    queryKey: ['contact_submissions'],
    queryFn: async () => {
      const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as ContactSubmissionRow[];
    },
    enabled: isSupabaseConfigured,
  });

  const deleteMessage = async (id: string) => {
    await supabase.from('contact_submissions').delete().eq('id', id);
    queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <p className="text-slate-400">Supabase no configurado.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Mensajes de contacto</h2>
        <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400">Cargando mensajes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-bold text-white">Mensajes de contacto</h2>
        {messages && messages.length > 0 && (
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400">
            {messages.length} mensaje{messages.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {!messages?.length ? (
        <div className="text-center py-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-slate-400 text-lg">No hay mensajes</p>
          <p className="text-slate-500 text-sm mt-1">Los mensajes del formulario de contacto aparecerán aquí</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10
                         p-4 sm:p-5 space-y-3 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.07]"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate">{m.name}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-sm text-blue-400 hover:text-blue-300 truncate block transition-colors"
                  >
                    {m.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500">
                    {new Date(m.created_at).toLocaleDateString('es', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </span>
                  <button
                    onClick={() => deleteMessage(m.id)}
                    className="p-1.5 rounded-lg text-slate-500 opacity-0 group-hover:opacity-100
                               hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Phone */}
              {m.phone && (
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {m.phone}
                </div>
              )}

              {/* Message */}
              <div className="pt-2 border-t border-white/5">
                <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{m.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

## File: src/modules/contact/components/ContactForm.tsx
```typescript
'use client';

import React, { useState, useRef, useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { isValidEmail } from './utils/validation';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { trackContactAttempt } from '../utils/analytics';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormField = keyof FormData;

interface SocialLink {
  name: string;
  icon: React.ComponentProps<typeof IonIcon>['name'];
  url: string;
  hoverColor: string;
  ariaLabel: string;
}

const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/+584265940917',
  instagram: 'https://www.instagram.com/techno__monster/',
  github: 'https://github.com/Will855'
};

const SOCIAL_ITEMS: SocialLink[] = [
  { name: 'whatsapp', icon: 'logo-whatsapp', url: SOCIAL_LINKS.whatsapp, hoverColor: 'hover:text-green-400', ariaLabel: 'Contactar por WhatsApp' },
  { name: 'instagram', icon: 'logo-instagram', url: SOCIAL_LINKS.instagram, hoverColor: 'hover:text-pink-400', ariaLabel: 'Seguir en Instagram' },
  { name: 'github', icon: 'logo-github', url: SOCIAL_LINKS.github, hoverColor: 'hover:text-gray-400', ariaLabel: 'Ver perfil de GitHub' }
];

const AnimatedInput: React.FC<{
  label: string;
  name: FormField;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}> = ({ label, name, type, placeholder, value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isFocused) {
      gsap.to(labelRef.current, { scale: 1.02, duration: 0.3 });
      gsap.to(inputRef.current, { scale: 1.01, duration: 0.3 });
      gsap.to(underlineRef.current, { width: '100%', duration: 0.3 });
    } else {
      gsap.to(labelRef.current, { scale: 1, duration: 0.3 });
      gsap.to(inputRef.current, { scale: 1, duration: 0.3 });
      gsap.to(underlineRef.current, { width: 0, duration: 0.3 });
    }
  }, [isFocused]);

  return (
    <div ref={containerRef} className="form-item opacity-0 translate-y-5 relative">
      <label
        ref={labelRef}
        htmlFor={name}
        className={`block mb-2 font-medium transition-colors duration-300 origin-left ${
          isFocused ? 'text-blue-400' : 'text-slate-200'
        }`}
      >
        {label}
      </label>
      <div ref={inputRef} className="relative transform-gpu">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 text-white bg-white/5 border-2 rounded-xl backdrop-blur-sm focus:outline-none transition-all duration-300 ${
            error
              ? 'border-red-500/50 focus:border-red-400'
              : isFocused
              ? 'border-blue-400/50 focus:border-blue-400'
              : 'border-white/10 hover:border-white/20'
          }`}
          placeholder={placeholder}
        />
        <div
          ref={underlineRef}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 w-0"
        />
      </div>
    </div>
  );
};

const AnimatedTextarea: React.FC<{
  label: string;
  name: FormField;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
}> = ({ label, name, placeholder, value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  useGSAP(() => {
    if (isFocused) {
      gsap.to(labelRef.current, { scale: 1.02, duration: 0.3 });
    } else {
      gsap.to(labelRef.current, { scale: 1, duration: 0.3 });
    }
  }, [isFocused]);

  return (
    <div ref={containerRef} className="form-item opacity-0 translate-y-5 relative">
      <label
        ref={labelRef}
        htmlFor={name}
        className={`block mb-2 font-medium transition-colors duration-300 origin-left ${
          isFocused ? 'text-blue-400' : 'text-slate-200'
        }`}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-3 text-white bg-white/5 border-2 rounded-xl backdrop-blur-sm focus:outline-none transition-all duration-300 resize-none ${
          error
            ? 'border-red-500/50 focus:border-red-400'
            : isFocused
            ? 'border-blue-400/50 focus:border-blue-400'
            : 'border-white/10 hover:border-white/20'
        }`}
        placeholder={placeholder}
      />
    </div>
  );
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FormField, boolean>>>({});

  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(formRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 })
      .fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 })
      .fromTo(".form-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.2")
      .fromTo(buttonRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .fromTo(socialRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
  }, []);

  useGSAP(() => {
    if (responseMessage && responseRef.current) {
      gsap.fromTo(responseRef.current, { opacity: 0, y: -10, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" });
    }
  }, [responseMessage]);

  useGSAP(() => {
    if (error && errorRef.current) {
      gsap.fromTo(errorRef.current, { opacity: 0, y: -10, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" });
    }
  }, [error]);

  useGSAP(() => {
    if (isSubmitting && spinnerRef.current) {
      gsap.to(spinnerRef.current, { rotation: 360, repeat: -1, duration: 1, ease: "linear" });
    }
  }, [isSubmitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (fieldErrors[name as FormField]) {
      setFieldErrors({ ...fieldErrors, [name]: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setResponseMessage('');

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setError('Por favor, completa todos los campos del formulario.');
        setFieldErrors({
          name: !formData.name.trim(),
          email: !formData.email.trim(),
          message: !formData.message.trim()
        });
        setIsSubmitting(false);
        return;
      }

      if (!isValidEmail(formData.email)) {
        setError('Por favor, ingresa un correo electrónico válido.');
        setFieldErrors({ email: true });
        setIsSubmitting(false);
        return;
      }

      if (formData.phone && !/^\d{11}$/.test(formData.phone)) {
        setError('Por favor, ingresa un número de teléfono válido (11 dígitos).');
        setFieldErrors({ phone: true });
        setIsSubmitting(false);
        return;
      }

      if (!isSupabaseConfigured) {
        setError('El formulario de contacto no está configurado.');
        setIsSubmitting(false);
        return;
      }
      const { error: submitError } = await supabase.from('contact_submissions').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        message: formData.message.trim(),
      });
      if (submitError) throw submitError;

      setResponseMessage('¡Formulario enviado con éxito!');
      setError('');
      setFieldErrors({});
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
      setResponseMessage('');
      setError('Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 overflow-hidden mt-12">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-lg relative z-10 opacity-0"
      >
        <div className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent opacity-0"
          >
            Contáctame
          </h2>

          <div className="space-y-5">
            <AnimatedInput
              label="Nombre"
              name="name"
              type="text"
              placeholder="Tu nombre completo"
              value={formData.name}
              onChange={handleChange}
              error={fieldErrors.name}
            />
            <AnimatedInput
              label="Email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
            />
            <AnimatedInput
              label="Teléfono"
              name="phone"
              type="tel"
              placeholder="04XX XXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              error={fieldErrors.phone}
            />
            <AnimatedTextarea
              label="Mensaje"
              name="message"
              placeholder="Cuéntame sobre tu proyecto..."
              value={formData.message}
              onChange={handleChange}
              error={fieldErrors.message}
            />

            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden opacity-0 transform-gpu"
              onMouseEnter={(e) => {
                if (!isSubmitting) gsap.to(e.currentTarget, { scale: 1.02, boxShadow: "0 10px 30px rgba(96, 165, 250, 0.3)", duration: 0.3 });
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) gsap.to(e.currentTarget, { scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", duration: 0.3 });
              }}
              onMouseDown={(e) => {
                if (!isSubmitting) gsap.to(e.currentTarget, { scale: 0.98, duration: 0.1 });
              }}
              onMouseUp={(e) => {
                if (!isSubmitting) gsap.to(e.currentTarget, { scale: 1.02, duration: 0.1 });
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div
                    ref={spinnerRef}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>Enviando...</span>
                </div>
              ) : (
                <span>Enviar Mensaje</span>
              )}
            </button>
          </div>

          {responseMessage && (
            <div
              ref={responseRef}
              className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center text-green-400 opacity-0"
            >
              {responseMessage}
            </div>
          )}
          {error && (
            <div
              ref={errorRef}
              className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-center text-red-400 opacity-0"
            >
              {error}
            </div>
          )}

          <div
            ref={socialRef}
            className="flex justify-center space-x-6 mt-8 opacity-0"
          >
            {SOCIAL_ITEMS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactAttempt(social.name)}
                className={`text-white transition-colors duration-300 ${social.hoverColor} block`}
                aria-label={social.ariaLabel}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.2, rotate: 5, duration: 0.3, ease: "back.out(1.7)" })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.3, ease: "back.out(1.7)" })}
                onMouseDown={(e) => gsap.to(e.currentTarget, { scale: 0.9, duration: 0.1 })}
                onMouseUp={(e) => gsap.to(e.currentTarget, { scale: 1.2, duration: 0.1 })}
              >
                <IonIcon name={social.icon} className="text-3xl cursor-pointer" />
              </a>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
```

## File: src/modules/profile/admin/AdminHero.tsx
```typescript
import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../shared/services/supabase/supabase';
import { useHeroContent } from '../hooks/useHeroContent';
import { STORAGE_BUCKET } from '../../../types/supabase';

const DEFAULT_TITLE = 'Wilmer Lynch';
const DEFAULT_SUBTITLE = 'Web Developer';

export const AdminHero: React.FC = () => {
  const { hero } = useHeroContent();
  const safeHero = hero ?? { title: DEFAULT_TITLE, subtitle: DEFAULT_SUBTITLE, profile_image_url: '/profile.jpeg' };
  const [title, setTitle] = useState(safeHero.title);
  const [subtitle, setSubtitle] = useState(safeHero.subtitle);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setTitle(safeHero.title);
    setSubtitle(safeHero.subtitle);
  }, [safeHero.title, safeHero.subtitle]);

  const saveText = async () => {
    setSaving(true);
    await supabase.from('hero_content').update({ title, subtitle, updated_at: new Date().toISOString() }).eq('id', 'default');
    queryClient.invalidateQueries({ queryKey: ['hero_content'] });
    setSaving(false);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `avatars/profile.${file.name.split('.').pop() || 'jpeg'}`;
    await supabase.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: true });
    await supabase.from('hero_content').update({ profile_image_path: path, updated_at: new Date().toISOString() }).eq('id', 'default');
    queryClient.invalidateQueries({ queryKey: ['hero_content'] });
    setUploading(false);
    e.target.value = '';
  };

  const imgSrc = safeHero.profile_image_url?.startsWith('http') || safeHero.profile_image_url?.startsWith('/')
    ? safeHero.profile_image_url
    : '/profile.jpeg';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Hero</h2>

      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 sm:p-6 space-y-6">
        {/* Profile image */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <img
            src={imgSrc}
            alt=""
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover bg-slate-700 border-2 border-white/10 shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).src = '/profile.jpeg'; }}
          />
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <label className="block text-sm font-medium text-slate-300">Foto de perfil</label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              disabled={uploading}
              className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4
                         file:rounded-lg file:border-0 file:bg-white/10 file:text-white/80
                         file:font-medium file:cursor-pointer hover:file:bg-white/15
                         file:transition-all cursor-pointer"
            />
            {uploading && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                Subiendo...
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300">Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                       focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300">Subtítulo</label>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                       focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Save */}
        <button
          onClick={saveText}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500
                     text-white font-medium hover:from-blue-500 hover:to-blue-400
                     transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50
                     disabled:cursor-not-allowed active:scale-95 flex items-center gap-2"
        >
          {saving && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {saving ? 'Guardando...' : 'Guardar textos'}
        </button>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-slate-300">Vista previa</h3>
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 flex flex-col items-center gap-4">
          <img
            src={imgSrc}
            alt=""
            className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
            onError={(e) => { (e.target as HTMLImageElement).src = '/profile.jpeg'; }}
          />
          <div className="text-center">
            <h4 className="text-2xl sm:text-3xl font-bold text-white">{title || DEFAULT_TITLE}</h4>
            <p className="text-slate-400 mt-1">{subtitle || DEFAULT_SUBTITLE}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## File: src/modules/profile/hooks/useHeroContent.ts
```typescript
/**
 * @file useHeroContent.ts
 * @description Hook para obtener el contenido del Hero (título, subtítulo, imagen de perfil)
 * desde la tabla hero_content de Supabase. Hay una única fila con id 'default'.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../../../shared/services/supabase/supabase';
import { getStoragePublicUrl } from '../../../shared/services/supabase/supabaseStorage';
import type { HeroContent } from '../../../types/supabase';

/** Hero por defecto cuando Supabase no está configurado o no hay datos. */
const DEFAULT_HERO: HeroContent & { profile_image_url: string } = {
  id: 'default',
  title: 'Wilmer Lynch',
  subtitle: 'Web Developer',
  profile_image_path: 'avatars/profile.jpeg',
  updated_at: '',
  profile_image_url: '/profile.jpeg',
};

/**
 * Obtiene el contenido del hero (fila id='default') y resuelve la URL de la imagen de perfil.
 * @returns Hero con profile_image_url absoluta
 * @internal
 */
async function fetchHero(): Promise<HeroContent & { profile_image_url: string }> {
  if (!isSupabaseConfigured) return DEFAULT_HERO;
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .eq('id', 'default')
    .single();
  if (error || !data) return DEFAULT_HERO;
  const row = data as HeroContent;
  return {
    ...row,
    profile_image_url: getStoragePublicUrl(row.profile_image_path) || '/profile.jpeg',
  };
}

/**
 * Hook que expone el contenido del Hero para la página de inicio.
 * @returns hero (título, subtítulo, profile_image_url), isLoading, error y refetch
 * @example
 * const { hero, isLoading } = useHeroContent();
 * return (
 *   <section>
 *     <img src={hero.profile_image_url} alt="" />
 *     <h1>{hero.title}</h1>
 *     <p>{hero.subtitle}</p>
 *   </section>
 * );
 */
export function useHeroContent() {
  const q = useQuery({
    queryKey: ['hero_content'],
    queryFn: fetchHero,
    staleTime: 5 * 60 * 1000,
    placeholderData: DEFAULT_HERO,
  });
  return {
    hero: q.data ?? DEFAULT_HERO,
    isLoading: q.isLoading,
    error: q.error,
    refetch: q.refetch,
  };
}
```
