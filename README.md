# Alshrani Airlines Booking Platform

A modern flight booking platform built with React and Express, featuring a clean user interface and robust booking functionality.

## Features

- User authentication (login/register)
- Flight search and filtering
- Booking management
- Responsive design
- Real-time flight information

## Tech Stack

- Frontend: React with TypeScript
- Backend: Express.js
- Database: PostgreSQL with Drizzle ORM
- Styling: Tailwind CSS + shadcn/ui
- State Management: TanStack Query
- Routing: Wouter

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd alshrani-airlines
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

4. Initialize the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
alshrani-airlines/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── pages/        # Page components
├── server/                # Backend Express server
│   ├── auth.ts           # Authentication logic
│   ├── routes.ts         # API routes
│   └── storage.ts        # Database interactions
├── shared/               # Shared types and schemas
└── package.json         # Project dependencies and scripts
```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run start`: Start the production server
- `npm run db:push`: Update database schema

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
