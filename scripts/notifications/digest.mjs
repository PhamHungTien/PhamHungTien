import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

export const APPS = {
  phtv: 'PHTV',
  vtts: 'vTTS',
  padcodeai: 'Pad Code AI',
  padnotesai: 'Pad Notes AI',
  mynasmanager: 'My NAS Manager',
  lunarv: 'LunarV',
  lunarblock: 'Lunar Block',
};
const BASE =
  'https://firestore.googleapis.com/v1/projects/phtv-12f95/databases/(default)/documents';
const hash = (value) => createHash('sha256').update(value).digest('hex');

// Read only public discussion data. No Firebase admin credentials are needed.
async function listDocuments(path, fields, fetcher) {
  const result = [];
  let next;
  for (let page = 0; page < 100; page++) {
    const url = new URL(`${BASE}/${path}`);
    url.searchParams.set('pageSize', '100');
    for (const field of fields) url.searchParams.append('mask.fieldPaths', field);
    if (next) url.searchParams.set('pageToken', next);
    const response = await fetcher(url, { signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`Discussion read failed: HTTP ${response.status}`);
    const data = await response.json();
    result.push(...(data.documents ?? []));
    next = data.nextPageToken;
    if (!next) return result;
  }
  throw new Error('Discussion pagination limit exceeded; state was not updated.');
}

export async function collectEntries(fetcher = fetch) {
  const entries = {};
  const add = (path, app, kind) => {
    entries[hash(path)] = { app, kind };
  };
  const questions = await listDocuments('questions', ['replies'], fetcher);
  for (const question of questions) {
    add(question.name, 'phtv', 'post');
    for (const reply of question.fields?.replies?.arrayValue?.values ?? []) {
      const id = reply.mapValue?.fields?.id?.stringValue;
      if (id) add(`${question.name}/reply/${id}`, 'phtv', 'reply');
    }
  }
  for (const app of Object.keys(APPS).filter((app) => app !== 'phtv')) {
    const posts = await listDocuments(`appDiscussions/${app}/posts`, ['createdAt'], fetcher);
    for (const post of posts) {
      add(post.name, app, 'post');
      const path = post.name.split('/documents/')[1];
      for (const reply of await listDocuments(`${path}/replies`, ['createdAt'], fetcher))
        add(reply.name, app, 'reply');
    }
  }
  return entries;
}

export function summarize(previous, current) {
  if (!previous) return [];
  const counts = {};
  for (const [id, entry] of Object.entries(current)) {
    if (id in previous.entries) continue;
    const count = (counts[entry.app] ??= { app: entry.app, posts: 0, replies: 0 });
    count[entry.kind === 'post' ? 'posts' : 'replies']++;
  }
  return Object.values(counts);
}

export function emailPayload(summary, publicKey, privateKey) {
  return {
    service_id: 'default_service',
    template_id: 'template_qd4vozb',
    user_id: publicKey,
    accessToken: privateKey,
    template_params: {
      app_name: summary.map((item) => APPS[item.app]).join(', '),
      sender_name: 'Website Community',
      message: summary
        .map(
          (item) =>
            `${APPS[item.app]}: ${item.posts} new discussion(s), ${item.replies} new reply/replies.\nhttps://phamhungtien.com/${{ phtv: 'PHTV', vtts: 'vTTS', padcodeai: 'PadCodeAI', padnotesai: 'PadNotesAI', mynasmanager: 'MyNASManager', lunarv: 'LunarV', lunarblock: 'LunarBlock' }[item.app]}/#community`,
        )
        .join('\n\n'),
    },
  };
}

export async function run({
  statePath = '.notification-state/state.json',
  publicKey = process.env.EMAILJS_PUBLIC_KEY,
  privateKey = process.env.EMAILJS_PRIVATE_KEY,
  fetcher = fetch,
  now = Date.now(),
} = {}) {
  let previous = null;
  try {
    previous = JSON.parse(await readFile(statePath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT')
      throw new Error('Invalid notification state; refusing to reset it.');
  }
  if (
    previous &&
    (previous.version !== 1 || !previous.entries || typeof previous.entries !== 'object')
  )
    throw new Error('Invalid notification state version.');
  const entries = await collectEntries(fetcher);
  const summary = summarize(previous, entries);
  const window = Math.floor(now / (6 * 60 * 60 * 1000));
  if (summary.length) {
    if (!publicKey || !privateKey)
      throw new Error('EmailJS secrets are missing. Configure both GitHub repository secrets.');
    if (previous.lastSendWindow === window) {
      console.log('An email was already sent in this six-hour window; pending changes retained.');
      return { status: 'deferred' };
    }
    const response = await fetcher('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload(summary, publicKey, privateKey)),
      signal: AbortSignal.timeout(20000),
    });
    // Never print the response body: it may include sensitive request parameters.
    if (!response.ok)
      throw new Error(`EmailJS send failed: HTTP ${response.status}; state was not advanced.`);
  }
  await mkdir(dirname(statePath), { recursive: true });
  await writeFile(
    statePath,
    JSON.stringify({
      version: 1,
      entries,
      lastSendWindow: summary.length ? window : (previous?.lastSendWindow ?? null),
    }),
  );
  const status = !previous ? 'baseline' : summary.length ? 'sent' : 'unchanged';
  console.log(`Notifications: ${status}. No message content or credentials logged.`);
  return { status, summary };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
