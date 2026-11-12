import { useRef, type CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';
import ASCIIText from './react-bits/ASCIIText';
import { useTitleTheme } from './useTitleTheme';

const ASCII_ROWS_PER_EM = 22;

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
            <ASCIIText text={text} fontFamily={theme.fontFamily} fontWeight={700} colors={theme.colors}
              textColor={theme.textColor} asciiFontSize={Math.max(1.25, Math.min(3, theme.fontSize / ASCII_ROWS_PER_EM))} textScale={theme.textScale}
              blocks={0.85} waves={0.15} waveSpeed={2.4} chroma={0.1} tilt={0.15} hueShift={0} scramble={0.3}
              className="ascii-title-effect" style={{ left: 'calc(-.15em * var(--title-fit))', right: 'auto', width: '100%' }} />
          </span>
        ) : <span className="effect-title-fallback">{text}</span>}
      </div>
    </div>
  );
}
