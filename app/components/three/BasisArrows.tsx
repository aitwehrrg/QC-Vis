"use client";

import { useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { BasisVector } from "@/app/lib/lattice-engine";

interface BasisArrowsProps {
  vectors: BasisVector[];
  /** Whether to show labels */
  showLabels?: boolean;
}

/**
 * Renders basis vectors as colored 3D arrows with optional KaTeX labels.
 */
export default function BasisArrows({
  vectors,
  showLabels = true,
}: BasisArrowsProps) {
  return (
    <group>
      {vectors.map((vec, i) => (
        <BasisArrow key={`basis-${i}`} vector={vec} showLabel={showLabels} />
      ))}
    </group>
  );
}

function BasisArrow({
  vector,
  showLabel,
}: {
  vector: BasisVector;
  showLabel: boolean;
}) {
  const { origin, direction, label, color } = vector;

  const arrowData = useMemo(() => {
    const dir = new THREE.Vector3(direction.x, direction.y, direction.z);
    const length = dir.length();
    if (length < 0.001) return null;
    const normalizedDir = dir.clone().normalize();
    const org = new THREE.Vector3(origin.x, origin.y, origin.z);
    return { dir: normalizedDir, length, origin: org };
  }, [origin, direction]);

  if (!arrowData) return null;

  const { dir, length, origin: org } = arrowData;

  // Build arrow geometry manually for better control
  const shaftEnd = org.clone().add(dir.clone().multiplyScalar(length * 0.85));
  const tipEnd = org.clone().add(dir.clone().multiplyScalar(length));
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

  return (
    <group>
      {/* Shaft — thick line via tube geometry */}
      <mesh>
        <tubeGeometry
          args={[
            new THREE.LineCurve3(org, shaftEnd),
            1,
            0.025,
            6,
            false,
          ]}
        />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Arrowhead — cone */}
      <mesh position={[tipEnd.x, tipEnd.y, tipEnd.z]} quaternion={quat}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshBasicMaterial
          color={color}
        />
        {/* Rotate cone to point in the arrow direction */}
      </mesh>

      {/* Label */}
      {showLabel && (
        <Html
          position={[
            tipEnd.x + dir.x * 0.3,
            tipEnd.y + dir.y * 0.3 + 0.15,
            tipEnd.z + dir.z * 0.3,
          ]}
          center
          style={{ pointerEvents: "none" }}
        >
          <span
            style={{
              color,
              fontFamily: "var(--font-jetbrains, monospace)",
              fontSize: "14px",
              fontWeight: 600,
              textShadow: "0 0 6px rgba(0,0,0,0.8)",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        </Html>
      )}
    </group>
  );
}
