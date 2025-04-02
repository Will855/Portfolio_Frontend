import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const BackgroundStars = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scene = useRef<THREE.Scene>(new THREE.Scene());
    const camera = useRef<THREE.PerspectiveCamera>(
        new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500)
    );
    const renderer = useRef<THREE.WebGLRenderer>();
    const stars = useRef<THREE.Points>();

    useEffect(() => {
        if (!containerRef.current) return;

        // Configurar renderizador
        renderer.current = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        renderer.current.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.current.domElement);

        // Configurar cámara
        camera.current.position.z = 5;

        // Crear estrellas
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 500;
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100; // X
            positions[i + 1] = (Math.random() - 0.5) * 100; // Y
            positions[i + 2] = (Math.random() - 0.5) * 100; // Z
        }

        starGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        const starMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 0.2,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        stars.current = new THREE.Points(starGeometry, starMaterial);
        scene.current.add(stars.current);

        // Animación
        const animate = () => {
            requestAnimationFrame(animate);

            // Actualizar posiciones
            const positions = starGeometry.attributes.position.array as Float32Array;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= 0.3; // Velocidad de caída
                if (positions[i + 1] < -50) positions[i + 1] = 50; // Reiniciar posición
            }

            starGeometry.attributes.position.needsUpdate = true;

            if (renderer.current) {
                renderer.current.render(scene.current, camera.current);
            }
        };

        // Manejar resize
        const handleResize = () => {
            camera.current.aspect = window.innerWidth / window.innerHeight;
            camera.current.updateProjectionMatrix();
            renderer.current?.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            if (containerRef.current && renderer.current?.domElement) {
                containerRef.current.removeChild(renderer.current.domElement);
            }
            starGeometry.dispose();
            starMaterial.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-full h-full overflow-hidden"
            style={{
                zIndex: -1,
                background: "linear-gradient(to bottom, #000000 0%, #1a1a2e 100%)"
            }}
        />
    );
};

export default BackgroundStars;