import AnsiModule from 'ansi-to-react';

// The CommonJS package has the same Node SSR default wrapper as the console.
const ansiExport = AnsiModule as typeof AnsiModule | { default: typeof AnsiModule };
const Ansi = 'default' in ansiExport ? ansiExport.default : ansiExport;

export function TerminalAnsi({ text }: { text: string }) {
  return <Ansi className="terminal-ansi" useClasses>{text}</Ansi>;
}
