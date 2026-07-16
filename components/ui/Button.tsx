import Link from 'next/link';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const variants = {
  primary: 'cta-primary',
  secondary: 'border border-frad-navy-900 bg-frad-navy-900 text-white hover:bg-frad-navy-800 hover:border-frad-navy-800',
  ghost: 'border border-transparent text-ink-950 hover:border-frad-green-800 hover:bg-white',
  outline: 'cta-secondary',
  gold: 'cta-primary',
};

const sizes = {
  sm: 'min-h-10 px-4 py-2 text-xs',
  md: 'min-h-12 px-6 py-3 text-sm',
  lg: 'min-h-[3.25rem] px-7 py-4 text-sm',
};

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses = `safe-focus cta-button micro-bounce shimmer-surface text-center whitespace-normal sm:whitespace-nowrap active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    if (disabled) {
      return <span className={baseClasses} aria-disabled="true">{children}</span>;
    }
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {children}
    </button>
  );
}
