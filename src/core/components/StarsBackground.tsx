"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Units per second — fully frame-rate independent
const FALL_SPEED_PER_SEC = 4.8;

const BackgroundStars = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const mountedRef = useRef<boolean>(false);

    useEffect(() => {
        // Guard against StrictMode double-invoke: only run once per real mount
        if (mountedRef.current) return;
        mountedRef.current = true;

        const container = containerRef.current;
        if (!container) return;

        // ─── Scene ────────────────────────────────────────────────────────────
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            100,
            window.innerWidth / window.innerHeight,
            0.5,
            300
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // ─── Stars geometry ───────────────────────────────────────────────────
        const starCount = 700;
        const positions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i]     = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;
        }

        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.18,
            transparent: true,
            opacity: 0.85,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        scene.add(new THREE.Points(starGeometry, starMaterial));

        // ─── Delta-time animation loop ─────────────────────────────────────────
        let lastTime = -1;

        const animate = (now: number) => {
            rafRef.current = requestAnimationFrame(animate);

            // Initialize lastTime on first frame to avoid a huge first delta
            if (lastTime < 0) {
                lastTime = now;
                renderer.render(scene, camera);
                return;
            }

            const delta = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            const pos = starGeometry.attributes.position.array as Float32Array;
            const step = FALL_SPEED_PER_SEC * delta;
            for (let i = 1; i < pos.length; i += 3) {
                pos[i] -= step;
                if (pos[i] < -50) pos[i] = 50;
            }
            starGeometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        };

        rafRef.current = requestAnimationFrame(animate);

        // ─── Resize ───────────────────────────────────────────────────────────
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // ─── Cleanup ──────────────────────────────────────────────────────────
        return () => {
            mountedRef.current = false;
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", handleResize);
            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
            starGeometry.dispose();
            starMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-full h-full overflow-hidden"
            style={{
                zIndex: -1,
                background: "linear-gradient(to bottom, #000000 0%, #0a0a1a 60%, #1a1a2e 100%)",
            }}
        />
    );
};

export default BackgroundStars;