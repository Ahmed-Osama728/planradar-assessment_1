import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useVirtualList } from '../useVirtualList';

describe('useVirtualList', () => {
  const mockRef = {
    current: {
      clientHeight: 500,
      scrollTop: 0,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }
  };

  it('calculates virtual items correctly', () => {
    const { result } = renderHook(() =>
      useVirtualList({
        itemHeight: 80,
        totalItems: 1000,
        containerRef: mockRef as any,
        overscan: 3
      })
    );

    expect(result.current.totalHeight).toBe(80 * 1000);
    expect(result.current.virtualItems.length).toBeGreaterThan(0);
  });

  it('handles edge cases', () => {
    const { result } = renderHook(() =>
      useVirtualList({
        itemHeight: 80,
        totalItems: 0,
        containerRef: mockRef as any,
        overscan: 3
      })
    );

    expect(result.current.totalHeight).toBe(0);
    expect(result.current.virtualItems.length).toBe(0);
  });
});