import type { Metadata } from 'next';
import { Suspense } from 'react';
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

export const metadata: Metadata = {
  title: { absolute: 'Слухові апарати у Вінниці та Хмельницькому | Почути Все' },
  description:
    'Купити слуховий апарат у Вінниці та Хмельницькому — підбір та налаштування з досвідом 30+ років. 5000+ задоволених клієнтів. Гарантія 1 рік. Signia, Phonak, Audio Service.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD: LocalBusiness with AggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://sluh-apparat.vn.ua/#business',
            name: 'Почути Все — Центр слуху',
            url: 'https://sluh-apparat.vn.ua',
            telephone: '+380679119548',
            image: 'https://sluh-apparat.vn.ua/opengraph-image',
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
              'Центр слуху «Почути Все» — купити слуховий апарат у Вінниці та Хмельницькому. Підбір, налаштування, аудіометрія. 30+ років досвіду, 5000+ клієнтів.',
            openingHours: ['Mo-Fr 10:00-17:00'],
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
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Аудіометрія — перевірка слуху' } },
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
            '@id': 'https://sluh-apparat.vn.ua/#organization',
            name: 'Почути Все — Центр слуху',
            url: 'https://sluh-apparat.vn.ua',
            logo: 'https://sluh-apparat.vn.ua/logo.png',
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
              '@id': 'https://sluh-apparat.vn.ua/#business',
            },
            description: 'Слухопротезист з понад 30 роками досвіду у Вінниці та Хмельницькому.',
            image: 'https://sluh-apparat.vn.ua/images/natalia-hutsol.png',
            knowsAbout: ['слухопротезування', 'аудіометрія', 'налаштування слухових апаратів'],
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
                text: 'Фахівець проведе повноцінну аудіометрію та визначить ступінь втрати слуху.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Підбір апарату',
                text: 'На основі аудіограми підберемо оптимальну модель з урахуванням вашого способу життя та бюджету.',
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
                  text: 'Ціни на слухові апарати: базові цифрові — від 7 000 грн, середній клас з шумозаглушенням — від 14 000 грн, преміум з Bluetooth та зарядкою — від 25 000 грн. Конкретну модель визначаємо після безкоштовної аудіометрії. Можлива розстрочка та державна компенсація.',
                },
              },
              {
                '@type': 'Question',
                name: 'Чи потрібне направлення лікаря для перевірки слуху?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ні. Ми проводимо безкоштовну аудіометрію без направлення та без попереднього запису до ЛОРа. Достатньо зателефонувати та обрати зручний час. Перевірка займає близько 30 хвилин.',
                },
              },
              {
                '@type': 'Question',
                name: 'Чи підійде слуховий апарат для літньої людини?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Так, ми спеціалізуємося на підборі апаратів для людей різного віку. Для старшого покоління рекомендуємо завушні моделі з простим керуванням та тривалим ресурсом батарейок. Апарат підбирається індивідуально після аудіограми.',
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
        </div>
      </div>

      <ContactSection />
      <StickyMobileCTA />
      <BackToTop />
    </>
  );
}
