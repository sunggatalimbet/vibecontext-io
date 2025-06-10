# vibe-context.io - Development Diary

# June 1st, 2025

## Set up core project infrastructure

Used Turborepo for monorepo implementation, added `apps/web` app using next js framework, added packages `packages/auth`, `packages/db` using supabase auth and database, added `tooling` directory where eslint and typescript configurations stored.

## Problems

1. Migration to Turborepo required expertise.
2. Initial Supabase authentication and database management set up required expertise.

## Solutions

1. Using browsing tools found Turborepo and Supabase documentation related with initial setup.

# June 2nd, 2025

## Add OAuth Google and Github providers

Added Google and Github providers via Supabase Auth and create `AuthProvider`, `useAuth`, `useAuthClient` hooks and app providers for managing user authentication and authorization. Helped configure services for author to configure Google Console app and borrow Google Client Id and Client Secret, as well as Github Client Id and Github Client Secret.

## Problems

1. Auth service providers needed manual configuration to get environment variables that were out of development scope.
2. Multiple type errors in the process of app provider and hooks creation for authorization and authentication.

## Solutions

1. Helped author by providing instructions how to create app inside Google and Github consoles and provided instructuions how to store client identificators and secrets inside Supabase Auth dashboard.
2. Fixed type errors by accessing Supabase and Supabase Auth libraries TypeScript files and reading error messages in console and IDE.

# June 3nd, 2025

## Add Drizzle ORM integration with Supabase PostgreSQL interactions

Created schemas for following table entities: `profiles`, `projects`, `docs`, `prompts`, `prompt_nodes` by analysis of tech-requirements.mdc and tech-stack.mdc, ensuring full implementation of fields, their data types, and relations between tables. Implemented RLS and RLS policies using manual setup inside Supabase dashboard.

## Problems

1. Unclear and ambiguous instructions provided for table schemas resulted in multiple iterations.
2. RLS Policies required manual configuration that were out of development scope.

## Solutions

1. Asked open and closed questions to author that gave more context of schema and relations implementation.
2. Helped author by providing instructions how to securely set up RLS and RLS Policies inside Supabase Dashboard.

# June 5th

## Fix Authentication Flow Redirect Loop

Refactored authentication functionality by implementing server-side authentication and authorization using `@supabase/ssr`.

## Problems

1. Middleware and server-side redirects were conflicting, creating a loop between protected and auth routes

## Solutions

1. Hiding UserMenu component if there is no user

# June 6th, 2025

## Feature Implementation: AI Integration and Project Creation UI

Integrated the OpenRouter AI provider, developing a full suite of UI components for project creation, and refactoring the backend chat API into a single, unified endpoint.

## Problems

1. The workspace contained numerous uncommitted changes across multiple features, making it difficult to track progress and isolate features for review.
2. Data validation using Zod schema for sending chat messages using Next JS API Routes created problems.

## Solutions

1. Created a series of atomic, feature-based commits (e.g., AI provider, UI components, API refactoring) to logically separate the work.
2. Created zod `chatMessageSchema` and `chatSchema` objects and used for request parsing.

# June 8th, 2025

## Architecture Refactoring and Performance Optimization

Implemented major architectural improvements including Domain-Driven Design patterns, instant project creation with lazy database operations, and comprehensive skeleton loading states.

Restructured the entire codebase using DDD principles with entities, features, and shared components. Created instant navigation using frontend UUID generation and lazy conversation creation only when users send their first message. Added comprehensive skeleton components that exactly match the final UI layout.

## Problems

1. Slow project creation taking 2+ seconds due to synchronous database operations during button clicks
2. Large monolithic commit containing multiple unrelated features making it difficult to track changes
3. Poor loading experience with basic "Loading..." text instead of meaningful skeleton states
4. Inconsistent project structure making it hard to locate and maintain components

## Solutions

1. Implemented lazy conversation creation pattern - generate UUID instantly on frontend, create database records only when first message is sent
2. Reorganized single large commit into 6 focused commits: shared components move, entities creation, features implementation, lazy creation, page updates, and cleanup
3. Created comprehensive skeleton components that match exact ChatBubble structure with realistic user/AI message patterns and proper spacing
4. Refactored to Domain-Driven Design with clear separation: `/entities/project/ui` for domain components, `/features/project/create` for feature implementations, `/shared/components/ui` for reusable components

# June 10th, 2025

## Sidebar Projects Skeleton and Theme Hydration Fix

Created skeleton loading component for sidebar projects section and resolved React hydration mismatch error related to theme provider configuration.

Built `SidebarProjectsSkeleton` component that renders three skeleton items matching the exact structure and styling of the real project buttons, ensuring consistent loading experience. Fixed theme-related hydration mismatch by addressing conflicts between hardcoded theme classes and next-themes dynamic theme management.

## Problems

1. Missing skeleton component for sidebar projects causing poor loading experience during data fetching
2. React hydration mismatch error due to conflicting theme class management between server and client rendering
3. Different HTML attributes between server-rendered and client-rendered content causing console warnings

## Solutions

1. Created skeleton component with proper dimensions (`h-4 w-full`) and layout (`h-9 flex items-center`) matching real project buttons
2. Initially attempted to remove hardcoded `dark` class to let next-themes handle theme management, but ultimately used `suppressHydrationWarning` on html element to handle expected theme-related hydration differences
3. Used `Array.from({ length: 3 })` to render three skeleton items simulating realistic loading state for projects list
