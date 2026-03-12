---
name: skill-sync
description: Keeps child apps in sync with the hub's shared skills and design files. Run at the start of any new session or when the user asks to update skills.
---

# Skill Sync

## When to Use

Use this skill when:
- Starting a new agent session on a child app
- The user asks to update or refresh skills
- After the hub has been updated with new design tokens, templates, or skill files

## Instructions

### 1. Run the Sync Script

Execute the sync script to pull the latest shared files from the DP World Shipping Solutions Hub:

```bash
bash scripts/sync-skills.sh
```

This script:
- Fetches the skills bundle from the hub's `/api/skills/bundle` endpoint
- Writes `design.md` and `documentation.md` to the project root
- Updates `.agents/skills/` with the latest SKILL.md files
- Downloads Pilat font files to `public/assets/fonts/` (skips if already present)
- Downloads DP World logo assets to `attached_assets/` (skips if already present)

### 2. Hub URL

The sync script already has the correct hub URL embedded — no manual setup is needed. When the hub serves the script via `/api/skills/sync-script`, it resolves the real published URL from the `REPLIT_DEPLOYMENT_URL` environment variable and bakes it into the script as the default `HUB_URL` value.

If you need to override the default URL (e.g., pointing to a different hub environment), you can optionally set the `HUB_URL` environment variable before running the script:

```bash
export HUB_URL="https://different-hub.replit.app"
bash scripts/sync-skills.sh
```

This is optional — the script works out of the box without setting any environment variables.

### 3. After Syncing

- Read `design.md` before any UI work
- Follow `.agents/skills/dpworld-branding/SKILL.md` for brand compliance and visual guidelines
- Follow `.agents/skills/app-documentation/SKILL.md` for documentation standards

### 4. Force Re-sync

The script only contacts the hub every 48 hours by default. To force an immediate sync:

```bash
bash scripts/sync-skills.sh --force
```
