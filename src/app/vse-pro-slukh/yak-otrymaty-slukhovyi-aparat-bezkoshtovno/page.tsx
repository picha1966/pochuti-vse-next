import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContactSection from '@/components/home/ContactSection';
import StickyMobileCTA from '@/components/StickyMobileCTA';

export const metadata: Metadata = {
  title: {
    absolute:
      'Як отримати слуховий апарат безкоштовно в Україні — державні програми та документи',
  },
  description:
    'Дізнайтесь, хто може отримати слуховий апарат безкоштовно в Україні, які документи потрібні, куди звертатися та що важливо знати ветеранам, військовим і людям з порушенням слуху.',
  alternates: { canonical: '/vse-pro-slukh/yak-otrymaty-slukhovyi-aparat-bezkoshtovno' },
  openGraph: {
    title: 'Як отримати слуховий апарат безкоштовно в Україні',
    description:
      'Огляд офіційних шляхів отримання слухового апарата безкоштовно або з компенсацією вартості: державні програми, ІПР, ТЗР, підтримка ветеранів і військових.',
    type: 'article',
    locale: 'uk_UA',
    url: '/vse-pro-slukh/yak-otrymaty-slukhovyi-aparat-bezkoshtovno',
    images: [{ url: '/images/blog/bezkoshtovnyi-slukhovyi-aparat-hero.png', width: 1536, height: 1024 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Як отримати слуховий апарат безкоштовно в Україні',
    description:
      'Огляд офіційних шляхів отримання слухового апарата безкоштовно або з компенсацією вартості.',
    images: ['/images/blog/bezkoshtovnyi-slukhovyi-aparat-hero.png'],
  },
};

const eligibleGroups = [
  { title: 'Люди з порушенням слуху', text: 'Ті, у кого підтверджено зниження слуху за результатами обстеження.' },
  { title: 'Люди з інвалідністю', text: 'За наявності відповідного статусу та рекомендацій, внесених до ІПР.' },
  { title: 'Ветерани війни', text: 'Особи зі статусом ветерана, які мають порушення слуху.' },
  { title: 'Військовослужбовці', text: 'У тому числі особи, які ще не мають оформленого статусу інвалідності.' },
  { title: 'Діти з порушенням слуху', text: 'Забезпечення дітей технічними засобами реабілітації має окремий порядок.' },
  { title: 'Ті, кому рекомендовано слухопротезування', text: 'За висновком лікаря-сурдолога або іншого профільного фахівця.' },
];

const officialRoutes = [
  {
    title: 'Державні програми забезпечення',
    text: 'В Україні діють програми забезпечення слуховими апаратами, зокрема за участю Міністерства охорони здоров’я. Умови та перелік учасників можуть змінюватися.',
  },
  {
    title: 'Медичний висновок',
    text: 'Право на забезпечення зазвичай підтверджується медичним висновком за результатами обстеження слуху.',
  },
  {
    title: 'Направлення до профільного спеціаліста',
    text: 'Сімейний лікар або ЛОР може видати направлення до сурдолога для подальшого визначення показань.',
  },
  {
    title: 'ІПР та ТЗР',
    text: 'Для осіб з інвалідністю слуховий апарат може входити до індивідуальної програми реабілітації (ІПР) як технічний засіб реабілітації (ТЗР).',
  },
  {
    title: 'Окремі програми для ветеранів і військових',
    text: 'Для ветеранів війни та військовослужбовців можуть діяти окремі механізми підтримки — актуальну інформацію публікує Міністерство у справах ветеранів України.',
  },
];

const steps = [
  { n: '01', t: 'Звернутися до сімейного лікаря або ЛОРа', d: 'Це, як правило, перший крок — лікар оцінить ситуацію та за потреби направить далі.' },
  { n: '02', t: 'Пройти перевірку слуху / аудіометрію', d: 'Результат обстеження (аудіограма) підтверджує стан слуху та ступінь його зниження.' },
  { n: '03', t: 'Отримати направлення до сурдолога або профільного спеціаліста', d: 'Сурдолог визначає показання до слухопротезування та подальші рекомендації.' },
  { n: '04', t: 'Уточнити право на забезпечення слуховим апаратом', d: 'Умови залежать від статусу людини — варто уточнювати безпосередньо у профільній установі.' },
  { n: '05', t: 'Підготувати документи', d: 'Перелік документів відрізняється залежно від програми та статусу заявника.' },
  { n: '06', t: 'Подати звернення до відповідної установи', d: 'Заява подається до установи, яка адмініструє конкретну програму чи вид підтримки.' },
  { n: '07', t: 'Дочекатися рішення та отримати подальші інструкції', d: 'Строки розгляду встановлює відповідна установа — вони можуть відрізнятися.' },
];

const documents = [
  'Паспорт / документ, що посвідчує особу',
  'РНОКПП (ідентифікаційний код)',
  'Медичні документи / виписки',
  'Аудіограма (результат перевірки слуху)',
  'Висновок лікаря або направлення до профільного спеціаліста',
  'ІПР — за наявності інвалідності',
  'Документи, що підтверджують статус ветерана або військовослужбовця — за наявності',
  'Інші документи — за вимогою конкретної програми чи установи',
];

const faqs = [
  {
    q: 'Чи можна отримати слуховий апарат безкоштовно в Україні?',
    a: 'В Україні існують державні програми та механізми підтримки, які в окремих випадках дозволяють отримати слуховий апарат безкоштовно або з компенсацією вартості. Умови залежать від статусу людини та конкретної програми, тому їх варто уточнювати у відповідній державній установі.',
  },
  {
    q: 'Хто має право на безоплатний слуховий апарат?',
    a: 'Загалом на підтримку можуть претендувати люди з інвалідністю, ветерани війни, військовослужбовці та діти з порушенням слуху — за умови відповідності критеріям, які встановлюють профільні державні установи.',
  },
  {
    q: 'Чи потрібна аудіограма?',
    a: 'Аудіограма (результат перевірки слуху) зазвичай є одним із базових документів, що підтверджують стан слуху та потрібні для подальшого звернення.',
  },
  {
    q: 'Куди звертатися спочатку?',
    a: 'Зазвичай перший крок — звернення до сімейного лікаря або ЛОРа, який за потреби направить до сурдолога чи іншого профільного спеціаліста.',
  },
  {
    q: 'Чи допомагає центр «Почути Все» оформити компенсацію?',
    a: 'Ні. Центр «Почути Все» не оформлює державну компенсацію та не приймає рішень щодо її призначення. Ми можемо допомогти з перевіркою слуху, консультацією, підбором і налаштуванням слухового апарата.',
  },
  {
    q: 'Чи можна пройти перевірку слуху перед оформленням документів?',
    a: 'Так. Перевірку слуху можна пройти незалежно від етапу оформлення документів — це не завадить подальшому зверненню до державних установ.',
  },
  {
    q: 'Чи можуть ветерани отримати слуховий апарат?',
    a: 'Ветерани війни та військовослужбовці з порушенням слуху можуть мати право на окремі форми підтримки. Актуальні умови й порядок отримання варто уточнювати в Міністерстві у справах ветеранів України.',
  },
  {
    q: 'Які документи потрібні?',
    a: 'Перелік документів може відрізнятися залежно від програми та статусу людини. Загалом можуть знадобитися паспорт, РНОКПП, медичні висновки, аудіограма та, за наявності, ІПР або документи, що підтверджують статус ветерана чи військовослужбовця.',
  },
  {
    q: 'Чи можна самостійно купити апарат і потім отримати компенсацію?',
    a: 'Це залежить від конкретної програми та її умов. Порядок і можливість відшкодування варто уточнювати у відповідній державній установі до придбання апарата.',
  },
  {
    q: 'Що робити, якщо слух погіршився після контузії?',
    a: 'Варто якнайшвидше звернутися до лікаря для обстеження. Погіршення слуху після контузії чи акустичної травми — поширена ситуація, і для військовослужбовців та ветеранів можуть діяти окремі програми підтримки.',
  },
];

const officialSources = [
  { title: 'МОЗ України — Слухопротезування', org: 'Міністерство охорони здоров’я України', url: 'https://moz.gov.ua/uk/sluhoprotezuvannya' },
  { title: 'МОЗ України — Допоміжні засоби реабілітації', org: 'Міністерство охорони здоров’я України', url: 'https://moz.gov.ua/uk/dopomizhni-zasobi-reabilitacii' },
  { title: 'Як ветеранам і ветеранкам отримати слуховий апарат від держави', org: 'Міністерство у справах ветеранів України', url: 'https://mva.gov.ua/veteranam/hearing-aid-from-the-state-to-veterans' },
];

const CheckIcon = () => (
  <svg className="w-4 h-4 text-[#1F3D2B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

export default function FreeHearingAidArticlePage() {
  const pageUrl = 'https://pochutyvse.com.ua/vse-pro-slukh/yak-otrymaty-slukhovyi-aparat-bezkoshtovno';
  const imageUrl = 'https://pochutyvse.com.ua/images/blog/bezkoshtovnyi-slukhovyi-aparat-hero.png';

  return (
    <>
      {/* JSON-LD: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Як отримати слуховий апарат безкоштовно в Україні',
            description:
              'Дізнайтесь, хто може отримати слуховий апарат безкоштовно в Україні, які документи потрібні, куди звертатися та що важливо знати ветеранам, військовим і людям з порушенням слуху.',
            image: imageUrl,
            url: pageUrl,
            inLanguage: 'uk',
            author: {
              '@type': 'Person',
              name: 'Гуцол Наталія Євгенівна',
              jobTitle: 'Слухопротезист, керівник центру слуху',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Почути Все',
              url: 'https://pochutyvse.com.ua',
              logo: { '@type': 'ImageObject', url: 'https://pochutyvse.com.ua/logo.png' },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
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
              { '@type': 'ListItem', position: 2, name: 'Все про слух', item: 'https://pochutyvse.com.ua/vse-pro-slukh' },
              { '@type': 'ListItem', position: 3, name: 'Як отримати слуховий апарат безкоштовно', item: pageUrl },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb
          items={[
            { label: 'Головна', href: '/' },
            { label: 'Все про слух', href: '/vse-pro-slukh' },
            { label: 'Як отримати слуховий апарат безкоштовно' },
          ]}
        />
      </div>

      {/* ── HEADER + INTRO ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
          Як отримати слуховий апарат безкоштовно в Україні
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          Огляд офіційних шляхів отримання слухового апарата безкоштовно або з компенсацією
          вартості: державні програми, ІПР, ТЗР, направлення до сурдолога та підтримка для
          ветеранів і військовослужбовців.
        </p>

        {/* Featured image — same pattern as blog article featured images */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
          <Image
            src="/images/blog/bezkoshtovnyi-slukhovyi-aparat-hero.png"
            alt="Консультація щодо отримання слухового апарата за державною програмою України"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      </div>

      {/* ── DISCLAIMER ── */}
      <section className="py-2 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6">
            <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-sm sm:text-base text-amber-900 leading-relaxed">
              <strong>Важливо:</strong> Центр слуху «Почути Все» не оформлює державну компенсацію
              та не приймає рішення щодо її призначення. Ця стаття має інформаційний характер і
              допомагає зорієнтуватися в офіційній процедурі — рішення ухвалюють відповідні
              державні установи.
            </p>
          </div>
        </div>
      </section>

      {/* ── ХТО МОЖЕ МАТИ ПРАВО ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Хто потенційно може мати право на підтримку
            </h2>
            <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
              Нижче — загальні категорії. Точне право на забезпечення визначає профільна державна
              установа в кожному конкретному випадку.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {eligibleGroups.map((g) => (
              <div key={g.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 text-base">{g.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ОФІЦІЙНІ ШЛЯХИ ── */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Які офіційні шляхи можуть існувати
            </h2>
            <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
              Умови програм і механізмів підтримки можуть змінюватися — актуальну інформацію варто
              перевіряти на офіційних ресурсах (див. розділ «Офіційні джерела» нижче).
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {officialRoutes.map((r) => (
              <div key={r.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2 text-base">{r.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── КРОКИ ── */}
      <section className="py-14 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-10 text-center">
            Загальний порядок дій — покроково
          </h2>
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#1F3D2B] text-white font-extrabold text-sm flex items-center justify-center">
                  {s.n}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-slate-900 text-base mb-1">{s.t}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-slate-500 text-center max-w-2xl mx-auto">
            Точна послідовність та строки можуть відрізнятися залежно від програми й регіону —
            уточнюйте деталі у відповідній установі.
          </p>
        </div>
      </section>

      {/* ── ДОКУМЕНТИ ── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 text-center">
            Документи, які можуть знадобитися
          </h2>
          <p className="text-slate-500 text-center mb-8">
            Орієнтовний перелік — не вичерпний і не обов’язковий у кожному випадку.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
            <ul className="space-y-3">
              {documents.map((doc) => (
                <li key={doc} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-slate-700 text-sm sm:text-base leading-relaxed">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-sm text-slate-500 text-center">
            Перелік документів може відрізнятися залежно від програми та статусу людини.
          </p>
        </div>
      </section>

      {/* ── ВЕТЕРАНИ ТА ВІЙСЬКОВІ ── */}
      <section className="py-14 lg:py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-slate-400 font-semibold text-sm uppercase tracking-wider">
            Ветеранам і військовослужбовцям
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white mb-6">
            Слух після контузії та травми
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Погіршення слуху після контузії, акустичної травми чи іншого пошкодження — поширена
              ситуація серед ветеранів війни та військовослужбовців. У таких випадках варто
              якнайшвидше звернутися до лікаря для обстеження та визначення подальших кроків.
            </p>
            <p>
              Для ветеранів і військовослужбовців з порушенням слуху можуть діяти окремі механізми
              підтримки — зокрема ті, що не вимагають попередньо оформленого статусу інвалідності.
              Актуальні умови й порядок звернення публікує{' '}
              <a
                href="https://mva.gov.ua/veteranam/hearing-aid-from-the-state-to-veterans"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold underline underline-offset-2 hover:text-white/80"
              >
                Міністерство у справах ветеранів України
              </a>
              .
            </p>
            <p>
              Пройти перевірку слуху в центрі «Почути Все» можна незалежно від того, на якому етапі
              оформлення документів ви перебуваєте.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-10 text-center">
            Часті запитання
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between gap-3 p-5 cursor-pointer font-semibold text-slate-900 text-sm hover:bg-slate-100 transition-colors list-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── ОФІЦІЙНІ ДЖЕРЕЛА ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 text-center">
            Офіційні джерела
          </h2>
          <p className="text-slate-500 text-center mb-8">
            Перевіряйте актуальні умови безпосередньо на офіційних сайтах — програми та порядок
            подання можуть змінюватися.
          </p>
          <div className="space-y-3">
            {officialSources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#1F3D2B] hover:shadow-sm transition-all"
              >
                <svg className="w-5 h-5 text-[#1F3D2B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{s.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{s.org}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-[#1F3D2B]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            Потрібна перевірка слуху чи консультація?
          </h2>
          <p className="text-white/80 mb-8 text-base leading-relaxed">
            Якщо ви хочете перевірити слух або зрозуміти, який тип слухового апарата може підійти,
            зверніться до центру «Почути Все» у Вінниці або Хмельницькому.
          </p>
          <a
            href="tel:+380679119548"
            className="inline-flex items-center gap-2 bg-white text-[#1F3D2B] font-black px-10 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-lg text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +38 (067) 911-95-48
          </a>
        </div>
      </section>

      {/* ── ВНУТРІШНІ ПОСИЛАННЯ ── */}
      <div className="bg-white border-t border-slate-100 py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 text-sm">
          <Link href="/vse-pro-slukh" className="text-[#1F3D2B] font-semibold hover:underline">
            ← Все про слух
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/perevirka-slukhu-vinnytsia" className="text-[#1F3D2B] font-semibold hover:underline">
            Перевірка слуху у Вінниці
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/perevirka-slukhu-khmelnytskyi" className="text-[#1F3D2B] font-semibold hover:underline">
            Перевірка слуху у Хмельницькому
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/nalashtuvannya-sluhovoho-aparata" className="text-[#1F3D2B] font-semibold hover:underline">
            Налаштування слухового апарата
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/catalog" className="text-[#1F3D2B] font-semibold hover:underline">
            Каталог слухових апаратів
          </Link>
        </div>
      </div>

      <div id="contact-free-hearing-aid">
        <ContactSection />
      </div>
      <StickyMobileCTA />
    </>
  );
}
