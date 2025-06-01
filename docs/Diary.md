# vibe-context.io - Development Diary

# 2025-01-06

## Observations

- Initialized project documentation based on user request.
- Created `project.mdc` outlining the overall vibe-context.io application, its purpose, and high-level features based on the AI-powered app development assistant concept.
- Created `tech-requirements.mdc` detailing functional and non-functional requirements for the MVP. This includes:
  - User authentication via OAuth2 (Supabase Auth).
  - Project creation initiated by an AI chat to formulate the app idea, with outputs (summary, transcript, PRD) stored as files referenced in the Supabase database (`projects` table).
  - PRD generation from the AI-formulated app idea.
  - Hierarchical prompt tree generation and management (CRUD operations on nodes).
  - Automatic downstream prompt regeneration upon parent node edits.
  - Core technologies specified: Next.js, TypeScript, Supabase (Auth, DB, Storage), Drizzle ORM.
- Created `tech-stack.mdc` recommending and justifying the technology choices (Next.js, TypeScript, TanStack Query, shadcn/ui, Supabase, Drizzle) and outlining the initial database model for `projects` and `prompt_nodes` tables, including considerations for Supabase Storage.
- Created `Tasktracker.md` with an initial list of development tasks derived from the requirements documents, categorized and prioritized.
- The core concept revolves around an AI assistant that helps users first formulate an app idea through a chat, then generates a PRD and a tree of prompt-driven development tasks. These artifacts are stored as files, and the system allows for iterative refinement.

## Problems

- No specific problems encountered during the initial documentation phase. The main challenge was synthesizing the various requirements and project descriptions into structured documents.

## Solutions

- Systematically went through the user's requests and existing project context to extract key information for each document.
- Used the provided templates and examples to structure the `.mdc` files and `Tasktracker.md`.
- Iteratively refined the functional requirements to ensure clarity on how features like AI chat for idea generation, file-based storage of artifacts, and prompt tree management would work together.

---

# 2025-06-01

## Observations

- Codebase analysis performed based on current file structure.
- Confirmed completion of initial Next.js project setup with TypeScript, pnpm workspaces, Turbo, ESLint, and Prettier configuration.
- Confirmed definition of basic project structure within `apps/web/src` (components, lib, app router).
- Verified implementation of basic layout components (`sidebar.tsx`, `dashboard-layout.tsx`, `topbar.tsx`) located in `apps/web/src/components/layout/`.
- Updated `Tasktracker.md` to reflect these completed items in Section 1: Project Setup & Core Infrastructure.
- As per user feedback, Supabase project setup, Drizzle ORM integration, and specific logic for User Authentication, Project Management, and AI Idea Generation features have not yet been implemented. Corresponding tasks remain in "To Do" status.
- Discussed future consideration of integrating VibeContext with a Model Context Protocol (MCP) server. This would allow VibeContext to connect with other AI tools like Windsurf or Cursor, enhancing its context-sharing capabilities.
- Researched MCP: It's an open protocol for standardizing how applications provide context to LLMs, acting like a universal connector.
- Added this as a "Future consideration" in `docs/tech-requirements.mdc`.
- Decided to use OpenRouter for accessing multiple LLMs. Researched OpenRouter and its benefits (unified API, model variety, OpenAI compatibility).
- Updated `docs/tech-stack.mdc` to reflect OpenRouter as the chosen solution for LLM access.
- Updated `docs/tech-requirements.mdc` to mention OpenRouter in relevant dependency and risk sections.
- Refined database schema for prompt management: Introduced a new `prompts` table to store reusable prompt content. The `prompt_nodes` table will now link to this `prompts` table via a `prompt_id` foreign key, instead of storing `prompt_text` and `code_snippet` directly. This enables prompt reuse.
- Updated `docs/tech-stack.mdc` with the new `prompts` table schema and modified `prompt_nodes` schema.
- Updated `docs/tech-requirements.mdc` functional requirements (FR 2.4.1, 2.4.3, 2.4.4, 2.5.1) to align with this new prompt management strategy, including how prompts are created, edited (with a new prompt entry created on edit to preserve shared prompts), and how regeneration logic is affected.
- Further refined database schema and related requirements:
  - Removed `codeSnippet` field from `prompts` table as Markdown in `prompt_markdown_filename` can handle code.
  - Changed `appIdeaSummaryFilename` in `projects` table to `appIdeaSummary_text` (direct text storage).
  - Changed `promptText` in `prompts` table to `prompt_markdown_filename` (link to Markdown file in Supabase Storage).
