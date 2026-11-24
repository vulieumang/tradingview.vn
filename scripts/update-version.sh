#!/bin/bash
# Script to automatically update version numbers in index.html

# Change paths relative to root directory
cd "$(dirname "$0")/.."

# Get current timestamp as version
VERSION=$(date +%Y%m%d%H%M%S)

echo "Updating version to: $VERSION"

# Update every versioned homepage stylesheet and script, including translations.
python3 - "$VERSION" <<'PY'
import re
import sys
from pathlib import Path

page = Path('index.html')
page.write_text(re.sub(
    r'(assets/(?:css|js)/[\w.-]+\.(?:css|js)\?v=)\d+',
    lambda match: match[1] + sys.argv[1],
    page.read_text(),
))
PY

echo "✅ Version updated successfully!"
echo "All homepage CSS and JS assets now use version $VERSION"
