import ansiColors from 'ansi-colors';

export const terminalColors = ansiColors.create();
// Browser stdout supports ANSI regardless of Node's TTY/environment detection.
terminalColors.enabled = true;

export function colorTerminalEntry(name: string) {
  if (name.endsWith('/')) { return terminalColors.blue(name); }
  if (name.endsWith('.sh')) { return terminalColors.green(name); }
  return terminalColors.yellow(name);
}
