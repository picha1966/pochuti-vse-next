'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageBlockProps {
  src: string;
  alt: string;
  categoryLabel?: string;
}

function HearingAidPlaceholder() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-48 h-48 opacity-40"
    >
      {/* Ear */}
      <ellipse cx="100" cy="95" rx="42" ry="55" stroke="#94a3b8" strokeWidth="3" fill="none" />
      <path
        d="M100 50 C78 50 65 68 65 88 C65 108 78 118 88 120 C92 121 94 125 92 130 C90 135 85 138 82 142"
        stroke="#94a3b8"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Hearing aid body (BTE) */}
      <rect x="125" y="60" width="22" height="50" rx="11" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
      {/* Tube */}
      <path
        d="M136 110 C136 118 124 122 118 128 C112 134 108 138 104 140"
        stroke="#94a3b8"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Earmold */}
      <circle cx="100" cy="143" r="7" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
      {/* Button/mic details */}
      <circle cx="136" cy="75" r="3" fill="#94a3b8" />
      <rect x="130" y="82" width="12" height="4" rx="2" fill="#94a3b8" />
    </svg>
  );
}

export default function ProductImageBlock({ src, alt, categoryLabel }: ProductImageBlockProps) {
  const [imgError, setImgError] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const hasImage = src && !src.includes('[slug]') && !imgError;

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className={`relative aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 cursor-zoom-in transition-all duration-300 ${
          zoomed ? 'ring-2 ring-slate-400' : 'hover:ring-2 hover:ring-slate-200'
        }`}
        onClick={() => setZoomed(!zoomed)}
        title={zoomed ? 'Клікніть для зменшення' : 'Клікніть для збільшення'}
      >
        {hasImage ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-contain p-4 transition-transform duration-500 ${
              zoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'
            }`}
            onError={() => setImgError(true)}
            priority
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <HearingAidPlaceholder />
            <span className="text-xs text-slate-400 font-medium">Фото надається при запиті</span>
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

        {/* Zoom hint */}
        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg p-1.5 opacity-70">
          {zoomed ? (
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          )}
        </div>
      </div>

      {/* Trust badges row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: '🇩🇪', label: 'Німецька якість' },
          { icon: '🛡️', label: 'Офіційна гарантія' },
          { icon: '⚙️', label: 'Безкоштовне налаштування' },
        ].map((b) => (
          <div
            key={b.label}
            className="flex flex-col items-center gap-1 bg-white border border-slate-100 rounded-xl py-3 px-2 text-center shadow-sm"
          >
            <span className="text-xl">{b.icon}</span>
            <span className="text-xs text-slate-600 font-medium leading-tight">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
