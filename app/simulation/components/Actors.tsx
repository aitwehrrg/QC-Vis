"use client";

import { Text, Float, Html } from "@react-three/drei";
import { useSimulationStore } from "../store";
import { SCENES } from "../scenes";

interface ActorNodeProps {
  name: string;
  position: [number, number, number];
  color: string;
  label: string;
  isActive?: boolean;
}

function ActorNode({ name, position, color, label, isActive }: ActorNodeProps) {
  return (
    <group position={position}>
      <Float speed={isActive ? 2 : 0} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh castShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 0.5 : 0.2}
          />
        </mesh>
      </Float>
      
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      
      <Html position={[0, -1, 0]} center style={{ pointerEvents: 'none' }}>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap bg-black/50 px-2 py-0.5 rounded border border-white/10 select-none">
          {label}
        </div>
      </Html>
    </group>
  );
}

export default function Actors() {
  const currentSceneIndex = useSimulationStore((state) => state.currentSceneIndex);
  const actorFocus = SCENES[currentSceneIndex].actorFocus;

  return (
    <group>
      <ActorNode
        name="Alice"
        position={[-8, 0, 0]}
        color="#6366f1"
        label="Sender"
        isActive={actorFocus === "A"}
      />
      <ActorNode
        name="Bob"
        position={[8, 0, 0]}
        color="#2d9f7f"
        label="Receiver"
        isActive={actorFocus === "B"}
      />
      <ActorNode
        name="Eve"
        position={[0, 0, 8]}
        color="#ef4444"
        label="Eavesdropper"
        isActive={actorFocus === "C"}
      />
    </group>
  );
}
