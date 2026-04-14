import { useEffect, useRef, useState, useMemo } from "react";
import { useSimulationStore } from "../store";
import { SCENES } from "../scenes";
import { Float, Sphere, Line, Html, Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import katex from "katex";
import { useTheme } from "../../components/ThemeProvider";
import gsap from "gsap";

const getPalette = (theme: "light" | "dark") => ({
  main: theme === "dark" ? "#ffffff" : "#000000",
  entity: theme === "dark" ? "#2dd4bf" : "#0d9488",
  muted: theme === "dark" ? "#57534e" : "#a8a29e",
});

function Animated({ 
  children, 
  visible, 
  delay = 0,
  type = "scale"
}: { 
  children: React.ReactNode, 
  visible: boolean, 
  delay?: number,
  type?: "scale" | "fade"
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      if (groupRef.current) {
        if (type === "scale") {
          gsap.fromTo(groupRef.current.scale, 
            { x: 0, y: 0, z: 0 }, 
            { x: 1, y: 1, z: 1, duration: 0.6, delay, ease: "back.out(1.5)" }
          );
        } else {
          gsap.fromTo(groupRef.current.position,
            { y: -1 },
            { y: 0, duration: 0.8, delay, ease: "power2.out" }
          );
        }
      }
    } else {
      if (groupRef.current) {
        gsap.to(groupRef.current.scale, { 
          x: 0, y: 0, z: 0, 
          duration: 0.4, 
          ease: "power2.in",
          onComplete: () => setShouldRender(false) 
        });
      } else {
        setShouldRender(false);
      }
    }
  }, [visible, delay, type]);

  return (
    <group ref={groupRef} visible={shouldRender}>
      {children}
    </group>
  );
}

