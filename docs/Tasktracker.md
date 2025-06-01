# vibe-context.io - Development Task Tracker

## 1. Project Setup & Core Infrastructure

- [Completed] **[Critical]** Initialize Next.js project with TypeScript.
- [Completed] **[Critical]** Set up pnpm workspaces and Turbo for monorepo management.
- [Completed] **[High]** Configure ESLint and Prettier for code quality and formatting.
- [To Do] **[High]** Set up Supabase project (Database, Auth, Storage).
- [To Do] **[High]** Integrate Drizzle ORM into the Next.js project and configure it for Supabase.
- [Completed] **[Medium]** Define basic project structure within `apps/web` (e.g., components, lib, app router structure).
- [Completed] **[Medium]** Implement basic layout components (e.g., Navbar, Sidebar, Footer) using shadcn/ui.
- [To Do] **[Low]** Set up environment variable management (e.g., for Supabase keys, LLM API keys).

## 2. User Authentication (Supabase Auth with OAuth2, Next.js, TypeScript)

- [To Do] **[Critical]** Implement OAuth2 sign-up/login flow with Supabase Auth (FR 2.1.1).
  - [To Do] **[High]** Create UI buttons/links for OAuth providers in Next.js.
  - [To Do] **[High]** Implement Supabase `signInWithOAuth()` client-side logic.
  - [To Do] **[High]** Handle OAuth callback in Next.js and Supabase Auth.
  - [To Do] **[High]** Manage user session establishment and redirection.
  - [To Do] **[Medium]** Implement error handling and display for OAuth flow.
- [To Do] **[Critical]** Implement user logout functionality (FR 2.1.2).
  - [To Do] **[High]** Create "Logout" button/option in UI.
  - [To Do] **[High]** Implement Supabase `signOut()` logic.
  - [To Do] **[High]** Handle session invalidation and redirection.
- [To Do] **[High]** Set up Supabase Row Level Security (RLS) policies for user-specific data access for all relevant tables.

## 3. Project Management (Next.js, Supabase, Drizzle)

- [To Do] **[High]** Implement "Create New Project & Initiate Idea Generation Chat" (FR 2.2.1 - Backend: API Route).
  - [To Do] **[High]** Create Next.js API route for project creation.
  - [To Do] **[High]** Define `projects` table schema with Drizzle (including `app_idea_summary_filename`, `chat_transcript_filename`).
  - [To Do] **[High]** Implement Drizzle logic to insert new project record into Supabase.
  - [To Do] **[Medium]** Logic for generating unique filenames for stored documents.
- [To Do] **[High]** Implement "Create New Project & Initiate Idea Generation Chat" (FR 2.2.1 - Frontend: UI).
  - [To Do] **[High]** Create "Start New Project" button and initial chat interface.
  - [To Do] **[High]** Handle project naming and confirmation.
  - [To Do] **[High]** Redirect to project workspace and display app idea summary from file.
- [To Do] **[Medium]** Implement "View Project List" (FR 2.2.2 - Backend: API Route).
  - [To Do] **[Medium]** Create Next.js API route to fetch projects for a user.
  - [To Do] **[Medium]** Implement Drizzle logic to query `projects` table.
- [To Do] **[Medium]** Implement "View Project List" (FR 2.2.2 - Frontend: UI).
  - [To Do] **[Medium]** Create UI to display list of projects with names and dates.
  - [To Do] **[Medium]** Handle navigation to selected project workspace.
- [To Do] **[Low]** Implement "(Stretch Goal) Update Project Name" (FR 2.2.3 - Backend & Frontend).

## 4. AI Idea Generation Chat (Next.js, External LLM, Supabase Storage)

- [To Do] **[High]** Develop chat interface in Next.js (FR 2.2.1 related).
  - [To Do] **[High]** UI for displaying chat messages (user and AI).
  - [To Do] **[High]** Input field for user messages.
- [To Do] **[High]** Implement Next.js API route to handle chat interactions with LLM.
  - [To Do] **[High]** Send user messages to LLM.
  - [To Do] **[High]** Receive LLM responses.
- [To Do] **[High]** Implement logic to save chat transcript and AI-summarized app idea as files to Supabase Storage (FR 2.2.1 related).
  - [To Do] **[Medium]** API route logic to upload files to Supabase Storage.
  - [To Do] **[Medium]** Ensure RLS for Supabase Storage is configured for user-specific file access.

## 5. PRD Generation (Next.js, External LLM, Supabase Storage)

