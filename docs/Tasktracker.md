# vibe-context.io - Development Task Tracker

## 1. Project Setup & Core Infrastructure

- [Completed] **[Critical]** Initialize Next.js project with TypeScript.
- [Completed] **[Critical]** Set up pnpm workspaces and Turbo for monorepo management.
- [Completed] **[High]** Configure ESLint and Prettier for code quality and formatting.
- [Completed] **[High]** Set up Supabase project (Database, Auth, Storage).
- [Completed] **[High]** Integrate Drizzle ORM into the Next.js project and configure it for Supabase.
- [Completed] **[Medium]** Define basic project structure within `apps/web` (e.g., components, lib, app router structure).
- [Completed] **[Medium]** Implement basic layout components (e.g., Navbar, Sidebar, Footer) using shadcn/ui.
- [Completed] **[Low]** Set up environment variable management (e.g., for Supabase keys, LLM API keys).

## 1.5. Reusable Authentication Package (`@repo/auth`)

- [Completed] **[Critical]** Create reusable authentication package structure.
  - [Completed] **[High]** Set up package.json, TypeScript config, and build system (tsup).
  - [Completed] **[High]** Define core authentication types and interfaces.
  - [Completed] **[High]** Implement platform-agnostic AuthClient for browser environments.
  - [Completed] **[High]** Implement AuthServer for server-side authentication (SSR, API routes).
  - [Completed] **[High]** Create React-specific hooks and providers.
  - [Completed] **[Medium]** Set up proper package exports for different entry points.
- [Completed] **[Critical]** Migrate web app to use the new auth package.
  - [Completed] **[High]** Remove old authentication code from apps/web.
  - [Completed] **[High]** Update all components to use @repo/auth imports.
  - [Completed] **[High]** Update middleware and API routes to use auth package.
  - [Completed] **[Medium]** Remove direct Supabase dependencies from web app.
- [Completed] **[Medium]** Simplify auth package by removing unnecessary build complexity.
  - [Completed] **[Medium]** Remove tsup bundling and build scripts.
  - [Completed] **[Medium]** Update exports to point directly to TypeScript source files.
  - [Completed] **[Medium]** Clean up build artifacts and unnecessary dependencies.
- [Completed] **[Medium]** Security and dependency maintenance.
  - [Completed] **[Medium]** Update @supabase/supabase-js to latest version (^2.49.8).
  - [Completed] **[Medium]** Add missing @supabase/ssr dependency (^0.6.1).
  - [Completed] **[Medium]** Generate package-lock.json for security auditing.
  - [Completed] **[Medium]** Verify no security vulnerabilities (npm audit clean).
  - [Completed] **[Critical]** Fix open redirect vulnerability in OAuth callback route.
  - [Completed] **[High]** Implement URL validation for redirect parameters.
  - [Completed] **[High]** Secure error message handling in production environment.
  - [Completed] **[High]** Fix Supabase auth listener memory leak in AuthClient.destroy().

## 2. User Authentication (Supabase Auth with OAuth2, Next.js, TypeScript)

- [Completed] **[Critical]** Implement OAuth2 sign-up/login flow with Supabase Auth (FR 2.1.1).
  - [Completed] **[High]** Create UI buttons/links for OAuth providers in Next.js.
  - [Completed] **[High]** Implement Supabase `signInWithOAuth()` client-side logic.
  - [Completed] **[High]** Handle OAuth callback in Next.js and Supabase Auth.
  - [Completed] **[High]** Manage user session establishment and redirection.
  - [Completed] **[Medium]** Implement error handling and display for OAuth flow.
- [Completed] **[Critical]** Implement user logout functionality (FR 2.1.2).
  - [Completed] **[High]** Create "Logout" button/option in UI.
  - [Completed] **[High]** Implement Supabase `signOut()` logic.
  - [Completed] **[High]** Handle session invalidation and redirection.
