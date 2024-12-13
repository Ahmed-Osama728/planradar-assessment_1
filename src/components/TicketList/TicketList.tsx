import { useRef, useMemo, useCallback } from 'react';
import { useVirtualList } from '../../hooks/useVirtualList';
import { Ticket } from '../../types/ticket';
import { TicketItem } from './TicketItem';
import { TicketListHeader } from './TicketListHeader';

interface TicketListProps {
  tickets: Ticket[];
}

const ITEM_HEIGHT = 80;

export function TicketList({ tickets }: TicketListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { virtualItems, totalHeight } = useVirtualList({
    itemHeight: ITEM_HEIGHT,
    totalItems: tickets.length,
    containerRef,
    overscan: 5
  });

  // Memoize style calculation function
  const getItemStyle = useCallback((offsetTop: number) => ({
    height: ITEM_HEIGHT,
    transform: `translateY(${offsetTop}px)`
  }), []);

  // Memoize virtual items with their styles
  const memoizedVirtualItems = useMemo(() => 
    virtualItems.map(({ index, offsetTop }) => ({
      ticket: tickets[index],
      style: getItemStyle(offsetTop)
    })),
    [virtualItems, tickets, getItemStyle]
  );

  return (
    <div className="h-full bg-gray-50 p-6">
      <TicketListHeader />
      <div
        ref={containerRef}
        className="h-[calc(100vh-180px)] overflow-auto rounded-lg border border-gray-200 bg-white shadow-sm will-change-transform"
      >
        <div 
          style={{ 
            height: totalHeight, 
            position: 'relative',
            willChange: 'transform'
          }}
        >
          {memoizedVirtualItems.map(({ ticket, style }) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              style={style}
            />
          ))}
        </div>
      </div>
    </div>
  );
}