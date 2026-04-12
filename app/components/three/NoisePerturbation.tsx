"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Vec3 } from "@/app/lib/lattice-engine";

interface NoisePerturbationProps {
  pairs: { clean: Vec3; noisy: Vec3; label: string }[];
  nearestPoint: { target: Vec3; nearest: Vec3; radius: number } | null;
  animate?: boolean;
}

/**
 * Visualizes noise perturbation as thin lines from clean points to noisy points,
 * plus a translucent sphere showing the rounding radius for nearest-point.
 */
export default function NoisePerturbation({
  pairs,
  nearestPoint,
  animate = true,
}: NoisePerturbationProps) {
  return (
    <group>
      {pairs.map((pair, i) => (
        <NoiseLink key={`noise-${i}`} clean={pair.clean} noisy={pair.noisy} animate={animate} />
      ))}
      {nearestPoint && (
        <NearestPointVis
          target={nearestPoint.target}
          nearest={nearestPoint.nearest}
          radius={nearestPoint.radius}
          animate={animate}
        />
      )}
    </group>
  );
}

function NoiseLink({
  clean,
  noisy,
  animate,
}: {
  clean: Vec3;
  noisy: Vec3;
  animate: boolean;
}) {
  const lineObj = useMemo(() => {
    const from = new THREE.Vector3(clean.x, clean.y, clean.z);
    const to = new THREE.Vector3(noisy.x, noisy.y, noisy.z);
    const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
    const mat = new THREE.LineBasicMaterial({
      color: "#f43f5e",
      transparent: true,
      opacity: 0.5,
    });
    return new THREE.Line(geo, mat);
  }, [clean, noisy]);

  useFrame((state) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    const mat = lineObj.material as THREE.LineBasicMaterial;
    mat.opacity = 0.3 + Math.sin(t * 2) * 0.15;
  });

  return (
    <group>
      <primitive object={lineObj} />
      <mesh position={[noisy.x, noisy.y, noisy.z]}>
        <sphereGeometry args={[0.07, 8, 6]} />
        <meshBasicMaterial
          color="#f43f5e"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function NearestPointVis({
  target,
  nearest,
  radius,
  animate,
}: {
  target: Vec3;
  nearest: Vec3;
  radius: number;
  animate: boolean;
}) {
  const sphereRef = useRef<THREE.Mesh>(null);

  const connectionLine = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(target.x, target.y, target.z),
      new THREE.Vector3(nearest.x, nearest.y, nearest.z),
    ]);
    const mat = new THREE.LineDashedMaterial({
      color: "#22c55e",
      dashSize: 0.08,
      gapSize: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const ln = new THREE.Line(geo, mat);
    ln.computeLineDistances();
    return ln;
  }, [target, nearest]);

  useFrame((state) => {
    if (!sphereRef.current || !animate) return;
    const t = state.clock.elapsedTime;
    const mat = sphereRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = 0.08 + Math.sin(t * 1.5) * 0.04;
  });

  return (
    <group>
      {/* Translucent rounding sphere */}
      <mesh ref={sphereRef} position={[target.x, target.y, target.z]}>
        <sphereGeometry args={[Math.max(radius, 0.3), 24, 16]} />
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Nearest lattice point (highlighted) */}
      <mesh position={[nearest.x, nearest.y, nearest.z]}>
        <sphereGeometry args={[0.12, 12, 8]} />
        <meshBasicMaterial
          color="#22c55e"
        />
      </mesh>

      {/* Connection line */}
      <primitive object={connectionLine} />
    </group>
  );
}
