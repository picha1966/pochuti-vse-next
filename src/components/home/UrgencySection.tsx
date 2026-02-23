export default function UrgencySection() {
  return (
    <section className="py-14 lg:py-20 bg-[#1F3D2B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
          Важливо знати
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5">
          Не відкладайте перевірку слуху
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
          Погіршення слуху — поступовий процес, який часто залишається непоміченим роками.
          Чим довше ігнорувати проблему, тим складніше мозку адаптуватися до нормального
          сприйняття звуків — навіть після підбору апарату.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
          Дослідження показують: люди, які звернулися за допомогою вчасно, адаптуються
          до апарату значно легше і отримують кращий результат. Перша перевірка слуху —
          безкоштовна і займає 20–30 хвилин.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+380679119548"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#1F3D2B] font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Зателефонувати та записатись
          </a>
          <span className="text-slate-400 text-sm">
            Перший дзвінок ні до чого не зобов'язує
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
              title: 'Когнітивне здоров\'я',
              text: 'Нелікована втрата слуху підвищує ризик когнітивних порушень у людей похилого віку.',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: 'Соціальна ізоляція',
              text: 'Труднощі зі спілкуванням часто призводять до уникнення соціальних контактів і самотності.',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'Рання допомога = кращий результат',
              text: 'Що раніше розпочати корекцію слуху — то легша адаптація до апарату і кращий звуковий результат.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white/5 rounded-xl p-5">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white mb-3">
                {item.icon}
              </div>
              <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
