import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Overlay from '../app/simulation/components/Overlay';
import { useSimulationStore } from '../app/simulation/store';
import { SCENES } from '../app/simulation/scenes';

// Mock the store
vi.mock('../app/simulation/store', () => ({
  useSimulationStore: vi.fn(),
}));

describe('Overlay Component', () => {
  const mockNextScene = vi.fn();
  const mockPrevScene = vi.fn();
  const mockResetSimulation = vi.fn();
  const mockToggleFreeCamera = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useSimulationStore as any).mockReturnValue({
      currentSceneIndex: 0,
      nextScene: mockNextScene,
      prevScene: mockPrevScene,
      resetSimulation: mockResetSimulation,
      isFreeCamera: false,
      toggleFreeCamera: mockToggleFreeCamera,
    });
  });

  it('renders current scene title and explanation', () => {
    render(<Overlay />);
    expect(screen.getByText(SCENES[0].title)).toBeInTheDocument();
    // Use a custom matcher to handle LaTeX rendering if necessary, 
    // but here we just check if the text exists.
    expect(screen.getByText(/The protocol operates in high-dimensional lattice spaces/)).toBeInTheDocument();
  });

  it('calls nextScene when Next button is clicked', () => {
    render(<Overlay />);
    const nextButton = screen.getByTitle('Next');
    fireEvent.click(nextButton);
    expect(mockNextScene).toHaveBeenCalled();
  });

  it('disables Previous button on the first scene', () => {
    render(<Overlay />);
    const prevButton = screen.getByTitle('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('calls prevScene when Previous button is clicked', () => {
    (useSimulationStore as any).mockReturnValue({
      currentSceneIndex: 1,
      nextScene: mockNextScene,
      prevScene: mockPrevScene,
      resetSimulation: mockResetSimulation,
      isFreeCamera: false,
      toggleFreeCamera: mockToggleFreeCamera,
    });

    render(<Overlay />);
    const prevButton = screen.getByTitle('Previous');
    fireEvent.click(prevButton);
    expect(mockPrevScene).toHaveBeenCalled();
  });

  it('calls resetSimulation when Reset button is clicked', () => {
    render(<Overlay />);
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    expect(mockResetSimulation).toHaveBeenCalled();
  });

  it('calls toggleFreeCamera when Orbit/Free button is clicked', () => {
    render(<Overlay />);
    const toggleButton = screen.getByText('Orbit');
    fireEvent.click(toggleButton);
    expect(mockToggleFreeCamera).toHaveBeenCalled();
  });

  it('shows "Free" when isFreeCamera is true', () => {
    (useSimulationStore as any).mockReturnValue({
      currentSceneIndex: 0,
      nextScene: mockNextScene,
      prevScene: mockPrevScene,
      resetSimulation: mockResetSimulation,
      isFreeCamera: true,
      toggleFreeCamera: mockToggleFreeCamera,
    });

    render(<Overlay />);
    expect(screen.getByText('Free')).toBeInTheDocument();
  });
});
