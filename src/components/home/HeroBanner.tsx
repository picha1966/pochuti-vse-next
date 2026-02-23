import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { value: '5000+', label: 'підібраних апаратів' },
  { value: '30+', label: 'років досвіду' },
  { value: 'Безкоштовна', label: 'діагностика слуху' },
];

export default function HeroBanner() {
  return (
    <section className="relative text-white overflow-hidden">
      {/* Background image — full opacity, natural colours */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg-new.jpg"
          alt="Центр слуху «Почути Все» — підбір слухових апаратів у Вінниці та Хмельницькому"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* Neutral dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/65 via-black/40 to-black/10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Центр слуху у Вінниці та Хмельницькому
          </span>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
            Слухові апарати у Вінниці та Хмельницькому
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-lg sm:text-xl text-white/80 leading-relaxed font-medium">
            Професійний підбір та налаштування з досвідом понад 30 років.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
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
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              Переглянути каталог
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Phone sub-line */}
          <p className="mt-5 text-white/60 text-sm">
            <a href="tel:+380679119548" className="hover:text-white transition-colors">
              +38 (067) 911-95-48
            </a>
            {' '}·{' '}
            <a
              href="https://t.me/pochuty_vse"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Telegram
            </a>
          </p>
        </div>

        {/* Stats */}
        <div className="mt-14 flex flex-wrap gap-6 sm:gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold text-white leading-none">
                {stat.value}
              </span>
              <span className="text-white/60 text-sm mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