- [Completed] **[Critical]** Fix OAuth profile creation with null values.
  - [Completed] **[High]** Create programmatic profile creation API route (`/api/auth/profile`).
  - [Completed] **[High]** Implement OAuth metadata extraction for Google, GitHub, and other providers.
  - [Completed] **[High]** Integrate automatic profile creation into auth callback flow.
  - [Completed] **[Medium]** Create React `useProfile()` hook for frontend profile management.
  - [Completed] **[Medium]** Add TypeScript type safety and error handling for OAuth data.
- [To Do] **[High]** Set up Supabase Row Level Security (RLS) policies for user-specific data access for all relevant tables.

## 3. Project Management (Next.js, Supabase, Drizzle)

- [To Do] **[High]** Implement "Create New Project & Initiate Idea Generation Chat" (FR 2.2.1 - Backend: API Route).
  - [To Do] **[High]** Create Next.js API route for project creation.
  - [Completed] **[High]** Define `projects` table schema with Drizzle (including `appIdeaSummary_text`, `chat_transcript_filename`).
  - [To Do] **[High]** Implement Drizzle logic to insert new project record (with `appIdeaSummary_text`) into Supabase.
  - [To Do] **[Medium]** Logic for generating unique filenames for stored documents.
- [To Do] **[High]** Implement "Create New Project & Initiate Idea Generation Chat" (FR 2.2.1 - Frontend: UI).
  - [To Do] **[High]** Create "Start New Project" button and initial chat interface.
  - [To Do] **[High]** Handle project naming and confirmation.
  - [To Do] **[High]** Redirect to project workspace and display `appIdeaSummary_text` from project record.
- [To Do] **[Medium]** Implement "View Project List" (FR 2.2.2 - Backend: API Route).
  - [To Do] **[Medium]** Create Next.js API route to fetch projects for a user.
  - [To Do] **[Medium]** Implement Drizzle logic to query `projects` table.
- [To Do] **[Medium]** Implement "View Project List" (FR 2.2.2 - Frontend: UI).
  - [To Do] **[Medium]** Create UI to display list of projects with names and dates.
  - [To Do] **[Medium]** Handle navigation to selected project workspace.
- [To Do] **[Low]** Implement "(Stretch Goal) Update Project Name" (FR 2.2.3 - Backend & Frontend).

## 4. AI & LLM Orchestration (LangChain.js, OpenRouter, Next.js, Supabase Storage)

- [To Do] **[Critical]** Set up LangChain.js core and relevant modules (Chains, Prompts, Memory, LLMs integration with OpenRouter).
  - **Description:** Integrate LangChain.js into the Next.js backend for orchestrating all LLM interactions.
  - **Tasks:** Install LangChain.js packages, configure it to use OpenRouter for LLM calls, create utility services for LangChain.js usage.
- [To Do] **[High]** Integrate OpenRouter for all LLM API calls (now via LangChain.js).
  - **Description:** Abstract LLM interactions through OpenRouter, managed by LangChain.js, to support multiple models and providers.
  - **Tasks:** Set up OpenRouter API key (if not done), ensure LangChain.js service correctly routes calls through OpenRouter.
- [To Do] **[High]** Develop chat interface in Next.js (FR 2.2.1 related).
  - [To Do] **[High]** UI for displaying chat messages (user and AI).
  - [To Do] **[High]** Input field for user messages.
- [To Do] **[High]** Implement Next.js API route to handle chat interactions using LangChain.js for conversation management (memory) and LLM calls (via OpenRouter).
  - [To Do] **[High]** Use LangChain.js to send user messages to LLM and get responses.
  - [To Do] **[High]** Implement LangChain.js conversational memory for the idea generation chat.
- [To Do] **[High]** Implement logic to save chat transcript to Supabase Storage and AI-summarized app idea as text in `projects` table (FR 2.2.1 related, chat part managed by LangChain.js).
  - [To Do] **[Medium]** API route logic to upload chat transcript file to Supabase Storage.
  - [To Do] **[Medium]** API route logic to update `projects` table with `appIdeaSummary_text`.

## 5. PRD Generation (LangChain.js, Next.js, External LLM, Supabase Storage)

