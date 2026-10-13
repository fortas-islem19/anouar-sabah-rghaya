// العروض المتوفرة — مأخوذة من ملصقات الوكالة.
// price: بالدينار الجزائري. null = السعر عند الاتصال.

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
    id: 'week-oct',
    badge: '7 أيام',
    title: 'عمرة أسبوع',
    subtitle: 'في شهر أكتوبر',
    period: 'أكتوبر',
    departures: ['13 أكتوبر', '29 أكتوبر'],
    poster: './images/offer-week.jpg',
    highlights: ['رحلات مباشرة مع الخطوط السعودية', 'برنامج متوازن بين العبادة والراحة', 'تنظيم محكم ومتابعة مستمرة'],
    hotels: [
      {
        id: 'standard',
        name: 'الفندق حسب البرنامج',
        rooms: { quint: 182000, quad: 188000, triple: 199000, double: 219000 },
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
  return all.length ? Math.min(...all) : null;
};

export const formatDZD = (n) =>
  n == null ? 'عند الاتصال' : `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} دج`;
