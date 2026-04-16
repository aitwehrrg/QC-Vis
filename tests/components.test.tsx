import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Accordion from '../app/components/Accordion';
import Tabs from '../app/components/Tabs';

describe('Accordion Component', () => {
  const items = [
    { id: 'item1', title: 'Title 1', content: 'Content 1' },
    { id: 'item2', title: 'Title 2', content: 'Content 2' },
  ];

  it('renders correctly', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('toggles content on click', () => {
    render(<Accordion items={items} />);
    const trigger = screen.getByText('Title 1');
    fireEvent.click(trigger);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    fireEvent.click(trigger);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('closes other items when allowMultiple is false', () => {
    render(<Accordion items={items} allowMultiple={false} />);
    fireEvent.click(screen.getByText('Title 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Title 2'));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('keeps other items open when allowMultiple is true', () => {
    render(<Accordion items={items} allowMultiple={true} />);
    fireEvent.click(screen.getByText('Title 1'));
    fireEvent.click(screen.getByText('Title 2'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});

describe('Tabs Component', () => {
  const tabs = [
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];

  it('renders correctly and defaults to the first tab', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeVisible();
    // Content 2 is hidden but might be in the DOM
    expect(screen.getByText('Content 2')).not.toBeVisible();
  });

  it('switches tabs on click', () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content 2')).toBeVisible();
    expect(screen.getByText('Content 1')).not.toBeVisible();
  });

  it('handles keyboard navigation (ArrowRight)', () => {
    render(<Tabs tabs={tabs} />);
    const tab1 = screen.getByText('Tab 1');
    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('handles keyboard navigation (ArrowLeft)', () => {
    render(<Tabs tabs={tabs} />);
    const tab1 = screen.getByText('Tab 1');
    fireEvent.keyDown(tab1, { key: 'ArrowLeft' });
    expect(screen.getByText('Content 2')).toBeVisible(); // Cycles back
  });
});
