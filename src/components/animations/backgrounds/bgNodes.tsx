'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 1500;
const MAX_DISTANCE = 100;
const CONNECTION_PROBABILITY = 0.22; // Incrementado en un 20%
const ANIMATION_SPEED = 0.6;

function Nodes() {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600
  });

  const [positions, colors, nodeStates] = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const colors = new Float32Array(NODE_COUNT * 3);
    const nodeStates = new Array(NODE_COUNT).fill(0).map(() => ({
      active: Math.random() > 0.5,
      targetActive: Math.random() > 0.5,
      phase: Math.random() * Math.PI * 2
    }));

    const color = new THREE.Color(0xffffff);

    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * dimensions.width;
      positions[i * 3 + 1] = (Math.random() - 0.5) * dimensions.height;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
      color.toArray(colors, i * 3);
    }

    return [positions, colors, nodeStates];
  }, [dimensions]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(300000 * 3), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(300000 * 3), 3));
    return geometry;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.getElapsedTime();
    const delta = state.clock.getDelta();
    const positionsArray = lineGeometry.attributes.position.array as Float32Array;
    const colorsArray = lineGeometry.attributes.color.array as Float32Array;
    let lineIndex = 0;

    nodeStates.forEach((node, i) => {
      if (Math.random() < 0.02) {
        node.targetActive = Math.random() > 0.5;
      }
      node.active = THREE.MathUtils.lerp(node.active ? 1 : 0, node.targetActive ? 1 : 0, ANIMATION_SPEED * delta);
      node.phase += Math.random() * 0.02 - 0.01;
    });

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distanceSq = dx * dx + dy * dy + dz * dz;

        if (distanceSq < MAX_DISTANCE * MAX_DISTANCE) {
          const connectionStrength =
            nodeStates[i].active * nodeStates[j].active *
            (1 - Math.sqrt(distanceSq) / MAX_DISTANCE) *
            (0.5 + Math.sin(time + nodeStates[i].phase + nodeStates[j].phase) * 0.5);

          if (connectionStrength > (1 - CONNECTION_PROBABILITY)) {
            const alpha = Math.min(1, connectionStrength * 2);

            positionsArray.set([
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            ], lineIndex * 6);

            const pulse = 0.5 + Math.sin(time * 3 + i + j) * 0.5;
            colorsArray.set([
              colors[i * 3] * alpha * pulse, colors[i * 3 + 1] * alpha * pulse, colors[i * 3 + 2] * alpha * pulse,
              colors[j * 3] * alpha * pulse, colors[j * 3 + 1] * alpha * pulse, colors[j * 3 + 2] * alpha * pulse
            ], lineIndex * 6);

            lineIndex++;
          }
        }
      }
    }

    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
    lineGeometry.setDrawRange(0, lineIndex * 2);
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={NODE_COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={NODE_COUNT} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.8} vertexColors blending={THREE.AdditiveBlending} />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors blending={THREE.AdditiveBlending} />
      </lineSegments>
    </>
  );
}

const BackgroundNodes = () => (
  <Canvas
    className="hidden sm:block w-full -z-10 nodeBg"
    style={{ position: 'fixed', top: 0, left: 0, background: '#000', height: '100%' }} // Fondo negro
    frameloop="always"
    gl={{ antialias: true, alpha: true }}
    camera={{ position: [0, 0, 300], fov: 75 }}
  >
    <Nodes />
  </Canvas>
);

export default BackgroundNodes;