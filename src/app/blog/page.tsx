import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import posts from '@/data/posts.json';

export const metadata: Metadata = {
  title: { absolute: 'Блог про слухові апарати — поради фахівців | Почути Все' },
  description:
    'Корисні статті про слухові апарати, слухопротезування, догляд за слухом та вибір апарата. Поради від фахівців центру «Почути Все» у Вінниці та Хмельницькому.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">
            Корисні матеріали
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Блог про слухові апарати — поради фахівців центру «Почути Все»
          </h1>
          <p className="mt-4 text-slate-600 text-base max-w-2xl leading-relaxed">
            Статті про слухопротезування, вибір апарата, догляд за слухом та відповіді на найчастіші питання наших клієнтів.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Image */}
              <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-slate-100">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    fill
                    loading="lazy"
                    className="object-cover hover:scale-[1.03] transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                )}
              </Link>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Category + date */}
                <div className="flex items-center gap-3 mb-3">
                  {post.category && (
                    <span className="text-xs font-semibold text-[#1F3D2B] bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  )}
                  <time
                    dateTime={post.date}
                    className="text-xs text-slate-400 font-medium"
                  >
                    {new Date(post.date).toLocaleDateString('uk-UA', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-slate-900 leading-snug mb-3 hover:text-[#1F3D2B] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                {/* Footer: author + link */}
                <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
                  {post.author && (
                    <span className="text-xs text-slate-400 font-medium truncate max-w-[60%]">
                      {post.author}
                    </span>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-[#1F3D2B] hover:underline underline-offset-2 flex-shrink-0"
                  >
                    Читати →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
