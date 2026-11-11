import type { ReactNode } from 'react';
import { TerminalWindow } from './TerminalWindow';
import { useTerminalDialog } from './useTerminalDialog';

interface TerminalDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function TerminalDialog({ title, open, onClose, children }: TerminalDialogProps) {
  const { dialog, close, maximized, toggleMaximized } = useTerminalDialog(open, onClose);
  return (
    <dialog ref={dialog} className="portfolio-dialog" aria-label={title} data-maximized={maximized}
      onCancel={event => { event.preventDefault(); void close(); }}
      onClick={event => { if (event.target === event.currentTarget) { void close(); } }}>
      <TerminalWindow title={title} onClose={() => { void close(); }} onZoom={toggleMaximized} maximized={maximized}>{children}</TerminalWindow>
    </dialog>
  );
}
