#!/bin/bash
# DP World Shipping Solutions — Setup Script for Existing Apps
# Run this in any Replit app to pull in the full Shipping Solutions
# design system, agent skills, fonts, logos, and sync script.
#
# Usage:
#   curl -s https://raw.githubusercontent.com/Unifeeder/Template-App-Use-for-new-apps/master/scripts/setup-shipping-solutions.sh | bash

REPO="Unifeeder/Template-App-Use-for-new-apps"
BRANCH="master"
RAW_BASE="https://raw.githubusercontent.com/$REPO/$BRANCH"

echo "================================================"
echo " DP World Shipping Solutions — Setup"
echo " Source: github.com/$REPO"
echo "================================================"
echo ""

DOWNLOADED=0
FAILED=0

download_file() {
  local REMOTE_PATH="$1"
  local LOCAL_PATH="$2"
  local DIR=$(dirname "$LOCAL_PATH")
  mkdir -p "$DIR"

  HTTP_CODE=$(curl -fsSL -o "$LOCAL_PATH.tmp" -w "%{http_code}" --max-time 15 "$RAW_BASE/$REMOTE_PATH" 2>/dev/null)

  if [ "$HTTP_CODE" = "200" ] && [ -s "$LOCAL_PATH.tmp" ]; then
    mv "$LOCAL_PATH.tmp" "$LOCAL_PATH"
    echo "  OK: $LOCAL_PATH"
    DOWNLOADED=$((DOWNLOADED + 1))
  else
    rm -f "$LOCAL_PATH.tmp"
    echo "  FAILED: $LOCAL_PATH (HTTP $HTTP_CODE)"
    FAILED=$((FAILED + 1))
  fi
}

echo "[1/7] Downloading agent skills..."
download_file ".agents/skills/dpworld-branding/SKILL.md" ".agents/skills/dpworld-branding/SKILL.md"
download_file ".agents/skills/app-documentation/SKILL.md" ".agents/skills/app-documentation/SKILL.md"

echo ""
echo "[2/7] Downloading design system and documentation template..."
download_file "design.md" "design.md"
download_file "documentation.md" "documentation.md"

echo ""
echo "[3/7] Downloading Pilat font files..."
download_file "public/assets/fonts/PilatDemi.ttf" "public/assets/fonts/PilatDemi.ttf"
download_file "public/assets/fonts/PilatWideBook.ttf" "public/assets/fonts/PilatWideBook.ttf"
download_file "public/assets/fonts/PilatWideHeavy.ttf" "public/assets/fonts/PilatWideHeavy.ttf"

echo ""
echo "[4/7] Downloading DP World logos..."
mkdir -p attached_assets
download_file "attached_assets/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png" "attached_assets/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png"
download_file "attached_assets/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png" "attached_assets/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png"
download_file "attached_assets/DP_World_Logo_Colour_WhiteBG_Vertical_RGB.png" "attached_assets/DP_World_Logo_Colour_WhiteBG_Vertical_RGB.png"
download_file "attached_assets/DP_World_Logo_Colour_BlackBG_Vertical_RGB.png" "attached_assets/DP_World_Logo_Colour_BlackBG_Vertical_RGB.png"
download_file "attached_assets/DP_World_Logo_Black_WhiteBG_Vertical_K-01.png" "attached_assets/DP_World_Logo_Black_WhiteBG_Vertical_K-01.png"
download_file "attached_assets/DP_World_Logo_Black_WhiteBG_Vertical_RGB.png" "attached_assets/DP_World_Logo_Black_WhiteBG_Vertical_RGB.png"
download_file "attached_assets/DP_World_Logo_White_BlackBG_Vertical_K-01.png" "attached_assets/DP_World_Logo_White_BlackBG_Vertical_K-01.png"
download_file "attached_assets/DP_World_Logo_White_BlackBG_Vertical_RGB.png" "attached_assets/DP_World_Logo_White_BlackBG_Vertical_RGB.png"

echo ""
echo "[5/7] Downloading gradient background files..."
download_file "public/assets/DP%20WORLD%20MASTER%20GRADIENT%20-%20CMYK%20(1).ai" "public/assets/DP WORLD MASTER GRADIENT - CMYK (1).ai"
download_file "public/assets/DP%20WORLD%20MASTER%20GRADIENT%20-%20RGB.ai" "public/assets/DP WORLD MASTER GRADIENT - RGB.ai"
download_file "public/assets/ECONOMIC%20ZONES%20GRADIENT%20-%20CMYK.ai" "public/assets/ECONOMIC ZONES GRADIENT - CMYK.ai"
download_file "public/assets/ECONOMIC%20ZONES%20GRADIENT%20-%20RGB.ai" "public/assets/ECONOMIC ZONES GRADIENT - RGB.ai"
download_file "public/assets/PORTS%20AND%20TERMINALS%20GRADIENT%20-%20CMYK.ai" "public/assets/PORTS AND TERMINALS GRADIENT - CMYK.ai"
download_file "public/assets/PORTS%20AND%20TERMINALS%20GRADIENT%20-%20RGB.ai" "public/assets/PORTS AND TERMINALS GRADIENT - RGB.ai"

echo ""
echo "[6/7] Downloading daily sync script..."
mkdir -p scripts
download_file "scripts/sync-from-github.sh" "scripts/sync-from-github.sh"
chmod +x scripts/sync-from-github.sh 2>/dev/null

echo ""
echo "[7/7] Setup complete!"
echo ""
echo "  Downloaded: $DOWNLOADED files"
if [ $FAILED -gt 0 ]; then
  echo "  Failed: $FAILED files"
fi
echo ""
echo "================================================"
echo " Next steps:"
echo ""
echo " 1. Add this to your replit.md so the agent"
echo "    follows DP World standards:"
echo ""
echo "    ## Shipping Solutions Skills"
echo "    Read and follow these skills on every change:"
echo "    - .agents/skills/dpworld-branding/SKILL.md"
echo "    - .agents/skills/app-documentation/SKILL.md"
echo "    - design.md"
echo ""
echo " 2. Wire daily sync into your dev command:"
echo "    \"dev\": \"bash scripts/sync-from-github.sh; your-dev-command\""
echo ""
echo " 3. Run the sync manually anytime:"
echo "    bash scripts/sync-from-github.sh --force"
echo "================================================"