function BruteForcePoints({ visible }: { visible: boolean }) {
  const { theme } = useTheme();
  const PALETTE = getPalette(theme as "light" | "dark" || "light");
  const pointsRef = useRef<THREE.Points>(null);
  
  const points = useMemo(() => {
    const p = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (!visible || !pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < 200; i++) {
      positions[i * 3] += Math.sin(time * 2 + i) * 0.01;
      positions[i * 3 + 1] += Math.cos(time * 2 + i) * 0.01;
      positions[i * 3 + 2] += Math.sin(time * 2.5 + i) * 0.01;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Animated visible={visible}>
      <Points ref={pointsRef} positions={points} stride={3}>
        <PointMaterial 
          transparent 
          color="#f87171" 
          size={0.12} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={0.5}
        />
      </Points>
      <LatexLabel tex="{\text{Eve's Guess } \mathbf{s}'}" position={[0, 5, 0]} color="#f87171" visible={visible} />
    </Animated>
  );
}

function NoiseCloud({ 
  position, 
  radius, 
  count = 400, 
  color,
  visible = true
}: { 
  position: [number, number, number], 
  radius: number, 
  count?: number, 
  color: string,
  visible?: boolean
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const initialPositions = useMemo(() => {
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

  useFrame((state) => {
    if (!visible || !pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      const offsetX = Math.sin(time * 3 + i) * 0.03;
      const offsetY = Math.cos(time * 2.5 + i) * 0.03;
      const offsetZ = Math.sin(time * 2 + i) * 0.03;
      
      positions[idx] = initialPositions[idx] + offsetX;
      positions[idx + 1] = initialPositions[idx + 1] + offsetY;
      positions[idx + 2] = initialPositions[idx + 2] + offsetZ;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={position}>
      <Points ref={pointsRef} positions={initialPositions.slice()} stride={3}>
        <PointMaterial 
          transparent 
          color={color} 
          size={0.06} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={0.4}
        />
      </Points>
      <Sphere args={[radius, 32, 32]}>
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.03} 
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
  color,
  visible = true
}: { 
  tex: string, 
  position: [number, number, number],
  color?: string,
  visible?: boolean
}) {
  const { theme } = useTheme();
  const html = useMemo(() => katex.renderToString(tex, { throwOnError: false }), [tex]);
  const defaultColor = theme === "dark" ? "white" : "black";
  
  if (!visible) return null;

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

  return (
    <Animated visible={visible}>
      <arrowHelper args={[direction, new THREE.Vector3(...origin), length, color, 0.5, 0.2]} />
      {label && (
        <LatexLabel 
          tex={label} 
          position={[origin[0] + dir[0] * 1.1, origin[1] + dir[1] * 1.1, origin[2] + dir[2] * 1.1]} 
          color={color}
          visible={visible}
        />
      )}
    </Animated>
  );
}

function AmbiguitySphere({ visible, color }: { visible: boolean, color: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (visible && meshRef.current) {
      const tween = gsap.to(meshRef.current.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      return () => { tween.kill(); };
    }
  }, [visible]);

  return (
    <Animated visible={visible}>
      <group ref={meshRef}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[6, 32, 32]} />
          <meshStandardMaterial color={color} transparent opacity={0.04} wireframe />
        </mesh>
        <LatexLabel tex="{\text{Ambiguity Cloud}}" position={[0, 4, 0]} color={color} visible={visible} />
      </group>
    </Animated>
  );
}

export default function ProtocolObjects() {
  const { currentSceneIndex } = useSimulationStore();
  const { theme } = useTheme();
  const scene = SCENES[currentSceneIndex];
  const visible = scene.visibleObjects;
  
  const PALETTE = getPalette(theme as "light" | "dark" || "light");

  return (
    <group>
      {}
      <Animated visible={visible.includes("axes")}>
        <Line points={[[0, 0, 0], [3, 0, 0]]} color={PALETTE.muted} lineWidth={3} transparent opacity={0.6} />
        <Line points={[[0, 0, 0], [0, 3, 0]]} color={PALETTE.muted} lineWidth={3} transparent opacity={0.6} />
        <Line points={[[0, 0, 0], [0, 0, 3]]} color={PALETTE.muted} lineWidth={3} transparent opacity={0.6} />
      </Animated>

      {}
      <VectorArrow
        dir={[2, 0.5, 0]}
        color={PALETTE.main}
        label="{\mathbf{a}}"
        visible={visible.includes("basis-a")}
      />
      <VectorArrow
        dir={[0.5, 2.5, 0.5]}
        color={PALETTE.entity}
        label="{\mathbf{b} = \mathbf{a\cdot s} + \mathbf{e}}"
        visible={visible.includes("basis-b")}
      />

      {}
      <Animated visible={visible.includes("secret-point")}>
        <group position={[2, 2, 2]}>
          <Sphere args={[0.12, 16, 16]}>
            <meshStandardMaterial color={PALETTE.entity} emissive={PALETTE.entity} emissiveIntensity={0.6} />
          </Sphere>
          <LatexLabel 
            tex="{\mathbf{s}}" 
            position={[0, 0.4, 0]} 
            color={PALETTE.entity} 
            visible={visible.includes("secret-point")}
          />
        </group>
      </Animated>

      {}
      <Animated visible={visible.includes("noise-cloud")}>
        <group>
          <NoiseCloud 
            position={[2, 2, 2]} 
            radius={0.45} 
            color={PALETTE.entity} 
          />
          <LatexLabel 
            tex="{\mathbf{e}}" 
            position={[2, 2.6, 2]} 
            color={PALETTE.entity} 
            visible={visible.includes("noise-cloud")}
          />
        </group>
      </Animated>

      {}
      <VectorArrow
        dir={[-3, 1.5, 0.5]}
        color={PALETTE.entity}
        label="{\mathbf{u} = \mathbf{a}^T\mathbf{r} + \mathbf{e}_1}"
        visible={visible.includes("u-vector")}
      />
      <VectorArrow
        dir={[1.5, -2, 3]}
        color={PALETTE.entity}
        label="{\mathbf{v} = \mathbf{b}^T\mathbf{r} + \mathbf{e}_2}"
        visible={visible.includes("v-vector")}
      />

      {}
      <Animated visible={visible.includes("r-vector")}>
        <group position={[-1, -1, 0.5]}>
          <Sphere args={[0.1, 16, 16]}>
            <meshStandardMaterial color={PALETTE.entity} emissive={PALETTE.entity} emissiveIntensity={0.8} />
          </Sphere>
          <LatexLabel 
            tex="{\mathbf{r} \text{ (Random)}}" 
            position={[0, -0.4, 0]} 
            color={PALETTE.entity} 
            visible={visible.includes("r-vector")}
          />
        </group>
      </Animated>

      {}
      <Animated visible={visible.includes("e1-noise")}>
        <group position={[-3, 1.5, 0.5]}>
          <NoiseCloud radius={0.3} color={PALETTE.entity} count={200} position={[0, 0, 0]} />
          <LatexLabel 
            tex="{\mathbf{e}_1}" 
            position={[0, 0.4, 0]} 
            color={PALETTE.entity} 
            visible={visible.includes("e1-noise")}
          />
        </group>
      </Animated>

      <Animated visible={visible.includes("e2-noise")}>
        <group position={[1.5, -2, 3]}>
          <NoiseCloud radius={0.3} color={PALETTE.entity} count={200} position={[0, 0, 0]} />
          <LatexLabel 
            tex="{\mathbf{e}_2}" 
            position={[0.4, 0, 0]} 
            color={PALETTE.entity} 
            visible={visible.includes("e2-noise")}
          />
        </group>
      </Animated>

      {}
      <BruteForcePoints visible={visible.includes("brute-force-points")} />

      {}
      <AmbiguitySphere visible={visible.includes("ambiguity-sphere")} color={PALETTE.entity} />

      {}
      <Animated visible={visible.includes("shared-secret-point")}>
        <Float speed={2.5}>
          <group position={[0, 0.2, 0]}>
            <Sphere args={[0.1, 32, 32]}>
              <meshStandardMaterial color={PALETTE.entity} emissive={PALETTE.entity} emissiveIntensity={1} />
            </Sphere>
            <LatexLabel 
              tex="{\text{Shared Key } K}" 
              position={[0, 0.6, 0]} 
              color={PALETTE.entity} 
              visible={visible.includes("shared-secret-point")}
            />
          </group>
        </Float>
      </Animated>
    </group>
  );
}
