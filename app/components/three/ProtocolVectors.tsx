"use client";

import { useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { ProtocolVector } from "@/app/lib/lattice-engine";

interface ProtocolVectorsProps {
  vectors: ProtocolVector[];
  /** Whether to show labels */
  showLabels?: boolean;
}

/**
 * Renders protocol-specific vectors (s, e, b, u, v, etc.) as colored arrows
 * with optional dashing and variable opacity.
 */
export default function ProtocolVectors({
  vectors,
  showLabels = true,
}: ProtocolVectorsProps) {
  return (
    <group>
      {vectors.map((vec) => (
        <ProtocolArrow key={vec.id} vector={vec} showLabel={showLabels} />
      ))}
    </group>
  );
}

function ProtocolArrow({
  vector,
  showLabel,
}: {
  vector: ProtocolVector;
  showLabel: boolean;
}) {
  const { from, to, label, color, isArrow, dashed, opacity = 1 } = vector;

  const arrowData = useMemo(() => {
    const fromVec = new THREE.Vector3(from.x, from.y, from.z);
    const toVec = new THREE.Vector3(to.x, to.y, to.z);
    const dir = toVec.clone().sub(fromVec);
    const length = dir.length();
    if (length < 0.001) return null;
    return { from: fromVec, to: toVec, dir: dir.normalize(), length };
  }, [from, to]);

  if (!arrowData) return null;

  const { from: fromVec, to: toVec, dir, length } = arrowData;

  if (!isArrow) {
    // Render as a point sphere
    return (
      <group>
        <mesh position={[to.x, to.y, to.z]}>
          <sphereGeometry args={[0.1, 12, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={opacity}
          />
        </mesh>
        {showLabel && (
          <Html position={[to.x, to.y + 0.2, to.z]} center style={{ pointerEvents: "none" }}>
            <span style={{
              color, fontFamily: "var(--font-jetbrains, monospace)",
              fontSize: "14px", fontWeight: 600,
              textShadow: "0 0 6px rgba(0,0,0,0.8)",
              whiteSpace: "nowrap",
            }}>
              {label}
            </span>
          </Html>
        )}
      </group>
    );
  }

  const shaftEnd = fromVec.clone().add(dir.clone().multiplyScalar(length * 0.85));
  const tipMid = fromVec.clone().add(dir.clone().multiplyScalar(length * 0.92));
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

  return (
    <group>
      {/* Shaft */}
      {dashed ? (
        <DashedLine from={fromVec} to={shaftEnd} color={color} opacity={opacity} />
      ) : (
        <mesh>
          <tubeGeometry
            args={[new THREE.LineCurve3(fromVec, shaftEnd), 1, 0.02, 6, false]}
          />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={opacity}
          />
        </mesh>
      )}

      {/* Arrowhead */}
      <mesh position={[tipMid.x, tipMid.y, tipMid.z]} quaternion={quat}>
        <coneGeometry args={[0.06, 0.15, 6]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Endpoint sphere */}
      <mesh position={[to.x, to.y, to.z]}>
        <sphereGeometry args={[0.05, 8, 6]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={Math.min(opacity + 0.2, 1)}
        />
      </mesh>

      {/* Label */}
      {showLabel && (
        <Html
          position={[
            toVec.x + dir.x * 0.15,
            toVec.y + 0.2,
            toVec.z + dir.z * 0.15,
          ]}
          center
          style={{ pointerEvents: "none" }}
        >
          <span style={{
            color, fontFamily: "var(--font-jetbrains, monospace)",
            fontSize: "14px", fontWeight: 600,
            textShadow: "0 0 6px rgba(0,0,0,0.8)",
            whiteSpace: "nowrap",
            opacity,
          }}>
            {label}
          </span>
        </Html>
      )}
    </group>
  );
}

/**
 * Dashed line segment using THREE.Line primitive.
 */
function DashedLine({
  from,
  to,
  color,
  opacity,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  color: string;
  opacity: number;
}) {
  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
    geo.computeBoundingSphere();
    const mat = new THREE.LineDashedMaterial({
      color,
      dashSize: 0.1,
      gapSize: 0.05,
      transparent: true,
      opacity,
    });
    const ln = new THREE.Line(geo, mat);
    ln.computeLineDistances();
    return ln;
  }, [from, to, color, opacity]);

  return <primitive object={lineObj} />;
}

