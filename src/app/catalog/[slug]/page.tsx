import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getAllProducts } from '@/lib/products';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const description =
    product.seoDescription && product.seoDescription.length > 0
      ? product.seoDescription
      : product.description.slice(0, 160);

  return {
    title: product.seoTitle || product.title,
    description,
    alternates: { canonical: `/catalog/${slug}` },
    openGraph: {
      title: product.seoTitle || product.title,
      description,
      type: 'website',
      locale: 'uk_UA',
      images: product.image
        ? [{ url: `https://pochutyvse.com.ua${product.image}`, width: 800, height: 800 }]
        : [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const description =
    product.seoDescription && product.seoDescription.length > 0
      ? product.seoDescription
      : product.description.slice(0, 160);

  const brandName = product.title.toLowerCase().includes('audio service')
    ? 'Audio Service'
    : product.title.toLowerCase().includes('rexton')
    ? 'Rexton'
    : 'Signia';

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description.slice(0, 160),
    image: product.image ? `https://pochutyvse.com.ua${product.image}` : undefined,
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    ...(product.price && parseFloat(product.price) > 0
      ? {
          offers: {
            '@type': 'Offer',
            price: parseFloat(product.price).toString(),
            priceCurrency: 'UAH',
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Каталог',
        item: 'https://pochutyvse.com.ua/catalog',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.title,
        item: `https://pochutyvse.com.ua/catalog/${slug}`,
      },
    ],
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/catalog" className="hover:text-[#1F3D2B]">Каталог</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-800">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-6"
              unoptimized
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-4xl">
              🦻
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            {product.categoryName}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
            {product.title}
          </h1>
          <p className="text-slate-600 leading-relaxed">
            {description}
          </p>
          {product.price && (
            <p className="text-xl font-bold text-[#1F3D2B]">
              від {parseFloat(product.price).toLocaleString('uk-UA')} грн
            </p>
          )}
          <a
            href="tel:+380679119548"
            className="inline-flex items-center justify-center gap-2 bg-[#1F3D2B] hover:bg-[#162d1f] text-white font-bold py-3 px-6 rounded-xl transition-colors w-full md:w-auto"
          >
            Зателефонувати
          </a>
        </div>
      </div>

      {product.description.length > 160 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Опис</h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </div>
        </section>
      )}
    </main>
  );
}
