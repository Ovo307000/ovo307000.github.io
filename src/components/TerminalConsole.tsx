import { useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { TerminalEmulator } from './TerminalEmulator';
import type { ConsoleHandle } from './TerminalEmulator';
import { createTerminalShell } from '../lib/terminalShell';
import { colorTerminalEntry, terminalColors } from '../lib/terminalColors';
import { TerminalCode } from './TerminalCode';
import { TerminalAnsi } from './TerminalAnsi';
import { useTerminalFeedback } from './useTerminalFeedback';
import { useTerminalAccess } from './useTerminalAccess';
import { usePrivacyAccess } from './PrivacyAccess';

interface TerminalConsoleProps { intro: ReactNode; onResume: () => void }

function submitCommand(terminal: ConsoleHandle | null, shell: ReturnType<typeof createTerminalShell>, directory: string, input: HTMLInputElement) {
  if (!terminal || !input.value.trim()) { return; }
  const command = input.value;
  const prompt = directory === '~' ? '$' : `${directory} $`;
  terminal.pushToStdout(<TerminalAnsi text={`${terminalColors.green(prompt)} ${command}`} />, { rawInput: command });
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

function useConsoleInput(onResume: () => void, secret: boolean) {
  const root = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<ConsoleHandle>(null);
  const resume = useRef(onResume);
  const privacy = usePrivacyAccess();
  const privacyRef = useRef(privacy);
  privacyRef.current = privacy;
  resume.current = onResume;
  const [directory, setDirectory] = useState('~');
  const [shell] = useState(() => createTerminalShell(() => resume.current(), setDirectory,
    () => consoleRef.current?.clearStdout(), {
      unlock: () => privacyRef.current.requestUnlock(), lock: () => privacyRef.current.access.lock(),
    }));
  const feedback = useTerminalFeedback(root, shell, secret);
  function complete(event: KeyboardEvent<HTMLDivElement>) {
    if (event.nativeEvent.isComposing) { event.stopPropagation(); return; }
    const noMatch = handleConsoleKey(event, consoleRef.current, shell, directory);
    if (noMatch !== undefined) { feedback.setNoMatch(noMatch); }
    if (noMatch) { consoleRef.current?.scrollToBottom(); }
  }
  return { root, consoleRef, directory, complete, feedback: feedback.display };
}

export function TerminalConsole({ intro, onResume }: TerminalConsoleProps) {
  const secret = usePrivacyAccess().access.state.phase === 'unlock';
  const { root, consoleRef, directory, complete, feedback } = useConsoleInput(onResume, secret);
  const access = useTerminalAccess(root, consoleRef);
  return (
    <div ref={root} className="terminal-console" lang="en" onKeyDownCapture={(event) => { if (!access.handleKey(event)) { complete(event); } }}>
      <TerminalEmulator terminalRef={consoleRef} intro={intro} secret={secret} disabled={access.busy}
        prompt={secret ? 'share-code $' : directory === '~' ? '$' : `${directory} $`} />
      {feedback}
    </div>
  );
}
