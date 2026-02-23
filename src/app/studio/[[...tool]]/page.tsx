'use client';

import dynamic from 'next/dynamic';
import config from '../../../../sanity.config';

// Studio must run client-side only — Sanity Studio uses React.createContext
// which is not available during SSR/build
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen bg-white text-slate-500 text-sm">
        Завантаження Sanity Studio…
      </div>
    ),
  }
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
