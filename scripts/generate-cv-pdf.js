#!/usr/bin/env node
/**
 * Generate bilingual CV PDFs from Jekyll-built HTML pages using Puppeteer.
 * Usage: node scripts/generate-cv-pdf.js
 * Expects _site/ to already contain the built Jekyll site.
 *
 * Serves _site/ via a local HTTP server so Google Fonts can load (file://
 * protocol blocks external font requests due to CORS).
 */

const puppeteer = require('puppeteer');
const http = require('http');
const path = require('path');
const fs = require('fs');

const SITE_DIR = path.resolve(__dirname, '..', '_site');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'files');

const VISUAL_MARGIN = { top: '12mm', bottom: '10mm', left: '0', right: '0' };
const ATS_MARGIN = { top: '18mm', bottom: '16mm', left: '20mm', right: '20mm' };

const pages = [
  { route: '/cv/print-en/', pdf: 'Efren_Rodriguez_CV.pdf', margin: VISUAL_MARGIN },
  { route: '/cv/print-es/', pdf: 'Efren_Rodriguez_CV_ES.pdf', margin: VISUAL_MARGIN },
  { route: '/cv/ats-en/', pdf: 'Efren_Rodriguez_CV_ATS.pdf', margin: ATS_MARGIN },
  { route: '/cv/ats-es/', pdf: 'Efren_Rodriguez_CV_ATS_ES.pdf', margin: ATS_MARGIN },
];

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(SITE_DIR, req.url);
      // Serve index.html for directory requests
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

(async () => {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const server = await startServer();
  const port = server.address().port;
  console.log(`Serving _site/ on http://127.0.0.1:${port}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const { route, pdf, margin } of pages) {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}${route}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    const outputPath = path.join(OUTPUT_DIR, pdf);
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin,
    });

    const stats = fs.statSync(outputPath);
    console.log(`Generated ${pdf} (${(stats.size / 1024).toFixed(1)} KB)`);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('All CV PDFs generated successfully.');
})();
