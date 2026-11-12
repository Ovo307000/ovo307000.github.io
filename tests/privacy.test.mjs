import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPrivateProfile, RESUME_FORMAT } from '../src/lib/resumeContract.ts';
import { PrivateResumeSession } from '../src/lib/privateResumeSession.ts';

const profile = () => ({ email: 'test@example.invalid', education: [{ school: 'School', major: 'Major', period: '2020–2024', logo: 'png' }] });
const urls = (id) => ({ pdf: `blob:${id}`, preview: `blob:${id}-preview`, profile: profile() });
function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
function fixture(decrypt) {
  const states = [];
  const released = [];
  const session = new PrivateResumeSession(decrypt, (value) => { if (value) { released.push(value); } }, (state) => states.push(state));
  session.showUnlock();
  return { session, states, released, state: () => states.at(-1) };
}

test('shared contract rejects empty and malformed records', () => {
  assert.equal(RESUME_FORMAT, 'staticrypt-v3');
  assert.equal(isPrivateProfile(profile()), true);
  for (const value of [null, [], {}, { ...profile(), email: ' ' }, { ...profile(), education: [] },
    { ...profile(), education: [{ ...profile().education[0], major: ' ' }] }]) {
    assert.equal(isPrivateProfile(value), false);
  }
});

test('empty code does not decrypt and failed code remains retryable', async () => {
  let calls = 0;
  const f = fixture(async () => { calls++; throw new Error('wrong code'); });
  assert.equal(await f.session.unlock('  '), false);
  assert.equal(calls, 0);
  assert.equal(f.state().error, 'empty-code');
  assert.equal(await f.session.unlock('invalid'), false);
  assert.equal(f.state().phase, 'unlock');
  assert.equal(f.state().busy, false);
  assert.equal(f.state().error, 'denied');
});

test('cancel invalidates pending success and releases its temporary resources', async () => {
  const request = deferred();
  const f = fixture(() => request.promise);
  const pending = f.session.unlock('code');
  f.session.lock();
  const result = urls('cancelled');
  request.resolve(result);
  assert.equal(await pending, false);
  assert.equal(f.state().phase, 'public');
  assert.deepEqual(f.released, [result]);
});

test('latest request wins, including an older failure arriving after success', async () => {
  const first = deferred();
  const second = deferred();
  const requests = [first, second];
  const f = fixture(() => requests.shift().promise);
  const old = f.session.unlock('old');
  const current = f.session.unlock('current');
  const result = urls('current');
  second.resolve(result);
  assert.equal(await current, true);
  first.reject(new Error('old failure'));
  assert.equal(await old, false);
  assert.equal(f.state().urls, result);
  assert.equal(f.state().error, null);
  f.session.lock();
  assert.deepEqual(f.released, [result]);
});

test('outdated successful request and unmount release each result once', async () => {
  const first = deferred();
  const second = deferred();
  const requests = [first, second];
  const f = fixture(() => requests.shift().promise);
  const old = f.session.unlock('old');
  const current = f.session.unlock('current');
  const stale = urls('old');
  const active = urls('active');
  second.resolve(active);
  await current;
  first.resolve(stale);
  assert.equal(await old, false);
  f.session.dispose();
  f.session.dispose();
  assert.deepEqual(f.released, [stale, active]);
});

test('unmount invalidates pending request without updating the disposed consumer', async () => {
  const request = deferred();
  const f = fixture(() => request.promise);
  const pending = f.session.unlock('code');
  f.session.dispose();
  const count = f.states.length;
  const result = urls('unmounted');
  request.resolve(result);
  assert.equal(await pending, false);
  assert.equal(f.states.length, count);
  assert.deepEqual(f.released, [result]);
});
