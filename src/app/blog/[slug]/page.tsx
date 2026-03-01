import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: { absolute: post.seoTitle || post.title },
    description: post.seoDescription || post.excerpt?.slice(0, 155),
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt?.slice(0, 155),
      type: 'article',
      locale: 'uk_UA',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
    },
  };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function renderContent(html: string): string {
  return html
    // Strip WordPress shortcodes
    .replace(/\[.*?\]/g, '')
    // Strip data-start / data-end attributes
    .replace(/data-start="\d+"[^>]*>/g, '>')
    .replace(/data-end="\d+"[^>]*/g, '')
    // Strip HTML comments (including unclosed ones like <!-- CLEANED...)
    .replace(/<!--[\s\S]*?(-->|$)/g, '')
    // Strip any <a> tags linking to the old WordPress domain
    .replace(/<a[^>]*sluh-apparat\.vn\.ua\/wp-content[^>]*>[\s\S]*?<\/a>/gi, '')
    .replace(/<a[^>]*sluh-apparat\.vn\.ua\/product[^>]*>[\s\S]*?<\/a>/gi, '')
    // Strip <img> tags pointing to the old WordPress domain
    .replace(/<img[^>]*sluh-apparat\.vn\.ua\/wp-content[^>]*\/?>/gi, '')
    // Strip leftover WooCommerce inline price markup
    .replace(/<bdi>[^<]*<\/bdi>/gi, '')
    // Strip <h3> tags wrapping old product links
    .replace(/<h3><a[^>]*sluh-apparat\.vn\.ua[^>]*>[\s\S]*?<\/a><\/h3>/gi, '')
    // Collapse multiple blank lines
    .replace(/(\s*<\/p>\s*){2,}/g, '</p>');
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* JSON-LD BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt?.slice(0, 155),
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'uk',
            url: `https://pochutyvse.com.ua/blog/${post.slug}`,
            image: post.image ? `https://pochutyvse.com.ua${post.image}` : undefined,
            author: post.author
              ? { '@type': 'Person', name: post.author }
              : { '@type': 'Organization', name: 'Почути Все' },
            publisher: {
              '@type': 'Organization',
              name: 'Почути Все',
              url: 'https://pochutyvse.com.ua',
              logo: { '@type': 'ImageObject', url: 'https://pochutyvse.com.ua/logo.png' },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://pochutyvse.com.ua/blog/${post.slug}`,
            },
          }),
        }}
      />

      <Breadcrumb
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Блог', href: '/blog' },
          { label: post.title },
        ]}
      />

      <article className="mt-6">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
              Корисні статті
            </span>
            {post.date && (
              <span className="text-sm text-slate-400">{formatDate(post.date)}</span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-xl text-slate-600 leading-relaxed">{post.excerpt.slice(0, 200)}</p>
          )}
        </header>

        {/* Article content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-[#1F3D2B] prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:text-slate-700 prose-ol:text-slate-700"
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />
      </article>

      {/* CTA */}
      <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Потрібна консультація фахівця?</h2>
        <p className="text-slate-300 mb-6">
          Запис здійснюється за телефоном. Вінниця та Хмельницький.
        </p>
        <a
          href="tel:+380679119548"
          className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          +38 (067) 911-95-48
        </a>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Читайте також</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-md transition-shadow group"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-[#1F3D2B] transition-colors mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
