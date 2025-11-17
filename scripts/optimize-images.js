#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Optimizes images in the images/ directory using imagemin
 * Supports JPEG and PNG compression
 */

const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  try {
    // Dynamic import for imagemin (ESM module)
    const imagemin = (await import('imagemin')).default;
    const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;
    const imageminPngquant = (await import('imagemin-pngquant')).default;

    const inputDir = 'images';
    const outputDir = 'images-optimized';

    console.log('🖼️  Starting image optimization...');
    console.log(`Input directory: ${inputDir}`);
    console.log(`Output directory: ${outputDir}`);

    const files = await imagemin([`${inputDir}/*.{jpg,jpeg,png}`], {
      destination: outputDir,
      plugins: [
        imageminMozjpeg({
          quality: 85,
          progressive: true
        }),
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    });

    console.log(`\n✓ Optimized ${files.length} images`);

    if (files.length > 0) {
      console.log('\nOptimized files:');
      files.forEach(file => {
        console.log(`  - ${path.basename(file.destinationPath)}`);
      });

      console.log('\n📝 Note: Review optimized images in images-optimized/');
      console.log('    If satisfied, replace original images and delete the temporary directory.');
    } else {
      console.log('\nNo images found to optimize.');
    }

  } catch (error) {
    console.error('Error during image optimization:', error.message);
    process.exit(1);
  }
}

optimizeImages();
