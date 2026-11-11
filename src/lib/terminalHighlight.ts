import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import yaml from 'shiki/langs/yaml.mjs';
import ini from 'shiki/langs/ini.mjs';
import markdown from 'shiki/langs/markdown.mjs';
import shellscript from 'shiki/langs/shellscript.mjs';
import log from 'shiki/langs/log.mjs';
import theme from 'shiki/themes/catppuccin-mocha.mjs';
import type { TerminalLanguage } from './terminalFiles';

const highlighter = createHighlighterCore({
  themes: [theme], langs: [yaml, ini, markdown, shellscript, log],
  engine: createJavaScriptRegexEngine(),
});

export async function highlightTerminal(text: string, language: TerminalLanguage) {
  return (await highlighter).codeToTokens(text, { lang: language, theme: 'catppuccin-mocha' });
}
