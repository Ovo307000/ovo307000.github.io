import { icons } from '../../lib/assets';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 16, className = '' }: IconProps) {
  const source = icons[name as keyof typeof icons];
  if (!source) { throw new Error(`Unknown portfolio icon: ${name}`); }
  return <img className={`icon ${className}`} src={source} width={size} height={size} alt="" aria-hidden="true" />;
}
