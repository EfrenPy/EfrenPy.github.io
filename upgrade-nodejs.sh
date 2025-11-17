#!/bin/bash

# Upgrade Node.js from 18 to 20

set -e

echo "=========================================="
echo "Upgrading Node.js to version 20 LTS"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Step 1: Removing Node.js 18${NC}"
sudo apt remove -y nodejs
sudo apt autoremove -y
echo -e "${GREEN}✓ Node.js 18 removed${NC}"

echo ""
echo -e "${YELLOW}Step 2: Installing Node.js 20 LTS${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
echo -e "${GREEN}✓ Node.js 20 installed${NC}"

echo ""
echo -e "${YELLOW}Step 3: Verifying installation${NC}"
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

echo ""
echo -e "${YELLOW}Step 4: Installing npm packages${NC}"
npm install
echo -e "${GREEN}✓ npm packages installed${NC}"

echo ""
echo "=========================================="
echo -e "${GREEN}✓ Upgrade Complete!${NC}"
echo "=========================================="
echo ""
echo "Node.js has been upgraded to version 20"
node --version
