---
name: app-documentation
description: Maintain a documentation.md file at the project root covering features, data model, database, integrations, and roadmap. Use when building a new app, adding/removing features, changing data models, modifying integrations, or when the user asks about documentation. Also renders as a /docs page following design.md.
---

# App Documentation

## When to Use

Use this skill when:
- Bootstrapping a new application — `documentation.md` MUST be created as part of initial setup
- Adding or removing a feature
- Changing database tables, columns, or indexes
- Adding, modifying, or removing an external integration
- The user asks to document the app or update documentation
- Reviewing the app's roadmap
- Completing any task that changes user-facing behavior, data structures, or external connections

## Enforcement

- `documentation.md` MUST exist at the project root for every app. If it does not exist, create it before completing any task.
- After every feature, schema, or integration change, update the relevant section of `documentation.md` as part of completing the task — do not wait for the user to ask.
- Documentation updates are not optional follow-ups. The task is not done until `documentation.md` reflects the current state of the app.

## Core Principle

`documentation.md` at the project root is the single source of truth for what the app does, what data it uses, and what services it connects to. Keep it concise — implementation details belong in `replit.md`, not here. This file is written for anyone who needs to understand the app without reading code: product owners, new developers, or the agent in a future session.

## Template Structure

When creating `documentation.md`, use these 6 sections:

### 1. Overview
One paragraph describing what the app does and who it's for, followed by 3-5 key value propositions as bullets.

```markdown
## Overview
[App Name] is a [what it does] for [who uses it].

- Key value prop 1
- Key value prop 2
- Key value prop 3
```

### 2. Features
Group features by functional area. Use brief descriptions — one line per feature.

```markdown
## Features

### Dashboard
- Summary cards with key metrics
- Filterable date range selector

### User Management
- Role-based access control (Admin / Editor / Viewer)
- Email-based invitation flow
```

### 3. Data Model
Describe each entity in a structured table format. Include field name, type, constraints, and purpose. Group related entities. This should be clear enough that someone could draw a UML diagram from it.

```markdown
## Data Model

### Entity: users
Registered application users.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | serial | PK | Auto-increment ID |
| email | varchar(255) | UNIQUE, NOT NULL | Login email |
| role | varchar(32) | NOT NULL, default 'viewer' | Access level |

**Indexes**: Unique on (email)
**Relationships**: Has many projects
```

### 4. Database
Brief section on the storage approach used. Document the engine, ORM (if any), migration approach, and a summary table listing all tables/collections with their purpose. If no database is used, note the storage approach (e.g., in-memory, file-based, external API).

```markdown
## Database

**Engine**: (e.g., PostgreSQL, SQLite, none)
**ORM**: (e.g., Drizzle ORM, Prisma, none)
**Migrations**: (e.g., drizzle-kit push, prisma migrate, manual)

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| users | Registered users | email, role |
| projects | User-created projects | name, ownerId |
```

### 5. Integrations
Each external service gets its own block with: name, purpose, protocol/URL pattern, auth method, data flow direction, polling/webhook details, and required env vars.

```markdown
## Integrations

### Stripe
- **Purpose**: Payment processing and subscription management
- **Protocol**: REST API + Webhooks
- **Auth**: Secret key via `Authorization` header
- **Data flow**: Outbound (create charges) + Inbound (webhook events)
- **Env vars**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

### SendGrid
- **Purpose**: Transactional email delivery
- **Protocol**: REST API
- **Auth**: API key via `Authorization` header
- **Data flow**: Outbound — sends email on user actions
- **Env vars**: `SENDGRID_API_KEY`
```

If the app has no external integrations, include the section with a note: _No external integrations._

### 6. Roadmap
Two subsections: "Planned" for user-provided items, "Ideas" for agent-generated suggestions.

```markdown
## Roadmap

### Planned
_Items added by the team — update this section as priorities change._

### Ideas
_Auto-generated suggestions based on codebase analysis._
- Suggestion 1: description
- Suggestion 2: description
```

## Update Rules

When you make changes to the app, update the corresponding section of `documentation.md`:

| Change | Update Section |
|--------|---------------|
| New feature added | Features |
| Feature removed | Features |
| Database table added/modified | Data Model + Database |
| New external API integration | Integrations |
| Integration removed or changed | Integrations |
| Major milestone completed | Roadmap (move from Planned to Features) |
| App purpose or audience changed | Overview |

## Roadmap Auto-Generation

When creating or refreshing documentation, analyze the codebase and suggest 3-5 improvement ideas for the "Ideas" subsection. Focus on:
- Missing functionality that would complement existing features
- Performance or reliability improvements
- User experience enhancements
- Data quality or observability gaps

## Rendering as /docs Page

If the app has a frontend, create a `/docs` route that renders the documentation content as a styled page following the app's design system. Use the app's existing component patterns (cards, tabs, sections). The page should be navigable by section and accessible to all authenticated users (or publicly, depending on the app's auth model).

## replit.md Reference

Ensure `replit.md` includes a reference to `documentation.md`:

```markdown
## Documentation
**For app features, data model, database schema, integrations, and roadmap, see `documentation.md`.** This file is the concise reference for what the app does and how its data flows. Keep it updated when features, data, or integrations change.
```
