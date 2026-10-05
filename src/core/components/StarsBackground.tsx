"use client";

import React, { useEffect, useRef } from "react";

// Parámetros físicos calibrados para distribución uniforme en el frustum 3D
const STAR_COUNT = 700;
const FALL_SPEED = 5.5; // Velocidad de caída en unidades de espacio 3D
const MIN_DEPTH = 5;    // Plano cercano de proyección
const MAX_DEPTH = 95;   // Plano lejano de proyección
const FRUSTUM_MARGIN = 1.08; // Margen del 8% fuera de pantalla para transiciones suaves

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
        const stars = new Float32Array(STAR_COUNT * 3);

        let width = 0;
        let height = 0;
        let fovFactor = 0;
        let dpr = 1;

        // ─── Generación con Frustum Equilibrado (Densidad Uniforme Centro-Bordes) ───
        // A mayor profundidad Z, el campo visual es más ancho.
        // Dimensionar el volumen de generación proporcional a Z elimina la acumulación en el centro.
        const initStar = (i: number, randomY: boolean, w: number, h: number, fov: number) => {
            const z = MIN_DEPTH + Math.random() * (MAX_DEPTH - MIN_DEPTH);
            const ratio = (z / (fov || 450)) * FRUSTUM_MARGIN;
            const halfW = (w * 0.5) * ratio;
            const halfH = (h * 0.5) * ratio;

            stars[i]     = (Math.random() - 0.5) * 2 * halfW;
            stars[i + 1] = randomY ? (Math.random() - 0.5) * 2 * halfH : halfH;
            stars[i + 2] = z;
        };

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

        // Inicializar todas las estrellas distribuidas equitativamente en todo el frustum
        for (let i = 0; i < STAR_COUNT * 3; i += 3) {
            initStar(i, true, width, height, fovFactor);
        }

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
                const z = stars[i + 2];
                const ratio = (z / fovFactor) * FRUSTUM_MARGIN;
                const halfH = (height * 0.5) * ratio;

                // Cinemática: caída vertical por delta-time
                if (!prefersReducedMotion) {
                    stars[i + 1] -= step;
                    // Envoltura toroidal: al cruzar el límite inferior de su frustum, reaparece arriba
                    if (stars[i + 1] < -halfH) {
                        initStar(i, false, width, height, fovFactor);
                        continue;
                    }
                }

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