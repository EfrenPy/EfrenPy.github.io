#!/bin/bash

# Fix npm packages and dependencies

set -e

echo "=========================================="
echo "Fixing npm packages"
echo "=========================================="
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Step 1: Installing system dependencies for Sharp${NC}"
sudo apt update
sudo apt install -y libvips-dev
echo -e "${GREEN}✓ System dependencies installed${NC}"

echo ""
echo -e "${YELLOW}Step 2: Cleaning old npm packages${NC}"
rm -rf node_modules package-lock.json
echo -e "${GREEN}✓ Cleaned${NC}"

echo ""
echo -e "${YELLOW}Step 3: Installing fresh npm packages${NC}"
npm install
echo -e "${GREEN}✓ npm packages installed${NC}"

echo ""
echo "=========================================="
echo -e "${GREEN}✓ npm packages fixed!${NC}"
echo "=========================================="
echo ""
echo "You can now use:"
echo "  npm run build:js         - Build JavaScript"
echo "  npm run optimize-images  - Optimize images"
echo "  npm run dev              - Start development server"
echo ""