- [To Do] **[High]** Implement "Utilize AI-Generated App Idea File for PRD" (FR 2.3.1 - Frontend).
  - [To Do] **[High]** UI to display content of `app_idea_summary_filename`.
  - [To Do] **[Medium]** (Optional) UI for minor edits to the summary.
- [To Do] **[High]** Implement "Generate PRD from AI-Formulated App Idea File" (FR 2.3.2 - Backend: API Route).
  - [To Do] **[High]** API route to fetch app idea file content from Supabase Storage.
  - [To Do] **[High]** Send content to LLM for PRD generation.
  - [To Do] **[High]** Save generated PRD as a new file to Supabase Storage.
  - [To Do] **[High]** Update `projects` table (or `project_documents`) with `prd_filename`.
- [To Do] **[High]** Implement "Generate PRD from AI-Formulated App Idea File" (FR 2.3.2 - Frontend: UI).
  - [To Do] **[High]** "Generate PRD" button.
  - [To Do] **[High]** Loading state during generation.
  - [To Do] **[High]** Display content of newly generated PRD file.
  - [To Do] **[Medium]** Error handling from LLM/storage.

## 6. Prompt Tree Generation & Management (Next.js, Supabase, Drizzle, External LLM)

- [To Do] **[Critical]** Define `prompt_nodes` table schema with Drizzle (FR 2.4.1).
- [To Do] **[High]** Implement "Generate Initial Prompt Tree" (FR 2.4.1 - Backend: API Route).
  - [To Do] **[High]** API route to interact with LLM, providing project context (from app idea/PRD file).
  - [To Do] **[High]** Logic to parse LLM response and save structured tree data to `prompt_nodes` table using Drizzle.
- [To Do] **[High]** Implement "Generate Initial Prompt Tree" (FR 2.4.1 - Frontend: UI).
  - [To Do] **[High]** "Generate Prompt Tree" button.
  - [To Do] **[High]** Dynamically render tree structure (recursive components).
  - [To Do] **[Medium]** Loading state and error handling.
- [To Do] **[Medium]** Implement "Manually Add Prompt Node" (FR 2.4.2 - Backend & Frontend).
- [To Do] **[Medium]** Implement "Edit Prompt Node Content (Text & Code Snippet)" (FR 2.4.3 - Backend & Frontend).
- [To Do] **[Medium]** Implement "Delete Prompt Node" (FR 2.4.4 - Backend & Frontend).

## 7. Node Editing & Downstream Regeneration (Next.js, Supabase, External LLM)

- [To Do] **[High]** Implement "Automatic Downstream Prompt Regeneration" (FR 2.5.1 - Backend: API Route).
  - [To Do] **[High]** Logic to identify descendant nodes.
  - [To Do] **[High]** For each descendant, send context to LLM for regeneration.
  - [To Do] **[High]** Update `prompt_nodes` table with regenerated content via Drizzle.
- [To Do] **[High]** Implement "Automatic Downstream Prompt Regeneration" (FR 2.5.1 - Frontend: UI).
  - [To Do] **[High]** Dynamic UI updates for regenerated nodes.
  - [To Do] **[Medium]** Visual feedback (loading indicators) during regeneration.

## 8. Database Setup & ORM (Drizzle & Supabase)

- [To Do] **[High]** Finalize Drizzle schemas for all tables (`projects`, `prompt_nodes`). (Covered by other sections, but good to track overall schema readiness)
- [To Do] **[High]** Implement Drizzle migrations strategy.
- [To Do] **[Critical]** Implement and thoroughly test Supabase Row Level Security (RLS) policies for all tables and Supabase Storage.

## 9. Non-Functional Requirements Implementation

- [To Do] **[Medium]** Performance: Implement optimizations for Next.js page loads (NFR 3.1).
- [To Do] **[Medium]** Performance: Optimize UI interaction responsiveness (NFR 3.1).
- [To Do] **[Low]** Performance: Monitor and optimize LLM interaction & Supabase query times (NFR 3.1).
- [To Do] **[High]** Security: Ensure all client-server communication is HTTPS (usually default with hosting). (NFR 3.2)
- [To Do] **[High]** Security: Review and ensure correct usage of Supabase client/server SDKs. (NFR 3.2)
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

## 12. Testing

- [To Do] **[Medium]** Set up unit testing framework (e.g., Vitest or Jest) for Next.js components and utility functions.
- [To Do] **[Low]** Write unit tests for critical helper functions and API route logic.
- [To Do] **[Medium]** Set up integration testing for API routes interacting with Supabase/Drizzle.
- [To Do] **[Low]** (Post-MVP) Plan for E2E testing framework (e.g., Playwright or Cypress).
