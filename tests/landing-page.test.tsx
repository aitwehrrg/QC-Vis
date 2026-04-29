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
  it('renders the landing page title and description', () => {
    render(<Home />);
    expect(screen.getAllByText('Post-Quantum IRC').length).toBeGreaterThan(0);
    expect(screen.getByText('Post-Quantum Encrypted 1-to-1 Chat (FIPS 203)')).toBeInTheDocument();
  });

  it('renders key sections', () => {
    render(<Home />);
    expect(screen.getByTestId('system-map')).toBeInTheDocument();
    expect(screen.getByTestId('protocol-flow')).toBeInTheDocument();
    expect(screen.getByText('ML-KEM Protocol Flow')).toBeInTheDocument();
  });

  it('contains links to GitHub and Documentation', () => {
    render(<Home />);
    const githubLink = screen.getByRole('link', { name: /View Source on GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/ghruank/irc-encrypted');
  });

});
