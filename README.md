# Construction Ticket Management System

A high-performance React application for managing construction defects and tickets. This application implements a custom virtual scrolling solution to handle large datasets efficiently.

## Features

- Custom virtual scrolling implementation for handling 10,000+ tickets
- TypeScript for type safety
- Responsive and beautiful UI with Tailwind CSS
- Unit tests with Vitest and React Testing Library
- Zero dependencies for virtualization (built from scratch)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/construction-ticket-manager.git
cd construction-ticket-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Running Tests

```bash
npm test
```

## Technical Details

### Virtual Scrolling Implementation

The virtual scrolling is implemented using a custom hook `useVirtualList` that:
- Maintains a fixed height for each ticket row
- Only renders visible items plus a small overscan area
- Efficiently handles scroll events and viewport calculations
- Updates the visible items based on scroll position

### Project Structure

```
src/
  ├── components/        # React components
  ├── hooks/            # Custom hooks
  ├── types/            # TypeScript type definitions
  ├── utils/            # Utility functions
  ├── __tests__/        # Test files
  ├── App.tsx           # Main application component
  └── main.tsx         # Application entry point
```

## Performance Considerations

- Virtual scrolling ensures constant memory usage regardless of list size
- Memoization of expensive calculations
- Efficient re-rendering through React's virtual DOM
- Fixed height items for predictable calculations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request