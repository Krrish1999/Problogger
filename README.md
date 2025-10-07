# ProBlogger

A modern full-stack blogging platform built with React, TypeScript, and Cloudflare Workers.

## Project Structure

```
.
├── frontend/           # React frontend application
├── backend/           # Cloudflare Workers backend
└── common/            # Shared TypeScript types and validations
```

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- TipTap for rich text editing
- React Router for navigation
- Axios for API requests

### Backend
- Cloudflare Workers
- Hono framework
- Prisma with PostgreSQL
- JWT for authentication

### Common
- Zod for validation
- Shared TypeScript types

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Cloudflare account (for backend deployment)

### Installation

1. Install frontend dependencies:
```sh
cd frontend
npm install
```

2. Install backend dependencies:
```sh
cd backend
npm install
```

3. Install common package dependencies:
```sh
cd common
npm install
```

### Development

1. Start frontend development server:
```sh
cd frontend
npm run dev
```

2. Start backend development server:
```sh
cd backend
npm run dev
```

### Building for Production

1. Build frontend:
```sh
cd frontend
npm run build
```

2. Deploy backend to Cloudflare Workers:
```sh
cd backend
npm run deploy
```

## Features

- User authentication (signup/signin)
- Rich text blog editor with formatting options
- Blog post creation and viewing
- Responsive design
- Real-time content updates
- SEO-friendly content structure

## Environment Variables

### Frontend (.env)
```
VITE_BACKEND_URL=http://localhost:8787
```

### Backend (wrangler.jsonc)
```
DATABASE_URL=your_prisma_database_url
JWT_SECRET=your_jwt_secret
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
