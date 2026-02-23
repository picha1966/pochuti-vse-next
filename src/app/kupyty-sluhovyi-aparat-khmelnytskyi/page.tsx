import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: { absolute: 'Купити слуховий апарат у Хмельницькому — Ціни від 7 000 грн | Почути Все' },
  description:
    'Купити слуховий апарат у Хмельницькому: підбір після аудіометрії, налаштування, гарантія 1 рік. 30+ років досвіду. Тел: +38 (067) 911-95-48. Вул. Кам\'янецька, 19/А.',
  alternates: { canonical: '/kupyty-sluhovyi-aparat-khmelnytskyi' },
  openGraph: {
    title: 'Слухові апарати Хмельницький | Центр слуху «Почути Все»',
    description: 'Підбір та купівля слухових апаратів у Хмельницькому. 30+ років досвіду. Гарантія 1 рік. Дзвоніть: +38 (067) 911-95-48.',
    type: 'website',
    locale: 'uk_UA',
  },
};

const faqs = [
  {
    question: 'Скільки коштує слуховий апарат у Хмельницькому?',
    answer:
      'Ціни на слухові апарати у Хмельницькому: базові цифрові — від 7 000 грн, середній клас — від 14 000 грн, преміальні моделі з Bluetooth — від 25 000 грн. Точну ціну визначаємо після аудіометрії індивідуально.',
  },
  {
    question: 'Як проходить перший візит до центру слуху у Хмельницькому?',
    answer:
      'Перший візит займає близько 60–90 хвилин. Ми проводимо аудіометрію, пояснюємо результати, підбираємо 2–3 варіанти апаратів та виконуємо первинне налаштування обраної моделі. Ніякого тиску — рішення завжди за вами.',
  },
  {
    question: 'Чи потрібне направлення від лікаря для підбору апарату?',
    answer:
      'Ні. Для відвідування нашого центру направлення від лікаря не потрібне. Ми самостійно проводимо комп\'ютерну аудіометрію та визначаємо ступінь втрати слуху. Якщо у вас вже є аудіограма — візьміть її з собою.',
  },
  {
    question: 'Як налаштовується слуховий апарат після покупки?',
    answer:
      'Після купівлі апарат програмується під вашу індивідуальну аудіограму. Протягом перших 30 днів ви можете повернутися на безкоштовне коригування налаштувань — щоб апарат повністю відповідав вашим очікуванням.',
  },
  {
    question: 'Чи є держкомпенсація на слуховий апарат у Хмельницькому?',
    answer:
      'Так. Особи з офіційно підтвердженою інвалідністю по слуху мають право на державну компенсацію вартості апарату. Наші фахівці допоможуть зібрати пакет документів та оформити направлення через ЛОР-лікаря.',
  },
];

