import { content } from '../lib/content';
import { Icon } from './ui/Icon';
import { SectionHeading } from './ui/SectionHeading';
import { TagList } from './ui/TagList';

interface AboutFeatureProps {
  number: string;
  icon: string;
  title: string;
  description: string;
  tags: readonly string[];
}

function AboutFeature({ number, icon, title, description, tags }: AboutFeatureProps) {
  return (
    <article className="about-feature">
      <p className="mono about-feature-number">{number}</p>
      <div className="about-feature-copy">
        <div className="about-feature-heading"><Icon name={icon} size={20} /><h3>{title}</h3></div>
        <p>{description}</p>
      </div>
      <TagList tags={tags} />
    </article>
  );
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
          <p className="about-description">{about.description}</p>
        </div>
        <div className="about-features">
          <AboutFeature number="01" icon="code" title={about.developmentTitle} description={about.development} tags={about.developmentTags} />
          <AboutFeature number="02" icon="terminal-small" title={about.explorationTitle} description={about.exploration} tags={about.explorationTags} />
        </div>
      </div>
    </section>
  );
}
