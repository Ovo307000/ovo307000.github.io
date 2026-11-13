import { content } from './content';
import { contactOutput, createTerminalFiles, displayDirectory, homeDirectory, resolveTerminalPath } from './terminalFiles';
import { colorTerminalEntry, terminalColors as colors } from './terminalColors';
import { completeTerminalInput } from './terminalCompletion';
import { executeTerminalCommand, terminalHelp } from './terminalCommand';
import type { TerminalCommand, TerminalCommands, TerminalResult } from './terminalCommand';

class TerminalFileSystem {
  private directory = homeDirectory;
  private readonly files = createTerminalFiles();
  private readonly directories = new Set(['/', '/home', homeDirectory, `${homeDirectory}/projects`, `${homeDirectory}/interests`]);

  constructor(private readonly onResume: () => void, private readonly onDirectory: (path: string) => void) {}

  path(value?: string) { return resolveTerminalPath(this.directory, value); }
  pwd() { return this.directory; }

  entries(target: string, hidden: boolean) {
    const prefix = target === '/' ? '/' : `${target}/`;
    return [...this.directories, ...this.files.keys()].filter(item => item !== target && item.startsWith(prefix))
      .map(item => item.slice(prefix.length)).filter(item => item && !item.includes('/'))
      .filter(item => hidden || !item.startsWith('.')).sort()
      .map(item => this.directories.has(`${prefix}${item}`) ? `${item}/` : item);
  }
  cd(value?: string) {
    const target = this.path(value);
    if (!this.directories.has(target)) { return colors.red(`cd: ${value}: No such directory`); }
    this.directory = target;
    this.onDirectory(displayDirectory(this.directory));
    return '';
  }
  ls(...args: string[]) {
    const target = this.path(args.find(value => value && !value.startsWith('-')) ?? '.');
    if (this.files.has(target)) { return colorTerminalEntry(target.split('/').pop() ?? target); }
    if (!this.directories.has(target)) { return colors.red(`ls: ${target}: No such file or directory`); }
    return this.entries(target, args.some(value => value.startsWith('-'))).map(colorTerminalEntry).join('\n');
  }
  cat(value: string) {
    const target = this.path(value);
    if (this.directories.has(target)) { return colors.red(`cat: ${value}: Is a directory`); }
    const file = this.files.get(target);
    if (!file) { return colors.red(`cat: ${value}: No such file`); }
    if (file.resume) { this.onResume(); return colors.cyan(file.text); }
    return file;
  }
  connect() {
    if (!this.files.has(this.path('./connect.sh'))) { return colors.red('./connect.sh: No such file'); }
    return contactOutput();
  }
}

const HELP_CAT_INTERVAL = 3;
const helpCat = ['  /\\_/\\', ' ( o.o )', '  > ^ <'].join('\n');

function whoami(files: TerminalFileSystem, option?: string) {
  if (option) { return files.cat(`${homeDirectory}/about.md`); }
  return colors.green(new URL(content.identity.githubUrl).pathname.slice(1));
}

function fileCommands(files: TerminalFileSystem): TerminalCommands {
  return {
    ls: { description: 'List files', options: [{ name: '-a', repeatable: true }],
      parameters: [{ name: 'path', kind: 'path' }], examples: ['ls -a', 'ls ./projects/'], fn: (...args) => files.ls(...args) },
    cd: { description: 'Change directory', parameters: [{ name: 'path', kind: 'directory' }], fn: value => files.cd(value) },
    pwd: { description: 'Print directory', fn: () => colors.blue(files.pwd()) },
    cat: { description: 'Read a file', parameters: [{ name: 'file', kind: 'path', required: true }],
      examples: ['cat ./skills.conf', 'cat ./education.log'], fn: value => files.cat(value) },
    open: { description: 'Preview resume or read portfolio',
      parameters: [{ name: 'file', kind: 'path', choices: ['./portfolio'], required: true }],
      examples: ['open resume.pdf', 'open ./portfolio'], fn: value => files.cat(value === './portfolio' ? `${homeDirectory}/about.md` : value) },
    './connect.sh': { description: 'Show contact details', fn: () => files.connect() },
  };
}

function createCommands(files: TerminalFileSystem, onHelp: TerminalCommand['fn']): TerminalCommands {
  return {
    help: { description: 'Show commands', options: [{ name: '-h' }], fn: onHelp },
    ...fileCommands(files),
    whoami: { description: 'Show identity or about text', options: [{ name: '--about' }], fn: option => whoami(files, option) },
    coffee: { description: 'Take a break', fn: () => '  ( (\n   ) )\n .------.\n | Java |]\n `------\'\nCoffee compiled successfully. No beans were harmed.' },
    sudo: { description: 'Ask nicely', fn: () => colors.yellow('visitor is not in the sudoers file. Try coffee instead.') },
  };
}

export function createTerminalShell(onResume: () => void, onDirectory: (path: string) => void,
    onClear: () => void, privacy: { unlock: (code?: string) => void; lock: () => void }) {
  const files = new TerminalFileSystem(onResume, onDirectory);
  let helpCycle = 0;
  function help(...args: string[]) {
    helpCycle = args.length ? 0 : (helpCycle + 1) % HELP_CAT_INTERVAL;
    const showCat = args.length > 0 || helpCycle === 0;
    const guide = colors.cyan(terminalHelp(commands));
    if (!showCat) { return guide; }
    return [guide, colors.green(helpCat), colors.cyan('Still need help? Meow.')].join('\n\n');
  }
  const commands = createCommands(files, help);
  commands.clear = { description: 'Clear the terminal', fn: () => { onClear(); return ''; } };
  commands.unlock = { description: 'Unlock private sections; omit code to open a secure prompt',
    parameters: [{ name: 'share-code' }], fn: code => { privacy.unlock(code); return ''; } };
  commands.lock = { description: 'Lock private sections', fn: () => { privacy.lock(); return ''; } };
  function complete(input: string) {
    return completeTerminalInput(input, commands, parent => files.entries(files.path(parent), true));
  }
  function execute(input: string): TerminalResult {
    const [name, ...args] = input.trim().split(/\s+/);
    if (!name) { return ''; }
    if (name !== 'help') { helpCycle = 0; }
    if (name === 'help' && args.length === 1 && args[0] === '--help') { return help('-h'); }
    if (name === 'unlock' && args.length === 1 && !['-h', '--help'].includes(args[0])) {
      privacy.unlock(args[0]); return '';
    }
    if (name !== 'help' && args.length === 1 && ['-h', '--help'].includes(args[0]) && Object.hasOwn(commands, name)) {
      return colors.cyan(terminalHelp({ [name]: commands[name] }));
    }
    return executeTerminalCommand(commands, name, args);
  }
  return { commands, complete, execute };
}
