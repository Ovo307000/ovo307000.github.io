import { content } from '../lib/content';
import { profileOutput } from '../lib/terminalFiles';
import { TerminalWindow } from './ui/TerminalWindow';
import { TerminalConsole } from './TerminalConsole';
import { TerminalCode } from './TerminalCode';

function ProfileOutput() {
  return (
    <div className="profile-output" lang="en">
      <p className="command"><span className="terminal-typed" style={{ width: `${content.terminal.command.length}ch` }}>{content.terminal.command}</span></p>
      <TerminalCode output={profileOutput()} animate />
    </div>
  );
}

export function ProfileTerminal({ onResume }: { onResume: () => void }) {
  return (
    <TerminalWindow title={content.terminal.title} className="profile-terminal">
      <TerminalConsole intro={<ProfileOutput />} onResume={onResume} />
    </TerminalWindow>
  );
}
