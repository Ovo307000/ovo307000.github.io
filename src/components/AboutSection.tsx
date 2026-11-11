import { content } from '../lib/content';
import { Icon } from './ui/Icon';
import { SectionHeading } from './ui/SectionHeading';

function AboutFeature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return <div className="about-feature"><div className="about-feature-heading"><Icon name={icon} size={20} /><h3>{title}</h3></div><p>{description}</p></div>;
}

export function AboutSection() {
  const about = content.about;
  return (
    <section id="about" className="section about-section">
      <SectionHeading eyebrow={about.eyebrow} title={about.title} />
      <div className="about-composition">
        <div className="about-identity">
          <p className="mono muted about-label">{about.focusLabel}</p>
          <h3 className="about-focus">{about.focusTitle}</h3>
          <div className="tags">{about.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
          <p className="about-description">{about.description}</p>
        </div>
        <div className="about-features">
          <AboutFeature icon="code" title={about.developmentTitle} description={about.development} />
          <AboutFeature icon="terminal-small" title={about.explorationTitle} description={about.exploration} />
        </div>
      </div>
    </section>
  );
}
