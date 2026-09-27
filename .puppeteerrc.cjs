const { join } = require('node:path');

/**
 * Keep the downloaded Chromium inside the repo (.cache/puppeteer) rather
 * than in the home directory. Netlify caches the repo between builds, so
 * this makes Chrome survive across deploys instead of being re-downloaded
 * — and it means the prerender step can actually find a browser.
 */
module.exports = {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
