#!/bin/bash

# Development Environment Setup Script
# For Ubuntu/Debian (WSL2)

set -e  # Exit on error

echo "=========================================="
echo "Setting up development environment"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "Please do not run as root/sudo. Run as normal user."
    exit 1
fi

echo -e "${YELLOW}Step 1: Updating package lists${NC}"
sudo apt update

echo ""
echo -e "${YELLOW}Step 2: Installing Ruby and Bundler${NC}"
if ! command -v ruby &> /dev/null; then
    sudo apt install -y ruby-full ruby-bundler build-essential zlib1g-dev
    echo -e "${GREEN}✓ Ruby and Bundler installed${NC}"
else
    echo -e "${GREEN}✓ Ruby already installed${NC}"
fi

echo ""
echo -e "${YELLOW}Step 3: Installing Node.js and npm${NC}"
if ! command -v node &> /dev/null; then
    # Install Node.js 20.x (Active LTS)
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    echo -e "${GREEN}✓ Node.js and npm installed${NC}"
else
    echo -e "${GREEN}✓ Node.js already installed${NC}"
fi

echo ""
echo -e "${YELLOW}Step 4: Setting up Python virtual environment${NC}"
if ! command -v python3 &> /dev/null; then
    sudo apt install -y python3 python3-full python3-venv python3-pip
fi

# Create virtual environment
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo -e "${GREEN}✓ Python virtual environment created${NC}"
else
    echo -e "${GREEN}✓ Python virtual environment already exists${NC}"
fi

# Activate and install Python packages
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
echo -e "${GREEN}✓ Python packages installed in virtual environment${NC}"

echo ""
echo -e "${YELLOW}Step 5: Installing Ruby gems${NC}"
# Configure bundler to install gems in project directory (avoid permission issues)
bundle config set --local path 'vendor/bundle'
bundle install
echo -e "${GREEN}✓ Ruby gems installed${NC}"

echo ""
echo -e "${YELLOW}Step 6: Installing npm packages${NC}"
# Install system dependencies for Sharp image processing
sudo apt install -y libvips-dev
npm install
echo -e "${GREEN}✓ npm packages installed${NC}"

echo ""
echo -e "${YELLOW}Step 7: Installing pre-commit hooks${NC}"
# Install pre-commit in the virtual environment
pip install pre-commit
pre-commit install
echo -e "${GREEN}✓ Pre-commit hooks installed${NC}"

echo ""
echo "=========================================="
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "To activate the Python virtual environment in the future:"
echo "  source venv/bin/activate"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Installed versions:"
ruby --version
node --version
npm --version
python3 --version
echo ""
