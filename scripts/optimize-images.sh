#!/usr/bin/env bash
# Compatibility entry point: generate responsive copies without altering originals.
set -euo pipefail
cd "$(dirname "$0")/.."
exec node scripts/generate-responsive-images.mjs
