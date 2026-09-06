"use client";

import { useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seededRandom } from "../lib/seeded-random";

/**
 * A system assembling itself out of a scatter, driven by the reader's own
 * scrolling.
 *
 * The section's argument is that the code was never the hard part — that the
 * time goes into understanding the problem well enough to state it. So the
 * object does not decorate that claim, it is that claim: at the top of the
 * section the nodes are a cloud with no order in them, and by the time the
 * paragraph beside it has been read they have resolved into four connected
 * layers. Design, database, API, deploy — the stack the copy says she builds
 * alone, stated once as a shape.
 *
 * The hero's lattice is the same vocabulary — nodes held in relation — saying
 * something else: it is a structure at rest, breathing, and it is driven by
 * the clock. This one is driven by position on the page and has somewhere to
 * get to.
 */

/**
 * About sits in Act II — coal — for the life of the page. WebGL cannot read
 * CSS custom properties, so these track the .act-dark block in globals.css
 * by hand.
 */
const COLORS = { node: "#edeae2", line: "#8a8578" } as const;

/** Four layers of a 4×4 grid. */
const COLS = 4;
const LAYERS = 4;
const NODES = COLS * COLS * LAYERS;

/** How wide the resolved grid is, and how far apart its layers sit. */
const SPAN = 2.5;
const LAYER_GAP = 0.85;

/**
 * How much of the scroll is spent letting the last nodes catch up. Every node
 * resolves over the same length of travel, just starting at a different point
 * in it, so the structure assembles rather than snapping into place.
 */
const CATCH_UP = 0.4;

/** The stack is read from slightly above, then turned. */
const TILT = 0.42;

type Built = {
  scattered: Float32Array;
  ordered: Float32Array;
  offsets: Float32Array;
  phases: Float32Array;
  edges: Uint16Array;
  nodePositions: Float32Array;
  edgePositions: Float32Array;
};

function build(): Built {
  const random = seededRandom(0xa1b0117);
  const scattered = new Float32Array(NODES * 3);
  const ordered = new Float32Array(NODES * 3);
  const offsets = new Float32Array(NODES);
  const phases = new Float32Array(NODES);

  const index = (layer: number, row: number, col: number) =>
    layer * COLS * COLS + row * COLS + col;

  for (let layer = 0; layer < LAYERS; layer++) {
    for (let row = 0; row < COLS; row++) {
      for (let col = 0; col < COLS; col++) {
        const i = index(layer, row, col) * 3;

        ordered[i] = (col / (COLS - 1) - 0.5) * SPAN;
        ordered[i + 1] = (layer - (LAYERS - 1) / 2) * LAYER_GAP;
        ordered[i + 2] = (row / (COLS - 1) - 0.5) * SPAN;

        // A wider, formless volume: the same nodes with nothing holding them.
        scattered[i] = (random() - 0.5) * SPAN * 2.4;
        scattered[i + 1] = (random() - 0.5) * SPAN * 2;
        scattered[i + 2] = (random() - 0.5) * SPAN * 2.4;

        offsets[index(layer, row, col)] = random() * CATCH_UP;
        phases[index(layer, row, col)] = random() * Math.PI * 2;
      }
    }
  }

  /*
   * The topology is the resolved grid's, not the scatter's, so the edges are
   * already there while the nodes are still loose — the connections are what
   * the structure is, and they are what drags it into shape.
   */
  const edges: number[] = [];
  for (let layer = 0; layer < LAYERS; layer++) {
    for (let row = 0; row < COLS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (col + 1 < COLS) {
          edges.push(index(layer, row, col), index(layer, row, col + 1));
        }
        if (row + 1 < COLS) {
          edges.push(index(layer, row, col), index(layer, row + 1, col));
        }
        /*
         * Only the corners are carried between layers. Every column would be
         * a solid box: the layers have to stay legible as layers, and four
         * uprights are enough to say they are held together.
         */
        const corner = (row === 0 || row === COLS - 1) &&
          (col === 0 || col === COLS - 1);
        if (corner && layer + 1 < LAYERS) {
          edges.push(index(layer, row, col), index(layer + 1, row, col));
        }
      }
    }
  }

  return {
    scattered,
    ordered,
    offsets,
    phases,
    edges: new Uint16Array(edges),
    nodePositions: new Float32Array(scattered),
    edgePositions: new Float32Array((edges.length / 2) * 6),
  };
}

function Stack({ progress }: { progress: RefObject<number> }) {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.LineBasicMaterial>(null);

  const { scattered, ordered, offsets, phases, edges, nodePositions, edgePositions } =
    useMemo(() => build(), []);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const p = progress.current;

    const nodeGeometry = points.current?.geometry;
    const edgeGeometry = lines.current?.geometry;
    if (!nodeGeometry || !edgeGeometry) return;

    // Written straight into the buffers three.js owns — no per-frame
    // allocation, no React state, nothing for the renderer to diff.
    const nodeAttr = nodeGeometry.getAttribute("position");
    const edgeAttr = edgeGeometry.getAttribute("position");
    const nodes = nodeAttr.array as Float32Array;
    const segments = edgeAttr.array as Float32Array;

    for (let i = 0; i < NODES; i++) {
      const local = THREE.MathUtils.clamp(
        (p - offsets[i]) / (1 - CATCH_UP),
        0,
        1,
      );
      // smoothstep: each node leaves and arrives without a corner on it
      const e = local * local * (3 - 2 * local);

      /*
       * The drift is what is left of the scatter, so it fades out as the node
       * finds its place: loose while nothing holds it, still once something
       * does.
       */
      const loose = 1 - e;
      const o = i * 3;
      nodes[o] =
        scattered[o] + (ordered[o] - scattered[o]) * e +
        Math.sin(t * 0.5 + phases[i]) * 0.1 * loose;
      nodes[o + 1] =
        scattered[o + 1] + (ordered[o + 1] - scattered[o + 1]) * e +
        Math.cos(t * 0.43 + phases[i]) * 0.1 * loose;
      nodes[o + 2] =
        scattered[o + 2] + (ordered[o + 2] - scattered[o + 2]) * e +
        Math.sin(t * 0.37 + phases[i]) * 0.1 * loose;
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

    // The connections read as noise while nothing is in place, so they are
    // barely there at the start and only carry once there is a shape to carry.
    if (material.current) material.current.opacity = 0.1 + p * 0.3;

    if (group.current) {
      group.current.rotation.y += d * 0.09;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        TILT + state.pointer.y * 0.16,
        0.05,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        state.pointer.x * -0.08,
        0.05,
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
          ref={material}
          color={COLORS.line}
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </lineSegments>

      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color={COLORS.node}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function AboutLattice({
  active = true,
  progress,
}: {
  active?: boolean;
  progress: RefObject<number>;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 5.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      performance={{ min: 0.4 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      onError={() => setFailed(true)}
    >
      <Stack progress={progress} />
    </Canvas>
  );
}
