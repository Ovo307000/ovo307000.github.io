import { useRef } from 'react';
import { TerminalEmulator } from './TerminalEmulator';
import type { ConsoleHandle } from './TerminalEmulator';
import { useTerminalAccess } from './useTerminalAccess';
import { useTerminalFeedback } from './useTerminalFeedback';

export function ShareCodeTerminal() {
  const root = useRef<HTMLDivElement>(null);
  const terminal = useRef<ConsoleHandle>(null);
  const access = useTerminalAccess(root, terminal);
  const feedback = useTerminalFeedback(root, undefined, true);
  return (
    <div ref={root} className="terminal-console share-code-terminal" lang="en" onKeyDownCapture={access.handleKey}>
      <TerminalEmulator terminalRef={terminal} secret disabled={access.busy} prompt="share-code $"
        intro={<span className="command">$ unlock ./private</span>} />
      {feedback.display}
    </div>
  );
}
