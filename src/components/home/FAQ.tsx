'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Скільки коштує слуховий апарат?',
    answer:
      'Ціни на слухові апарати: базові цифрові — від 7 000 грн, середній клас з шумозаглушенням — від 14 000 грн, преміум з Bluetooth та зарядкою — від 25 000 грн. Конкретну модель визначаємо після безкоштовної аудіометрії. Можлива розстрочка та державна компенсація.',
  },
  {
    question: 'Чи потрібне направлення лікаря для перевірки слуху?',
    answer:
      'Ні. Ми проводимо безкоштовну аудіометрію без направлення та без попереднього запису до ЛОРа. Достатньо зателефонувати та обрати зручний час. Перевірка займає близько 30 хвилин.',
  },
  {
    question: 'Чи підійде слуховий апарат для літньої людини?',
    answer:
      'Так, ми спеціалізуємося на підборі апаратів для людей різного віку. Для старшого покоління рекомендуємо завушні моделі з простим керуванням та тривалим ресурсом батарейок. Апарат підбирається індивідуально після аудіограми.',
  },
  {
    question: 'Чи можна отримати державну компенсацію?',
    answer:
      'Так, в Україні існує програма компенсації вартості слухових апаратів для осіб з офіційно підтвердженою інвалідністю по слуху. Наші фахівці нададуть консультацію та допоможуть зібрати потрібні документи.',
  },
  {
    question: 'Яка гарантія на слухові апарати?',
    answer:
      'Всі апарати постачаються з офіційною гарантією виробника строком 1 рік. Також ми надаємо сервісне обслуговування та повторні налаштування протягом перших 30 днів безкоштовно.',
  },
  {
    question: 'Скільки часу займає адаптація до апарату?',
    answer:
      'Адаптація займає від 4 до 12 тижнів. Перші дні апарат може здаватись незвичним — це нормально. Ми проводимо безкоштовні повторні налаштування у перший місяць, щоб підібрати оптимальні параметри.',
  },
  {
    question: 'Чи можна придбати апарат у розстрочку?',
    answer:
      'Так, ми пропонуємо оформлення розстрочки без переплат через банківських партнерів. Це дає змогу придбати апарат середнього або преміального класу без одноразової повної оплати. Деталі уточнюйте за телефоном +38 (067) 911-95-48.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Запитання та відповіді</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Часті запитання
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const panelId = `faq-panel-${index}`;
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
