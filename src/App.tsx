import { useMemo } from 'react';
import { TicketList } from './components/TicketList';
import { generateMockTickets } from './utils/mockData';

function App() {
  const tickets = useMemo(() => generateMockTickets(10000), []);

  return (
    <div className="min-h-screen bg-gray-100">
      <TicketList tickets={tickets} />
    </div>
  );
}

export default App;