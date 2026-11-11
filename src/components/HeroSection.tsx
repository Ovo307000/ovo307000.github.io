import { content } from '../lib/content';
import { assets } from '../lib/assets';
import { Button } from './ui/button';
import { Icon } from './ui/Icon';
import { ProfileTerminal } from './ProfileTerminal';

export function HeroSection({ onResume }: { onResume: () => void }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero-texture" src={assets.heroTexture} alt="" aria-hidden="true" />
      <p className="command hero-command">{content.retro.heroCommand}</p>
      <div className="hero-composition">
        <div className="hero-copy">
          <p className="hero-eyebrow">{content.hero.eyebrow}</p>
          <h1 id="hero-title">{content.hero.title}<span>{content.hero.accent}</span></h1>
          <p className="hero-summary">{content.hero.summary}</p>
          <div className="hero-actions">
            <Button asChild><a href="#projects"><Icon name="code" />{content.hero.primaryAction}</a></Button>
            <Button variant="outline" onClick={onResume}><Icon name="file" />{content.hero.secondaryAction}</Button>
          </div>
        </div>
        <ProfileTerminal onResume={onResume} />
      </div>
    </section>
  );
}