- [To Do] **[High]** Implement "Utilize AI-Generated App Idea Text for PRD" (FR 2.3.1 - Frontend).
  - [To Do] **[High]** UI to display content of `projects.appIdeaSummary_text`.
  - [To Do] **[Medium]** (Optional) UI for minor edits to the `appIdeaSummary_text`.
- [To Do] **[High]** Implement "Generate PRD from AI-Formulated App Idea Text" (FR 2.3.2 - Backend: API Route using LangChain.js).
  - [To Do] **[High]** API route to retrieve `appIdeaSummary_text` from `projects` table.
  - [To Do] **[High]** Use LangChain.js to construct prompt and send `appIdeaSummary_text` to LLM (via OpenRouter) for PRD generation.
  - [To Do] **[High]** Save generated PRD as a new file to Supabase Storage.
  - [To Do] **[High]** Update `projects` table (or `project_documents`) with `prd_filename`.
- [To Do] **[High]** Implement "Generate PRD from AI-Formulated App Idea Text" (FR 2.3.2 - Frontend: UI).
  - [To Do] **[High]** "Generate PRD" button.
  - [To Do] **[High]** Loading state during generation.
  - [To Do] **[High]** Display content of newly generated PRD file.
  - [To Do] **[Medium]** Error handling from LLM/storage.

## 5.5. Document Management System (Next.js, Supabase Storage, Drizzle)

- [Completed] **[Critical]** Create docs table schema with comprehensive document filename fields.
- [Completed] **[High]** Implement bidirectional relationship between projects and docs tables.
- [To Do] **[High]** Implement document generation and management API routes.
  - [To Do] **[High]** API route to create new document entries in docs table.
  - [To Do] **[High]** API route to upload document files to Supabase Storage.
  - [To Do] **[High]** API route to retrieve document content from Storage.
  - [To Do] **[Medium]** API route to update document filenames and metadata.
- [To Do] **[High]** Implement document management UI components.
  - [To Do] **[High]** Document list view showing all project documents.
  - [To Do] **[High]** Document viewer for displaying document content.
  - [To Do] **[Medium]** Document upload and management interface.
  - [To Do] **[Medium]** Document type categorization and organization.
- [To Do] **[Medium]** Integrate document management with existing project workflows.
  - [To Do] **[Medium]** Link PRD generation to docs table prdFilename field.
  - [To Do] **[Medium]** Connect tech requirements generation to docs table.
  - [To Do] **[Low]** Implement document versioning and history tracking.

## 6. Prompt Tree Generation & Management (LangChain.js, Next.js, Supabase, Drizzle, External LLM)

- [Completed] **[Critical]** Define `prompt_nodes` table schema with Drizzle (linking to `prompts` table via `prompt_id`) (FR 2.4.1).
- [Completed] **[Critical]** Define `prompts` table schema with Drizzle (to store reusable prompt content, using `prompt_markdown_filename`, no `codeSnippet`).
- [Completed] **[High]** Add tags system to prompts table for better categorization and discovery.
- [Completed] **[High]** Implement prompt security policies to prevent deletion and ensure reusability.
- [To Do] **[High]** Implement "Generate Initial Prompt Tree" (FR 2.4.1 - Backend: API Route using LangChain.js).
  - [To Do] **[High]** API route to use LangChain.js to interact with LLM (via OpenRouter), providing project context (e.g., `appIdeaSummary_text`).
  - [To Do] **[High]** Use LangChain.js to manage LLM interaction for structured tree output, parse LLM response, save each prompt's Markdown content to a new file in Supabase Storage, create entries in `prompts` table (linking to the markdown file via `prompt_markdown_filename`), and save structured tree data to `prompt_nodes` table (linking to `prompts`) using Drizzle.
- [To Do] **[High]** Implement "Generate Initial Prompt Tree" (FR 2.4.1 - Frontend: UI).
  - [To Do] **[High]** "Generate Prompt Tree" button.
  - [To Do] **[High]** Dynamically render tree structure (fetching prompt Markdown file content via `prompt_id` -> `prompt_markdown_filename`).
  - [To Do] **[Medium]** Loading state and error handling.
