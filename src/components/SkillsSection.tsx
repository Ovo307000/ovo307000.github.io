import { content, skills } from '../lib/content';
import { SectionHeading } from './ui/SectionHeading';
import { DirectoryItem } from './DirectoryItem';

export function SkillsSection() {
  return (
    <section id="skills" className="section skills-section">
      <SectionHeading {...content.skillsSection} />
      <div className="skills-grid">{skills.map(skill => <DirectoryItem key={skill.number} item={skill} />)}</div>
    </section>
  );
}
