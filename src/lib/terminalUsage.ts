const TERMINAL_USED_KEY = 'portfolio.terminal.used';

export function configureTerminalHint(input: HTMLInputElement) {
  let used = false;
  try {
    used = localStorage.getItem(TERMINAL_USED_KEY) === '1';
  } catch {
    // When storage is blocked, keep the hint limited to the current page.
  }
  if (used) { input.removeAttribute('placeholder'); }
  else { input.setAttribute('placeholder', 'type help'); }
}

export function markTerminalUsed(input: HTMLInputElement) {
  if (!input.value.length || !input.hasAttribute('placeholder')) { return; }
  input.removeAttribute('placeholder');
  try {
    localStorage.setItem(TERMINAL_USED_KEY, '1');
  } catch {
    // The hint still stays hidden on this page when persistence is unavailable.
  }
}
