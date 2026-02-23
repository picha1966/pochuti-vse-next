import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: { absolute: 'Купити слуховий апарат у Вінниці — Ціни від 7 000 грн | Почути Все' },
  description:
    'Купити слуховий апарат у Вінниці: підбір після аудіометрії, налаштування, гарантія 1 рік. 30+ років досвіду. Тел: +38 (067) 911-95-48. Вул. Театральна, 10.',
  alternates: { canonical: '/kupyty-sluhovyi-aparat-vinnytsia' },
  openGraph: {
    title: 'Купити слуховий апарат у Вінниці | Центр слуху «Почути Все»',
    description: 'Profesійний підбір та купівля слухових апаратів у Вінниці. 30+ років досвіду. Гарантія 1 рік. Дзвоніть: +38 (067) 911-95-48.',
    type: 'website',
    locale: 'uk_UA',
  },
};

const faqs = [
  {
    question: 'Скільки коштує слуховий апарат у Вінниці?',
    answer:
      'Ціни на слухові апарати у Вінниці залежать від моделі та ступеня втрати слуху. Базові цифрові апарати — від 7 000 грн, середній клас — від 14 000 грн, преміальні моделі з Bluetooth — від 25 000 грн. Точну ціну визначаємо після аудіометрії.',
  },
  {
    question: 'Чи можна купити слуховий апарат без рецепта лікаря?',
    answer:
      'Так. Для придбання слухового апарату направлення від лікаря не потрібне. Ми самостійно проводимо аудіометрію, визначаємо ступінь втрати слуху та підбираємо відповідну модель. Якщо у вас вже є аудіограма — візьміть її з собою.',
  },
  {
    question: 'Скільки часу займає підбір слухового апарату?',
    answer:
      'Перший візит зазвичай займає 60–90 хвилин. За цей час ми проводимо аудіометрію, обговорюємо результати, підбираємо кілька варіантів апаратів та проводимо первинне налаштування обраної моделі.',
  },
  {
    question: 'Яка гарантія на слухові апарати у Вінниці?',
    answer:
      'На всі апарати надається офіційна гарантія виробника строком 1 рік. Після гарантійного терміну ми також здійснюємо сервісне обслуговування та ремонт. Повторні налаштування протягом перших 30 днів — без оплати.',
  },
  {
    question: 'Чи є державна компенсація на купівлю слухового апарату?',
    answer:
      'Так. Особи з підтвердженою інвалідністю по слуху мають право на державну компенсацію. Наші фахівці допоможуть зібрати необхідні документи та оформити направлення. Зателефонуйте нам для уточнення деталей.',
  },
];

