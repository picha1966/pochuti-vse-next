import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: '404 — Сторінку не знайдено | Почути Все' },
  description: 'Сторінку не знайдено. Поверніться на головну або перегляньте каталог слухових апаратів.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-[#1F3D2B]/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#1F3D2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <p className="text-6xl font-extrabold text-[#1F3D2B] mb-3">404</p>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-3">
          Сторінку не знайдено
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Можливо, посилання застаріло або сторінку було переміщено.
          Скористайтеся навігацією нижче.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#1F3D2B] hover:bg-[#162d1f] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            На головну
          </Link>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Переглянути каталог
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-400 mb-3">Або зателефонуйте — відповімо одразу:</p>
          <a
            href="tel:+380679119548"
            className="text-[#1F3D2B] font-bold text-lg hover:underline"
          >
            +38 (067) 911-95-48
          </a>
        </div>
      </div>
    </div>
  );
}
