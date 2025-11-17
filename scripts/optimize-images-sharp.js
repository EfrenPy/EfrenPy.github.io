#!/usr/bin/env node

/**
 * Image Optimization Script using Sharp
 *
 * A modern, fast image optimizer without the dependency issues of old imagemin packages
 */

import { readdir, mkdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import sharp from 'sharp';

const INPUT_DIR = 'images';
const OUTPUT_DIR = 'images-optimized';

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function getImageFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await getImageFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function getFileSize(path) {
  const stats = await stat(path);
  return stats.size;
}

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(2) + ' KB';
}

async function optimizeImage(inputPath, outputPath) {
  const ext = extname(inputPath).toLowerCase();

  const image = sharp(inputPath);

  switch (ext) {
    case '.jpg':
    case '.jpeg':
      await image
        .jpeg({
          quality: 85,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath);
      break;

    case '.png':
      await image
        .png({
          quality: 85,
          compressionLevel: 9,
          progressive: true
        })
        .toFile(outputPath);
      break;

    case '.webp':
      await image
        .webp({
          quality: 85
        })
        .toFile(outputPath);
      break;

    default:
      throw new Error(`Unsupported format: ${ext}`);
  }
}

async function main() {
  console.log('🖼️  Image Optimization with Sharp');
  console.log('=====================================\n');

  try {
    // Ensure output directory exists
    await ensureDir(OUTPUT_DIR);

    // Get all image files
    const imageFiles = await getImageFiles(INPUT_DIR);

    if (imageFiles.length === 0) {
      console.log('No images found to optimize.');
      return;
    }

    console.log(`Found ${imageFiles.length} images to optimize\n`);

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let successCount = 0;

    for (const inputPath of imageFiles) {
      try {
        const relativePath = inputPath.substring(INPUT_DIR.length + 1);
        const outputPath = join(OUTPUT_DIR, relativePath);

        // Ensure output subdirectory exists
        const outputDirPath = join(OUTPUT_DIR, ...relativePath.split('/').slice(0, -1));
        if (outputDirPath !== OUTPUT_DIR) {
          await ensureDir(outputDirPath);
        }

        const originalSize = await getFileSize(inputPath);

        await optimizeImage(inputPath, outputPath);

        const optimizedSize = await getFileSize(outputPath);
        const savings = originalSize - optimizedSize;
        const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

        totalOriginalSize += originalSize;
        totalOptimizedSize += optimizedSize;
        successCount++;

        console.log(`✓ ${relativePath}`);
        console.log(`  ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savingsPercent}% reduction)\n`);

      } catch (err) {
        console.error(`✗ Failed to optimize ${inputPath}:`, err.message);
      }
    }

    console.log('=====================================');
    console.log(`✓ Optimized ${successCount}/${imageFiles.length} images\n`);

    if (totalOriginalSize > 0) {
      const totalSavings = totalOriginalSize - totalOptimizedSize;
      const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);

      console.log('Total size reduction:');
      console.log(`  Original:  ${formatBytes(totalOriginalSize)}`);
      console.log(`  Optimized: ${formatBytes(totalOptimizedSize)}`);
      console.log(`  Saved:     ${formatBytes(totalSavings)} (${totalSavingsPercent}%)\n`);
    }

    console.log('📝 Review optimized images in', OUTPUT_DIR);
    console.log('   If satisfied, replace originals and delete the temporary directory.\n');

  } catch (error) {
    console.error('Error during optimization:', error);
    process.exit(1);
  }
}

main();
