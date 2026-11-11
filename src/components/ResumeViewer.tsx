import { useState } from 'react';
import { Download, Minus, Plus } from 'lucide-react';
import { content } from '../lib/content';
import { assets } from '../lib/assets';
import { Button } from './ui/button';
import { usePdfZoom } from './ui/usePdfZoom';
import '../styles/pdf.css';

function ZoomControls({ scale, changeScale, fit }: {
  scale: number; changeScale: (amount: number) => void; fit: () => void;
}) {
  return (
    <div className="pdf-zoom-controls" aria-label="Preview zoom controls" title="Ctrl + wheel to zoom">
      <button type="button" className="pdf-zoom-button" aria-label="Zoom out" title="Zoom out" disabled={scale <= 0.5} onClick={() => changeScale(-0.25)}><Minus size={16} aria-hidden="true" /></button>
      <span className="pdf-scale" aria-live="polite">{Math.round(scale * 100)}%</span>
      <button type="button" className="pdf-zoom-button" aria-label="Zoom in" title="Zoom in" disabled={scale >= 3} onClick={() => changeScale(0.25)}><Plus size={16} aria-hidden="true" /></button>
      <button type="button" className="pdf-fit-button" title="Fit page width" onClick={fit}>Fit width</button>
    </div>
  );
}

export function ResumeViewer() {
  const [imageFailed, setImageFailed] = useState(false);
  const { scale, scrollRef, imageRef, changeScale, fit } = usePdfZoom();
  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <div className="pdf-status">
          <span className="pdf-page-count">{content.resumePreview.privacyHint}</span>
          <ZoomControls scale={scale} changeScale={changeScale} fit={fit} />
        </div>
        <Button asChild variant="subtle" size="small" className="pdf-download"><a href={assets.resume} download="resume.pdf" aria-label={content.resumePreview.downloadLabel} title={content.resumePreview.downloadLabel}><Download size={16} aria-hidden="true" />Download</a></Button>
      </div>
      <div ref={scrollRef} className="pdf-scroll" tabIndex={0} role="region" aria-label="Resume page, scroll to read">
        {imageFailed ? <p className="pdf-fallback">Preview unavailable. <a href={assets.resume} target="_blank" rel="noreferrer">Open PDF</a></p> : <img ref={imageRef} className="resume-page" style={{ width: `${scale * 100}%` }} src={assets.resumePage} width="1786" height="2526" alt="One-page A4 resume" onError={() => setImageFailed(true)} />}
      </div>
    </div>
  );
}
