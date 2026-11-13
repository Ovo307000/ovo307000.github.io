import { content } from '../lib/content';
import { DirectoryItem } from './DirectoryItem';
import { SectionHeading } from './ui/SectionHeading';

export function AboutSection() {
  const about = content.about;
  return (
    <section id="about" className="section about-section">
      <SectionHeading eyebrow={about.eyebrow} title={about.title} />
      <div className="about-composition">
        <div className="about-identity">
          <p className="about-description">{about.description}</p>
        </div>
        <div className="about-features">
          <DirectoryItem className="interest-item" item={{ number: '01', icon: 'code', title: about.developmentTitle, description: about.development, tools: about.developmentTags }} />
          <DirectoryItem className="interest-item" item={{ number: '02', icon: 'terminal-small', title: about.explorationTitle, description: about.exploration, tools: about.explorationTags }} />
        </div>
      </div>
    </section>
  );
}
