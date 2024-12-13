import { useRef } from 'react';
import { useVirtualList } from '../hooks/useVirtualList';
import { Ticket } from '../types/ticket';
import { AlertCircle, Clock, MoreVertical } from 'lucide-react';

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

  const getPriorityColor = (priority: Ticket['priority']) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[priority];
  };

  const getStatusColor = (status: Ticket['status']) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Construction Tickets</h1>
        <p className="text-gray-600">Manage and track construction defects and issues</p>
      </div>

      <div
        ref={containerRef}
        className="h-[calc(100vh-180px)] overflow-auto rounded-lg border border-gray-200 bg-white shadow-sm"
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          {virtualItems.map(({ index, offsetTop }) => {
            const ticket = tickets[index];
            return (
              <div
                key={ticket.id}
                className="absolute w-full border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ease-in-out p-4"
                style={{
                  height: ITEM_HEIGHT,
                  transform: `translateY(${offsetTop}px)`
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-sm font-medium">
                        {ticket.id}
                      </span>
                      <h3 className="font-medium text-gray-900">
                        {ticket.subject}
                      </h3>
                    </div>
                    <div className="mt-1 flex items-center gap-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {ticket.priority}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        Assigned to: {ticket.assignedTo}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}