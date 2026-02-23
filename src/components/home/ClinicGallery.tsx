import Image from 'next/image';

const BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=';

const photos = [
  {
    src: '/images/clinic/clinic-consultation.png',
    alt: 'Індивідуальна консультація аудіолога — підбір слухового апарата для пацієнта',
    caption: 'Індивідуальна консультація',
  },
  {
    src: '/images/clinic/clinic-equipment.png',
    alt: 'Сучасне обладнання для аудіометрії — апарат для перевірки слуху',
    caption: 'Сучасне обладнання',
  },
  {
    src: '/images/clinic/clinic-fitting.png',
    alt: 'Фахівець встановлює слуховий апарат — післяпродажний супровід клієнта',
    caption: 'Післяпродажний супровід',
  },
];

export default function ClinicGallery() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">
            Ваш перший візит
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Як виглядає підбір слухового апарата
          </h2>
          <p className="mt-3 text-slate-500 text-base">
            Від аудіометрії до індивідуального налаштування — весь процес в одному візиті.
            Сучасне обладнання, спокійна атмосфера, без черг.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="group relative overflow-hidden rounded-2xl shadow-sm border border-slate-100 bg-slate-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </div>
              <div className="px-4 py-3 bg-white">
                <p className="text-sm font-semibold text-slate-700">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            Запис на прийом:{' '}
            <a href="tel:+380679119548" className="font-semibold text-[#1F3D2B] hover:underline">
              +38 (067) 911-95-48
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
