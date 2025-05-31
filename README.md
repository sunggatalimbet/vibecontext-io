# VibeContext Monorepo

This is a multi-package workspace powered by [Turborepo](https://turborepo.com/).

## Project Structure

```text
├── apps/
│   └── web/              # Next.js web application
│       ├── src/          # Development source code
│       │   ├── app/      # Next.js App Router pages
│       │   ├── components/ # React components
│       │   ├── hooks/    # Custom React hooks
│       │   ├── lib/      # Utility libraries
│       │   └── out/      # Build output (generated)
│       ├── .eslintrc.json     # ESLint configuration
│       ├── components.json    # shadcn/ui configuration
│       ├── next-env.d.ts      # Next.js type definitions
│       ├── next.config.js     # Next.js configuration
│       ├── package.json       # Package dependencies
│       ├── postcss.config.js  # PostCSS configuration
│       └── tsconfig.json      # TypeScript configuration
├── packages/         # Shared packages (future)
├── .prettierrc       # Prettier configuration (root level)
├── .prettierignore   # Prettier ignore patterns (root level)
├── .turborc          # Turborepo cache configuration
├── turbo.json        # Turborepo task configuration
├── pnpm-workspace.yaml # pnpm workspace configuration
└── package.json      # Root package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Install turbo globally (optional but recommended)
pnpm add turbo --global
```

### Development

```bash
# Start development server for all apps
pnpm dev

# Start development server for specific app
turbo dev --filter=@repo/web
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

# Format all packages (using root-level prettier config)
pnpm format

# Check formatting
pnpm format:check

# Type checking
pnpm check-types
```

### Caching

Turborepo automatically caches task outputs for faster subsequent builds. The cache is stored in `.turbo/` at the root level.

```bash
# Clear cache if needed
rm -rf .turbo
```

## Architecture

### Monorepo Benefits

- **Shared Dependencies**: All packages share the same `node_modules` at the root
- **Task Caching**: Turborepo caches build outputs for faster rebuilds
- **Type Safety**: Shared TypeScript configurations and type checking
- **Code Quality**: Shared linting and formatting rules
- **Easy Development**: Run all apps with a single command

### File Organization

- **Development Code**: All source code is organized under `src/` directories
- **Configuration**: Configuration files are kept at the appropriate package level
- **Global Config**: Prettier and other global configs are at the root level
- **Build Outputs**: Generated files are isolated within `src/out/` and `.next/`

For more information, see the [Turborepo documentation](https://turborepo.com/docs).

## Troubleshooting Caching

If you're experiencing cache misses when you expect cache hits, here are common solutions:

### 1. Uncommitted Changes

**Problem**: Files tracked by git but not committed cause cache misses.
**Solution**: Commit your changes or add files to `.gitignore`.

```bash
git status  # Check for uncommitted changes
git add . && git commit -m "your message"
```

### 2. Build Artifacts in Git

**Problem**: Build outputs and `node_modules` tracked by git affect cache hashing.
**Solution**: Remove them from git tracking and update `.gitignore`.

```bash
git rm -r --cached apps/*/node_modules apps/*/.next apps/*/src/out
git add .gitignore && git commit -m "fix: remove build artifacts from git tracking"
```

### 3. Non-Deterministic Tasks

**Problem**: Tasks that produce different outputs each time (like Next.js builds) cause cache misses.
**Solution**: This is expected behavior for build tasks. Focus on deterministic tasks like lint, type-check, and test.

### 4. Debug Cache Issues

**Problem**: Need to understand why cache is missing.
**Solution**: Use dry run mode to analyze what would be cached.

```bash
turbo build --dry=json  # See what would be executed and cached
turbo build --summarize # Get detailed cache hit/miss information
```
