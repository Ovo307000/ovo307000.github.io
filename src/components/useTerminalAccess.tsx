import { useEffect, useLayoutEffect, useRef } from 'react';
import type { KeyboardEvent, RefObject } from 'react';
import { usePrivacyAccess } from './PrivacyAccess';
import type { PrivacyAccessValue } from './PrivacyAccess';
import type { ConsoleHandle } from './TerminalEmulator';
import { TerminalAnsi } from './TerminalAnsi';
import { terminalColors as colors } from '../lib/terminalColors';

type AccessState = PrivacyAccessValue['access']['state'];

function accessMessage(state: AccessState, previous: string): string {
  if (state.phase === 'private') { return colors.green('Access granted. Protected sections restored in place.'); }
  if (state.phase === 'public') {
    return previous ? colors.cyan('Private sections locked. Use unlock to enter a share code.') : '';
  }
  if (state.busy) { return colors.cyan('Verifying share code...'); }
  if (state.error === '请输入分享码。') { return colors.red('Enter a share code before continuing.'); }
  if (state.error) { return colors.red('Access denied. Check the share code and try again. Esc cancels.'); }
  return colors.cyan('Protected data is locked. Enter your share code below. Esc cancels.');
}

function configureInput(input: HTMLInputElement): void {
  input.type = 'password';
  input.autofocus = true;
  input.setAttribute('aria-label', '分享码');
  input.setAttribute('autocapitalize', 'off'); input.setAttribute('autocorrect', 'off');
  input.setAttribute('enterkeyhint', 'send'); input.setAttribute('spellcheck', 'false');
  input.placeholder = 'share code';
}

function handleShareCode(event: KeyboardEvent<HTMLDivElement>, terminal: ConsoleHandle | null,
    privacy: PrivacyAccessValue): void {
  if (!(event.target instanceof HTMLInputElement)) { return; }
  if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
    event.preventDefault(); event.stopPropagation();
    const code = event.target.value;
    terminal?.clearInput();
    if (privacy.access.state.phase === 'unlock' && !privacy.access.state.busy) { void privacy.finishUnlock(code); }
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault(); event.stopPropagation();
  }
}

export function useTerminalAccess(root: RefObject<HTMLDivElement | null>, terminal: RefObject<ConsoleHandle | null>) {
  const privacy = usePrivacyAccess();
  const { state } = privacy.access;
  const previous = useRef('');
  useLayoutEffect(() => { const input = root.current?.querySelector('input'); if (input) { configureInput(input); } });
  useEffect(() => {
    const signature = `${state.phase}:${state.busy}:${state.error}`;
    if (signature === previous.current) { return; }
    const message = accessMessage(state, previous.current);
    previous.current = signature;
    if (message) { terminal.current?.pushToStdout(<TerminalAnsi text={message} />); terminal.current?.scrollToBottom(); }
    if (state.phase === 'unlock' && !state.busy) { root.current?.querySelector('input')?.focus({ preventScroll: true }); }
  }, [state.phase, state.busy, state.error, root, terminal]);
  return { busy: state.busy || state.phase !== 'unlock',
    handleKey: (event: KeyboardEvent<HTMLDivElement>) => handleShareCode(event, terminal.current, privacy),
  };
}
