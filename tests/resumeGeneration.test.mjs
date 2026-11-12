import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, resolve, basename } from 'node:path';
import engine from 'staticrypt/lib/cryptoEngine.js';
import codec from 'staticrypt/lib/codec.js';
import { isPrivateProfile, RESUME_FORMAT } from '../src/lib/resumeContract.ts';

const png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a9XkAAAAASUVORK5CYII=';
const syntheticProfile = { email: 'test@example.invalid', education: [{ school: 'School', major: 'Major', period: '2020-2024', logo: png }] };

async function prepare(directory) {
  const paths = Object.fromEntries(['pdf', 'preview', 'details', 'code-file', 'output'].map((name) => [name, join(directory, name === 'output' ? 'test.enc' : name)]));
  await writeFile(paths.pdf, '%PDF-1.4\n%%EOF');
  await writeFile(paths.preview, Buffer.from(png, 'base64'));
  await writeFile(paths.details, JSON.stringify(syntheticProfile));
  await writeFile(paths['code-file'], 'synthetic-generation-test-code');
  return paths;
}

test('existing generator and browser contract round-trip synthetic records and reject invalid profiles', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'portfolio-contract-test-'));
  try {
    const paths = await prepare(directory);
    const args = Object.entries(paths).flatMap(([name, path]) => [`--${name}`, path]);
    const command = ['scripts/generate-private-resume.mjs', ...args];
    const generated = spawnSync(process.execPath, command, { encoding: 'utf8' });
    assert.equal(generated.status, 0, generated.stderr);
    const message = JSON.parse(await readFile(paths.output, 'utf8'));
    assert.equal(message.format, RESUME_FORMAT);
    const hash = await engine.hashPassword('synthetic-generation-test-code', message.salt);
    const decoded = await codec.init(engine).decode(message.ciphertext, hash, message.salt);
    assert.equal(decoded.success, true);
    assert.deepEqual(JSON.parse(decoded.decoded).profile, syntheticProfile);
    assert.equal(isPrivateProfile(JSON.parse(decoded.decoded).profile), true);
    const previous = await readFile(paths.output, 'utf8');
    await writeFile(paths.details, JSON.stringify({ ...syntheticProfile, email: ' ' }));
    const invalid = spawnSync(process.execPath, command, { encoding: 'utf8' });
    assert.notEqual(invalid.status, 0);
    assert.match(invalid.stderr, /non-empty email/);
    assert.equal(await readFile(paths.output, 'utf8'), previous);
  } finally {
    assert.equal(resolve(dirname(directory)), resolve(tmpdir()));
    assert.ok(basename(directory).startsWith('portfolio-contract-test-'));
    await rm(directory, { recursive: true, force: true });
  }
});
