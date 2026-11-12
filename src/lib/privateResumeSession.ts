import type { ResumeUrls } from './resumeContract';

export interface PrivateResumeState {
  phase: 'public' | 'unlock' | 'private';
  busy: boolean;
  error: 'empty-code' | 'denied' | null;
  urls: ResumeUrls | null;
}

export const PUBLIC_STATE: PrivateResumeState = { phase: 'public', busy: false, error: null, urls: null };

export class PrivateResumeSession {
  private active = true;
  private attempt = 0;
  private urls: ResumeUrls | null = null;
  private state = PUBLIC_STATE;
  private readonly decrypt: (code: string) => Promise<ResumeUrls>;
  private readonly release: (urls: ResumeUrls | null) => void;
  private readonly notify: (state: PrivateResumeState) => void;

  constructor(decrypt: (code: string) => Promise<ResumeUrls>,
      release: (urls: ResumeUrls | null) => void, notify: (state: PrivateResumeState) => void) {
    this.decrypt = decrypt;
    this.release = release;
    this.notify = notify;
  }

  activate(): void { this.active = true; }

  private publish(state: PrivateResumeState): void {
    this.state = state;
    if (this.active) { this.notify(state); }
  }

  showUnlock(): void { this.publish({ ...this.state, phase: 'unlock', error: null }); }

  async unlock(code: string): Promise<boolean> {
    if (!code.trim()) { this.publish({ ...this.state, error: 'empty-code' }); return false; }
    const attempt = ++this.attempt;
    this.publish({ ...this.state, busy: true, error: null });
    try {
      const urls = await this.decrypt(code.trim());
      if (!this.active || attempt !== this.attempt) { this.release(urls); return false; }
      this.release(this.urls);
      this.urls = urls;
      this.publish({ phase: 'private', busy: false, error: null, urls });
      return true;
    } catch {
      if (!this.active || attempt !== this.attempt) { return false; }
      this.publish({ ...this.state, busy: false, error: 'denied' });
      return false;
    }
  }

  lock(): void {
    this.attempt++;
    if (this.urls) { this.release(this.urls); }
    this.urls = null;
    this.publish(PUBLIC_STATE);
  }

  dispose(): void {
    this.active = false;
    this.lock();
  }
}
