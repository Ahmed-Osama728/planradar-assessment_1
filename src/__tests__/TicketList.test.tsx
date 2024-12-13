import { render, screen } from '@testing-library/react';
import { TicketList } from '../components/TicketList';
import { Ticket } from '../types/ticket';

const mockTickets: Ticket[] = [
  {
    id: 'TICKET-00001',
    subject: 'Test Ticket',
    priority: 'high',
    status: 'open',
    description: 'Test description',
    createdAt: '2024-03-14T12:00:00Z',
    assignedTo: 'John Doe'
  }
];

describe('TicketList', () => {
  it('renders tickets correctly', () => {
    render(<TicketList tickets={mockTickets} />);
    
    expect(screen.getByText('TICKET-00001')).toBeInTheDocument();
    expect(screen.getByText('Test Ticket')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
    expect(screen.getByText('open')).toBeInTheDocument();
    expect(screen.getByText('Assigned to: John Doe')).toBeInTheDocument();
  });

  it('handles empty ticket list', () => {
    render(<TicketList tickets={[]} />);
    expect(screen.getByText('Construction Tickets')).toBeInTheDocument();
  });
});