'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import IonIcon from '@reacticons/ionicons';
import { useNavItems } from '../../hooks/useNavItems';

function ResponsiveMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const sidebarRef = useRef(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);
    const navItems = useNavItems();

    // useEffect para inicializar el estado del menú y sus elementos
    useEffect(() => {
        // Configuración inicial: oculta el menú fuera de la pantalla (a la derecha)
        gsap.set(sidebarRef.current, { x: '100%' });
        // Configuración inicial: oculta los elementos del menú con opacidad y desplazamiento
        gsap.set('.nav-item', { opacity: 0, y: 20 });

        // Limpieza: elimina cualquier animación activa al desmontar el componente
        return () => {
            animationRef.current?.kill();
        };
    }, []);

    // useEffect para manejar las animaciones cuando el estado `isOpen` cambia
    useEffect(() => {
        // Limpia cualquier animación previa
        animationRef.current?.kill();

        // Crea una nueva línea de tiempo para las animaciones
        animationRef.current = gsap.timeline({
            defaults: { ease: 'power3.inOut', duration: 0.3 }, // Configuración por defecto
            onComplete: () => {
                // Si el menú está cerrado, oculta el contenedor fuera de la pantalla
                if (!isOpen) gsap.set(sidebarRef.current, { x: '100%' });
            }
        });

        if (isOpen) {
            // Animación para abrir el menú
            animationRef.current
                .to(sidebarRef.current, {
                    x: '0%', // Mueve el menú a la posición visible
                    backdropFilter: 'blur(12px)', // Aplica un desenfoque al fondo
                    force3D: true // Mejora el rendimiento en dispositivos
                })
                .to(
                    '.nav-item',
                    {
                        y: 0, // Restablece la posición vertical
                        opacity: 1, // Hace visibles los elementos
                        stagger: 0.08, // Retraso entre elementos
                        duration: 0.25,
                        ease: 'back.out(1.2)', // Efecto de rebote
                        immediateRender: false
                    },
                    0.2 // Inicia esta animación después de 0.2 segundos
                );
        } else {
            // Animación para cerrar el menú
            animationRef.current
                .to('.nav-item', {
                    y: 20, // Desplaza los elementos hacia abajo
                    opacity: 0, // Los hace invisibles
                    stagger: -0.05, // Retraso inverso entre elementos
                    duration: 0.2
                })
                .to(
                    sidebarRef.current,
                    {
                        x: '100%', // Mueve el menú fuera de la pantalla
                        backdropFilter: 'blur(0px)', // Elimina el desenfoque
                        force3D: true
                    },
                    0 // Inicia esta animación inmediatamente
                );
        }
    }, [isOpen]); // Se ejecuta cada vez que `isOpen` cambia

    return (
        <>
            {/* Botón para abrir/cerrar el menú */}
            <button
                onClick={() => setIsOpen(!isOpen)} // Alterna el estado del menú
                className="fixed top-4 left-4 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg sm:hidden"
                aria-label="Toggle menu" // Accesibilidad
                style={{ willChange: 'transform' }} // Optimización de rendimiento
            >
                {/* Icono dinámico según el estado del menú */}
                <IonIcon
                    name={isOpen ? "close-outline" : "menu-outline"}
                    className="text-2xl text-gray-800 pt-1 px-1"
                />
            </button>

            {/* Contenedor del menú lateral */}
            <nav
                ref={sidebarRef} // Referencia para manipulación con GSAP
                className="fixed top-0 right-0 h-full w-64 z-40 bg-white/70 backdrop-blur-lg shadow-xl"
                style={{ willChange: 'transform, backdrop-filter' }} // Optimización de rendimiento
            >
                {/* Lista de elementos del menú */}
                <ul className="flex flex-col h-full justify-center items-start p-6 space-y-4">
                    {navItems.map((item) => {
                        const href = `/${item.toLowerCase()}`;
                        const isActive = pathname === href || (pathname === '/' && href === '/inicio');
                        return (
                            <li
                                key={item} // Clave única para cada elemento
                                className="nav-item" // Clase para animaciones
                                style={{ willChange: 'transform, opacity' }} // Optimización
                            >
                                {/* Enlace de navegación */}
                                <Link
                                    href={href} // Ruta dinámica
                                    className={`
                                        px-4 py-3 w-full block
                                        text-lg font-medium rounded-xl
                                        transition-colors duration-200
                                        hover:bg-gray-200/50
                                        ${isActive ? 'bg-gray-200/50' : ''}
                                    `}
                                    onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
                                >
                                    {item} {/* Texto del enlace */}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}

export default ResponsiveMenu;