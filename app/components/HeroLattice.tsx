"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Deterministic PRNG (mulberry32) so the lattice is identical on every render
 * and between server and client.
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

/**
 * The lattice lives in the hero, and the hero is Act I — chalk — for the life
 * of the page. WebGL cannot read CSS custom properties, so these track the
 * .act-light block in globals.css by hand.
 */
const COLORS = { node: "#16150f", line: "#b6b1a6" } as const;

/**
 * A structure rather than an object: nodes held in relation to each other.
 * The topology is solved once; only positions move, so the per-frame cost is
 * a couple of buffer writes.
 */
function Lattice({ count }: { count: number }) {
  const colors = COLORS;

  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const group = useRef<THREE.Group>(null);

  const { base, edges, nodePositions, edgePositions, phases } = useMemo(() => {
    const random = seededRandom(0x51c17a1);
    const base = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Fibonacci-ish shell with jitter — even coverage, no visible banding.
      const u = random() * 2 - 1;
      const theta = random() * Math.PI * 2;
      const radius = 1.9 + random() * 1.5;
      const s = Math.sqrt(1 - u * u);
      base[i * 3] = radius * s * Math.cos(theta) * 1.35;
      base[i * 3 + 1] = radius * s * Math.sin(theta);
      base[i * 3 + 2] = radius * u;
      phases[i] = random() * Math.PI * 2;
    }

    // Connect near neighbours once; cap the degree so the mesh stays legible.
    const edges: number[] = [];
    const degree = new Uint8Array(count);
    const threshold = 1.35;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (degree[i] > 3 || degree[j] > 3) continue;
        const dx = base[i * 3] - base[j * 3];
        const dy = base[i * 3 + 1] - base[j * 3 + 1];
        const dz = base[i * 3 + 2] - base[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < threshold * threshold) {
          edges.push(i, j);
          degree[i]++;
          degree[j]++;
        }
      }
    }

    return {
      base,
      phases,
      edges: new Uint16Array(edges),
      nodePositions: new Float32Array(base),
      edgePositions: new Float32Array((edges.length / 2) * 6),
    };
  }, [count]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    const nodeGeometry = points.current?.geometry;
    const edgeGeometry = lines.current?.geometry;
    if (!nodeGeometry || !edgeGeometry) return;

    // Written straight into the GPU buffers three.js owns — no per-frame
    // allocation, no React state, nothing for the renderer to diff.
    const nodeAttr = nodeGeometry.getAttribute("position");
    const edgeAttr = edgeGeometry.getAttribute("position");
    const nodes = nodeAttr.array as Float32Array;
    const segments = edgeAttr.array as Float32Array;

    // Nodes breathe along their own phase so the structure never looks rigid.
    for (let i = 0; i < count; i++) {
      const drift = Math.sin(t * 0.5 + phases[i]) * 0.08;
      nodes[i * 3] = base[i * 3] + drift;
      nodes[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.42 + phases[i]) * 0.08;
      nodes[i * 3 + 2] = base[i * 3 + 2] + drift * 0.6;
    }

    for (let e = 0; e < edges.length; e += 2) {
      const a = edges[e] * 3;
      const b = edges[e + 1] * 3;
      const o = (e / 2) * 6;
      segments[o] = nodes[a];
      segments[o + 1] = nodes[a + 1];
      segments[o + 2] = nodes[a + 2];
      segments[o + 3] = nodes[b];
      segments[o + 4] = nodes[b + 1];
      segments[o + 5] = nodes[b + 2];
    }

    nodeAttr.needsUpdate = true;
    edgeAttr.needsUpdate = true;

    if (group.current) {
      group.current.rotation.y += d * 0.07;
      // lean toward the pointer, easing rather than snapping
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        state.pointer.y * 0.25,
        0.04,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        state.pointer.x * -0.12,
        0.04,
      );
    }
  });

  return (
    <group ref={group}>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={colors.line}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </lineSegments>

      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color={colors.node}
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/*
        A single centred sphere used to sit here. It landed on top of the
        headline — an orange disc across the "N", then a pale one — and read as
        a smudge rather than a focal point. The lattice already has nodes.
      */}
    </group>
  );
}

export default function HeroLattice({
  active = true,
  count = 140,
}: {
  active?: boolean;
  count?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      performance={{ min: 0.4 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      onError={() => setFailed(true)}
    >
      <Lattice count={count} />
    </Canvas>
  );
}
