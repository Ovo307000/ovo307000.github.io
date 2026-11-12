import DecryptedText from './react-bits/DecryptedText';
import { usePrivacyAccess } from './PrivacyAccess';
import type { ProtectedSection } from '../lib/portfolioDialog';

const MASK = 'PROTECTED / ACCESS\nSHARE CODE REQUIRED';

export function ProtectedPlaceholder({ title, target }: { title: string; target: ProtectedSection }) {
  const { requestUnlock } = usePrivacyAccess();
  return (
    <button type="button" className="protected-placeholder" onClick={() => requestUnlock(target)}
      aria-label={`${title}，打开终端窗口输入分享码解锁`}>
      <span className="protected-label">{title} · 已加密</span>
      <DecryptedText text={MASK} parentClassName="protected-scramble" aria-hidden="true"
        animateOn="view" loop loopDelay={1800} speed={50} maxIterations={12} />
      <span className="protected-hint">点击打开终端窗口，输入分享码后查看。</span>
    </button>
  );
}
