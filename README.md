# VibeContext.io - AI-Powered App Development Assistant

Transform your app ideas into structured development plans with AI-powered assistance.

This is a multi-package workspace powered by [Turborepo](https://turborepo.com/).

## 🚀 Features

- **⚡ Instant Project Creation**: Zero-delay navigation with optimistic UI
- **🤖 AI-Powered Discovery**: Interactive chat to refine your app idea
- **📋 Structured Documentation**: Auto-generated PRDs and technical requirements

## Project Structure

```text
├── apps/
│   └── web/                    # Next.js web application
│       ├── src/
│       │   ├── app/           # Next.js App Router pages
│       │   ├── components/    # Generic React components
│       │   ├── entities/      # Domain entities (DDD)
│       │   │   └── project/   # Project domain components
│       │   │       └── ui/    # Project UI components
│       │   ├── features/      # Feature-specific components
│       │   │   └── project/   # Project-related features
│       │   │       └── create/ # Project creation feature
│       │   ├── shared/        # Shared utilities and components
│       │   │   ├── components/ # Shared UI components
│       │   │   └── lib/       # Shared utilities
│       │   ├── lib/           # App-specific utilities
│       │   └── hooks/         # Custom React hooks
│       ├── .eslintrc.json     # ESLint configuration
│       ├── components.json    # shadcn/ui configuration
│       └── tsconfig.json      # TypeScript configuration
├── packages/
│   ├── ai/                    # AI integration package
│   │   └── src/
│   │       ├── providers/     # AI provider implementations
│   │       └── utils/         # AI utilities
│   └── db/                    # Database package
│       └── src/
│           ├── schema/        # Database schema (Drizzle)
│           └── utils/         # Database utilities
├── docs/                      # Project documentation
│   ├── project.mdc           # Project overview
│   ├── tech-requirements.mdc # Technical requirements
│   ├── tech-stack.mdc        # Technology stack
│   ├── Diary.md              # Development diary
│   └── Tasktracker.md        # Task tracking
├── .prettierrc                # Prettier configuration
├── turbo.json                 # Turborepo task configuration
└── package.json               # Root package.json
```

## 🏗️ Architecture Principles

### Domain-Driven Design (DDD)

- **Entities**: Domain-specific components (`/entities/project/ui`)
- **Features**: Complete feature implementations (`/features/project/create`)
- **Shared**: Reusable components and utilities (`/shared/components/ui`)

### Performance Optimizations

- **Lazy Conversation Creation**: Database operations only when needed
- **Instant UUID Generation**: Frontend-generated IDs for immediate navigation
- **Optimistic UI**: Immediate feedback with background operations
- **Comprehensive Skeletons**: Loading states that match final UI

### Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with custom theming
- **Database**: Supabase with Drizzle ORM
- **AI Integration**: OpenRouter with multiple LLM providers
- **Build System**: Turborepo with pnpm workspaces

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+
- Supabase account (for database)
- OpenRouter API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vibecontext-io.git
cd vibecontext-io

# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.local.example apps/web/.env.local
# Edit .env.local with your API keys and database URL
```

### Environment Variables

Create `apps/web/.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenRouter AI
OPENROUTER_API_KEY=your_openrouter_api_key
```

### Development

```bash
# Start development server for all apps
pnpm dev

# Start development server for specific app
turbo dev --filter=@repo/web

# Database development
pnpm db:studio    # Open Drizzle Studio
pnpm db:push      # Push schema changes
pnpm db:generate  # Generate migrations
```

### Building

```bash
# Build all apps
pnpm build

# Build specific app
turbo build --filter=@repo/web
```

### Code Quality

```bash
# Lint all packages
pnpm lint

# Format all packages
pnpm format

# Type checking
pnpm check-types

# Run all quality checks
pnpm qa
```

## 🎯 Key Features Explained

### Instant Project Creation

- **Frontend UUID Generation**: Creates project IDs instantly on button click
- **Lazy Database Creation**: Conversations created only when user sends first message
- **Optimistic Navigation**: Users see project page immediately

### AI-Powered Discovery

- **Interactive Chat**: Guided conversation to refine app ideas
- **OpenRouter Integration**: Multiple LLM providers for reliability
- **Structured Output**: Generates comprehensive project documentation

### Loading States

- **Skeleton Components**: Match exact layout of final components
- **Progressive Enhancement**: Show realistic conversation patterns
- **Smooth Transitions**: Seamless loading experience

### Architecture Benefits

- **Scalable Structure**: Easy to add new domains and features
- **Type Safety**: End-to-end TypeScript with strict configuration
- **Maintainable Code**: Clear separation of concerns
- **Reusable Components**: Shared UI library with consistent theming

## 📝 Documentation

- [Project Overview](./docs/project.mdc) - High-level project description and goals
- [Technical Requirements](./docs/tech-requirements.mdc) - Detailed functional and non-functional requirements
- [Technology Stack](./docs/tech-stack.mdc) - Complete technology stack with examples
- [Development Diary](./docs/Diary.md) - Development progress and decisions
- [Task Tracker](./docs/Tasktracker.md) - Current tasks and priorities

## 🤝 Contributing

1. Follow the established architecture patterns
2. Use TypeScript strictly (no `any` types)
3. Follow semantic commit conventions
4. Update documentation for significant changes
5. Test all features thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Next.js, Supabase, and OpenRouter**
