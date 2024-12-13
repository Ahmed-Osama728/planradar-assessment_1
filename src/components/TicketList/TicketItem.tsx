import { memo, useMemo } from 'react';
import { AlertCircle, Clock, MoreVertical } from 'lucide-react';
import { Ticket } from '../../types/ticket';
import { getPriorityColor, getStatusColor } from '../../utils/styleUtils';

interface TicketItemProps {
  ticket: Ticket;
  style: React.CSSProperties;
}

const baseClasses = "absolute w-full border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ease-in-out p-4";
const buttonClasses = "p-2 hover:bg-gray-100 rounded-full";
const idClasses = "text-gray-600 text-sm font-medium";
const subjectClasses = "font-medium text-gray-900";
const dateClasses = "text-sm text-gray-500 flex items-center";
const assigneeClasses = "text-sm text-gray-500";

export const TicketItem = memo(function TicketItem({ ticket, style }: TicketItemProps) {
  // Memoize expensive class computations
  const priorityClasses = useMemo(() => 
    `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`,
    [ticket.priority]
  );

  const statusClasses = useMemo(() => 
    `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`,
    [ticket.status]
  );

  const formattedDate = useMemo(() => 
    new Date(ticket.createdAt).toLocaleDateString(),
    [ticket.createdAt]
  );

  return (
    <div className={baseClasses} style={style}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className={idClasses}>{ticket.id}</span>
            <h3 className={subjectClasses}>{ticket.subject}</h3>
          </div>
          <div className="mt-1 flex items-center gap-4">
            <span className={priorityClasses}>
              <AlertCircle className="w-3 h-3 mr-1" />
              {ticket.priority}
            </span>
            <span className={statusClasses}>{ticket.status}</span>
            <span className={dateClasses}>
              <Clock className="w-3 h-3 mr-1" />
              {formattedDate}
            </span>
            <span className={assigneeClasses}>
              Assigned to: {ticket.assignedTo}
            </span>
          </div>
        </div>
        <button 
          className={buttonClasses}
          aria-label="More options"
        >
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
});