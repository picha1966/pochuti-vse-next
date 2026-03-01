import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/shop/ProductCard';
import ContactSection from '@/components/home/ContactSection';
import StickyMobileCTA from '@/components/StickyMobileCTA';

export const metadata: Metadata = {
  title: { absolute: 'Купити слуховий апарат у Хмельницькому — Підбір та Ціни | Почути Все' },
  description:
    'Купити слуховий апарат у Хмельницькому — підбір після скринінгу слуху, налаштування, ціни від 7 000 грн. 30+ років досвіду. Вул. Кам\'янецька, 19/А. +38 (067) 911-95-48.',
  alternates: { canonical: '/khmelnytskyi' },
  openGraph: {
    title: 'Купити слуховий апарат у Хмельницькому | Ціни та Підбір | Почути Все',
    description: 'Слухові апарати у Хмельницькому: ціни від 7 000 грн, безкоштовний скринінг слуху, налаштування, гарантія 1 рік. 30+ років досвіду. +38 (067) 911-95-48.',
    type: 'website',
    locale: 'uk_UA',
  },
};

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'Скринінг слуху безкоштовно',
    text: 'Комп\'ютерний скринінг слуху без направлення. Визначаємо стан слуху та пояснюємо результати зрозумілою мовою.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    title: 'Підбір апарату',
    text: 'Підбираємо з урахуванням ступеня втрати слуху, способу життя та побажань. Показуємо реальні відмінності між моделями.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Програмне налаштування',
    text: 'Налаштовуємо апарат за результатами скринінгу слуху на комп\'ютерній станції. Безкоштовні повторні корекції протягом 30 днів.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: 'Ремонт та чищення',
    text: 'Гарантійний та позагарантійний ремонт. Планове чищення, заміна трубок та фільтрів для тривалої роботи апарату.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Компенсація та розстрочка',
    text: 'Консультуємо щодо держкомпенсації та допомагаємо оформити документи. Є розстрочка без переплат.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Турботливий супровід',
    text: 'Завжди на зв\'язку після підбору. Відповідаємо на запитання, консультуємо по телефону та приймаємо на безкоштовне коригування.',
  },
];

const trustItems = [
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    title: 'Індивідуальний підхід', desc: 'До кожного пацієнта — окремо, без шаблонів',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
    title: 'Сучасне обладнання', desc: "Комп'ютерний скринінг слуху та програмування апаратів",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: 'Офіційна гарантія', desc: 'Тільки оригінальні апарати від сертифікованих постачальників',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    title: 'Підтримка після підбору', desc: 'Ми поруч на весь термін служби апарату',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: 'Держкомпенсація', desc: 'Допомагаємо оформити виплати для людей з інвалідністю',
  },
];

