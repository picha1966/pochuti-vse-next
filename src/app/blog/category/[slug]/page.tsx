import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts } from '@/lib/posts';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;

function slugToName(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const categories = new Set(posts.map((p) => p.category).filter(Boolean) as string[]);

  return Array.from(categories).map((category) => ({
    slug: nameToSlug(category),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const posts = await getAllPosts();
  const categoryPosts = posts.filter(
    (p) => p.category && nameToSlug(p.category) === decodedSlug
  );

  if (categoryPosts.length === 0) return {};

  const categoryName = categoryPosts[0].category || slugToName(decodedSlug);

  return {
    title: { absolute: `${categoryName} — статті | Почути Все` },
    description: `Статті про ${categoryName.toLowerCase()} від фахівців центру слуху «Почути Все» у Вінниці та Хмельницькому.`,
    alternates: { canonical: `/blog/category/${decodedSlug}` },
    openGraph: {
      title: `${categoryName} — статті | Почути Все`,
      type: 'website',
      locale: 'uk_UA',
      url: `/blog/category/${decodedSlug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const posts = await getAllPosts();
  const categoryPosts = posts.filter(
    (p) => p.category && nameToSlug(p.category) === decodedSlug
  );

  if (categoryPosts.length === 0) notFound();

  const categoryName = categoryPosts[0].category || slugToName(decodedSlug);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${categoryName} — статті | Почути Все`,
            url: `https://pochutyvse.com.ua/blog/category/${decodedSlug}`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Головна', item: 'https://pochutyvse.com.ua' },
                { '@type': 'ListItem', position: 2, name: 'Блог', item: 'https://pochutyvse.com.ua/blog' },
                { '@type': 'ListItem', position: 3, name: categoryName, item: `https://pochutyvse.com.ua/blog/category/${decodedSlug}` },
              ],
            },
          }),
        }}
      />

      <div className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb
            items={[
              { label: 'Головна', href: '/' },
              { label: 'Блог', href: '/blog' },
              { label: categoryName },
            ]}
          />
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900">{categoryName}</h1>
          <p className="mt-1 text-slate-500">{categoryPosts.length} {categoryPosts.length === 1 ? 'стаття' : 'статті'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl border p-4 flex flex-col"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-video bg-slate-100 mb-4 overflow-hidden rounded-lg">
                  {post.image && post.image !== '/images/placeholder.jpg' ? (
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
              </Link>

              <div className="text-xs text-slate-400 mb-2">
                {post.date ? new Date(post.date).toLocaleDateString('uk-UA') : ''}
              </div>

              <h2 className="font-bold text-lg mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-[#1F3D2B] transition-colors">
                  {post.title}
                </Link>
              </h2>

              <p className="text-sm text-slate-500 flex-1">
                {(post.excerpt || '').replace(/<[^>]+>/g, '').slice(0, 140)}
              </p>

              <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-slate-400 text-xs">{post.author || ''}</span>
                <Link href={`/blog/${post.slug}`} className="text-[#1F3D2B] font-semibold hover:underline">
                  Читати →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
