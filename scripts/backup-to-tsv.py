#!/usr/bin/env python3
"""
Backup Markdown to TSV

This script extracts data from markdown files in Jekyll collections
and creates backup TSV files. This provides redundancy and allows
easy bulk editing of content.
"""

import re
import csv
from pathlib import Path
from datetime import datetime


def extract_frontmatter(content):
    """Extract YAML front matter from markdown"""
    match = re.match(r"^---\s*\n(.*?\n)---\s*\n(.*)", content, re.DOTALL)
    if match:
        frontmatter_text = match.group(1)
        body = match.group(2).strip()

        # Parse YAML manually (simple key: value pairs)
        frontmatter = {}
        for line in frontmatter_text.split("\n"):
            if ":" in line:
                key, value = line.split(":", 1)
                key = key.strip()
                value = value.strip().strip('"').strip("'")
                frontmatter[key] = value

        return frontmatter, body
    return {}, content


def backup_publications():
    """Backup publications to TSV"""
    pub_dir = Path("_publications")
    if not pub_dir.exists():
        print("No _publications directory found")
        return

    output_file = "markdown_generator/publications_backup.tsv"

    publications = []

    for md_file in pub_dir.glob("*.md"):
        try:
            with open(md_file, "r", encoding="utf-8") as f:
                content = f.read()

            frontmatter, body = extract_frontmatter(content)

            # Extract common fields
            pub = {
                "pub_date": frontmatter.get("date", ""),
                "title": frontmatter.get("title", ""),
                "venue": frontmatter.get("venue", ""),
                "excerpt": frontmatter.get("excerpt", ""),
                "citation": frontmatter.get("citation", ""),
                "url_slug": frontmatter.get("permalink", "").split("/")[-1],
                "paper_url": frontmatter.get("paperurl", ""),
            }

            publications.append(pub)

        except Exception as e:
            print(f"Error processing {md_file}: {e}")

    # Sort by date
    publications.sort(key=lambda x: x["pub_date"], reverse=True)

    # Write to TSV
    if publications:
        with open(output_file, "w", newline="", encoding="utf-8") as f:
            fieldnames = [
                "pub_date",
                "title",
                "venue",
                "excerpt",
                "citation",
                "url_slug",
                "paper_url",
            ]
            writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter="\t")
            writer.writeheader()
            writer.writerows(publications)

        print(f"✓ Backed up {len(publications)} publications to {output_file}")
    else:
        print("No publications found")


def backup_talks():
    """Backup talks to TSV"""
    talks_dir = Path("_talks")
    if not talks_dir.exists():
        print("No _talks directory found")
        return

    output_file = "markdown_generator/talks_backup.tsv"

    talks = []

    for md_file in talks_dir.glob("*.md"):
        try:
            with open(md_file, "r", encoding="utf-8") as f:
                content = f.read()

            frontmatter, body = extract_frontmatter(content)

            # Extract common fields
            talk = {
                "title": frontmatter.get("title", ""),
                "collection": frontmatter.get("collection", "talks"),
                "type": frontmatter.get("type", ""),
                "permalink": frontmatter.get("permalink", ""),
                "venue": frontmatter.get("venue", ""),
                "date": frontmatter.get("date", ""),
                "location": frontmatter.get("location", ""),
            }

            talks.append(talk)

        except Exception as e:
            print(f"Error processing {md_file}: {e}")

    # Sort by date
    talks.sort(key=lambda x: x["date"], reverse=True)

    # Write to TSV
    if talks:
        with open(output_file, "w", newline="", encoding="utf-8") as f:
            fieldnames = [
                "title",
                "collection",
                "type",
                "permalink",
                "venue",
                "date",
                "location",
            ]
            writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter="\t")
            writer.writeheader()
            writer.writerows(talks)

        print(f"✓ Backed up {len(talks)} talks to {output_file}")
    else:
        print("No talks found")


def main():
    """Main backup function"""
    print(f"Starting backup at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    backup_publications()
    backup_talks()

    print("=" * 60)
    print("✓ Backup complete!")


if __name__ == "__main__":
    main()
