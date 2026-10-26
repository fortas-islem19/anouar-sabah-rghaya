// العروض المتوفرة — مأخوذة من ملصقات الوكالة.
// price: بالدينار الجزائري. null = السعر عند الاتصال.
// featured: العرض الذي يظهر أولاً في أعلى الصفحة.
// childBedDiscount: خصم الطفل مع سرير من سعر الغرفة (بدونه يدفع الطفل مع سرير سعر الغرفة كاملاً).
// airports: مطارات الانطلاق المتاحة.
// fromPrice: سعر «ابتداءً من» للعروض التي لا تُفصّل أسعار الغرف (بدون اختيار نوع الغرفة).

export const ROOM_LABELS = {
  double: 'ثنائية',
  triple: 'ثلاثية',
  quad: 'رباعية',
  quint: 'خماسية',
};

export const ROOM_CAPACITY = { double: 2, triple: 3, quad: 4, quint: 5 };

export const CHILD_PRICES = [
  { id: 'baby', label: 'من 0 إلى 2 سنة (بدون سرير)', price: 80000 },
  { id: 'kid', label: 'من 2 إلى 12 سنة (بدون سرير)', price: 150000 },
  { id: 'withBed', label: 'طفل مع سرير', withBed: true },
];

const AIRPORTS = ['مطار الجزائر', 'مطار قسنطينة', 'مطار أدرار'];

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
    title: 'عمرة العطلة 2026',
    subtitle: 'من 14 إلى 24 ديسمبر – مكة المكرمة والمدينة المنورة',
    period: 'ديسمبر',
    departures: ['14 ديسمبر'],
    airports: AIRPORTS,
    poster: './images/offer-dec-holiday.jpg',
    childrenPricing: true,
    highlights: [
      'الانطلاق من مطارات الجزائر – قسنطينة – أدرار',
      'المدينة المنورة: فندق معين طيبة 3 نجوم',
      'مكة المكرمة: فندق ريان الجوار أو فندق إنفينيتي 5 نجوم',
      'الإطعام اختياري (في مكة فقط)',
    ],
    hotels: [
      {
        id: 'rayan',
        name: 'فندق ريان الجوار (مكة) + معين طيبة (المدينة)',
        rooms: { quint: 243000, quad: 253000, triple: 270000, double: 305000 },
        meals: 30000,
      },
      {
        id: 'infinity',
        name: 'فندق إنفينيتي 5 نجوم (مكة) + معين طيبة (المدينة)',
        stars: 5,
        rooms: { quint: 273000, quad: 292000, triple: 322000, double: 385000 },
        meals: 35000,
      },
    ],
  },
  {
    id: 'dec',
    badge: 'ديسمبر',
    title: 'عمرة ديسمبر 2026',
    subtitle: 'من 01 إلى 13 ديسمبر ومن 25 إلى 31 ديسمبر – مكة المكرمة والمدينة المنورة',
    period: 'ديسمبر',
    departures: ['01 ديسمبر', '25 ديسمبر'],
    airports: AIRPORTS,
    poster: './images/offer-dec.jpg',
    childrenPricing: true,
    highlights: [
      'الانطلاق من مطارات الجزائر – قسنطينة – أدرار',
      'المدينة المنورة: فندق معين طيبة 3 نجوم',
      'مكة المكرمة: فندق ريان الجوار أو فندق إنفينيتي 5 نجوم',
      'الإطعام اختياري (في مكة فقط)',
    ],
    hotels: [
      {
        id: 'rayan',
        name: 'فندق ريان الجوار (مكة) + معين طيبة (المدينة)',
        rooms: { quint: 223000, quad: 233000, triple: 250000, double: 285000 },
        meals: 30000,
      },
      {
        id: 'infinity',
        name: 'فندق إنفينيتي 5 نجوم (مكة) + معين طيبة (المدينة)',
        stars: 5,
        rooms: { quint: 253000, quad: 272000, triple: 302000, double: 365000 },
        meals: 35000,
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
    childBedDiscount: 15000,
    highlights: ['فندقان للاختيار', 'عمرة مقبولة وذنوب مغفورة'],
    hotels: [
      {
        id: 'rayan',
        name: 'فندق ريان الجوار – عرض اقتصادي',
        rooms: { quint: 205000, quad: 215000, triple: 230000, double: 258000 },
      },
      {
        id: 'infinity',
        name: 'فندق إنفينيتي 5 نجوم',
        stars: 5,
        rooms: { quint: 229000, quad: 238000, triple: 263000, double: 299000 },
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
