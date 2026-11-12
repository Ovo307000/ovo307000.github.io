import { useRef } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { usePrivateResume } from './usePrivateResume';

type SetTarget = Dispatch<SetStateAction<string | null>>;
type Access = ReturnType<typeof usePrivateResume>;

function requestUnlock(section: string, returnTarget: RefObject<string>, setTarget: SetTarget, access: Access): void {
  if (access.state.urls) {
    if (section === 'resume') { setTarget('resume'); }
    else { document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    return;
  }
  returnTarget.current = section;
  setTarget(null);
  access.showUnlock();
  window.setTimeout(() => {
    document.querySelector('.profile-terminal')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.querySelector<HTMLInputElement>('.profile-terminal input')?.focus({ preventScroll: true });
  }, 0);
}

async function finishUnlock(code: string, returnTarget: RefObject<string>, setTarget: SetTarget, access: Access): Promise<void> {
  if (!await access.unlock(code)) { return; }
  if (returnTarget.current === 'resume') { setTarget('resume'); }
  else {
    requestAnimationFrame(() => document.getElementById(returnTarget.current)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  }
}

export function usePortfolioPrivacy(setTarget: SetTarget) {
  const access = usePrivateResume();
  const returnTarget = useRef('contact');
  return { access,
    requestUnlock: (section = 'contact') => requestUnlock(section, returnTarget, setTarget, access),
    finishUnlock: (code: string) => finishUnlock(code, returnTarget, setTarget, access),
    onResume: () => access.state.urls ? setTarget('resume') : requestUnlock('resume', returnTarget, setTarget, access),
  };
}
