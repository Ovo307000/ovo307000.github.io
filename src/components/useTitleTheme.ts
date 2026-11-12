import { useEffect, useState, type RefObject } from 'react';

function readTitleTheme(element: HTMLElement, maxCharacters: number) {
  const palette = getComputedStyle(document.documentElement);
  const type = getComputedStyle(element);
  const fontSize = Number.parseFloat(type.fontSize);
  const fittedSize = Math.min(fontSize, element.clientWidth / (maxCharacters + 0.3));
  return {
    colors: ['--accent', '--text', '--muted'].map(name => palette.getPropertyValue(name).trim()),
    textColor: palette.getPropertyValue('--accent').trim(),
    fontFamily: palette.getPropertyValue('--font-body').trim(),
    fontSize: fittedSize,
    lineHeight: Number.parseFloat(type.lineHeight),
    fontScale: fittedSize / fontSize,
    textScale: 2.6 * fittedSize / Number.parseFloat(type.lineHeight),
  };
}

export function useTitleTheme(ref: RefObject<HTMLDivElement | null>, text: string, maxCharacters: number) {
  const [theme, setTheme] = useState<ReturnType<typeof readTitleTheme> | null>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) { return; }
    if (!document.createElement('canvas').getContext('2d')) { return; }
    let cancelled = false;
    const update = () => { if (!cancelled) { setTheme(readTitleTheme(element, maxCharacters)); } };
    const observer = new ResizeObserver(update);
    const family = getComputedStyle(document.documentElement).getPropertyValue('--font-body').trim();
    void document.fonts.load(`700 256px ${family}`, text).then(() => {
      if (cancelled) { return; }
      update();
      observer.observe(element);
    }, () => { /* Keep server-rendered text if the required font cannot load. */ });
    return () => { cancelled = true; observer.disconnect(); };
  }, [ref, text, maxCharacters]);
  return theme;
}
