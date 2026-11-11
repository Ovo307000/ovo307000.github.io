import { Fragment, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { ThemedToken } from 'shiki/types';
import type { TerminalFile } from '../lib/terminalFiles';
import { TerminalAnsi } from './TerminalAnsi';

function useHighlight(output: TerminalFile) {
  const [tokens, setTokens] = useState<ThemedToken[][]>();
  useEffect(() => {
    let active = true;
    const language = output.language;
    if (!language) { return; }
    import('../lib/terminalHighlight').then(module => module.highlightTerminal(output.text, language))
      .then(result => { if (active) { setTokens(result.tokens); } })
      .catch(() => { /* Keep readable plain output if a highlighting chunk cannot load. */ });
    return () => { active = false; };
  }, [output.text, output.language]);
  return tokens;
}

export function TerminalCode({ output, animate = false }: { output: TerminalFile; animate?: boolean }) {
  const tokens = useHighlight(output);
  if (!output.language) { return <pre className="terminal-code"><TerminalAnsi text={output.text} /></pre>; }
  const lines: ThemedToken[][] = tokens ?? output.text.split('\n').map(content => [{ content, offset: 0 }]);
  return (
    <pre className={`terminal-code${animate ? ' terminal-code-intro' : ''}`}><code>
      {lines.map((line, index) => <Fragment key={index}>
        <span className="terminal-code-line" style={{ '--line-order': index } as CSSProperties}>
          {line.map((token, position) => <span key={position} style={{ color: token.color }}>{token.content}</span>)}
        </span>{index < lines.length - 1 ? '\n' : null}
      </Fragment>)}
    </code></pre>
  );
}
