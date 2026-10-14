#!/usr/bin/env bash
# Publishes the site straight from this machine, without GitHub Actions.
#
# Use when Actions runners are unavailable and the site is down.
#
#   ./scripts/deploy-local.sh
#
# macOS-only. It copies the build onto a temporary case-sensitive volume so the
# lowercase alias pages (/phtv/ next to /PHTV/) can be added, then writes the gh-pages
# commit with git plumbing so the branch is never checked out into this working tree.
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

echo "==> Mounting case-sensitive volume"
hdiutil create -size 500m -fs "Case-sensitive APFS" -volname "$volume" -quiet "$image"
hdiutil attach "$image" -quiet
site="/Volumes/$volume/_site"

echo "==> Assembling"
mkdir -p "$site"
cp -R dist/. "$site/"
node scripts/postbuild.mjs "$site"

echo "==> Verifying"
node scripts/verify.mjs "$site"

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
