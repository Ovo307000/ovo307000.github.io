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

export function Portfolio() {
  const [target, setTarget] = useState<string | null>(null);
  const project = projects.find(item => item.id === target);
  const privacy = usePortfolioPrivacy(setTarget);
  const { onResume } = privacy;
  const title = target === 'unlock' ? 'share-code.sh' : project ? `${project.id}.md` : content.resumePreview.title;
  return (
    <PrivacyAccessProvider value={privacy}><div className="portfolio" id="top">
      <a className="skip-link" href="#main">跳到主要内容</a>
      <SiteBackground />
      <main id="main">
        <SectionReveal><HeroSection onResume={onResume} /></SectionReveal>
        <SectionReveal><AboutSection /></SectionReveal>
        <SectionReveal><ProjectsSection onProject={setTarget} /></SectionReveal>
        <SectionReveal><SkillsSection /></SectionReveal>
        <SectionReveal><EducationTimeline /></SectionReveal>
        <SectionReveal><InterestsSection /></SectionReveal>
        <SectionReveal><ContactSection onResume={onResume} /></SectionReveal>
      </main>
      <SectionReveal><Footer /></SectionReveal>
      <TerminalDialog title={title} open={target !== null} onClose={privacy.closeDialog} onCloseStart={privacy.cancelUnlock}
        className={target === 'unlock' ? 'access-dialog' : undefined}>
        {target === 'unlock' && <ShareCodeTerminal />}
        {project && <ProjectCard project={project} detail />}
        {target === 'resume' && privacy.access.state.urls && <ResumeViewer urls={privacy.access.state.urls} />}
      </TerminalDialog>
    </div></PrivacyAccessProvider>
  );
}
