---
name: app-documentation
description: Maintain a documentation.md file at the project root covering features, data model, database, data sources, integrations, and roadmap. Use when building a new app, adding/removing features, changing data models, modifying data sources or integrations, or when the user asks about documentation.
---

# App Documentation

## When to Use

Use this skill when:
- Bootstrapping a new application — `documentation.md` MUST be created as part of initial setup
- Adding or removing a feature
- Changing database tables, columns, or indexes
- Adding, modifying, or removing a data source or input file
- Adding, modifying, or removing an external integration
- The user asks to document the app or update documentation
- Reviewing the app's roadmap
- Completing any task that changes user-facing behavior, data structures, data inputs, or external connections

## Enforcement

- `documentation.md` MUST exist at the project root for every app. If it does not exist, create it before completing any task.
- After every feature, schema, data source, or integration change, update the relevant section of `documentation.md` as part of completing the task — do not wait for the user to ask.
- Documentation updates are not optional follow-ups. The task is not done until `documentation.md` reflects the current state of the app.

## Core Principle

`documentation.md` at the project root is the single source of truth for what the app does, what data it uses, where that data comes from, and what services it connects to. Keep it concise — implementation details belong in `replit.md`, not here. This file is written for anyone who needs to understand the app without reading code: product owners, new developers, or the agent in a future session.

## Template Structure

When creating `documentation.md`, use these 7 sections:

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

### 5. Data Sources & Inputs
Document every source of data that flows into the app. This section makes it clear where data comes from, in what format, and how often it changes — without reading code.

Use the appropriate subsection for each data source type. Remove subsections that don't apply.

#### 5a. File-Based Inputs
Data loaded from files (Excel, CSV, JSON, XML, etc.) — whether bundled with the app, placed on disk, or provided by an external team.

```markdown
### File-Based Inputs

| File | Format | Location | Schema / Key Columns | Update Frequency | Provider |
|------|--------|----------|----------------------|------------------|----------|
| vessel_schedule.xlsx | Excel (.xlsx) | `data/imports/` | VesselName, ETA, ETD, PortCode | Weekly (Monday) | Operations team via email |
| port_codes.json | JSON | `data/reference/` | code, name, country, timezone | Rarely — updated when new ports added | Engineering |
```

#### 5b. API-Sourced Data
Data fetched from external or internal APIs on a schedule or in response to events.

```markdown
### API-Sourced Data

| Source | Endpoint / Topic | Protocol | Data Format | Refresh Cadence | Direction |
|--------|-----------------|----------|-------------|-----------------|-----------|
| DP World TOS | `https://tos.dpworld.com/api/v2/movements` | REST | JSON | Every 15 min (polling) | Inbound |
| Weather API | `https://api.openweathermap.org/data/3.0/onecall` | REST | JSON | Hourly | Inbound |
```

#### 5c. User-Uploaded Data
Files or data submitted by users through the application UI.

```markdown
### User-Uploaded Data

| Upload Type | Accepted Formats | Max Size | Processing Pipeline | Destination |
|-------------|-----------------|----------|---------------------|-------------|
| Cargo manifest | .xlsx, .csv | 10 MB | Parse → validate schema → insert rows into `cargo` table | PostgreSQL `cargo` table |
| Supporting docs | .pdf, .png, .jpg | 5 MB | Store in object storage, link to shipment record | Object storage + `documents` table |
```

#### 5d. Static / Seed Data
Bundled datasets, lookup tables, or reference data that ship with the app.

```markdown
### Static / Seed Data

| Dataset | Format | Location | Description | How to Update |
|---------|--------|----------|-------------|---------------|
| Country codes | TypeScript const | `src/data/countries.ts` | ISO 3166-1 alpha-2 country list | Edit source file, rebuild |
| DP World brand assets | Binary (TTF, PNG, AI) | `public/assets/` | Pilat fonts, logo variants, gradient files | Auto-synced daily via `scripts/sync-from-github.sh` |
```

If the app has no data sources beyond its own database, include the section with a note: _No external data sources. All data originates from user interactions stored in the database._

### 6. Integrations
Each external service gets its own detailed block. This section should give a complete picture of every external dependency — enough for someone to understand what breaks if the service goes down.

```markdown
## Integrations

### Stripe
- **Purpose**: Payment processing and subscription management
- **Version / Tier**: API v2023-10-16, Growth plan
- **Protocol**: REST API + Webhooks
- **Base URL**: `https://api.stripe.com/v1`
- **Auth**: Secret key via `Authorization: Bearer` header
- **Env vars**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- **Data flow**: Bidirectional
  - **Outbound**: Create checkout sessions, update subscriptions
  - **Inbound**: Webhook events — `checkout.session.completed`, `invoice.payment_failed`, `customer.subscription.updated`
- **Key endpoints**:
  - `POST /v1/checkout/sessions` — create payment session
  - `POST /v1/subscriptions` — manage subscriptions
  - `POST /v1/webhook` (incoming) — receive event notifications
- **Error handling**: Webhook retries for 72h; failed payments trigger user notification email
- **Rate limits**: 100 reads/sec, 100 writes/sec (standard tier)

### SendGrid
- **Purpose**: Transactional email delivery
- **Version / Tier**: API v3, Essentials plan
- **Protocol**: REST API
- **Base URL**: `https://api.sendgrid.com/v3`
- **Auth**: API key via `Authorization: Bearer` header
- **Env vars**: `SENDGRID_API_KEY`
- **Data flow**: Outbound
  - Sends welcome email on user signup
  - Sends password reset emails
  - Sends weekly digest to subscribed users
- **Key endpoints**:
  - `POST /v3/mail/send` — send transactional email
- **Error handling**: Failed sends logged; user shown inline error; no retry
- **Rate limits**: 100 emails/day (Essentials)
```

If the app has no external integrations, include the section with a note: _No external integrations._

### 7. Roadmap
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
| New data source (file, API feed, upload) added | Data Sources & Inputs |
| Data source format, schema, or frequency changed | Data Sources & Inputs |
| Data source removed | Data Sources & Inputs |
| New external API integration | Integrations |
| Integration removed or changed | Integrations |
| Integration auth, endpoints, or error handling changed | Integrations |
| Major milestone completed | Roadmap (move from Planned to Features) |
| App purpose or audience changed | Overview |

## Roadmap Auto-Generation

When creating or refreshing documentation, analyze the codebase and suggest 3-5 improvement ideas for the "Ideas" subsection. Focus on:
- Missing functionality that would complement existing features
- Performance or reliability improvements
- User experience enhancements
- Data quality or observability gaps

## replit.md Reference

Ensure `replit.md` includes a reference to `documentation.md`:

```markdown
## Documentation
**For app features, data model, database schema, data sources, integrations, and roadmap, see `documentation.md`.** This file is the concise reference for what the app does and how its data flows. Keep it updated when features, data sources, or integrations change.
```
