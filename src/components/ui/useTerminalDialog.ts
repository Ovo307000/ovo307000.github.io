import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { useAnimate, useReducedMotion } from 'motion/react';

type WindowAnimate = ReturnType<typeof useAnimate>[1];
type DialogReference = RefObject<HTMLDialogElement | null>;

function finishMotion(element: HTMLElement) {
  for (const animation of element.getAnimations()) { animation.finish(); }
}

function launchFrame(element: HTMLElement, source: DOMRect | null) {
  const bounds = element.getBoundingClientRect();
  if (!source || source.bottom < 0 || source.top > innerHeight) {
    return { x: 0, y: 16, scaleX: .88, scaleY: .88 };
  }
  return {
    x: source.left + source.width / 2 - bounds.left - bounds.width / 2,
    y: source.top + source.height / 2 - bounds.top - bounds.height / 2,
    scaleX: Math.max(.12, Math.min(.6, source.width / bounds.width)),
    scaleY: Math.max(.12, Math.min(.6, source.height / bounds.height)),
  };
}

function useDialogEntry(open: boolean, dialog: DialogReference, animate: WindowAnimate,
  reduced: boolean | null, source: RefObject<DOMRect | null>, closing: RefObject<boolean>) {
  useEffect(() => {
    const element = dialog.current;
    if (!open || !element || element.open) { return; }
    source.current = document.activeElement?.getBoundingClientRect() ?? null;
    closing.current = false;
    element.removeAttribute('data-closing');
    element.showModal();
    const from = reduced ? { x: 0, y: 0, scaleX: 1, scaleY: 1 } : launchFrame(element, source.current);
    const entry = animate(element, {
      opacity: [reduced ? 1 : 0, 1], x: [from.x, 0], y: [from.y, 0],
      scaleX: [from.scaleX, 1], scaleY: [from.scaleY, 1],
    }, { type: 'spring', duration: reduced ? 0 : .36, bounce: .08 });
    return () => { entry.stop(); };
  }, [open, dialog, animate, reduced, source, closing]);
}

function useMaximizedWindow(dialog: DialogReference, animate: WindowAnimate,
  reduced: boolean | null, closing: RefObject<boolean>) {
  const [maximized, setMaximized] = useState(false);
  const previousBounds = useRef<DOMRect | null>(null);
  useLayoutEffect(() => {
    const element = dialog.current;
    const before = previousBounds.current;
    if (!element || !before) { return; }
    previousBounds.current = null;
    const after = element.getBoundingClientRect();
    void animate(element, {
      x: [before.left + before.width / 2 - after.left - after.width / 2, 0],
      y: [before.top + before.height / 2 - after.top - after.height / 2, 0],
      scaleX: [before.width / after.width, 1], scaleY: [before.height / after.height, 1],
    }, { duration: reduced ? 0 : .3, ease: [.2, .8, .2, 1] });
  }, [maximized, dialog, animate, reduced]);
  function toggleMaximized() {
    const element = dialog.current;
    if (!element?.open || closing.current) { return; }
    finishMotion(element);
    previousBounds.current = element.getBoundingClientRect();
    setMaximized(value => !value);
  }
  return { maximized, toggleMaximized, reset: () => setMaximized(false) };
}

export function useTerminalDialog(open: boolean, onClose: () => void) {
  const [dialog, animate] = useAnimate<HTMLDialogElement>();
  const closing = useRef(false);
  const source = useRef<DOMRect | null>(null);
  const reduced = useReducedMotion();
  const size = useMaximizedWindow(dialog, animate, reduced, closing);
  useDialogEntry(open, dialog, animate, reduced, source, closing);
  async function close() {
    const element = dialog.current;
    if (!element?.open || closing.current) { return; }
    closing.current = true;
    finishMotion(element);
    element.setAttribute('data-closing', 'true');
    const target = reduced ? { x: 0, y: 0, scaleX: 1, scaleY: 1 } : launchFrame(element, source.current);
    await animate(element, { ...target, opacity: 0 }, { duration: reduced ? 0 : .22, ease: [.4, 0, 1, 1] });
    element.close();
    size.reset();
    onClose();
  }
  return { dialog, close, maximized: size.maximized, toggleMaximized: size.toggleMaximized };
}
