import { acceptsTerminalArguments, matchesTerminalOption, positionalArguments } from './terminalCommand';
import type { TerminalCommands, TerminalParameter } from './terminalCommand';

export interface TerminalCompletion {
  value: string;
  candidates: string[];
}

type DirectoryEntries = (path: string) => string[];

function parameterChoices(argument: string, parameter: TerminalParameter | undefined, entries: DirectoryEntries): string[] {
  if (!parameter) { return []; }
  const choices = [...(parameter.choices ?? [])];
  if (!parameter.kind) { return choices; }
  const slash = argument.lastIndexOf('/');
  const parent = argument.slice(0, slash + 1);
  const paths = entries(parent || '.').filter((name) => parameter.kind !== 'directory' || name.endsWith('/'));
  return [...new Set([...choices, ...paths.map((name) => parent + name)])];
}

export function completeTerminalInput(input: string, commands: TerminalCommands, entries: DirectoryEntries): TerminalCompletion {
  const leading = input.match(/^\s*/)?.[0] ?? '';
  const content = input.slice(leading.length);
  const split = content.search(/\s/);
  if (split < 0) { return completeWord(leading, content, Object.keys(commands)); }
  const name = content.slice(0, split);
  if (!Object.hasOwn(commands, name)) { return { value: input, candidates: [] }; }
  const command = commands[name];
  const lastSpace = input.search(/\S*$/);
  const prefix = input.slice(0, lastSpace);
  const argument = input.slice(lastSpace);
  const consumed = input.slice(leading.length + name.length, lastSpace).trim().split(/\s+/).filter(Boolean);
  if (!acceptsTerminalArguments(command, consumed, true)) { return { value: input, candidates: [] }; }
  const options = (command.options ?? []).filter((option) => option.repeatable ||
    !consumed.some((value) => matchesTerminalOption(value, option))).map((option) => option.name);
  const parameter = command.parameters?.[positionalArguments(consumed).length];
  const choices = argument.startsWith('-') ? options : parameterChoices(argument, parameter, entries);
  if (!argument) { choices.push(...options); }
  return completeWord(prefix, argument, [...new Set(choices)]);
}

function completeWord(prefix: string, word: string, choices: string[]): TerminalCompletion {
  const candidates = choices.filter(choice => choice.startsWith(word)).sort();
  let common = candidates[0] ?? word;
  while (!candidates.every(choice => choice.startsWith(common))) { common = common.slice(0, -1); }
  return { value: prefix + common, candidates };
}
