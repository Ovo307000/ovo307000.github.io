import type { ReactNode } from 'react';
import AnimatedContent from './react-bits/AnimatedContent';

export function SectionReveal({ children }: { children: ReactNode }) {
  return (
    <AnimatedContent className="section-reveal" distance={100} duration={0.8}
      ease="power3.out" threshold={0.1} stagger={0.08} once style={{ visibility: 'visible' }}>
      {children}
    </AnimatedContent>
  );
}
