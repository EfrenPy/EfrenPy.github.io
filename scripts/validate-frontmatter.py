#!/usr/bin/env python3
"""
Validate YAML front matter in markdown files

This script checks that markdown files in Jekyll collections have valid
YAML front matter with required fields.
"""

import sys
import re
import yaml
from pathlib import Path


REQUIRED_FIELDS = {
    "_publications": ["title", "collection", "permalink", "date"],
    "_talks": ["title", "collection", "permalink", "date"],
    "_teaching": ["title", "collection", "permalink"],
    "_portfolio": ["title", "collection", "permalink"],
    "_personal": ["title", "collection", "permalink", "date"],
    "_posts": ["title", "date", "permalink"],
}


def extract_frontmatter(content):
    """Extract YAML front matter from markdown content"""
    # Match YAML front matter between --- delimiters
    match = re.match(r"^---\s*\n(.*?\n)---\s*\n", content, re.DOTALL)
    if match:
        return match.group(1)
    return None


def validate_file(filepath):
    """Validate a single markdown file"""
    path = Path(filepath)

    # Determine collection from path
    collection = None
    for part in path.parts:
        if part.startswith("_") and part in REQUIRED_FIELDS:
            collection = part
            break

    if not collection:
        # Not a collection file, skip
        return True, "Not a collection file"

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        frontmatter_text = extract_frontmatter(content)
        if not frontmatter_text:
            return False, "No YAML front matter found"

        # Parse YAML
        try:
            frontmatter = yaml.safe_load(frontmatter_text)
        except yaml.YAMLError as e:
            return False, f"Invalid YAML: {e}"

        if not isinstance(frontmatter, dict):
            return False, "Front matter is not a dictionary"

        # Check required fields
        missing_fields = []
        required = REQUIRED_FIELDS.get(collection, [])

        for field in required:
            if field not in frontmatter or not frontmatter[field]:
                missing_fields.append(field)

        if missing_fields:
            return False, f"Missing required fields: {', '.join(missing_fields)}"

        # Validate date format if present
        if "date" in frontmatter:
            date_str = str(frontmatter["date"])
            if not re.match(r"\d{4}-\d{2}-\d{2}", date_str):
                return False, f"Invalid date format: {date_str} (should be YYYY-MM-DD)"

        return True, "Valid"

    except Exception as e:
        return False, f"Error reading file: {e}"


def main():
    """Main validation function"""
    if len(sys.argv) < 2:
        print("Usage: validate-frontmatter.py <file1> [file2] ...")
        sys.exit(1)

    all_valid = True
    for filepath in sys.argv[1:]:
        valid, message = validate_file(filepath)
        if not valid:
            print(f"❌ {filepath}: {message}")
            all_valid = False
        else:
            print(f"✓ {filepath}: {message}")

    if not all_valid:
        sys.exit(1)


if __name__ == "__main__":
    main()
