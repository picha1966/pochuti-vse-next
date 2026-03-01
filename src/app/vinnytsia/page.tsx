import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/shop/ProductCard';
import ContactSection from '@/components/home/ContactSection';
import StickyMobileCTA from '@/components/StickyMobileCTA';

export const metadata: Metadata = {
  title: { absolute: 'Купити слуховий апарат у Вінниці — Підбір та Ціни | Почути Все' },
  description:
    'Купити слуховий апарат у Вінниці — підбір після скринінгу слуху, налаштування, ціни від 7 000 грн. 30+ років досвіду. Вул. Театральна, 10. +38 (067) 911-95-48.',
  alternates: { canonical: '/vinnytsia' },
  openGraph: {
    title: 'Купити слуховий апарат у Вінниці | Ціни та Підбір | Почути Все',
    description: 'Слухові апарати у Вінниці: ціни від 7 000 грн, безкоштовний скринінг слуху, налаштування, гарантія 1 рік. 30+ років досвіду. +38 (067) 911-95-48.',
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
    title: 'Безкоштовний скринінг слуху',
    text: 'Повноцінна комп\'ютерна перевірка слуху — визначаємо ступінь та характер втрати. Без черги, без направлення.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Індивідуальний підбір',
    text: 'Підбираємо апарат з урахуванням результатів скринінгу слуху, способу життя, побажань та бюджету. Підходимо до кожного клієнта особисто.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Налаштування апарату',
    text: 'Програмуємо апарат під результати вашого скринінгу слуху. Безкоштовні повторні налаштування протягом 30 днів після підбору.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'Ремонт та обслуговування',
    text: 'Гарантійний і позагарантійний ремонт. Чищення, заміна трубок та батарейок. Власна майстерня у Вінниці.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Держкомпенсація',
    text: 'Допомагаємо оформити документи для отримання державної компенсації вартості слухового апарату для осіб з інвалідністю.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Супровід після підбору',
    text: 'Ми на зв\'язку після отримання апарату. Консультуємо по телефону та приймаємо на безкоштовне коригування налаштувань.',
  },
];

const trustItems = [
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    title: 'Понад 30 років досвіду', desc: 'Керівник центру — визнаний фахівець із слухопротезування',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    title: 'Безкоштовна діагностика', desc: 'Скринінг слуху без направлення та без оплати',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: 'Офіційна гарантія', desc: 'Тільки оригінальні апарати від офіційних постачальників',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    title: 'Сервіс після гарантії', desc: 'Ремонт і обслуговування на весь термін служби',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: 'Розстрочка та компенсація', desc: 'Допомагаємо з оформленням держвиплат та фінансуванням',
  },
];

