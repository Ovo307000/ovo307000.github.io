import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { usePinch } from '@use-gesture/react';

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;

function clampScale(scale: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
}

function resizeAroundPoint(scroll: HTMLElement, image: HTMLImageElement, scale: number, point: [number, number]) {
  const before = image.getBoundingClientRect();
  const x = (point[0] - before.left) / before.width;
  const y = (point[1] - before.top) / before.height;
  image.style.width = `${scale * 100}%`;
  const after = image.getBoundingClientRect();
  scroll.scrollLeft += after.left + x * after.width - point[0];
  scroll.scrollTop += after.top + y * after.height - point[1];
}

function useZoomGestures(scrollRef: RefObject<HTMLDivElement | null>, scaleRef: RefObject<number>,
  zoomTo: (scale: number, point?: [number, number]) => void) {
  usePinch(({ offset: [next], origin, event }) => {
    if (event.cancelable) { event.preventDefault(); }
    zoomTo(next, origin);
  }, { target: scrollRef, eventOptions: { passive: false }, pointer: { touch: true },
    pinchOnWheel: false, scaleBounds: { min: MIN_SCALE, max: MAX_SCALE },
    from: () => [scaleRef.current, 0] });

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) { return; }
    function onWheel(event: WheelEvent) {
      if (!event.ctrlKey) { return; }
      event.preventDefault();
      zoomTo(scaleRef.current * Math.exp(-event.deltaY * 0.01), [event.clientX, event.clientY]);
    }
    scroll.addEventListener('wheel', onWheel, { passive: false });
    return () => scroll.removeEventListener('wheel', onWheel);
  }, []);
}

export function usePdfZoom() {
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  function zoomTo(nextScale: number, point?: [number, number]) {
    const scroll = scrollRef.current;
    const image = imageRef.current;
    const next = clampScale(nextScale);
    if (scroll && image && next !== scaleRef.current) {
      const rect = scroll.getBoundingClientRect();
      resizeAroundPoint(scroll, image, next, point ?? [rect.left + scroll.clientWidth / 2, rect.top + scroll.clientHeight / 2]);
    }
    scaleRef.current = next;
    setScale(next);
  }

  useZoomGestures(scrollRef, scaleRef, zoomTo);

  function fit() {
    zoomTo(1);
    scrollRef.current?.scrollTo({ left: 0, top: 0, behavior: 'instant' });
  }

  return { scale, scrollRef, imageRef, changeScale: (amount: number) => zoomTo(scaleRef.current + amount), fit };
}
