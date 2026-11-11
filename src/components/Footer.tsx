import { content } from '../lib/content';

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-prompt mono">{content.retro.footerPrompt}</p>
      <div className="footer-content"><a className="mono" href="#top">{content.site.brand}</a><span>{content.site.footer}</span><span className="mono">{content.site.copyright}</span></div>
    </footer>
  );
}
