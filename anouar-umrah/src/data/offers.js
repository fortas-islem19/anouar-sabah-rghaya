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
    id: '19-oct19-rayan',
    badge: '19 يوماً',
    title: 'عمرة 19 يوم – انطلاق 19 أكتوبر',
    subtitle: 'في فندق ريان الجوار',
    period: 'أكتوبر',
    departures: ['19 أكتوبر'],
    poster: './images/offer-19-rayan-oct19.jpg',
    highlights: ['برنامج متكامل لأداء المناسك', 'خدمة متميزة ومرافقة دائمة', 'راحة وأمان في كل خطوة'],
    hotels: [
      {
        id: 'rayan',
        name: 'فندق ريان الجوار – مكة المكرمة',
        rooms: { quint: 193000, quad: 199000, triple: 215000, double: 242000 },
        meals: 42000,
      },
    ],
  },
  {
    id: '19-two-umrah',
    badge: '19 يوماً',
    title: 'عمرة 19 يوم – عمرتان في عمرة واحدة',
    subtitle: 'الدخول من جدة • 3 رحلات في الأسبوع',
    period: 'أكتوبر / نوفمبر',
    departures: ['3 رحلات أسبوعياً'],
    poster: './images/offer-19-two-hotels.jpg',
    childrenPricing: true,
    highlights: ['الخطوط السعودية رحلات مباشرة', 'تنقلات مريحة بين المدينتين', 'تأمين السفر'],
    hotels: [
      {
        id: 'rayan',
        name: 'فندق ريان الجوار – أقوى عرض اقتصادي',
        // ملاحظة: عناوين الغرف في الملصق مكررة، اعتمدنا ترتيب ملصق "انطلاق 19 أكتوبر" — يُرجى التأكد
        rooms: { quint: 193000, quad: 199000, triple: 215000, double: 242000 },
        meals: 45000,
      },
      {
        id: 'infinity',
        name: 'فندق إنفينيتي 5 نجوم',
        stars: 5,
        rooms: { quint: 225000, quad: 235000, triple: 260000, double: 309000 },
        meals: 52000,
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
    id: '15-days',
    badge: '15 يوماً',
    title: 'عمرة 15 يوماً',
    subtitle: 'أكتوبر / نوفمبر – أسعار تنافسية جداً',
    period: 'أكتوبر / نوفمبر',
    departures: ['حسب الرزنامة'],
    poster: './images/offers-overview.jpg',
    highlights: ['فنادق مميزة في مكة والمدينة', 'إطعام متكامل', 'إمكانية الدفع بالتقسيط'],
    hotels: [{ id: 'tbd', name: 'السعر عند الاتصال', rooms: {} }],
  },
];

export const minPrice = (offer) => {
  const all = offer.hotels.flatMap((h) => Object.values(h.rooms));
  return all.length ? Math.min(...all) : null;
};

export const formatDZD = (n) =>
  n == null ? 'عند الاتصال' : `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} دج`;
