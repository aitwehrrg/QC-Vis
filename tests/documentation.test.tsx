import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Documentation from '../app/documentation/page';

vi.mock('../app/components/LatexBlock', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="latex-block">{children}</div>,
  LatexText: ({ children }: { children: React.ReactNode }) => <span data-testid="latex-text">{children}</span>
}));

describe('Documentation Page', () => {
  it('renders installation instructions', () => {
    render(<Documentation />);
    expect(screen.getAllByText('Installation').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Prerequisites').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Clone & Build').length).toBeGreaterThan(0);
  });

  it('renders technical documentation sections', () => {
    render(<Documentation />);
    expect(screen.getAllByText('Technical Documentation').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Protocol Summary').length).toBeGreaterThan(0);
    expect(screen.getAllByText('API Reference').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Core Components').length).toBeGreaterThan(0);
  });

  it('renders the glossary', () => {
    render(<Documentation />);
    expect(screen.getAllByText('Glossary').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ML-KEM').length).toBeGreaterThan(0);
    expect(screen.getAllByText('PQC').length).toBeGreaterThan(0);
  });

  it('contains links to GitHub', () => {
    render(<Documentation />);
    const githubLinks = screen.getAllByRole('link', { name: /GitHub/i });
    expect(githubLinks.length).toBeGreaterThan(0);
    expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/example/mlkem');
  });
});
