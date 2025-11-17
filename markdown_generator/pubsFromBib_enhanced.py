#!/usr/bin/env python
# coding: utf-8

"""
Enhanced Publications markdown generator from BibTeX files

This script imports publications from BibTeX files and generates markdown files
for the Jekyll academic website. It supports multiple publication types,
DOI links, arXiv IDs, and more flexible configuration.

Usage:
    python pubsFromBib_enhanced.py [--config config.yml]
"""

import argparse
import os
import re
from pathlib import Path

import yaml

try:
    import bibtexparser
    from bibtexparser.bparser import BibTexParser
    from bibtexparser.customization import convert_to_unicode
except ImportError:
    print("Error: bibtexparser not installed. Install with: pip install bibtexparser")
    print("Falling back to basic implementation...")
    import sys

    sys.exit(1)


class BibTeXToMarkdown:
    """Convert BibTeX entries to Jekyll markdown files"""

    MONTH_ABBR = {
        "jan": "01",
        "feb": "02",
        "mar": "03",
        "apr": "04",
        "may": "05",
        "jun": "06",
        "jul": "07",
        "aug": "08",
        "sep": "09",
        "oct": "10",
        "nov": "11",
        "dec": "12",
    }

    def __init__(self, config_file=None):
        """Initialize with optional configuration file"""
        self.config = self._load_config(config_file)
        self.output_dir = Path(self.config.get("output_dir", "../_publications"))
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def _load_config(self, config_file):
        """Load configuration from YAML file or use defaults"""
        default_config = {
            "bib_files": {
                "journal": {
                    "file": "pubs.bib",
                    "venue_key": "journal",
                    "venue_prefix": "",
                },
                "conference": {
                    "file": "proceedings.bib",
                    "venue_key": "booktitle",
                    "venue_prefix": "In ",
                },
            },
            "output_dir": "../_publications",
            "collection": "publications",
            "permalink_base": "/publication/",
        }

        if config_file and os.path.exists(config_file):
            with open(config_file, "r") as f:
                user_config = yaml.safe_load(f)
                default_config.update(user_config)

        return default_config

    def _clean_text(self, text):
        """Remove BibTeX formatting characters"""
        if not text:
            return ""
        return text.replace("{", "").replace("}", "").replace("\\", "").strip()

    def _escape_yaml(self, text):
        """Escape special characters for YAML"""
        if not text:
            return ""
        # Replace quotes and handle special characters
        text = text.replace('"', '\\"')
        return text

    def _parse_date(self, entry):
        """Extract publication date from BibTeX entry"""
        year = entry.get("year", "1900")
        month = entry.get("month", "01")
        day = entry.get("day", "01")

        # Convert month name to number
        if isinstance(month, str) and month.lower()[:3] in self.MONTH_ABBR:
            month = self.MONTH_ABBR[month.lower()[:3]]
        elif isinstance(month, str) and len(month) < 2:
            month = f"0{month}"

        return f"{year}-{month[-2:]}-{day.zfill(2)}"

    def _create_url_slug(self, title):
        """Create URL-friendly slug from title"""
        clean = self._clean_text(title)
        slug = re.sub(r"[^a-zA-Z0-9\s-]", "", clean)
        slug = re.sub(r"[\s]+", "-", slug)
        slug = slug.lower().strip("-")
        return slug[:100]  # Limit length

    def _format_authors(self, entry):
        """Format author list from BibTeX entry"""
        authors = entry.get("author", "")
        if not authors:
            return ""

        # Simple author parsing (can be improved)
        author_list = [a.strip() for a in authors.split(" and ")]
        if len(author_list) > 3:
            return f"{author_list[0]} et al."
        return ", ".join(author_list)

    def _get_paper_url(self, entry):
        """Extract paper URL from various BibTeX fields"""
        # Priority: doi > url > arxiv
        if "doi" in entry:
            return f"https://doi.org/{entry['doi']}"
        elif "url" in entry:
            return entry["url"]
        elif "arxiv" in entry:
            return f"https://arxiv.org/abs/{entry['arxiv']}"
        return None

    def _generate_citation(self, entry, venue):
        """Generate formatted citation"""
        authors = self._format_authors(entry)
        title = self._clean_text(entry.get("title", ""))
        year = entry.get("year", "")

        citation = f'{authors}. "{title}." {venue}, {year}.'
        return citation

    def convert_entry(self, entry, pub_type_config):
        """Convert a single BibTeX entry to markdown"""
        try:
            # Extract basic information
            title = self._clean_text(entry.get("title", ""))
            pub_date = self._parse_date(entry)
            url_slug = self._create_url_slug(title)

            # Get venue information
            venue_key = pub_type_config["venue_key"]
            venue_prefix = pub_type_config.get("venue_prefix", "")
            venue = venue_prefix + self._clean_text(entry.get(venue_key, ""))

            # Generate filenames
            filename = f"{pub_date}-{url_slug}.md"

            # Build YAML front matter
            md = "---\n"
            md += f'title: "{self._escape_yaml(title)}"\n'
            md += f"collection: {self.config['collection']}\n"
            md += f"permalink: {self.config['permalink_base']}{url_slug}\n"

            # Add excerpt if available
            if "abstract" in entry:
                abstract = self._clean_text(entry["abstract"])[:200]
                md += f"excerpt: '{self._escape_yaml(abstract)}...'\n"

            md += f"date: {pub_date}\n"
            md += f"venue: '{self._escape_yaml(venue)}'\n"

            # Add paper URL
            paper_url = self._get_paper_url(entry)
            if paper_url:
                md += f"paperurl: '{paper_url}'\n"

            # Add DOI if available
            if "doi" in entry:
                md += f"link: 'https://doi.org/{entry['doi']}'\n"

            # Add citation
            citation = self._generate_citation(entry, venue)
            md += f"citation: '{self._escape_yaml(citation)}'\n"

            # Add author information for display
            authors = self._format_authors(entry)
            year = entry.get("year", "")
            escaped_authors = self._escape_yaml(authors)
            escaped_venue = self._escape_yaml(venue)
            md += f"smallinfo: '({year}) {escaped_authors}. "
            md += f"<b><i>{escaped_venue}</i></b>'\n"

            md += "---\n\n"

            # Add body content
            if "abstract" in entry:
                md += "## Abstract\n\n"
                md += self._clean_text(entry["abstract"]) + "\n\n"

            if paper_url:
                md += f"[Download paper here]({paper_url})\n\n"

            # Add recommended citation
            md += f"Recommended citation: {citation}\n"

            # Write file
            output_path = self.output_dir / filename
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(md)

            return True, title

        except Exception as e:
            return False, f"Error: {str(e)}"

    def process_bib_file(self, bib_path, pub_type_config):
        """Process a single BibTeX file"""
        if not os.path.exists(bib_path):
            print(f"Warning: File {bib_path} not found, skipping...")
            return

        print(f"\nProcessing {bib_path}...")

        with open(bib_path, "r", encoding="utf-8") as f:
            parser = BibTexParser(common_strings=True)
            parser.customization = convert_to_unicode
            bib_database = bibtexparser.load(f, parser=parser)

        success_count = 0
        error_count = 0

        for entry in bib_database.entries:
            success, message = self.convert_entry(entry, pub_type_config)
            if success:
                print(f"  ✓ Converted: {message[:60]}")
                success_count += 1
            else:
                print(f"  ✗ Failed: {message}")
                error_count += 1

        print(f"\nCompleted: {success_count} successful, {error_count} failed")

    def run(self):
        """Process all configured BibTeX files"""
        print("Starting BibTeX to Markdown conversion...")
        print(f"Output directory: {self.output_dir}")

        for pub_type, config in self.config["bib_files"].items():
            bib_file = config["file"]
            self.process_bib_file(bib_file, config)

        print("\n✓ All files processed!")


def main():
    parser = argparse.ArgumentParser(
        description="Convert BibTeX files to Jekyll markdown publications"
    )
    parser.add_argument(
        "--config", help="Path to YAML configuration file", default=None
    )
    args = parser.parse_args()

    converter = BibTeXToMarkdown(config_file=args.config)
    converter.run()


if __name__ == "__main__":
    main()
