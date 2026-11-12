import content from '../../content.json';

export { content };
export type Project = typeof content.projects[number];

export const projects = [...content.projects].sort((a, b) => a.number.localeCompare(b.number));
export const skills = [...content.skills].sort((a, b) => a.number.localeCompare(b.number));
