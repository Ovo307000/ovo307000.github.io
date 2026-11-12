import { content } from '../lib/content';
import { Button } from './ui/button';
import { Icon } from './ui/Icon';
import { ProfileTerminal } from './ProfileTerminal';
import { HeroTitle } from './HeroTitle';
import { usePrivacyAccess } from './PrivacyAccess';

export function HeroSection() {
  const { openResume } = usePrivacyAccess();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="command hero-command">{content.retro.heroCommand}</p>
      <div className="hero-composition">
        <div className="hero-copy">
          <p className="hero-eyebrow">{content.hero.eyebrow}</p>
          <HeroTitle />
          <p className="hero-summary">{content.hero.summary}</p>
          <div className="hero-actions">
            <Button asChild><a href="#projects"><Icon name="code" />{content.hero.primaryAction}</a></Button>
            <Button variant="outline" onClick={openResume}><Icon name="file" />{content.hero.secondaryAction}</Button>
          </div>
        </div>
        <ProfileTerminal />
      </div>
    </section>
  );
}
