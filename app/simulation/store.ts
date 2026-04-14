import { create } from "zustand";
import { SimulationState } from "./types";
import { runProtocol } from "../lib/simulator-math";
import { SCENES } from "./scenes";

export const useSimulationStore = create<SimulationState>((set) => ({
  currentSceneIndex: 0,
  data: runProtocol(),
  isFreeCamera: false,
  showMath: true,
  showBeginner: false,

  nextScene: () => set((state) => ({
    currentSceneIndex: Math.min(state.currentSceneIndex + 1, SCENES.length - 1)
  })),
  
  prevScene: () => set((state) => ({
    currentSceneIndex: Math.max(state.currentSceneIndex - 1, 0)
  })),
  
  jumpToScene: (index: number) => set({
    currentSceneIndex: Math.max(0, Math.min(index, SCENES.length - 1))
  }),
  
  resetSimulation: () => set({
    currentSceneIndex: 0,
    data: runProtocol()
  }),
  
  toggleFreeCamera: () => set((state) => ({
    isFreeCamera: !state.isFreeCamera
  })),
  
  toggleMath: () => set((state) => ({
    showMath: !state.showMath
  })),
  
  toggleBeginner: () => set((state) => ({
    showBeginner: !state.showBeginner
  })),
}));
