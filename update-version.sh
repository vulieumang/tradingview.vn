#!/bin/bash
# Script to automatically update version numbers in index.html

# Get current timestamp as version
VERSION=$(date +%Y%m%d%H%M%S)

echo "Updating version to: $VERSION"

# Update CSS version
sed -i '' "s/styles\.css?v=[0-9]*/styles.css?v=$VERSION/g" index.html

# Update JS version
sed -i '' "s/script\.js?v=[0-9]*/script.js?v=$VERSION/g" index.html

echo "✅ Version updated successfully!"
echo "CSS: styles.css?v=$VERSION"
echo "JS: script.js?v=$VERSION"
