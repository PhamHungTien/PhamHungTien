import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { summarize, emailPayload, run } from './digest.mjs';

const post = {
  name: 'projects/phtv-12f95/databases/(default)/documents/questions/q1',
  fields: { replies: { arrayValue: { values: [] } } },
};
function server({ added = false, mailStatus = 200, failRead = false } = {}) {
  const requests = [];
  const fetcher = async (url, options) => {
    const href = String(url);
    requests.push({ href, options });
    if (href.includes('api.emailjs.com')) return { ok: mailStatus === 200, status: mailStatus };
    if (failRead) return { ok: false, status: 403 };
    const docs = href.includes('/questions?')
      ? [post, ...(added ? [{ ...post, name: post.name + 'new' }] : [])]
      : [];
    return { ok: true, json: async () => ({ documents: docs }) };
  };
  return { fetcher, requests };
}
async function fixture(fn) {
  const dir = await mkdtemp(join(tmpdir(), 'discussion-email-'));
  try {
    await fn(join(dir, 'state.json'));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

test('first run creates baseline without emailing historical posts', () =>
  fixture(async (statePath) => {
    const s = server();
    assert.equal((await run({ statePath, fetcher: s.fetcher })).status, 'baseline');
    assert.equal(s.requests.filter((r) => r.href.includes('api.emailjs')).length, 0);
  }));
test('unchanged board sends nothing', () =>
  fixture(async (statePath) => {
    const s = server();
    await run({ statePath, fetcher: s.fetcher });
    assert.equal((await run({ statePath, fetcher: s.fetcher })).status, 'unchanged');
  }));
test('new post sends exactly one digest then stays quiet', () =>
  fixture(async (statePath) => {
    await run({ statePath, fetcher: server().fetcher });
    const s = server({ added: true });
    assert.equal(
      (
        await run({
          statePath,
          fetcher: s.fetcher,
          publicKey: 'test-public',
          privateKey: 'test-private',
        })
      ).status,
      'sent',
    );
    assert.equal(
      (
        await run({
          statePath,
          fetcher: s.fetcher,
          publicKey: 'test-public',
          privateKey: 'test-private',
        })
      ).status,
      'unchanged',
    );
    assert.equal(s.requests.filter((r) => r.href.includes('api.emailjs')).length, 1);
  }));
test('HTTP failure preserves pending changes', () =>
  fixture(async (statePath) => {
    await run({ statePath, fetcher: server().fetcher });
    const before = await readFile(statePath, 'utf8');
    await assert.rejects(
      run({
        statePath,
        fetcher: server({ added: true, mailStatus: 429 }).fetcher,
        publicKey: 'x',
        privateKey: 'y',
      }),
      /HTTP 429/,
    );
    assert.equal(await readFile(statePath, 'utf8'), before);
  }));
test('missing secrets do not consume new posts', () =>
  fixture(async (statePath) => {
    await run({ statePath, fetcher: server().fetcher });
    const before = await readFile(statePath, 'utf8');
    await assert.rejects(
      run({ statePath, fetcher: server({ added: true }).fetcher, publicKey: '', privateKey: '' }),
      /missing/,
    );
    assert.equal(await readFile(statePath, 'utf8'), before);
  }));
test('six-hour cap defers a second digest without dropping it', () =>
  fixture(async (statePath) => {
    await run({ statePath, fetcher: server().fetcher });
    const data = JSON.parse(await readFile(statePath, 'utf8'));
    data.lastSendWindow = Math.floor(Date.now() / 21600000);
    await writeFile(statePath, JSON.stringify(data));
    assert.equal(
      (
        await run({
          statePath,
          fetcher: server({ added: true }).fetcher,
          publicKey: 'x',
          privateKey: 'y',
        })
      ).status,
      'deferred',
    );
    assert.deepEqual(JSON.parse(await readFile(statePath, 'utf8')), data);
  }));
test('Firestore permission errors never advance baseline', () =>
  fixture(async (statePath) => {
    await assert.rejects(
      run({ statePath, fetcher: server({ failRead: true }).fetcher }),
      /HTTP 403/,
    );
  }));
test('corrupt state fails closed', () =>
  fixture(async (statePath) => {
    await writeFile(statePath, 'bad-json');
    await assert.rejects(
      run({ statePath, fetcher: server().fetcher }),
      /Invalid notification state/,
    );
  }));
test('digest and cursor contain no visitor names, emails or message bodies', () =>
  fixture(async (statePath) => {
    const s = server();
    await run({ statePath, fetcher: s.fetcher });
    const state = await readFile(statePath, 'utf8');
    assert.ok(!state.includes('questions/q1'));
    const payload = emailPayload([{ app: 'vtts', posts: 1, replies: 2 }], 'public', 'private');
    assert.equal(payload.template_params.sender_name, 'Website Community');
    assert.ok(!('to_email' in payload.template_params));
    assert.ok(payload.template_params.message.includes('/vTTS/#community'));
  }));
test('new replies are counted, deleted posts are ignored', () => {
  assert.deepEqual(
    summarize(
      { entries: { old: { app: 'phtv', kind: 'post' } } },
      { reply: { app: 'phtv', kind: 'reply' } },
    ),
    [{ app: 'phtv', posts: 0, replies: 1 }],
  );
});
