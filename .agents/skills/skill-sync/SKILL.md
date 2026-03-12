# Skill Sync — Agent Skill

## Purpose

This skill manages synchronization of design system files, documentation templates, and agent skills from the DP World Shipping Solutions Hub.

## When to Activate

- Setting up a new Shipping Solutions app
- When skills or design files may be outdated
- When the user asks to sync or update from the hub
- During periodic maintenance

## Hub URL

The Shipping Solutions Hub is hosted at:
```
https://workspace.marinaalenskaj1.replit.app
```

## Sync Script

The sync script lives at `scripts/sync-skills.sh`. It handles:

1. Downloading the latest design system (`design.md`)
2. Downloading the documentation template (`documentation.md`)
3. Downloading agent skills into `.agents/skills/`
4. Downloading Pilat font files into `public/assets/fonts/`
5. Downloading DP World logo files into `attached_assets/`

### Built-in Interval

The sync script has a 48-hour check interval. It only contacts the hub if the last sync was more than 48 hours ago, and only downloads files if the hub version has changed. This means it adds negligible overhead to dev startup.

### Auto-Sync on Dev Startup

The sync script is prepended to the dev command in `package.json`:

```json
"dev": "sh scripts/sync-skills.sh; your-existing-dev-command"
```

This ensures skills are always up to date when developing.

### Force Sync

To force an immediate sync regardless of the 48-hour interval:

```bash
sh scripts/sync-skills.sh --force
```

## Synced Files

After sync, the following files exist in the project:

| File | Description |
|------|-------------|
| `design.md` | Complete DP World Marine Services design system |
| `documentation.md` | Documentation structure template |
| `.agents/skills/dpworld-branding/SKILL.md` | Brand compliance and design enforcement rules |
| `.agents/skills/app-documentation/SKILL.md` | Documentation maintenance rules |
| `.agents/skills/skill-sync/SKILL.md` | This file — hub sync instructions |
| `public/assets/fonts/PilatLight.ttf` | Pilat Light font |
| `public/assets/fonts/PilatDemi.ttf` | Pilat Demi font |
| `public/assets/fonts/PilatWideBook.ttf` | Pilat Wide Book font |
| `public/assets/fonts/PilatWideHeavy.ttf` | Pilat Wide Heavy font |
| `attached_assets/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png` | Light mode logo |
| `attached_assets/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png` | Dark mode logo |

## Troubleshooting

- If the hub is unreachable, the sync script skips gracefully and uses existing local files
- If fonts are missing, check `public/assets/fonts/` and re-run `sh scripts/sync-skills.sh --force`
- If the sync interval file is corrupted, delete `.sync-timestamp` and re-run
