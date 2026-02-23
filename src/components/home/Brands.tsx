const brands = [
  {
    name: 'Signia',
    tagline: 'Спадщина Siemens',
    description: 'Провідний виробник слухових апаратів із понад 140-річною технологічною традицією. Штучний інтелект та бездротова передача звуку.',
    accentColor: 'bg-purple-50 border-purple-100',
    dotColor: 'bg-purple-500',
  },
  {
    name: 'Phonak',
    tagline: 'Швейцарська якість',
    description: 'Один із найбільших у світі виробників слухових рішень. Широкий асортимент — від базових до преміальних з Bluetooth та автозаряджанням.',
    accentColor: 'bg-red-50 border-red-100',
    dotColor: 'bg-red-500',
  },
  {
    name: 'Audio Service',
    tagline: 'Надійність та доступність',
    description: 'Сертифіковані апарати для всіх ступенів втрати слуху. Відмінне співвідношення ціни та якості — популярний вибір у нашому центрі.',
    accentColor: 'bg-teal-50 border-teal-100',
    dotColor: 'bg-teal-500',
  },
];

export default function Brands() {
  return (
    <section className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider mb-2">
            Офіційні бренди
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Ми працюємо з перевіреними виробниками
          </h2>
          <p className="mt-2 text-slate-500 text-sm">
            Тільки оригінальні апарати від офіційних постачальників — з гарантією та сервісом
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className={`border rounded-2xl px-6 py-6 flex flex-col gap-3 ${brand.accentColor}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full flex-shrink-0 ${brand.dotColor}`} />
                <div>
                  <span className="text-xl font-extrabold text-slate-900 tracking-tight block">
                    {brand.name}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {brand.tagline}
                  </span>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {brand.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Всі апарати поставляються з офіційною гарантією виробника та можливістю сервісного обслуговування в Україні
        </p>
      </div>
    </section>
  );
}
