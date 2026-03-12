'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Procedural bottle built from LatheGeometry ─── */
function BottleMesh() {
  const bodyRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Bottle profile points (radius, height) — bottom to top
  const profilePoints = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.85, 0.0),
    new THREE.Vector2(0.92, 0.18),
    new THREE.Vector2(1.0, 0.5),
    new THREE.Vector2(1.02, 1.6),
    new THREE.Vector2(1.02, 3.2),
    new THREE.Vector2(1.0, 4.2),
    new THREE.Vector2(0.88, 4.9),
    new THREE.Vector2(0.62, 5.45),
    new THREE.Vector2(0.44, 5.75),
    new THREE.Vector2(0.40, 6.15),
    new THREE.Vector2(0.38, 6.5),
  ];

  const bottleGeo = new THREE.LatheGeometry(profilePoints, 52);

  // Bottom cap disc
  const bottomCapGeo = new THREE.CircleGeometry(0.85, 40);

  // Cap profile points
  const capPoints = [
    new THREE.Vector2(0.38, 0.0),
    new THREE.Vector2(0.42, 0.07),
    new THREE.Vector2(0.42, 0.5),
    new THREE.Vector2(0.38, 0.6),
    new THREE.Vector2(0.32, 0.68),
  ];
  const capGeo = new THREE.LatheGeometry(capPoints, 32);

  // Pump head
  const pumpHeadGeo = new THREE.BoxGeometry(0.45, 0.22, 0.55, 1, 1, 1);

  // Gold neck ring
  const ringGeo = new THREE.TorusGeometry(0.43, 0.022, 8, 36);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0035; // Slow continuous rotation
    }
    // Subtle breathing on pump
    if (bodyRef.current) {
      const t = state.clock.getElapsedTime();
      bodyRef.current.position.y = Math.sin(t * 0.4) * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={[0, -3.2, 0]}>
      {/* ── Main bottle body ── */}
      <mesh ref={bodyRef} geometry={bottleGeo} castShadow receiveShadow>
        <MeshTransmissionMaterial
          color="#1a1a1a"
          roughness={0.12}
          metalness={0.0}
          transmission={0.28}
          thickness={0.6}
          ior={1.42}
          chromaticAberration={0.02}
          envMapIntensity={2.2}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          attenuationColor="#222222"
          attenuationDistance={3.0}
        />
      </mesh>

      {/* Bottom cap */}
      <mesh
        geometry={bottomCapGeo}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* ── Neck cap ── */}
      <mesh geometry={capGeo} position={[0, 6.5, 0]} castShadow>
        <meshStandardMaterial color="#111111" roughness={0.35} metalness={0.12} />
      </mesh>

      {/* ── Gold neck ring ── */}
      <mesh geometry={ringGeo} position={[0, 5.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#b0b0b0" roughness={0.18} metalness={0.9} />
      </mesh>

      {/* ── Pump stem ── */}
      <mesh position={[0, 7.1, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.075, 1.3, 18]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.45} metalness={0.2} />
      </mesh>

      {/* ── Pump head ── */}
      <mesh geometry={pumpHeadGeo} position={[0, 7.75, 0]} castShadow>
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.15} />
      </mesh>

      {/* ── Label band (slightly different translucent layer) ── */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[1.035, 1.035, 3.0, 52, 1, true]} />
        <meshStandardMaterial
          color="#1e1e1e"
          roughness={0.9}
          metalness={0}
          side={THREE.BackSide}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* ── Shine highlight strip ── */}
      <mesh position={[-0.6, 2.5, 0.82]}>
        <planeGeometry args={[0.08, 2.2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.065} />
      </mesh>
    </group>
  );
}

/* ─── Floating golden herb particles ─── */
function HerbParticles({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Gen positions once
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    speeds[i] = 0.0015 + Math.random() * 0.003;
  }

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i) + speeds[i];
      pos.setY(i, y > 6 ? -6 : y);
    }
    pos.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#cccccc"
        size={0.055}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Public component ─── */
interface ThreeBottleProps {
  className?: string;
  showParticles?: boolean;
  cameraZ?: number;
}

export default function ThreeBottle({
  className = '',
  showParticles = true,
  cameraZ = 8.5,
}: ThreeBottleProps) {
  return (
    <div className={`three-canvas-container ${className}`}>
      <Canvas
        camera={{ position: [0, 1, cameraZ], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
        dpr={[1, 1.5]}
      >
        {/* Lighting rig */}
        <ambientLight intensity={0.35} color="#ffffff" />

        {/* Key light – warm from upper-right */}
        <directionalLight
          position={[4, 9, 5]}
          intensity={1.6}
          color="#ffffff"
          castShadow
          shadow-mapSize={[512, 512]}
        />

        {/* Fill light – gold from left */}
        <pointLight position={[-6, 3, 3]} intensity={1.0} color="#dddddd" />

        {/* Rim light – green from behind */}
        <pointLight position={[0, -2, -6]} intensity={0.5} color="#555555" />

        {/* Top back cool light */}
        <spotLight
          position={[0, 10, -4]}
          angle={0.55}
          penumbra={0.6}
          intensity={0.7}
          color="#dddddd"
        />

        <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.35}>
          <BottleMesh />
        </Float>

        {showParticles && <HerbParticles />}

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
