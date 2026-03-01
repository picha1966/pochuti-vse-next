import type { Metadata } from 'next';
import { getAllProducts, getAllCategories } from '@/lib/products';
import ProductCard from '@/components/shop/ProductCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Каталог слухових апаратів — Вінниця та Хмельницький | Почути Все' },
  description:
    'Купити слуховий апарат у Вінниці та Хмельницькому. Широкий вибір Signia, Audio Service. Завушні та внутрішньовушні моделі всіх цінових категорій.',
  alternates: { canonical: '/catalog' },
  openGraph: {
    title: 'Каталог слухових апаратів — Вінниця та Хмельницький | Почути Все',
    description:
      'Купити слуховий апарат у Вінниці та Хмельницькому. Широкий вибір Signia, Audio Service. Завушні та внутрішньовушні моделі всіх цінових категорій.',
    type: 'website',
    locale: 'uk_UA',
  },
};

// Human-readable labels for URL-encoded category slugs
const CATEGORY_LABELS: Record<string, string> = {
  '%d0%b0%d0%ba%d1%81%d0%b5%d1%81%d1%83%d0%b0%d1%80%d0%b8': 'Аксесуари',
  '%d0%b1%d0%b0%d0%b7%d0%be%d0%b2%d1%96-%d1%86%d0%b8%d1%84%d1%80%d0%be%d0%b2%d1%96': 'Базові цифрові',
  '%d0%b2%d0%bd%d1%83%d1%82%d1%80%d1%96%d1%88%d0%bd%d1%8c%d0%be%d0%b2%d1%83%d1%88%d0%bd%d1%96-%d0%b0%d0%bf%d0%b0%d1%80%d0%b0%d1%82%d0%b8-%d1%81i%d1%81':
    'Внутрішньовушні (CIC)',
  '%d0%bf%d1%80%d0%b5%d0%bc%d1%96%d1%83%d0%bc-%d0%ba%d0%bb%d0%b0%d1%81': 'Преміум клас',
  '%d1%81%d0%b5%d1%80%d0%b5%d0%b4%d0%bd%d1%96%d0%b9-%d0%ba%d0%bb%d0%b0%d1%81': 'Середній клас',
};

function decodeCatSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function getCategoryLabel(slug: string): string {
  return CATEGORY_LABELS[slug] ?? decodeCatSlug(slug);
}

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const allProducts = await getAllProducts();
  const categories = await getAllCategories();

  // Next.js decodes URL params, so searchParams.category is Cyrillic text.
  // products[].categorySlug is the literal URL-encoded string from JSON.
  // We must compare decoded versions.
  const filtered = category
    ? allProducts.filter((p) => {
        try {
          return decodeURIComponent(p.categorySlug) === category;
        } catch {
          return p.categorySlug === category;
        }
      })
    : allProducts;

  // Count products per category (using decoded slug as key)
  const categoryCounts = allProducts.reduce<Record<string, number>>((acc, p) => {
    const key = decodeCatSlug(p.categorySlug);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  // Only show categories that have at least 1 product
  const activeCategories = categories.filter(
    (cat) => (categoryCounts[decodeCatSlug(cat.slug)] ?? 0) > 0
  );

  const hearing = filtered.filter((p) => !p.isAccessory);
  const accessories = filtered.filter((p) => p.isAccessory);

  const totalHearing = allProducts.filter((p) => !p.isAccessory).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumb items={[{ label: 'Головна', href: '/' }, { label: 'Каталог' }]} />

      <div className="mt-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          Каталог слухових апаратів
        </h1>
        <p className="text-slate-600 text-lg">
          {totalHearing} моделей від провідних виробників · Безкоштовна діагностика слуху
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* All */}
        <Link
          href="/catalog"
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            !category
              ? 'bg-[#1F3D2B] text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400 hover:text-slate-900'
          }`}
        >
          Всі товари
          <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${!category ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
            {allProducts.length}
          </span>
        </Link>

        {/* Per-category filters — only those with products */}
        {activeCategories.map((cat) => {
          const decodedSlug = decodeCatSlug(cat.slug);
          const isActive = category === decodedSlug;
          const count = categoryCounts[decodedSlug] ?? 0;
          const label = getCategoryLabel(cat.slug);

          return (
            <Link
              key={cat.slug}
              href={`/catalog?category=${encodeURIComponent(decodedSlug)}`}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#1F3D2B] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Active filter label */}
      {category && (
        <div className="flex items-center gap-3 mb-6">
          <p className="text-slate-600 text-sm">
            Фільтр:{' '}
            <span className="font-semibold text-slate-900">
              {getCategoryLabel(
                categories.find((c) => decodeCatSlug(c.slug) === category)?.slug ?? ''
              ) || category}
            </span>
          </p>
          <Link
            href="/catalog"
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Скинути
          </Link>
        </div>
      )}

      {/* Hearing aids grid */}
      {hearing.length > 0 && (
        <section className="mb-12">
          {!category && (
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
              </svg>
              Слухові апарати
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hearing.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Accessories grid */}
      {accessories.length > 0 && (
        <section className="mb-12">
          {!category && (
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Аксесуари та витратні матеріали
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center text-center py-20 px-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Товари у цій категорії не знайдено</h2>
          <p className="text-slate-500 mb-6 max-w-sm">
            Спробуйте обрати іншу категорію або перегляньте весь каталог.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-[#1F3D2B] hover:bg-[#162d1f] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h8" />
            </svg>
            Показати всі товари
          </Link>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-3xl p-8 lg:p-10 text-center">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
          Не знаєте, який апарат підійде?
        </h2>
        <p className="text-slate-600 mb-6 max-w-xl mx-auto">
          Запишіться на консультацію — ми підберемо оптимальну модель після скринінгу слуху, особисто для вас.
        </p>
        <a
          href="tel:+380679119548"
          className="inline-flex items-center justify-center gap-2 bg-[#1F3D2B] hover:bg-[#162d1f] text-white font-bold px-10 py-4 rounded-xl transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          +38 (067) 911-95-48
        </a>
        <p className="mt-3 text-sm text-slate-500">Запис здійснюється за телефоном</p>
      </div>
    </div>
  );
}
