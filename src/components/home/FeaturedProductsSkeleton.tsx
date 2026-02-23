export default function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 lg:py-24 bg-white" aria-busy="true" aria-label="Завантаження товарів">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <div className="h-4 w-16 bg-slate-100 rounded animate-pulse mb-2" />
            <div className="h-9 w-48 bg-slate-100 rounded-lg animate-pulse" />
          </div>
          <div className="h-5 w-28 bg-slate-100 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 overflow-hidden">
              <div className="aspect-square bg-slate-100 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                <div className="h-5 w-full bg-slate-100 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
                <div className="pt-2 flex items-center justify-between">
                  <div className="h-6 w-24 bg-slate-100 rounded animate-pulse" />
                  <div className="h-9 w-24 bg-slate-100 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
