import { Ticket } from '../../types/ticket';

export const mockTicket: Ticket = {
  id: 'TICKET-00001',
  subject: 'Test Ticket',
  priority: 'high',
  status: 'open',
  description: 'Test description',
  createdAt: '2024-03-14T12:00:00Z',
  assignedTo: 'John Doe'
};

export const mockTickets: Ticket[] = [
  mockTicket,
  {
    id: 'TICKET-00002',
    subject: 'Another Test Ticket',
    priority: 'low',
    status: 'in-progress',
    description: 'Another test description',
    createdAt: '2024-03-14T13:00:00Z',
    assignedTo: 'Jane Smith'
  }
];