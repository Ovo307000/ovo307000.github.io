import { useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { decryptResume, revokeResumeUrls } from '../lib/privateResume';
import type { ResumeUrls } from '../lib/privateResume';

interface PrivateResumeState {
  phase: 'public' | 'unlock' | 'private';
  busy: boolean;
  error: string;
  urls: ResumeUrls | null;
}

interface ResumeLifetime {
  active: boolean;
  attempt: number;
  urls: ResumeUrls | null;
}

const PUBLIC_STATE: PrivateResumeState = { phase: 'public', busy: false, error: '', urls: null };

async function requestUnlock(code: string, lifetime: ResumeLifetime,
    setState: Dispatch<SetStateAction<PrivateResumeState>>): Promise<boolean> {
  if (!code.trim()) { setState((state) => ({ ...state, error: '请输入分享码。' })); return false; }
  const attempt = ++lifetime.attempt;
  setState((state) => ({ ...state, busy: true, error: '' }));
  try {
    const urls = await decryptResume(code.trim());
    if (!lifetime.active || attempt !== lifetime.attempt) { revokeResumeUrls(urls); return false; }
    revokeResumeUrls(lifetime.urls);
    lifetime.urls = urls;
    setState({ phase: 'private', busy: false, error: '', urls });
    return true;
  } catch {
    if (!lifetime.active || attempt !== lifetime.attempt) { return false; }
    setState((state) => ({ ...state, busy: false, error: '分享码不正确，或文件暂不可用。请核对后重试。' }));
    return false;
  }
}

export function usePrivateResume() {
  const [state, setState] = useState<PrivateResumeState>(PUBLIC_STATE);
  const lifetime = useRef<ResumeLifetime>({ active: true, attempt: 0, urls: null });
  useEffect(() => {
    const current = lifetime.current;
    current.active = true;
    return () => { current.active = false; current.attempt++; revokeResumeUrls(current.urls); };
  }, []);
  function lock(): void {
    lifetime.current.attempt++;
    revokeResumeUrls(lifetime.current.urls);
    lifetime.current.urls = null;
    setState(PUBLIC_STATE);
  }
  return { state, lock,
    showUnlock: () => setState((current) => ({ ...current, phase: 'unlock', error: '' })),
    unlock: (code: string) => requestUnlock(code, lifetime.current, setState),
  };
}
