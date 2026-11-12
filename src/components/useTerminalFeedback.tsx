import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { createPortal } from 'react-dom';
import type { createTerminalShell } from '../lib/terminalShell';

type TerminalShell = ReturnType<typeof createTerminalShell>;
interface Preview { value: string; suffix: string; scrollLeft: number }

function readPreview(input: HTMLInputElement, shell: TerminalShell, composing: boolean): Preview {
  const value = input.value;
  const atEnd = input.selectionStart === value.length && input.selectionEnd === value.length;
  const active = document.activeElement === input && atEnd && !composing && value.length > 0;
  const completion = active ? shell.complete(value).value : value;
  return { value, suffix: completion.startsWith(value) ? completion.slice(value.length) : '', scrollLeft: input.scrollLeft };
}

function observeInput(input: HTMLInputElement, shell: TerminalShell, update: (preview: Preview) => void, reset: () => void) {
  let composing = false;
  function refresh() { update(readPreview(input, shell, composing)); }
  function edit() { reset(); refresh(); }
  function startComposition() { composing = true; refresh(); }
  function endComposition() { composing = false; edit(); }
  function keyUp(event: Event) {
    if (event instanceof KeyboardEvent && ['ArrowUp', 'ArrowDown', 'Escape'].includes(event.key)) { reset(); }
    refresh();
  }
  const listeners: [string, EventListener][] = [
    ['input', edit], ['select', refresh], ['keyup', keyUp], ['click', refresh],
    ['scroll', refresh], ['focus', refresh], ['blur', edit],
    ['compositionstart', startComposition], ['compositionend', endComposition],
  ];
  for (const [name, listener] of listeners) { input.addEventListener(name, listener); }
  refresh();
  return () => { for (const [name, listener] of listeners) { input.removeEventListener(name, listener); } };
}

export function useTerminalFeedback(root: RefObject<HTMLDivElement | null>, shell: TerminalShell) {
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<Preview>({ value: '', suffix: '', scrollLeft: 0 });
  const [noMatch, setNoMatch] = useState(false);
  useEffect(() => {
    const target = root.current?.querySelector('input');
    if (!target) { return; }
    setInput(target);
    return observeInput(target, shell, setPreview, () => setNoMatch(false));
  }, [root, shell]);
  const display = input?.parentElement ? createPortal(
    <>
      <span className="terminal-ghost" aria-hidden="true">
        <span style={{ transform: `translateX(-${preview.scrollLeft}px)` }}>
          <span className="terminal-ghost-prefix">{preview.value}</span>{preview.suffix}
        </span>
      </span>
      {noMatch && <span className="terminal-completion-status" role="status">No matching commands or paths</span>}
    </>, input.parentElement,
  ) : null;
  return { display, setNoMatch };
}