export default function BuyVinnytsia() {
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
            { label: 'Вінниця', href: '/vinnytsia' },
            { label: 'Купити слуховий апарат' },
          ]}
        />

        {/* H1 */}
        <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
          Купити слуховий апарат у Вінниці
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-10">
          Центр слуху «Почути Все» — спеціалізований центр слухопротезування у Вінниці з понад
          30-річним досвідом. Ми підбираємо слухові апарати після повноцінної аудіометрії,
          налаштовуємо під індивідуальний профіль слуху та забезпечуємо підтримку протягом
          усього терміну служби.
        </p>

        <div className="prose prose-slate max-w-none space-y-12">

          {/* Секція 1 */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Кому підходить слуховий апарат
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Слуховий апарат рекомендований людям будь-якого віку, які мають підтверджену
              або відчутну втрату слуху. Ранніми ознаками є: необхідність перепитувати
              співрозмовника, підвищення гучності телевізора, труднощі з розбірливістю
              мовлення в галасливих приміщеннях або по телефону.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Особливо важливо не зволікати з підбором апарату людям похилого віку. Тривала
              слухова депривація — стан, при якому мозок не отримує достатньо звукових
              сигналів, — призводить до погіршення розпізнавання мовлення навіть після
              встановлення апарату. Що раніше розпочате слухопротезування, то краще
              зберігаються функції слухової кори.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              У нашому центрі ми працюємо з дорослими клієнтами всіх вікових груп — від
              середнього до похилого віку. Кожен клієнт отримує індивідуальну консультацію
              та підбір без поспіху.
            </p>
          </section>

          {/* Секція 2 */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Як проходить підбір слухового апарату у Вінниці
            </h2>
            <ol className="space-y-4 text-slate-600 leading-relaxed list-none pl-0">
              {[
                {
                  n: '01',
                  t: 'Аудіометрія',
                  d: 'Комп\'ютерна перевірка слуху для визначення точного профілю втрати. Займає 20–30 хвилин. Направлення від лікаря не потрібне.',
                },
                {
                  n: '02',
                  t: 'Обговорення результатів',
                  d: 'Фахівець пояснює аудіограму, визначає ступінь та характер втрати слуху, відповідає на запитання.',
                },
                {
                  n: '03',
                  t: 'Підбір моделей',
                  d: 'На основі аудіограми, способу життя та бюджету підбираємо 2–3 підходящі моделі для порівняння.',
                },
                {
                  n: '04',
                  t: 'Первинне налаштування',
                  d: 'Обрана модель програмується під вашу аудіограму. Ви одразу оцінюєте різницю в якості звуку.',
                },
                {
                  n: '05',
                  t: 'Підтримка після покупки',
                  d: 'Безкоштовні повторні налаштування протягом перших 30 днів. Консультації протягом усього терміну служби.',
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

          {/* Секція 3 */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Ціни та варіанти слухових апаратів у Вінниці
            </h2>
            <p className="text-slate-600 leading-relaxed">
              У нашому центрі є апарати трьох цінових категорій:
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  tier: 'Базові цифрові',
                  price: 'від 7 000 грн',
                  desc: 'Прості в управлінні. Один-два режими роботи. Підходять для домашнього використання та тихих умов.',
                },
                {
                  tier: 'Середній клас',
                  price: 'від 14 000 грн',
                  desc: 'Кілька програм роботи, шумозаглушення, мікрофон. Оптимальний вибір для більшості клієнтів.',
                },
                {
                  tier: 'Преміум',
                  price: 'від 25 000 грн',
                  desc: 'Bluetooth, зарядка, штучний інтелект, автоматичне адаптування до середовища. Максимальний комфорт.',
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
              Можлива розстрочка та державна компенсація для осіб з інвалідністю.
              Точну ціну визначаємо після аудіометрії.{' '}
              <Link href="/catalog" className="text-[#1F3D2B] font-semibold hover:underline">
                Переглянути каталог
              </Link>
            </p>
          </section>

          {/* Секція 4 */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Переваги центру слуху «Почути Все» у Вінниці
            </h2>
            <ul className="space-y-3 text-slate-600 leading-relaxed">
              {[
                'Понад 30 років досвіду — більше 1000 підібраних апаратів',
                'Аудіометрія — без черги, без направлення від лікаря',
                'Офіційна гарантія виробника 1 рік на кожен апарат',
                'Повторні налаштування протягом перших 30 днів — без оплати',
                'Консультації та сервіс протягом усього терміну служби',
                'Допомога в оформленні держкомпенсації',
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
              Наш офіс знаходиться у центрі Вінниці: <strong className="text-slate-900">вул. Театральна, 10, офіс 207</strong>.{' '}
              Прийом ведеться Пн–Пт 10:00–17:00, Сб–Нд: вихідні.{' '}
              Детальніше про{' '}
              <Link href="/nalashtuvannya-sluhovoho-aparata" className="text-[#1F3D2B] font-semibold hover:underline">
                налаштування слухового апарата
              </Link>.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
              Часті запитання
            </h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b border-slate-100 pb-5">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
            <Link href="/vinnytsia" className="text-[#1F3D2B] text-sm font-semibold hover:underline">
              ← Центр слуху у Вінниці
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
