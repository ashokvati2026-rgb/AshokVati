'use client';

import { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import type { CSSProperties } from 'react';

/* ─── Scroll rotation velocity (module-level, safe in client-only component) ─── */
const vel = { spin: 0 };

/* ─── Auto-scaled GLB Model ──────────────────────────────────────────────────── */
function BottleModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/medicine-bottle.glb');

  /* Compute a uniform scale so the tallest dimension fits ~3.5 Three.js units */
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    return maxDim > 0 ? 3.5 / maxDim : 1;
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    /* Continuous baseline rotation + scroll-velocity burst */
    groupRef.current.rotation.y += delta * 0.6 + vel.spin;
    /* Framerate-independent exponential decay of the scroll burst */
    vel.spin *= Math.pow(0.93, delta * 60);
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

/* ─── Leaf SVG paths ──────────────────────────────────────────────────────────── */
const PATH_A =
  'M12 2C9 5 5 10 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 10 15 5 12 2Z';
const PATH_B =
  'M12 3L4.5 10.5C4.5 16.5 7.5 22 12 22C16.5 22 19.5 16.5 19.5 10.5L12 3Z';
const PATH_C =
  'M12 2C7 8 4 14 4 17C4 20.31 7.69 23 12 23C16.31 23 20 20.31 20 17C20 14 17 8 12 2Z';

/* 5 leaves that orbit the bottle at varying radii and speeds */
const ORBIT_LEAVES = [
  { id: 'o1', r: 160, dur: '11s', offset: '0s',     size: 20, path: PATH_A, color: 'rgba(230,230,230,0.75)'   },
  { id: 'o2', r: 195, dur: '17s', offset: '-5.1s',  size: 16, path: PATH_B, color: 'rgba(200,200,200,0.65)'  },
  { id: 'o3', r: 150, dur: '14s', offset: '-9.3s',  size: 18, path: PATH_C, color: 'rgba(220,220,220,0.60)'   },
  { id: 'o4', r: 185, dur: '20s', offset: '-13.8s', size: 14, path: PATH_A, color: 'rgba(180,180,180,0.55)'  },
  { id: 'o5', r: 155, dur: '9s',  offset: '-3.6s',  size: 22, path: PATH_B, color: 'rgba(210,210,210,0.50)'  },
];

/* 4 accent leaves that gently float near the bottle */
const FLOAT_LEAVES = [
  { id: 'f1', x: -130, y: -140, size: 13, delay: '0s',   dur: '4.5s', rot: -30, path: PATH_A, color: 'rgba(220,220,220,0.58)'  },
  { id: 'f2', x:  150, y: -110, size: 11, delay: '1.4s', dur: '5.2s', rot:  45, path: PATH_B, color: 'rgba(190,190,190,0.50)' },
  { id: 'f3', x: -160, y:  100, size: 10, delay: '2.2s', dur: '3.8s', rot: -60, path: PATH_C, color: 'rgba(210,210,210,0.60)'  },
  { id: 'f4', x:  150, y:  130, size: 12, delay: '0.8s', dur: '6.0s', rot:  25, path: PATH_A, color: 'rgba(200,200,200,0.48)' },
];

/* ─── Main component ──────────────────────────────────────────────────────────── */
export default function HeroBottle3D() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Hero entrance: bottle fades in behind text */
      gsap.fromTo(
        wrapperRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 0.65,
          scale: 1,
          duration: 2.5,
          ease: 'power3.out',
          delay: 0.5,
        },
      );

      /* Track scroll velocity → extra rotation burst */
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const v = self.getVelocity();
          vel.spin =
            Math.sign(v) * Math.min(Math.abs(v) / 6000, 0.1);
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute pointer-events-none will-change-transform"
      style={{
        top: '50%',
        marginTop: -400,
        left: '50%',
        marginLeft: -300,
        width: 600,
        height: 800,
        zIndex: 4,
      }}
    >
      {/* Ambient glow behind the bottle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 70%, rgba(200,200,200,0.06) 0%, rgba(255,255,255,0.02) 50%, transparent 75%)',
        }}
      />

      {/* Orbiting leaves (CSS heroLeafOrbit keyframe + --r custom property) */}
      {ORBIT_LEAVES.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute pointer-events-none"
          style={
            {
              left: '50%',
              top: '48%',
              marginLeft: -leaf.size / 2,
              marginTop: -leaf.size / 2,
              animationName: 'heroLeafOrbit',
              animationDuration: leaf.dur,
              animationTimingFunction: 'linear',
              animationDelay: leaf.offset,
              animationIterationCount: 'infinite',
              '--r': `${leaf.r}px`,
            } as CSSProperties
          }
        >
          <svg
            viewBox="0 0 24 24"
            width={leaf.size}
            height={leaf.size}
            style={{ filter: 'drop-shadow(0 2px 6px rgba(255,255,255,0.35))' }}
          >
            <path d={leaf.path} fill={leaf.color} />
          </svg>
        </div>
      ))}

      {/* Floating accent leaves */}
      {FLOAT_LEAVES.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '48%',
            marginLeft: leaf.x - leaf.size / 2,
            marginTop: leaf.y - leaf.size / 2,
            animation: `heroLeafFloat ${leaf.dur} ease-in-out ${leaf.delay} infinite`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width={leaf.size}
            height={leaf.size}
            style={{
              transform: `rotate(${leaf.rot}deg)`,
              filter: 'drop-shadow(0 1px 4px rgba(255,255,255,0.28))',
            }}
          >
            <path d={leaf.path} fill={leaf.color} />
          </svg>
        </div>
      ))}

      {/* Top gradient (removed or adjusted) */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '10%',
          background:
            'linear-gradient(to bottom, rgba(26,36,31,0.4) 0%, transparent 100%)',
          zIndex: 2,
        }}
      />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight
          position={[3, 8, 5]}
          intensity={2.8}
          color="#ffffff"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <pointLight position={[-5, 2, 3]} intensity={1.4} color="#dddddd" />
        <pointLight position={[0, -2, -5]} intensity={0.5} color="#888888" />
        <Suspense fallback={null}>
          <BottleModel />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* Preload the model so it's ready before viewport intersection */
useGLTF.preload('/medicine-bottle.glb');
