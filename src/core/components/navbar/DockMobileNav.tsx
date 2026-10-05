'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import IonIcon from '@reacticons/ionicons';
import { useNavItems } from '../../hooks/useNavItems';
import { getNavMetadata } from '../../config/navigation';

const DockMobileNav = () => {
    const pathname = usePathname();
    const navItems = useNavItems();
    const dockRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    
    // Estado para controlar si el dock está expandido o colapsado
    const [isExpanded, setIsExpanded] = useState(false);

    // Animación de entrada GSAP al montar
    useEffect(() => {
        if (dockRef.current) {
            gsap.fromTo(
                dockRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)', delay: 0.2 }
            );
        }
    }, []);

    // Cerrar el dock si el usuario hace tap afuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (isExpanded && navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isExpanded]);

    // Calcular metadatos para decidir qué ítem está activo
    const navItemsMetadata = navItems.map(item => {
        const meta = getNavMetadata(item);
        const isActive = pathname === meta.href || (pathname === '/' && meta.normalized === 'inicio') || (meta.normalized === 'notas' && pathname.startsWith('/notas'));
        return { ...meta, isActive };
    });

    // Validar si estamos en una página que no está en el menú (ej. 404). 
    // Si no hay ninguno activo, forzamos que el primero se considere activo visualmente para el botón colapsado.
    const hasActiveItem = navItemsMetadata.some(item => item.isActive);
    if (!hasActiveItem && navItemsMetadata.length > 0) {
        navItemsMetadata[0].isActive = true;
    }

    return (
        <div 
            ref={dockRef}
            className="sm:hidden fixed bottom-6 left-0 w-full px-4 z-50 flex justify-center pointer-events-none"
        >
            <nav 
                ref={navRef}
                className="pointer-events-auto flex items-center p-2 rounded-full bg-slate-950/90 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ willChange: 'transform, width' }}
            >
                {navItemsMetadata.map(({ label, href, icon, isActive }) => {
                    const isVisible = isExpanded || isActive;

                    return (
                        <div
                            key={label}
                            className={`
                                overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                                ${isVisible ? 'w-16 mx-1 opacity-100 scale-100' : 'w-0 mx-0 opacity-0 scale-75 pointer-events-none'}
                            `}
                        >
                            <Link
                                href={href}
                                onClick={(e) => {
                                    if (!isExpanded) {
                                        e.preventDefault();
                                        setIsExpanded(true);
                                    } else if (isActive) {
                                        e.preventDefault();
                                        setIsExpanded(false);
                                    } else {
                                        setIsExpanded(false);
                                    }
                                }}
                                className={`
                                    relative w-16 h-14 flex flex-col items-center justify-center rounded-xl transition-colors duration-300
                                    ${isActive && isExpanded ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'}
                                    ${!isExpanded && isActive ? 'text-white' : ''}
                                `}
                            >
                                {/* Contenedor interno para alinear ícono y texto independientemente del ancho */}
                                <div className="flex flex-col items-center justify-center w-full h-full transform transition-transform duration-500 ease-out">
                                    <IonIcon
                                        name={icon as any}
                                        style={{ width: '1em', height: '1em', display: 'block' }}
                                        className={`
                                            transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                                            ${!isExpanded ? 'text-3xl translate-y-0' : 'text-xl -translate-y-1'}
                                        `}
                                    />
                                    
                                    <span 
                                        className={`
                                            absolute bottom-2 text-[10px] font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                                            ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                                        `}
                                    >
                                        {label}
                                    </span>
                                </div>

                                {/* Indicador Activo (Puntito) */}
                                {isActive && isExpanded && (
                                    <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                )}
                            </Link>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

export default DockMobileNav;
