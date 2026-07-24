import type { ReactNode } from 'react';

export interface KnowledgeArticle {
  slug: string;
  title: string;
  description: string;
  icon: ReactNode;
  status: 'coming-soon' | 'published';
  featured?: boolean;
  href?: string;
}

const iconClass = 'w-6 h-6';

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: 'yak-otrymaty-sluhovyi-aparat-bezkoshtovno',
    title: 'Як отримати слуховий апарат безкоштовно',
    description: 'Огляд державних програм та підтримки для придбання слухового апарата в Україні.',
    status: 'published',
    href: '/vse-pro-slukh/yak-otrymaty-slukhovyi-aparat-bezkoshtovno',
    featured: true,
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8c-1.5-2-4.5-2.5-6-1-1.5 1.5-1.2 4 .5 5.5L12 18l5.5-5.5c1.7-1.5 2-4 .5-5.5-1.5-1.5-4.5-1-6 1z" />
      </svg>
    ),
  },
  {
    slug: 'derzhavna-programa-sluhoprotezuvannya',
    title: 'Державна програма слухопротезування',
    description: 'Як працює державна програма забезпечення слуховими апаратами та хто може нею скористатися.',
    status: 'published',
    href: '/derzhavna-programa-slukhoprotezuvannia',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12h6m-6 4h6M9 8h1m5 12H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V18a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    slug: 'hto-takyi-surdoloh',
    title: 'Хто такий сурдолог',
    description: 'Чим займається лікар-сурдолог і коли варто звертатися до нього.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0zM4.5 20a7.5 7.5 0 0115 0" />
      </svg>
    ),
  },
  {
    slug: 'vydy-vtraty-sluhu',
    title: 'Види втрати слуху',
    description: 'Кондуктивна, нейросенсорна та змішана втрата слуху — в чому різниця.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    ),
  },
  {
    slug: 'stupeni-vtraty-sluhu',
    title: 'Ступені втрати слуху',
    description: 'Як визначають ступінь втрати слуху — від легкого до глибокого.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 20V10m5 10V4m5 16v-7" />
      </svg>
    ),
  },
  {
    slug: 'yak-pereviryty-sluh',
    title: 'Як перевірити слух',
    description: 'Що таке скринінг слуху і як проходить перевірка в центрі слуху.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12h3l2-6 4 12 2-8 2 4h5" />
      </svg>
    ),
  },
  {
    slug: 'tinitus',
    title: 'Тинітус',
    description: 'Причини шуму у вухах та як з ним впоратися.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    slug: 'audiohrama',
    title: 'Аудіограма',
    description: 'Як читати результати аудіограми та що означають її показники.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 17l4-8 3 5 3-9 3 8 5-10M3 20h18" />
      </svg>
    ),
  },
  {
    slug: 'yak-vybraty-sluhovyi-aparat',
    title: 'Як вибрати слуховий апарат',
    description: 'На що звертати увагу при підборі моделі — форма, клас, функції.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    slug: 'sluhovi-aparaty-dlya-ditey',
    title: 'Слухові апарати для дітей',
    description: 'Особливості дитячого слухопротезування та підбору апарата для дитини.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3" strokeWidth={1.8} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" />
      </svg>
    ),
  },
  {
    slug: 'sluhovi-aparaty-dlya-litnih-lyudey',
    title: 'Слухові апарати для літніх людей',
    description: 'Як підібрати комфортний і простий у використанні апарат для старшого покоління.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M20.8 8.6c0 4.4-8.8 10.4-8.8 10.4S3.2 13 3.2 8.6a4.6 4.6 0 018.8-1.8 4.6 4.6 0 018.8 1.8z" />
      </svg>
    ),
  },
  {
    slug: 'dohlyad-za-sluhovym-aparatom',
    title: 'Догляд за слуховим апаратом',
    description: 'Щоденні правила чищення та зберігання апарата для довшого терміну служби.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" />
      </svg>
    ),
  },
  {
    slug: 'aksesuary',
    title: 'Аксесуари',
    description: 'Вушні вкладиші, фільтри, сушки та інше приладдя для слухових апаратів.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    slug: 'batareiky',
    title: 'Батарейки',
    description: 'Типи батарейок для слухових апаратів та як обрати підходящі.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 10a1 1 0 011-1h13a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM19 11h2v2h-2" />
      </svg>
    ),
  },
  {
    slug: 'remont-sluhovyh-aparativ',
    title: 'Ремонт слухових апаратів',
    description: 'Коли потрібен ремонт і як відбувається діагностика несправностей.',
    status: 'coming-soon',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
];
