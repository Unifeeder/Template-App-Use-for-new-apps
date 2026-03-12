#!/bin/bash
# Skill Sync Script — Pulls latest shared files from DP World Shipping Solutions Hub
HUB_URL="${HUB_URL:-https://shipping-solutions-apps.replit.app}"
SYNC_INTERVAL=172800  # 48 hours in seconds
FORCE=false

for arg in "$@"; do
  case "$arg" in
    --force) FORCE=true ;;
  esac
done

LAST_SYNC_FILE=".skills-last-sync"
if [ "$FORCE" = false ] && [ -f "$LAST_SYNC_FILE" ]; then
  LAST_SYNC=$(cat "$LAST_SYNC_FILE")
  NOW=$(date +%s)
  ELAPSED=$((NOW - LAST_SYNC))
  if [ $ELAPSED -lt $SYNC_INTERVAL ]; then
    HOURS_LEFT=$(( (SYNC_INTERVAL - ELAPSED) / 3600 ))
    echo "Last sync was $((ELAPSED / 3600)) hours ago. Next sync in ~${HOURS_LEFT}h. Use --force to sync now."
    exit 0
  fi
fi

echo "Syncing skills from $HUB_URL..."

MAX_RETRIES=5
RETRY_DELAY=15
BUNDLE=""
BUNDLE_TMP=$(mktemp)

for i in $(seq 1 $MAX_RETRIES); do
  HTTP_CODE=$(curl -sk -o "$BUNDLE_TMP" -w "%{http_code}" --max-time 60 "$HUB_URL/api/skills/bundle")
  if [ "$HTTP_CODE" = "200" ] && [ -s "$BUNDLE_TMP" ]; then
    BUNDLE=$(cat "$BUNDLE_TMP")
    break
  fi
  if [ $i -lt $MAX_RETRIES ]; then
    echo "  Hub returned HTTP $HTTP_CODE (attempt $i/$MAX_RETRIES). Retrying in ${RETRY_DELAY}s (hub may be waking up)..."
    sleep $RETRY_DELAY
  fi
done
rm -f "$BUNDLE_TMP"

if [ -z "$BUNDLE" ]; then
  echo "ERROR: Failed to fetch skills bundle from $HUB_URL after $MAX_RETRIES attempts"
  exit 1
fi

