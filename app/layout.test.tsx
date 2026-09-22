import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { generateMetadata } from './layout';

describe('Layout metadata', () => {
  it('generates metadata', () => {
    const result = generateMetadata();
    expect(result).toBeDefined();
  });

  it('generates metadata with custom title', () => {
    const result = generateMetadata({ title: 'Test Page' });
    expect(result).toBeDefined();
  });
});