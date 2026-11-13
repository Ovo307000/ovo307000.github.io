import { ArrowRight } from 'lucide-react';
import { content, type Project } from '../../lib/content';
import { Button } from '../ui/button';
import { ProjectCover } from './ProjectCover';
import { ProjectContent } from './ProjectContent';

export function ProjectCard({ project, onOpen, detail = false }: { project: Project; onOpen?: () => void; detail?: boolean }) {
  return (
    <article className={`project-card ${detail ? 'project-card--detail' : 'project-card--home'}`}>
      <ProjectCover project={project} />
      <ProjectContent project={project} />
      {!detail && <div className="project-teaser"><p className="muted">{project.type}</p><p>{project.teaser}</p></div>}
      {!detail && <button className="project-desktop-trigger" type="button" onClick={onOpen} aria-label={`查看 ${project.name} 项目详情`} />}
      {!detail && <Button className="project-mobile-trigger" variant="outline" onClick={onOpen}>{content.mobile.detailAction}<ArrowRight size={16} aria-hidden="true" /></Button>}
    </article>
  );
}
