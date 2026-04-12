export type ProtocolRole = 'A' | 'B' | 'C';

export interface Vector3D { x: number; y: number; z: number; }

export interface SimulationState {
  currentSceneId: string;
  progress: number;
  playState: 'playing' | 'paused';
  cameraFree: boolean;
  activeRole: ProtocolRole;
  protocolData: {
    a: number[];
    s: number[];
    e: number[];
    b: number[];
  };
  setScene: (id: string) => void;
  togglePlay: () => void;
}

export interface SceneConfig {
  id: string;
  title: string;
  shortExplanation: string;
  technicalNote?: string;
  cameraPose: Vector3D;
  visibleObjects: string[];
}
