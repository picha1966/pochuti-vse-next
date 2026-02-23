'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  mainImage: string;
  altText: string;
  categoryLabel?: string;
}

function HearingAidSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="100" cy="95" rx="42" ry="55" stroke="#94a3b8" strokeWidth="3" fill="none" />
      <path d="M100 50 C78 50 65 68 65 88 C65 108 78 118 88 120 C92 121 94 125 92 130 C90 135 85 138 82 142"
        stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="125" y="60" width="22" height="50" rx="11" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
      <path d="M136 110 C136 118 124 122 118 128 C112 134 108 138 104 140"
        stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="143" r="7" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="136" cy="75" r="3" fill="#94a3b8" />
      <rect x="130" y="82" width="12" height="4" rx="2" fill="#94a3b8" />
    </svg>
  );
}

const trustBadges = [
  {
    icon: '🇩🇪',
    title: 'Оригінальний товар',
    subtitle: 'Signia (колишній Siemens)',
    text: 'Signia (раніше Siemens Hearing Instruments) — один із провідних світових виробників слухових апаратів. Німецька якість, надійність і сучасні технології забезпечують стабільну роботу та комфортне звучання.',
  },
  {
    icon: '🛡️',
    title: 'Офіційна гарантія виробника',
    subtitle: '1 рік',
    text: 'Гарантійне обслуговування здійснюється відповідно до стандартів виробника.',
  },
  {
    icon: '⚙️',
    title: 'Безкоштовне налаштування',
    subtitle: 'при купівлі у нас',
    text: 'Налаштування слухового апарату, придбаного не у нас, — 600 грн.',
  },
];

export default function ProductGallery({ mainImage, altText, categoryLabel }: ProductGalleryProps) {
  const [imgError, setImgError] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const hasImage = mainImage && mainImage.startsWith('http') && !imgError;

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className={`relative w-full aspect-square rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-md transition-all duration-300 ${
          hasImage ? 'cursor-zoom-in' : ''
        } ${zoomed ? 'ring-4 ring-slate-300' : 'hover:shadow-xl'}`}
        onClick={() => hasImage && setZoomed(!zoomed)}
        title={hasImage ? (zoomed ? 'Клікніть для зменшення' : 'Клікніть для збільшення') : undefined}
      >
        {hasImage ? (
          <Image
            src={mainImage}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-contain p-6 transition-transform duration-500 ${
              zoomed ? 'scale-150' : 'scale-100 hover:scale-105'
            }`}
            onError={() => setImgError(true)}
            priority
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50">
            <HearingAidSVG className="w-40 h-40 opacity-30" />
            <p className="text-xs text-slate-400 font-medium">Зображення надається при запиті</p>
          </div>
        )}

        {/* Category badge */}
        {categoryLabel && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#1F3D2B] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {categoryLabel}
            </span>
          </div>
        )}

        {/* Zoom button — only if real image */}
        {hasImage && (
          <button
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-sm hover:bg-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
            aria-label={zoomed ? 'Зменшити' : 'Збільшити'}
          >
            {zoomed ? (
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Trust badges — static info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {trustBadges.map((b) => (
          <div
            key={b.title}
            className="flex flex-col gap-2 bg-slate-50 border border-slate-100 rounded-2xl p-4 select-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl flex-shrink-0">{b.icon}</span>
              <div>
                <p className="text-[13px] font-bold text-slate-900 leading-tight">{b.title}</p>
                <p className="text-[11px] text-[#1F3D2B] font-semibold leading-tight">{b.subtitle}</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">{b.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
