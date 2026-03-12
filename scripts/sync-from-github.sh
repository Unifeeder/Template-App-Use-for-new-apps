#!/bin/bash
REPO="Unifeeder/Template-App-Use-for-new-apps"
BRANCH="master"
RAW_BASE="https://raw.githubusercontent.com/$REPO/$BRANCH"
TIMESTAMP_FILE=".github-sync-timestamp"
INTERVAL=86400  # 24 hours in seconds

FORCE=false
for arg in "$@"; do
  case "$arg" in
    --force) FORCE=true ;;
  esac
done

if [ "$FORCE" = false ] && [ -f "$TIMESTAMP_FILE" ]; then
  LAST_SYNC=$(cat "$TIMESTAMP_FILE")
  NOW=$(date +%s)
  ELAPSED=$((NOW - LAST_SYNC))
  if [ $ELAPSED -lt $INTERVAL ]; then
    HOURS_LEFT=$(( (INTERVAL - ELAPSED) / 3600 ))
    echo "[github-sync] Last sync was $((ELAPSED / 3600))h ago. Next sync in ~${HOURS_LEFT}h. Use --force to sync now."
    exit 0
  fi
fi

echo "[github-sync] Syncing skills and assets from GitHub ($REPO)..."

UPDATED=0
SKIPPED=0
FAILED=0

sync_file() {
  local REMOTE_PATH="$1"
  local LOCAL_PATH="$2"
  local DIR=$(dirname "$LOCAL_PATH")
  mkdir -p "$DIR"

  local TMP="$LOCAL_PATH.tmp"
  HTTP_CODE=$(curl -sf -o "$TMP" -w "%{http_code}" --max-time 15 "$RAW_BASE/$REMOTE_PATH" 2>/dev/null)

  if [ "$HTTP_CODE" = "200" ] && [ -s "$TMP" ]; then
    if [ -f "$LOCAL_PATH" ] && cmp -s "$TMP" "$LOCAL_PATH" 2>/dev/null; then
      rm -f "$TMP"
      SKIPPED=$((SKIPPED + 1))
    else
      mv "$TMP" "$LOCAL_PATH"
      echo "  Updated: $LOCAL_PATH"
      UPDATED=$((UPDATED + 1))
    fi
  else
    rm -f "$TMP"
    echo "  FAILED: $LOCAL_PATH (HTTP $HTTP_CODE)"
    FAILED=$((FAILED + 1))
  fi
}

sync_file ".agents/skills/dpworld-branding/SKILL.md" ".agents/skills/dpworld-branding/SKILL.md"
sync_file ".agents/skills/app-documentation/SKILL.md" ".agents/skills/app-documentation/SKILL.md"

sync_file "design.md" "design.md"
sync_file "documentation.md" "documentation.md"

sync_file "public/assets/fonts/PilatLight.ttf" "public/assets/fonts/PilatLight.ttf"
sync_file "public/assets/fonts/PilatDemi.ttf" "public/assets/fonts/PilatDemi.ttf"
sync_file "public/assets/fonts/PilatWideBook.ttf" "public/assets/fonts/PilatWideBook.ttf"
sync_file "public/assets/fonts/PilatWideHeavy.ttf" "public/assets/fonts/PilatWideHeavy.ttf"

sync_file "attached_assets/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png" "attached_assets/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png"
sync_file "attached_assets/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png" "attached_assets/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png"
sync_file "attached_assets/DP_World_Logo_Colour_WhiteBG_Vertical_RGB.png" "attached_assets/DP_World_Logo_Colour_WhiteBG_Vertical_RGB.png"
sync_file "attached_assets/DP_World_Logo_Colour_BlackBG_Vertical_RGB.png" "attached_assets/DP_World_Logo_Colour_BlackBG_Vertical_RGB.png"
sync_file "attached_assets/DP_World_Logo_Black_WhiteBG_Vertical_K-01.png" "attached_assets/DP_World_Logo_Black_WhiteBG_Vertical_K-01.png"
sync_file "attached_assets/DP_World_Logo_Black_WhiteBG_Vertical_RGB.png" "attached_assets/DP_World_Logo_Black_WhiteBG_Vertical_RGB.png"
sync_file "attached_assets/DP_World_Logo_White_BlackBG_Vertical_K-01.png" "attached_assets/DP_World_Logo_White_BlackBG_Vertical_K-01.png"
sync_file "attached_assets/DP_World_Logo_White_BlackBG_Vertical_RGB.png" "attached_assets/DP_World_Logo_White_BlackBG_Vertical_RGB.png"

date +%s > "$TIMESTAMP_FILE"

echo ""
echo "[github-sync] Done. Updated: $UPDATED, Unchanged: $SKIPPED, Failed: $FAILED"
