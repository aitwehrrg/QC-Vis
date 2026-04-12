"use client";

import { useSimulationStore } from "../store";
import { SCENES } from "../scenes";
import { Float, Sphere, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import katex from "katex";
import { useTheme } from "../../components/ThemeProvider";
import { useMemo } from "react";

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
        className="text-xs md:text-sm font-serif whitespace-nowrap bg-surface/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border-subtle shadow-2xl flex items-center justify-center transition-all duration-300"
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
  const scene = SCENES[currentSceneIndex];
  const visible = scene.visibleObjects;

  return (
    <group>
      {/* Basis Vectors */}
      <VectorArrow
        dir={[2, 0.5, 0]}
        color="#3b82f6"
        label="{\mathbf{a}}"
        visible={visible.includes("basis-a")}
      />
      <VectorArrow
        dir={[0.5, 2.5, 0.5]}
        color="#6366f1"
        label="{\mathbf{b} = \mathbf{as} + \mathbf{e}}"
        visible={visible.includes("basis-b")}
      />

      {/* Secret Point */}
      {visible.includes("secret-point") && (
        <group position={[2, 2, 2]}>
          <Sphere args={[0.12, 16, 16]}>
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.6} />
          </Sphere>
          <LatexLabel tex="{\mathbf{s}}" position={[0, 0.4, 0]} color="#f59e0b" />
        </group>
      )}

      {/* Noisy Point */}
      {visible.includes("noisy-point") && (
        <group position={[2.3, 2.1, 1.8]}>
          <Sphere args={[0.12, 16, 16]}>
            <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.6} />
          </Sphere>
          <LatexLabel tex="{\text{Sample}}" position={[0, -0.4, 0]} color="#f43f5e" />
        </group>
      )}

      {visible.includes("noise-vector") && (
        <group>
          <Line
            points={[[2, 2, 2], [2.3, 2.1, 1.8]]}
            color="#f43f5e"
            lineWidth={1.5}
          />
          <LatexLabel tex="{\mathbf{e}}" position={[2.15, 2.05, 1.9]} color="#f43f5e" />
        </group>
      )}

      {/* Protocol Vectors */}
      <VectorArrow
        dir={[-3, 1.5, 0.5]}
        color="#10b981"
        label="{\mathbf{u}}"
        visible={visible.includes("u-vector")}
      />
      <VectorArrow
        dir={[1.5, -2, 3]}
        color="#8b5cf6"
        label="{\mathbf{v}}"
        visible={visible.includes("v-vector")}
      />

      {/* Attacker Ambiguity */}
      {visible.includes("ambiguity-sphere") && (
        <group>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[6, 32, 32]} />
            <meshStandardMaterial color="#ef4444" transparent opacity={0.04} wireframe />
          </mesh>
          <LatexLabel tex="{\text{Ambiguity Cloud}}" position={[0, 4, 0]} color="#ef4444" />
        </group>
      )}

      {/* Shared Secret */}
      {visible.includes("shared-secret-point") && (
        <Float speed={2.5}>
          <group position={[0, 4, 0]}>
            <Sphere args={[0.2, 32, 32]}>
              <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1.2} />
            </Sphere>
            <LatexLabel 
              tex="{\text{Shared Key}}" 
              position={[0, 0.6, 0]} 
              color="#10b981" 
            />
          </group>
        </Float>
      )}
    </group>
  );
}
