import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../app/page';

vi.mock('../app/components/SystemMap', () => ({
  default: () => <div data-testid="system-map">System Map</div>
}));

vi.mock('../app/components/ProtocolFlow', () => ({
  default: () => <div data-testid="protocol-flow">Protocol Flow</div>
}));

describe('Landing Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getAllByText('Kyber').length).toBeGreaterThan(0);
    expect(screen.getByText('ML-KEM Messaging Stack')).toBeInTheDocument();
  });

  it('renders key sections', () => {
    render(<Home />);
    expect(screen.getByTestId('system-map')).toBeInTheDocument();
    expect(screen.getByTestId('protocol-flow')).toBeInTheDocument();
    expect(screen.getByText('The Lattice-Based Exchange')).toBeInTheDocument();
  });

  it('contains links to GitHub and Installation', () => {
    render(<Home />);
    const githubLink = screen.getByRole('link', { name: /View C\+\+ Source on GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/aitwehrrg/Kyber');
  });
});
