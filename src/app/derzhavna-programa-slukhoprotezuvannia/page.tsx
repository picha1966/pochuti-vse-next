import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContactSection from '@/components/home/ContactSection';
import StickyMobileCTA from '@/components/StickyMobileCTA';

export const metadata: Metadata = {
  title: {
    absolute:
      'Державна програма слухопротезування — як отримати слуховий апарат безкоштовно | Почути Все',
  },
  description:
    'Державна програма слухопротезування в Україні: хто має право на безкоштовний слуховий апарат, які документи потрібні, куди звертатися та скільки триває оформлення. Пояснюємо покроково.',
  alternates: { canonical: '/derzhavna-programa-slukhoprotezuvannia' },
  openGraph: {
    title: 'Державна програма слухопротезування — як отримати слуховий апарат безкоштовно',
    description:
      'Хто може отримати безкоштовний слуховий апарат за державною програмою слухопротезування, які документи потрібні та куди звертатися.',
    type: 'article',
    locale: 'uk_UA',
    url: '/derzhavna-programa-slukhoprotezuvannia',
    images: [{ url: '/images/blog/derzhavna-programa-slukhoprotezuvannia.webp', width: 1536, height: 1024 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Державна програма слухопротезування в Україні',
    description:
      'Хто може отримати безкоштовний слуховий апарат за державною програмою, які документи потрібні та куди звертатися.',
    images: ['/images/blog/derzhavna-programa-slukhoprotezuvannia.webp'],
  },
};

const eligibility = [
  { group: 'Діти з інвалідністю', note: 'За наявності підтвердженої інвалідності та рекомендацій, внесених до індивідуальної програми реабілітації (ІПР).' },
  { group: 'Дорослі з інвалідністю', note: 'За умови офіційно підтвердженого статусу інвалідності та медичних показань до слухопротезування.' },
  { group: 'Ветерани війни', note: 'Можуть мати право на окремі механізми забезпечення, зокрема без попередньо оформленого статусу інвалідності.' },
  { group: 'Військовослужбовці', note: 'У тому числі особи, які отримали порушення слуху під час служби — умови уточнюються в профільній установі.' },
  { group: 'Потерпілі на виробництві', note: 'Особи з підтвердженим професійним зниженням слуху можуть мати право на забезпечення через Фонд соціального страхування.' },
];

const documents = [
  'Паспорт громадянина України або інший документ, що посвідчує особу',
  'РНОКПП (реєстраційний номер облікової картки платника податків)',
  'Медична документація, що підтверджує звернення з приводу порушення слуху',
  'Аудіограма — результат перевірки слуху на спеціальному обладнанні',
  'Висновок лікаря-сурдолога або отоларинголога з рекомендацією слухопротезування',
  'Довідка про встановлення інвалідності — якщо є відповідний статус',
  'Індивідуальна програма реабілітації (ІПР) з рекомендованим технічним засобом реабілітації',
  'Документи, що підтверджують статус ветерана або військовослужбовця — за наявності',
];

const steps = [
  { n: '01', t: 'Звернення до сімейного лікаря', d: 'Опишіть проблему зі слухом. За потреби лікар видасть направлення до вужчого спеціаліста.' },
  { n: '02', t: 'Перевірка слуху (аудіометрія)', d: 'Обстеження на спеціалізованому обладнанні визначає ступінь і характер втрати слуху та формує аудіограму.' },
  { n: '03', t: 'Консультація сурдолога', d: 'Фахівець оцінює результати аудіограми та визначає, чи є медичні показання до слухопротезування.' },
  { n: '04', t: 'Оформлення статусу або ІПР', d: 'Для осіб з інвалідністю рекомендація щодо слухового апарата вноситься до індивідуальної програми реабілітації.' },
  { n: '05', t: 'Збір документів', d: 'Готуються всі документи, необхідні для конкретної програми чи установи (перелік може відрізнятися).' },
  { n: '06', t: 'Подання звернення', d: 'Документи подаються до відповідної установи — залежно від статусу заявника (МОЗ, соціальний захист, Мінветеранів тощо).' },
  { n: '07', t: 'Очікування рішення', d: 'Установа розглядає звернення та повідомляє про подальші кроки й строки отримання апарата.' },
  { n: '08', t: 'Отримання та налаштування апарата', d: 'Апарат підбирається і програмується під індивідуальний профіль слуху фахівцем.' },
];

const routes = [
  {
    who: 'Діти та дорослі з інвалідністю',
    where: 'Структурні підрозділи соціального захисту населення за місцем реєстрації',
    basis: 'Індивідуальна програма реабілітації (ІПР), в яку внесено технічний засіб реабілітації (ТЗР)',
  },
  {
    who: 'Ветерани та військовослужбовці',
    where: 'Заклади охорони здоров’я, що беруть участь у програмі Міністерства у справах ветеранів',
    basis: 'Направлення від лікаря та підтвердження статусу ветерана/військовослужбовця',
  },
  {
    who: 'Потерпілі на виробництві',
    where: 'Фонд соціального страхування від нещасних випадків на виробництві',
    basis: 'Підтверджений факт професійного зниження слуху понад встановлений поріг',
  },
  {
    who: 'Діти з вадами слуху (загальна програма)',
    where: 'Заклади охорони здоров’я в рамках закупівель Міністерства охорони здоров’я',
    basis: 'Медичний висновок отоларинголога або сурдолога',
  },
];

const mistakes = [
  'Звернення без попередньої перевірки слуху — без аудіограми фахівець не може підтвердити показання.',
  'Відсутність повного пакету документів під час першого візиту — це затягує розгляд звернення.',
  'Очікування, що будь-який слуховий апарат можна отримати безкоштовно — конкретні моделі залежать від програми та наявності на момент звернення.',
  'Ігнорування статусу ветерана чи учасника бойових дій — цей статус часто відкриває окремий, швидший шлях отримання апарата.',
  'Відкладання звернення на роки — тривала відсутність слухової стимуляції ускладнює адаптацію до апарата навіть після його отримання.',
  'Спроба оформити документи самостійно без консультації з профільною установою — правила періодично уточнюються, тому варто звіряти актуальну інформацію безпосередньо в установі.',
];

const faqs = [
  {
    q: 'Що таке державна програма слухопротезування?',
    a: 'Це сукупність державних механізмів, які дозволяють окремим категоріям громадян України отримати слуховий апарат безкоштовно або з частковою компенсацією вартості. До неї належать закупівлі Міністерства охорони здоров’я, забезпечення технічними засобами реабілітації через органи соціального захисту, а також окремі програми для ветеранів і військовослужбовців.',
  },
  {
    q: 'Хто може отримати слуховий апарат безкоштовно?',
    a: 'Насамперед особи з підтвердженою інвалідністю (дорослі та діти), ветерани війни, військовослужбовці з порушенням слуху та потерпілі на виробництві. Точне право визначає профільна установа в кожному конкретному випадку.',
  },
  {
    q: 'Чи потрібне направлення лікаря?',
    a: 'Так, у більшості випадків процес починається зі звернення до сімейного лікаря або отоларинголога, який за потреби направляє до сурдолога для подальшого обстеження.',
  },
  {
    q: 'Скільки часу займає оформлення?',
    a: 'Строки залежать від конкретної установи, повноти поданих документів та завантаженості програми на момент звернення. Точний термін краще уточнювати безпосередньо в установі, куди подається звернення.',
  },
  {
    q: 'Чи можна отримати два слухові апарати одразу?',
    a: 'Це залежить від медичних показань до бінаурального (двостороннього) слухопротезування та умов конкретної програми. Рішення ухвалює лікар на основі результатів обстеження обох вух.',
  },
  {
    q: 'Які саме моделі слухових апаратів видаються безкоштовно?',
    a: 'У межах державних закупівель зазвичай видаються сучасні цифрові апарати базового та середнього рівня, придатні для більшості випадків втрати слуху. Конкретна модель залежить від наявності на момент звернення та рекомендацій фахівця.',
  },
  {
    q: 'Що робити, якщо відмовили в оформленні?',
    a: 'Варто уточнити письмову причину відмови та звернутися за роз’ясненнями до установи, яка ухвалила рішення. За потреби можна звернутися до вищої інстанції або скористатися гарячою лінією профільного міністерства.',
  },
  {
    q: 'Чи відрізняються умови в різних регіонах?',
    a: 'Порядок подання документів на місцевому рівні може мати особливості залежно від регіону. Тому перед зверненням варто уточнити актуальні вимоги в місцевому органі соціального захисту населення або в закладі охорони здоров’я.',
  },
  {
    q: 'Чи допомагає центр «Почути Все» з оформленням державної програми?',
    a: 'Центр «Почути Все» не оформлює державну компенсацію та не приймає рішень щодо участі в програмі — це повноваження профільних державних установ. Ми можемо провести перевірку слуху, проконсультувати щодо підбору апарата та допомогти зорієнтуватися в загальному процесі.',
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

export default function DerzhavnaProgramaPage() {
  const pageUrl = 'https://pochutyvse.com.ua/derzhavna-programa-slukhoprotezuvannia';
  const imageUrl = 'https://pochutyvse.com.ua/images/blog/derzhavna-programa-slukhoprotezuvannia.webp';

  return (
    <>
      {/* JSON-LD: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Державна програма слухопротезування',
            description:
              'Державна програма слухопротезування в Україні: хто має право на безкоштовний слуховий апарат, які документи потрібні, куди звертатися та скільки триває оформлення.',
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
              { '@type': 'ListItem', position: 2, name: 'Державна програма слухопротезування', item: pageUrl },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb
          items={[
            { label: 'Головна', href: '/' },
            { label: 'Державна програма слухопротезування' },
          ]}
        />
      </div>

      {/* ── HEADER + INTRO ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
          Державна програма слухопротезування
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          Втрата слуху — поширена проблема, яка з віком або внаслідок травми торкається мільйонів
          українців. Держава пропонує кілька механізмів підтримки, які дозволяють отримати
          слуховий апарат безкоштовно або з частковою компенсацією вартості. У цій статті —
          покроковий і чесний розбір того, як реально працює державна програма слухопротезування:
          хто має право, які документи потрібні, куди звертатися і скільки часу це займає.
        </p>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
          <Image
            src="/images/blog/derzhavna-programa-slukhoprotezuvannia.webp"
            alt="Державна програма слухопротезування в Україні"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>

        <div className="prose prose-slate max-w-none space-y-14">

          {/* Що таке програма */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Що таке державна програма слухопротезування
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Під «державною програмою слухопротезування» на практиці мають на увазі не один
              окремий закон, а кілька паралельних механізмів державної підтримки, які діють
              одночасно. Головний з них — централізовані закупівлі слухових апаратів
              Міністерством охорони здоров’я України, які потім розподіляються між закладами
              охорони здоров’я в регіонах. Окремо існує система забезпечення технічними засобами
              реабілітації (ТЗР) для осіб з інвалідністю через органи соціального захисту
              населення, а також спеціальні програми підтримки для ветеранів війни та
              військовослужбовців, які координує Міністерство у справах ветеранів.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Таке паралельне існування кількох треків — головна причина плутанини серед людей,
              які вперше стикаються з потребою слухопротезування. Часто людина просто не знає,
              до якої саме установи їй звертатися, і втрачає час, ходячи «по колу». Нижче ми
              розкладаємо кожен з цих шляхів окремо.
            </p>
            <div className="mt-5 flex gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-sm text-amber-900 leading-relaxed">
                <strong>Важливо:</strong> центр слуху «Почути Все» не оформлює державну
                компенсацію та не приймає рішень щодо участі в програмі — рішення завжди
                ухвалюють відповідні державні установи. Ця стаття має інформаційний характер.
              </p>
            </div>
          </section>

          {/* Хто може отримати */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Хто може отримати слуховий апарат безкоштовно
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Право на безкоштовне або пільгове отримання слухового апарата залежить від статусу
              людини. Нижче — загальні категорії, які реально можуть претендувати на підтримку.
              Точне рішення в кожному випадку ухвалює профільна установа після розгляду документів.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-bold">Категорія</th>
                    <th className="px-4 py-3 font-bold">Що потрібно враховувати</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {eligibility.map((e) => (
                    <tr key={e.group}>
                      <td className="px-4 py-3 font-semibold text-slate-900 align-top whitespace-nowrap">{e.group}</td>
                      <td className="px-4 py-3 text-slate-600 align-top">{e.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Документи */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Які документи необхідні
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Конкретний перелік документів залежить від того, за яким саме треком ви подаєтеся —
              через соціальний захист, заклад охорони здоров’я чи програму для ветеранів. Нижче —
              орієнтовний перелік, який здебільшого потрібен у будь-якому випадку.
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
            <p className="mt-4 text-sm text-slate-500">
              Перелік документів може відрізнятися залежно від програми, регіону та статусу
              заявника — рекомендуємо заздалегідь уточнити повний список безпосередньо в установі,
              куди плануєте звертатися.
            </p>
          </section>

          {/* Як проходить оформлення */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Як проходить оформлення
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Загальна послідовність дій схожа для більшості випадків, хоча конкретні кроки
              можуть трохи відрізнятися залежно від обраного треку.
            </p>
            <ol className="space-y-5">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1F3D2B] text-white font-extrabold text-xs flex items-center justify-center">
                    {s.n}
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-slate-900 text-base mb-0.5">{s.t}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Куди звертатися */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Куди потрібно звернутися
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Ось основні установи, з якими доведеться взаємодіяти залежно від вашого статусу.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-bold">Хто звертається</th>
                    <th className="px-4 py-3 font-bold">Куди звертатися</th>
                    <th className="px-4 py-3 font-bold">Підстава</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {routes.map((r) => (
                    <tr key={r.who}>
                      <td className="px-4 py-3 font-semibold text-slate-900 align-top">{r.who}</td>
                      <td className="px-4 py-3 text-slate-600 align-top">{r.where}</td>
                      <td className="px-4 py-3 text-slate-600 align-top">{r.basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Якщо не впевнені, який трек стосується саме вас — почніть із сімейного лікаря або
              зверніться на гарячу лінію Міністерства охорони здоров’я: там підкажуть, до кого
              звертатися далі.
            </p>
          </section>

          {/* Які апарати */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Які слухові апарати можуть видаватися
            </h2>
            <p className="text-slate-600 leading-relaxed">
              У межах державних закупівель зазвичай видаються сучасні цифрові завушні слухові
              апарати базового та середнього класу — вони підходять для більшості типових випадків
              вікової чи набутої втрати слуху. Це не найпростіші аналогові пристрої минулого:
              сучасні базові моделі мають цифрову обробку звуку, кілька програм роботи та достатню
              потужність підсилення для комфортного повсякденного використання.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Точна модель, яку ви отримаєте, залежить від того, що саме закуплено та є в
              наявності на момент звернення, а також від рекомендацій сурдолога на основі вашого
              профілю слуху. Преміальні моделі з Bluetooth, зарядними станціями чи функціями
              штучного інтелекту зазвичай не входять до державних закупівель — за потреби в такому
              рівні функціональності доплата, як правило, покривається самостійно.
            </p>
          </section>

          {/* Два апарати */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Чи можна отримати два слухові апарати
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Якщо втрата слуху діагностована на обох вухах, лікар може рекомендувати бінауральне
              (двостороннє) слухопротезування — це часто дає кращу розбірливість мовлення та
              природніше сприйняття напрямку звуку. Однак чи буде забезпечено двома апаратами саме
              в межах державної програми, залежить від конкретних медичних показань і правил
              програми, за якою ви звертаєтесь.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Рішення в кожному випадку ухвалює лікар-сурдолог за результатами обстеження обох
              вух — це не питання, яке можна вирішити наперед без діагностики. Якщо вам
              потрібні два апарати, а програма передбачає лише один, варто уточнити у профільній
              установі можливість часткової доплати за другий апарат.
            </p>
          </section>

          {/* Скільки триває */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Скільки триває оформлення
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Чесна відповідь: єдиного фіксованого терміну, який гарантовано діє для всіх
              випадків, не існує. Строки залежать від того, наскільки повний пакет документів ви
              подали одразу, від завантаженості конкретної установи та від наявності апаратів на
              складі на момент вашого звернення. Найбільше часу зазвичай займає саме збір
              документів і оформлення статусу (інвалідності або ІПР), якщо його ще немає — сама
              видача апарата після ухвалення позитивного рішення, як правило, відбувається значно
              швидше.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Щоб не витрачати час даремно, рекомендуємо одразу уточнити орієнтовні строки в
              установі, куди подаєте документи, і запитати, чи є спосіб відстежувати статус
              розгляду звернення.
            </p>
          </section>

          {/* Після отримання */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Що робити після отримання слухового апарата
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Отримання апарата — це не фінальна точка, а початок адаптації. Мозку потрібен час,
              щоб знову навчитися обробляти звуки, яких він тривалий час не отримував: зазвичай
              повна адаптація займає від 4 до 12 тижнів. Перші дні апарат може здаватися занадто
              гучним або незвичним — це нормальний етап, а не ознака того, що модель підібрана
              неправильно.
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                'Починайте носіння з 3–4 годин на день і поступово збільшуйте час.',
                'Не знімайте апарат одразу після появи дискомфорту — зверніться на повторне налаштування.',
                'Дотримуйтесь базових правил догляду: щоденне очищення, зберігання в сухому місці, своєчасна заміна батарейок.',
                'Плануйте контрольні візити до фахівця для корекції налаштувань у перші тижні використання.',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckIcon />
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          {/* Помилки */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Поширені помилки заявників
            </h2>
            <div className="space-y-3">
              {mistakes.map((m, i) => (
                <div key={m} className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-slate-700 text-sm leading-relaxed">{m}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
              Часті запитання (FAQ)
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
          </section>

          {/* Офіційні джерела */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Офіційні джерела
            </h2>
            <p className="text-slate-500 mb-5 text-sm">
              Умови програм періодично уточнюються — перевіряйте актуальну інформацію
              безпосередньо на офіційних ресурсах або в місцевому органі соціального захисту
              населення чи закладі охорони здоров’я.
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
          </section>

          {/* Висновок */}
          <section>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Висновок
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Державна програма слухопротезування реально працює, але складається з кількох
              паралельних шляхів, кожен зі своїми умовами та документами. Найшвидший спосіб
              зорієнтуватися — почати з перевірки слуху та консультації сімейного лікаря чи
              сурдолога, які допоможуть визначити, який саме трек підходить у вашому випадку.
              Чим раніше розпочати процес, тим менше часу піде на з’ясування деталей — а чим
              раніше людина отримує слуховий апарат, тим легше проходить адаптація до нього.
            </p>
          </section>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="py-14 bg-[#1F3D2B] mt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            Потрібна перевірка слуху перед зверненням до установи?
          </h2>
          <p className="text-white/80 mb-8 text-base leading-relaxed">
            Пройдіть скринінг слуху в центрі «Почути Все» у Вінниці або Хмельницькому — це
            допоможе зрозуміти реальний стан слуху ще до подання документів.
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
            Все про слух — центр знань →
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/vse-pro-slukh/yak-otrymaty-slukhovyi-aparat-bezkoshtovno" className="text-[#1F3D2B] font-semibold hover:underline">
            Як отримати слуховий апарат безкоштовно →
          </Link>
        </div>
      </div>

      <ContactSection />
      <StickyMobileCTA />
    </>
  );
}