export default async function VinnytsiaPage() {
  const products = (await getFeaturedProducts(4)).filter((p) => !p.isAccessory);

  return (
    <>
      {/* JSON-LD FAQPage Vinnytsia */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Де купити слуховий апарат у Вінниці?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Центр слуху «Почути Все» знаходиться у Вінниці за адресою: вул. Театральна, 10, офіс 207. Працюємо Пн–Пт 10:00–17:00, Сб–Нд: вихідні. Тел: +38 (067) 911-95-48.',
                },
              },
              {
                '@type': 'Question',
                name: 'Скільки коштує слуховий апарат у Вінниці?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ціни на слухові апарати у Вінниці: базові цифрові — від 7 000 грн, середній клас — від 14 000 грн, преміум з Bluetooth — від 25 000 грн. Можлива розстрочка та державна компенсація.',
                },
              },
              {
                '@type': 'Question',
                name: 'Як проходить підбір слухового апарата у Вінниці?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Підбір слухового апарата починається з безкоштовного скринінгу слуху. За результатами фахівець пропонує оптимальні моделі. Після вибору апарат налаштовується під ваш профіль слуху. Весь процес займає 1–2 години.',
                },
              },
              {
                '@type': 'Question',
                name: 'Чи є у вас консультація аудіолога у Вінниці?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Так, у нашому центрі у Вінниці працює досвідчений фахівець із слухопротезування. Консультація включає перевірку слуху та підбір апарату. Зателефонуйте для запису: +38 (067) 911-95-48.',
                },
              },
              {
                '@type': 'Question',
                name: 'Які слухові апарати є у наявності у Вінниці?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'У нашому центрі у Вінниці представлені завушні (BTE), внутрішньовушні (CIC/ITE) та цифрові апарати брендів Signia, Phonak, Audio Service. Є моделі для всіх ступенів втрати слуху — від легкого до глибокого.',
                },
              },
            ],
          }),
        }}
      />

      {/* JSON-LD HearingAidProvider Vinnytsia */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HearingAidProvider',
            name: 'Центр слуху «Почути Все» — Вінниця',
            url: 'https://pochutyvse.com.ua/vinnytsia',
            telephone: '+380679119548',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'вул. Театральна, 10, офіс 207',
              addressLocality: 'Вінниця',
              addressRegion: 'Вінницька область',
              postalCode: '21000',
              addressCountry: 'UA',
            },
            geo: { '@type': 'GeoCoordinates', latitude: 49.2328, longitude: 28.4682 },
            openingHoursSpecification: [
              { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '17:00' },
            ],
            priceRange: '₴₴',
            description: 'Центр слуху у Вінниці — підбір, налаштування та ремонт слухових апаратів. Безкоштовна діагностика слуху.',
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={[{ label: 'Головна', href: '/' }, { label: 'Вінниця' }]} />
      </div>

      {/* ── HERO with City Photo ── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[460px] sm:h-[520px] w-full">
          <Image
            src="/images/vinnytsia-city.jpg"
            alt="Вінниця — набережна з фонтаном"
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
                Центр слуху у Вінниці
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                Слухові апарати у Вінниці — купити та підібрати
              </h1>
              <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-xl mx-auto">
                Повертаємо радість чути повноцінно. Безкоштовна діагностика слуху,
                індивідуальний підбір та налаштування апарату — без тиску та нав&apos;язування.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#contact-vinnytsia"
                  className="inline-flex items-center justify-center gap-2 bg-[#1F3D2B] hover:bg-[#162d1f] text-white font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Записатися на консультацію
                </a>
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
          Ми працюємо для мешканців Вінниці та Вінницької області
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
              <span><strong className="text-slate-900">Вінниця,</strong> вул. Театральна, 10, офіс 207</span>
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
            Почути знову — це можливо
          </h2>
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              Втрата слуху — це не просто медична проблема. Це розрив зі світом, з близькими, з радістю спілкування. Ви перестаєте чути, як онуки кличуть вас вечеряти. Починаєте уникати розмов, тому що соромно перепитувати. Телевізор стає єдиним компанійоном — і навіть його доводиться збільшувати до максимуму.
            </p>
            <p>
              <strong className="text-slate-800">Сучасний слуховий апарат повертає все це назад.</strong> Не магія — технологія. Маленький, непомітний пристрій, правильно підібраний і налаштований фахівцем, може змінити якість вашого життя вже за кілька годин після першого надягання.
            </p>
            <p>
              Центр слуху <strong className="text-slate-800">«Почути Все»</strong> у Вінниці — це не магазин і не звичайна аптека. Це спеціалізований центр, де ви отримаєте повний цикл допомоги: від безкоштовного скринінгу слуху до довгострокового супроводу після підбору апарату.
            </p>
          </div>
        </div>
      </section>

      {/* ── Specialists ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Наші фахівці у Вінниці
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              За кожним апаратом стоїть людина, яка справді піклується про ваш слух
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Specialist 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center shadow-inner text-slate-400">
                  <svg viewBox="0 0 40 40" fill="currentColor" className="w-11 h-11" aria-hidden="true">
                    <circle cx="20" cy="13" r="7" />
                    <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14H6z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Спеціаліст</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Фіц Тетяна Юріївна</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Понад <strong className="text-slate-800">15 років практичного досвіду</strong> у сфері слухопротезування. Глибока експертиза у підборі сучасних цифрових слухових апаратів різних класів — від базових до преміальних. Тетяна Юріївна відома своїм індивідуальним підходом: вона уважно слухає кожного пацієнта, враховує його спосіб життя та особисті потреби.
                </p>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {[
                    'Робота зі складними випадками втрати слуху',
                    'Підбір апаратів для дітей та людей похилого віку',
                    'Супровід пацієнта після встановлення апарату',
                    'Регулярне підвищення кваліфікації',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Leadership */}
            <div className="bg-slate-900 rounded-3xl p-8 shadow-lg text-white flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-white/50">
                  <svg viewBox="0 0 40 40" fill="currentColor" className="w-11 h-11" aria-hidden="true">
                    <circle cx="20" cy="13" r="7" />
                    <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14H6z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Керівник центрів слуху</div>
                <h3 className="text-xl font-extrabold text-white mb-2">Гуцол Наталія Євгенівна</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  <strong className="text-white">Понад 30 років досвіду</strong> у сфері слухопротезування. Керівник двох центрів слуху — у Вінниці та Хмельницькому. Викладач у Вінницькій школі-інтернаті для глухих дітей. Авторитетний фахівець, якому довіряють сотні сімей у регіоні.
                </p>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  {[
                    'Контроль якості підбору та налаштування апаратів',
                    'Консультації найскладніших випадків',
                    'Навчання та методичний супровід фахівців',
                    'Координація з виробниками та постачальниками',
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

      {/* ── Services grid ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Послуги центру слуху у Вінниці
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Повний цикл допомоги — від першої консультації до довгострокового обслуговування
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

      {/* ── Map + Address block ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
                Як нас знайти у Вінниці
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
                    <div className="text-slate-600 text-sm">м. Вінниця, вул. Театральна, 10, офіс 207</div>
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
                    <div className="text-slate-600 text-sm">Понеділок–П'ятниця: 10:00–17:00<br />Субота–Неділя: вихідні</div>
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
              <a
                href="#contact-vinnytsia"
                className="inline-flex items-center justify-center gap-2 bg-[#1F3D2B] hover:bg-[#162d1f] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-md text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Записатися на консультацію у Вінниці
              </a>
            </div>

            {/* Google Map */}
            <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 h-[380px]">
              <iframe
                src="https://maps.google.com/maps?hl=uk&q=%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F%2C+%D0%B2%D1%83%D0%BB.+%D0%A2%D0%B5%D0%B0%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%2C+10&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Центр слуху Почути Все — Вінниця, вул. Театральна 10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO text ── */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            Де купити слуховий апарат у Вінниці?
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>
              <strong>Центр слуху «Почути Все»</strong> у Вінниці — це спеціалізований заклад
              із понад 30-річною історією в галузі слухопротезування. Ми пропонуємо{' '}
              <strong>слухові апарати Signia (Siemens)</strong> та <strong>Audio Service</strong> —
              офіційних постачальників провідних світових виробників.
            </p>
            <p>
              В асортименті є моделі для будь-якого ступеня втрати слуху — від легкого до
              глибокого: завушні (BTE), внутрішньовушні (CIC/ITE), а також цифрові апарати
              середнього та преміального класу з Bluetooth. <strong>Ціни — від 7 000 грн.</strong>{' '}
              Можлива розстрочка та державна компенсація для осіб з інвалідністю.
            </p>
            <p>
              Якщо ви шукаєте <strong>слуховий апарат у Вінниці</strong> — зателефонуйте для
              запису на перевірку слуху. <strong>Підбір слухового апарату</strong> починається
              зі скринінгу слуху: ми визначаємо точний профіль слуху та підбираємо оптимальну
              модель. Ніякого тиску — ваше рішення завжди залишається за вами.
            </p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">
            Безкоштовна перевірка слуху у Вінниці
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600">
            <p>
              Ми проводимо <strong>безкоштовний скринінг слуху</strong> у Вінниці (вул. Театральна, 10) —
              без черги та без направлення лікаря. Комп&apos;ютерна перевірка займає близько
              30 хвилин. За результатами ви отримаєте детальний висновок та рекомендацію фахівця.
              Зателефонуйте{' '}
              <a href="tel:+380679119548" className="text-[#1F3D2B] font-semibold no-underline hover:underline">
                +38 (067) 911-95-48
              </a>{' '}
              для запису на <strong>перевірку слуху у Вінниці</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Prices ── */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Ціни на слухові апарати у Вінниці
          </h2>
          <p className="text-slate-500 mb-8">
            Ціна залежить від ступеня втрати слуху, форм-фактору та технологічного рівня апарату.
            Підбираємо оптимальне рішення під ваш бюджет.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                tier: 'Базовий',
                price: 'від 7 000 грн',
                desc: 'Цифровий апарат для тихих умов. Ідеально для початку — вдома, в спокійному середовищі.',
                features: ['Цифрова обробка звуку', 'Проста регулювання гучності', 'Завушна форма (BTE)', 'Гарантія виробника 1 рік'],
                highlight: false,
              },
              {
                tier: 'Середній клас',
                price: 'від 14 000 грн',
                desc: 'Найпопулярніший вибір. Кілька програм, шумозаглушення, чіткість мовлення в різних ситуаціях.',
                features: ['4–8 програм роботи', 'Активне шумозаглушення', 'Можливість Bluetooth', 'Гарантія виробника 1 рік'],
                highlight: true,
              },
              {
                tier: 'Преміум',
                price: 'від 25 000 грн',
                desc: 'ШІ-адаптація до середовища, зарядка замість батарейок, пряма трансляція зі смартфону.',
                features: ['Штучний інтелект', 'Зарядний пристрій у комплекті', 'Bluetooth 5.0', 'Гарантія виробника 1 рік'],
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

      {/* ── Відгуки клієнтів Вінниці ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            Відгуки клієнтів із Вінниці
          </h2>
          <p className="text-slate-500 mb-8 text-sm">Реальні враження людей, які звернулися до нашого центру</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: 'Галина, 71 рік',
                text: 'Давно відкладала — боялася, що апарат буде незручний. Фахівець у Вінниці підійшла дуже терпляче, пояснила кожен крок. Тепер чую онуків без телевізора на максимумі.',
              },
              {
                name: 'Петро, 66 років',
                text: 'Прийшов після того, як ЛОР порадив звернутися. Зробили скринінг слуху, підібрали апарат за 1 візит. Налаштування зайняло менше години. Дуже задоволений сервісом.',
              },
              {
                name: 'Олена, 58 років',
                text: 'Слухаю телефонні розмови тепер без перепитувань. Центр на Театральній — легко знайти, зручно паркуватися. Повертатися за обслуговуванням точно буду.',
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="text-slate-900 font-bold text-sm">{t.name}</div>
                <div className="text-slate-400 text-xs">м. Вінниця</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Вінниця ── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8">
            Часті питання про слухові апарати у Вінниці
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Де купити слуховий апарат у Вінниці?',
                a: 'Центр слуху «Почути Все» знаходиться за адресою: вул. Театральна, 10, офіс 207. Для запису на безкоштовну перевірку слуху зателефонуйте: +38 (067) 911-95-48.',
              },
              {
                q: 'Скільки коштують слухові апарати у Вінниці?',
                a: 'Ціни залежать від класу апарату: базові — від 7 000 грн, середній клас — від 14 000 грн, преміум — від 25 000 грн. Підбір проводиться після скринінгу слуху — ми рекомендуємо тільки те, що реально потрібно.',
              },
              {
                q: 'Чи потрібне направлення лікаря для перевірки слуху?',
                a: 'Ні. Скринінг слуху у нашому центрі проводиться без направлення та безкоштовно. Достатньо зателефонувати та записатися на зручний час.',
              },
              {
                q: 'Які бренди слухових апаратів є у вашому центрі у Вінниці?',
                a: 'Ми працюємо з офіційно сертифікованими брендами: Signia (Siemens), Phonak, Audio Service. В асортименті є завушні (BTE), внутрішньовушні (CIC) та цифрові апарати різного класу.',
              },
              {
                q: 'Як довго триває адаптація до слухового апарата?',
                a: 'Адаптація займає 4–12 тижнів. Перші дні апарат може здаватись незвичним — це нормально. Ми проводимо безкоштовні повторні налаштування протягом 30 днів після підбору.',
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
            <p className="text-slate-500 text-sm mb-3">Є інші питання? Зателефонуйте — відповімо одразу.</p>
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
            Готові почути краще вже сьогодні?
          </h2>
          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Зателефонуйте для запису на безкоштовну перевірку слуху у нашому центрі у Вінниці.
            Підберемо ідеальний апарат після скринінгу слуху — без тиску та нав&apos;язування.
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
          <Link href="/kupyty-sluhovyi-aparat-vinnytsia" className="text-[#1F3D2B] font-semibold hover:underline">
            Купити слуховий апарат у Вінниці →
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

      {/* ── Contact form ── */}
      <div id="contact-vinnytsia">
        <ContactSection />
      </div>
      <StickyMobileCTA />
    </>
  );
}
