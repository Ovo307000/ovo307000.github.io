import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { PrivateProfile } from '../lib/resumeContract';
import type { PrivateResumeState } from '../lib/privateResumeSession';
import type { ProtectedSection } from '../lib/portfolioDialog';

export interface PrivacyAccessValue {
  profile: PrivateProfile | null;
  phase: PrivateResumeState['phase'];
  busy: boolean;
  error: PrivateResumeState['error'];
  requestUnlock: (section?: ProtectedSection) => void;
  finishUnlock: (code: string) => Promise<boolean>;
  openResume: () => void;
  lock: () => void;
}
const PrivacyAccessContext = createContext<PrivacyAccessValue | null>(null);

export function PrivacyAccessProvider({ value, children }: { value: PrivacyAccessValue; children: ReactNode }) {
  return <PrivacyAccessContext.Provider value={value}>{children}</PrivacyAccessContext.Provider>;
}

export function usePrivacyAccess(): PrivacyAccessValue {
  const value = useContext(PrivacyAccessContext);
  if (!value) { throw new Error('Privacy access must be inside its provider.'); }
  return value;
}
