import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { content, type Project } from '../../lib/content';
import { Button } from '../ui/button';
import { ProjectCover } from './ProjectCover';
import { ProjectContent } from './ProjectContent';

const PREVIEW_TIMEOUT_MS = 5000;

function ProjectPreview({ url, connectionOnly, children }: {
  url: string;
  connectionOnly?: boolean;
  children: ReactNode;
}) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const request = new AbortController();
    const timeout = window.setTimeout(() => request.abort(), PREVIEW_TIMEOUT_MS);
    void fetch(url, {
      method: 'HEAD', mode: connectionOnly ? 'no-cors' : 'cors',
      credentials: 'omit', cache: 'no-store', signal: request.signal,
    })
      .then(response => {
        const reachable = response.ok || (connectionOnly && response.type === 'opaque');
        if (reachable && !request.signal.aborted) setAvailable(true);
      }, () => {
        // Unreachable previews stay hidden.
      })
      .finally(() => window.clearTimeout(timeout));
    return () => request.abort();
  }, [url, connectionOnly]);

  if (!available) return null;

  return (
    <Button asChild variant="outline" className="project-preview">
      <a href={url} target="_blank" rel="noreferrer">
        {children}<ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </Button>
  );
}

function ProjectPreviews({ project }: { project: Project }) {
  const { previewUrl, previewAdminUrl, previewConnectionOnly } = project;
  const { previewAction, tenantPreviewAction, adminPreviewAction } = content.projectsSection;
  if (!previewUrl && !previewAdminUrl) return null;

  return (
    <div className="project-previews">
      {previewUrl && <ProjectPreview key={previewUrl} url={previewUrl} connectionOnly={previewConnectionOnly}>
        {previewAdminUrl ? tenantPreviewAction : previewAction}
      </ProjectPreview>}
      {previewAdminUrl && <ProjectPreview key={previewAdminUrl} url={previewAdminUrl}>{adminPreviewAction}</ProjectPreview>}
    </div>
  );
}

export function ProjectCard({ project, onOpen, detail = false }: { project: Project; onOpen?: () => void; detail?: boolean }) {
  return (
    <article className={`project-card ${detail ? 'project-card--detail' : 'project-card--home'}`}>
      <ProjectCover project={project} />
      <ProjectContent project={project} teaser={!detail && <div className="project-teaser"><p className="muted">{project.type}</p><p>{project.teaser}</p></div>}>
        {!detail && <ProjectPreviews project={project} />}
      </ProjectContent>
      {!detail && <button className="project-desktop-trigger" type="button" onClick={onOpen} aria-label={`查看 ${project.name} 项目详情`} />}
      {!detail && <Button className="project-mobile-trigger" variant="outline" onClick={onOpen}>{content.mobile.detailAction}<ArrowRight size={16} aria-hidden="true" /></Button>}
    </article>
  );
}
