# DP World Shipping Solutions Template — Documentation

> Part of the DP World Marine Services Shipping Solutions Suite

## Overview

The Shipping Solutions Template is a standardized starting point for building DP World Marine Services applications. It provides brand-compliant design assets, agent skills for automated brand enforcement, and a daily sync mechanism to keep child apps aligned with the latest standards.

- Enforces DP World brand compliance (colors, typography, logos) across all child apps
- Provides a complete design system with Pilat fonts, logo variants, and gradient assets
- Automates daily syncing of skills, design files, and assets from a central GitHub repository
- Includes agent skills that guide AI assistants to follow DP World standards
- Standardizes documentation structure across the Shipping Solutions portfolio

## Features

### Brand Enforcement
- DP World branding skill (`.agents/skills/dpworld-branding/SKILL.md`) enforces colors, typography, and logo usage
- Design system specification (`design.md`) with component patterns, spacing, and dark mode
- Pre-configured Pilat font files (Light, Demi, Wide Book, Wide Heavy)

### Documentation Standards
- App documentation skill (`.agents/skills/app-documentation/SKILL.md`) ensures consistent documentation
- Template `documentation.md` with 7 standardized sections
- `/docs` route rendering specification

### Asset Management
- 8 DP World logo variants (color, black, white — CMYK and RGB)
- 6 gradient background files (Master, Economic Zones, Ports & Terminals — CMYK and RGB)
- Daily GitHub sync keeps assets current across all child apps

### GitHub Sync
- `scripts/sync-from-github.sh` — daily sync from central repository
- `scripts/setup-shipping-solutions.sh` — one-time onboarding for existing apps
- 24-hour cooldown with `--force` override

## Data Model

_This template does not define application data models. Each child app defines its own schema using Drizzle ORM with PostgreSQL._

## Database

**Engine**: PostgreSQL (provided by Replit)
**ORM**: Drizzle ORM
**Migrations**: drizzle-kit push

_No tables are defined in the template. Child apps create their own schemas in `lib/db/`._

## Data Sources & Inputs

### File-Based Inputs

_No file-based data inputs in the template itself. Child apps may add Excel, CSV, or JSON imports as needed._

### API-Sourced Data

| Source | Endpoint / Topic | Protocol | Data Format | Refresh Cadence | Direction |
|--------|-----------------|----------|-------------|-----------------|-----------|
| GitHub (raw content) | `https://raw.githubusercontent.com/Unifeeder/Template-App-Use-for-new-apps/master/...` | HTTPS GET | Binary (fonts, images, AI files) and text (Markdown) | Daily (24h interval, configurable via `--force`) | Inbound |

### User-Uploaded Data

_No user uploads in the template. Child apps may add upload handling as needed._

### Static / Seed Data

| Dataset | Format | Location | Description | How to Update |
|---------|--------|----------|-------------|---------------|
| Pilat font files | Binary (TTF) | `public/assets/fonts/` | PilatLight, PilatDemi, PilatWideBook, PilatWideHeavy | Auto-synced daily via `scripts/sync-from-github.sh` |
| DP World logos | Binary (PNG) | `public/assets/logos/` | 8 logo variants — color, black, white in CMYK and RGB | Auto-synced daily via `scripts/sync-from-github.sh` |
| Gradient backgrounds | Binary (AI) | `public/assets/` | 6 Illustrator gradient files — Master, Economic Zones, Ports & Terminals | Auto-synced daily via `scripts/sync-from-github.sh` |
| Design system spec | Markdown | `design.md` | Complete DP World design system — colors, typography, spacing, components | Auto-synced daily via `scripts/sync-from-github.sh` |
| Documentation template | Markdown | `documentation.md` | Standardized 7-section documentation structure | Auto-synced daily via `scripts/sync-from-github.sh` |
| Branding skill | Markdown | `.agents/skills/dpworld-branding/SKILL.md` | Agent instructions for brand compliance | Auto-synced daily via `scripts/sync-from-github.sh` |
| Documentation skill | Markdown | `.agents/skills/app-documentation/SKILL.md` | Agent instructions for documentation maintenance | Auto-synced daily via `scripts/sync-from-github.sh` |
| OpenAPI specification | YAML | `lib/api-spec/openapi.yaml` | OpenAPI 3.1 contract defining all API endpoints; drives Orval codegen for React Query hooks (`lib/api-client-react/`) and Zod schemas (`lib/api-zod/`) | Edit spec, then run `pnpm --filter @workspace/api-spec run codegen` |

## Integrations

### GitHub (Unifeeder/Template-App-Use-for-new-apps)
- **Purpose**: Central repository for brand assets, design system, and agent skills — keeps all child apps aligned with the latest standards
- **Version / Tier**: GitHub public repository (no auth required)
- **Protocol**: HTTPS GET (raw content API)
- **Base URL**: `https://raw.githubusercontent.com/Unifeeder/Template-App-Use-for-new-apps/master`
- **Auth**: None (public repo)
- **Env vars**: None required
- **Data flow**: Inbound
  - Downloads 22 files: 2 agent skills, 2 design docs, 4 fonts, 8 logos, 6 gradients
  - Compares each file with local version before overwriting (only updates changed files)
- **Key endpoints**:
  - `GET /{path}` — fetch individual file content (fonts, images, markdown)
- **Error handling**: Files that fail to download (non-200 HTTP) are skipped and counted; sync continues with remaining files; failure count reported at end
- **Rate limits**: GitHub raw content has no formal rate limit for public repos; script uses `--max-time 15` per file to avoid hangs

## Roadmap

### Planned
_Items added by the team — update this section as priorities change._

### Ideas
- Add a health check endpoint to verify all synced assets are present and up-to-date
- Create a CLI tool to scaffold new child apps from the template with interactive prompts
- Add automated validation that design.md changes don't break existing child app styles
- Build a dashboard showing sync status across all child apps in the portfolio
- Add PNG/SVG exports of gradient files for web use (AI files require Illustrator)
