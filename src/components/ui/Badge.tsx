interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'teal' | 'gray';
  className?: string;
}

const variants = {
  green: 'bg-[#1F3D2B]/10 text-[#1F3D2B]',
  teal: 'bg-teal-100 text-teal-800',
  gray: 'bg-slate-100 text-slate-700',
};

export default function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
