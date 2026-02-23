export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-[env(safe-area-inset-bottom)]">
      <a
        href="tel:+380679119548"
        className="flex flex-col items-center justify-center gap-0.5 bg-[#1F3D2B] hover:bg-[#162d1f] active:bg-[#0f1f14] text-white w-full px-4 py-3.5 transition-colors shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
      >
        <span className="flex items-center gap-2 font-bold text-sm leading-none">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Зателефонувати для запису
        </span>
        <span className="text-[11px] text-white/65 font-normal leading-none mt-0.5">
          Перший дзвінок ні до чого не зобов&apos;язує
        </span>
      </a>
    </div>
  );
}