export default function BuyKhmelnytskyi() {
  return (
    <>
      {/* FAQ Schema */}
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumb
          items={[
            { label: 'Головна', href: '/' },
            { label: 'Хмельницький', href: '/khmelnytskyi' },
            { label: 'Купити слуховий апарат' },
          ]}
        />

        <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
          Слухові апарати у Хмельницькому — купити та налаштувати
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-10">
          Центр слуху «Почути Все» працює у Хмельницькому і надає повний спектр послуг
          зі слухопротезування: від аудіометрії та підбору апарату до налаштування,
          гарантійного обслуговування та довгострокової підтримки. Понад 30 років у сфері
          слухопротезування — ми знаємо, як підібрати апарат правильно.
        </p>

        <div className="prose prose-slate max-w-none space-y-12">

          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Кому підходить слуховий апарат
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Слуховий апарат потрібен тоді, коли втрата слуху починає впливати на якість
              щоденного життя. Типові ознаки: людина підвищує гучність телевізора,
              не розбирає мову в шумному місці, часто перепитує, гірше чує по телефону.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Багато людей відкладають звернення до фахівця на роки — і це помилка.
              Без слухового стимулу мозок поступово втрачає здатність розпізнавати звуки.
              Чим раніше розпочати використання апарату — тим краще збережеться якість
              слуху й мовного сприйняття.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Ми приймаємо клієнтів різного віку, найчастіше це люди від 55 до 80 років.
              Для кожного ми підбираємо апарат з урахуванням аудіограми, способу життя,
              рухливості пальців та навичок роботи з технікою.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Як проходить підбір слухового апарату у Хмельницькому
            </h2>
            <ol className="space-y-4 text-slate-600 leading-relaxed list-none pl-0">
              {[
                {
                  n: '01',
                  t: 'Дзвінок для запису',
                  d: 'Зателефонуйте нам за номером +38 (067) 911-95-48. Оберемо зручний час. Підготовки не потрібно.',
                },
                {
                  n: '02',
                  t: 'Комп\'ютерна аудіометрія',
                  d: 'Точна перевірка слуху на сучасному обладнанні. Визначаємо ступінь та характер втрати. 20–30 хвилин.',
                },
                {
                  n: '03',
                  t: 'Вибір моделі',
                  d: 'Підбираємо варіанти з урахуванням аудіограми, зручності управління та бюджету. Ніякого нав\'язування.',
                },
                {
                  n: '04',
                  t: 'Налаштування та примірка',
                  d: 'Програмуємо апарат під вашу аудіограму. Ви чуєте різницю одразу — ще в офісі.',
                },
                {
                  n: '05',
                  t: 'Підтримка після покупки',
                  d: 'Протягом перших 30 днів — безкоштовне коригування. Консультації та сервіс протягом усього терміну служби.',
                },
              ].map((s) => (
                <li key={s.n} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-[#1F3D2B] font-bold text-xs flex items-center justify-center">
                    {s.n}
                  </span>
                  <div>
                    <strong className="text-slate-900">{s.t}.</strong>{' '}
                    <span>{s.d}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Ціни та варіанти слухових апаратів у Хмельницькому
            </h2>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  tier: 'Базові цифрові',
                  price: 'від 7 000 грн',
                  desc: 'Зручні для домашнього використання. Простий контроль гучності. Довговічна батарейка.',
                },
                {
                  tier: 'Середній клас',
                  price: 'від 14 000 грн',
                  desc: 'Кілька режимів роботи, зниження шуму. Підходить для активного способу життя.',
                },
                {
                  tier: 'Преміум',
                  price: 'від 25 000 грн',
                  desc: 'Bluetooth, зарядка, AI. Автоматичне адаптування до різних акустичних умов.',
                },
              ].map((t) => (
                <div key={t.tier} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <p className="font-bold text-slate-900 mb-1">{t.tier}</p>
                  <p className="text-[#1F3D2B] font-semibold text-sm mb-2">{t.price}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-sm mt-4">
              Доступна розстрочка та держкомпенсація.{' '}
              <Link href="/catalog" className="text-[#1F3D2B] font-semibold hover:underline">
                Переглянути каталог апаратів
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Переваги центру слуху «Почути Все» у Хмельницькому
            </h2>
            <ul className="space-y-3 text-slate-600 leading-relaxed">
              {[
                '30+ років досвіду у сфері слухопротезування',
                'Аудіометрія без черги та без направлення від лікаря',
                'Офіційна гарантія виробника 1 рік',
                'Безкоштовне коригування налаштувань протягом 30 днів',
                'Підтримка та консультації протягом усього терміну служби',
                'Допомога в оформленні державної компенсації',
                'Розстрочка без переплат',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#1F3D2B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-slate-600 leading-relaxed">
              Адреса у Хмельницькому: <strong className="text-slate-900">вул. Кам&apos;янецька, 19/А</strong>.{' '}
              Пн–Пт 10:00–17:00, Сб–Нд вихідні.{' '}
              Дізнайтеся більше про{' '}
              <Link href="/nalashtuvannya-sluhovoho-aparata" className="text-[#1F3D2B] font-semibold hover:underline">
                налаштування слухового апарата
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Часті запитання</h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b border-slate-100 pb-5">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
            <Link href="/khmelnytskyi" className="text-[#1F3D2B] text-sm font-semibold hover:underline">
              ← Центр слуху у Хмельницькому
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/nalashtuvannya-sluhovoho-aparata" className="text-[#1F3D2B] text-sm font-semibold hover:underline">
              Налаштування слухового апарата
            </Link>
            <span className="text-slate-300">·</span>
            <Link href="/catalog" className="text-[#1F3D2B] text-sm font-semibold hover:underline">
              Каталог апаратів
            </Link>
          </div>
        </div>
      </div>

      <ContactSection />
    </>
  );
}
