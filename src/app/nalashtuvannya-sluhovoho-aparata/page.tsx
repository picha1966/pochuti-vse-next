import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: { absolute: 'Налаштування слухового апарата у Вінниці та Хмельницькому | Почути Все' },
  description:
    'Налаштування слухового апарата у Вінниці та Хмельницькому. Програмування під профіль слуху, повторні коригування, довгострокова підтримка. Тел: +38 (067) 911-95-48.',
  alternates: { canonical: '/nalashtuvannya-sluhovoho-aparata' },
  openGraph: {
    title: 'Налаштування слухового апарата | Центр слуху «Почути Все»',
    description: 'Як проходить налаштування слухового апарата. Програмування під профіль слуху у Вінниці та Хмельницькому. Тел: +38 (067) 911-95-48.',
    type: 'website',
    locale: 'uk_UA',
  },
};

const faqs = [
  {
    question: 'Як проходить налаштування слухового апарата?',
    answer:
      'Налаштування здійснюється за допомогою спеціального програмного забезпечення виробника. Фахівець підключає апарат до комп\'ютера, завантажує профіль слуху та налаштовує параметри підсилення на кожній частоті. Процедура займає 30–45 хвилин.',
  },
  {
    question: 'Скільки разів потрібно приходити на налаштування?',
    answer:
      'Перше налаштування відбувається в день купівлі. Протягом перших 30 днів рекомендується 1–2 повторних візити для коригування — поки ви адаптуєтеся до нових звуків. Після цього — за потребою, зазвичай раз на рік.',
  },
  {
    question: 'Чи можна налаштувати апарат іншого виробника?',
    answer:
      'Ми можемо налаштувати апарати брендів, які представляємо: Signia, Phonak, Audio Service. Для апаратів інших виробників необхідне відповідне програмне забезпечення — уточніть при зверненні.',
  },
  {
    question: 'Скільки коштує повторне налаштування?',
    answer:
      'Протягом перших 30 днів після купівлі всі коригування — безкоштовні. Наступні налаштування в рамках гарантійного терміну також включені. Після закінчення гарантії — за окремою домовленістю.',
  },
];

const steps = [
  {
    n: '01',
    t: 'Скринінг слуху або аналіз наявних результатів',
    d: 'Якщо результатів скринінгу ще немає — проводимо комп\'ютерний скринінг слуху. Це займає 20–30 хвилин і дає точну картину стану слуху на кожній частоті.',
  },
  {
    n: '02',
    t: 'Підключення апарату до програмного забезпечення',
    d: 'Апарат підключається до спеціалізованого ПЗ виробника. Фахівець бачить поточні параметри налаштування та профіль слуху.',
  },
  {
    n: '03',
    t: 'Програмування під профіль слуху',
    d: 'Підсилення на кожній частоті встановлюється відповідно до рівня втрати слуху. Цільові рівні розраховуються за стандартизованими формулами (NAL-NL2, DSL).',
  },
  {
    n: '04',
    t: 'Суб\'єктивна оцінка клієнтом',
    d: 'Клієнт надягає апарат і оцінює якість звуку — в тихих умовах та при розмові. Фахівець коригує параметри за відгуком.',
  },
  {
    n: '05',
    t: 'Перевірка в реальних умовах',
    d: 'Якщо є можливість — перевіряємо роботу апарату в різних акустичних умовах. Це дозволяє виявити та усунути дискомфорт ще до виходу з офісу.',
  },
  {
    n: '06',
    t: 'Повторне коригування',
    d: 'Протягом перших 30 днів рекомендується 1–2 повторних візити. Адаптація до нових звуків — поступовий процес, і параметри можуть потребувати корекції.',
  },
];

