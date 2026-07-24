import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

type StaticParamPost = {
  slug?: string | { current?: string } | null;
};

export const revalidate = 86400;

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts
    .map((p: StaticParamPost) => {
      const sourceSlug = p.slug;
      const slug =
        typeof sourceSlug === 'string'
          ? sourceSlug
          : typeof sourceSlug?.current === 'string'
          ? sourceSlug.current
          : null;

      return slug ? { slug } : null;
    })
    .filter(Boolean) as { slug: string }[];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const description =
    post.seoDescription ||
    (post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '').slice(0, 155) : '') ||
    post.title;

  const ogImage = post.image
    ? [{ url: `https://pochutyvse.com.ua${post.image}`, width: 1200, height: 630, alt: post.imageAlt || post.title }]
    : [{ url: 'https://pochutyvse.com.ua/og-image.jpg', width: 1200, height: 630 }];

  return {
    title: { absolute: post.seoTitle || post.title },
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.seoTitle || post.title,
      description,
      type: 'article',
      locale: 'uk_UA',
      url: `/blog/${slug}`,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description,
      images: post.image
        ? [`https://pochutyvse.com.ua${post.image}`]
        : ['https://pochutyvse.com.ua/og-image.jpg'],
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

function markdownToHtml(markdown: string): string {
  const lines = markdown.split('\n');
  const html: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      html.push('</ul>');
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      continue;
    }

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      closeList();
      html.push(`<h3>${h3[1]}</h3>`);
      continue;
    }

    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      closeList();
      html.push(`<h2>${h2[1]}</h2>`);
      continue;
    }

    // Markdown # heading → render as h2 (page template already has h1)
    const h1 = line.match(/^#\s+(.+)$/);
    if (h1) {
      closeList();
      html.push(`<h2>${h1[1]}</h2>`);
      continue;
    }

    const listItem = line.match(/^[-*]\s+(.+)$/);
    if (listItem) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${listItem[1]}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${line}</p>`);
  }

  closeList();
  return html.join('\n');
}

function renderContent(html: string): string {
  const cleaned = html
    .replace(/\[.*?\]/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<a[^>]*sluh-apparat\.vn\.ua\/wp-content[^>]*>[\s\S]*?<\/a>/gi, '')
    .replace(/<a[^>]*sluh-apparat\.vn\.ua\/product[^>]*>[\s\S]*?<\/a>/gi, '')
    .replace(/<img[^>]*sluh-apparat\.vn\.ua\/wp-content[^>]*\/?>/gi, '')
    .replace(/<bdi>[^<]*<\/bdi>/gi, '')
    .replace(/<h3><a[^>]*sluh-apparat\.vn\.ua[^>]*>[\s\S]*?<\/a><\/h3>/gi, '')
    .replace(/(\s*<\/p>\s*){2,}/g, '</p>')
    // Downgrade <h1> in body content to <h2> — page template already has the h1
    .replace(/<h1([^>]*)>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>');

  if (/<[a-z][\s\S]*>/i.test(cleaned)) return cleaned;

  return markdownToHtml(cleaned);
}

export default async function BlogPostPage({ params }: PageProps) {
  const rawSlug = (await params).slug;
  const slug = decodeURIComponent(rawSlug);

  let post = await getPostBySlug(slug);

  if (!post && rawSlug !== slug) {
    post = await getPostBySlug(rawSlug);
  }

  if (!post) notFound();

  const allPosts = await getAllPosts();

  // Related posts: same category first, then other posts — exclude current
  const sameCategoryPosts = post.category
    ? allPosts.filter((p) => p.slug !== slug && p.category === post!.category)
    : [];
  const otherPosts = allPosts.filter(
    (p) => p.slug !== slug && p.category !== post!.category
  );
  const related = [...sameCategoryPosts, ...otherPosts].slice(0, 2);

  const description =
    post.seoDescription ||
    (post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '').slice(0, 155) : '') ||
    post.title;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: 'https://pochutyvse.com.ua' },
      { '@type': 'ListItem', position: 2, name: 'Блог', item: 'https://pochutyvse.com.ua/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://pochutyvse.com.ua/blog/${post.slug}` },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle || post.title,
    description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'uk',
    url: `https://pochutyvse.com.ua/blog/${post.slug}`,
    image: post.image ? `https://pochutyvse.com.ua${post.image}` : 'https://pochutyvse.com.ua/og-image.jpg',
    author: post.author
      ? { '@type': 'Person', name: post.author, worksFor: { '@type': 'Organization', name: 'Почути Все', url: 'https://pochutyvse.com.ua' } }
      : { '@type': 'Organization', name: 'Почути Все', url: 'https://pochutyvse.com.ua' },
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
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

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
            {post.category && (
              <Link
                href={`/blog/category/${encodeURIComponent(post.category.toLowerCase().replace(/\s+/g, '-'))}`}
                className="text-xs font-medium text-[#1F3D2B] bg-green-50 px-2.5 py-1 rounded-full hover:bg-green-100 transition-colors"
              >
                {post.category}
              </Link>
            )}
            {!post.category && (
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                Корисні статті
              </span>
            )}
            {post.date && (
              <span className="text-sm text-slate-400">{formatDate(post.date)}</span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-xl text-slate-600 leading-relaxed">
              {post.excerpt.replace(/<[^>]+>/g, '').slice(0, 200)}
            </p>
          )}

          {post.author && (
            <div className="mt-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1F3D2B] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{post.author}</p>
                <p className="text-xs text-slate-500">Фахівець центру слуху «Почути Все»</p>
              </div>
            </div>
          )}
        </header>

        {/* Featured image */}
        {post.image && post.image !== '/images/placeholder.jpg' && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}

        {/* Article content */}
        <div className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-[#1F3D2B] prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:text-slate-700 prose-ol:text-slate-700">
          <div dangerouslySetInnerHTML={{ __html: renderContent(post.content as string) }} />
        </div>
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
                key={p._id || `${p.slug}-${p.date}`}
                href={`/blog/${p.slug}`}
                className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-md transition-shadow group"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-[#1F3D2B] transition-colors mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {(p.excerpt || '').replace(/<[^>]+>/g, '').slice(0, 120)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
