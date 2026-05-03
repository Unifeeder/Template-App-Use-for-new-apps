#!/bin/bash
REPO="Unifeeder/Template-App-Use-for-new-apps"
BRANCH="master"
RAW_BASE="https://raw.githubusercontent.com/$REPO/$BRANCH"
TIMESTAMP_FILE=".github-sync-timestamp"
INTERVAL=86400

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
    echo "[github-sync] Last sync was $((ELAPSED / 3600))h ago. Next in ~${HOURS_LEFT}h. Use --force to sync now."
    exit 0
  fi
fi

echo "[github-sync] Syncing from GitHub ($REPO)..."
UPDATED=0; SKIPPED=0; FAILED=0

sync_file() {
  local REMOTE_PATH="$1"; local LOCAL_PATH="$2"
  mkdir -p "$(dirname "$LOCAL_PATH")"
  local TMP="$LOCAL_PATH.tmp"
  HTTP_CODE=$(curl -fsSL -o "$TMP" -w "%{http_code}" --max-time 15 "$RAW_BASE/$REMOTE_PATH" 2>/dev/null)
  if [ "$HTTP_CODE" = "200" ] && [ -s "$TMP" ]; then
    if [ -f "$LOCAL_PATH" ] && cmp -s "$TMP" "$LOCAL_PATH" 2>/dev/null; then
      rm -f "$TMP"; SKIPPED=$((SKIPPED + 1))
    else
      mv "$TMP" "$LOCAL_PATH"; echo "  Updated: $LOCAL_PATH"; UPDATED=$((UPDATED + 1))
    fi
  else
    rm -f "$TMP"; echo "  FAILED: $LOCAL_PATH (HTTP $HTTP_CODE)"; FAILED=$((FAILED + 1))
  fi
}

sync_file ".agents/skills/dpworld-branding/SKILL.md" ".agents/skills/dpworld-branding/SKILL.md"
sync_file ".agents/skills/app-documentation/SKILL.md" ".agents/skills/app-documentation/SKILL.md"
sync_file "design.md" "design.md"
sync_file "documentation.md" "documentation.md"

