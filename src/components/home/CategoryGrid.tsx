import Link from 'next/link';

const categories = [
  {
    slug: 'базові-цифрові',
    name: 'Базові цифрові',
    description: 'Прості та надійні апарати для компенсації базових порушень слуху.',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    iconBg: 'bg-emerald-100',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    slug: 'середній-клас',
    name: 'Середній клас',
    description: 'Оптимальне співвідношення ціни та якості для повсякденного використання.',
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    iconBg: 'bg-orange-100',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    slug: 'преміум-клас',
    name: 'Преміум клас',
    description: 'Топові моделі з Bluetooth, зарядкою та штучним інтелектом.',
    color: 'bg-violet-50 border-violet-200 text-violet-700',
    iconBg: 'bg-violet-100',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    slug: 'внутрішньовушні-апарати-сiс',
    name: 'Внутрішньовушні CIC',
    description: 'Майже непомітні апарати, що розміщуються всередині вушного каналу.',
    color: 'bg-teal-50 border-teal-200 text-teal-700',
    iconBg: 'bg-teal-100',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15.536 8.464a5 5 0 010 7.072M12 18.364a8 8 0 010-12.728M18.364 5.636a10 10 0 010 12.728" />
        <circle cx="12" cy="12" r="2" strokeWidth={1.8}/>
      </svg>
    ),
  },
  {
    slug: 'аксесуари',
    name: 'Аксесуари',
    description: 'Батарейки, фільтри, вушні вкладиші та засоби догляду за апаратами.',
    color: 'bg-slate-50 border-slate-200 text-slate-700',
    iconBg: 'bg-slate-100',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Асортимент</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Оберіть тип апарату
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Не знаєте, який підійде? Ми підберемо найкращий варіант після безкоштовного скринінгу слуху.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalog?category=${cat.slug}`}
              className="group bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex gap-4 items-start"
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${cat.iconBg} ${cat.color.split(' ')[2]}`}>
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-[#1F3D2B] transition-colors mb-1">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
