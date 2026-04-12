"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
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
  const controlsRef = useRef<{ target: THREE.Vector3; update: () => void }>(null);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Colors based on theme
  const bgColor = theme === "dark" ? "#0a0a0a" : "#fafaf9";
  const gridColor = theme === "dark" ? "#222222" : "#e5e5e4";
  const gridSectionColor = theme === "dark" ? "#111111" : "#f0f0ef";

  // Handle Camera and Target Transitions
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    
    let targetPos: THREE.Vector3;
    let targetLookAt: THREE.Vector3;

    if (isFreeCamera) {
      // In Free/Orbit mode, we transition the target to the origin [0,0,0]
      // but keep the camera at a reasonable overview distance
      targetPos = new THREE.Vector3(12, 8, 12);
      targetLookAt = new THREE.Vector3(0, 0, 0);
    } else {
      // In Guided mode, use scene-specific poses
      const scale = isMobile ? 1.5 : 1;
      targetPos = new THREE.Vector3(
        scene.cameraPose.position[0] * scale,
        scene.cameraPose.position[1] * scale,
        scene.cameraPose.position[2] * scale
      );
      targetLookAt = new THREE.Vector3(...scene.cameraPose.target);
    }
    
    // Kill any existing tweens to prevent conflicts
    gsap.killTweensOf(cameraRef.current.position);
    gsap.killTweensOf(controlsRef.current.target);

    gsap.to(cameraRef.current.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.5,
      ease: "power2.inOut",
    });

    gsap.to(controlsRef.current.target, {
      x: targetLookAt.x,
      y: targetLookAt.y,
      z: targetLookAt.z,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => controlsRef.current.update(),
    });
  }, [currentSceneIndex, isFreeCamera, scene, isMobile]);

  return (
    <div className="w-full h-full relative transition-colors duration-500" style={{ backgroundColor: bgColor }}>
      <Canvas shadows gl={{ antialias: true, shadowMapType: THREE.PCFShadowMap, powerPreference: "high-performance" }} dpr={[1, 2]}>
        <color attach="background" args={[bgColor]} />
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          fov={isMobile ? 50 : 40}
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
        
        <axesHelper args={[2]} />
        <gridHelper args={[20, 20, gridColor, gridSectionColor]} position={[0, -0.01, 0]} />

        <Lattice />
        <ProtocolObjects />

        <fog attach="fog" args={[bgColor, 15, 60]} />
      </Canvas>
    </div>
  );
}