- [To Do] **[Medium]** Implement "Manually Add Prompt Node" (FR 2.4.2 - Backend & Frontend).
  - [To Do] **[Medium]** UI for adding node and creating/selecting prompt.
  - [To Do] **[Medium]** API logic to create `prompts` entry (saving Markdown to new file, linking via `prompt_markdown_filename`) if new, and `prompt_nodes` entry.
- [To Do] **[Medium]** Implement "Edit Prompt Node Content" (FR 2.4.3 - Backend & Frontend).
  - **Description:** This involves editing Markdown content. A new Markdown file is created in Supabase Storage, and a new `prompts` record is created on edit to ensure reusability is handled correctly.
  - [To Do] **[Medium]** UI for editing prompt Markdown content associated with a node (fetched from file via `prompt_markdown_filename`).
  - [To Do] **[Medium]** API logic to handle creation of new Markdown file in Supabase Storage, new prompt entry in `prompts` table upon edit, and update `prompt_nodes.prompt_id`.
- [To Do] **[Medium]** Implement "Delete Prompt Node" (FR 2.4.4 - Backend & Frontend) (Note: this only deletes the node, not the prompt from `prompts` table).

## 7. Node Editing & Downstream Regeneration (LangChain.js, Next.js, Supabase, External LLM)

- [To Do] **[High]** Implement "Automatic Downstream Prompt Regeneration" (FR 2.5.1 - Backend: API Route using LangChain.js).
  - [To Do] **[High]** Use LangChain.js to identify descendant nodes when a parent node's `prompt_id` changes.
  - [To Do] **[High]** For each descendant, use LangChain.js to fetch/construct context (resolving `prompt_id` to `prompt_markdown_filename` and fetching file content for all parent nodes in path), send to LLM (via OpenRouter) for regeneration, create new Markdown file in Supabase Storage, create new prompt entry in `prompts` table (linking to new file), and update descendant's `prompt_id` in `prompt_nodes`.
- [To Do] **[High]** Implement "Automatic Downstream Prompt Regeneration" (FR 2.5.1 - Frontend: UI).
  - [To Do] **[High]** Dynamic UI updates for regenerated nodes (fetching new prompt Markdown file content).
  - [To Do] **[Medium]** Visual feedback (loading indicators) during regeneration.

## 8. Database Setup & ORM (Drizzle & Supabase)

- [Completed] **[High]** Finalize Drizzle schemas for all tables (`projects`, `prompt_nodes`, `prompts`, `docs`). (Covered by other sections, but good to track overall schema readiness)
- [Completed] **[High]** Implement Drizzle migrations strategy.
- [Completed] **[High]** Add tags system to prompts table for categorization (text[] array).
- [Completed] **[High]** Create comprehensive document management system with docs table.
- [Completed] **[High]** Implement bidirectional relationship between projects and docs tables.
- [In Progress] **[Critical]** Implement and thoroughly test Supabase Row Level Security (RLS) policies for all tables and Supabase Storage.
  - [Completed] **[High]** Design comprehensive RLS policies for user data isolation.
  - [Completed] **[High]** Update RLS policies to include docs table and remove prompt deletion permissions.
  - [To Do] **[High]** Apply RLS policies to Supabase database (manual application via SQL Editor required).
  - [To Do] **[Medium]** Test RLS policies with different user scenarios to ensure proper data isolation.

## 9. Non-Functional Requirements Implementation

