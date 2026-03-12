#!/bin/sh
# DP World Shipping Solutions — Skill Sync Script
# Syncs design system, documentation templates, agent skills, and assets
# from the Shipping Solutions Hub.
#
# Usage:
#   sh scripts/sync-skills.sh          # Respects 48-hour interval
#   sh scripts/sync-skills.sh --force  # Force immediate sync

HUB_URL="https://workspace.marinaalenskaj1.replit.app"
TIMESTAMP_FILE=".sync-timestamp"
INTERVAL=172800  # 48 hours in seconds

FORCE=0
if [ "$1" = "--force" ]; then
  FORCE=1
fi

should_sync() {
  if [ "$FORCE" = "1" ]; then
    return 0
  fi
  if [ ! -f "$TIMESTAMP_FILE" ]; then
    return 0
  fi
  LAST_SYNC=$(cat "$TIMESTAMP_FILE" 2>/dev/null || echo "0")
  NOW=$(date +%s)
  DIFF=$((NOW - LAST_SYNC))
  if [ "$DIFF" -ge "$INTERVAL" ]; then
    return 0
  fi
  echo "[sync-skills] Last sync was $(($DIFF / 3600))h ago (interval: $(($INTERVAL / 3600))h). Skipping."
  return 1
}

sync_file() {
  URL="$1"
  DEST="$2"
  DIR=$(dirname "$DEST")
  mkdir -p "$DIR"
  echo "[sync-skills] Fetching $DEST ..."
  curl -skf -o "$DEST.tmp" "$URL" 2>/dev/null
  if [ $? -eq 0 ] && [ -s "$DEST.tmp" ]; then
    mv "$DEST.tmp" "$DEST"
    echo "[sync-skills]   -> Updated $DEST"
  else
    rm -f "$DEST.tmp"
    echo "[sync-skills]   -> Hub unreachable or empty response, keeping local copy of $DEST"
  fi
}

if ! should_sync; then
  exit 0
fi

echo "[sync-skills] Syncing from Shipping Solutions Hub..."
echo ""

sync_file "$HUB_URL/api/skills/design" "design.md"
sync_file "$HUB_URL/api/skills/documentation" "documentation.md"
sync_file "$HUB_URL/api/skills/dpworld-branding" ".agents/skills/dpworld-branding/SKILL.md"
sync_file "$HUB_URL/api/skills/app-documentation" ".agents/skills/app-documentation/SKILL.md"
sync_file "$HUB_URL/api/skills/skill-sync" ".agents/skills/skill-sync/SKILL.md"

sync_file "$HUB_URL/api/assets/fonts/PilatLight.ttf" "public/assets/fonts/PilatLight.ttf"
sync_file "$HUB_URL/api/assets/fonts/PilatDemi.ttf" "public/assets/fonts/PilatDemi.ttf"
sync_file "$HUB_URL/api/assets/fonts/PilatWideBook.ttf" "public/assets/fonts/PilatWideBook.ttf"
sync_file "$HUB_URL/api/assets/fonts/PilatWideHeavy.ttf" "public/assets/fonts/PilatWideHeavy.ttf"

sync_file "$HUB_URL/api/assets/logos/light" "attached_assets/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png"
sync_file "$HUB_URL/api/assets/logos/dark" "attached_assets/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png"

date +%s > "$TIMESTAMP_FILE"

echo ""
echo "[sync-skills] Sync complete."
echo "[sync-skills] Files synced:"
echo "  - design.md"
echo "  - documentation.md"
echo "  - .agents/skills/dpworld-branding/SKILL.md"
echo "  - .agents/skills/app-documentation/SKILL.md"
echo "  - .agents/skills/skill-sync/SKILL.md"
echo "  - public/assets/fonts/ (4 Pilat font files)"
echo "  - attached_assets/ (2 DP World logo files)"
