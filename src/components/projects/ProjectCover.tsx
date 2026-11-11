import type { Project } from '../../lib/content';
import { covers } from '../../lib/assets';

export function ProjectCover({ project }: { project: Project }) {
  return (
    <figure className="project-cover" aria-label={`${project.name} 项目主题封面`}>
      <div className="project-cover-caption"><span>{project.englishName}</span><span>{project.number}</span></div>
      <div className="project-cover-scene">
        <img src={covers[project.id]} alt="" loading="lazy" />
        <div className="project-cover-gradient" />
        <p className="project-cover-brand">{project.coverBrand}</p>
        <p className="project-cover-headline">{project.coverHeadline}</p>
      </div>
    </figure>
  );
}
