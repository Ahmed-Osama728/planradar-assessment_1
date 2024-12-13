import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/utils/test-utils';
import { TicketList } from '../TicketList';
import { mockTickets } from '../../../test/mocks/ticketMocks';

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