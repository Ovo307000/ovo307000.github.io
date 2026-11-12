import { useEffect, useState } from 'react';
import { decryptResume, revokeResumeUrls } from '../lib/privateResume';
import { PrivateResumeSession, PUBLIC_STATE } from '../lib/privateResumeSession';

export function usePrivateResume() {
  const [state, setState] = useState(PUBLIC_STATE);
  const [session] = useState(() => new PrivateResumeSession(decryptResume, revokeResumeUrls, setState));
  useEffect(() => {
    session.activate();
    return () => session.dispose();
  }, [session]);
  return { state,
    lock: () => session.lock(),
    showUnlock: () => session.showUnlock(),
    unlock: (code: string) => session.unlock(code),
  };
}
