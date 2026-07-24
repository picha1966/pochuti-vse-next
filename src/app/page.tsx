import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroBanner from '@/components/home/HeroBanner';
import HowItWorks from '@/components/home/HowItWorks';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FeaturedProductsSkeleton from '@/components/home/FeaturedProductsSkeleton';
import Brands from '@/components/home/Brands';
import WhyUs from '@/components/home/WhyUs';
import ClinicGallery from '@/components/home/ClinicGallery';
import FAQ from '@/components/home/FAQ';
import LeaderSection from '@/components/home/LeaderSection';
import Testimonials from '@/components/home/Testimonials';
import GoogleReviewsTeaser from '@/components/home/GoogleReviewsTeaser';
import UrgencySection from '@/components/home/UrgencySection';
import ContactSection from '@/components/home/ContactSection';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import BackToTop from '@/components/BackToTop';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: { absolute: 'Слухові апарати у Вінниці та Хмельницькому | Почути Все' },
  description:
    'Купити слуховий апарат у Вінниці та Хмельницькому — підбір та налаштування з досвідом 30+ років. 5000+ задоволених клієнтів. Гарантія 1 рік. Signia, Phonak, Audio Service.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const recentPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      {/* JSON-LD: WebSite with SearchAction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': 'https://pochutyvse.com.ua/#website',
            name: 'Почути Все — Центр слуху',
            url: 'https://pochutyvse.com.ua',
            inLanguage: 'uk',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://pochutyvse.com.ua/catalog?search={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* JSON-LD: LocalBusiness with AggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://pochutyvse.com.ua/#business',
            name: 'Почути Все — Центр слуху',
            url: 'https://pochutyvse.com.ua',
            telephone: '+380679119548',
            image: 'https://pochutyvse.com.ua/og-image.jpg',
            priceRange: '₴₴',
            areaServed: [
              { '@type': 'City', name: 'Вінниця' },
              { '@type': 'City', name: 'Хмельницький' },
            ],
            sameAs: ['https://t.me/pochuty_vse'],
            address: [
              {
                '@type': 'PostalAddress',
                streetAddress: 'вул. Театральна, 10, офіс 207',
                addressLocality: 'Вінниця',
                addressCountry: 'UA',
              },
              {
                '@type': 'PostalAddress',
                streetAddress: "вул. Кам'янецька, 19/А",
                addressLocality: 'Хмельницький',
                addressCountry: 'UA',
              },
            ],
            description:
              'Центр слуху «Почути Все» — купити слуховий апарат у Вінниці та Хмельницькому. Підбір, налаштування, скринінг слуху. 30+ років досвіду, 5000+ клієнтів.',
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '10:00',
                closes: '17:00',
              },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              bestRating: '5',
              worstRating: '1',
              ratingCount: '120',
            },
            serviceArea: [
              { '@type': 'City', name: 'Вінниця' },
              { '@type': 'City', name: 'Хмельницький' },
              { '@type': 'AdministrativeArea', name: 'Вінницька область' },
              { '@type': 'AdministrativeArea', name: 'Хмельницька область' },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Слухові апарати',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Підбір слухового апарата' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Налаштування слухового апарата' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Скринінг слуху — перевірка' } },
              ],
            },
          }),
        }}
      />

      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://pochutyvse.com.ua/#organization',
            name: 'Почути Все — Центр слуху',
            url: 'https://pochutyvse.com.ua',
            logo: 'https://pochutyvse.com.ua/logo.png',
            foundingDate: '1995',
            description: 'Центр слуху «Почути Все» — лідер у підборі слухових апаратів на Вінниччині та Хмельниччині.',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+380679119548',
              contactType: 'customer service',
              availableLanguage: 'Ukrainian',
            },
            sameAs: ['https://t.me/pochuty_vse'],
          }),
        }}
      />

      {/* JSON-LD: Person (Audiologist/Leader) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Гуцол Наталія Євгенівна',
            jobTitle: 'Слухопротезист, керівник центру слуху',
            worksFor: {
              '@type': 'LocalBusiness',
              '@id': 'https://pochutyvse.com.ua/#business',
            },
            description: 'Слухопротезист з понад 30 роками досвіду у Вінниці та Хмельницькому.',
            image: 'https://pochutyvse.com.ua/og-image.jpg',
            knowsAbout: ['слухопротезування', 'скринінг слуху', 'налаштування слухових апаратів'],
          }),
        }}
      />

      {/* JSON-LD: HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Як підібрати слуховий апарат у центрі «Почути Все»',
            description: 'Покрокова процедура підбору слухового апарата у нашому центрі.',
            totalTime: 'PT60M',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Запис на прийом',
                text: 'Зателефонуйте для запису на консультацію. Оберіть зручний час у Вінниці або Хмельницькому.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Діагностика слуху',
                text: 'Фахівець проведе повноцінний скринінг слуху та визначить ступінь втрати слуху.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Підбір апарату',
                text: 'На основі результатів скринінгу слуху підберемо оптимальну модель з урахуванням вашого способу життя та бюджету.',
              },
              {
                '@type': 'HowToStep',
                position: 4,
                name: 'Налаштування і супровід',
                text: 'Індивідуальне програмування апарату. Повторні налаштування перші 30 днів безкоштовно.',
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Скільки коштує слуховий апарат?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ціни на слухові апарати: базові цифрові — від 7 000 грн, середній клас з шумозаглушенням — від 14 000 грн, преміум з Bluetooth та зарядкою — від 25 000 грн. Конкретну модель визначаємо після безкоштовного скринінгу слуху. Можлива розстрочка та державна компенсація.',
                },
              },
              {
                '@type': 'Question',
                name: 'Чи потрібне направлення лікаря для перевірки слуху?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ні. Ми проводимо безкоштовний скринінг слуху без направлення та без попереднього запису до ЛОРа. Достатньо зателефонувати та обрати зручний час. Перевірка займає близько 30 хвилин.',
                },
              },
              {
                '@type': 'Question',
                name: 'Чи підійде слуховий апарат для літньої людини?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Так, ми спеціалізуємося на підборі апаратів для людей різного віку. Для старшого покоління рекомендуємо завушні моделі з простим керуванням та тривалим ресурсом батарейок. Апарат підбирається індивідуально після скринінгу слуху.',
                },
              },
              {
                '@type': 'Question',
                name: 'Чи можна отримати державну компенсацію?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Так, в Україні існує програма компенсації вартості слухових апаратів для осіб з офіційно підтвердженою інвалідністю по слуху. Наші фахівці нададуть консультацію та допоможуть зібрати потрібні документи.',
                },
              },
              {
                '@type': 'Question',
                name: 'Яка гарантія на слухові апарати?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Всі апарати постачаються з офіційною гарантією виробника строком 1 рік. Також ми надаємо сервісне обслуговування та повторні налаштування протягом перших 30 днів безкоштовно.',
                },
              },
              {
                '@type': 'Question',
                name: 'Скільки часу займає адаптація до апарату?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Адаптація займає від 4 до 12 тижнів. Перші дні апарат може здаватись незвичним — це нормально. Ми проводимо безкоштовні повторні налаштування у перший місяць, щоб підібрати оптимальні параметри.',
                },
              },
              {
                '@type': 'Question',
                name: 'Чи можна придбати апарат у розстрочку?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Так, ми пропонуємо оформлення розстрочки без переплат через банківських партнерів. Це дає змогу придбати апарат середнього або преміального класу без одноразової повної оплати. Деталі уточнюйте за телефоном +38 (067) 911-95-48.',
                },
              },
            ],
          }),
        }}
      />

      <HeroBanner />
      <UrgencySection />

      <HowItWorks />
      <CategoryGrid />
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <Brands />
      <WhyUs />
      <ClinicGallery />
      <FAQ />
      <LeaderSection />
      <Testimonials />
      <GoogleReviewsTeaser />

      {/* Internal SEO links */}
      <div className="bg-slate-50 border-t border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
          <a href="/kupyty-sluhovyi-aparat-vinnytsia" className="hover:text-[#1F3D2B] transition-colors hover:underline">
            Купити слуховий апарат у Вінниці
          </a>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <a href="/kupyty-sluhovyi-aparat-khmelnytskyi" className="hover:text-[#1F3D2B] transition-colors hover:underline">
            Купити слуховий апарат у Хмельницькому
          </a>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <a href="/nalashtuvannya-sluhovoho-aparata" className="hover:text-[#1F3D2B] transition-colors hover:underline">
            Налаштування слухового апарата
          </a>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <a href="/perevirka-slukhu-vinnytsia" className="hover:text-[#1F3D2B] transition-colors hover:underline">
            Перевірка слуху у Вінниці
          </a>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <a href="/perevirka-slukhu-khmelnytskyi" className="hover:text-[#1F3D2B] transition-colors hover:underline">
            Перевірка слуху у Хмельницькому
          </a>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <a href="/vse-pro-slukh" className="hover:text-[#1F3D2B] transition-colors hover:underline">
            Все про слух
          </a>
        </div>
      </div>

      {/* Latest blog articles — passes PageRank from homepage to blog */}
      {recentPosts.length > 0 && (
        <section className="bg-white border-t border-slate-100 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900">Корисні статті</h2>
              <Link href="/blog" className="text-sm font-semibold text-[#1F3D2B] hover:underline">
                Всі статті →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-4">
                      {post.image && post.image !== '/images/placeholder.jpg' ? (
                        <Image
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-[#1F3D2B] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                      {post.excerpt.replace(/<[^>]+>/g, '').slice(0, 120)}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
      <StickyMobileCTA />
      <BackToTop />
    </>
  );
}
