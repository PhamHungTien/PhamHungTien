#!/usr/bin/env bash
# Assembles the publishable site tree from the already-built outputs.
#
#   npm run build            -> dist/ (prerendered) + dist-aliases/
#   npm run build:phtv       -> PHTV/dist/
#   ./scripts/build-site.sh  -> _site/
#
# Pass a different output directory as $1. Used by CI and by scripts/deploy-local.sh.
set -euo pipefail

cd "$(dirname "$0")/.."
out="${1:-_site}"

for required in dist/index.html dist-aliases PHTV/dist/index.html; do
  if [ ! -e "$required" ]; then
    echo "error: $required is missing. Run 'npm run build && npm run build:phtv' first." >&2
    exit 1
  fi
done

# The lowercase alias stubs (/phtv/) must coexist with the real routes (/PHTV/).
# On a case-insensitive filesystem — macOS by default — one silently overwrites the
# other, and the product pages get replaced by redirect stubs. Probe the filesystem
# the output lands on, which is not necessarily this repo's or $TMPDIR's.
out_parent="$(cd "$(dirname "$out")" && pwd)"
probe="$out_parent/.case-probe.$$"
rm -rf "$probe"
mkdir -p "$probe/Aa"
if mkdir "$probe/aA" 2>/dev/null; then case_sensitive=1; else case_sensitive=0; fi
rm -rf "$probe"

if [ "$case_sensitive" -ne 1 ]; then
  echo "error: $out_parent is on a case-insensitive filesystem." >&2
  echo "       /PHTV/ and /phtv/ cannot both exist there. Use ./scripts/deploy-local.sh," >&2
  echo "       which assembles the tree on a case-sensitive volume." >&2
  exit 1
fi

rm -rf "$out"
mkdir -p "$out"

# dist/ already holds a real, per-route index.html for every product page
# (see scripts/prerender.mjs) plus og/ cards and a generated sitemap.xml.
cp -r dist/. "$out/"

# Root-level SEO and hosting files. CNAME must be present or the custom domain drops.
cp 404.html CNAME robots.txt ads.txt .nojekyll "$out/"
cp assets/phtv-icon.webp "$out/icon.webp"
# GitHub Pages ignores both of these; kept only so a move to Netlify or Apache would
# still redirect. The live mechanism is the alias stubs copied in last.
cp _redirects .htaccess "$out/"

# Shared stylesheets and images used by the static legal pages. Vite's hashed
# filenames never collide with these source names.
mkdir -p "$out/assets"
cp -r assets/. "$out/assets/"

# Legal pages and per-app assets. index.html is NOT copied here: the prerendered
# one from dist/ must survive.
for app in LunarV LunarBlock PadCodeAI PadNotesAI MyNASManager; do
  cp "$app/privacy.html" "$out/$app/privacy.html"
  cp "$app/terms.html" "$out/$app/terms.html"
  cp -r "$app/assets" "$out/$app/assets"
done

# PHTV is a separate Vite app with its own head and index.html.
cp -r PHTV/dist "$out/PHTV"

# Lowercase redirect stubs, written last.
cp -r dist-aliases/. "$out/"

echo "✓ assembled $out ($(find "$out" -type f | wc -l | tr -d ' ') files)"
