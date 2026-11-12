import { randomBytes } from 'node:crypto';
import { access, copyFile, mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const require = createRequire(import.meta.url);
const cryptoEngine = require('staticrypt/lib/cryptoEngine.js');
const codec = require('staticrypt/lib/codec.js').init(cryptoEngine);
const root = fileURLToPath(new URL('../', import.meta.url));
const localData = process.env.LOCALAPPDATA || resolve(homedir(), '.local/share');
const defaultCodeFile = resolve(localData, 'ResumePortfolio/share-code.txt');
const defaultDetailsFile = resolve(localData, 'ResumePortfolio/private-details.json');

function readOptions() {
  return parseArgs({ options: {
    pdf: { type: 'string', default: resolve(root, '../resume/resume.pdf') },
    preview: { type: 'string', default: resolve(root, '../docs/design-previews/resume-project-balance.png') },
    details: { type: 'string', default: defaultDetailsFile },
    'code-file': { type: 'string', default: defaultCodeFile },
    output: { type: 'string', default: resolve(root, 'resume-private.enc') },
    rotate: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
    version: { type: 'boolean', default: false },
  } }).values;
}

async function readShareCode(path, rotate) {
  try { await access(`${path}.pending`); }
  catch (error) {
    if (error.code !== 'ENOENT') { throw error; }
    return readAvailableShareCode(path, rotate);
  }
  throw new Error(`Resolve the pending share-code recovery file before generating: ${path}.pending`);
}

async function readAvailableShareCode(path, rotate) {
  if (!rotate) {
    try {
      const code = (await readFile(path, 'utf8')).trim();
      if (code.length < 24) { throw new Error('The existing share code must contain at least 24 characters.'); }
      return { code, changed: false };
    } catch (error) {
      if (error.code !== 'ENOENT') { throw error; }
    }
  }
  const code = randomBytes(24).toString('base64url');
  return { code, changed: true };
}

function assertPrivatePath(path, label) {
  const location = relative(root, resolve(path));
  if (!isAbsolute(location) && location !== '..' && !location.startsWith(`..${sep}`)) {
    throw new Error(`The ${label} file must be outside the public website repository.`);
  }
}

async function storeShareCode(path, code) {
  await mkdir(dirname(path), { recursive: true, mode: 0o700 });
  await writeFile(`${path}.tmp`, `${code}\n`, { mode: 0o600 });
  await replaceGeneratedFile(`${path}.tmp`, path);
}

async function saveGeneratedResume(options, message, code, changed) {
  const recovery = `${options['code-file']}.pending`;
  if (changed) {
    await mkdir(dirname(recovery), { recursive: true, mode: 0o700 });
    await writeFile(recovery, `${code}\n`, { mode: 0o600, flag: 'wx' });
  }
  try {
    await mkdir(dirname(options.output), { recursive: true });
    await writeFile(`${options.output}.tmp`, message);
    await replaceGeneratedFile(`${options.output}.tmp`, options.output);
    if (!changed) { return; }
    await storeShareCode(options['code-file'], code);
    await unlink(recovery);
  } catch (error) {
    if (changed) { throw new Error(`Update interrupted; preserve the recovery share-code file at ${recovery}. ${error.message}`); }
    throw error;
  }
}

async function replaceGeneratedFile(temporary, output) {
  try { await rename(temporary, output); }
  catch (error) {
    if (process.platform !== 'win32' || !['EPERM', 'EBUSY'].includes(error.code)) { throw error; }
    await copyFile(temporary, output);
    await unlink(temporary);
  }
}

function validatePaths(options) {
  assertPrivatePath(options['code-file'], 'share-code');
  assertPrivatePath(options.details, 'details');
  assertPrivatePath(options.pdf, 'PDF');
  assertPrivatePath(options.preview, 'preview');
  const output = resolve(options.output);
  const pathKey = (path) => process.platform === 'win32' ? resolve(path).toLowerCase() : resolve(path);
  const sources = [options.pdf, options.preview, options.details, options['code-file']].map(pathKey);
  if (!output.endsWith('.enc') || sources.includes(pathKey(output)) || sources.includes(pathKey(`${output}.tmp`))) {
    throw new Error('The output must be a separate .enc file, not a source or share-code file.');
  }
  const codeFile = resolve(options['code-file']);
  if ([codeFile, `${codeFile}.tmp`].map(pathKey).includes(pathKey(options.details))) {
    throw new Error('The details and share-code files must be separate.');
  }
}

function validateProfile(profile) {
  if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
    throw new Error('The details JSON must contain a profile object.');
  }
  if (typeof profile.email !== 'string' || !profile.email.trim()) {
    throw new Error('The profile email must be a non-empty string.');
  }
  if (!Array.isArray(profile.education)) { throw new Error('The profile education must be an array.'); }
  if (profile.education.length === 0) { throw new Error('The profile education must contain at least one entry.'); }
  for (const [index, entry] of profile.education.entries()) {
    validateEducation(entry, index);
  }
  return profile;
}

