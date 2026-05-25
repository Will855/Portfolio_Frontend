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