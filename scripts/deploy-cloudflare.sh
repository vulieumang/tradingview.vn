#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."

ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-71903de62e5f4b67e36a8f0b273aa806}"
PROJECT_NAME="tradingview-vn"
DIST_DIR=".cf-dist"

if [ -d "$DIST_DIR" ]; then
    trash "$DIST_DIR"
fi

mkdir -p "$DIST_DIR"
cp index.html robots.txt sitemap.xml "$DIST_DIR/"
cp -R assets blog "$DIST_DIR/"

CLOUDFLARE_ACCOUNT_ID="$ACCOUNT_ID" npx --yes wrangler@latest pages deploy "$DIST_DIR" \
    --project-name="$PROJECT_NAME" \
    --branch=master
