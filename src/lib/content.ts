import content from '../../content.json';

export { content };
export type Project = typeof content.projects[number];

export const projects = [...content.projects].sort((a, b) => a.number.localeCompare(b.number));
export const skills = [...content.skills].sort((a, b) => a.number.localeCompare(b.number));
export const navigation = [
  { href: '#about', label: content.navigation[0] },
  { href: '#projects', label: content.navigation[1] },
  { href: '#skills', label: content.navigation[2] },
  { href: '#interests', label: content.navigation[3] },
];
