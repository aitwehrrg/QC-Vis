"use client";

import { useSimulationStore } from "../store";
import { SCENES } from "../scenes";
import { Float, Sphere, Line, Html, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import katex from "katex";
import { useTheme } from "../../components/ThemeProvider";
import { useMemo } from "react";

/**
 * Binary Palette for Simulation:
 * 1. Main (Established/Structure) - White (Dark) / Black (Light)
 * 2. Entity (Newly introduced/Focus) - Light Blue (Dark) / Dark Blue (Light)
 */
const getPalette = (theme: "light" | "dark") => ({
  main: theme === "dark" ? "#ffffff" : "#000000",
  entity: theme === "dark" ? "#60a5fa" : "#2563eb",
  muted: theme === "dark" ? "#57534e" : "#a8a29e",
});

function NoiseCloud({ 
  position, 
  radius, 
  count = 400, 
  color 
}: { 
  position: [number, number, number], 
  radius: number, 
  count?: number, 
  color: string 
}) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 1/3) * radius;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [radius, count]);

  return (
    <group position={position}>
      <Points positions={points} stride={3}>
        <PointMaterial 
          transparent 
          color={color} 
          size={0.08} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={0.3}
        />
      </Points>
      <Sphere args={[radius, 32, 32]}>
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.05} 
          wireframe 
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
}

function LatexLabel({ 
  tex, 
  position, 
  color 
}: { 
  tex: string, 
  position: [number, number, number],
  color?: string
}) {
  const { theme } = useTheme();
  const html = useMemo(() => katex.renderToString(tex, { throwOnError: false }), [tex]);
  const defaultColor = theme === "dark" ? "white" : "black";
  
  return (
    <Html 
      position={position} 
      center 
      zIndexRange={[10, 0]}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div 
        className="text-xs md:text-sm font-serif whitespace-nowrap bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border-subtle shadow-xl flex items-center justify-center transition-all duration-300"
        style={{ color: color || defaultColor }}
      >
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Html>
  );
}

function VectorArrow({ 
  dir, 
  origin = [0, 0, 0], 
  color, 
  label, 
  visible = true 
}: { 
  dir: [number, number, number], 
  origin?: [number, number, number], 
  color: string, 
  label?: string, 
  visible?: boolean 
}) {
  const direction = useMemo(() => new THREE.Vector3(...dir).normalize(), [dir]);
  const length = useMemo(() => new THREE.Vector3(...dir).length(), [dir]);

  if (!visible) return null;

  return (
    <group>
      <arrowHelper args={[direction, new THREE.Vector3(...origin), length, color, 0.5, 0.2]} />
      {label && (
        <LatexLabel 
          tex={label} 
          position={[origin[0] + dir[0] * 1.1, origin[1] + dir[1] * 1.1, origin[2] + dir[2] * 1.1]} 
          color={color}
        />
      )}
    </group>
  );
}

