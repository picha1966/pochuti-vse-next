'use client';

import { useState } from 'react';

const testimonials = [
  {
    name: 'Марія Василівна',
    age: 68,
    city: 'Вінниця',
    quote:
      'Дуже дякую фахівцям центру. Підібрали апарат, з яким я знову чую онуків під час розмови. Все пояснили доступно, без поспіху.',
  },
  {
    name: 'Іван Петрович',
    age: 72,
    city: 'Хмельницький',
    quote:
      'Звернувся вперше — не знав, чого очікувати. Провели аудіограму, запропонували кілька варіантів. Зупинився на середньому класі. Ношу вже рік — жодних нарікань.',
  },
  {
    name: 'Ніна',
    age: 61,
    city: 'Вінниця',
    quote:
      'Допомогли підібрати апарат для мами після інсульту. Терпляче відповіли на всі запитання, налаштували під її потреби. Мама задоволена.',
  },
  {
    name: 'Василь Михайлович',
    age: 74,
    city: 'Хмельницький',
    quote:
      'Довго не міг нормально дивитися телевізор — дружина постійно скаржилася на гучність. Після підбору апарату ситуація змінилася кардинально.',
  },
  {
    name: 'Ольга Іванівна',
    age: 65,
    city: 'Вінниця',
    quote:
      'Почала гірше розбирати мову онуків — особливо коли розмовляли швидко або тихо. Після налаштування апарату знову можу нормально спілкуватися з родиною.',
  },
  {
    name: 'Тетяна Петрівна',
    age: 71,
    city: 'Хмельницький',
    quote:
      'Боялася, що апарат буде незручним і помітним. Виявилося — все інакше. Завушна модель практично не видна, і через тиждень я забула, що він є.',
  },
  {
    name: 'Микола Семенович',
    age: 69,
    city: 'Вінниця',
    quote:
      'Звернувся через постійний шум у вухах. Фахівець пояснив, що апарат допомагає зменшити тінітус. Після підбору шум справді став менш помітним.',
  },
  {
    name: 'Андрій Васильович',
    age: 63,
    city: 'Вінниця',
    quote:
      'Прийшов разом із дружиною — вона наполягла. Після аудіограми виявилося, що втрата слуху серйозна. Зараз розумію, що зволікав даремно.',
  },
  {
    name: 'Людмила',
    age: 67,
    city: 'Хмельницький',
    quote:
      'Допомогли оформити держкомпенсацію — я навіть не знала, що маю на неї право. Апарат отримала практично безкоштовно.',
  },
];

const INITIAL_VISIBLE = 3;

export default function Testimonials() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? testimonials : testimonials.slice(0, INITIAL_VISIBLE);

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">
            Відгуки
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Що кажуть наші клієнти
          </h2>
          <p className="mt-3 text-slate-500 text-base">
            5000+ клієнтів у Вінниці та Хмельницькому довіряють нашому центру
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-slate-100 p-7 flex flex-col gap-4 shadow-sm"
            >
              {/* Quote mark */}
              <svg className="w-8 h-8 text-slate-200 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-slate-700 text-base leading-relaxed flex-1">
                {t.quote}
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {t.age} років · {t.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more / less */}
        {!expanded && testimonials.length > INITIAL_VISIBLE && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 font-semibold text-sm px-6 py-3 rounded-xl hover:border-[#1F3D2B] hover:text-[#1F3D2B] transition-colors"
            >
              Показати ще {testimonials.length - INITIAL_VISIBLE} відгуки
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {expanded && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setExpanded(false)}
              className="inline-flex items-center gap-2 text-slate-500 font-medium text-sm hover:text-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Згорнути
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
