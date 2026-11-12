import { useState } from 'react';
import { SiteBackground } from './SiteBackground';
import { SectionReveal } from './SectionReveal';
import { content, projects } from '../lib/content';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ProjectsSection } from './projects/ProjectsSection';
import { ProjectCard } from './projects/ProjectCard';
import { SkillsSection } from './SkillsSection';
import { EducationTimeline } from './EducationTimeline';
import { InterestsSection } from './InterestsSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { TerminalDialog } from './ui/TerminalDialog';
import { ResumeViewer } from './ResumeViewer';
import { ShareCodeTerminal } from './ShareCodeTerminal';
import { usePortfolioPrivacy } from './usePortfolioPrivacy';
import { PrivacyAccessProvider } from './PrivacyAccess';
import type { PortfolioDialog } from '../lib/portfolioDialog';

function PortfolioSections({ onProject }: { onProject: (id: string) => void }) {
  return <>
    <main id="main">
      <SectionReveal><HeroSection /></SectionReveal>
      <SectionReveal><AboutSection /></SectionReveal>
      <SectionReveal><ProjectsSection onProject={onProject} /></SectionReveal>
      <SectionReveal><SkillsSection /></SectionReveal>
      <SectionReveal><EducationTimeline /></SectionReveal>
      <SectionReveal><InterestsSection /></SectionReveal>
      <SectionReveal><ContactSection /></SectionReveal>
    </main>
    <SectionReveal><Footer /></SectionReveal>
  </>;
}

export function Portfolio() {
  const [target, setTarget] = useState<PortfolioDialog>(null);
  const project = target?.kind === 'project' ? projects.find(item => item.id === target.id) : undefined;
  const privacy = usePortfolioPrivacy(setTarget);
  let title = content.resumePreview.title;
  if (target?.kind === 'unlock') { title = 'share-code.sh'; }
  if (project) { title = `${project.id}.md`; }
  return (
    <PrivacyAccessProvider value={privacy.value}><div className="portfolio" id="top">
      <a className="skip-link" href="#main">跳到主要内容</a>
      <SiteBackground />
      <PortfolioSections onProject={id => setTarget({ kind: 'project', id })} />
      <TerminalDialog title={title} open={target !== null} onClose={privacy.closeDialog} onCloseStart={privacy.cancelUnlock}
        className={target?.kind === 'unlock' ? 'access-dialog' : undefined}>
        {target?.kind === 'unlock' && <ShareCodeTerminal />}
        {project && <ProjectCard project={project} detail />}
        {target?.kind === 'resume' && privacy.urls && <ResumeViewer urls={privacy.urls} />}
      </TerminalDialog>
    </div></PrivacyAccessProvider>
  );
}
