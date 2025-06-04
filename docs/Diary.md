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
