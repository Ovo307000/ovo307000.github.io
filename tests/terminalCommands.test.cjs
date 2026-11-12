const { test } = require('node:test');
const assert = require('node:assert/strict');
const { join } = require('node:path');
const { createTerminalShell } = require(join(process.env.TERMINAL_TEST_BUILD, 'src/lib/terminalShell.js'));
const strip = (value) => String(value).replace(/\x1b\[[0-9;]*m/g, '');
function makeShell() {
  const effects = { resume: 0, unlock: 0, lock: 0, clear: 0, directory: '~' };
  const shell = createTerminalShell(() => effects.resume++, (path) => { effects.directory = path; },
    () => effects.clear++, { unlock: () => effects.unlock++, lock: () => effects.lock++ });
  return { ...shell, effects };
}

test('every registered command automatically appears in help and name completion', () => {
  const shell = makeShell();
  const help = strip(shell.execute('help'));
  for (const name of Object.keys(shell.commands)) {
    assert.ok(help.includes(name), name);
    assert.ok(shell.complete(name.slice(0, 1)).candidates.includes(name), name);
  }
});

test('new command, options and arguments propagate without editing help or completion', () => {
  const shell = makeShell();
  shell.commands.inspect = { description: 'Inspect a mode', options: [{ name: '--verbose' }],
    parameters: [{ name: 'mode', required: true, choices: ['brief', 'full'] }], fn: (...args) => args.join('|') };
  assert.equal(shell.complete('insp').value, 'inspect');
  assert.equal(shell.complete('inspect --v').value, 'inspect --verbose');
  assert.equal(shell.complete('inspect --verbose f').value, 'inspect --verbose full');
  assert.ok(strip(shell.execute('help')).includes('inspect [--verbose] <mode>'));
  assert.equal(shell.execute('inspect --verbose full'), '--verbose|full');
  assert.match(strip(shell.execute('inspect --missing full')), /Usage: inspect/);
  assert.match(strip(shell.execute('inspect')), /Usage: inspect/);
  assert.match(strip(shell.execute('inspect other')), /Usage: inspect/);
  assert.deepEqual(shell.complete('inspect full ').candidates, ['--verbose']);
});

test('options, positions and dynamic paths share one contract', () => {
  const shell = makeShell();
  assert.equal(shell.complete('help -').value, 'help -h');
  assert.equal(shell.complete('whoami --').value, 'whoami --about');
  assert.equal(shell.complete('ls -').value, 'ls -a');
  assert.ok(shell.complete('ls ').candidates.includes('-a'));
  assert.ok(shell.complete('open ./p').candidates.includes('./portfolio'));
  assert.equal(shell.complete('open ./port').value, 'open ./portfolio');
  assert.equal(shell.complete('cat ./pro').value, 'cat ./pro');
  assert.ok(shell.complete('cd ').candidates.every((item) => item.endsWith('/')));
  assert.equal(shell.complete('cat ~/.m').value, 'cat ~/.motd');
  assert.equal(shell.complete('cat /home/visitor/res').value, 'cat /home/visitor/resume.pdf');
  shell.execute('cd projects');
  assert.equal(shell.complete('cat paw').value, 'cat pawlink.md');
  assert.ok(shell.complete('ls -a ').candidates.includes('pawlink.md'));
  assert.equal(shell.complete('ls ../projects/ -').value, 'ls ../projects/ -a');
});

test('invalid arguments never trigger commands and supported behavior is retained', () => {
  const shell = makeShell();
  for (const command of ['unlock extra', 'lock extra', 'clear extra', 'pwd extra', 'cat', 'open',
    'whoami --missing', 'help invalid', 'ls --missing', 'cd projects interests']) {
    assert.match(strip(shell.execute(command)), /Usage:/, command);
  }
  assert.equal(shell.effects.unlock, 0);
  assert.equal(shell.effects.lock, 0);
  assert.equal(shell.effects.clear, 0);
  assert.equal(shell.effects.directory, '~');
  assert.ok(strip(shell.execute('ls -aa')).includes('.motd'));
  assert.ok(strip(shell.execute('help -h')).includes('( o.o )'));
  assert.equal(typeof shell.execute('whoami --about'), 'object');
  shell.execute('open resume.pdf'); shell.execute('unlock'); shell.execute('lock'); shell.execute('clear');
  assert.deepEqual([shell.effects.resume, shell.effects.unlock, shell.effects.lock, shell.effects.clear], [1, 1, 1, 1]);
  assert.equal(shell.execute('open ./portfolio').language, 'markdown');
  assert.equal(shell.execute('cd'), '');
});

test('completion preserves indentation and does not invent arguments for no-argument commands', () => {
  const shell = makeShell();
  assert.equal(shell.complete('  un').value, '  unlock');
  assert.equal(shell.complete('  whoami  --a').value, '  whoami  --about');
  assert.deepEqual(shell.complete('unlock ').candidates, []);
  assert.deepEqual(shell.complete('missing ').candidates, []);
  assert.deepEqual(shell.complete('cat resume.pdf ').candidates, []);
});
