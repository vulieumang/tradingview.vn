#!/bin/bash
# Script to automatically update version numbers in index.html

# Change paths relative to root directory
cd "$(dirname "$0")/.."

# Get current timestamp as version
VERSION=$(date +%Y%m%d%H%M%S)

echo "Updating version to: $VERSION"

# Update CSS version
sed -i '' "s|assets/css/styles\\.css?v=[0-9]*|assets/css/styles.css?v=$VERSION|g" index.html

# Update JS version
sed -i '' "s|assets/js/script\\.js?v=[0-9]*|assets/js/script.js?v=$VERSION|g" index.html

echo "✅ Version updated successfully!"
echo "CSS: assets/css/styles.css?v=$VERSION"
echo "JS: assets/js/script.js?v=$VERSION"
