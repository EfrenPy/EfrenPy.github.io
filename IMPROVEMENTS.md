# Project Improvements

This document summarizes the improvements made to the academic website project.

## Overview

All recommended improvements have been implemented to modernize the codebase, improve security, and enhance the development workflow.

## 1. Updated Dependencies

### npm Packages
- **terser** (5.36.0): Replaced outdated uglify-js (2.6.1) for modern JavaScript minification
- **npm-run-all** (4.1.5): Updated from 1.7.0
- **onchange** (7.1.0): Updated from 2.2.0
- **imagemin** packages: Added for image optimization

### Node.js Requirement
- Minimum version updated from 0.10.0 to 16.0.0

### Package.json Updates
- Repository URL updated to reflect this project
- New scripts added: `dev`, `build`, `serve`, `optimize-images`
- Author and homepage information updated

## 2. Version Control Improvements

### .gitignore Enhancements
- **Removed** `Gemfile.lock` from exclusions (enables reproducible builds)
- **Added** comprehensive ignores for:
  - Node modules
  - Python cache files
  - Jupyter checkpoints
  - Editor files (.vscode, .idea)
  - OS files (.DS_Store)
  - Environment files

## 3. Python Environment

### requirements.txt
Created with all necessary dependencies:
- Jupyter notebook support
- pandas for data manipulation
- geopy and getorg for talk maps
- bibtexparser for enhanced BibTeX import
- PyYAML for configuration

### Installation
```bash
pip install -r requirements.txt
```

## 4. GitHub Actions CI/CD

### Build and Deploy Workflow (.github/workflows/jekyll.yml)
- Automated Jekyll builds on push to master
- JavaScript bundling
- Automatic deployment to GitHub Pages
- Pull request validation

### Test Workflow (.github/workflows/test.yml)
- HTML validation with html-proofer
- Checks for broken internal links
- Runs on all pushes and pull requests

### Image Optimization (.github/workflows/optimize-images.yml)
- Manual trigger workflow
- Compresses JPEG and PNG images
- Calculates size reduction
- Optional automatic commit or artifact upload

### TSV Backup (.github/workflows/backup-tsv.yml)
- Weekly automated backups (Sundays)
- Triggers on publication/talk changes
- Backs up markdown to TSV format
- Stores artifacts for 90 days

## 5. jQuery Upgrade

### Version Update
- **Old**: jQuery 1.12.4 (2016, security vulnerabilities)
- **New**: jQuery 3.7.1 (2024, secure and modern)

### Implementation
- Created `scripts/upgrade-jquery.sh` for easy upgrades
- Downloaded and replaced jQuery file
- Updated package.json build script

### To rebuild JavaScript
```bash
npm run build:js
```

## 6. Enhanced BibTeX Support

### New Script: pubsFromBib_enhanced.py
Features:
- Uses modern `bibtexparser` library
- Support for DOI, arXiv, URL links
- Abstract extraction
- YAML configuration file support
- Better error handling and reporting
- Multiple publication types (journals, conferences, preprints)

### Configuration
- Example config: `bibtex_config.example.yml`
- Customizable output directory and field mappings
- Flexible venue formatting

### Usage
```bash
python markdown_generator/pubsFromBib_enhanced.py --config bibtex_config.yml
```

## 7. Pre-commit Hooks

### Configuration (.pre-commit-config.yaml)
Automated checks before each commit:
- Trailing whitespace removal
- YAML/JSON validation
- Large file detection
- Private key detection
- Markdown linting (with academic-friendly settings)
- Python code formatting (Black)
- Python linting (Flake8)
- YAML front matter validation

### Installation
```bash
pip install pre-commit
pre-commit install
```

### Manual Run
```bash
pre-commit run --all-files
```

## 8. Image Optimization

### Script: scripts/optimize-images.js
- Optimizes JPEG files (85% quality, progressive)
- Optimizes PNG files (60-80% quality range)
- Creates `images-optimized/` directory for review
- Preserves originals until confirmed

### Usage
```bash
npm run optimize-images
```

### Automated Workflow
Manual trigger via GitHub Actions interface with optional auto-commit.

## 9. TSV Backup System

### Script: scripts/backup-to-tsv.py
Extracts data from markdown files and creates TSV backups:
- Publications → `publications_backup.tsv`
- Talks → `talks_backup.tsv`

### Features
- Automatic extraction of YAML front matter
- Sorted by date (newest first)
- Provides data redundancy
- Enables bulk editing workflows

### Usage
```bash
python scripts/backup-to-tsv.py
```

## Quick Start Guide

### First Time Setup

1. **Install dependencies**:
```bash
# Ruby dependencies
bundle install

# Node dependencies
npm install

# Python dependencies
pip install -r requirements.txt

# Pre-commit hooks
pip install pre-commit
pre-commit install
```

2. **Verify installation**:
```bash
# Test Jekyll build
bundle exec jekyll build

# Test JavaScript build
npm run build:js

# Test pre-commit hooks
pre-commit run --all-files
```

### Development Workflow

1. **Start local server**:
```bash
npm run dev
# or
bundle exec jekyll serve --config _config.yml,_config.dev.yml
```

2. **Make changes** to content or code

3. **Pre-commit hooks** run automatically on commit

4. **Push to GitHub** triggers CI/CD pipeline

### Common Tasks

**Add publication from BibTeX**:
```bash
cd markdown_generator
python pubsFromBib_enhanced.py
```

**Optimize images**:
```bash
npm run optimize-images
```

**Backup to TSV**:
```bash
python scripts/backup-to-tsv.py
```

**Run tests locally**:
```bash
bundle exec jekyll build
gem install html-proofer
htmlproofer ./_site --disable-external
```

## Next Steps

### Recommended Actions

1. **Install Gemfile.lock**: Run `bundle install` to create the lock file, then commit it
2. **Install npm packages**: Run `npm install` to install updated dependencies
3. **Test the build**: Verify everything works with `npm run build`
4. **Setup pre-commit**: Install hooks with `pre-commit install`
5. **Configure GitHub Actions**: Ensure repository permissions allow GitHub Pages deployment

### Optional Enhancements

1. **Setup BibTeX workflow**: If you use BibTeX, create `bibtex_config.yml` and add your .bib files
2. **Optimize existing images**: Run `npm run optimize-images` on current image library
3. **Create initial backup**: Run `python scripts/backup-to-tsv.py` to create baseline TSV files

## Maintenance

### Regular Tasks

- **Weekly**: Review TSV backups (automated)
- **Monthly**: Update dependencies (`bundle update`, `npm update`)
- **Quarterly**: Review and optimize images
- **As needed**: Run pre-commit hooks on all files: `pre-commit run --all-files`

### Updating Dependencies

**Ruby gems**:
```bash
bundle update
bundle exec jekyll build  # Test
```

**npm packages**:
```bash
npm update
npm run build  # Test
```

**Python packages**:
```bash
pip install -r requirements.txt --upgrade
```

## Support

For issues or questions:
- GitHub Issues: https://github.com/EfrenPy/EfrenPy.github.io/issues
- Jekyll Documentation: https://jekyllrb.com/docs/
- Minimal Mistakes Theme: https://mmistakes.github.io/minimal-mistakes/

---

All improvements implemented by Claude Code on 2025-11-16.
