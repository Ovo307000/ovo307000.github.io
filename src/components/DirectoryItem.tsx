import { Icon } from './ui/Icon';
import { TagList } from './ui/TagList';

interface DirectoryItemProps {
  item: { number: string; title: string; tools: readonly string[]; description: string; icon: string };
  className?: string;
}

export function DirectoryItem({ item, className = '' }: DirectoryItemProps) {
  return (
    <article className={`directory-item ${className}`}>
      <div className="directory-item-heading"><Icon name={item.icon} size={22} /><span className="mono">{item.number}</span></div>
      <h3>{item.title}</h3>
      <TagList tags={item.tools} />
      <p className="directory-description">{item.description}</p>
    </article>
  );
}
