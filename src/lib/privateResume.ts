import { assets } from './assets';

interface EncryptedResume {
  format: 'staticrypt-v3';
  salt: string;
  ciphertext: string;
}

export interface ResumeUrls {
  pdf: string;
  preview: string;
  profile: PrivateProfile;
}

export interface PrivateProfile {
  email: string;
  education: { school: string; major: string; period: string; logo: string }[];
}

function isPrivateProfile(value: unknown): value is PrivateProfile {
  if (typeof value !== 'object' || value === null ||
      !('email' in value) || typeof value.email !== 'string' ||
      !('education' in value) || !Array.isArray(value.education)) { return false; }
  return value.education.length > 0 && value.education.every((entry: unknown) => {
    if (typeof entry !== 'object' || entry === null) { return false; }
    return ['school', 'major', 'period', 'logo'].every((key) =>
      key in entry && typeof Reflect.get(entry, key) === 'string' && Reflect.get(entry, key).length > 0);
  });
}

function isEncryptedResume(value: unknown): value is EncryptedResume {
  return typeof value === 'object' && value !== null &&
    'format' in value && value.format === 'staticrypt-v3' &&
    'salt' in value && typeof value.salt === 'string' &&
    'ciphertext' in value && typeof value.ciphertext === 'string';
}

async function readEncryptedResume(): Promise<EncryptedResume> {
  const response = await fetch(assets.privateResume, {
    cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer',
  });
  if (!response.ok) { throw new Error('The encrypted resume could not be loaded.'); }
  const value: unknown = await response.json();
  if (!isEncryptedResume(value)) { throw new Error('The encrypted resume format is invalid.'); }
  return value;
}

function createBlobUrl(encoded: string, type: string): string {
  const bytes = Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0));
  return URL.createObjectURL(new Blob([bytes], { type }));
}

function createResumeUrls(decoded: string): ResumeUrls {
  const value: unknown = JSON.parse(decoded);
  if (typeof value !== 'object' || value === null ||
      !('pdf' in value) || typeof value.pdf !== 'string' ||
      !('preview' in value) || typeof value.preview !== 'string' ||
      !('profile' in value) || !isPrivateProfile(value.profile)) {
    throw new Error('The decrypted resume is invalid.');
  }
  const pdf = createBlobUrl(value.pdf, 'application/pdf');
  const images: string[] = [];
  try {
    const preview = createBlobUrl(value.preview, 'image/png');
    images.push(preview);
    const education = value.profile.education.map((entry) => {
      const logo = createBlobUrl(entry.logo, 'image/png');
      images.push(logo);
      return { ...entry, logo };
    });
    return { pdf, preview, profile: { ...value.profile, education } };
  } catch (error) { for (const url of [pdf, ...images]) { URL.revokeObjectURL(url); } throw error; }
}

export async function decryptResume(code: string): Promise<ResumeUrls> {
  const [message, { default: engine }, { default: codec }] = await Promise.all([
    readEncryptedResume(), import('staticrypt/lib/cryptoEngine.js'), import('staticrypt/lib/codec.js'),
  ]);
  const passwordHash = await engine.hashPassword(code, message.salt);
  const result = await codec.init(engine).decode(message.ciphertext, passwordHash, message.salt);
  if (!result.success || !result.decoded) { throw new Error('The share code is incorrect.'); }
  return createResumeUrls(result.decoded);
}

export function revokeResumeUrls(urls: ResumeUrls | null): void {
  if (!urls) { return; }
  URL.revokeObjectURL(urls.pdf);
  URL.revokeObjectURL(urls.preview);
  for (const entry of urls.profile.education) { URL.revokeObjectURL(entry.logo); }
}
