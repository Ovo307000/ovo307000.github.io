import type { ReactNode, RefObject } from 'react';
import ConsoleModule from 'react-console-emulator';

// Node SSR exposes a CommonJS default wrapper; the browser bundle unwraps it.
const consoleExport = ConsoleModule as typeof ConsoleModule | { default: typeof ConsoleModule };
const Console = 'default' in consoleExport ? consoleExport.default : consoleExport;
export type ConsoleHandle = InstanceType<typeof Console>;

interface TerminalEmulatorProps {
  terminalRef: RefObject<ConsoleHandle | null>;
  intro?: ReactNode;
  prompt: string;
  secret?: boolean;
  disabled?: boolean;
}

export function TerminalEmulator({ terminalRef, intro, prompt, secret = false, disabled = false }: TerminalEmulatorProps) {
  return (
    <Console ref={terminalRef} commands={{}} noDefaults noNewlineParsing welcomeMessage={intro} promptLabel={prompt}
      autoFocus={false} errorText="Command not found. Type help." noHistory={secret} noEchoBack={secret} disabled={disabled}
      className="terminal-emulator" inputClassName="terminal-input" inputAreaClassName="terminal-input-row"
      messageClassName="terminal-response" style={{ backgroundColor: 'transparent', minHeight: 0, padding: 24, borderRadius: 0 }}
      contentStyle={{ padding: 0, height: 'auto', color: 'var(--text)', font: '14px/24px var(--font-mono)' }}
      inputStyle={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 16, lineHeight: '26px', minWidth: 0, height: 26, padding: 0 }}
      inputAreaStyle={{ marginTop: 24, gap: 8, alignItems: 'center' }} promptLabelStyle={{ color: 'var(--accent)', font: '16px/26px var(--font-mono)', paddingTop: 0 }}
      messageStyle={{ color: 'var(--text)', font: '14px/24px var(--font-mono)', lineHeight: '24px', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }} />
  );
}
