import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContactSection from '@/components/home/ContactSection';
import StickyMobileCTA from '@/components/StickyMobileCTA';

export const metadata: Metadata = {
  title: { absolute: 'Ремонт слухових апаратів у Вінниці та Хмельницькому | Почути Все' },
  description:
    'Ремонт слухових апаратів у Вінниці та Хмельницькому. Гарантійний і позагарантійний сервіс. Signia, Phonak, Audio Service. Тел: +38 (067) 911-95-48.',
  alternates: { canonical: '/remont-sluhovykh-aparativ' },
  openGraph: {
    title: 'Ремонт слухових апаратів | Центр слуху «Почути Все»',
    description:
      'Гарантійний і позагарантійний ремонт слухових апаратів у Вінниці та Хмельницькому. Власна майстерня, досвід 30+ років.',
    type: 'website',
    locale: 'uk_UA',
    images: [{ url: '/images/remont-sluhovykh-aparativ.webp', width: 1200, height: 630 }],
  },
};

const faqs = [
  {
    q: 'Які несправності слухових апаратів ви ремонтуєте?',
    a: 'Ми ремонтуємо найпоширеніші несправності: тихий або спотворений звук, відсутність звуку, свист і зворотний зв\'язок, проблеми із зарядкою, механічні пошкодження корпусу, заміна трубок і вушних вкладок, заміна мікрофонів і динаміків.',
  },
  {
    q: 'Чи ремонтуєте ви апарати інших брендів?',
    a: 'Ми спеціалізуємося на апаратах Signia, Phonak та Audio Service. Апарати інших виробників беремо на діагностику — якщо ремонт можливий у нашій майстерні, виконуємо його, або направляємо до сертифікованого сервісного центру виробника.',
  },
  {
    q: 'Скільки коштує ремонт слухового апарата?',
    a: 'Вартість залежить від типу несправності та моделі апарату. Діагностика — безкоштовна за умови подальшого ремонту у нас. Гарантійний ремонт — безкоштовно. Позагарантійний — від 300 грн (заміна трубки чи вкладки) до 1 500+ грн (заміна компонентів). Точну вартість визначаємо після огляду.',
  },
  {
    q: 'Скільки часу займає ремонт?',
    a: 'Термін виконання ремонту — від 14 днів залежно від складності та наявності деталей. Точний термін повідомляється після діагностики. Якщо потрібна відправка до сервісного центру виробника — термін узгоджується окремо.',
  },
  {
    q: 'Чи є гарантія на ремонт?',
    a: 'Так. На виконані ремонтні роботи надається гарантія 30 днів. Якщо несправність повториться — усуваємо безкоштовно.',
  },
  {
    q: 'Мій апарат намочили або впав. Що робити?',
    a: 'Негайно вийміть батарейку (якщо знімна), не намагайтеся включити апарат і принесіть до нас якомога швидше. Чим раніше проведено сушіння та профілактику, тим вища ймовірність відновлення без дорогого ремонту.',
  },
];

const services = [
  {
    title: 'Гарантійний ремонт',
    desc: 'Якщо апарат придбаний у нас і знаходиться на гарантії — ремонт безкоштовний. Розбираємося з виробником самостійно.',
  },
  {
    title: 'Позагарантійний ремонт',
    desc: 'Відновлюємо апарати після закінчення гарантії: заміна мікрофонів, динаміків, корпусів, роз\'ємів зарядки.',
  },
  {
    title: 'Чищення та профілактика',
    desc: 'Видалення вушної сірки з корпусу та вкладок, промивка акустичного каналу, обробка захисним засобом від вологи.',
  },
  {
    title: 'Заміна трубок і вкладок',
    desc: 'Заміна звукопровідної трубки та індивідуальних вушних вкладок. Термін виконання узгоджується після огляду.',
  },
  {
    title: 'Сушіння після вологи',
    desc: 'Спеціалізоване сушіння та відновлення апаратів, що потрапили під дощ або були намочені.',
  },
  {
    title: 'Налаштування після ремонту',
    desc: 'Після відновлення апарату перевіряємо та коригуємо налаштування — щоб звук знову відповідав результатам вашого скринінгу слуху.',
  },
];

