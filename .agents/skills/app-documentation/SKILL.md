# App Documentation — Agent Skill

## Purpose

This skill ensures every Shipping Solutions app maintains proper documentation following the DP World standard template.

## When to Activate

- Creating a new Shipping Solutions app
- Adding or removing features
- Changing API endpoints
- Modifying database schema
- Updating environment variables or configuration

## Rules

### documentation.md — REQUIRED

Every app MUST have a `documentation.md` file at the project root that follows the template from the Shipping Solutions Hub.

### Required Sections

The documentation MUST include all of these sections:

1. **App Name & Overview** — What the app does and its role in the Shipping Solutions ecosystem
2. **Architecture** — Tech stack, project structure
3. **Features** — Description of each feature with key components
4. **API Endpoints** — Table of all endpoints (method, path, description)
5. **Database Schema** — Tables, columns, relationships
6. **Design System Compliance** — Confirmation of DP World brand adherence
7. **Environment Variables** — All required env vars with descriptions
8. **Development** — How to install, run, and develop locally
9. **Deployment** — Build and deploy instructions
10. **Skill Sync** — How the app stays in sync with the hub
11. **Changelog** — Record of changes with dates

### /docs Route — REQUIRED

The app MUST include a `/docs` route that:
- Reads `documentation.md` and renders it as formatted HTML
- Follows the app's design system (colors, typography, spacing)
- Supports dark mode
- Is accessible from the app's navigation or header

### Maintenance Rules

- Update `documentation.md` after EVERY feature addition or removal
- Update the API Endpoints table after ANY route change
- Update the Database Schema section after ANY schema migration
- Add a changelog entry for every significant change
- Keep the Environment Variables table current

### Template Location

The canonical documentation template is in `documentation.md` at the project root. If it doesn't exist, create it from the template provided by the Shipping Solutions Hub sync.