export default function AdjustmentPage() {
  return (
    <>
      {/* JSON-LD: FAQPage — не змінювати */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      {/* ── BREADCRUMB ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb
          items={[
            { label: 'Головна', href: '/' },
            { label: 'Налаштування слухового апарата' },
          ]}
        />
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[480px] sm:min-h-[520px] flex items-center bg-transparent">
        {/* Background photo — object-right фокус на вусі, не на зеленому фоні */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-ear.png"
            alt="Крупний план вуха зі слуховим апаратом — налаштування у центрі слуху «Почути Все»"
            fill
            className="object-cover object-right"
            priority
            sizes="100vw"
          />
        </div>
        {/* Neutral dark overlay — no green, no tint */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/55 via-black/35 to-black/10" />
        <div className="relative z-20 w-full py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Послуга центру слуху
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
              Налаштування слухового апарата
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              Правильно налаштований апарат — половина успіху слухопротезування. У центрі слуху
              «Почути Все» налаштування виконує досвідчений фахівець з понад 30-річним стажем
              у Вінниці та Хмельницькому.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+380679119548"
                className="inline-flex items-center gap-2.5 bg-white text-[#1F3D2B] font-bold px-7 py-3.5 rounded-xl shadow-lg hover:bg-slate-100 transition-colors text-base"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Записатися на налаштування
              </a>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base"
              >
                Каталог апаратів
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO + ФОТО ФІТИНГУ ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-5">
            Що таке налаштування слухового апарата
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base mb-8">
            <p>
              Налаштування — це програмування апарату під індивідуальний профіль слуху користувача.
              Кожне вухо має свій унікальний профіль втрати слуху: одні частоти знижені більше,
              інші — менше. Апарат повинен компенсувати саме ці конкретні частоти, а не
              посилювати весь звуковий діапазон однаково.
            </p>
            <p>
              Правильне налаштування забезпечує природне звучання: мова стає чіткою та
              розбірливою, фоновий шум не перевантажує, а власний голос не здається штучним.
              Якщо апарат налаштований невірно — людина відчуває дискомфорт і зрештою
              перестає його носити.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            {[
              { v: '30+', l: 'років досвіду' },
              { v: '30 днів', l: 'безкоштовних коригувань' },
              { v: '5000+', l: 'клієнтів' },
            ].map((s) => (
              <div key={s.l} className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                <div className="text-xl font-extrabold text-[#1F3D2B]">{s.v}</div>
                <div className="text-xs text-slate-500 mt-1 leading-tight">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY: 3 РЕАЛЬНІ ФОТО ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Як виглядає процес підбору та налаштування
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
              Реальний кабінет. Реальне обладнання. Реальний результат.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                src: '/images/clinic/clinic-consultation.png',
                alt: 'Індивідуальна консультація перед підбором слухового апарата',
                caption: 'Індивідуальна консультація',
              },
              {
                src: '/images/clinic/clinic-equipment.png',
                alt: 'Сучасне обладнання для скринінгу слуху та налаштування апаратів',
                caption: 'Сучасне діагностичне обладнання',
              },
              {
                src: '/images/clinic/clinic-fitting.png',
                alt: 'Процес налаштування слухового апарата під профіль слуху клієнта',
                caption: 'Налаштування під профіль слуху',
              },
            ].map((img) => (
              <div key={img.src} className="group rounded-2xl overflow-hidden shadow-md border border-slate-200">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-slate-700">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ПОКРОКОВА ПРОЦЕДУРА ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Як проходить налаштування — покроково
            </h2>
            <p className="text-slate-500 mt-2">Прозора процедура — від скринінгу слуху до виходу з офісу</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {steps.map((s) => (
              <div
                key={s.n}
                className="bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-sm rounded-2xl p-6 transition-all flex gap-5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] font-extrabold text-sm flex items-center justify-center">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1.5 text-base">{s.t}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── АДАПТАЦІЯ ── */}
      <section className="py-14 bg-[#1F3D2B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-5">
                Скільки часу займає адаптація до слухового апарата
              </h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Повна адаптація займає від 4 до 12 тижнів. Це нормально: мозок вчиться заново
                  обробляти звукові сигнали, яких він тривалий час не отримував. Перші дні апарат
                  може здаватися занадто гучним або незручним — це проходить.
                </p>
                <p>
                  Ми рекомендуємо починати з 3–4 годин на день і поступово збільшувати час носіння.
                  Якщо виникає дискомфорт — не знімайте апарат, а телефонуйте нам. Зазвичай достатньо
                  невеликого коригування налаштувань.
                </p>
              </div>
              <a
                href="tel:+380679119548"
                className="mt-6 inline-flex items-center gap-2 bg-white text-[#1F3D2B] font-bold px-7 py-3.5 rounded-xl hover:bg-slate-100 transition-colors shadow-md"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Зателефонувати для запису
              </a>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { icon: '🗓', t: '4–12 тижнів', d: 'типова тривалість адаптації' },
                { icon: '⏰', t: '3–4 години', d: 'починати носіння в перші дні' },
                { icon: '🔄', t: '30 днів', d: 'безкоштовні повторні коригування' },
                { icon: '📞', t: 'Завжди на зв\'язку', d: 'консультація по телефону в будь-який день' },
              ].map((item) => (
                <div key={item.t} className="bg-white/10 rounded-xl p-4 flex items-center gap-4">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <div>
                    <div className="text-white font-bold text-sm">{item.t}</div>
                    <div className="text-white/60 text-xs">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ФАХІВЕЦЬ / КЕРІВНИК ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-xs mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/natalia-hutsol.png"
                  alt="Гуцол Наталія Євгенівна — фахівець та керівник центру слуху «Почути Все»"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 320px, 320px"
                />
              </div>
              <div className="mt-4 max-w-xs mx-auto lg:mx-0 text-center lg:text-left">
                <p className="text-sm font-semibold text-slate-700">
                  Гуцол Наталія Євгенівна
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Фахівець та керівник центру слуху «Почути Все»
                </p>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1F3D2B] mb-3 block">
                Ваш фахівець
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-5">
                Налаштування виконує фахівець з 30+ роками досвіду
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-900">Гуцол Наталія Євгенівна</strong> — керівник
                  центрів слуху «Почути Все» у Вінниці та Хмельницькому, слухопротезист із понад
                  30-річним практичним досвідом.
                </p>
                <p>
                  За цей час вона налаштувала тисячі слухових апаратів для людей різного віку —
                  від дітей до людей похилого віку. Також викладає у Вінницькій школі-інтернаті
                  для глухих дітей.
                </p>
                <p>
                  Кожне налаштування — це не просто технічна процедура. Наталія Євгенівна враховує
                  спосіб життя клієнта, його очікування та рівень комфорту, щоб апарат став
                  справжнім помічником, а не дискомфортом.
                </p>
              </div>
              <ul className="mt-5 space-y-2">
                {[
                  'Програмування апаратів Signia, Phonak, Audio Service',
                  'Робота зі складними випадками: різкий та нерівномірний слух',
                  'Дитяче та геріатричне слухопротезування',
                  'Консультація по телефону після встановлення апарату',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-[#1F3D2B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ДЕ ПРОВЕСТИ НАЛАШТУВАННЯ ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">
            Де провести налаштування слухового апарата
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                city: 'Вінниця',
                addr: 'вул. Театральна, 10, офіс 207',
                hours: 'Пн–Пт: 10:00–17:00, Сб–Нд: вихідні',
                href: '/kupyty-sluhovyi-aparat-vinnytsia',
                label: 'Детальніше про центр у Вінниці',
              },
              {
                city: 'Хмельницький',
                addr: "вул. Кам'янецька, 19/А",
                hours: 'Пн–Пт: 10:00–17:00, Сб–Нд: вихідні',
                href: '/kupyty-sluhovyi-aparat-khmelnytskyi',
                label: 'Детальніше про центр у Хмельницькому',
              },
            ].map((loc) => (
              <div
                key={loc.city}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1F3D2B]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1F3D2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">{loc.city}</h3>
                </div>
                <div className="space-y-2 mb-5 text-sm text-slate-600">
                  <p><strong className="text-slate-800">Адреса:</strong> {loc.addr}</p>
                  <p><strong className="text-slate-800">Графік:</strong> {loc.hours}</p>
                  <p>
                    <strong className="text-slate-800">Телефон: </strong>
                    <a href="tel:+380679119548" className="text-[#1F3D2B] font-semibold hover:underline">
                      +38 (067) 911-95-48
                    </a>
                  </p>
                </div>
                <Link
                  href={loc.href}
                  className="inline-flex items-center gap-1.5 text-[#1F3D2B] text-sm font-semibold hover:underline"
                >
                  {loc.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Часті запитання про налаштування
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
              >
                <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ВНУТРІШНІ ПОСИЛАННЯ ── */}
      <div className="bg-slate-50 border-t border-slate-100 py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 text-sm">
          <Link href="/kupyty-sluhovyi-aparat-vinnytsia" className="text-[#1F3D2B] font-semibold hover:underline">
            Купити апарат у Вінниці →
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/kupyty-sluhovyi-aparat-khmelnytskyi" className="text-[#1F3D2B] font-semibold hover:underline">
            Купити апарат у Хмельницькому →
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/catalog" className="text-[#1F3D2B] font-semibold hover:underline">
            Каталог апаратів →
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/vinnytsia" className="text-[#1F3D2B] font-semibold hover:underline">
            Центр слуху у Вінниці →
          </Link>
        </div>
      </div>

      <ContactSection />
    </>
  );
}