# Design system reference page — single self-contained file. Apps still need to
# wire the route + header link once (see migration-prompts.md "v1.1").
# Looks for src/pages/ in any artifact; falls back to root src/pages/.
DS_TARGETS=()
if compgen -G "artifacts/*/src/pages" > /dev/null; then
  for d in artifacts/*/src/pages; do DS_TARGETS+=("$d/design-system.tsx"); done
elif [ -d "src/pages" ]; then
  DS_TARGETS+=("src/pages/design-system.tsx")
fi
for target in "${DS_TARGETS[@]}"; do
  sync_file "artifacts/starter-app/src/pages/design-system.tsx" "$target"
done

# Fixed shadcn primitives — restore standard hover/active states that the
# original Replit-customized variants stripped (see button.tsx / badge.tsx).
# Looks for src/components/ui/ in any artifact; falls back to root.
UI_TARGET_DIRS=()
if compgen -G "artifacts/*/src/components/ui" > /dev/null; then
  for d in artifacts/*/src/components/ui; do UI_TARGET_DIRS+=("$d"); done
elif [ -d "src/components/ui" ]; then
  UI_TARGET_DIRS+=("src/components/ui")
fi
for d in "${UI_TARGET_DIRS[@]}"; do
  sync_file "artifacts/starter-app/src/components/ui/button.tsx" "$d/button.tsx"
  sync_file "artifacts/starter-app/src/components/ui/badge.tsx" "$d/badge.tsx"
  sync_file "artifacts/starter-app/src/components/ui/checkbox.tsx" "$d/checkbox.tsx"
  sync_file "artifacts/starter-app/src/components/ui/radio-group.tsx" "$d/radio-group.tsx"
  sync_file "artifacts/starter-app/src/components/ui/slider.tsx" "$d/slider.tsx"
  sync_file "artifacts/starter-app/src/components/ui/select.tsx" "$d/select.tsx"
  sync_file "artifacts/starter-app/src/components/ui/tabs.tsx" "$d/tabs.tsx"
  sync_file "artifacts/starter-app/src/components/ui/card.tsx" "$d/card.tsx"
  sync_file "artifacts/starter-app/src/components/ui/dialog.tsx" "$d/dialog.tsx"
  sync_file "artifacts/starter-app/src/components/ui/sheet.tsx" "$d/sheet.tsx"
  sync_file "artifacts/starter-app/src/components/ui/toast.tsx" "$d/toast.tsx"
  sync_file "artifacts/starter-app/src/components/ui/popover.tsx" "$d/popover.tsx"
  sync_file "artifacts/starter-app/src/components/ui/hover-card.tsx" "$d/hover-card.tsx"
  sync_file "artifacts/starter-app/src/components/ui/dropdown-menu.tsx" "$d/dropdown-menu.tsx"
  sync_file "artifacts/starter-app/src/components/ui/context-menu.tsx" "$d/context-menu.tsx"
done
sync_file "public/assets/fonts/PilatDemi.ttf" "public/assets/fonts/PilatDemi.ttf"
sync_file "public/assets/fonts/PilatWideBook.ttf" "public/assets/fonts/PilatWideBook.ttf"
sync_file "public/assets/fonts/PilatWideHeavy.ttf" "public/assets/fonts/PilatWideHeavy.ttf"
sync_file "public/assets/logos/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png" "public/assets/logos/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png"
sync_file "public/assets/logos/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png" "public/assets/logos/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png"
sync_file "public/assets/logos/DP_World_Logo_Colour_WhiteBG_Vertical_RGB.png" "public/assets/logos/DP_World_Logo_Colour_WhiteBG_Vertical_RGB.png"
sync_file "public/assets/logos/DP_World_Logo_Colour_BlackBG_Vertical_RGB.png" "public/assets/logos/DP_World_Logo_Colour_BlackBG_Vertical_RGB.png"
sync_file "public/assets/logos/DP_World_Logo_Black_WhiteBG_Vertical_K-01.png" "public/assets/logos/DP_World_Logo_Black_WhiteBG_Vertical_K-01.png"
sync_file "public/assets/logos/DP_World_Logo_Black_WhiteBG_Vertical_RGB.png" "public/assets/logos/DP_World_Logo_Black_WhiteBG_Vertical_RGB.png"
sync_file "public/assets/logos/DP_World_Logo_White_BlackBG_Vertical_K-01.png" "public/assets/logos/DP_World_Logo_White_BlackBG_Vertical_K-01.png"
sync_file "public/assets/logos/DP_World_Logo_White_BlackBG_Vertical_RGB.png" "public/assets/logos/DP_World_Logo_White_BlackBG_Vertical_RGB.png"

sync_file "public/assets/DP%20WORLD%20MASTER%20GRADIENT%20-%20CMYK%20(1).ai" "public/assets/DP WORLD MASTER GRADIENT - CMYK (1).ai"
sync_file "public/assets/DP%20WORLD%20MASTER%20GRADIENT%20-%20RGB.ai" "public/assets/DP WORLD MASTER GRADIENT - RGB.ai"
sync_file "public/assets/ECONOMIC%20ZONES%20GRADIENT%20-%20CMYK.ai" "public/assets/ECONOMIC ZONES GRADIENT - CMYK.ai"
sync_file "public/assets/ECONOMIC%20ZONES%20GRADIENT%20-%20RGB.ai" "public/assets/ECONOMIC ZONES GRADIENT - RGB.ai"
sync_file "public/assets/PORTS%20AND%20TERMINALS%20GRADIENT%20-%20CMYK.ai" "public/assets/PORTS AND TERMINALS GRADIENT - CMYK.ai"
sync_file "public/assets/PORTS%20AND%20TERMINALS%20GRADIENT%20-%20RGB.ai" "public/assets/PORTS AND TERMINALS GRADIENT - RGB.ai"

date +%s > "$TIMESTAMP_FILE"
echo "[github-sync] Done. Updated: $UPDATED, Unchanged: $SKIPPED, Failed: $FAILED"

if [ "$FAILED" -gt 0 ]; then
  exit 1
fi
