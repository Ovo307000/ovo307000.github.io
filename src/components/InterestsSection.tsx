import { content } from '../lib/content';
import { SectionHeading } from './ui/SectionHeading';
import { DirectoryItem } from './DirectoryItem';

export function InterestsSection() {
  return (
    <section id="interests" className="section interests-section">
      <SectionHeading {...content.interestsSection} />
      <div className="interests-grid">{content.interests.map(item => <DirectoryItem key={item.number} item={item} className="interest-item" />)}</div>
    </section>
  );
}
