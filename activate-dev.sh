#!/bin/bash

# Quick activation script for development environment
# Usage: source activate-dev.sh

if [ -d "venv" ]; then
    source venv/bin/activate
    echo "✓ Python virtual environment activated"
    echo ""
    echo "Available commands:"
    echo "  npm run dev              - Start development server"
    echo "  npm run build            - Build site"
    echo "  npm run optimize-images  - Optimize images"
    echo "  python scripts/backup-to-tsv.py - Backup to TSV"
    echo ""
    echo "To deactivate: type 'deactivate'"
else
    echo "Virtual environment not found. Run ./setup-dev-environment.sh first."
    exit 1
fi
