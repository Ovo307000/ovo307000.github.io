import { content, projects, skills } from './content';

export type TerminalLanguage = 'yaml' | 'ini' | 'markdown' | 'shellscript' | 'log';

export interface TerminalFile {
  text: string;
  language?: TerminalLanguage;
  resume?: boolean;
}

export const homeDirectory = '/home/visitor';

export function profileOutput(): TerminalFile {
  const profile = content.terminal;
  const text = [
    `${profile.roleKey}: ${profile.roleValue}`, `${profile.focusKey}: ${profile.focusValue}`,
    `${profile.stackKey}: [${profile.stackValue.split(' / ').join(', ')}]`,
    `${profile.scriptKey}: [${profile.scriptValue.split(' / ').join(', ')}]`,
    '', '# Try: whoami --about',
  ].join('\n');
  return { text, language: 'yaml' };
}

export function contactOutput(): TerminalFile {
  const { email, githubUrl } = content.identity;
  return { text: `email: ${email}\ngithub: ${githubUrl}\nresume: resume.pdf`, language: 'yaml' };
}

function sectionFiles(): [string, TerminalFile][] {
  const about = `# About me\n\n${content.about.englishDescription}`;
  const toolkit = skills.map(skill => `[${skill.number}]\ntools = ${skill.tools.replaceAll(' · ', ', ')}`).join('\n\n');
  const education = content.about.education.map(entry =>
    `${entry.period.replace(' — ', ' -> ')}\n${entry.englishSchool}\n${entry.englishMajor}`).join('\n\n');
  const contact = contactOutput().text;
  return [
    [`${homeDirectory}/about.md`, { text: about, language: 'markdown' }],
    [`${homeDirectory}/skills.conf`, { text: toolkit, language: 'ini' }],
    [`${homeDirectory}/education.log`, { text: education, language: 'log' }],
    [`${homeDirectory}/connect.sh`, { text: `#!/bin/sh\ncat <<'CONTACT'\n${contact}\nCONTACT`, language: 'shellscript' }],
  ];
}

export function createTerminalFiles() {
  const files = new Map<string, TerminalFile>([
    [`${homeDirectory}/profile.yaml`, profileOutput()],
    [`${homeDirectory}/resume.pdf`, { text: 'Opening resume.pdf...', resume: true }],
    [`${homeDirectory}/.motd`, { text: 'You found the hidden file. Try coffee or sudo.' }],
    ...sectionFiles(),
  ]);
  for (const project of projects) {
    const technologies = project.technologies.filter(value => /^[\x20-\x7e]+$/.test(value));
    const text = [`# ${project.id}`, project.englishName, '', `Stack: ${technologies.join(' / ')}`];
    if (project.repositoryUrl) { text.push(`Repository: ${project.repositoryUrl}`); }
    files.set(`${homeDirectory}/projects/${project.id}.md`, { text: text.join('\n'), language: 'markdown' });
  }
  for (const interest of content.interests) {
    files.set(`${homeDirectory}/interests/${interest.terminalName}.md`, {
      text: `# ${interest.terminalName}\n\n${interest.englishDescription}`, language: 'markdown',
    });
  }
  return files;
}

export function resolveTerminalPath(directory: string, value = '~') {
  const expanded = value.replace(/^~(?=\/|$)/, homeDirectory);
  const segments = expanded.startsWith('/') ? [] : directory.split('/').filter(Boolean);
  for (const segment of expanded.split('/')) {
    if (!segment || segment === '.') { continue; }
    if (segment === '..') { segments.pop(); } else { segments.push(segment); }
  }
  return `/${segments.join('/')}`;
}

export function displayDirectory(directory: string) {
  return directory.replace(homeDirectory, '~');
}
