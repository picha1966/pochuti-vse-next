export default function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-slate-400 font-semibold text-sm uppercase tracking-wider">
          Контакти
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
          Запис здійснюється за телефоном
        </h2>
        <p className="mt-4 text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
          Зателефонуйте нам, і ми підберемо зручний час для відвідування у Вінниці або Хмельницькому.
        </p>

        <p className="mt-5 text-slate-400 text-sm">
          Перший дзвінок ні до чого не зобов&apos;язує.
        </p>

        {/* Pre-CTA motivation */}
        <div className="mt-6 mb-6 inline-block text-left bg-slate-800 rounded-xl px-6 py-4 text-sm text-slate-300 leading-relaxed">
          <p className="font-semibold text-white mb-2">Після дзвінка ми:</p>
          <ul className="space-y-1">
            <li>• з&apos;ясуємо вашу ситуацію</li>
            <li>• порадимо підходящу модель апарату</li>
            <li>• узгодимо зручний час візиту</li>
          </ul>
        </div>

        {/* Main phone CTA */}
        <a
          href="tel:+380679119548"
          className="flex items-center justify-center gap-3 bg-[#1F3D2B] hover:bg-[#162d1f] text-white font-bold text-xl px-10 py-5 rounded-2xl transition-colors shadow-lg"
        >
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          +38 (067) 911-95-48
        </a>

        <p className="mt-3 text-sm text-slate-400">
          Подзвонити та записатись
        </p>

        {/* Info row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Вінниця та Хмельницький
          </div>
          <div className="w-px h-4 bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Пн–Пт: 10:00–17:00, Сб–Нд: вихідні
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500 max-w-sm mx-auto">
          Під час повітряної тривоги прийом не здійснюється.
        </p>
      </div>
    </section>
  );
}