- [To Do] **[Medium]** Performance: Implement optimizations for Next.js page loads (NFR 3.1).
- [To Do] **[Medium]** Performance: Optimize UI interaction responsiveness (NFR 3.1).
- [To Do] **[Low]** Performance: Monitor and optimize LLM interaction & Supabase query times (NFR 3.1).
- [To Do] **[High]** Security: Ensure all client-server communication is HTTPS (usually default with hosting). (NFR 3.2)
- [Completed] **[High]** Security: Review and ensure correct usage of Supabase client/server SDKs. (NFR 3.2)
- [Completed] **[Critical]** Security: Fix open redirect vulnerabilities in authentication flows. (NFR 3.2)
- [To Do] **[Medium]** Security: Implement basic input sanitization for LLM prompts. (NFR 3.2)
- [To Do] **[Medium]** Usability & UI/UX: Ensure clean, modern, minimalist UI with shadcn/ui. (NFR 3.3)
- [To Do] **[Medium]** Usability & UI/UX: Ensure core actions are prominent and discoverable. (NFR 3.3)
- [To Do] **[Medium]** Usability & UI/UX: Ensure responsive design for desktop/laptop. (NFR 3.3)

## 10. Deployment & DevOps

- [To Do] **[High]** Set up CI/CD pipeline (e.g., GitHub Actions to Vercel).
- [To Do] **[Medium]** Configure production environment variables on Vercel/hosting platform.
- [To Do] **[Medium]** Initial deployment to a staging/preview environment.
- [To Do] **[High]** Production deployment strategy.

## 11. Documentation

- [To Do] **[Low]** Review and update `project.mdc`, `tech-requirements.mdc`, `tech-stack.mdc` as development progresses.
- [To Do] **[Medium]** Create a basic README.md for the `apps/web` application.
- [To Do] **[Low]** Document core Drizzle schemas and their relationships.
- [To Do] **[Low]** Document environment variable setup for developers.
- [To Do] **[Medium]** Review and address questions in `docs/quality-assurance-questions.md` to refine requirements and design before extensive development.

## 12. Testing

- [To Do] **[Medium]** Set up unit testing framework (e.g., Vitest or Jest) for Next.js components and utility functions.
- [To Do] **[Low]** Write unit tests for critical helper functions and API route logic.
- [To Do] **[Medium]** Set up integration testing for API routes interacting with Supabase/Drizzle.
- [To Do] **[Low]** (Post-MVP) Plan for E2E testing framework (e.g., Playwright or Cypress).

## 13. Future Considerations & Research

- [To Do] **[Low]** Research and define requirements for Model Context Protocol (MCP) server integration (FC 7.1 from `tech-requirements.mdc`).
  - **Description:** Explore making VibeContext an MCP Host to connect with external tools (Windsurf, Cursor) and data sources via MCP Servers, enhancing context sharing.
  - **Tasks:** Investigate MCP client implementation, assess existing MCP server ecosystem, define specific use cases for VibeContext.

## 14. Monetization (Polar.sh Integration)

- [To Do] **[High]** Design and define subscription tiers and feature entitlements (FR 2.6.1).
- [To Do] **[High]** Integrate Polar.sh SDK/API for checkout process (FR 2.6.2 - Backend & Frontend).
  - [To Do] **[High]** Set up Polar.sh account and configure products/tiers.
  - [To Do] **[High]** Implement UI for selecting tiers and initiating Polar.sh checkout.
  - [To Do] **[High]** Create Next.js API routes for handling Polar.sh webhooks (e.g., subscription created, updated, canceled).
- [To Do] **[Medium]** Implement logic to update and manage user subscription status in VibeContext database based on Polar.sh webhooks (FR 2.6.2).
  - [To Do] **[Medium]** Design schema for storing user subscription status (e.g., new table `user_subscriptions` or extend existing user table).
- [To Do] **[Medium]** Implement redirection to Polar.sh customer portal for subscription management (FR 2.6.3).
- [To Do] **[High]** Implement feature entitlement logic based on user's subscription tier (FR 2.6.4 - Backend & Frontend).
  - [To Do] **[High]** Backend checks for API endpoints.
  - [To Do] **[High]** UI changes to reflect entitlements (e.g., disable/hide features, show upgrade prompts).
- [To Do] **[Medium]** Create pricing page UI detailing tiers and features.
- [To Do] **[Low]** Set up and test Polar.sh sandbox/test environment.
