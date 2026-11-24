// العروض المتوفرة — مأخوذة من ملصقات الوكالة.
// price: بالدينار الجزائري. null = السعر عند الاتصال.
// featured: العرض الذي يظهر أولاً في أعلى الصفحة.
// childBedDiscount: خصم الطفل مع سرير من سعر الغرفة (بدونه يدفع الطفل مع سرير سعر الغرفة كاملاً).
// airports: مطارات الانطلاق المتاحة.
// fromPrice: سعر «ابتداءً من» للعروض التي لا تُفصّل أسعار الغرف (بدون اختيار نوع الغرفة).
// meals: خيارات الإطعام الاختيارية للفندق، السعر للشخص.
// poster: null = لم يُرفع الملصق بعد (تظهر صورة بديلة).

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

const SAUDIA = 'رحلة مباشرة مع الخطوط السعودية';
const MEALS_30_20 = [
  { id: 'makkah', label: 'الإطعام في مكة المكرمة', price: 30000 },
  { id: 'madinah', label: 'الإطعام في المدينة المنورة', price: 20000 },
];

export const offers = [
  {
    id: 'dec-09-13-jada',
    badge: '09 و 13 ديسمبر',
    title: 'عمرة ديسمبر – فندق جادة أجياد',
    subtitle: 'رحلتان متاحتان – رحلة مباشرة مع الخطوط السعودية',
    period: 'ديسمبر',
    departures: ['09 ديسمبر', '13 ديسمبر'],
    poster: './images/offer-dec09-13-jada.jpg',
    highlights: [SAUDIA, 'الانطلاق من مطار الجزائر باتجاه جدة', 'الإقامة في فندق جادة أجياد', 'الإطعام اختياري في مكة والمدينة'],
    hotels: [
      {
        id: 'jada',
        name: 'فندق جادة أجياد',
        rooms: { quint: 248000, quad: 267000, triple: 297000, double: 360000 },
        meals: MEALS_30_20,
      },
    ],
  },
  {
    id: 'dec-12-salah',
    badge: '12 ديسمبر',
    title: 'رحلة عمرة 12 ديسمبر – فندق الصلاح أجياد',
    subtitle: 'رحلة مباشرة مع الخطوط السعودية',
    period: 'ديسمبر',
    departures: ['12 ديسمبر'],
    poster: './images/offer-dec12-salah.jpg',
    highlights: [SAUDIA, 'الإقامة في فندق الصلاح أجياد', 'الإطعام اختياري في مكة والمدينة'],
    hotels: [
      {
        id: 'salah',
        name: 'فندق الصلاح أجياد',
        rooms: { quint: 229000, quad: 245000, triple: 275000, double: 325000 },
        meals: MEALS_30_20,
      },
    ],
  },
  {
    id: 'dec-19-infinity',
    badge: '19 ديسمبر',
    title: 'رحلة عمرة مميزة – 19 ديسمبر',
    subtitle: 'الإقامة في فندق إنفينيتي 5 نجوم',
    period: 'ديسمبر',
    departures: ['19 ديسمبر'],
    poster: './images/offer-dec19-infinity.jpg',
    highlights: [SAUDIA, 'الإقامة في فندق إنفينيتي 5 نجوم', 'الإطعام اختياري في مكة والمدينة'],
    hotels: [
      {
        id: 'infinity',
        name: 'فندق إنفينيتي 5 نجوم',
        stars: 5,
        rooms: { quint: 273000, quad: 292000, triple: 322000, double: 385000 },
        meals: [
          { id: 'makkah', label: 'الإطعام في مكة المكرمة', price: 35000 },
          { id: 'madinah', label: 'الإطعام في المدينة المنورة', price: 20000 },
        ],
      },
    ],
  },
  {
    id: 'dec-26-rayan',
    badge: '26 ديسمبر',
    title: 'رحلة العمرة – 26 ديسمبر',
    subtitle: 'الدخول من المدينة المنورة – الإقامة في فندق ريان الجوار',
    period: 'ديسمبر',
    departures: ['26 ديسمبر'],
    poster: './images/offer-dec26-rayan.jpg',
    highlights: ['الدخول من المدينة المنورة', 'الإقامة في فندق ريان الجوار', 'عمرة مريحة … رحلة مباركة'],
    hotels: [
      {
        id: 'rayan',
        name: 'فندق ريان الجوار',
        rooms: { quint: 223000, quad: 233000, triple: 250000, double: 285000 },
      },
    ],
  },
  {
    id: 'dec-29',
    badge: '29 ديسمبر',
    title: 'عمرة 29 ديسمبر',
    subtitle: 'الدخول من المدينة المنورة – فندقان للاختيار',
    period: 'ديسمبر',
    departures: ['29 ديسمبر'],
    poster: './images/offer-dec29.jpg',
    highlights: [SAUDIA, 'الدخول من المدينة المنورة', 'فندق ريان الجوار أو فندق العنوان أجياد'],
    hotels: [
      {
        id: 'rayan',
        name: 'فندق ريان الجوار',
        rooms: { quint: 223000, quad: 233000, triple: 250000, double: 285000 },
      },
      {
        id: 'address',
        name: 'فندق العنوان أجياد',
        rooms: { quint: 229000, quad: 245000, triple: 275000, double: 325000 },
      },
    ],
  },
  {
    id: 'two-umrah-dec',
    badge: 'عمرتين في عمرة',
    title: 'برنامج عمرتين في عمرة واحدة',
    subtitle: 'يعود إليكم من جديد في شهر ديسمبر',
    period: 'ديسمبر',
    departures: ['ديسمبر – حسب الرزنامة'],
    poster: './images/offer-two-umrah-dec.jpg',
    highlights: ['عمرتين في عمرة واحدة', 'التفاصيل والأسعار عند الاتصال بالوكالة'],
    hotels: [{ id: 'tbd', name: 'السعر عند الاتصال', rooms: {} }],
  },
  {
    id: 'shaban-1448',
    badge: 'شعبان 1448',
    title: 'عمرة شعبان 1448 هـ',
    subtitle: 'من 10 إلى 31 جانفي 2027 – 04 ليالي بالمدينة المنورة',
    period: 'جانفي 2027',
    departures: ['من 10 إلى 31 جانفي 2027'],
    airports: ['مطار الجزائر', 'مطار قسنطينة', 'مطار أدرار', 'مطار وهران'],
    poster: './images/offer-shaban-1448.jpg',
    childrenPricing: true,
    highlights: [
      'الانطلاق من مطارات الجزائر – قسنطينة – أدرار – وهران',
      '04 ليالي بالمدينة المنورة',
      'أربعة فنادق للاختيار في مكة المكرمة',
      'الإطعام اختياري',
    ],
    hotels: [
      {
        id: 'rayan',
        name: 'فندق ريان الجوار',
        rooms: { quint: 228000, quad: 238000, triple: 255000, double: 290000 },
        meals: [{ id: 'meals', label: 'الإطعام', price: 30000 }],
      },
      {
        id: 'address-salah',
        name: 'فندق العنوان أجياد / الصلاح أجياد',
        rooms: { quint: 234900, quad: 250000, triple: 280000, double: 330000 },
        meals: [{ id: 'meals', label: 'الإطعام', price: 30000 }],
      },
      {
        id: 'infinity',
        name: 'فندق إنفينيتي 5 نجوم',
        stars: 5,
        rooms: { quint: 258000, quad: 277000, triple: 307000, double: 370000 },
        meals: [{ id: 'meals', label: 'الإطعام', price: 35000 }],
      },
    ],
  },
];

// إعلانات الوكالة (ملصقات بدون أسعار)
export const announcements = [
  {
    id: 'holiday-new',
    title: 'بشرى لزبائننا الكرام!',
    text: 'بعد نفاد رحلات عطلة شهر ديسمبر، تعلن الوكالة عن توفير رحلات جديدة خلال فترة العطلة.',
    poster: './images/announce-holiday.jpg',
  },
];

export const minPrice = (offer) => {
  const all = offer.hotels.flatMap((h) => Object.values(h.rooms));
  if (offer.fromPrice) all.push(offer.fromPrice);
  return all.length ? Math.min(...all) : null;
};

export const formatDZD = (n) =>
  n == null ? 'عند الاتصال' : `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} دج`;
