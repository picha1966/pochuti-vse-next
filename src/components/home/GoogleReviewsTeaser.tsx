'use client';

// TODO: Replace this URL with your actual Google Maps Place URL
// e.g. https://www.google.com/maps/place/?q=place_id:YOUR_PLACE_ID
const GOOGLE_MAPS_REVIEWS_URL =
  'https://www.google.com/maps/search/%D0%9F%D0%BE%D1%87%D1%83%D1%82%D0%B8+%D0%92%D1%81%D0%B5+%D1%86%D0%B5%D0%BD%D1%82%D1%80+%D1%81%D0%BB%D1%83%D1%85%D1%83/';

export default function GoogleReviewsTeaser() {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Stars */}
          <div className="flex items-center gap-1" aria-label="Рейтинг 4.9 з 5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-7 h-7 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Rating text */}
          <p className="text-2xl font-bold text-slate-800">
            4.9 <span className="text-slate-500 font-normal text-lg">/ 5</span>
          </p>
          <p className="text-slate-600 text-base max-w-xs">
            Середній рейтинг за відгуками клієнтів центру «Почути Все»
          </p>

          {/* Link to Google */}
          <a
            href={GOOGLE_MAPS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#1F3D2B] font-medium underline underline-offset-4 hover:opacity-75 transition-opacity"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Переглянути відгуки у Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
