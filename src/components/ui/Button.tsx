import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3D2B] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-[#1F3D2B] text-white hover:bg-[#162d1f] active:bg-[#162d1f] shadow-sm hover:shadow-md',
  secondary:
    'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-sm hover:shadow-md',
  outline:
    'border-2 border-[#1F3D2B] text-[#1F3D2B] hover:bg-[#1F3D2B] hover:text-white',
  ghost: 'text-[#1F3D2B] hover:bg-slate-100 active:bg-slate-200',
};

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-base px-6 py-3',
  lg: 'text-lg px-8 py-4',
};

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
