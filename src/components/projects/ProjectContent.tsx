import { content, type Project } from '../../lib/content';
import { assets } from '../../lib/assets';
import { TagList } from '../ui/TagList';

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
      <p>{project.summary}</p>
      <PracticeList title={content.projectsSection.developmentLabel} items={project.developmentHighlights} />
      <PracticeList title={project.practiceLabel} items={project.highlights} />
      <TagList tags={project.technologies} />
    </div>
  );
}
