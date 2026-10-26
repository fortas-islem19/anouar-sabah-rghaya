// فنادقنا — الصور في public/images/hotels/<id>/ (01.jpg و 01-thumb.jpg ...)
// لتغيير صورة: استبدل الملف بنفس الاسم، أو أضف سطراً جديداً في photos.

const photo = (hotel, n, caption) => ({
  src: `./images/hotels/${hotel}/${String(n).padStart(2, '0')}.jpg`,
  thumb: `./images/hotels/${hotel}/${String(n).padStart(2, '0')}-thumb.jpg`,
  caption,
});

export const hotels = [
  {
    id: 'infinity',
    name: 'فندق إنفينيتي',
    street: 'شارع أجياد – مكة المكرمة',
    stars: 5,
    photos: [
      photo('infinity', 1, 'فندق إنفينيتي – 5 نجوم'),
      photo('infinity', 2, 'غرف أنيقة بطابع كلاسيكي'),
      photo('infinity', 3, 'غرف مريحة بمفروشات فاخرة'),
      photo('infinity', 4, 'غرف عائلية متعددة الأسرّة'),
      photo('infinity', 5, 'أجواء هادئة للراحة بعد العبادة'),
      photo('infinity', 6, 'مصلى داخل الفندق'),
      photo('infinity', 7, 'ركن ألعاب للأطفال'),
      photo('infinity', 8, 'مصاعد وممرات أنيقة'),
      photo('infinity', 9, 'حمّام خاص بتجهيزات كاملة'),
    ],
  },
  {
    id: 'rayan',
    name: 'فندق ريان الجوار',
    street: 'شارع غزة – مكة المكرمة',
    photos: [
      photo('rayan', 1, 'واجهة الفندق – شارع غزة'),
      photo('rayan', 2, 'بهو الاستقبال وصالة الجلوس'),
      photo('rayan', 3, 'غرف عائلية واسعة'),
      photo('rayan', 4, 'غرفة ثلاثية بتصميم عصري'),
      photo('rayan', 5, 'أسرّة مريحة ومفروشات نظيفة'),
      photo('rayan', 6, 'تلفاز، خزانة وخزنة في كل غرفة'),
      photo('rayan', 7, 'حمّام خاص عصري'),
      photo('rayan', 8, 'ممرات ومصاعد حديثة'),
      photo('rayan', 9, 'إطلالة على محيط الفندق'),
    ],
  },
  {
    id: 'moein',
    name: 'فندق معين طيبة',
    street: 'المدينة المنورة',
    photos: [
      photo('moein', 1, 'فندق معين طيبة – المدينة المنورة'),
      photo('moein', 2, 'واجهة الفندق ومدخله'),
      photo('moein', 3, 'مكتب الاستقبال'),
      photo('moein', 4, 'بهو واسع وصالة جلوس'),
      photo('moein', 5, 'ممرات ومصاعد أنيقة'),
      photo('moein', 6, 'غرف عائلية متعددة الأسرّة'),
      photo('moein', 7, 'أسرّة مريحة بتصميم عصري'),
      photo('moein', 8, 'مكتب وتلفاز وإطلالة على المدينة'),
      photo('moein', 9, 'حمّام خاص بتجهيزات حديثة'),
    ],
  },
];
