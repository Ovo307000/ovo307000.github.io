import { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { content, navigation } from '../lib/content';

export function Navigation() {
  const [expanded, setExpanded] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header" onKeyDown={event => {
      if (event.key !== 'Escape' || !expanded) { return; }
      setExpanded(false);
      toggle.current?.focus();
    }}>
      <div className="navigation-content">
        <a className="brand mono" href="#top" onClick={() => setExpanded(false)}><span aria-hidden="true">&gt;_</span>{content.site.brand}</a>
        <button ref={toggle} type="button" className="navigation-toggle" aria-expanded={expanded}
          aria-controls="main-navigation" aria-label={expanded ? '收起导航' : '展开导航'} onClick={() => setExpanded(!expanded)}>
          {expanded ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="main-navigation" className="main-navigation" data-expanded={expanded} aria-label="主页导航">
          <div className="navigation-links">{navigation.map(item => <a key={item.href} href={item.href} onClick={() => setExpanded(false)}>{item.label}</a>)}</div>
        </nav>
        <p className="navigation-prompt mono">{content.retro.prompt}</p>
      </div>
    </header>
  );
}
