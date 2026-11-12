import { useEffect, useState } from 'react';
import GradientASCII from './react-bits/GradientASCII';

interface BackgroundTheme {
  colors: string[];
  fontFamily: string;
}

export function SiteBackground() {
  const [theme, setTheme] = useState<BackgroundTheme | null>(null);
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    setTheme({
      colors: ['--elevated', '--border', '--accent'].map(name => styles.getPropertyValue(name).trim()),
      fontFamily: styles.getPropertyValue('--font-mono').trim(),
    });
  }, []);
  return (
    <div className="site-background" aria-hidden="true">
      {theme && <GradientASCII colors={theme.colors} fontFamily={theme.fontFamily}
        cellSize={18} density={0.72} glyphOpacity={0.7} gradientOpacity={0.35}
        glow={0.1} speed={0.35} grain={0.025} flicker={0.1} dpr={1}
        clickEffect="none" intro introDuration={3.2} />}
    </div>
  );
}
