# Shipping Solutions Template

## Overview

This is the **DP World Marine Services Shipping Solutions** template. All apps in the Shipping Solutions suite are created from this template and inherit its design system, agent skills, and documentation standards. The template and all its files are maintained in GitHub.

## Shipping Solutions Skills — Run on Every New App

When creating a new app from this template, the following skills are automatically available and MUST be followed:

### 1. DP World Branding (`.agents/skills/dpworld-branding/SKILL.md`)
**Always active.** Enforces brand compliance on every UI change:
- **Colors**: Only Lucky Point (#1E1450), Radical Red (#FF2261), Caribbean Green (#00E68C), Maverick (#F5F3F5), Cinder (#0F0F19). No other colors allowed.
- **Typography**: Pilat font family only — Wide Heavy for h1/h2, Demi for h3/h4, Light for body.
- **Dark mode**: Class-based with localStorage persistence.
- **Logo**: DP World logo in header, theme-aware light/dark variants.
- **Components**: shadcn/ui primitives with `data-testid` on all elements.
- **Layout**: Mobile-first, 4px spacing rhythm, 1280px max container.

### 2. App Documentation (`.agents/skills/app-documentation/SKILL.md`)
**Always active.** Ensures documentation stays current:
- Every app must have `documentation.md` following the standard template.
- Every app must have a `/docs` route rendering documentation as styled HTML.
- Documentation must be updated after every feature addition, API change, or schema migration.

## Daily Sync from GitHub

Skills, design files, fonts, and logos are synced daily from the public GitHub repository:
**https://github.com/Unifeeder/Template-App-Use-for-new-apps**

The sync script (`scripts/sync-from-github.sh`) pulls the latest versions of all shared files from the `master` branch. It checks every 24 hours and only updates files that have changed.

- **Automatic**: Runs on dev startup (prepended to the dev command)
- **Manual**: `bash scripts/sync-from-github.sh --force`

Files synced from GitHub:
- `.agents/skills/dpworld-branding/SKILL.md` — Brand compliance rules
- `.agents/skills/app-documentation/SKILL.md` — Documentation standards
- `design.md` — Full design system specification
- `documentation.md` — Documentation template
- `public/assets/fonts/` — All 4 Pilat font files
- `attached_assets/` — All DP World logo variants

## New App Creation Checklist

When creating a new Shipping Solutions app, the agent MUST:

1. **Run the GitHub sync** (`bash scripts/sync-from-github.sh --force`) to get latest skills and assets
2. **Read both skills** listed above before writing any code
3. **Read `design.md`** for the complete design system specification
4. **Read `documentation.md`** for the documentation template
5. **Apply the design system** — DP World brand colors, Pilat typography, HSL CSS variables
6. **Include the DP World logo** in the app header with theme-aware variants
7. **Implement dark mode** with class-based toggle and localStorage persistence
8. **Add `data-testid`** attributes to all interactive and display elements
9. **Create `documentation.md`** following the standard template
10. **Create a `/docs` route** rendering documentation as a styled page
11. **Audit the result** against the branding skill checklist before delivering

## Design System Reference

The complete design system is in `design.md`. Key files:

| File | Purpose |
|------|---------|
| `design.md` | Full DP World design system (colors, typography, spacing, components) |
| `documentation.md` | Documentation structure template |
| `public/assets/fonts/` | Pilat font files (Light, Demi, Wide Book, Wide Heavy) |
| `public/assets/logos/` | DP World logo variants (all formats) |
| `attached_assets/DP_World_Logo_*` | DP World logo variants for `@assets/` imports |

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **UI Components**: shadcn/ui
- **Design System**: DP World Marine Services (Pilat fonts, brand colors)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
│   ├── sync-from-github.sh # Daily sync from GitHub template repo
│   └── src/                # TypeScript utility scripts
├── .agents/                # Agent skills (DP World standards)
│   └── skills/
│       ├── dpworld-branding/   # Brand compliance enforcement
│       └── app-documentation/  # Documentation maintenance
├── design.md               # DP World design system specification
├── documentation.md         # Documentation template
├── public/
│   └── assets/
│       ├── fonts/           # Pilat font files
│       └── logos/           # DP World logo files
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — only emit `.d.ts` files; actual JS bundling by esbuild/tsx/vite
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in `references`

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes in `src/routes/`, uses `@workspace/api-zod` for validation and `@workspace/db` for persistence.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec and Orval config. Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec.

### `scripts` (`@workspace/scripts`)

Utility scripts package.
