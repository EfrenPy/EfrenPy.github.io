# Markdown Generator Tools

This directory contains tools to generate markdown files for Jekyll collections from various data sources.

## Publications from TSV

The `.ipynb` files are Jupyter notebook files that convert a TSV containing structured data about publications into individual markdown files. The notebooks contain detailed documentation. The `.py` files are pure Python scripts that do the same thing and can be executed directly in a terminal.

## Publications from BibTeX

### Enhanced BibTeX Importer (Recommended)

**File:** `pubsFromBib_enhanced.py`

Modern, feature-rich BibTeX to markdown converter with support for:
- DOI, arXiv, and URL links
- Multiple publication types (journals, conferences, preprints)
- Abstract extraction
- Flexible configuration via YAML
- Better error handling and reporting

**Usage:**

```bash
# Install dependencies first
pip install bibtexparser pyyaml

# Run with default configuration
python pubsFromBib_enhanced.py

# Run with custom configuration
cp bibtex_config.example.yml bibtex_config.yml
# Edit bibtex_config.yml as needed
python pubsFromBib_enhanced.py --config bibtex_config.yml
```

### Legacy BibTeX Importer

**File:** `pubsFromBib.py`

Original importer using pybtex. Still functional but less feature-rich.

## Talks from TSV

The `talks.tsv` file contains structured data about talks and presentations. Use `talks.ipynb` or `talks.py` to convert to markdown.
