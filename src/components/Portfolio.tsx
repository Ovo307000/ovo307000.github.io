import { useState } from 'react';
import { assets } from '../lib/assets';
import { content, projects } from '../lib/content';
import { Navigation } from './Navigation';
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

export function Portfolio() {
  const [target, setTarget] = useState<string | null>(null);
  const project = projects.find(item => item.id === target);
  const onResume = () => setTarget('resume');
  const title = project ? `${project.id}.md` : content.resumePreview.title;
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main">跳到主要内容</a>
      <img className="page-texture" src={assets.pageScanlines} alt="" aria-hidden="true" />
      <Navigation />
      <main id="main">
        <HeroSection onResume={onResume} /><AboutSection />
        <ProjectsSection onProject={setTarget} /><SkillsSection /><EducationTimeline /><InterestsSection />
        <ContactSection onResume={onResume} />
      </main>
      <Footer />
      <TerminalDialog title={title} open={target !== null} onClose={() => setTarget(null)}>
        {project && <ProjectCard project={project} detail />}
        {target === 'resume' && <ResumeViewer />}
      </TerminalDialog>
    </div>
  );
}
