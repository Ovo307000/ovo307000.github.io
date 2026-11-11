import { content } from '../lib/content';
import { assets, emblems } from '../lib/assets';
import { SectionHeading } from './ui/SectionHeading';

export function EducationTimeline() {
  return (
    <section id="education" className="section education-section">
      <SectionHeading {...content.educationSection} />
      <ol className="education-timeline" aria-label="教育经历时间线">
        {content.about.education.map(school => (
          <li className="education-stop" key={school.school}>
            <p className="education-period">{school.period}</p>
            <div className="education-track" aria-hidden="true"><img src={assets.timelineStop} width="10" height="10" alt="" /></div>
            <div className="school-identity">
              <img className="school-logo" src={emblems[school.logoPath]} width="52" height="52" alt={`${school.school}校徽`} loading="lazy" />
              <div className="school-copy"><h3>{school.school}</h3><p>{school.major}</p></div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
