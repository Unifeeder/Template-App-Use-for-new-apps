# [App Name] — Documentation

> Part of the DP World Marine Services Shipping Solutions Suite

## Overview

[Brief description of what this app does and its role in the Shipping Solutions ecosystem.]

## Architecture

### Tech Stack

- **Frontend**: React + Vite + TypeScript
- **UI Components**: shadcn/ui with DP World design system
- **Backend**: Express 5 + TypeScript
- **Database**: PostgreSQL + Drizzle ORM
- **API Contract**: OpenAPI 3.1 + Orval codegen
- **Package Manager**: pnpm (monorepo)

### Project Structure

```text
artifacts/
├── [app-slug]/           # Frontend application
│   └── src/
│       ├── components/   # UI components
│       ├── pages/        # Route pages
│       ├── hooks/        # Custom hooks
│       └── lib/          # Utilities
├── api-server/           # Shared backend
│   └── src/
│       ├── routes/       # API route handlers
│       └── middlewares/  # Express middleware
lib/
├── api-spec/             # OpenAPI specification
├── api-client-react/     # Generated React Query hooks
├── api-zod/              # Generated Zod schemas
└── db/                   # Database schema & connection
```

## Features

### [Feature 1]
[Description of feature, how it works, key components involved.]

### [Feature 2]
[Description of feature, how it works, key components involved.]

## API Endpoints

| Method | Path            | Description           |
|--------|----------------|-----------------------|
| GET    | /api/healthz   | Health check          |
| [...]  | [...]          | [...]                 |

## Database Schema

[List tables, their columns, and relationships.]

## Design System Compliance

This app follows the DP World Marine Services design system:

- **Colors**: Lucky Point (#1E1450), Radical Red (#FF2261), Caribbean Green (#00E68C), Maverick (#F5F3F5), Cinder (#0F0F19)
- **Typography**: Pilat font family (Wide Heavy for h1/h2, Demi for h3/h4, Light for body)
- **Components**: shadcn/ui primitives with brand theming
- **Dark Mode**: Class-based with localStorage persistence
- **Logo**: Theme-aware DP World logo in header

## Environment Variables

| Variable       | Description                  | Required |
|---------------|------------------------------|----------|
| DATABASE_URL  | PostgreSQL connection string | Yes      |
| PORT          | Server port                  | Yes      |

## Development

```bash
# Install dependencies
pnpm install

# Start dev server (auto-syncs skills from hub)
pnpm run dev

# Run codegen after OpenAPI changes
pnpm --filter @workspace/api-spec run codegen

# Push database schema changes
pnpm --filter @workspace/db run push
```

## Deployment

Published via Replit deployments. The build process:
1. Runs `pnpm run build` (typechecks + bundles)
2. Serves static frontend + Express API server

## Skill Sync

This app syncs design system and agent skills from the DP World Shipping Solutions Hub. The sync runs automatically on `pnpm run dev` with a 48-hour check interval. To force sync:

```bash
sh scripts/sync-skills.sh --force
```

## Changelog

| Date       | Change                    | Author |
|-----------|---------------------------|--------|
| YYYY-MM-DD | Initial creation          | [name] |
