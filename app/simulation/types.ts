import { ProtocolData } from "../lib/simulator-math";

export type ProtocolRole = "A" | "B" | "C" | null;

export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
}

export interface AnimationCue {
  id: string;
  type: "move" | "fade" | "scale" | "rotate";
  target: string;
  duration: number;
  delay?: number;
  value: number | [number, number, number] | string;
}

export interface ProtocolScene {
  id: string;
  title: string;
  shortExplanation: string;
  technicalNote?: string;
  cameraPose: CameraPose;
  visibleObjects: string[];
  animationCues?: AnimationCue[];
  actorFocus: ProtocolRole;
  equationOverlay?: string; // LaTeX equation to show
}

export interface SimulationState {
  currentSceneIndex: number;
  playState: "playing" | "paused";
  speed: number;
  data: ProtocolData;
  isFreeCamera: boolean;
  showMath: boolean;
  showBeginner: boolean;
  
  // Actions
  nextScene: () => void;
  prevScene: () => void;
  jumpToScene: (index: number) => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  resetSimulation: () => void;
  toggleFreeCamera: () => void;
  toggleMath: () => void;
  toggleBeginner: () => void;
}
