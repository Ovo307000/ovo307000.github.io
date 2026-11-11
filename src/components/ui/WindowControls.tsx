// Adapted from CupertinoUI's free WindowControls (MIT); see CUPERTINO-LICENSE.txt.
import type { ButtonHTMLAttributes } from 'react';
import { Minimize2, X } from 'lucide-react';

interface WindowControlsProps {
  onClose?: () => void;
  onZoom?: () => void;
  maximized?: boolean;
}

function WindowControlButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`window-control ${className}`} {...props}>
      <span className="window-control-dot">{children}</span>
    </button>
  );
}

export function WindowControls({ onClose, onZoom, maximized = false }: WindowControlsProps) {
  return (
    <div className="window-controls" role="group" aria-label="Window controls">
      <WindowControlButton className="window-control--close" aria-label="Close window" title="Close window"
        onClick={onClose} disabled={!onClose} autoFocus={Boolean(onClose)}><X size={10} strokeWidth={3} aria-hidden="true" /></WindowControlButton>
      <WindowControlButton className="window-control--minimize" aria-label="Minimize unavailable" title="Minimize unavailable" disabled />
      <WindowControlButton className="window-control--zoom" aria-label={maximized ? 'Restore window' : 'Maximize window'}
        title={maximized ? 'Restore window' : 'Maximize window'} aria-pressed={maximized} onClick={onZoom} disabled={!onZoom}>
        {maximized ? <Minimize2 size={10} strokeWidth={3} aria-hidden="true" /> : <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true"><path d="M1.5 6.5V3.2L4.8 6.5H1.5ZM6.5 1.5V4.8L3.2 1.5H6.5Z" /></svg>}
      </WindowControlButton>
    </div>
  );
}
