import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Навігаційний ланцюжок" className="flex items-center gap-1 text-sm text-slate-500 flex-wrap">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && <span className="text-slate-300">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-slate-900 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-700 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
