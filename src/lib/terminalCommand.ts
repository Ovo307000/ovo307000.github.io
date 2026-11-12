import type { TerminalFile } from './terminalFiles';
import { terminalColors as colors } from './terminalColors';

export type TerminalResult = string | TerminalFile | undefined;

export interface TerminalOption {
  name: string;
  repeatable?: boolean;
}

export interface TerminalParameter {
  name: string;
  required?: boolean;
  kind?: 'path' | 'directory';
  choices?: readonly string[];
}

export interface TerminalCommand {
  description: string;
  options?: readonly TerminalOption[];
  parameters?: readonly TerminalParameter[];
  examples?: readonly string[];
  fn: (...args: string[]) => TerminalResult;
}

export type TerminalCommands = Record<string, TerminalCommand>;

export function matchesTerminalOption(value: string, option: TerminalOption): boolean {
  if (value === option.name) { return true; }
  return Boolean(option.repeatable && option.name.length === 2 && value.startsWith('-') && value.length > 2 &&
    [...value.slice(1)].every((character) => character === option.name[1]));
}

export function positionalArguments(args: string[]): string[] {
  return args.filter((value) => !value.startsWith('-'));
}

export function acceptsTerminalArguments(command: TerminalCommand, args: string[], partial = false): boolean {
  const options = command.options ?? [];
  const flags = args.filter((value) => value.startsWith('-'));
  if (flags.some((value) => !options.some((option) => matchesTerminalOption(value, option)))) { return false; }
  if (options.some((option) => !option.repeatable && flags.filter((value) => matchesTerminalOption(value, option)).length > 1)) { return false; }
  const values = positionalArguments(args);
  const parameters = command.parameters ?? [];
  if (values.length > parameters.length) { return false; }
  return parameters.every((parameter, index) => {
    const value = values[index];
    if (value === undefined) { return partial || !parameter.required; }
    return Boolean(parameter.kind || !parameter.choices || parameter.choices.includes(value));
  });
}

export function terminalUsage(name: string, command: TerminalCommand): string {
  const options = (command.options ?? []).map((option) => `[${option.name}]`);
  const parameters = (command.parameters ?? []).map((parameter) =>
    parameter.required ? `<${parameter.name}>` : `[${parameter.name}]`);
  return [name, ...options, ...parameters].join(' ');
}

export function terminalHelp(commands: TerminalCommands): string {
  const lines = Object.entries(commands).flatMap(([name, command]) => [
    `${terminalUsage(name, command)}  — ${command.description}`,
    ...(command.examples?.length ? [`  Try: ${command.examples.join('  |  ')}`] : []),
  ]);
  return [...lines, '', 'Tab: complete  |  Up/Down: history'].join('\n');
}

export function executeTerminalCommand(commands: TerminalCommands, name: string, args: string[]): TerminalResult {
  if (!Object.hasOwn(commands, name)) { return colors.red('Command not found. Type help.'); }
  const command = commands[name];
  if (!acceptsTerminalArguments(command, args)) { return colors.yellow(`Usage: ${terminalUsage(name, command)}`); }
  return command.fn(...args);
}