export default function ProtocolObjects() {
  const { currentSceneIndex } = useSimulationStore();
  const { theme } = useTheme();
  const scene = SCENES[currentSceneIndex];
  const visible = scene.visibleObjects;
  
  const PALETTE = getPalette(theme as "light" | "dark" || "light");

  // Determine colors based on binary system and scene context
  const getObjectColor = (type: "structure" | "new" | "vector-a" | "vector-b") => {
    if (type === "vector-a") {
      // a is foundation, usually main color. b is introduced in step 2.
      // Post step-2 (index > 1), a and b share same color.
      return currentSceneIndex > 1 ? PALETTE.main : PALETTE.main;
    }
    if (type === "vector-b") {
      if (currentSceneIndex === 1) return PALETTE.entity; // New in step 2
      return PALETTE.main; // Established thereafter
    }
    return type === "new" ? PALETTE.entity : PALETTE.main;
  };

  return (
    <group>
      {/* Dynamic Axes - Thicker and readable */}
      <group>
        <Line points={[[0, 0, 0], [3, 0, 0]]} color={PALETTE.muted} lineWidth={3} transparent opacity={0.6} />
        <Line points={[[0, 0, 0], [0, 3, 0]]} color={PALETTE.muted} lineWidth={3} transparent opacity={0.6} />
        <Line points={[[0, 0, 0], [0, 0, 3]]} color={PALETTE.muted} lineWidth={3} transparent opacity={0.6} />
      </group>

      {/* Basis Vectors */}
      <VectorArrow
        dir={[2, 0.5, 0]}
        color={getObjectColor("vector-a")}
        label="{\mathbf{a}}"
        visible={visible.includes("basis-a")}
      />
      <VectorArrow
        dir={[0.5, 2.5, 0.5]}
        color={getObjectColor("vector-b")}
        label="{\mathbf{b} = \mathbf{a\cdot s} + \mathbf{e}}"
        visible={visible.includes("basis-b")}
      />

      {/* Secret Point */}
      {visible.includes("secret-point") && (
        <group position={[2, 2, 2]}>
          <Sphere args={[0.12, 16, 16]}>
            <meshStandardMaterial color={currentSceneIndex === 1 ? PALETTE.entity : PALETTE.main} emissive={currentSceneIndex === 1 ? PALETTE.entity : PALETTE.main} emissiveIntensity={0.6} />
          </Sphere>
          <LatexLabel tex="{\mathbf{s}}" position={[0, 0.4, 0]} color={currentSceneIndex === 1 ? PALETTE.entity : PALETTE.main} />
        </group>
      )}

      {/* Noisy Point */}
      {visible.includes("noisy-point") && (
        <group position={[2.3, 2.1, 1.8]}>
          <Sphere args={[0.12, 16, 16]}>
            <meshStandardMaterial color={PALETTE.entity} emissive={PALETTE.entity} emissiveIntensity={0.6} />
          </Sphere>
          <LatexLabel tex="{\text{Sample}}" position={[0, -0.4, 0]} color={PALETTE.entity} />
        </group>
      )}

      {/* Noise Cloud */}
      {visible.includes("noise-cloud") && (
        <group>
          <NoiseCloud 
            position={[2, 2, 2]} 
            radius={0.45} 
            color={PALETTE.entity} 
          />
          <LatexLabel tex="{\mathbf{e}}" position={[2, 2.6, 2]} color={PALETTE.entity} />
        </group>
      )}

      {/* Protocol Vectors */}
      <VectorArrow
        dir={[-3, 1.5, 0.5]}
        color={currentSceneIndex === 2 ? PALETTE.entity : PALETTE.main}
        label="{\mathbf{u} = \mathbf{a}^T\mathbf{r} + \mathbf{e}_1}"
        visible={visible.includes("u-vector")}
      />
      <VectorArrow
        dir={[1.5, -2, 3]}
        color={currentSceneIndex === 2 ? PALETTE.entity : PALETTE.main}
        label="{\mathbf{v} = \mathbf{b}^T\mathbf{r} + \mathbf{e}_2}"
        visible={visible.includes("v-vector")}
      />

      {/* Ephemeral Randomness (Alice) */}
      {visible.includes("r-vector") && (
        <group position={[-1, -1, 0.5]}>
          <Sphere args={[0.1, 16, 16]}>
            <meshStandardMaterial color={PALETTE.entity} emissive={PALETTE.entity} emissiveIntensity={0.8} />
          </Sphere>
          <LatexLabel tex="{\mathbf{r} \text{ (Random)}}" position={[0, -0.4, 0]} color={PALETTE.entity} />
        </group>
      )}

      {/* Ephemeral Noise Clouds */}
      {visible.includes("e1-noise") && (
        <group position={[-3, 1.5, 0.5]}>
          <NoiseCloud radius={0.3} color={PALETTE.entity} count={200} position={[0, 0, 0]} />
          <LatexLabel tex="{\mathbf{e}_1}" position={[0, 0.4, 0]} color={PALETTE.entity} />
        </group>
      )}

      {visible.includes("e2-noise") && (
        <group position={[1.5, -2, 3]}>
          <NoiseCloud radius={0.3} color={PALETTE.entity} count={200} position={[0, 0, 0]} />
          <LatexLabel tex="{\mathbf{e}_2}" position={[0.4, 0, 0]} color={PALETTE.entity} />
        </group>
      )}

      {/* Attacker Ambiguity */}
      {visible.includes("ambiguity-sphere") && (
        <group>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[6, 32, 32]} />
            <meshStandardMaterial color={PALETTE.entity} transparent opacity={0.04} wireframe />
          </mesh>
          <LatexLabel tex="{\text{Ambiguity Cloud}}" position={[0, 4, 0]} color={PALETTE.entity} />
        </group>
      )}

      {/* Shared Secret */}
      {visible.includes("shared-secret-point") && (
        <Float speed={2.5}>
          <group position={[0, 0.2, 0]}>
            <Sphere args={[0.1, 32, 32]}>
              <meshStandardMaterial color={PALETTE.entity} emissive={PALETTE.entity} emissiveIntensity={1} />
            </Sphere>
            <LatexLabel 
              tex={currentSceneIndex === 4 ? "{\\mathbf{x} \\approx 0}" : "{\\text{Shared Key}}"} 
              position={[0, 0.6, 0]} 
              color={PALETTE.entity} 
            />
          </group>
        </Float>
      )}
    </group>
  );
}
