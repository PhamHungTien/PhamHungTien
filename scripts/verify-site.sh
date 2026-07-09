#!/usr/bin/env bash
# Checks the invariants that have actually broken before:
#   - every product page keeps its own canonical (a redirect stub once clobbered them)
#   - the published tree never contains raw source (Pages once served src/firebase.ts)
#
#   ./scripts/verify-site.sh [_site]
set -euo pipefail

cd "$(dirname "$0")/.."
site="${1:-_site}"
fail=0

note() { printf '  %s %s\n' "$1" "$2"; }

expect_contains() {
  if grep -qF "$2" "$1"; then note "✓" "$3"; else note "✗" "$3 — missing: $2"; fail=1; fi
}

expect_contains "$site/index.html" '<link rel="canonical" href="https://phamhungtien.com/" />' "/ canonical"

for app in LunarV LunarBlock PadCodeAI PadNotesAI MyNASManager; do
  page="$site/$app/index.html"
  expect_contains "$page" "<link rel=\"canonical\" href=\"https://phamhungtien.com/$app/\" />" "/$app/ canonical"
  expect_contains "$page" 'application/ld+json' "/$app/ structured data"
  if grep -qF 'http-equiv="refresh"' "$page"; then
    note "✗" "/$app/index.html was overwritten by a redirect stub"
    fail=1
  fi
done

for f in sitemap.xml robots.txt CNAME .nojekyll 404.html og/home.png PHTV/index.html phtv/index.html; do
  if [ -f "$site/$f" ]; then note "✓" "$f"; else note "✗" "missing $f"; fail=1; fi
done

# PHTV must be the built app, not the source shell.
if grep -qF 'src="/index.tsx"' "$site/PHTV/index.html"; then
  note "✗" "PHTV/index.html is the unbuilt source"
  fail=1
else
  note "✓" "PHTV/index.html is built"
fi

for leaked in src/main.tsx src/seo.ts PHTV/src/firebase.ts PHTV/index.tsx package.json; do
  if [ -e "$site/$leaked" ]; then note "✗" "raw source published: $leaked"; fail=1; fi
done
note "✓" "no raw source in tree"

echo
if [ "$fail" -eq 0 ]; then echo "✅ $site passes"; else echo "❌ $site failed"; fi
exit "$fail"
