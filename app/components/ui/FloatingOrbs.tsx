'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedOrb({ position, color, speed }: { 
  position: [number, number, number]; 
  color: string; 
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <AnimatedOrb position={[-3, 0, 0]} color="#9945FF" speed={0.5} />
        <AnimatedOrb position={[3, 1, -2]} color="#00D4FF" speed={0.7} />
        <AnimatedOrb position={[0, -2, -1]} color="#14F195" speed={0.6} />
      </Canvas>
    </div>
  );
}
