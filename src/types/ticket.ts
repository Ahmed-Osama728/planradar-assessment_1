export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';

export interface Ticket {
  id: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  description: string;
  createdAt: string;
  assignedTo: string;
}