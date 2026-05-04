# Shipping Solutions Template

## Overview

This is the **DP World Marine Services Shipping Solutions** template. All apps in the Shipping Solutions suite are created from this template and inherit its design system, agent skills, and documentation standards. The template and all its files are maintained in GitHub.

## Shipping Solutions Skills — Run on Every New App

When creating a new app from this template, the following skills are automatically available and MUST be followed:

### 1. DP World Branding (`.agents/skills/dpworld-branding/SKILL.md`)
**Always active.** Enforces brand compliance on every UI change:
- **Design philosophy**: Clean, smooth, airy. Whitespace over borders. When in doubt, add nothing.
- **Colors**: Only Lucky Point (#1E1450), Radical Red (#FF2261), Caribbean Green (#00E68C), Maverick (#F5F3F5), Cinder (#0F0F19). No other colors allowed.
- **Typography**: Pilat Demi for headings, Inter for everything else. Use inline `style={{ fontFamily: 'Pilat Demi' }}` for headings and `style={{ fontFamily: 'Inter, sans-serif' }}` for body text. Do NOT rely on Tailwind's `font-sans` class.
- **Dark mode**: Class-based with localStorage persistence.
- **Logo**: DP World logo in header, theme-aware light/dark variants (WhiteBG/BlackBG) via `useTheme()` React hook, responsive sizing `h-8 sm:h-9 lg:h-12`.
- **Header layout**: `[Logo] | [Title + Subtitle] | [Nav Items] ... [Theme Toggle] [Mobile Menu]`

### 2. App Documentation (`.agents/skills/app-documentation/SKILL.md`)
**Always active.** Ensures documentation stays current:
- Every app must have `documentation.md` following the standard template.
- Documentation must be updated after every feature addition, API change, or schema migration.

## Branding
Read `.agents/skills/dpworld-branding/SKILL.md` before making any UI changes. It defines the official DP World brand colors, Pilat/Inter typography, header layout, and design philosophy (clean, airy, minimal borders).

## Daily Sync from GitHub

Skills, design files, fonts, and logos are synced daily from the public GitHub repository:
**https://github.com/Unifeeder/Template-App-Use-for-new-apps**

The sync script (`scripts/sync-from-github.sh`) pulls the latest versions of all shared files from the `master` branch. It checks every 24 hours and only updates files that have changed.

- **Automatic**: Must be wired into dev startup (see below)
- **Manual**: `bash scripts/sync-from-github.sh --force`

**Important — wire sync into dev startup:** When creating a new frontend artifact, the agent MUST prepend the sync script to the artifact's dev command in its `package.json`. For example:
```json
"dev": "bash scripts/sync-from-github.sh; vite --host"
```
This ensures skills and assets stay up to date automatically every time the dev server starts.

Files synced from GitHub:
- `.agents/skills/dpworld-branding/SKILL.md` — Brand compliance + UX pattern rules
- `.agents/skills/app-documentation/SKILL.md` — Documentation standards
- `design.md` — Full design system specification
- `documentation.md` — Documentation template
- `src/pages/design-system.tsx` — Live `/designsystem` reference page (single self-contained file; auto-delivered to any artifact with `src/pages/`). Apps wire the route + header link once — see `migration-prompts.md` "Prompt v1.1". Apps may delete the file, route, and header link after launch; comment out the block in `scripts/sync-from-github.sh` to opt out of re-delivery.
- `public/assets/fonts/` — Pilat font files (Demi, Wide Book, Wide Heavy)
- `public/assets/logos/` — All DP World logo variants (8 PNG files)
- `public/assets/*.ai` — Gradient background files (6 .ai files)

## Design System Reference Page (`/designsystem`)

Every Shipping Solutions app exposes a `/designsystem` route backed by `src/pages/design-system.tsx`. It is the canonical, live specimen for the brand: colors, typography, spacing, radius, shadow, buttons, forms, cards, tables (with the canonical search-left/filter-right toolbar), navigation, feedback (loading/empty/error trio), overlays, charts, and UX patterns (cursor-pointer/hover/focus/active, color contrast, no grey-on-grey).

**Open it before designing or building any new screen.** Copy patterns from it instead of inventing. The page is single-file with a strict import contract — only `react` and `@/components/ui/*` (icons are inline SVG, toasts are local state) — so it's portable across every app the daily sync touches with zero extra dependencies. 17 sections: App Shell, Page Layouts, Color, Typography, Spacing, Radius, Shadow, Buttons, Forms, Cards, Tables, Filters & Sort, Navigation, Feedback, Overlays, Data Display, UX Patterns.

The **Filters & Sort** section (§12) is the canonical reference for toolbar anatomy: search always top-left, filter chips always top-right on the same row, sort via column headers only (never a toolbar dropdown), "Clear all" link after chips when active. All data views (tables, lists, grids, dashboards) must follow this layout. See the annotated blueprint, Do/Don't placement rules, filter chip states, sort column header specimens, and debounce rules on `/designsystem#filters`.

## New App Creation Checklist

When creating a new Shipping Solutions app, the agent MUST:

1. **Run the GitHub sync** (`bash scripts/sync-from-github.sh --force`) to get latest skills and assets
2. **Read the branding skill** before writing any code
3. **Read `design.md`** for the complete design system specification
4. **Apply the design system** — DP World brand colors, Pilat typography, HSL CSS variables
5. **Include the DP World logo** in the app header with theme-aware variants
6. **Implement dark mode** with class-based toggle and localStorage persistence
7. **Create `documentation.md`** following the standard template
8. **Audit the result** against the branding skill checklist before delivering

## Adding Shipping Solutions to an Existing App

For apps that were NOT created from this template, run this one-liner to pull in all skills, design files, fonts, logos, and the daily sync script:

```bash
curl -s https://raw.githubusercontent.com/Unifeeder/Template-App-Use-for-new-apps/master/scripts/setup-shipping-solutions.sh | bash
```

After running, follow the "Next steps" printed by the script to update `replit.md` and wire in the daily sync.

## Design System Reference

The complete design system is in `design.md`. Key files:

| File | Purpose |
|------|---------|
| `design.md` | Full DP World design system (colors, typography, spacing, components) |
| `documentation.md` | Documentation structure template |
| `public/assets/fonts/` | Pilat font files (Demi, Wide Book, Wide Heavy) |
| `public/assets/logos/` | DP World logo variants (8 PNG files) |
| `public/assets/*.ai` | DP World gradient background files (Master, Economic Zones, Ports & Terminals — CMYK and RGB) |

## Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js / Express 5 (TypeScript)
- **Architecture**: Unified full-stack — Express serves the React frontend and API routes from a single artifact
- **Database**: PostgreSQL (Replit-managed) with Drizzle ORM via `@workspace/db`
- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: Vite (frontend) + esbuild (server, CJS bundle)
- **UI Components**: shadcn/ui via shared `@workspace/ui` library (`lib/ui`)
- **Design System**: DP World Marine Services (Pilat fonts, brand colors, clean airy design)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── starter-app/        # Unified full-stack app
│       ├── src/             # React frontend source
│       │   ├── components/  # React components (header, theme-provider, ui/)
│       │   ├── pages/       # Page components
│       │   ├── hooks/       # Custom React hooks
│       │   ├── lib/         # Utilities
│       │   ├── assets/fonts/# Pilat font files (bundled by Vite)
│       │   ├── App.tsx      # Main app with routing
│       │   ├── main.tsx     # Entry point
│       │   └── index.css    # Global styles + Tailwind
│       ├── server/          # Express backend
│       │   ├── index.ts     # Server entry point
│       │   ├── app.ts       # Express app setup + static serving
│       │   └── routes/      # API route handlers
│       ├── public/          # Static assets (logos, favicon)
│       ├── index.html       # HTML entry point
│       ├── vite.config.ts   # Vite config (with /api proxy to Express)
│       └── package.json     # Unified dependencies
├── lib/                    # Shared libraries
│   ├── ui/                 # Shared UI component library (@workspace/ui)
│   │   └── src/
│   │       ├── components/ # All shadcn/ui primitives (button, card, dialog, etc.)
│   │       ├── hooks/      # use-mobile, use-toast
│   │       ├── lib/        # cn() utility
│   │       └── index.ts    # Barrel export
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
│       ├── app-documentation/  # Documentation maintenance
│       └── frontend-design/    # Production-grade frontend guidelines
├── design.md               # DP World design system specification
├── documentation.md         # Documentation template
├── public/
│   └── assets/
│       ├── fonts/           # Pilat font files (Demi, Wide Book, Wide Heavy)
│       └── logos/           # DP World logo files (8 PNG variants)
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Development

In development mode, two processes run concurrently:
1. **Vite dev server** on PORT (25071) — serves the React frontend with HMR
2. **Express server** on port 3001 — handles API routes

Vite proxies `/api` requests to Express, so the frontend can call API endpoints seamlessly.

```bash
pnpm --filter @workspace/starter-app run dev
```

## Production

In production, Express serves everything:
1. **Static files** from the Vite build output (`dist/public/`)
2. **API routes** under `/api`
3. **SPA fallback** — all non-API, non-static requests return `index.html`

Build: `pnpm --filter @workspace/starter-app run build`
Start: `pnpm --filter @workspace/starter-app run start`

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — only emit `.d.ts` files; actual JS bundling by esbuild/tsx/vite
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in `references`

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/starter-app` (`@workspace/starter-app`)

Unified full-stack app. React + Vite frontend with Express API backend in a single package. In development, Vite serves the frontend and proxies `/api` to Express. In production, Express serves both the static frontend build and API routes. PostgreSQL database is wired via `@workspace/db` dependency — import `{ db }` in server routes to query.

### `lib/ui` (`@workspace/ui`)

Shared UI component library. Contains all shadcn/ui primitives, hooks (`use-mobile`, `use-toast`), theme-provider, and the `cn()` utility. All Radix UI and component dependencies live here. Apps depend on `@workspace/ui` and re-export from it — changing a component or color here propagates to every app automatically. The barrel export is `lib/ui/src/index.ts`. Note: the Sonner toaster is exported as `SonnerToaster` (not `Toaster`) to avoid conflicting with the toast-based `Toaster` component.

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
