import type { Product } from '@/types';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductSpecs {
  type: string;
  channels: string;
  hearingLoss: string;
  battery: string;
  features: string[];
  guarantee: string;
}

// Extract channel count from description text
function extractChannels(text: string): string {
  const match = text.match(/(\d+)[- ]?канальн/i);
  if (match) return `${match[1]} каналів`;
  return 'Цифрова обробка';
}

// Extract hearing loss level from description
function extractHearingLoss(text: string): string {
  const levels: string[] = [];
  if (/легк/i.test(text)) levels.push('легка');
  if (/помірн/i.test(text)) levels.push('помірна');
  if (/середн/i.test(text)) levels.push('середня');
  if (/знач/i.test(text)) levels.push('значна');
  if (/важк/i.test(text)) levels.push('важка');
  if (/глибок/i.test(text)) levels.push('глибока');
  if (levels.length === 0) return 'Від легкої до важкої';
  if (levels.length === 1) return `${levels[0].charAt(0).toUpperCase()}${levels[0].slice(1)}`;
  return `${levels[0].charAt(0).toUpperCase()}${levels[0].slice(1)} — ${levels[levels.length - 1]}`;
}

// Per-category defaults
const categoryDefaults: Record<string, Partial<ProductSpecs>> = {
  '%d0%b1%d0%b0%d0%b7%d0%be%d0%b2%d1%96-%d1%86%d0%b8%d1%84%d1%80%d0%be%d0%b2%d1%96': {
    type: 'Завушний (BTE)',
    battery: 'Розмір 13 або 312',
    features: ['Цифрова обробка сигналу', 'Шумозаглушення', 'Зворотний зв\'язок-менеджер'],
    guarantee: '1 рік',
  },
  '%d1%81%d0%b5%d1%80%d0%b5%d0%b4%d0%bd%d1%96%d0%b9-%d0%ba%d0%bb%d0%b0%d1%81': {
    type: 'Завушний (BTE/RIC)',
    battery: 'Розмір 312 або перезарядний',
    features: [
      'Адаптивна обробка звуку',
      'Шумозаглушення',
      'Придушення зворотного зв\'язку',
      'Кілька програм',
    ],
    guarantee: '1 рік',
  },
  '%d0%bf%d1%80%d0%b5%d0%bc%d1%96%d1%83%d0%bc-%d0%ba%d0%bb%d0%b0%d1%81': {
    type: 'RIC / BTE (преміум)',
    battery: 'Перезарядний або розмір 312',
    features: [
      'Bluetooth 5.0 / Made for iPhone',
      'AI-обробка звуку',
      'Автоматична зміна програм',
      'Спрямований мікрофон',
      'Стрімінг звуку',
      'Зарядний кейс у комплекті',
    ],
    guarantee: '1 рік',
  },
  '%d0%b2%d0%bd%d1%83%d1%82%d1%80%d1%96%d1%88%d0%bd%d1%8c%d0%be%d0%b2%d1%83%d1%88%d0%bd%d1%96-%d0%b0%d0%bf%d0%b0%d1%80%d0%b0%d1%82%d0%b8-%d1%81i%d1%81': {
    type: 'Внутрішньовушний (CIC/ITE)',
    battery: 'Розмір 10 або 312',
    features: [
      'Практично непомітний',
      'Цифрова обробка сигналу',
      'Антишумовий фільтр',
      'Підходить для активного способу життя',
    ],
    guarantee: '1 рік',
  },
};

export function getProductSpecs(product: Product): ProductSpecs {
  const defaults = categoryDefaults[product.categorySlug] ?? {};
  const desc = product.description ?? '';

  return {
    type: defaults.type ?? 'Завушний (BTE)',
    channels: extractChannels(desc),
    hearingLoss: extractHearingLoss(desc),
    battery: defaults.battery ?? 'Розмір 13/312',
    features: defaults.features ?? ['Цифрова обробка сигналу', 'Шумозаглушення'],
    guarantee: defaults.guarantee ?? '1 рік',
  };
}

// Derive "suitable for" paragraph from category + description
export function getSuitableFor(product: Product): string {
  const catSlug = product.categorySlug;
  const isBasic = catSlug.includes('d0%b1%d0%b0%d0%b7');
  const isMid = catSlug.includes('d1%81%d0%b5%d1%80');
  const isPremium = catSlug.includes('d0%bf%d1%80%d0%b5');
  const isCIC = catSlug.includes('d0%b2%d0%bd%d1%83');

  if (isPremium) {
    return `Модель ${product.title.replace('Слуховий апарат ', '')} — вибір людей, які цінують комфорт і найсучасніші технології. Вона підійде активним користувачам, які хочуть непомітний апарат з підключенням до смартфона, автоматичною зміною програм у різних ситуаціях та тривалим часом роботи без заміни батарейок. Особливо рекомендується тим, хто часто перебуває в шумних середовищах: в офісі, на зустрічах, за кермом або на вулиці. Завдяки штучному інтелекту апарат сам адаптується до оточення, забезпечуючи природне, комфортне звучання протягом усього дня.`;
  }
  if (isMid) {
    return `Модель ${product.title.replace('Слуховий апарат ', '')} — оптимальний вибір для тих, хто шукає якість без переплат. Апарат підходить людям із середньою та значною втратою слуху, які ведуть активний спосіб життя і стикаються з різними звуковими ситуаціями: вдома, у громадських місцях, на природі. Кілька програм та адаптивна обробка звуку дозволяють чути чітко у будь-яких умовах. Це ідеальний варіант як для першого слухового апарату, так і для тих, хто переходить з простих аналогових пристроїв.`;
  }
  if (isCIC) {
    return `Модель ${product.title.replace('Слуховий апарат ', '')} — ідеальне рішення для людей, які хочуть непомітний апарат. Завдяки розміщенню у слуховому проході він практично не видно ззовні. Підходить для людей з легкою та помірною втратою слуху, які активно спілкуються і не хочуть, щоб оточення знало про слуховий апарат. Особливо популярний серед людей середнього та молодого віку, а також тих, хто вперше починає користуватись слуховим апаратом.`;
  }
  // Basic — suppress unused variable warning
  void isBasic;
  return `Модель ${product.title.replace('Слуховий апарат ', '')} — надійний і доступний вибір для людей, які вперше починають використовувати слуховий апарат. Він підходить для людей похилого та середнього віку з легкою, помірною або середньою втратою слуху. Проста конструкція, великий розмір батарейки та зручні регулятори гучності роблять апарат особливо зручним для людей, які мають труднощі з дрібними деталями. Гарний вибір для домашнього використання та спокійних середовищ.`;
}
