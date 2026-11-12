import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { usePortfolioPrivacy } from './usePortfolioPrivacy';

export type PrivacyAccessValue = ReturnType<typeof usePortfolioPrivacy>;
const PrivacyAccessContext = createContext<PrivacyAccessValue | null>(null);

export function PrivacyAccessProvider({ value, children }: { value: PrivacyAccessValue; children: ReactNode }) {
  return <PrivacyAccessContext.Provider value={value}>{children}</PrivacyAccessContext.Provider>;
}

export function usePrivacyAccess(): PrivacyAccessValue {
  const value = useContext(PrivacyAccessContext);
  if (!value) { throw new Error('Privacy access must be inside its provider.'); }
  return value;
}
