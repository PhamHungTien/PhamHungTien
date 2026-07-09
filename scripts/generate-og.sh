#!/usr/bin/env bash
# Builds the 1200x630 Open Graph cards in public/og/.
#
# macOS-only (uses sips). The output is committed to git because the deploy
# workflow runs on ubuntu and must not regenerate these.
#
#   ./scripts/generate-og.sh
set -euo pipefail

cd "$(dirname "$0")/.."
out="public/og"
mkdir -p "$out"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# slug|source image|pad colour (the product accent)
entries=(
  "home|assets/phtv-social-preview.webp|111827"
  "phtv|assets/phtv-social-preview.webp|d71f2a"
  "lunarv|LunarV/assets/lunarv-ipad.jpg|6655d9"
  "padcodeai|PadCodeAI/assets/ipad-editor.png|3d5afe"
  "padnotesai|PadNotesAI/assets/ipad-editor.png|7c3aed"
  "mynasmanager|MyNASManager/assets/ipad-hero.png|0071e3"
  "lunarblock|LunarBlock/assets/lunarblock-hero.png|f59e0b"
)

for entry in "${entries[@]}"; do
  IFS='|' read -r slug src pad <<<"$entry"
  work="$tmp/$slug.png"

  # Scale to fit inside the card, then pad out to exactly 1200x630 so nothing is cropped.
  sips -s format png "$src" --out "$work" >/dev/null
  sips --resampleHeight 560 "$work" >/dev/null
  sips -p 630 1200 --padColor "$pad" "$work" --out "$out/$slug.png" >/dev/null

  printf '  %-14s %s\n' "$slug" "$(sips -g pixelWidth -g pixelHeight "$out/$slug.png" | tail -2 | awk '{printf "%s ", $2}')"
done

echo "✓ og cards written to $out"
