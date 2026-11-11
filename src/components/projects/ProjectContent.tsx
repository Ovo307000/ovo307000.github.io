import { content, type Project } from '../../lib/content';
import { assets } from '../../lib/assets';

function PracticeList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="practice-group">
      <h4>{title}</h4>
      <ul>{items.map(item => <li key={item}><img src={assets.bullet} width="4" height="14" alt="" /><span>{item}</span></li>)}</ul>
    </div>
  );
}

export function ProjectContent({ project }: { project: Project }) {
  return (
    <div className="project-content">
      <div className="project-identity"><p className="mono muted">{project.englishName}</p><p>{project.status}</p></div>
      <p>{project.summary}</p>
      <PracticeList title={content.projectsSection.developmentLabel} items={project.developmentHighlights} />
      <PracticeList title={project.practiceLabel} items={project.highlights} />
      <div className="project-technologies">{project.technologies.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
    </div>
  );
}
