// العروض المتوفرة — مأخوذة من ملصقات الوكالة.
// price: بالدينار الجزائري. null = السعر عند الاتصال.
// featured: العرض الذي يظهر أولاً في أعلى الصفحة.
// fromPrice: سعر «ابتداءً من» للعروض التي لا تُفصّل أسعار الغرف (بدون اختيار نوع الغرفة).

export const ROOM_LABELS = {
  single: 'أحادية',
  double: 'ثنائية',
  triple: 'ثلاثية',
  quad: 'رباعية',
  quint: 'خماسية',
};

export const ROOM_CAPACITY = { single: 1, double: 2, triple: 3, quad: 4, quint: 5 };

export const CHILD_PRICES = [
  { id: 'baby', label: 'من 0 إلى 2 سنة (بدون سرير)', price: 80000 },
  { id: 'kid', label: 'من 2 إلى 12 سنة (بدون سرير)', price: 150000 },
  { id: 'withBed', label: 'طفل مع سرير (خصم من سعر الغرفة)', discount: 15000 },
];

export const offers = [
  {
    id: 'golden-nov',
    featured: true,
    badge: 'العرض الذهبي',
    title: 'فرصة الأنوار الذهبية لشهر نوفمبر',
    subtitle: 'من 01 إلى 30 نوفمبر – عمرتين في عمرة',
    period: 'نوفمبر',
    departures: ['من 01 إلى 30 نوفمبر'],
    poster: './images/offer-golden-nov.jpg',
    fromPrice: 169000,
    highlights: [
      'عمرتين في عمرة واحدة',
      'مكة المكرمة: فندق ريان الجوار',
      'المدينة المنورة: فندق معين طيبة',
    ],
    hotels: [
      {
        id: 'rayan-moein',
        name: 'فندق ريان الجوار (مكة) + فندق معين طيبة (المدينة)',
        rooms: {},
      },
    ],
  },
  {
    id: 'dec-holiday',
    badge: '14 – 24 ديسمبر',
    title: 'عمرة عطلة ديسمبر',
    subtitle: 'في الفترة الممتدة من 14 إلى 24 ديسمبر – فندقان للاختيار',
    period: 'ديسمبر',
    departures: ['14 ديسمبر'],
    poster: './images/offer-dec-holiday-rayan.jpg',
    highlights: ['رحلات مباشرة وتنقلات مريحة', 'فندق ريان الجوار أو فندق إنفينيتي 5 نجوم بمكة المكرمة', 'تنظيم محكم ورعاية دائمة'],
    hotels: [
      {
        id: 'rayan',
        name: 'فندق ريان الجوار – مكة المكرمة',
        rooms: { quint: 253000, quad: 263000, triple: 280000, double: 315000, single: 370000 },
      },
      {
        id: 'infinity',
        name: 'فندق إنفينيتي 5 نجوم',
        stars: 5,
        rooms: { quint: 283000, quad: 302000, triple: 332000, double: 395000, single: 440000 },
      },
    ],
  },
  {
    id: 'dec-infinity',
    badge: 'ديسمبر',
    title: 'عمرة ديسمبر',
    subtitle: 'من 01 إلى 13 ديسمبر ومن 25 إلى 31 ديسمبر – إقامة فاخرة في فندق إنفينيتي',
    period: 'ديسمبر',
    departures: ['01 ديسمبر', '25 ديسمبر'],
    poster: './images/offer-dec-infinity.jpg',
    highlights: ['فندق إنفينيتي 5 نجوم قريب من الحرم', 'إقامة مريحة وفندق راقي', 'خدمة متميزة وتنظيم محكم'],
    hotels: [
      {
        id: 'infinity',
        name: 'فندق إنفينيتي 5 نجوم',
        stars: 5,
        rooms: { quint: 253000, quad: 272000, triple: 302000, double: 365000, single: 410000 },
      },
    ],
  },
  {
    id: 'oct-nov',
    badge: 'أكتوبر – نوفمبر',
    title: 'عمرة أكتوبر – نوفمبر',
    subtitle: 'رحلة إيمانية .. بأمان وراحة',
    period: 'أكتوبر / نوفمبر',
    departures: ['حسب الرزنامة'],
    poster: './images/offer-oct-nov.jpg',
    childrenPricing: true,
    highlights: ['غرفة أحادية متوفرة', 'فندقان للاختيار', 'عمرة مقبولة وذنوب مغفورة'],
    hotels: [
      {
        id: 'rayan',
        name: 'فندق ريان الجوار – عرض اقتصادي',
        rooms: { quint: 205000, quad: 215000, triple: 230000, double: 258000, single: 345000 },
      },
      {
        id: 'infinity',
        name: 'فندق إنفينيتي 5 نجوم',
        stars: 5,
        rooms: { quint: 229000, quad: 238000, triple: 263000, double: 299000, single: 435000 },
      },
    ],
  },
  {
    id: 'programs-7-15-19',
    badge: '7 • 15 • 19 يوماً',
    title: 'عروض العمرة 7، 15 و19 يوماً',
    subtitle: 'أكتوبر / نوفمبر – أسعار تنافسية جداً مع إمكانية الدفع بالتقسيط',
    period: 'أكتوبر / نوفمبر',
    departures: ['حسب الرزنامة'],
    poster: './images/offers-overview.jpg',
    highlights: [
      '7 أيام، 15 يوماً أو 19 يوماً (عمرتان في عمرة واحدة)',
      'تذاكر الطيران مع الخطوط السعودية',
      'فنادق مميزة وإطعام متكامل في مكة والمدينة',
      'تنقلات مريحة بين المدينتين والمشاعر',
      'تأمين السفر وإمكانية الدفع بالتقسيط',
    ],
    hotels: [{ id: 'tbd', name: 'السعر عند الاتصال', rooms: {} }],
  },
];

export const minPrice = (offer) => {
  const all = offer.hotels.flatMap((h) => Object.values(h.rooms));
  if (offer.fromPrice) all.push(offer.fromPrice);
  return all.length ? Math.min(...all) : null;
};

export const formatDZD = (n) =>
  n == null ? 'عند الاتصال' : `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} دج`;