VALID_JSON=$(echo "$BUNDLE" | node -e "
try { JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf8')); console.log('ok'); } catch(e) { console.log('fail'); }
")
if [ "$VALID_JSON" != "ok" ]; then
  echo "ERROR: Hub returned non-JSON response (likely an error page). Bundle content is not valid."
  exit 1
fi

BUNDLE_VERSION=$(echo "$BUNDLE" | node -e "
const data = JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf8'));
console.log(data.version || '');
")

VERSION_FILE=".skills-version"
if [ "$FORCE" = false ] && [ -f "$VERSION_FILE" ]; then
  LAST_VERSION=$(cat "$VERSION_FILE")
  if [ "$LAST_VERSION" = "$BUNDLE_VERSION" ]; then
    date +%s > "$LAST_SYNC_FILE"
    echo "Already up to date (version: $BUNDLE_VERSION). Use --force to re-sync."
    exit 0
  fi
fi

echo "$BUNDLE" | node -e "
const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync('/dev/stdin', 'utf8'));

let successes = 0;
let failures = 0;
const errors = [];

data.files.forEach(f => {
  try {
    if (f.createOnly && fs.existsSync(f.path)) {
      console.log('  Skipped (already exists): ' + f.path);
      successes++;
      return;
    }
    const dir = path.dirname(f.path);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(f.path, f.content);
    console.log('  Updated: ' + f.path);
    successes++;
  } catch (err) {
    failures++;
    const msg = '  FAILED: ' + f.path + ' — ' + (err.message || err);
    errors.push(msg);
    console.error(msg);
  }
});

console.log('');
console.log('Files: ' + successes + ' succeeded, ' + failures + ' failed');
if (failures > 0) {
  errors.forEach(e => console.error(e));
  process.exit(1);
}
"

FILE_EXIT=$?

download_with_retry() {
  local URL="$1"
  local DEST="$2"
  local LABEL="$3"
  local ATTEMPTS=3
  local DELAY=5
  for attempt in $(seq 1 $ATTEMPTS); do
    HTTP_CODE=$(curl -sk -o "$DEST" -w "%{http_code}" --max-time 15 "$URL")
    if [ "$HTTP_CODE" = "200" ] && [ -s "$DEST" ]; then
      echo "  Downloaded $LABEL: $DEST"
      return 0
    fi
    if [ $attempt -lt $ATTEMPTS ]; then
      echo "  Retry $attempt/$ATTEMPTS for $LABEL ($DEST, HTTP $HTTP_CODE)..."
      sleep $DELAY
    fi
  done
  echo "  WARNING: Failed to download $LABEL: $DEST (HTTP $HTTP_CODE after $ATTEMPTS attempts)"
  rm -f "$DEST"
  return 1
}

mkdir -p attached_assets
LOGO_SUCCESS=0
LOGO_FAIL=0

LOGOS=$(echo "$BUNDLE" | node -e "
const data = JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf8'));
if (data.logos) data.logos.forEach(l => console.log(l.filename + '|' + l.downloadUrl));
")

while IFS='|' read -r FILENAME DOWNLOAD_URL; do
  [ -z "$FILENAME" ] && continue
  DEST="attached_assets/$FILENAME"
  if [ -f "$DEST" ] && [ -s "$DEST" ]; then
    echo "  Already exists: $DEST"
    LOGO_SUCCESS=$((LOGO_SUCCESS + 1))
    continue
  fi
  if download_with_retry "$HUB_URL$DOWNLOAD_URL" "$DEST" "logo"; then
    LOGO_SUCCESS=$((LOGO_SUCCESS + 1))
  else
    LOGO_FAIL=$((LOGO_FAIL + 1))
  fi
done <<< "$LOGOS"

if [ $LOGO_SUCCESS -gt 0 ] || [ $LOGO_FAIL -gt 0 ]; then
  echo "Logos: $LOGO_SUCCESS downloaded, $LOGO_FAIL failed"
fi

mkdir -p public/assets/fonts
FONT_SUCCESS=0
FONT_FAIL=0

FONTS=$(echo "$BUNDLE" | node -e "
const data = JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf8'));
if (data.fonts) data.fonts.forEach(f => console.log(f.filename + '|' + f.downloadUrl));
")

while IFS='|' read -r FILENAME DOWNLOAD_URL; do
  [ -z "$FILENAME" ] && continue
  DEST="public/assets/fonts/$FILENAME"
  if [ -f "$DEST" ] && [ -s "$DEST" ]; then
    echo "  Already exists: $DEST"
    FONT_SUCCESS=$((FONT_SUCCESS + 1))
    continue
  fi
  if download_with_retry "$HUB_URL$DOWNLOAD_URL" "$DEST" "font"; then
    FONT_SUCCESS=$((FONT_SUCCESS + 1))
  else
    FONT_FAIL=$((FONT_FAIL + 1))
  fi
done <<< "$FONTS"

if [ $FONT_SUCCESS -gt 0 ] || [ $FONT_FAIL -gt 0 ]; then
  echo "Fonts: $FONT_SUCCESS downloaded, $FONT_FAIL failed"
fi

if [ $FONT_SUCCESS -gt 0 ]; then
  FONTFACE_CSS="/* Pilat Font Family — DP World Official Typography */
@font-face {
  font-family: 'Pilat';
  src: url('/assets/fonts/PilatLight.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pilat';
  src: url('/assets/fonts/PilatDemi.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pilat Wide';
  src: url('/assets/fonts/PilatWideBook.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pilat Wide';
  src: url('/assets/fonts/PilatWideHeavy.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}"

  CSS_FILE=""
  for candidate in client/src/index.css src/index.css app/globals.css styles/globals.css; do
    if [ -f "$candidate" ]; then
      CSS_FILE="$candidate"
      break
    fi
  done

  if [ -n "$CSS_FILE" ]; then
    if ! grep -q "@font-face" "$CSS_FILE" 2>/dev/null || ! grep -q "font-family.*Pilat" "$CSS_FILE" 2>/dev/null; then
      TEMP_CSS=$(mktemp)
      echo "$FONTFACE_CSS" > "$TEMP_CSS"
      echo "" >> "$TEMP_CSS"
      cat "$CSS_FILE" >> "$TEMP_CSS"
      mv "$TEMP_CSS" "$CSS_FILE"
      echo "  Injected @font-face declarations into $CSS_FILE"
    else
      echo "  @font-face declarations already present in $CSS_FILE"
    fi
  else
    echo "  NOTE: No CSS entry file found. Add @font-face declarations manually (see design.md §3.2)"
  fi
fi

if [ $FILE_EXIT -ne 0 ]; then
  echo "Skill sync completed with file write errors."
  exit 1
fi

if [ $LOGO_FAIL -gt 0 ] || [ $FONT_FAIL -gt 0 ]; then
  echo "WARNING: Skill sync completed but some assets failed to download. They will be retried on next sync."
fi

if [ -n "$BUNDLE_VERSION" ]; then
  echo "$BUNDLE_VERSION" > "$VERSION_FILE"
fi

date +%s > "$LAST_SYNC_FILE"
echo "Skill sync complete!"