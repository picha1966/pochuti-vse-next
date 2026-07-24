import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: { absolute: 'Блог про слухові апарати — поради фахівців | Почути Все' },
  description:
    'Корисні статті про слухові апарати, слухопротезування, догляд за слухом та вибір апарата.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Блог про слухові апарати — поради фахівців | Почути Все',
    description:
      'Корисні статті про слухові апарати, слухопротезування, догляд за слухом та вибір апарата.',
    type: 'website',
    locale: 'uk_UA',
    url: '/blog',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const posts = allPosts;

  if (!posts || posts.length === 0) {
    return (
      <div className="p-10 text-center text-slate-500">
        Немає статей
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Блог
          </h1>
          <p className="mt-2 text-slate-500">
            Поради фахівців центру слуху «Почути Все» — слухопротезування, апарати, здоров&apos;я слуху
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug + (post.publishedAt || post._id || '')}
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

              <div className="flex items-center gap-2 mb-2">
                {post.category && (
                  <span className="text-xs font-medium text-[#1F3D2B] bg-green-50 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                )}
                <span className="text-xs text-slate-400">
                  {post.date ? new Date(post.date).toLocaleDateString('uk-UA') : ''}
                </span>
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
                <span className="text-slate-400 text-xs">
                  {post.author || ''}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[#1F3D2B] font-semibold hover:underline"
                >
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
