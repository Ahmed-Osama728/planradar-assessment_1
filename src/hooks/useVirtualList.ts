import { useState, useEffect, useCallback, RefObject, useMemo } from 'react';

interface UseVirtualListProps {
  itemHeight: number;
  totalItems: number;
  containerRef: RefObject<HTMLElement>;
  overscan?: number;
}

interface UseVirtualListReturn {
  virtualItems: {
    index: number;
    offsetTop: number;
  }[];
  totalHeight: number;
  startIndex: number;
  endIndex: number;
}

export function useVirtualList({
  itemHeight,
  totalItems,
  containerRef,
  overscan = 3
}: UseVirtualListProps): UseVirtualListReturn {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    requestAnimationFrame(() => {
      setScrollTop(containerRef.current?.scrollTop || 0);
    });
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        setContainerHeight(entries[0].contentRect.height);
      });
    });

    resizeObserver.observe(container);
    setContainerHeight(container.clientHeight);

    return () => resizeObserver.disconnect();
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef, handleScroll]);

  // Memoize calculations
  const { startIndex, endIndex, virtualItems, totalHeight } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(
      totalItems - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    const items = [];
    for (let i = start; i <= end; i++) {
      items.push({
        index: i,
        offsetTop: i * itemHeight
      });
    }

    return {
      startIndex: start,
      endIndex: end,
      virtualItems: items,
      totalHeight: totalItems * itemHeight
    };
  }, [scrollTop, containerHeight, itemHeight, totalItems, overscan]);

  return {
    virtualItems,
    totalHeight,
    startIndex,
    endIndex
  };
}