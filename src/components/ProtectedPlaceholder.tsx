import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { useScramble } from 'use-scramble';
import { usePrivacyAccess } from './PrivacyAccess';

const MASK = '7F A9 #X 2C / K8 @D 6E\nB3 $Q 9A 1F / C7 &R 4D';

export function ProtectedPlaceholder({ title, target }: { title: string; target: string }) {
  const { requestUnlock } = usePrivacyAccess();
  const root = useRef<HTMLButtonElement>(null);
  const visible = useInView(root);
  const reduced = useReducedMotion();
  const { ref, replay } = useScramble({ text: MASK,
    speed: reduced ? 0 : 0.3, tick: 2, scramble: 6, seed: 3, range: [33, 91] });
  useEffect(() => {
    if (!visible || reduced) { return; }
    const timer = window.setInterval(replay, 2400);
    return () => window.clearInterval(timer);
  }, [visible, reduced, replay]);
  return (
    <button ref={root} type="button" className="protected-placeholder" onClick={() => requestUnlock(target)}
      aria-label={`${title}，在首页终端输入分享码解锁`}>
      <span className="protected-label">{title} · 已加密</span>
      <span ref={ref} className="protected-scramble" aria-hidden="true">{MASK}</span>
      <span className="protected-hint">点击后在首页终端输入分享码，内容将在这里恢复。</span>
    </button>
  );
}
