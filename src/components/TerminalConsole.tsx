import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import ConsoleModule from 'react-console-emulator';
import { createTerminalShell } from '../lib/terminalShell';
import { terminalColors } from '../lib/terminalColors';
import { TerminalCode } from './TerminalCode';
import { TerminalAnsi } from './TerminalAnsi';

interface TerminalConsoleProps { intro: ReactNode; onResume: () => void }

// Node SSR exposes the package's CommonJS default wrapper; Vite's browser bundle unwraps it.
const consoleExport = ConsoleModule as typeof ConsoleModule | { default: typeof ConsoleModule };
const Console = 'default' in consoleExport ? consoleExport.default : consoleExport;

function submitCommand(terminal: InstanceType<typeof Console> | null, shell: ReturnType<typeof createTerminalShell>, directory: string, input: HTMLInputElement) {
  if (!terminal || !input.value.trim()) { return; }
  const command = input.value;
  const prompt = directory === '~' ? '$' : `${directory} $`;
  terminal.pushToStdout(<TerminalAnsi text={`${terminalColors.green(prompt)} ${command}`} />, { rawInput: command });
  const result = shell.execute(command);
  if (result) { terminal.pushToStdout(typeof result === 'object' ? <TerminalCode output={result} /> : <TerminalAnsi text={result} />); }
  terminal.clearInput();
  terminal.scrollToBottom();
}

function handleConsoleKey(event: KeyboardEvent<HTMLDivElement>, terminal: InstanceType<typeof Console> | null, shell: ReturnType<typeof createTerminalShell>, directory: string) {
  if (!(event.target instanceof HTMLInputElement)) { return; }
  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    submitCommand(terminal, shell, directory, event.target);
    return;
  }
  if (event.key !== 'Tab' || event.shiftKey || !event.target.value) { return; }
  event.preventDefault();
  event.target.value = shell.complete(event.target.value);
}

function useConsoleInput(onResume: () => void) {
  const root = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<InstanceType<typeof Console>>(null);
  const resume = useRef(onResume);
  resume.current = onResume;
  const [directory, setDirectory] = useState('~');
  const [shell] = useState(() => createTerminalShell(() => resume.current(), setDirectory, () => consoleRef.current?.clearStdout()));
  useEffect(() => {
    const input = root.current?.querySelector('input');
    input?.setAttribute('aria-label', 'Terminal command');
    input?.setAttribute('placeholder', 'type help');
    input?.setAttribute('autocapitalize', 'off');
    input?.setAttribute('autocorrect', 'off');
    input?.setAttribute('enterkeyhint', 'send');
    input?.setAttribute('spellcheck', 'false');
  }, []);
  function complete(event: KeyboardEvent<HTMLDivElement>) {
    handleConsoleKey(event, consoleRef.current, shell, directory);
  }
  return { root, consoleRef, directory, complete };
}

export function TerminalConsole({ intro, onResume }: TerminalConsoleProps) {
  const { root, consoleRef, directory, complete } = useConsoleInput(onResume);
  return (
    <div ref={root} className="terminal-console" lang="en" onKeyDownCapture={complete}>
      <Console ref={consoleRef} commands={{}} noDefaults noNewlineParsing welcomeMessage={intro} promptLabel={directory === '~' ? '$' : `${directory} $`}
        autoFocus={false} errorText="Command not found. Type help."
        className="terminal-emulator" inputClassName="terminal-input" inputAreaClassName="terminal-input-row"
        messageClassName="terminal-response" style={{ backgroundColor: 'transparent', minHeight: 0, padding: 24, borderRadius: 0 }}
        contentStyle={{ padding: 0, color: 'var(--text)', font: '14px/24px var(--font-mono)' }}
        inputStyle={{ color: 'var(--accent)', font: '16px/26px var(--font-mono)', minWidth: 0, height: 26 }}
        inputAreaStyle={{ marginTop: 24 }} promptLabelStyle={{ color: 'var(--accent)', font: '14px/26px var(--font-mono)' }}
        messageStyle={{ color: 'var(--text)', font: '14px/24px var(--font-mono)', lineHeight: '24px', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }} />
    </div>
  );
}
