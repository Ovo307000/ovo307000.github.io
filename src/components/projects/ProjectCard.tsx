import { ArrowRight } from 'lucide-react';
import { content, type Project } from '../../lib/content';
import { Button } from '../ui/button';
import { Icon } from '../ui/Icon';
import { ProjectCover } from './ProjectCover';
import { ProjectContent } from './ProjectContent';

function ProjectTitle({ project }: { project: Project }) {
  const title = <><span className="project-number mono">{project.number}</span><h3>{project.name}</h3>{project.repositoryUrl && <Icon name="arrow-up-right" size={20} />}</>;
  if (project.repositoryUrl) {
    return <a className="project-title" href={project.repositoryUrl} target="_blank" rel="noreferrer">{title}</a>;
  }
  return <div className="project-title">{title}</div>;
}

export function ProjectCard({ project, onOpen, detail = false }: { project: Project; onOpen?: () => void; detail?: boolean }) {
  return (
    <article className={`project-card ${detail ? 'project-card--detail' : 'project-card--home'}`}>
      <ProjectCover project={project} />
      <ProjectTitle project={project} />
      <ProjectContent project={project} />
      {!detail && <div className="project-teaser"><p className="muted">{project.type}</p><p>{project.teaser}</p></div>}
      {!detail && <button className="project-desktop-trigger" type="button" onClick={onOpen} aria-label={`查看 ${project.name} 项目详情`} />}
      {!detail && <Button className="project-mobile-trigger" variant="outline" onClick={onOpen}>{content.mobile.detailAction}<ArrowRight size={16} aria-hidden="true" /></Button>}
    </article>
  );
}
