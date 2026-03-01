import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContactSection from '@/components/home/ContactSection';
import StickyMobileCTA from '@/components/StickyMobileCTA';

export const metadata: Metadata = {
  title: { absolute: 'Перевірка слуху у Хмельницькому — скринінг слуху | Почути Все' },
  description:
    'Перевірка слуху у Хмельницькому — комп\'ютерний скринінг слуху. Безкоштовно лише при покупці слухового апарата у нашому центрі. Запис на консультацію.',
  alternates: { canonical: '/perevirka-slukhu-khmelnytskyi' },
  openGraph: {
    title: 'Перевірка слуху у Хмельницькому — скринінг слуху | Почути Все',
    description:
      'Перевірка слуху у Хмельницькому — комп\'ютерний скринінг слуху. Безкоштовно лише при покупці слухового апарата у нашому центрі. Запис на консультацію.',
    type: 'website',
    locale: 'uk_UA',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

const faqs = [
  {
    q: 'Чи болить перевірка слуху?',
    a: 'Ні. Скринінг слуху — повністю безболісна процедура. Пацієнт надягає навушники і реагує на звукові сигнали різної частоти та гучності. Жодних ін\'єкцій чи інструментів.',
  },
  {
    q: 'Скільки триває перевірка слуху?',
    a: 'Стандартний скринінг слуху займає 20–30 хвилин. Разом з консультацією фахівця і поясненням результатів — близько 45–60 хвилин.',
  },
  {
    q: 'Чи потрібне направлення лікаря для перевірки слуху у Хмельницькому?',
    a: 'Ні. Для проходження скринінгу слуху у нашому центрі у Хмельницькому направлення від ЛОРа або іншого лікаря не потрібне. Достатньо зателефонувати і записатися на зручний час.',
  },
  {
    q: 'Чи можна пройти перевірку слуху без купівлі апарата?',
    a: 'Так. Скринінг слуху проводиться незалежно від того, чи плануєте ви купувати апарат. Ми надамо результати та рекомендації. Зауважте: перевірка слуху безкоштовна лише при підборі слухового апарата в нашому центрі.',
  },
];

const steps = [
  { n: '01', t: 'Запис на прийом', d: 'Зателефонуйте або залиште заявку. Оберемо зручний час у нашому центрі у Хмельницькому.' },
  { n: '02', t: 'Діагностика (20–30 хв)', d: 'Комп\'ютерний скринінг слуху: тональний тест через навушники, оцінка розбірливості мови на різних частотах.' },
  { n: '03', t: 'Аналіз результатів', d: 'Фахівець пояснює результати скринінгу слуху зрозумілою мовою: яка частота знижена, наскільки серйозна втрата.' },
  { n: '04', t: 'Рекомендації', d: 'На основі результатів скринінгу слуху надаємо рекомендації: спостереження, підбір апарату або консультація ЛОРа.' },
];

export default function HearingTestKhmelnytskyi() {
  return (
    <>
      {/* JSON-LD: MedicalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalBusiness',
            name: 'Центр слуху «Почути Все» — Хмельницький',
            url: 'https://pochutyvse.com.ua/perevirka-slukhu-khmelnytskyi',
            telephone: '+380978884755',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'вул. Кам\'янецька, 19/а',
              addressLocality: 'Хмельницький',
              addressRegion: 'Хмельницька область',
              addressCountry: 'UA',
            },
            openingHours: ['Mo-Fr 10:00-17:00'],
            medicalSpecialty: 'Audiology',
            availableService: {
              '@type': 'MedicalProcedure',
              name: 'Перевірка слуху (скринінг слуху)',
              procedureType: 'DiagnosticProcedure',
              description: 'Комп\'ютерний скринінг слуху у Хмельницькому. Визначення ступеня та характеру втрати слуху.',
            },
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
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
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
              { '@type': 'ListItem', position: 2, name: 'Хмельницький', item: 'https://pochutyvse.com.ua/khmelnytskyi' },
              { '@type': 'ListItem', position: 3, name: 'Перевірка слуху у Хмельницькому', item: 'https://pochutyvse.com.ua/perevirka-slukhu-khmelnytskyi' },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={[
          { label: 'Головна', href: '/' },
          { label: 'Хмельницький', href: '/khmelnytskyi' },
          { label: 'Перевірка слуху' },
        ]} />
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[440px] sm:min-h-[500px] flex items-center bg-transparent">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-khmelnytskyi-hearing.jpg"
            alt="Перевірка слуху у Хмельницькому — фахівець проводить комп'ютерний скринінг слуху у центрі «Почути Все»"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/35 to-black/10" />
        <div className="relative z-20 w-full py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              Центр слуху у Хмельницькому
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Перевірка слуху у Хмельницькому
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8">
              Комп&apos;ютерний скринінг слуху.<br />
              Безкоштовно лише при покупці слухового апарата.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+380978884755"
                className="inline-flex items-center gap-2.5 bg-white text-[#1F3D2B] font-bold px-7 py-3.5 rounded-xl shadow-lg hover:bg-slate-100 transition-colors text-base"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Записатися на перевірку
              </a>
              <Link
                href="/khmelnytskyi"
                className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base"
              >
                Центр у Хмельницькому
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ЩО ВХОДИТЬ ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Що входить у перевірку слуху у Хмельницькому
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
              Повний діагностичний цикл — від скринінгу слуху до рекомендацій фахівця
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                ),
                title: 'Тональний скринінг слуху',
                text: 'Визначення порогів слуху на частотах 250–8000 Гц. Результат — детальна картина стану слуху.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: 'Розбірливість мови',
                text: 'Оцінка здатності розрізняти слова в тихих і шумних умовах.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                title: 'Консультація фахівця',
                text: 'Пояснення результатів скринінгу слуху зрозумілою мовою без медичного жаргону.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                ),
                title: 'Підбір слухового апарата',
                text: 'За результатами скринінгу слуху підбираємо оптимальну модель апарату.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ВАРТІСТЬ ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-5">
            Скільки коштує перевірка слуху у Хмельницькому?
          </h2>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-left">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#1F3D2B]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#1F3D2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg mb-1">
                  Безкоштовно лише при покупці слухового апарата у нашому центрі
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Перевірка слуху у Хмельницькому проводиться безкоштовно для клієнтів, які купують
                  слуховий апарат у нашому центрі. В інших випадках умови консультації уточнюються під час запису.
                </p>
              </div>
            </div>
            <a
              href="tel:+380978884755"
              className="flex items-center justify-center gap-2 bg-[#1F3D2B] hover:bg-[#162d1f] text-white font-bold py-3.5 px-8 rounded-xl transition-colors w-full sm:w-auto"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Записатися: +38 (097) 888-47-55
            </a>
          </div>
        </div>
      </section>

      {/* ── ЯК ПРОХОДИТЬ ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">
            Як проходить перевірка слуху
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] font-extrabold text-sm flex items-center justify-center">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{s.t}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── КОМУ РЕКОМЕНДОВАНА ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
            Перевірка слуху у Хмельницькому: кому рекомендована?
          </h2>
          <p className="text-slate-500 mb-6 leading-relaxed">
            Не варто чекати, поки проблема стане очевидною. Запишіться на скринінг слуху у Хмельницькому,
            якщо ви або ваші близькі помічаєте будь-яку з таких ознак:
          </p>
          <ul className="space-y-3">
            {[
              { icon: '🔇', text: 'Погано чуєте в шумних місцях — у транспорті, магазині, на вулиці' },
              { icon: '📺', text: 'Телевізор став гучнішим, ніж раніше, або оточуючі просять прикрутити звук' },
              { icon: '🗣️', text: 'Не розбираєте мову — особливо жіночі та дитячі голоси, або по телефону' },
              { icon: '🔁', text: 'Часто перепитуєте або просите людей повторити сказане' },
              { icon: '👴', text: 'Вік понад 55 років — профілактичний скринінг слуху раз на рік' },
              { icon: '🩺', text: 'ЛОР-лікар або сімейний лікар направив вас на скринінг слуху' },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{item.icon}</span>
                <span className="text-slate-700 text-sm leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── АДРЕСА ── */}
      <section className="py-14 bg-[#1F3D2B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center">
            Де пройти перевірку слуху у Хмельницькому
          </h2>
          <div className="bg-white/10 rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Адреса</span>
              <span className="font-semibold">м. Хмельницький</span>
              <span className="text-white/80 text-sm">вул. Кам'янецька, 19/а</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Графік</span>
              <span className="font-semibold">Пн–Пт: 10:00–17:00</span>
              <span className="text-white/80 text-sm">Сб–Нд: вихідні</span>
              <span className="text-white/50 text-xs mt-1">Під час повітряної тривоги прийом не здійснюється</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Телефон</span>
              <a href="tel:+380978884755" className="font-bold text-white hover:text-slate-200 transition-colors text-lg">
                +38 (097) 888-47-55
              </a>
              <span className="text-white/60 text-xs mt-1">Дзвоніть — відповімо одразу</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">
            Часті питання про перевірку слуху у Хмельницькому
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ВНУТРІШНІ ПОСИЛАННЯ ── */}
      <div className="bg-slate-50 border-t border-slate-100 py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 text-sm">
          <Link href="/khmelnytskyi" className="text-[#1F3D2B] font-semibold hover:underline">
            Центр слуху у Хмельницькому →
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/kupyty-sluhovyi-aparat-khmelnytskyi" className="text-[#1F3D2B] font-semibold hover:underline">
            Купити слуховий апарат у Хмельницькому →
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/nalashtuvannya-sluhovoho-aparata" className="text-[#1F3D2B] font-semibold hover:underline">
            Налаштування слухового апарата →
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/perevirka-slukhu-vinnytsia" className="text-[#1F3D2B] font-semibold hover:underline">
            Перевірка слуху у Вінниці →
          </Link>
        </div>
      </div>

      <ContactSection />
      <StickyMobileCTA />
    </>
  );
}
