# Development Environment Setup

This guide will help you set up the development environment on WSL2/Ubuntu.

## Quick Setup (Recommended)

Run the automated setup script:

```bash
chmod +x setup-dev-environment.sh
./setup-dev-environment.sh
```

This will install all required dependencies automatically.

## Manual Setup

If you prefer to install manually or troubleshoot issues:

### 1. Install Ruby and Bundler

```bash
sudo apt update
sudo apt install -y ruby-full ruby-bundler build-essential zlib1g-dev
```

Verify installation:
```bash
ruby --version   # Should show Ruby 3.x
bundle --version
```

### 2. Install Node.js and npm

```bash
# Install Node.js 20.x LTS (Active LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify installation:
```bash
node --version   # Should show v20.x
npm --version
```

### 3. Set Up Python Virtual Environment

Ubuntu uses externally-managed Python, so we need a virtual environment:

```bash
# Install Python tools
sudo apt install -y python3 python3-full python3-venv python3-pip

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install Python packages
pip install --upgrade pip
pip install -r requirements.txt

# Install pre-commit
pip install pre-commit
pre-commit install
```

### 4. Install Ruby Gems

```bash
bundle install
```

### 5. Install npm Packages

```bash
npm install
```

## Daily Development

### Starting Work

```bash
# Activate Python environment (if needed)
source venv/bin/activate

# Start development server
npm run dev
```

Or just use the activation helper:
```bash
source activate-dev.sh
```

### Stopping Work

- Press `Ctrl+C` to stop the Jekyll server
- Type `deactivate` to exit Python virtual environment

## Troubleshooting

### Ruby Installation Issues

If you get permission errors:
```bash
# Don't use sudo with bundle install
# Instead, configure bundler to install in user directory
bundle config set --local path 'vendor/bundle'
bundle install
```

### Node.js Installation Issues

Alternative installation using nvm (Node Version Manager):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

### Python Virtual Environment

Always activate before using Python tools:
```bash
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt when activated.

## Verifying Installation

Run this to check all tools are installed:

```bash
echo "Ruby: $(ruby --version)"
echo "Bundler: $(bundle --version)"
echo "Node: $(node --version)"
echo "npm: $(npm --version)"
echo "Python: $(python3 --version)"
source venv/bin/activate && echo "Virtual env: ✓" || echo "Virtual env: ✗"
```

## Next Steps

After setup is complete:

1. **Test the build**:
   ```bash
   npm run build
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Visit**: http://localhost:4000

## Common Commands

```bash
# Development server
npm run dev

# Build site
npm run build

# Build JavaScript only
npm run build:js

# Optimize images
npm run optimize-images

# Backup to TSV
source venv/bin/activate
python scripts/backup-to-tsv.py

# Generate from BibTeX
source venv/bin/activate
cd markdown_generator
python pubsFromBib_enhanced.py
```

## IDE Setup

### VS Code

Install recommended extensions:
- Ruby
- Python
- Jekyll Snippets
- YAML
- Markdown All in One

### Setting Python Interpreter

In VS Code, press `Ctrl+Shift+P` and select "Python: Select Interpreter", then choose the one in `./venv/bin/python`.

## Windows-Specific Notes

Since you're using WSL2:

1. **File permissions**: Windows files mounted in WSL may have permission issues. Keep your project in WSL filesystem (`~/Projects/`) rather than Windows filesystem (`/mnt/c/`).

2. **Git line endings**: Already configured in `.gitignore`, but ensure:
   ```bash
   git config --global core.autocrlf input
   ```

3. **Performance**: WSL2 is much faster when working with files in WSL filesystem.

## Getting Help

- Check logs if build fails
- Ensure virtual environment is activated for Python commands
- Run `bundle exec jekyll build --verbose` for detailed errors
- Check GitHub Actions logs for CI/CD issues
