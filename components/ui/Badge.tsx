interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'green' | 'blue' | 'gold' | 'orange' | 'muted';
  size?: 'sm' | 'md';
}

const variants = {
  default: 'border-ink-950/10 bg-white/80 text-ink-700',
  green: 'border-frad-green-800/20 bg-frad-green-50 text-frad-green-900',
  blue: 'border-frad-navy-900/15 bg-frad-navy-50 text-frad-navy-900',
  gold: 'border-frad-green-800/20 bg-frad-green-50 text-frad-green-900',
  orange: 'border-frad-red-600/20 bg-frad-red-50 text-frad-red-700',
  muted: 'border-ink-950/10 bg-paper-100 text-ink-600',
};

const sizes = {
  sm: 'px-2.5 py-0.5 text-[0.68rem]',
  md: 'px-3 py-1 text-xs',
};

export default function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-[6px] border font-extrabold uppercase tracking-[0.06em] ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
