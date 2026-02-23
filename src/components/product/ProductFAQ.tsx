'use client';

import { useState } from 'react';
import type { FAQItem } from '@/lib/productFAQs';

interface ProductFAQProps {
  productTitle: string;
  faqs: FAQItem[];
}

export default function ProductFAQ({ productTitle, faqs }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  void productTitle;

  return (
    <section>
      <h2 className="text-2xl font-extrabold text-slate-900 mb-5 flex items-center gap-2">
        <span className="text-slate-500">
          <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        Часті запитання
      </h2>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-start justify-between px-6 py-4 text-left bg-white hover:bg-slate-50/80 transition-colors gap-4"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-slate-900 text-base leading-snug">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 pt-3 bg-slate-50/50 border-t border-slate-100 text-slate-700 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
