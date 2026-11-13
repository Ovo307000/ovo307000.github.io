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
        cellSize={18} density={0.8} glyphOpacity={0.85} gradientOpacity={0.9}
        glow={0.2} speed={1} grain={0.08} flicker={0.2} dpr={1}
        clickEffect="wave" intro introDuration={3.2} />}
    </div>
  );
}
