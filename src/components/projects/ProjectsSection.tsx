import { content, projects } from '../../lib/content';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection({ onProject }: { onProject: (id: string) => void }) {
  return (
    <section id="projects" className="section projects-section">
      <SectionHeading {...content.projectsSection} />
      <p className="projects-mobile-intro muted">{content.mobile.projectsIntro}</p>
      <div className="projects-grid">{projects.map(project => <ProjectCard key={project.id} project={project} onOpen={() => onProject(project.id)} />)}</div>
    </section>
  );
}
