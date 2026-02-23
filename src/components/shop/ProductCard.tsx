'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const categoryLabels: Record<string, string> = {
  '%d0%bf%d1%80%d0%b5%d0%bc%d1%96%d1%83%d0%bc-%d0%ba%d0%bb%d0%b0%d1%81': 'Преміум',
  '%d1%81%d0%b5%d1%80%d0%b5%d0%b4%d0%bd%d1%96%d0%b9-%d0%ba%d0%bb%d0%b0%d1%81': 'Середній клас',
  '%d0%b1%d0%b0%d0%b7%d0%be%d0%b2%d1%96-%d1%86%d0%b8%d1%84%d1%80%d0%be%d0%b2%d1%96': 'Базові цифрові',
  '%d0%b2%d0%bd%d1%83%d1%82%d1%80%d1%96%d1%88%d0%bd%d1%8c%d0%be%d0%b2%d1%83%d1%88%d0%bd%d1%96-%d0%b0%d0%bf%d0%b0%d1%80%d0%b0%d1%82%d0%b8-%d1%81i%d1%81': 'Внутрішньовушні CIC',
  '%d0%b0%d0%ba%d1%81%d0%b5%d1%81%d1%83%d0%b0%d1%80%d0%b8': 'Аксесуар',
};

const categoryBadgeColors: Record<string, string> = {
  '%d0%bf%d1%80%d0%b5%d0%bc%d1%96%d1%83%d0%bc-%d0%ba%d0%bb%d0%b0%d1%81': 'bg-violet-600',
  '%d1%81%d0%b5%d1%80%d0%b5%d0%b4%d0%bd%d1%96%d0%b9-%d0%ba%d0%bb%d0%b0%d1%81': 'bg-orange-500',
  '%d0%b1%d0%b0%d0%b7%d0%be%d0%b2%d1%96-%d1%86%d0%b8%d1%84%d1%80%d0%be%d0%b2%d1%96': 'bg-green-600',
  '%d0%b2%d0%bd%d1%83%d1%82%d1%80%d1%96%d1%88%d0%bd%d1%8c%d0%be%d0%b2%d1%83%d1%88%d0%bd%d1%96-%d0%b0%d0%bf%d0%b0%d1%80%d0%b0%d1%82%d0%b8-%d1%81i%d1%81': 'bg-teal-600',
  '%d0%b0%d0%ba%d1%81%d0%b5%d1%81%d1%83%d0%b0%d1%80%d0%b8': 'bg-slate-500',
};

function formatPriceFrom(price: string): string {
  const num = parseFloat(price);
  if (!num || isNaN(num)) return '';
  return `від ${num.toLocaleString('uk-UA')} грн`;
}

function HearingAidFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 opacity-25">
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
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  const categoryLabel = categoryLabels[product.categorySlug] ?? product.categoryName;
  const badgeColor = categoryBadgeColors[product.categorySlug] ?? 'bg-slate-600';
  const priceFrom = product.price ? formatPriceFrom(product.price) : '';
  const hasImage = !!product.image && product.image.startsWith('http') && !imgError;

  return (
    <article className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group overflow-hidden flex flex-col">
      {/* Image */}
      <Link href={`/catalog/${product.slug}`} className="block" tabIndex={-1} aria-hidden>
        <div className="relative bg-white overflow-hidden aspect-[4/3]">
          {hasImage ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <HearingAidFallback />
          )}

          {categoryLabel && (
            <span
              className={`absolute top-3 left-3 z-10 ${badgeColor} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}
            >
              {categoryLabel}
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-[#1F3D2B] transition-colors line-clamp-2">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
            {product.description.replace(/[🎧⭐👉✔🦻📞]/gu, '').trim()}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100">
          {priceFrom ? (
            <div className="mb-3">
              <span className="font-extrabold text-slate-900 text-lg">{priceFrom}</span>
              <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                Точна вартість після діагностики
              </p>
            </div>
          ) : (
            <div className="mb-3">
              <span className="text-sm text-slate-500 italic">Ціна за запитом</span>
            </div>
          )}

          <div className="flex gap-2">
            <Link
              href={`/catalog/${product.slug}`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#1F3D2B] hover:bg-[#162d1f] text-white text-sm font-bold py-2.5 px-3 rounded-xl transition-colors"
            >
              Детальніше
            </Link>
            <a
              href="tel:+380679119548"
              className="flex items-center justify-center border-2 border-slate-300 text-slate-600 hover:border-[#1F3D2B] hover:text-[#1F3D2B] text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors"
              title="Зателефонувати"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
