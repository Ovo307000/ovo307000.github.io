import { useRef, type CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';
import { content } from '../lib/content';
import TechText from './react-bits/TechText';
import { useTitleTheme } from './useTitleTheme';

export function HeroTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const lines = [content.hero.title, content.hero.accent];
  const maxCharacters = Math.max(...lines.map(line => Array.from(line).length));
  const text = lines.join('');
  const theme = useTitleTheme(ref, text, maxCharacters);
  const reduced = useReducedMotion();
  const style = { '--title-fit': theme?.fontScale ?? 1, '--title-max-units': maxCharacters + 0.3 } as CSSProperties;
  return (
    <div ref={ref} className="hero-heading" style={style}>
      <h1 id="hero-title" className="title-semantic">{text}</h1>
      <div aria-hidden="true" className="hero-title-lines" style={{ '--title-units': maxCharacters + 0.3 } as CSSProperties}>
        {theme && !reduced ? (
          <TechText text={lines.join('\n')} fontFamily={theme.fontFamily} fontWeight={700} fontSize={theme.fontSize}
            lineHeight={theme.lineHeight}
            letterSpacing={0} align="left" color={theme.textColor} accentColor={theme.textColor}
            reveal="letter" dashLength={4} dashGap={2} strokeWidth={1} specks={15}
            sweep={false} intro="none" guides={false} className="hero-tech-effect" />
        ) : lines.map(line => <span key={line} className="effect-title-fallback">{line}</span>)}
      </div>
    </div>
  );
}
