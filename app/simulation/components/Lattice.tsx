"use client";

import { useMemo, useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { useTheme } from "../../components/ThemeProvider";

export default function Lattice() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { theme } = useTheme();
  
  // Reduced size for better performance and visibility (9x9x9 = 729 points)
  const size = 9;
  const count = size * size * size;
  
  const points = useMemo(() => {
    const temp = [];
    const offset = Math.floor(size / 2);
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          temp.push([x - offset, y - offset, z - offset]);
        }
      }
    }
    return temp;
  }, [size]);

  // Use useLayoutEffect for one-time initialization of the static lattice
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    
    const dummy = new THREE.Object3D();
    points.forEach((pos, i) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      // Extremely small points to avoid "blob" effect
      dummy.scale.set(0.015, 0.015, 0.015);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [points]);

  const dotColor = theme === "dark" ? "#ffffff" : "#000000";
  const opacity = theme === "dark" ? 0.12 : 0.08;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={true}>
      <sphereGeometry args={[1, 4, 4]} /> {/* Low poly spheres */}
      <meshBasicMaterial color={dotColor} transparent opacity={opacity} />
    </instancedMesh>
  );
}
