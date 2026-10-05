"use client";

import React, { useEffect, useRef } from "react";

// Parámetros físicos idénticos a la simulación original
const STAR_COUNT = 700;
const FALL_SPEED = 4.8; // Unidades del mundo 3D por segundo (independiente de FPS)
const WORLD_BOUND_Y = 50; // Límites del volumen cúbico 3D [-50, 50]
const MIN_DEPTH = 5;      // Plano cercano de proyección
const MAX_DEPTH = 95;     // Plano lejano de proyección

const BackgroundStars = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // Comprobar preferencia de accesibilidad (ahorro de batería / sin movimiento)
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // ─── Estructura de Memoria Zero-GC (Float32Array plano) ─────────────
        // Evita pausas de recolección de basura (GC) en el motor V8
        // [x0, y0, z0,  x1, y1, z1, ...]
        const stars = new Float32Array(STAR_COUNT * 3);
        for (let i = 0; i < STAR_COUNT * 3; i += 3) {
            stars[i]     = (Math.random() - 0.5) * 100;                 // X: [-50, 50]
            stars[i + 1] = (Math.random() - 0.5) * 100;                 // Y: [-50, 50]
            stars[i + 2] = MIN_DEPTH + Math.random() * (MAX_DEPTH - MIN_DEPTH); // Z: [5, 95]
        }

        let width = 0;
        let height = 0;
        let fovFactor = 0;
        let dpr = 1;

        // ─── Calibración de Resolución y Matriz de Proyección ──────────────
        const handleResize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);

            // Distancia focal derivada de una cámara con FOV ~100 grados
            // f = (dimension / 2) / tan(FOV / 2) -> para 100deg, tan(50deg) ≈ 1.1917
            fovFactor = (Math.min(width, height) * 0.5) / 1.1917;
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        // ─── Bucle Cinemático con Geometría Proyectiva (Pinhole Camera) ────
        let rafId = 0;
        let lastTime = -1;
        let isRunning = true;

        const renderFrame = (now: number) => {
            if (!isRunning) return;

            if (lastTime < 0) {
                lastTime = now;
            }
            const delta = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            // Limpieza del fotograma
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = (width * 0.5) * dpr;
            const cy = (height * 0.5) * dpr;
            const fov = fovFactor * dpr;
            const step = FALL_SPEED * delta;

            ctx.fillStyle = "#ffffff";

            for (let i = 0; i < STAR_COUNT * 3; i += 3) {
                // Cinemática: caída vertical por delta-time
                if (!prefersReducedMotion) {
                    stars[i + 1] -= step;
                    // Envoltura toroidal: al cruzar el límite inferior, reaparece arriba
                    if (stars[i + 1] < -WORLD_BOUND_Y) {
                        stars[i + 1] = WORLD_BOUND_Y;
                        stars[i]     = (Math.random() - 0.5) * 100;
                        stars[i + 2] = MIN_DEPTH + Math.random() * (MAX_DEPTH - MIN_DEPTH);
                    }
                }

                const z = stars[i + 2];
                // Proyección de Perspectiva 3D: S = focal / Z
                const scale = fov / z;
                const screenX = cx + stars[i] * scale;
                const screenY = cy - stars[i + 1] * scale; // Inversión de eje Y para coordenadas cartesianas

                // Frustum Culling: omitir estrellas fuera del viewport
                if (screenX < 0 || screenX > canvas.width || screenY < 0 || screenY > canvas.height) {
                    continue;
                }

                // Atenuación de tamaño y opacidad por distancia (Size & Alpha Attenuation)
                const depthRatio = 1 - (z - MIN_DEPTH) / (MAX_DEPTH - MIN_DEPTH);
                const size = Math.max(0.6 * dpr, (1.8 * depthRatio) * dpr);
                const alpha = 0.25 + depthRatio * 0.65;

                ctx.globalAlpha = alpha;
                ctx.fillRect(screenX - size * 0.5, screenY - size * 0.5, size, size);
            }

            if (!prefersReducedMotion) {
                rafId = requestAnimationFrame(renderFrame);
            }
        };

        // Si el usuario prefiere movimiento reducido, dibuja un solo frame estático
        if (prefersReducedMotion) {
            renderFrame(0);
        } else {
            rafId = requestAnimationFrame(renderFrame);
        }

        // ─── Page Visibility API: 0% CPU en segundo plano ──────────────────
        const handleVisibilityChange = () => {
            if (document.hidden) {
                isRunning = false;
                cancelAnimationFrame(rafId);
            } else {
                isRunning = true;
                lastTime = -1; // Resetear delta para evitar saltos bruscos al volver
                rafId = requestAnimationFrame(renderFrame);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // ─── Cleanup ───────────────────────────────────────────────────────
        return () => {
            isRunning = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{
                zIndex: -1,
                background: "linear-gradient(to bottom, #000000 0%, #0a0a1a 60%, #1a1a2e 100%)",
                contain: "strict",
                transform: "translateZ(0)",
                willChange: "transform",
            }}
        />
    );
};

export default BackgroundStars;