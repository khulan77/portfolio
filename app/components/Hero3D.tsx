"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/** Central morphing crystal built from two overlaid icosahedrons. */
function Crystal(props: ThreeElements["group"]) {
  const inner = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // clamp delta so a dropped frame can't cause a big jump
    const d = Math.min(delta, 0.05);
    if (wire.current) {
      wire.current.rotation.y += d * 0.15;
      wire.current.rotation.x += d * 0.06;
    }
    if (inner.current) {
      inner.current.rotation.y -= d * 0.1;
    }
  });

  return (
    <group {...props}>
      {/* Solid distorting core — modest detail keeps the vertex shader cheap */}
      <Icosahedron ref={inner} args={[1.15, 3]}>
        <MeshDistortMaterial
          color="#8b74ff"
          emissive="#3a1f8f"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.85}
          distort={0.38}
          speed={1.3}
        />
      </Icosahedron>

      {/* Wireframe shell */}
      <Icosahedron ref={wire} args={[1.55, 1]}>
        <meshBasicMaterial color="#34e0e8" wireframe transparent opacity={0.18} />
      </Icosahedron>
    </group>
  );
}

/** Slowly drifting particle field surrounding the crystal. */
function Particles({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    if (ref.current) {
      ref.current.rotation.y += d * 0.03;
      ref.current.rotation.x += d * 0.012;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#aab0ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Ties the whole scene to the pointer for a subtle parallax lean. */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const targetX = state.pointer.y * 0.2;
    const targetY = state.pointer.x * 0.35;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.04
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.04
    );
  });

  return <group ref={group}>{children}</group>;
}

export default function Hero3D({ active = true }: { active?: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 -z-10 opacity-70">
        <div className="absolute left-1/2 top-1/2 h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,116,255,0.55),transparent_65%)] blur-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <Canvas
      className="!absolute inset-0"
      // cap pixel ratio — the single biggest perf win on high-DPI laptops
      dpr={[1, 1.5]}
      // pause entirely when the hero is scrolled out of view
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // let R3F auto-drop resolution under load, then recover
      performance={{ min: 0.4 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      onError={() => setFailed(true)}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={80} color="#8b74ff" />
      <pointLight position={[-6, -3, 2]} intensity={55} color="#34e0e8" />

      <ParallaxRig>
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.7}>
          <Crystal />
        </Float>
        <Particles />
      </ParallaxRig>
    </Canvas>
  );
}
