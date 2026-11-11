import { content } from '../lib/content';
import { assets } from '../lib/assets';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/button';
import { Icon } from './ui/Icon';

export function ContactSection({ onResume }: { onResume: () => void }) {
  return (
    <section id="contact" className="section contact-section">
      <img className="contact-texture" src={assets.contactTexture} alt="" aria-hidden="true" />
      <SectionHeading {...content.contact} />
      <div className="contact-actions">
        <Button asChild variant="outline"><a href={`mailto:${content.identity.email}`}><Icon name="mail" />{content.contact.emailLabel}</a></Button>
        <Button asChild variant="outline"><a href={content.identity.githubUrl} target="_blank" rel="noreferrer"><Icon name="github" />{content.contact.githubLabel}</a></Button>
        <Button variant="outline" className="contact-resume" onClick={onResume}><Icon name="file" /><span className="contact-resume-desktop">{content.contact.resumeLabel}</span><span className="contact-resume-mobile">{content.mobile.resumeAction}</span></Button>
      </div>
    </section>
  );
}