export default async function KhmelnytskyiPage() {
  const products = (await getFeaturedProducts(4)).filter((p) => !p.isAccessory);

  return (
    <>
      {/* JSON-LD FAQPage Khmelnytskyi */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Де купити слуховий апарат у Хмельницькому?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Центр слуху «Почути Все» у Хмельницькому розташований за адресою: вул. Кам\'янецька, 19/А. Працюємо Пн–Пт 10:00–17:00, Сб–Нд: вихідні. Тел: +38 (067) 911-95-48.',
                },
              },
              {
                '@type': 'Question',
                name: 'Скільки коштує слуховий апарат у Хмельницькому?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ціни на слухові апарати у Хмельницькому: базові — від 7 000 грн, середній клас — від 14 000 грн, преміум — від 25 000 грн. Можлива розстрочка та держкомпенсація.',
                },
              },
              {
                '@type': 'Question',
                name: 'Як проходить підбір слухового апарата у Хмельницькому?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Спочатку проводиться безкоштовний скринінг слуху, за результатами якого фахівець підбирає апарат. Потім апарат програмується під ваш профіль слуху. Весь процес — 1–2 години. Безкоштовні повторні налаштування — 30 днів.',
                },
              },
              {
                '@type': 'Question',
                name: 'Чи проводите ви скринінг слуху у Хмельницькому безкоштовно?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Так, скринінг слуху у нашому центрі у Хмельницькому безкоштовний. Направлення лікаря не потрібне. Зателефонуйте +38 (067) 911-95-48 для запису.',
                },
              },
              {
                '@type': 'Question',
                name: 'Які бренди слухових апаратів є у центрі у Хмельницькому?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'У нашому центрі у Хмельницькому представлені апарати Signia (Siemens), Phonak та Audio Service. Є завушні, внутрішньовушні та преміум-моделі з Bluetooth.',
                },
              },
            ],
          }),
        }}
      />

      {/* JSON-LD HearingAidProvider */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HearingAidProvider',
            name: 'Центр слуху «Почути Все» — Хмельницький',
            url: 'https://pochutyvse.com.ua/khmelnytskyi',
            telephone: '+380679119548',
            address: {
              '@type': 'PostalAddress',
              streetAddress: "вул. Кам'янецька, 19/А",
              addressLocality: 'Хмельницький',
              addressRegion: 'Хмельницька область',
              postalCode: '29000',
              addressCountry: 'UA',
            },
            geo: { '@type': 'GeoCoordinates', latitude: 49.4224, longitude: 26.9961 },
            openingHoursSpecification: [
              { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '17:00' },
            ],
            priceRange: '₴₴',
            description: "Центр слуху у Хмельницькому — підбір, налаштування та ремонт слухових апаратів.",
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={[{ label: 'Головна', href: '/' }, { label: 'Хмельницький' }]} />
      </div>

      {/* ── HERO з фото міста ── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[460px] sm:h-[520px] w-full">
          <Image
            src="/images/khmelnytskyi-city.jpg"
            alt="Хмельницький — центральна площа з ратушею"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-4 py-1.5 text-sm font-semibold text-white mb-5">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Центр слуху у Хмельницькому
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                Слухові апарати у Хмельницькому — купити та підібрати
              </h1>
              <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-xl mx-auto">
                Турботливий та уважний підхід до вашого слуху. Безкоштовна діагностика,
                індивідуальний підбір апарату та довгострокова підтримка.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="#contact-khmelnytskyi"
                  className="inline-flex items-center justify-center gap-2 bg-[#1F3D2B] hover:bg-[#162d1f] text-white font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Записатися на консультацію
                </Link>
                <a
                  href="tel:+380679119548"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/40 text-white font-semibold text-base px-8 py-4 rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +38 (067) 911-95-48
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 py-1.5 bg-slate-50">
          Ми допомагаємо мешканцям Хмельницького чути краще
        </p>
      </section>

      {/* ── Address bar ── */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-5 text-sm text-slate-600 items-center">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span><strong className="text-slate-900">Хмельницький,</strong> вул. Кам&apos;янецька, 19/А</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Пн–Пт: 10:00–17:00, Сб–Нд: вихідні
            </div>
            <a href="tel:+380679119548" className="flex items-center gap-2 font-semibold text-[#1F3D2B] hover:text-[#162d1f] transition-colors">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +38 (067) 911-95-48
            </a>
          </div>
        </div>
      </div>

      {/* ── Emotional intro ── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
            Слух — це зв&apos;язок із життям
          </h2>
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              Хмельницький — місто, де живуть і працюють тисячі людей, яким щодня потрібне повноцінне спілкування. Втрата слуху — це не просто незручність. Це поступова ізоляція від найрідніших: дружини чи чоловіка, дітей, колег, друзів.
            </p>
            <p>
              <strong className="text-slate-800">Сучасні цифрові слухові апарати здатні змінити це назавжди.</strong> Маленький пристрій, налаштований досвідченим фахівцем, повертає чіткість мовлення, впевненість у розмові та якість щоденного життя.
            </p>
            <p>
              Центр слуху <strong className="text-slate-800">«Почути Все»</strong> у Хмельницькому — це місце, де вас почують і зрозуміють. Наш фахівець приділяє кожному клієнту стільки часу, скільки потрібно. Ніякого поспіху та тиску. Тільки турботливий, уважний підхід.
            </p>
          </div>
        </div>
      </section>

      {/* ── Specialist + Leadership ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Наші фахівці у Хмельницькому
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Команда, яка справді дбає про ваш слух та комфорт
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main specialist */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl shadow-inner">
                  👩‍⚕️
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Спеціаліст</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Подзігун Віта Михайлівна</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Понад <strong className="text-slate-800">10 років досвіду</strong> у слухопротезуванні. Спеціаліст із підбору сучасних цифрових апаратів різних категорій. Віта Михайлівна відома своєю уважністю до деталей та турботливим ставленням до кожного пацієнта — незалежно від віку та складності ситуації.
                </p>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {[
                    'Робота з пацієнтами різного віку: від дітей до людей похилого віку',
                    'Уважний підбір з урахуванням способу життя та побажань',
                    'Навчання правильному догляду за апаратом',
                    'Супровід та сервіс протягом усього терміну служби',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#1F3D2B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Leadership mention */}
            <div className="bg-slate-900 rounded-3xl p-8 shadow-lg text-white flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                  👩‍💼
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Керівник центрів слуху</div>
                <h3 className="text-xl font-extrabold text-white mb-2">Гуцол Наталія Євгенівна</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Наш центр у Хмельницькому працює під методичним керівництвом{' '}
                  <strong className="text-white">Гуцол Наталії Євгенівни</strong> —
                  фахівця з <strong className="text-white">понад 30-річним досвідом</strong> у слухопротезуванні.
                  Вона особисто контролює якість підбору та консультує у складних випадках.
                </p>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  {[
                    'Методичний нагляд та контроль якості в обох центрах',
                    'Консультації найскладніших клінічних ситуацій',
                    'Довіра сотень сімей Вінниці та Хмельницького',
                    'Викладач та методист у галузі слухопротезування',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Послуги центру у Хмельницькому
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Весь необхідний цикл допомоги — в одному місці
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-300 hover:shadow-md rounded-2xl p-6 transition-all"
              >
                <div className="w-12 h-12 bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-base">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust block ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">
            Чому обирають «Почути Все»
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#1F3D2B] flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <div className="font-bold text-slate-900 text-sm mb-1">{item.title}</div>
                <div className="text-xs text-slate-500 leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map + Address ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
                Як нас знайти у Хмельницькому
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 bg-slate-50 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-0.5">Адреса</div>
                    <div className="text-slate-600 text-sm">м. Хмельницький, вул. Кам&apos;янецька, 19/А</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-slate-50 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-0.5">Графік роботи</div>
                    <div className="text-slate-600 text-sm">Понеділок–П&apos;ятниця: 10:00–17:00<br />Субота–Неділя: вихідні</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-slate-50 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-0.5">Телефон</div>
                    <a href="tel:+380679119548" className="text-[#1F3D2B] font-semibold hover:underline">+38 (067) 911-95-48</a>
                  </div>
                </div>
              </div>
              <Link
                href="#contact-khmelnytskyi"
                className="inline-flex items-center justify-center gap-2 bg-[#1F3D2B] hover:bg-[#162d1f] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-md text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Записатися на консультацію у Хмельницькому
              </Link>
            </div>

            {/* Google Map */}
            <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 h-[380px]">
              <iframe
                src="https://maps.google.com/maps?hl=uk&q=%D0%A5%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%B8%D0%B9%2C+%D0%B2%D1%83%D0%BB.+%D0%9A%D0%B0%D0%BC%27%D1%8F%D0%BD%D0%B5%D1%86%D1%8C%D0%BA%D0%B0%2C+19%2F%D0%90&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Центр слуху Почути Все — Хмельницький, вул. Кам'янецька 19/А"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO text ── */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            Де купити слуховий апарат у Хмельницькому?
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              <strong>Центр слуху «Почути Все»</strong> у Хмельницькому — ваш надійний партнер у вирішенні проблем зі слухом. Ми пропонуємо офіційні слухові апарати <strong>Signia (Siemens)</strong> та <strong>Audio Service</strong> для будь-якого ступеня втрати слуху.
            </p>
            <p>
              Якщо ви шукаєте <strong>слуховий апарат у Хмельницькому</strong> — починайте з безкоштовного скринінгу слуху. Без точного визначення профілю слуху неможливо правильно підібрати апарат. Ми визначимо профіль втрати слуху та запропонуємо оптимальні моделі у вашому бюджеті. <strong>Ціни — від 7 000 грн.</strong>
            </p>
            <p>
              <strong>Підбір слухового апарату</strong> у нашому центрі — це не продаж. Це консультація, скринінг слуху, порівняння моделей та налаштування. Ви йдете додому з апаратом, який реально покращує ваш слух, а не просто лежить у ящику.
            </p>
          </div>
        </div>
      </section>

      {/* ── Prices ── */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Ціни на слухові апарати у Хмельницькому
          </h2>
          <p className="text-slate-500 mb-8">
            Вартість залежить від ступеня втрати слуху і технологічного рівня апарату.
            Ми підбираємо оптимальне рішення — без переплат за непотрібні функції.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                tier: 'Базовий',
                price: 'від 7 000 грн',
                desc: 'Цифровий апарат для спокійного середовища. Підходить для початківців та людей, які більшість часу вдома.',
                features: ['Цифрова обробка звуку', 'Проста регулювання гучності', 'Завушна форма (BTE)', 'Гарантія 1 рік'],
                highlight: false,
              },
              {
                tier: 'Середній клас',
                price: 'від 14 000 грн',
                desc: 'Оптимальний баланс ціни та якості. Кілька програм, шумозаглушення, чіткість у різних ситуаціях.',
                features: ['4–8 програм роботи', 'Активне шумозаглушення', 'Можливість Bluetooth', 'Гарантія 1 рік'],
                highlight: true,
              },
              {
                tier: 'Преміум',
                price: 'від 25 000 грн',
                desc: 'Автоматична адаптація на ШІ, зарядка замість батарейок, трансляція звуку зі смартфону.',
                features: ['Штучний інтелект', 'Зарядний пристрій', 'Bluetooth 5.0', 'Гарантія 1 рік'],
                highlight: false,
              },
            ].map((item) => (
              <div
                key={item.tier}
                className={`rounded-2xl p-6 border flex flex-col ${
                  item.highlight
                    ? 'bg-[#1F3D2B] text-white border-[#1F3D2B] shadow-lg'
                    : 'bg-slate-50 text-slate-900 border-slate-200'
                }`}
              >
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${item.highlight ? 'text-white/60' : 'text-slate-500'}`}>
                  {item.tier}
                </div>
                <div className={`text-2xl font-extrabold mb-2 ${item.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {item.price}
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${item.highlight ? 'text-white/80' : 'text-slate-600'}`}>
                  {item.desc}
                </p>
                <ul className="space-y-1.5 mt-auto">
                  {item.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${item.highlight ? 'text-white/90' : 'text-slate-600'}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${item.highlight ? 'text-white/60' : 'text-[#1F3D2B]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Можлива <strong className="text-slate-700">розстрочка без переплат</strong> та{' '}
            <strong className="text-slate-700">державна компенсація</strong> для осіб з інвалідністю по слуху.
            Уточнюйте за тел.{' '}
            <a href="tel:+380679119548" className="text-[#1F3D2B] font-semibold hover:underline">+38 (067) 911-95-48</a>.
          </p>
        </div>
      </section>

      {/* ── Відгуки клієнтів Хмельницького ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Відгуки клієнтів із Хмельницького
          </h2>
          <p className="text-slate-500 mb-8 text-sm">Що кажуть люди, які вже підібрали апарат у нас</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: 'Василь, 69 років',
                text: 'Довго вагався. Дружина переконала прийти на перевірку. Апарат підібрали за один прийом. Тепер розмовляю по телефону — вперше за кілька років нормально.',
              },
              {
                name: 'Ірина, 64 роки',
                text: 'Фахівець Віта пояснила все дуже зрозуміло. Апарат маленький — майже непомітний. Перший тиждень звикала, зараз не уявляю без нього. Дякую центру.',
              },
              {
                name: 'Микола, 72 роки',
                text: 'Приїхав з сусіднього села — почув від знайомих. Не пошкодував. Ціна чесна, пояснили все про держкомпенсацію. Налаштування вже зробили двічі — безкоштовно.',
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="text-slate-900 font-bold text-sm">{t.name}</div>
                <div className="text-slate-400 text-xs">м. Хмельницький</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Хмельницький ── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8">
            Часті питання про слухові апарати у Хмельницькому
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Де купити слуховий апарат у Хмельницькому?',
                a: 'Центр слуху «Почути Все» знаходиться за адресою: вул. Кам\'янецька, 19/А. Запис за телефоном: +38 (067) 911-95-48. Пн–Пт 10:00–17:00, Сб–Нд: вихідні.',
              },
              {
                q: 'Скільки коштують слухові апарати у Хмельницькому?',
                a: 'Ціни: базові — від 7 000 грн, середній клас — від 14 000 грн, преміум — від 25 000 грн. Є розстрочка та держкомпенсація для осіб з інвалідністю по слуху.',
              },
              {
                q: 'Чи потрібне направлення для перевірки слуху?',
                a: 'Ні. Скринінг слуху у нашому центрі у Хмельницькому безкоштовний та без направлення. Просто зателефонуйте та запишіться на зручний час.',
              },
              {
                q: 'Які слухові апарати підходять для людей похилого віку?',
                a: 'Для людей похилого віку найчастіше рекомендуємо завушні апарати середнього класу — вони прості в управлінні та надійні. Конкретну модель підбираємо після скринінгу слуху.',
              },
              {
                q: 'Чи надаєте сервісне обслуговування після купівлі?',
                a: 'Так. Безкоштовні повторні налаштування — протягом 30 днів. Надалі — гарантійний та позагарантійний ремонт, чищення, заміна трубок і батарейок.',
              },
            ].map((item, i) => (
              <details key={i} className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between gap-3 p-5 cursor-pointer font-semibold text-slate-900 text-sm hover:bg-slate-100 transition-colors list-none">
                  {item.q}
                  <svg className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm mb-3">Залишились питання? Зателефонуйте — відповімо одразу.</p>
            <a href="tel:+380679119548" className="inline-flex items-center gap-2 bg-[#1F3D2B] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#162d1f] transition-colors">
              +38 (067) 911-95-48
            </a>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">Популярні моделі</h2>
            <Link href="/catalog" className="text-[#1F3D2B] font-semibold hover:text-[#162d1f] transition-colors text-sm flex items-center gap-1">
              Весь каталог
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-14 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            Турботливий підбір — у Хмельницькому
          </h2>
          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Зателефонуйте для запису на безкоштовну перевірку слуху. Ми уважно вислухаємо,
            проведемо скринінг слуху та підберемо апарат, який реально вам підходить.
          </p>
          <a
            href="tel:+380679119548"
            className="inline-flex items-center gap-2 bg-white text-[#1F3D2B] font-black px-10 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-lg text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +38 (067) 911-95-48
          </a>
        </div>
      </section>

      {/* ── Internal links ── */}
      <section className="py-8 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 text-sm">
          <Link href="/kupyty-sluhovyi-aparat-khmelnytskyi" className="text-[#1F3D2B] font-semibold hover:underline">
            Купити слуховий апарат у Хмельницькому →
          </Link>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <Link href="/nalashtuvannya-sluhovoho-aparata" className="text-[#1F3D2B] font-semibold hover:underline">
            Налаштування слухового апарата →
          </Link>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <Link href="/catalog" className="text-[#1F3D2B] font-semibold hover:underline">
            Каталог апаратів →
          </Link>
        </div>
      </section>

      {/* ── Google Maps ── */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Як нас знайти у Хмельницькому</h2>
          <p className="text-slate-500 text-sm mb-5">
            вул. Кам&apos;янецька, 19/А · Пн–Пт 10:00–17:00, Сб–Нд вихідні
          </p>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              src="https://maps.google.com/maps?q=вул.+Кам%27янецька+19+Хмельницький&output=embed&z=16&hl=uk"
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Центр слуху Почути Все — Хмельницький"
            />
          </div>
          <div className="mt-4">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=49.4224,26.9961"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:border-[#1F3D2B] hover:text-[#1F3D2B] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Прокласти маршрут
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <div id="contact-khmelnytskyi">
        <ContactSection />
      </div>
      <StickyMobileCTA />
    </>
  );
}
