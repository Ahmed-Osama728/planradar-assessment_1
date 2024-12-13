import { Ticket, TicketPriority, TicketStatus } from '../types/ticket';

const priorities: TicketPriority[] = ['low', 'medium', 'high', 'critical'];
const statuses: TicketStatus[] = ['open', 'in-progress', 'resolved', 'closed'];
const subjects = [
  'Water leak in basement',
  'Cracked foundation',
  'Electrical issue',
  'Faulty HVAC system',
  'Window installation problem',
  'Roof damage',
  'Plumbing malfunction',
  'Structural concern',
  'Paint defects',
  'Flooring damage'
];

const names = [
  'John Smith',
  'Emma Wilson',
  'Michael Brown',
  'Sarah Davis',
  'James Miller'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateMockTickets(count: number): Ticket[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `TICKET-${(index + 1).toString().padStart(5, '0')}`,
    subject: getRandomElement(subjects),
    priority: getRandomElement(priorities),
    status: getRandomElement(statuses),
    description: `Detailed description for ticket ${index + 1}. This issue requires immediate attention.`,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: getRandomElement(names)
  }));
}