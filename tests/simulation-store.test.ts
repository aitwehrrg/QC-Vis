import { describe, it, expect, beforeEach } from 'vitest';
import { useSimulationStore } from '../app/simulation/store';
import { SCENES } from '../app/simulation/scenes';

describe('Simulation Store', () => {
  beforeEach(() => {
    useSimulationStore.getState().resetSimulation();
  });

  it('initializes with default state', () => {
    const state = useSimulationStore.getState();
    expect(state.currentSceneIndex).toBe(0);
    expect(state.playState).toBe('paused');
    expect(state.isFreeCamera).toBe(false);
    expect(state.data).toBeDefined();
  });

  it('navigates through scenes', () => {
    const store = useSimulationStore.getState();
    
    store.nextScene();
    expect(useSimulationStore.getState().currentSceneIndex).toBe(1);
    
    store.nextScene();
    expect(useSimulationStore.getState().currentSceneIndex).toBe(2);
    
    store.prevScene();
    expect(useSimulationStore.getState().currentSceneIndex).toBe(1);
  });

  it('jumps to a specific scene', () => {
    const store = useSimulationStore.getState();
    store.jumpToScene(3);
    expect(useSimulationStore.getState().currentSceneIndex).toBe(3);
    
    // Test bounds
    store.jumpToScene(999);
    expect(useSimulationStore.getState().currentSceneIndex).toBe(SCENES.length - 1);
  });

  it('toggles play state', () => {
    const store = useSimulationStore.getState();
    expect(store.playState).toBe('paused');
    
    store.togglePlay();
    expect(useSimulationStore.getState().playState).toBe('playing');
    
    store.togglePlay();
    expect(useSimulationStore.getState().playState).toBe('paused');
  });

  it('resets simulation with new data', () => {
    const store = useSimulationStore.getState();
    const initialData = store.data;
    
    store.nextScene();
    store.togglePlay();
    
    store.resetSimulation();
    const newState = useSimulationStore.getState();
    
    expect(newState.currentSceneIndex).toBe(0);
    expect(newState.playState).toBe('paused');
    expect(newState.data).not.toBe(initialData); // Should have new random data
  });
});
