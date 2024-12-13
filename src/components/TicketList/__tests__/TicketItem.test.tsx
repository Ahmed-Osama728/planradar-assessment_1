import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/utils/test-utils';
import { TicketItem } from '../TicketItem';
import { mockTicket } from '../../../test/mocks/ticketMocks';

describe('TicketItem', () => {
  const defaultStyle = { height: 80, transform: 'translateY(0)' };

  it('renders ticket information correctly', () => {
    render(<TicketItem ticket={mockTicket} style={defaultStyle} />);

    expect(screen.getByText(mockTicket.id)).toBeInTheDocument();
    expect(screen.getByText(mockTicket.subject)).toBeInTheDocument();
    expect(screen.getByText(mockTicket.priority)).toBeInTheDocument();
    expect(screen.getByText(mockTicket.status)).toBeInTheDocument();
    expect(screen.getByText(`Assigned to: ${mockTicket.assignedTo}`)).toBeInTheDocument();
  });

  it('applies correct style props', () => {
    const { container } = render(<TicketItem ticket={mockTicket} style={defaultStyle} />);
    const ticketElement = container.firstChild as HTMLElement;
    
    expect(ticketElement).toHaveStyle({
      height: '80px',
      transform: 'translateY(0)'
    });
  });
});