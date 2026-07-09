#!/usr/bin/env bash
# Downscales the marketing images to the largest size the site actually renders.
#
# App icons are drawn at 42px yet ship at 1024x1024; screenshots are drawn at roughly
# 700px yet ship at 2752px wide. This rewrites them in place — git holds the originals,
# and the App Store masters live in Xcode, not here.
#
# macOS-only (uses sips). Run once and commit the result; CI must not regenerate these.
#
#   ./scripts/optimize-images.sh
set -euo pipefail

cd "$(dirname "$0")/.."

icons=(
  MyNASManager/assets/app-icon.png
  PadNotesAI/assets/app-icon.png
  PadCodeAI/assets/app-icon.png
  LunarBlock/assets/app-icon.png
  assets/lunarv-icon.png
)

screenshots=(
  PadCodeAI/assets/ipad-editor.png
  PadCodeAI/assets/ipad-terminal.png
  PadCodeAI/assets/iphone-home.png
  PadNotesAI/assets/ipad-editor.png
  PadNotesAI/assets/ipad-workspace.png
  MyNASManager/assets/ipad-hero.png
  MyNASManager/assets/ipad-screenshot3.png
  MyNASManager/assets/iphone-screenshot1.png
  MyNASManager/assets/iphone-screenshot2.png
  LunarBlock/assets/lunarblock-hero.png
  LunarBlock/assets/lunarblock-showcase.png
  LunarV/assets/ui-review-1.png
  LunarV/assets/ui-review-2.png
)

before=$(du -ck "${icons[@]}" "${screenshots[@]}" | tail -1 | cut -f1)

# `sips -Z` scales in both directions, so an image already under the cap would be
# upscaled and grow. Only ever shrink.
shrink_to() {
  local target=$1 file=$2 w h long
  [ -f "$file" ] || return 0
  w=$(sips -g pixelWidth "$file" | tail -1 | awk '{print $2}')
  h=$(sips -g pixelHeight "$file" | tail -1 | awk '{print $2}')
  long=$((w > h ? w : h))

  if [ "$long" -le "$target" ]; then
    printf '  skip    %-42s %sx%s already ≤ %s\n' "$file" "$w" "$h" "$target"
    return 0
  fi

  sips -Z "$target" "$file" >/dev/null
  printf '  resize  %-42s %sx%s -> %s long edge\n' "$file" "$w" "$h" "$target"
}

# 256px covers a 42px slot at 3x device pixel ratio with headroom to spare.
for f in "${icons[@]}"; do shrink_to 256 "$f"; done

# 1600px on the long edge covers the widest render (~700px CSS) at 2x.
for f in "${screenshots[@]}"; do shrink_to 1600 "$f"; done

after=$(du -ck "${icons[@]}" "${screenshots[@]}" | tail -1 | cut -f1)

printf '\n  before  %6d KB\n  after   %6d KB\n  saved   %6d KB (%d%%)\n' \
  "$before" "$after" "$((before - after))" "$(((before - after) * 100 / before))"
