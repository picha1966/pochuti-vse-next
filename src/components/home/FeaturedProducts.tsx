import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/shop/ProductCard';

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts(4);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Каталог</span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Популярні моделі
            </h2>
          </div>
          <Link
            href="/catalog"
            className="flex items-center gap-1.5 text-[#1F3D2B] font-semibold hover:text-[#162d1f] transition-colors"
          >
            Переглянути всі
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
