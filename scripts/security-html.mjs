import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

// GitHub Pages cannot set response headers. A per-document policy still protects
// static HTML; Cloudflare response headers add frame and permission protection.
async function secure(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await secure(path);
    else if (entry.name.endsWith('.html')) {
      let html = await readFile(path, 'utf8');
      html = html.replace(/<meta\b[^>]*data-site-security[^>]*>\s*/g, '');
      const hashes = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
        .filter(([, attributes, body]) => !/\bsrc\s*=/i.test(attributes) && body.trim())
        .map(([, , body]) => `'sha256-${createHash('sha256').update(body).digest('base64')}'`);
      const policy = [
        "default-src 'self'",
        `script-src 'self' ${hashes.join(' ')} https://www.gstatic.com https://apis.google.com https://static.cloudflareinsights.com`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https:",
        "font-src 'self' data:",
        "connect-src 'self' https://api.github.com https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.firebaseapp.com https://cloudflareinsights.com",
        'frame-src https://www.youtube.com https://www.youtube-nocookie.com https://*.firebaseapp.com https://accounts.google.com',
        "worker-src 'self' blob:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; ');
      const escaped = policy.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
      html = html.replace(
        /<meta\b[^>]*charset[^>]*>/i,
        `$&\n<meta data-site-security http-equiv="Content-Security-Policy" content="${escaped}">\n<meta data-site-security name="referrer" content="strict-origin-when-cross-origin">`,
      );
      await writeFile(path, html);
    }
  }
}
for (const directory of process.argv.slice(2)) await secure(directory);
