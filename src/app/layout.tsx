import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: '%s | Слухові апарати | Почути Все',
    default: 'Слухові апарати | Купити Вінниця та Хмельницький | Почути Все',
  },
  description:
    'Слухові апарати у Вінниці та Хмельницькому — продаж, налаштування, ремонт, діагностика слуху. Signia, Phonak, Widex, Oticon за гарними цінами.',
  authors: [{ name: 'Почути Все' }],
  creator: 'Почути Все',
  metadataBase: new URL('https://pochutyvse.com.ua'),
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://pochutyvse.com.ua',
    siteName: 'Почути Все — Центр слуху',
    title: 'Слухові апарати | Купити Вінниця та Хмельницький',
    description:
      'Слухові апарати у Вінниці та Хмельницькому — продаж, налаштування, ремонт, діагностика слуху.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Слухові апарати | Купити Вінниця та Хмельницький | Почути Все',
    description:
      'Слухові апарати у Вінниці та Хмельницькому — підбір, налаштування, 30+ років досвіду.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={manrope.variable}>
      <body className="antialiased flex flex-col min-h-screen bg-[#f8fafc] text-[#1e293b]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#1F3D2B] focus:text-white focus:font-bold focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Перейти до основного змісту
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
