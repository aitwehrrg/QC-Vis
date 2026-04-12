"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import * as THREE from "three";
import LatticeGrid from "./LatticeGrid";
import BasisArrows from "./BasisArrows";
import ProtocolVectors from "./ProtocolVectors";
import NoisePerturbation from "./NoisePerturbation";
import type { SceneData } from "@/app/lib/lattice-engine";

interface LatticeSceneProps {
  sceneData: SceneData;
  darkMode?: boolean;
  cameraPosition?: [number, number, number];
  axisLabels?: [string, string, string];
}

/**
 * Top-level React Three Fiber canvas for the 3D lattice visualization.
 */
export default function LatticeScene({
  sceneData,
  darkMode = true,
  cameraPosition = [5, 4, 6],
  axisLabels = ["x₀", "x₁", "x₂"],
}: LatticeSceneProps) {
  const bgColor = darkMode ? "#0a0e1a" : "#f5f3ef";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
        borderRadius: "0.75rem",
        overflow: "hidden",
        background: bgColor,
        border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`,
      }}
    >
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <SceneContent
            sceneData={sceneData}
            darkMode={darkMode}
            axisLabels={axisLabels}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function SceneContent({
  sceneData,
  darkMode,
  axisLabels,
}: {
  sceneData: SceneData;
  darkMode: boolean;
  axisLabels: [string, string, string];
}) {
  const bgColor = darkMode ? "#0a0e1a" : "#f5f3ef";

  return (
    <>
      <color attach="background" args={[bgColor]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} />

      {/* Grid floor */}
      <Grid
        position={[0, -0.01, 0]}
        args={[20, 20]}
        cellSize={1}
        cellColor={darkMode ? "#1a2035" : "#d4d0c8"}
        sectionSize={5}
        sectionColor={darkMode ? "#252d45" : "#b8b4aa"}
        fadeDistance={30}
        fadeStrength={0.4}
        infiniteGrid
      />

      {/* Coordinate axes */}
      <CoordinateAxes size={sceneData.bounds + 1} />

      {/* Lattice points */}
      <LatticeGrid
        points={sceneData.latticePoints}
        color={darkMode ? "#4a5568" : "#a0aec0"}
        opacity={0.25}
      />

      {/* Basis vectors */}
      <BasisArrows vectors={sceneData.basisVectors} />

      {/* Protocol vectors */}
      <ProtocolVectors vectors={sceneData.protocolVectors} />

      {/* Noise perturbation */}
      <NoisePerturbation
        pairs={sceneData.noisyPoints}
        nearestPoint={sceneData.nearestPoint}
      />

      {/* Camera controls */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={20}
        enablePan
        panSpeed={0.5}
      />
    </>
  );
}

/**
 * Simple coordinate axes using Three.js Line primitives.
 */
function CoordinateAxes({ size }: { size: number }) {
  const axes = useMemo(() => {
    const colors = ["#ef4444", "#22c55e", "#3b82f6"];
    const dirs = [
      new THREE.Vector3(size, 0, 0),
      new THREE.Vector3(0, size, 0),
      new THREE.Vector3(0, 0, size),
    ];
    return dirs.map((dir, i) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        dir,
      ]);
      const mat = new THREE.LineBasicMaterial({
        color: colors[i],
        opacity: 0.4,
        transparent: true,
      });
      return new THREE.Line(geo, mat);
    });
  }, [size]);

  return (
    <group>
      {axes.map((axisLine, i) => (
        <primitive key={i} object={axisLine} />
      ))}
    </group>
  );
}

