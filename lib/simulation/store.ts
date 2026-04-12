import { create } from 'zustand';
import { SimulationState } from '../../types/simulation';

export const useSimulationStore = create<SimulationState>((set) => ({
    currentSceneId: 'scene_1_setup',
    progress: 0,
    playState: 'paused',
    cameraFree: false,
    activeRole: 'B',
    protocolData: { a: [], s: [], e: [], b: [] },
    setScene: (id: any) => set({ currentSceneId: id }),
    togglePlay: () => set((state) => ({ playState: state.playState === 'playing' ? 'paused' : 'playing' }))
}));