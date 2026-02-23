import type { ProductSpecs } from '@/lib/productSpecs';

interface ProductSpecsProps {
  specs: ProductSpecs;
}

const rows: Array<{ key: keyof ProductSpecs; label: string; icon: string }> = [
  { key: 'type',       label: 'Тип апарату',            icon: '🎧' },
  { key: 'channels',   label: 'Кількість каналів',      icon: '🔊' },
  { key: 'hearingLoss',label: 'Ступінь втрати слуху',   icon: '📊' },
  { key: 'battery',    label: 'Живлення',               icon: '🔋' },
  { key: 'guarantee',  label: 'Гарантія',               icon: '🛡️' },
];

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <section>
      <h2 className="text-2xl font-extrabold text-slate-900 mb-5 flex items-center gap-2">
        <span className="text-slate-500">
          <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </span>
        Основні характеристики
      </h2>

      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.key}
                className={`flex items-start border-b border-slate-100 last:border-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                }`}
              >
                <td className="w-1/2 px-5 py-4 font-semibold text-slate-700 flex items-center gap-2 flex-shrink-0">
                  <span className="text-base">{row.icon}</span>
                  {row.label}
                </td>
                <td className="w-1/2 px-5 py-4 text-slate-900 font-medium border-l border-slate-100">
                  {specs[row.key] as string}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features list */}
      {specs.features.length > 0 && (
        <div className="mt-5">
          <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">
            Додаткові функції
          </h3>
          <div className="flex flex-wrap gap-2">
            {specs.features.map((f) => (
              <span
                key={f}
                className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-full"
              >
                <svg className="w-3.5 h-3.5 text-[#1F3D2B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