- Updated `docs/tech-stack.mdc` and `docs/tech-requirements.mdc` to reflect these three changes.

## Problems

- No direct access to git commit history, so progress assessment is based on the current snapshot of the codebase.
- Initial difficulty accessing project documentation files, but this was resolved.

## Solutions

- Relied on user feedback and directory/file listings to infer the status of development tasks.
- Updated documentation iteratively based on confirmed information.
- Verified file paths and re-attempted file access, which was successful.
- Updated `tech-requirements.mdc` with the new MCP feature idea.
- Updated `tech-stack.mdc` and `tech-requirements.mdc` to incorporate OpenRouter.
- Updated database schemas in `tech-stack.mdc` and related functional requirements in `tech-requirements.mdc` for the new prompt reuse feature.
- Updated `docs/tech-stack.mdc` and `docs/tech-requirements.mdc` again for the `codeSnippet` removal, `appIdeaSummary_text` change, and `prompt_markdown_filename` change.

# 2025-06-01 (Continued)

## Observations

- Acted as a Senior QA Tester to review existing technical documentation (`tech-requirements.mdc`, `tech-stack.mdc`).
- Generated 15 critical QA-style questions focusing on potential ambiguities, missing details, edge cases, and failure points across UI/UX, backend, APIs, permissions, state management, and integrations.
- Stored these questions in a new file: `docs/quality-assurance-questions.md`.

## Problems

- No new problems encountered.

## Solutions

- Created `docs/quality-assurance-questions.md` and populated it with detailed questions for the product and engineering team.

# 2025-06-01 (Continued)

## Observations

- Decided to use Polar.sh for handling payments and subscriptions.
- Researched Polar.sh: It acts as a Merchant of Record, simplifying tax compliance, and offers features for SaaS billing, subscriptions, and entitlements, with Next.js integration.
- Updated `docs/tech-stack.mdc` to include Polar.sh in the technology stack.
- Updated `docs/tech-requirements.mdc` by adding:
  - New Functional Requirements (FR 2.6) for subscription tiers, payment processing via Polar.sh, subscription management, and feature entitlements.
  - Updates to Non-Functional Requirements (NFR 3.2 Security) regarding payment data handling.
  - Added Polar.sh as a dependency (DEP 4.3) and updated Node.js ecosystem to DEP 4.5.
  - Added a new risk (RISK 6.7) related to payment integration and compliance.

## Problems

- No new problems encountered.

## Solutions

- Integrated Polar.sh into the project documentation, outlining its role and impact on requirements and stack.

# 2025-06-01 (Continued)

## Observations

- Decided to use LangChain.js (TypeScript version) for LLM interaction orchestration, including prompt chaining, memory management for AI chat, and managing calls to OpenRouter.
- Researched LangChain.js: It provides modules for prompts, chains, agents, memory, and integrates with the broader JavaScript ecosystem. LCEL (LangChain Expression Language) will be beneficial for composing AI workflows.
- Updated `docs/tech-stack.mdc` to include LangChain.js under a new "AI & LLM Orchestration" category.
- Updated `docs/tech-requirements.mdc`:
  - Modified relevant Functional Requirements (FR 2.2.1, FR 2.3, FR 2.4.1, FR 2.5.1) to specify LangChain.js involvement in orchestrating LLM calls.
  - Added LangChain.js as a key dependency (DEP 4.2), renumbering subsequent dependencies.
  - Updated risk assessment (RISK 6.3, RISK 6.5) to include LangChain.js.

## Problems

- No new problems encountered.

## Solutions

- Integrated LangChain.js into the project documentation, clarifying its role in the architecture.
