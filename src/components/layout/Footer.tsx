import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'Каталог апаратів', href: '/catalog' },
  { label: 'Налаштування апарата', href: '/nalashtuvannya-sluhovoho-aparata' },
  { label: 'Блог', href: '/blog' },
];

const cityLinks = [
  { label: 'Слухові апарати у Вінниці', href: '/vinnytsia' },
  { label: 'Слухові апарати у Хмельницькому', href: '/khmelnytskyi' },
  { label: 'Купити у Вінниці', href: '/kupyty-sluhovyi-aparat-vinnytsia' },
  { label: 'Купити у Хмельницькому', href: '/kupyty-sluhovyi-aparat-khmelnytskyi' },
  { label: 'Перевірка слуху у Вінниці', href: '/perevirka-slukhu-vinnytsia' },
  { label: 'Перевірка слуху у Хмельницькому', href: '/perevirka-slukhu-khmelnytskyi' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Центр слуху Почути Все — слухові апарати у Вінниці та Хмельницькому"
                width={40}
                height={40}
                className="w-10 h-10 object-contain flex-shrink-0"
              />
              <div className="leading-tight">
                <span className="block font-extrabold text-white text-base">Почути Все</span>
                <span className="block text-xs text-slate-400">Центр слуху</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Підбір та налаштування слухових апаратів у Вінниці та Хмельницькому з досвідом 30+ років.
            </p>
            <a
              href="tel:+380679119548"
              className="mt-5 inline-flex items-center gap-2 text-white font-bold text-base hover:text-slate-200 transition-colors"
            >
              <svg className="w-4 h-4 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +38 (067) 911-95-48
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Навігація</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Міста</h3>
            <ul className="space-y-2.5">
              {cityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Addresses */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Адреси</h3>
            <div className="space-y-5 text-sm text-slate-400">
              <div>
                <p className="text-white font-semibold mb-1">Вінниця</p>
                <p>вул. Театральна, 10, офіс 207</p>
                <p className="mt-1">Пн–Пт: 10:00–17:00</p>
                <p>Сб–Нд: вихідні</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Хмельницький</p>
                <p>вул. Кам&apos;янецька, 19/А</p>
                <p className="mt-1">Пн–Пт: 10:00–17:00</p>
                <p>Сб–Нд: вихідні</p>
              </div>
              <p className="text-xs text-slate-500 mt-2">Під час повітряної тривоги прийом не здійснюється.</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Центр слуху «Почути Все». Всі права захищені.</p>
          <p>Слухові апарати у Вінниці та Хмельницькому</p>
        </div>
      </div>
    </footer>
  );
}
