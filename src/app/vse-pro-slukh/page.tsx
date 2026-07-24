import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import ContactSection from '@/components/home/ContactSection';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { knowledgeArticles } from './knowledgeArticles';

export const metadata: Metadata = {
  title: { absolute: 'Все про слух — Центр знань про слухові апарати | Почути Все' },
  description:
    'Все про слух в одному місці: види та ступені втрати слуху, слухові апарати, перевірка слуху, тинітус, догляд та ремонт. Центр знань від фахівців «Почути Все».',
  alternates: { canonical: '/vse-pro-slukh' },
  openGraph: {
    title: 'Все про слух — Центр знань про слухові апарати | Почути Все',
    description:
      'Центр знань про слух: види втрати слуху, слухові апарати, перевірка слуху, тинітус, догляд та ремонт апаратів.',
    type: 'website',
    locale: 'uk_UA',
    url: '/vse-pro-slukh',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Все про слух — Центр знань про слухові апарати | Почути Все',
    description:
      'Центр знань про слух: види втрати слуху, слухові апарати, перевірка слуху, тинітус, догляд та ремонт апаратів.',
  },
};

export default function VseProSlukhPage() {
  const pageUrl = 'https://pochutyvse.com.ua/vse-pro-slukh';

  return (
    <>
      {/* JSON-LD: CollectionPage + ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Все про слух — Центр знань про слухові апарати',
            description:
              'Все про слух в одному місці: види та ступені втрати слуху, слухові апарати, перевірка слуху, тинітус, догляд та ремонт.',
            url: pageUrl,
            inLanguage: 'uk',
            isPartOf: { '@type': 'WebSite', '@id': 'https://pochutyvse.com.ua/#website' },
            publisher: { '@type': 'Organization', name: 'Почути Все', url: 'https://pochutyvse.com.ua' },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: knowledgeArticles.map((article, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: article.title,
              })),
            },
          }),
        }}
      />

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Головна', item: 'https://pochutyvse.com.ua' },
              { '@type': 'ListItem', position: 2, name: 'Все про слух', item: pageUrl },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={[{ label: 'Головна', href: '/' }, { label: 'Все про слух' }]} />
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[420px] sm:min-h-[480px] flex items-center bg-transparent">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-ear.png"
            alt="Крупний план вуха — центр знань про слух і слухові апарати «Почути Все»"
            fill
            className="object-cover object-right"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/35 to-black/10" />
        <div className="relative z-20 w-full py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Центр знань
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
              Все про слух
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-xl">
              Зрозумілі пояснення про слух, слухові апарати та все, що з ними пов&apos;язано —
              зібрані фахівцями центру слуху «Почути Все» в одному місці.
            </p>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-5">
            Навіщо цей розділ
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              Питання про слух рідко мають просту відповідь. Скільки коштує апарат, чи можна
              отримати його безкоштовно, який фахівець потрібен, як зрозуміти власний рівень
              втрати слуху — все це легше усвідомити, коли інформація зібрана в одному місці
              та пояснена зрозумілою мовою.
            </p>
            <p>
              У цьому розділі ми поступово публікуємо матеріали на основі досвіду фахівців
              центру слуху «Почути Все» у Вінниці та Хмельницькому — без зайвого жаргону
              та маркетингу.
            </p>
          </div>
        </div>
      </section>

      {/* ── KNOWLEDGE CARDS GRID ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Теми, які ми готуємо
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
              Матеріали публікуються поступово. Позначені теми вже в розробці.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {knowledgeArticles.map((article) => {
              const cardClassName = `group bg-white rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                article.featured
                  ? 'border-[#1F3D2B]/30 ring-1 ring-[#1F3D2B]/10'
                  : 'border-slate-100 hover:border-slate-300'
              }`;

              const cardContent = (
                <>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] flex items-center justify-center flex-shrink-0">
                      {article.icon}
                    </div>
                    {article.status === 'published' ? (
                      <Badge variant="green" className="whitespace-nowrap">
                        Читати
                      </Badge>
                    ) : (
                      <Badge variant={article.featured ? 'green' : 'gray'} className="whitespace-nowrap">
                        Незабаром
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-base leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {article.description}
                  </p>
                </>
              );

              if (article.status === 'published' && article.href) {
                return (
                  <Link key={article.slug} href={article.href} className={cardClassName}>
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div key={article.slug} className={cardClassName}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactSection />
      <StickyMobileCTA />
    </>
  );
}
