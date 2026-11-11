import type { ReactNode } from 'react';
import { assets } from '../../lib/assets';
import { WindowControls } from './WindowControls';

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  onZoom?: () => void;
  maximized?: boolean;
  className?: string;
}

export function TerminalWindow({ title, children, onClose, onZoom, maximized, className = '' }: TerminalWindowProps) {
  return (
    <div className={`terminal-window ${className}`}>
      <img className="terminal-texture" src={assets.terminalScanlines} alt="" aria-hidden="true" />
      <div className="terminal-titlebar">
        <WindowControls onClose={onClose} onZoom={onZoom} maximized={maximized} />
        <p className="terminal-title">{title}</p>
        <span className="terminal-title-balance" />
      </div>
      <div className="terminal-content">{children}</div>
    </div>
  );
}