function validateEducation(entry, index) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    throw new Error(`Education entry ${index + 1} must be an object.`);
  }
  for (const field of ['school', 'major', 'period', 'logo']) {
    if (typeof entry[field] !== 'string' || !entry[field].trim()) {
      throw new Error(`Education entry ${index + 1} ${field} must be a non-empty string.`);
    }
  }
  const logo = entry.logo;
  const bytes = Buffer.from(logo, 'base64');
  if (bytes.toString('base64') !== logo || bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
    throw new Error(`Education entry ${index + 1} logo must be a Base64-encoded PNG.`);
  }
}

async function readPayload(pdfPath, previewPath, detailsPath) {
  const [pdf, preview, details] = await Promise.all([
    readFile(pdfPath), readFile(previewPath), readFile(detailsPath, 'utf8'),
  ]);
  if (pdf.subarray(0, 5).toString() !== '%PDF-') { throw new Error('The PDF input is invalid.'); }
  if (preview.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
    throw new Error('The preview input must be a PNG image.');
  }
  let profile;
  try { profile = JSON.parse(details); } catch { throw new Error('The details file must contain valid JSON.'); }
  return { pdf: pdf.toString('base64'), preview: preview.toString('base64'), profile: validateProfile(profile) };
}

function printHelp() {
  console.log('Usage: npm run resume:generate -- [--rotate] [--pdf PATH] [--preview PATH]');
  console.log('Options: --details PATH, --code-file PATH, --output PATH, --help, --version');
  console.log('Updates the encrypted full resume; reuses the local share code unless --rotate is given.');
  console.log('Details JSON contains email and education with Base64 PNG logos; keep it outside the repository.');
  console.log('Default details: LOCALAPPDATA/ResumePortfolio/private-details.json (or ~/.local/share on other systems).');
  console.log('The share code is saved outside the repository and is never printed.');
}

async function main() {
  const options = readOptions();
  if (options.help) { printHelp(); return; }
  if (options.version) { console.log('resume:generate 1.0.0'); return; }
  validatePaths(options);
  const payload = await readPayload(options.pdf, options.preview, options.details);
  const { code, changed } = await readShareCode(options['code-file'], options.rotate);
  const salt = cryptoEngine.generateRandomSalt();
  const ciphertext = await codec.encode(JSON.stringify(payload), code, salt);
  const message = JSON.stringify({ format: 'staticrypt-v3', salt, ciphertext });
  await saveGeneratedResume(options, message, code, changed);
  console.log(`Encrypted resume updated. Share code ${changed ? 'created or rotated' : 'reused'}.`);
  console.log(`Share code file: ${options['code-file']}`);
}

main().catch((error) => {
  console.error(`resume:generate: ${error.message}`);
  process.exitCode = 1;
});
