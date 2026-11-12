import { content } from '../lib/content';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/button';
import { Icon } from './ui/Icon';
import { usePrivacyAccess } from './PrivacyAccess';
import { ProtectedPlaceholder } from './ProtectedPlaceholder';

export function ContactSection({ onResume }: { onResume: () => void }) {
  const profile = usePrivacyAccess().access.state.urls?.profile;
  return (
    <section id="contact" className="section contact-section">
      <SectionHeading {...content.contact} />
      {!profile && <div className="privacy-blocks">
        <ProtectedPlaceholder title="联系方式" target="contact" />
        <ProtectedPlaceholder title="完整简历" target="resume" />
      </div>}
      <div className="contact-actions">
        {profile && <Button asChild variant="outline"><a href={`mailto:${profile.email}`}><Icon name="mail" />{profile.email}</a></Button>}
        <Button asChild variant="outline"><a href={content.identity.githubUrl} target="_blank" rel="noreferrer"><Icon name="github" />{content.contact.githubLabel}</a></Button>
        {profile && <Button variant="outline" className="contact-resume" onClick={onResume}><Icon name="file" /><span className="contact-resume-desktop">{content.contact.resumeLabel}</span><span className="contact-resume-mobile">{content.mobile.resumeAction}</span></Button>}
      </div>
    </section>
  );
}
