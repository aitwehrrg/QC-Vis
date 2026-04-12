import '@testing-library/jest-dom';
import { vi } from 'vitest';

class IntersectionObserverMock {
  root = null;
  rootMargin = '';
  thresholds = [];
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();

  constructor(callback: any, options: any) {}
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