export default function RepairPage() {
  return (
    <>
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

      {/* JSON-LD: Service linked to existing LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Ремонт слухових апаратів',
            description:
              'Гарантійний і позагарантійний ремонт слухових апаратів у Вінниці та Хмельницькому. Чищення, заміна трубок, відновлення після вологи.',
            provider: {
              '@type': 'LocalBusiness',
              '@id': 'https://pochutyvse.com.ua/#business',
            },
            areaServed: [
              { '@type': 'City', name: 'Вінниця' },
              { '@type': 'City', name: 'Хмельницький' },
            ],
            url: 'https://pochutyvse.com.ua/remont-sluhovykh-aparativ',
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
              { '@type': 'ListItem', position: 2, name: 'Ремонт слухових апаратів', item: 'https://pochutyvse.com.ua/remont-sluhovykh-aparativ' },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb
          items={[
            { label: 'Головна', href: '/' },
            { label: 'Ремонт слухових апаратів' },
          ]}
        />
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[420px] sm:h-[480px] w-full">
          <Image
            src="/images/remont-sluhovykh-aparativ.webp"
            alt="Фахівець ремонтує слуховий апарат під збільшувальною лампою в майстерні центру слуху «Почути Все»"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                Сервісний центр
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                Ремонт слухових апаратів
              </h1>
              <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8 max-w-xl">
                Власна майстерня у Вінниці. Гарантійний і позагарантійний ремонт,
                чищення, заміна трубок і вкладок — з досвідом понад 30 років.
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
                  Зателефонувати
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base"
                >
                  Часті питання
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-5">
            Де відремонтувати слуховий апарат у Вінниці та Хмельницькому?
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              Центр слуху «Почути Все» виконує <strong>ремонт слухових апаратів</strong> у Вінниці та
              Хмельницькому протягом понад 30 років. Власна майстерня дозволяє виконувати більшість
              видів ремонту безпосередньо у нашому центрі — без зайвих посередників.
            </p>
            <p>
              Ми працюємо з апаратами Signia, Phonak та Audio Service, а також беремо на діагностику
              пристрої інших брендів. Гарантійний ремонт апаратів, придбаних у нашому центрі, —
              безкоштовний.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-14 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">
              Послуги майстерні
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Що ми ремонтуємо та обслуговуємо
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#1F3D2B]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#1F3D2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-10 text-center">
            Як проходить ремонт слухового апарата
          </h2>
          <ol className="space-y-6">
            {[
              { n: '01', t: 'Звернення та первинний огляд', d: 'Принесіть апарат до нашого центру у Вінниці або Хмельницькому. Фахівець проведе первинний огляд і визначить характер несправності.' },
              { n: '02', t: 'Діагностика', d: 'Якщо несправність не очевидна, виконуємо детальну діагностику. Повідомляємо вартість та строки ремонту до початку робіт — без прихованих платежів.' },
              { n: '03', t: 'Ремонт', d: 'Виконуємо ремонт у власній майстерні. Термін виконання ремонту — від 14 днів залежно від складності та наявності деталей. Точний термін повідомляється після діагностики.' },
              { n: '04', t: 'Перевірка та налаштування', d: 'Після ремонту перевіряємо апарат на спеціальному стенді та коригуємо налаштування відповідно до результатів скринінгу слуху.' },
              { n: '05', t: 'Видача з гарантією', d: 'Видаємо апарат з гарантією на виконані роботи (30 днів). Консультуємо з догляду, щоб мінімізувати ризик повторної поломки.' },
            ].map((step) => (
              <li key={step.n} className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#1F3D2B] text-white font-extrabold text-sm flex items-center justify-center">
                  {step.n}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-slate-900 text-base mb-1">{step.t}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-14 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-10 text-center">
            Часті питання про ремонт слухових апаратів
          </h2>
          <dl className="space-y-5">
            {faqs.map((f) => (
              <div key={f.q} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <dt className="font-bold text-slate-900 text-base mb-2">{f.q}</dt>
                <dd className="text-slate-600 text-sm leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── INTERNAL LINKS ── */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500 mb-4 font-medium">Наші центри слуху:</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/vinnytsia"
              className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-slate-50 hover:border-[#1F3D2B] hover:text-[#1F3D2B] transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Центр слуху у Вінниці
            </Link>
            <Link
              href="/khmelnytskyi"
              className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-slate-50 hover:border-[#1F3D2B] hover:text-[#1F3D2B] transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Центр слуху у Хмельницькому
            </Link>
            <Link
              href="/nalashtuvannya-sluhovoho-aparata"
              className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-slate-50 hover:border-[#1F3D2B] hover:text-[#1F3D2B] transition-colors"
            >
              Налаштування апарата
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
      <StickyMobileCTA />
    </>
  );
}
