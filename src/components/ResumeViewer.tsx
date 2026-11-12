import { useState } from 'react';
import { Download, Minus, Plus } from 'lucide-react';
import { content } from '../lib/content';
import { Button } from './ui/button';
import { usePdfZoom } from './ui/usePdfZoom';
import type { ResumeUrls } from '../lib/resumeContract';
import '../styles/pdf.css';

function ZoomControls({ scale, zoomIn, zoomOut, canZoomIn, canZoomOut, fit }: {
  scale: number; zoomIn: () => void; zoomOut: () => void;
  canZoomIn: boolean; canZoomOut: boolean; fit: () => void;
}) {
  return (
    <div className="pdf-zoom-controls" aria-label="Preview zoom controls" title="Ctrl + wheel to zoom">
      <button type="button" className="pdf-zoom-button" aria-label="Zoom out" title="Zoom out" disabled={!canZoomOut} onClick={zoomOut}><Minus size={16} aria-hidden="true" /></button>
      <span className="pdf-scale" aria-live="polite">{Math.round(scale * 100)}%</span>
      <button type="button" className="pdf-zoom-button" aria-label="Zoom in" title="Zoom in" disabled={!canZoomIn} onClick={zoomIn}><Plus size={16} aria-hidden="true" /></button>
      <button type="button" className="pdf-fit-button" title="Fit page width" onClick={fit}>Fit width</button>
    </div>
  );
}
export function ResumeViewer({ urls: { pdf, preview } }: { urls: ResumeUrls }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { scale, scrollRef, imageRef, zoomIn, zoomOut, canZoomIn, canZoomOut, fit } = usePdfZoom();
  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <div className="pdf-status">
          <span className="pdf-page-count">{content.resumePreview.privacyHint}</span>
          <ZoomControls scale={scale} zoomIn={zoomIn} zoomOut={zoomOut} canZoomIn={canZoomIn} canZoomOut={canZoomOut} fit={fit} />
        </div>
        <Button asChild variant="subtle" size="small" className="pdf-download"><a href={pdf} download="resume.pdf" aria-label={content.resumePreview.downloadLabel} title={content.resumePreview.downloadLabel}><Download size={16} aria-hidden="true" />Download</a></Button>
      </div>
      <div ref={scrollRef} className="pdf-scroll" tabIndex={0} role="region" aria-label="Resume page, scroll to read">
        {imageFailed ? <p className="pdf-fallback">Preview unavailable. <a href={pdf} target="_blank" rel="noreferrer">Open PDF</a></p> : <img ref={imageRef} className="resume-page" style={{ width: `${scale * 100}%` }} src={preview} width="1786" height="2526" alt="One-page A4 resume" onError={() => setImageFailed(true)} />}
      </div>
    </div>
  );
}
