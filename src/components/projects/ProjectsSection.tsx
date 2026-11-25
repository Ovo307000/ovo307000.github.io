import { content, projects } from '../../lib/content';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from './ProjectCard';

const PROJECTS_PER_ROW = 2;
const projectRows = Array.from({ length: Math.ceil(projects.length / PROJECTS_PER_ROW) }, (_, row) => {
  const start = row * PROJECTS_PER_ROW;
  return projects.slice(start, start + PROJECTS_PER_ROW);
});

export function ProjectsSection({ onProject }: { onProject: (id: string) => void }) {
  return (
    <section id="projects" className="section projects-section">
      <SectionHeading {...content.projectsSection} />
      <p className="projects-mobile-intro muted">{content.mobile.projectsIntro}</p>
      <div className="projects-grid">
        {projectRows.map(row => <div key={row[0].id} className="projects-row">
          {row.map(project => <ProjectCard key={project.id} project={project} onOpen={() => onProject(project.id)} />)}
        </div>)}
      </div>
    </section>
  );
}
