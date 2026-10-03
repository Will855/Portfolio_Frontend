import '@testing-library/jest-dom';

// Polyfills or global mocks if needed (like IntersectionObserver, matchMedia, etc.)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

import React from 'react';

// Mock react-markdown and remark-gfm for JSDOM/Jest
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: { children?: React.ReactNode }) {
    return React.createElement('div', { 'data-testid': 'markdown-content' }, children);
  };
});

jest.mock('remark-gfm', () => () => {});

jest.mock('mermaid', () => ({
  initialize: jest.fn(),
  render: jest.fn().mockResolvedValue({ svg: '<svg></svg>' }),
}));
