import { useEffect, useLayoutEffect, useRef } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';

interface TerminalCaretProps {
  input: HTMLInputElement;
  prefix: string | null;
  scrollLeft: number;
}

function useCaretActivity(input: HTMLInputElement, prefix: string | null, scrollLeft: number) {
  useEffect(() => {
    if (prefix === null) { return; }
    input.setAttribute('data-caret-moving', '');
    const timer = window.setTimeout(() => input.removeAttribute('data-caret-moving'), 500);
    return () => {
      window.clearTimeout(timer);
      input.removeAttribute('data-caret-moving');
    };
  }, [input, prefix, scrollLeft]);
}

function useCaretMotion({ input, prefix, scrollLeft }: TerminalCaretProps) {
  const mirror = useRef<HTMLSpanElement>(null);
  const previousScroll = useRef<number | null>(null);
  const x = useMotionValue(0);
  const reduced = useReducedMotion();
  const visible = prefix !== null && !reduced;
  useLayoutEffect(() => {
    if (!visible) { previousScroll.current = null; return; }
    const width = mirror.current?.getBoundingClientRect().width ?? 0;
    const target = Math.max(0, Math.min(width - scrollLeft - .5, input.clientWidth - 1));
    input.setAttribute('data-animated-caret', '');
    const immediate = previousScroll.current === null || previousScroll.current !== scrollLeft;
    previousScroll.current = scrollLeft;
    if (immediate) { x.jump(target); }
    const movement = immediate ? null : animate(x, target, { duration: .18, ease: 'easeOut' });
    return () => { movement?.stop(); input.removeAttribute('data-animated-caret'); };
  }, [input, prefix, scrollLeft, visible, x]);
  return { mirror, x, visible };
}

export function TerminalCaret(props: TerminalCaretProps) {
  const { mirror, x, visible } = useCaretMotion(props);
  useCaretActivity(props.input, props.prefix, props.scrollLeft);
  return (
    <span className="terminal-caret-track" aria-hidden="true">
      <span ref={mirror} className="terminal-caret-measure">{props.prefix}</span>
      <motion.span className="terminal-caret" style={{ x }} hidden={!visible} />
    </span>
  );
}
