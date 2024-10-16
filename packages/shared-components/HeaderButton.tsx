import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  href?: string;
}

export function HeaderButton({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

  // const variantStyles = {
  //   default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  //   outline:
  //     'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  //   ghost: 'hover:bg-accent hover:text-accent-foreground',
  // };

  const variantStyles = {
    default:
      'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105',
    outline:
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:scale-105',
    ghost: 'hover:bg-accent hover:text-accent-foreground hover:scale-105',
  };

  const sizeStyles = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link to={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
