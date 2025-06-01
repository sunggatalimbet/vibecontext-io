# vibe-context.io - QA Review Questions

This document contains critical questions raised during a QA review of the vibe-context.io technical specifications (`tech-requirements.mdc` and `tech-stack.mdc`).

## User Authentication & Session Management (FR 2.1, NFR 3.2)

1.  **OAuth Token Expiry/Revocation:** What is the behavior if an OAuth token is revoked or expires while the user has an active session in VibeContext? Is the user gracefully logged out, or do they encounter errors on subsequent API calls?
2.  **Session Management Across Devices:** FR 2.1 mentions session establishment. How are sessions handled if a user logs in on a new device? Does it invalidate the session on the previous device, or are multiple active sessions allowed? What are the security implications?
3.  **Failed OAuth Flow:** FR 2.1.1 mentions "Error messages...are handled and clearly displayed." What specific error scenarios from OAuth providers are anticipated (e.g., user denies permission, provider outage, account locked), and how will these distinct scenarios be communicated to the user in the UI?

## Project & File Management (FR 2.2, FR 2.3, FR 2.4, Tech Stack DB Model & Storage)

4.  **File Upload/Storage Failures (Supabase Storage):**
    - For `chatTranscriptFilename` (FR 2.2.1), `prdFilename` (FR 2.3.2), and `prompt_markdown_filename` (FR 2.4.1): What happens if the Supabase Storage upload fails (e.g., network error, storage quota exceeded, RLS policy blocks)?
    - Does the corresponding database record (e.g., in `projects` or `prompts` table) get created with a null/empty filename? Is there a retry mechanism? How is the user informed?
    - What are the size limits or type restrictions for these Markdown files (chat transcript, PRD, prompt content)? How are these enforced and communicated?
5.  **Orphaned Files/Data:** If a database transaction fails after a file has been uploaded to Supabase Storage (e.g., creating a `prompts` record fails after `prompt_markdown_filename` is uploaded), what is the cleanup mechanism for the orphaned file in storage?
6.  **Data Integrity for `appIdeaSummary_text`:** FR 2.2.1 states `appIdeaSummary_text` is stored directly. What is the maximum length for this text? Is there client-side or server-side validation to prevent overly large inputs that could impact database performance or UI display?
7.  **Uniqueness of Filenames:** FR 2.2.1 mentions "uniquely named files." What is the exact strategy for ensuring filename uniqueness in Supabase Storage (e.g., `<type>-<projectID>-<timestamp>.md`, `<type>-<uuid>.md`)? What happens if, however unlikely, a filename collision occurs during generation?

## Prompt Tree & Regeneration (FR 2.4, FR 2.5)

8.  **LLM/OpenRouter API Failures & Timeouts:**
    - During initial prompt tree generation (FR 2.4.1) or downstream regeneration (FR 2.5.1), what is the system's behavior if the OpenRouter API or the underlying LLM API call fails, times out, or returns malformed/empty data?
    - Is the entire generation/regeneration process aborted? Are partial results saved or discarded? How is the user informed of partial success or complete failure? (NFR 3.1 mentions 15-45s for generation, what if it exceeds this?)
9.  **Concurrency in Regeneration (FR 2.5.1):** If a user edits a parent node, triggering regeneration, and then quickly edits another (or the same) parent node before the first regeneration completes, how are these concurrent regeneration requests handled? Is there a queue? Is the latest change prioritized, or are changes potentially lost/overwritten?
10. **Rollback/Undo for Regeneration:** FR 2.5.1 describes automatic downstream regeneration. Is there any mechanism for a user to undo a regeneration if the results are undesirable? Or is the only path forward to re-edit the parent and trigger another regeneration?
11. **Context Length Limits for LLM:** When regenerating downstream prompts (FR 2.5.1), the context includes the "updated path from the root." How is the total context length managed if the tree is very deep or prompts are verbose? What happens if the context exceeds the LLM's maximum token limit? Is the context truncated? How does this affect regeneration quality?
12. **Editing a Shared Prompt (FR 2.4.3):** The spec says, "editing a prompt linked to a node should ideally result in a _new_ Markdown file and a _new_ prompt entry being created if the original prompt (file) is shared." How is "shared" determined? If Prompt A is used by Node X and Node Y, and the user edits it via Node X, Node X gets a new Prompt B. Does Node Y still point to Prompt A, or is there an option/flow for the user to propagate this change to other nodes using Prompt A?

## General & Non-Functional

13. **State Management during Long Operations:** For operations like PRD generation or prompt tree regeneration (which can take up to 45s or 20s respectively as per NFR 3.1), what happens if the user navigates away from the page, closes the tab, or if their internet connection drops mid-operation? Is the operation state persisted? Can they resume or see the result later? (TanStack Query is mentioned for server state, how does it handle this?)
14. **Input Validation (NFR 3.2):** NFR 3.2 mentions "Basic input sanitization on Next.js API routes for data sent to LLMs." Could this be more specific? What types of sanitization (e.g., for prompt injection, PII scrubbing if applicable for future features)? Is there also client-side validation for inputs like project names, prompt titles, or the content of `appIdeaSummary_text`?
15. **RLS Policy Testing (RISK 6.6):** RISK 6.6 mentions testing RLS. How will RLS policies for Supabase Storage (ensuring users only access files associated with their projects, as per `tech-stack.mdc`) be specifically tested, especially concerning the various file types (`chat_transcript_filename`, `prd_filename`, `prompt_markdown_filename`) and their linkage to project/user ownership?
