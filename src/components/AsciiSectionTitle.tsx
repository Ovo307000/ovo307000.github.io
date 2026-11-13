import { useRef, type CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';
import TechText from './react-bits/TechText';
import { useTitleTheme } from './useTitleTheme';

export function AsciiSectionTitle({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const length = Array.from(text).length;
  const theme = useTitleTheme(ref, text, length);
  const reduced = useReducedMotion();
  const style = { '--title-fit': theme?.fontScale ?? 1, '--title-max-units': length + 0.3, '--title-units': length + 0.3 } as CSSProperties;
  return (
    <div ref={ref} className="ascii-section-title" style={style}>
      <h2 className="title-semantic">{text}</h2>
      <div aria-hidden="true">
        {theme && !reduced ? (
          <span className="effect-title-line">
            <TechText text={text} fontFamily={theme.fontFamily} fontWeight={700} fontSize={theme.fontSize}
              lineHeight={theme.lineHeight} letterSpacing={0} align="left" color={theme.textColor}
              accentColor={theme.textColor} reveal="letter" dashLength={4} dashGap={2} strokeWidth={1}
              specks={15} sweep={false} intro="assemble" className="section-tech-effect" />
          </span>
        ) : <span className="effect-title-fallback">{text}</span>}
      </div>
    </div>
  );
}
