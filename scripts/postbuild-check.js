const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const SITE_DIR = path.join(__dirname, '..', '_site');
const ERRORS = [];
const WARNINGS = [];

function logError(msg) {
  ERRORS.push(`ERROR: ${msg}`);
  console.log(`\x1b[31m✗\x1b[0m ${msg}`);
}

function logWarning(msg) {
  WARNINGS.push(`WARNING: ${msg}`);
  console.log(`\x1b[33m⚠\x1b[0m ${msg}`);
}

function logSuccess(msg) {
  console.log(`\x1b[32m✓\x1b[0m ${msg}`);
}

function getFiles(dir, ext = '.html') {
  const files = [];
  function walk(d) {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(d, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.name.endsWith(ext)) files.push(fullPath);
    }
  }
  walk(dir);
  return files;
}

function checkRobotsTxt() {
  console.log('\n--- Checking robots.txt ---');
  const robotsPath = path.join(SITE_DIR, 'robots.txt');
  
  if (!fs.existsSync(robotsPath)) {
    logError('robots.txt not found');
    return;
  }
  
  const content = fs.readFileSync(robotsPath, 'utf8');
  
  if (content.length > 5000) {
    logError(`robots.txt is ${content.length} bytes - likely serving HTML instead of text`);
    return;
  }
  
  const lines = content.split('\n');
  let hasUserAgent = false;
  let hasDisallow = false;
  
  for (const line of lines) {
    const trimmed = line.trim().toLowerCase();
    if (trimmed.startsWith('user-agent:')) hasUserAgent = true;
    if (trimmed.startsWith('disallow:')) hasDisallow = true;
  }
  
  if (!hasUserAgent) logError('robots.txt missing User-agent directive');
  else logSuccess('robots.txt valid');
}

function checkSitemap() {
  console.log('\n--- Checking sitemap.xml ---');
  const sitemapPath = path.join(SITE_DIR, 'sitemap.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    logError('sitemap.xml not found');
    return;
  }
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const dom = new JSDOM(content);
  const urls = dom.window.document.querySelectorAll('url loc');
  
  if (urls.length === 0) {
    logError('sitemap.xml has no URLs');
    return;
  }
  
  logSuccess(`sitemap.xml has ${urls.length} URLs`);
  
  const sitemapURLs = Array.from(urls).map(u => u.textContent);
  const htmlFiles = getFiles(SITE_DIR, '.html');
  
  for (const htmlFile of htmlFiles) {
    const relativePath = path.relative(SITE_DIR, htmlFile);
    if (relativePath.includes('404.html')) continue;
    
    const urlPath = '/' + relativePath.replace(/index\.html$/, '').replace(/\\/g, '/');
    
    const inSitemap = sitemapURLs.some(surl => 
      surl.endsWith(urlPath) || surl.endsWith(urlPath + '/')
    );
    
    if (!inSitemap) {
      logWarning(`Page not in sitemap: ${urlPath}`);
    }
  }
}

function checkHTMLFiles() {
  console.log('\n--- Checking HTML files ---');
  const htmlFiles = getFiles(SITE_DIR);
  
  let indexFound = false;
  
  for (const file of htmlFiles) {
    const relativePath = path.relative(SITE_DIR, file);
    const urlPath = '/' + relativePath.replace(/index\.html$/, '').replace(/\\/g, '/');
    
    if (urlPath === '/' || urlPath === '/index.html') {
      indexFound = true;
      continue;
    }
    
    const content = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(content);
    const doc = dom.window.document;
    
    const metaRobots = doc.querySelector('meta[name="robots"]');
    const noindex = metaRobots && metaRobots.content.includes('noindex');
    
    if (relativePath === '404.html') {
      continue;
    }
    
    const bodyText = doc.body ? doc.body.textContent || '' : '';
    const wordCount = bodyText.split(/\s+/).filter(w => w.length > 0).length;
    
    if (wordCount < 50 && !noindex) {
      logWarning(`Thin page (<50 words) without noindex: ${urlPath}`);
    }
    
    const hasJekyllLayout = content.includes('class="min-mistakes');
    if (hasJekyllLayout) {
      const canonical = doc.querySelector('link[rel="canonical"]');
      if (!canonical && !noindex && !urlPath.includes('/404')) {
        const ogUrl = doc.querySelector('meta[property="og:url"]');
        if (!ogUrl) {
          logWarning(`Missing canonical tag: ${urlPath}`);
        }
      }
    }
  }
  
  if (!indexFound) {
    logError('No index.html found');
  }
  
  logSuccess(`Checked ${htmlFiles.length} HTML files`);
}

function checkForTemplateArtifacts() {
  console.log('\n--- Checking for template artifacts ---');
  const patterns = [
    { pattern: /non-menu-page/, msg: 'Template artifact: non-menu-page' },
    { pattern: /page-archive/, msg: 'Template artifact: page-archive' },
    { pattern: /collection-archive/, msg: 'Template artifact: collection-archive' },
    { pattern: /markdown_generator/, msg: 'Template artifact: markdown_generator folder' },
    { pattern: /docs\//, msg: 'Template artifact: docs/ folder' },
  ];
  
  const htmlFiles = getFiles(SITE_DIR);
  let found = false;
  
  for (const file of htmlFiles) {
    const relativePath = path.relative(SITE_DIR, file);
    
    for (const { pattern, msg } of patterns) {
      if (pattern.test(relativePath)) {
        logError(msg + ': ' + relativePath);
        found = true;
      }
    }
  }
  
  if (!found) {
    logSuccess('No template artifacts found');
  }
}

function checkForWWWRedirect() {
  console.log('\n--- Checking WWW redirect ---');
  const robotsPath = path.join(SITE_DIR, 'robots.txt');
  
  if (!fs.existsSync(robotsPath)) {
    logWarning('Cannot check WWW redirect - robots.txt not in _site (run jekyll first)');
    return;
  }
  
  logSuccess('WWW redirect check skipped (run on live site)');
}

console.log('='.repeat(50));
console.log('Postbuild Validation');
console.log('='.repeat(50));

if (!fs.existsSync(SITE_DIR)) {
  console.log('\n\x1b[31mERROR: _site directory not found. Run Jekyll first.\x1b[0m');
  process.exit(1);
}

checkRobotsTxt();
checkSitemap();
checkHTMLFiles();
checkForTemplateArtifacts();
checkForWWWRedirect();

console.log('\n' + '='.repeat(50));
console.log('Summary');
console.log('='.repeat(50));

if (ERRORS.length > 0) {
  console.log(`\x1b[31m${ERRORS.length} error(s)\x1b[0m`);
}
if (WARNINGS.length > 0) {
  console.log(`\x1b[33m${WARNINGS.length} warning(s)\x1b[0m`);
}
if (ERRORS.length === 0 && WARNINGS.length === 0) {
  console.log('\x1b[32mAll checks passed!\x1b[0m');
}

process.exit(ERRORS.length > 0 ? 1 : 0);
