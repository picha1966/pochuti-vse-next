'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const nav = [
  { label: 'Головна', href: '/' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Налаштування апарата', href: '/nalashtuvannya-sluhovoho-aparata' },
  { label: 'Ремонт', href: '/remont-sluhovykh-aparativ' },
  { label: 'Блог', href: '/blog' },
  { label: 'Вінниця', href: '/vinnytsia' },
  { label: 'Хмельницький', href: '/khmelnytskyi' },
  { label: 'Перевірка слуху – Вінниця', href: '/perevirka-slukhu-vinnytsia' },
  { label: 'Перевірка слуху – Хмельницький', href: '/perevirka-slukhu-khmelnytskyi' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── Sticky top bar ── */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Почути Все — логотип"
                width={44}
                height={44}
                className="w-11 h-11 object-contain flex-shrink-0"
              />
              <div className="leading-tight">
                <span className="block font-extrabold text-slate-900 text-base lg:text-lg">
                  Почути Все
                </span>
                <span className="block text-xs text-slate-500 font-medium">
                  Центр слуху
                </span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2.5 py-2 text-xs font-medium text-slate-600 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop phone CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+380679119548"
                className="flex items-center gap-2 bg-[#1F3D2B] hover:bg-[#162d1f] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +38 (067) 911-95-48
              </a>
            </div>

            {/* Mobile: phone icon + burger */}
            <div className="flex items-center gap-1 lg:hidden">
              <a
                href="tel:+380679119548"
                className="p-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Зателефонувати"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <button
                onClick={() => setOpen(true)}
                className="p-2 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Відкрити меню"
                aria-expanded={open}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile menu overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-white flex flex-col lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Навігаційне меню"
        >
          {/* Top bar — mirrors sticky header height */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 flex-shrink-0">
            <Link href="/" onClick={close} className="flex items-center gap-3 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Почути Все — логотип"
                width={44}
                height={44}
                className="w-11 h-11 object-contain flex-shrink-0"
              />
              <div className="leading-tight">
                <span className="block font-extrabold text-slate-900 text-base">Почути Все</span>
                <span className="block text-xs text-slate-500 font-medium">Центр слуху</span>
              </div>
            </Link>

            <button
              onClick={close}
              className="p-2 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Закрити меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation links — scrollable if screen is very small */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="flex items-center justify-between px-4 py-4 text-lg font-semibold text-slate-800 rounded-xl hover:bg-slate-50 hover:text-[#1F3D2B] transition-colors border-b border-slate-100 last:border-0"
              >
                {item.label}
                <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Bottom phone CTA — fixed to bottom of overlay */}
          <div className="flex-shrink-0 px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-slate-100 bg-white">
            <a
              href="tel:+380679119548"
              className="flex items-center justify-center gap-2.5 bg-[#1F3D2B] hover:bg-[#162d1f] text-white font-bold py-4 rounded-xl transition-colors text-base w-full"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +38 (067) 911-95-48
            </a>
            <p className="text-center text-xs text-slate-400 mt-2">
              Перший дзвінок ні до чого не зобов&apos;язує
            </p>
          </div>
        </div>
      )}
    </>
  );
}
