"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../lib/theme";

/**
 * The scene sits on the page background, so its palette has to follow the
 * theme — on the light background the dark-mode glow simply disappears.
 */
const PALETTES = {
  dark: {
    core: "#8b74ff",
    emissive: "#3a1f8f",
    emissiveIntensity: 0.5,
    wire: "#34e0e8",
    wireOpacity: 0.18,
    particles: "#aab0ff",
    particleOpacity: 0.7,
    lightA: "#8b74ff",
    lightB: "#34e0e8",
    ambient: 0.5,
  },
  light: {
    core: "#6a4bff",
    emissive: "#2a1a7a",
    emissiveIntensity: 0.2,
    wire: "#0d8ea3",
    wireOpacity: 0.35,
    particles: "#6b62c4",
    particleOpacity: 0.5,
    lightA: "#ffffff",
    lightB: "#7bd9e4",
    ambient: 1.1,
  },
} as const;

type Palette = (typeof PALETTES)[keyof typeof PALETTES];

/** Central morphing crystal built from two overlaid icosahedrons. */
function Crystal({ palette, ...props }: ThreeElements["group"] & { palette: Palette }) {
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
          color={palette.core}
          emissive={palette.emissive}
          emissiveIntensity={palette.emissiveIntensity}
          roughness={0.2}
          metalness={0.85}
          distort={0.38}
          speed={1.3}
        />
      </Icosahedron>

      {/* Wireframe shell */}
      <Icosahedron ref={wire} args={[1.55, 1]}>
        <meshBasicMaterial
          color={palette.wire}
          wireframe
          transparent
          opacity={palette.wireOpacity}
        />
      </Icosahedron>
    </group>
  );
}

/**
 * Deterministic PRNG (mulberry32) — the particle cloud must look identical on
 * every render, so seeding it beats `Math.random()` here.
 */
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Slowly drifting particle field surrounding the crystal. */
function Particles({
  palette,
  count = 1200,
}: {
  palette: Palette;
  count?: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const random = seededRandom(0x5eed);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + random() * 5.5;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
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
        color={palette.particles}
        transparent
        opacity={palette.particleOpacity}
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
  const theme = useTheme();
  const palette = PALETTES[theme];

  if (failed) {
    return (
      <div className="absolute inset-0 -z-10 opacity-70" aria-hidden>
        <div
          className="absolute left-1/2 top-1/2 h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, var(--accent-soft), transparent 65%)",
          }}
        />
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
      <ambientLight intensity={palette.ambient} />
      <pointLight position={[5, 5, 5]} intensity={80} color={palette.lightA} />
      <pointLight position={[-6, -3, 2]} intensity={55} color={palette.lightB} />

      <ParallaxRig>
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.7}>
          <Crystal palette={palette} />
        </Float>
        <Particles palette={palette} />
      </ParallaxRig>
    </Canvas>
  );
}
