"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { LatticePoint } from "@/app/lib/lattice-engine";

interface LatticeGridProps {
  points: LatticePoint[];
  /** Radius of each sphere */
  pointSize?: number;
  /** Color of the lattice points */
  color?: string;
  /** Opacity */
  opacity?: number;
  /** Whether to animate a gentle pulse */
  animate?: boolean;
}

/**
 * Renders lattice points as instanced spheres for performance.
 * Supports hundreds of points efficiently using InstancedMesh.
 */
export default function LatticeGrid({
  points,
  pointSize = 0.06,
  color = "#737373",
  opacity = 0.35,
  animate = true,
}: LatticeGridProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Update instance matrices when points change
  useEffect(() => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;

    points.forEach((pt, i) => {
      dummy.position.set(pt.x, pt.y, pt.z);
      dummy.scale.setScalar(pt.highlight ? 1.5 : 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.count = points.length;
  }, [points, dummy]);

  // Gentle pulse animation
  useFrame((state) => {
    if (!meshRef.current || !animate) return;
    const t = state.clock.elapsedTime;
    const scale = 1 + Math.sin(t * 0.5) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  const maxPoints = Math.max(points.length, 1);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, maxPoints]}
      frustumCulled={false}
    >
      <sphereGeometry args={[pointSize, 8, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
      />
    </instancedMesh>
  );
}
