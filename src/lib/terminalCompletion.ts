export interface TerminalCompletion {
  value: string;
  candidates: string[];
}

type DirectoryEntries = (path: string) => string[];

export function completeTerminalInput(input: string, commands: string[], entries: DirectoryEntries): TerminalCompletion {
  const split = input.lastIndexOf(' ');
  if (split < 0) { return completeWord('', input, commands); }
  const prefix = input.slice(0, split + 1);
  const argument = input.slice(split + 1);
  const command = input.trimStart().split(/\s+/)[0];
  if (command === 'help') { return completeWord(prefix, argument, ['-h']); }
  if (command === 'whoami') { return completeWord(prefix, argument, ['--about']); }
  if (command === 'ls' && argument.startsWith('-')) { return completeWord(prefix, argument, ['-a']); }
  if (!['cat', 'cd', 'ls', 'open'].includes(command)) { return { value: input, candidates: [] }; }
  const slash = argument.lastIndexOf('/');
  const parent = argument.slice(0, slash + 1);
  const choices = entries(parent || '.').filter(name => command !== 'cd' || name.endsWith('/'));
  return completeWord(prefix + parent, argument.slice(slash + 1), choices);
}

function completeWord(prefix: string, word: string, choices: string[]): TerminalCompletion {
  const candidates = choices.filter(choice => choice.startsWith(word)).sort();
  let common = candidates[0] ?? word;
  while (!candidates.every(choice => choice.startsWith(common))) { common = common.slice(0, -1); }
  return { value: prefix + common, candidates };
}
