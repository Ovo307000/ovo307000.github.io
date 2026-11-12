import { spawnSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';

const directory = await mkdtemp(join(tmpdir(), 'portfolio-terminal-tests-'));
try {
  const compiler = spawnSync(process.execPath, ['node_modules/typescript/bin/tsc',
    'src/lib/terminalShell.ts', '--outDir', directory, '--rootDir', '.', '--module', 'commonjs',
    '--target', 'ES2022', '--moduleResolution', 'node', '--resolveJsonModule', '--esModuleInterop',
    '--strict', '--skipLibCheck'], { stdio: 'inherit' });
  if (compiler.status !== 0) { process.exitCode = compiler.status || 1; }
  else {
    const tests = spawnSync(process.execPath, ['--test', 'tests/terminalCommands.test.cjs'], {
      stdio: 'inherit', env: { ...process.env, TERMINAL_TEST_BUILD: directory, NODE_PATH: resolve('node_modules') },
    });
    process.exitCode = tests.status ?? 1;
  }
} finally {
  if (resolve(dirname(directory)) !== resolve(tmpdir()) || !basename(directory).startsWith('portfolio-terminal-tests-')) {
    throw new Error('Unexpected temporary test directory.');
  }
  await rm(directory, { recursive: true, force: true });
}
