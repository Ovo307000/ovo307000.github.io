import { useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { TerminalEmulator } from './TerminalEmulator';
import type { ConsoleHandle } from './TerminalEmulator';
import { createTerminalShell } from '../lib/terminalShell';
import { colorTerminalEntry, terminalColors } from '../lib/terminalColors';
import { TerminalCode } from './TerminalCode';
import { TerminalAnsi } from './TerminalAnsi';
import { useTerminalFeedback } from './useTerminalFeedback';
import { usePrivacyAccess } from './PrivacyAccess';

interface TerminalConsoleProps { intro: ReactNode }

function submitCommand(terminal: ConsoleHandle | null, shell: ReturnType<typeof createTerminalShell>, directory: string, input: HTMLInputElement) {
  if (!terminal || !input.value.trim()) { return; }
  const command = input.value;
  const prompt = directory === '~' ? '$' : `${directory} $`;
  const sensitive = /^\s*unlock\s+\S/.test(command) && !/^\s*unlock\s+(?:-h|--help)\s*$/.test(command);
  if (sensitive) { terminal.pushToStdout(<TerminalAnsi text={`${terminalColors.green(prompt)} unlock ••••••`} />); }
  else { terminal.pushToStdout(<TerminalAnsi text={`${terminalColors.green(prompt)} ${command}`} />, { rawInput: command }); }
  const result = shell.execute(command);
  if (result) { terminal.pushToStdout(typeof result === 'object' ? <TerminalCode output={result} /> : <TerminalAnsi text={result} />); }
  terminal.clearInput();
  terminal.scrollToBottom();
}

function completeInput(terminal: ConsoleHandle | null, shell: ReturnType<typeof createTerminalShell>, input: HTMLInputElement) {
  const result = shell.complete(input.value);
  input.value = result.value;
  input.setSelectionRange(result.value.length, result.value.length);
  if (result.candidates.length < 2) { return result.candidates.length === 0; }
  const message = result.candidates.map(colorTerminalEntry).join('  ');
  terminal?.pushToStdout(<TerminalAnsi text={message} />);
  terminal?.scrollToBottom();
  return false;
}

function handleConsoleKey(event: KeyboardEvent<HTMLDivElement>, terminal: ConsoleHandle | null, shell: ReturnType<typeof createTerminalShell>, directory: string) {
  if (!(event.target instanceof HTMLInputElement)) { return; }
  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    submitCommand(terminal, shell, directory, event.target);
    return false;
  }
  if (event.key !== 'Tab' || event.shiftKey) { return; }
  event.preventDefault();
  return completeInput(terminal, shell, event.target);
}

function useConsoleInput() {
  const root = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<ConsoleHandle>(null);
  const privacy = usePrivacyAccess();
  const privacyRef = useRef(privacy);
  privacyRef.current = privacy;
  const [directory, setDirectory] = useState('~');
  const [shell] = useState(() => createTerminalShell(() => privacyRef.current.openResume(), setDirectory,
    () => consoleRef.current?.clearStdout(), {
      unlock: (code) => {
        if (code === undefined) { privacyRef.current.requestUnlock(); return; }
        void privacyRef.current.finishUnlock(code).then((success) => {
          const message = success ? 'Access granted.' : 'Access denied. Check the share code and try again.';
          consoleRef.current?.pushToStdout(<TerminalAnsi text={message} />);
          consoleRef.current?.scrollToBottom();
        });
      }, lock: () => privacyRef.current.lock(),
    }));
  const feedback = useTerminalFeedback(root, shell);
  function complete(event: KeyboardEvent<HTMLDivElement>) {
    if (event.nativeEvent.isComposing) { event.stopPropagation(); return; }
    const noMatch = handleConsoleKey(event, consoleRef.current, shell, directory);
    if (noMatch !== undefined) { feedback.setNoMatch(noMatch); }
    if (noMatch) { consoleRef.current?.scrollToBottom(); }
  }
  return { root, consoleRef, directory, complete, feedback: feedback.display };
}

export function TerminalConsole({ intro }: TerminalConsoleProps) {
  const { root, consoleRef, directory, complete, feedback } = useConsoleInput();
  useLayoutEffect(() => { root.current?.querySelector('input')?.setAttribute('aria-label', 'Terminal command'); }, [root]);
  return (
    <div ref={root} className="terminal-console" lang="en" onKeyDownCapture={complete}>
      <TerminalEmulator terminalRef={consoleRef} intro={intro} prompt={directory === '~' ? '$' : `${directory} $`} />
      {feedback}
    </div>
  );
}
