# Vibecontext.io

This Next.js 15.3.3 project is configured with comprehensive ESLint and Prettier setup following best practices.

## 🚀 Tech Stack

- **Next.js 15.3.3** - Latest stable version with React 19
- **React 19** - Latest stable version
- **TypeScript 5.2.2** - Type safety
- **Tailwind CSS 4.1.8** - Styling
- **Radix UI** - Component primitives
- **ESLint 9** - Code linting
- **Prettier 3.5.3** - Code formatting

## 📋 Development Tools

### ESLint Configuration

The project uses a comprehensive ESLint setup located in `.eslintrc.json`:

- **next/core-web-vitals** - Next.js recommended rules
- **prettier** - Integration with Prettier
- Custom rules for code quality and consistency

### Prettier Configuration

Prettier is configured in `.prettierrc` with:

- **Semi**: `false` - No semicolons
- **Single Quotes**: `true` - Prefer single quotes
- **Tab Width**: `2` - 2-space indentation
- **Trailing Comma**: `es5` - ES5-compatible trailing commas
- **Print Width**: `80` - 80 character line length
- **Arrow Parens**: `avoid` - Avoid parentheses when possible

### Prettier Plugins

1. **prettier-plugin-tailwindcss** - Automatic Tailwind class sorting
2. **@ianvs/prettier-plugin-sort-imports** - Automatic import organization

#### Import Order

Imports are automatically sorted in this order:

1. React imports
2. Next.js imports
3. Third-party modules
4. Internal imports with `@/` alias
5. Relative imports

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start development server

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting without changes
pnpm type-check       # Run TypeScript type checking
pnpm check-all        # Run all checks (types, lint, format)
```

## 🛠️ Editor Setup

### VS Code

The project includes VS Code settings in `.vscode/settings.json`:

- **Format on Save** - Automatic formatting with Prettier
- **ESLint Auto-fix** - Fix linting issues on save
- **Import Organization** - Disabled in favor of Prettier plugin
- **Rulers at 80 chars** - Visual line length guide

### Recommended Extensions

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense

## 🚦 Configuration Details

### Key Features

- ✅ **Next.js 15** with React 19 support
- ✅ **ESLint 9** compatibility
- ✅ **Automatic code formatting** on save
- ✅ **Import sorting** with logical grouping
- ✅ **Tailwind class sorting**
- ✅ **TypeScript integration**
- ✅ **Consistent code style** across the project

### File Structure

```
.
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Files to ignore in formatting
├── .vscode/
│   └── settings.json       # VS Code workspace settings
├── components/             # React components
├── app/                    # Next.js app directory
├── lib/                    # Utility functions
└── public/                 # Static assets
```

## 🔧 Customization

### Adding New ESLint Rules

Edit `.eslintrc.json` to add custom rules:

```json
{
  "rules": {
    "your-custom-rule": "error"
  }
}
```

### Modifying Prettier Settings

Edit `.prettierrc` to change formatting preferences:

```json
{
  "printWidth": 100,
  "tabWidth": 4
}
```

### Ignoring Files

Add patterns to `.prettierignore` to exclude files from formatting:

```
build/
*.generated.ts
```

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start development server**:

   ```bash
   pnpm dev
   ```

3. **Run code quality checks**:
   ```bash
   pnpm check-all
   ```

The setup ensures consistent, high-quality code across your entire project!
