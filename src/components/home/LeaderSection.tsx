'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function LeaderSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 lg:gap-16">

          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="rounded-xl overflow-hidden shadow-lg bg-slate-100 border border-slate-200"
                 style={{ width: 280, height: 360 }}>
              {imgError ? (
                /* Fallback — neutral gradient portrait placeholder */
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 select-none">
                  <svg className="w-24 h-24 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
              ) : (
                <Image
                  src="/images/natalia-hutsol.png"
                  alt="Гуцол Наталія Євгенівна — керівник центру слуху у Вінниці"
                  width={280}
                  height={360}
                  className="object-cover object-top w-full h-full"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">
              Наш керівник
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              Гуцол Наталія Євгенівна
            </h2>
            <p className="mt-1 text-[#1F3D2B] font-semibold text-base">
              30+ років у сфері слухопротезування
            </p>

            <div className="mt-5 space-y-3 text-slate-600 text-base leading-relaxed max-w-lg mx-auto md:mx-0">
              <p>
                Я понад 30 років працюю зі слуховими апаратами та допомагаю людям знову чути впевнено.
                За цей час через мої руки пройшли тисячі клієнтів — кожен із власною ситуацією та потребами.
              </p>
              <p>
                Для мене важливо, щоб кожна людина відчувала підтримку та впевненість у своєму виборі.
                Я не поспішаю з рекомендаціями — спочатку слухаю, потім підбираю.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
