# Loop — Student Learning Assistant

Loop is an intelligent student assistant designed to centralize your academic workflow. By integrating with essential tools like Canvas LMS, Notion, and Google Calendar, Loop provides a unified, conversational interface to help you manage assignments, track grades, and schedule study sessions efficiently.

## Key Features

- **AI Chat Interface**: Context-aware AI assistant capable of understanding your academic data. Supports Markdown and code syntax highlighting.
- **Smart Integrations**:
  - **Canvas LMS**: Sync courses, assignments, and grades.
  - **Notion**: Access and manage your study notes.
  - **Google Calendar**: Organize your schedule and deadlines.
- **Secure Authentication**: Robust user session management with protected routes.
- **User Settings**: Comprehensive profile management, security settings, and integration controls.
- **Modern UI**: Built with Tailwind CSS v4 and Radix UI for a responsive and accessible experience.
- **Reactive Data**: Optimistic UI updates and caching using TanStack Query.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Global Store)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/) (Icons)
- **HTTP Client**: Axios

## Project Structure

```bash
src/
├── api/             # API integration layers (Axios clients, endpoints)
├── components/      # Reusable UI components
│   ├── auth/        # Login/Signup forms & loaders
│   ├── chat/        # Chat interface, messages, & sidebar
│   ├── loaders/     # Skeletons and loading screens
│   └── ui/          # Primitives (Buttons, Dialogs, Inputs, etc.)
├── context/         # Global state (Zustand stores)
├── hooks/           # Custom React hooks (useAuth, useChat, etc.)
├── lib/             # Utilities and helpers (cn, formatters)
├── pages/           # Application views (Landing, Chat, Connections)
├── router/          # Route definitions and guards (Protected/Public)
└── types/           # TypeScript interfaces and shared types
```

## ⚡ Getting Started

### Prerequisites

- Node.js (v20.19+ or v22.12+ recommended for Vite)
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/student-assistant-frontend.git
   cd student-assistant-frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

4. **Run Development Server**
   ```bash
   pnpm dev
   ```
   The app will be available at `http://localhost:5173`.

## Building for Production

To create a production-ready build:

```bash
pnpm build
```

This will generate the static assets in the `dist/` folder, ready to be deployed to Vercel, Netlify, or any static host.

## License

This project was developed as a capstone project for academic purposes.
