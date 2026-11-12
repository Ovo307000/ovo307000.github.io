interface TagListProps {
  tags: readonly string[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <ul className="tags">
      {tags.map(tag => <li className="tag" key={tag}>{tag}</li>)}
    </ul>
  );
}
