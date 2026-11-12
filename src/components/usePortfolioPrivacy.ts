import { useRef } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { usePrivateResume } from './usePrivateResume';
import type { PortfolioDialog, ProtectedSection } from '../lib/portfolioDialog';
import type { PrivacyAccessValue } from './PrivacyAccess';

type SetTarget = Dispatch<SetStateAction<PortfolioDialog>>;
type Access = ReturnType<typeof usePrivateResume>;

function requestUnlock(section: ProtectedSection, returnTarget: RefObject<ProtectedSection>, setTarget: SetTarget, access: Access): void {
  if (access.state.urls) {
    if (section === 'resume') { setTarget({ kind: 'resume' }); }
    else { document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    return;
  }
  returnTarget.current = section;
  setTarget({ kind: 'unlock' });
  access.showUnlock();
}

async function finishUnlock(code: string, returnTarget: RefObject<ProtectedSection>, setTarget: SetTarget, access: Access): Promise<void> {
  if (!await access.unlock(code)) { return; }
  if (returnTarget.current === 'resume') { setTarget({ kind: 'resume' }); }
  else {
    setTarget(null);
    requestAnimationFrame(() => document.getElementById(returnTarget.current)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  }
}

export function usePortfolioPrivacy(setTarget: SetTarget) {
  const access = usePrivateResume();
  const returnTarget = useRef<ProtectedSection>('contact');
  const { phase, busy, error, urls } = access.state;
  const request = (section: ProtectedSection = 'contact') => requestUnlock(section, returnTarget, setTarget, access);
  const value: PrivacyAccessValue = {
    profile: urls?.profile ?? null, phase, busy, error,
    requestUnlock: request,
    finishUnlock: (code) => finishUnlock(code, returnTarget, setTarget, access),
    openResume: () => request('resume'),
    lock: access.lock,
  };
  return { value, urls,
    cancelUnlock: () => { if (access.state.phase === 'unlock') { access.lock(); } },
    closeDialog: () => { if (access.state.phase === 'unlock') { access.lock(); } setTarget(null); },
  };
}
