import { AsciiSectionTitle } from '../AsciiSectionTitle';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="command">{eyebrow}</p>
      <AsciiSectionTitle text={title} />
      {description && <p className="section-description">{description}</p>}
    </header>
  );
}
