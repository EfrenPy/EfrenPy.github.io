#!/bin/bash

# Script to upgrade jQuery to version 3.7.1
# This replaces the outdated jQuery 1.12.4 with the latest stable version

JQUERY_VERSION="3.7.1"
JQUERY_DIR="assets/js/vendor/jquery"
JQUERY_URL="https://code.jquery.com/jquery-${JQUERY_VERSION}.min.js"

echo "Upgrading jQuery to version ${JQUERY_VERSION}..."

# Create directory if it doesn't exist
mkdir -p "${JQUERY_DIR}"

# Download jQuery
echo "Downloading jQuery ${JQUERY_VERSION}..."
curl -L -o "${JQUERY_DIR}/jquery-${JQUERY_VERSION}.min.js" "${JQUERY_URL}"

if [ $? -eq 0 ]; then
    echo "jQuery ${JQUERY_VERSION} downloaded successfully!"

    # Remove old version
    if [ -f "${JQUERY_DIR}/jquery-1.12.4.min.js" ]; then
        echo "Removing old jQuery version..."
        rm "${JQUERY_DIR}/jquery-1.12.4.min.js"
    fi

    echo ""
    echo "jQuery upgrade complete!"
    echo "Please run 'npm run build:js' to rebuild the minified JavaScript bundle."
else
    echo "Error downloading jQuery. Please check your internet connection."
    exit 1
fi
