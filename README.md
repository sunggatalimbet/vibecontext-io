# VibeContext Monorepo

This is a multi-package workspace powered by [Turborepo](https://turborepo.com/).

## Project Structure

```
├── apps/
│   └── web/          # Next.js web application
├── packages/         # Shared packages (future)
├── turbo.json        # Turborepo configuration
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

### Other Commands

```bash
# Type checking
pnpm check-types

# Linting
pnpm lint

# Formatting
pnpm format
pnpm format:check
```

## Turborepo Features

- **Caching**: Turborepo caches task outputs to speed up subsequent runs
- **Parallel Execution**: Tasks run in parallel when possible
- **Dependency Graph**: Tasks run in the correct order based on dependencies
- **Incremental Builds**: Only rebuild what has changed

## Adding New Packages

To add a new package to the workspace:

1. Create a new directory in `apps/` or `packages/`
2. Add a `package.json` with a name like `@repo/package-name`
3. Update the workspace configuration if needed
4. Add any new tasks to `turbo.json`

## Remote Caching

To enable remote caching for your team:

1. Sign up for [Vercel](https://vercel.com)
2. Install the Vercel CLI: `pnpm add -g vercel`
3. Link your repository: `vercel link`
4. Enable remote caching: `turbo login` and `turbo link`

For more information, see the [Turborepo documentation](https://turborepo.com/docs).
