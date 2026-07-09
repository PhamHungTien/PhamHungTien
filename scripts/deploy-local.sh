#!/usr/bin/env bash
# Publishes the site straight from this machine, without GitHub Actions.
#
# Use when Actions runners are unavailable and the site is down.
#
#   ./scripts/deploy-local.sh
#
# macOS-only. It mounts a temporary case-sensitive volume because /PHTV/ and /phtv/
# cannot coexist on APFS, then writes the gh-pages commit with git plumbing so the
# branch is never checked out into this (case-insensitive) working tree.
set -euo pipefail

cd "$(dirname "$0")/.."
repo="$(pwd)"
branch="gh-pages"
volume="PHTVDeploy"
image="$(mktemp -u /tmp/phtv-deploy-XXXX).dmg"

cleanup() {
  hdiutil detach "/Volumes/$volume" -quiet 2>/dev/null || true
  rm -f "$image"
  rm -f "$repo/.git/deploy.index"
}
trap cleanup EXIT

echo "==> Building"
npm run build
npm run build:phtv

echo "==> Mounting case-sensitive volume"
hdiutil create -size 500m -fs "Case-sensitive APFS" -volname "$volume" -quiet "$image"
hdiutil attach "$image" -quiet
site="/Volumes/$volume/_site"

echo "==> Assembling"
./scripts/build-site.sh "$site"

echo "==> Verifying"
./scripts/verify-site.sh "$site"

echo "==> Committing to $branch"
export GIT_DIR="$repo/.git"
export GIT_INDEX_FILE="$repo/.git/deploy.index"
export GIT_WORK_TREE="$site"
rm -f "$GIT_INDEX_FILE"

git -c core.ignorecase=false add -A
tree="$(git write-tree)"
commit="$(git commit-tree "$tree" -m "deploy: $(git rev-parse --short HEAD 2>/dev/null || echo local) (built locally)")"
git update-ref "refs/heads/$branch" "$commit"

unset GIT_DIR GIT_INDEX_FILE GIT_WORK_TREE
echo "==> Pushing"
git push --force origin "refs/heads/$branch:refs/heads/$branch"

echo
echo "✓ pushed $branch. GitHub Pages will rebuild in a minute or two."
echo "  Watch: gh api repos/PhamHungTien/PhamHungTien/pages/builds/latest --jq .status"
