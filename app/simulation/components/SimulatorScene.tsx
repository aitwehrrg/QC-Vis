"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useSimulationStore } from "../store";
import { SCENES } from "../scenes";
import Lattice from "./Lattice";
import ProtocolObjects from "./ProtocolObjects";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../../components/ThemeProvider";
import gsap from "gsap";

export default function SimulatorScene() {
  const currentSceneIndex = useSimulationStore((state) => state.currentSceneIndex);
  const isFreeCamera = useSimulationStore((state) => state.isFreeCamera);
  const scene = SCENES[currentSceneIndex];
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bgColor = theme === "dark" ? "#0a0a0a" : "#fafaf9";
  const gridColor = theme === "dark" ? "#222222" : "#e5e5e4";
  const gridSectionColor = theme === "dark" ? "#111111" : "#f0f0ef";

  useEffect(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    
    let targetPos: THREE.Vector3;
    let targetLookAt: THREE.Vector3;

    if (isFreeCamera) {
      const scale = isMobile ? 2 : 1;
      targetPos = new THREE.Vector3(12 * scale, 8 * scale, 12 * scale);
      targetLookAt = new THREE.Vector3(0, 0, 0);
    } else {
      const scale = isMobile ? 2.2 : 1;
      targetPos = new THREE.Vector3(
        scene.cameraPose.position[0] * scale,
        scene.cameraPose.position[1] * scale,
        scene.cameraPose.position[2] * scale
      );
      targetLookAt = new THREE.Vector3(...scene.cameraPose.target);
    }
    
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);

    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.5,
      ease: "power2.inOut",
    });

    gsap.to(controls.target, {
      x: targetLookAt.x,
      y: targetLookAt.y,
      z: targetLookAt.z,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => controls.update(),
    });
  }, [currentSceneIndex, isFreeCamera, scene, isMobile]);

  return (
    <div className="w-full h-full relative transition-colors duration-500" style={{ backgroundColor: bgColor }}>
      <Canvas shadows="soft" gl={{ antialias: true, powerPreference: "high-performance" }} dpr={[1, 2]}>
        <color attach="background" args={[bgColor]} />
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          fov={isMobile ? 60 : 40}
          near={0.1}
          far={1000}
          position={SCENES[0].cameraPose.position}
        />
        
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.1}
          enabled={isFreeCamera}
          makeDefault
        />

        <ambientLight intensity={theme === "dark" ? 0.5 : 0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <gridHelper args={[20, 20, gridColor, gridSectionColor]} position={[0, -0.01, 0]} />

        <Lattice />
        <ProtocolObjects />

        <fog attach="fog" args={[bgColor, 15, 60]} />
      </Canvas>
    </div>
  );
}
