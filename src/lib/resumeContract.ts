export const RESUME_FORMAT = 'staticrypt-v3';

export interface PrivateEducation {
  school: string;
  major: string;
  period: string;
  logo: string;
}

export interface PrivateProfile {
  email: string;
  education: PrivateEducation[];
}

export interface ResumeUrls {
  pdf: string;
  preview: string;
  profile: PrivateProfile;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isPrivateProfile(value: unknown): value is PrivateProfile {
  if (!isRecord(value) || !isNonEmptyString(value.email) || !Array.isArray(value.education)) { return false; }
  return value.education.length > 0 && value.education.every((entry: unknown) =>
    isRecord(entry) && ['school', 'major', 'period', 'logo'].every((key) => isNonEmptyString(entry[key])));
}
