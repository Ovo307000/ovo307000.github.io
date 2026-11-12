import { content } from '../lib/content';
import { SectionHeading } from './ui/SectionHeading';
import { usePrivacyAccess } from './PrivacyAccess';
import { ProtectedPlaceholder } from './ProtectedPlaceholder';

export function EducationTimeline() {
  const schools = usePrivacyAccess().profile?.education;
  return (
    <section id="education" className="section education-section">
      <SectionHeading {...content.educationSection} />
      {!schools ? <ProtectedPlaceholder title="教育经历" target="education" /> :
      <ol className="education-timeline" aria-label="教育经历时间线">
        {schools.map(school => (
          <li className="education-stop" key={school.school}>
            <p className="education-period">{school.period}</p>
            <div className="education-track" aria-hidden="true"><span /></div>
            <div className="school-identity">
              <img className="school-logo" src={school.logo} width="52" height="52" alt={`${school.school}校徽`} />
              <div className="school-copy"><h3>{school.school}</h3><p>{school.major}</p></div>
            </div>
          </li>
        ))}
      </ol>}
    </section>
  );
}
