import { useCallback, useEffect, useRef, useState } from 'react';
import { hotels } from '../data/hotels.js';
import { Arrow, Hotel, Pin, Star } from './Icons.jsx';

const AUTOPLAY_MS = 5000;

function Slider({ hotel }) {
  const { photos } = hotel;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const thumbs = useRef(null);

  const go = useCallback((i) => setIndex((i + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), [photos.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length]);

  // تشغيل تلقائي، يتوقف عند مرور الفأرة أو اللمس
  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  // إبقاء الصورة المصغّرة النشطة ظاهرة
  useEffect(() => {
    const box = thumbs.current;
    const el = box?.children[index];
    if (!el) return;
    // يعمل في اتجاه RTL أيضاً (scrollBy بدل scrollLeft)
    const a = el.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    box.scrollBy({ left: a.left + a.width / 2 - (b.left + b.width / 2), behavior: 'smooth' });
  }, [index]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; setPaused(true); };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    // الصفحة من اليمين لليسار: السحب نحو اليمين = الصورة التالية
    if (dx > 40) next();
    else if (dx < -40) prev();
    touchX.current = null;
    setPaused(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') next();
    if (e.key === 'ArrowRight') prev();
  };

  return (
    <div className="hotel-slider">
      <div
        className="slider-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`صور ${hotel.name}`}
      >
        {photos.map((p, i) => (
          <figure
            key={p.src}
            className={`slide ${i === index ? 'is-active' : ''}`}
            aria-hidden={i !== index}
          >
            <img className="slide-blur" src={p.src} alt="" aria-hidden="true" loading="lazy" />
            <img className="slide-img" src={p.src} alt={p.caption} loading={i === 0 ? 'eager' : 'lazy'} />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}

        <button className="slider-arrow prev" onClick={prev} aria-label="الصورة السابقة"><Arrow /></button>
        <button className="slider-arrow next" onClick={next} aria-label="الصورة التالية"><Arrow /></button>

        <span className="slider-count">{`${index + 1} / ${photos.length}`}</span>
        <span key={`${index}-${paused}`} className={`slider-progress ${paused ? 'is-paused' : ''}`} style={{ '--ms': `${AUTOPLAY_MS}ms` }} />
      </div>

      <div className="slider-thumbs" ref={thumbs}>
        {photos.map((p, i) => (
          <button
            key={p.thumb}
            className={i === index ? 'active' : ''}
            onClick={() => go(i)}
            aria-label={`عرض الصورة ${i + 1}: ${p.caption}`}
            aria-current={i === index}
          >
            <img src={p.thumb} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Hotels() {
  const [active, setActive] = useState(hotels[0].id);
  const hotel = hotels.find((h) => h.id === active);

  return (
    <section className="section hotels" id="hotels">
      <div className="container">
        <header className="section-head reveal">
          <span className="eyebrow">فنادقنا</span>
          <h2>إقامة مريحة بالقرب من الحرم</h2>
          <p>صور حقيقية من الفنادق التي نُسكن فيها معتمرينا في مكة المكرمة.</p>
        </header>

        <div className="hotel-tabs reveal" role="tablist">
          {hotels.map((h) => (
            <button
              key={h.id}
              role="tab"
              aria-selected={active === h.id}
              className={active === h.id ? 'active' : ''}
              onClick={() => setActive(h.id)}
            >
              <Hotel width="20" height="20" />
              <span>
                <b>{h.name}</b>
                <small>{h.street}</small>
              </span>
            </button>
          ))}
        </div>

        <div className="hotel-card reveal" key={hotel.id}>
          <div className="hotel-info">
            <h3>{hotel.name}</h3>
            {hotel.stars && (
              <span className="stars" aria-label={`${hotel.stars} نجوم`}>
                {Array.from({ length: hotel.stars }, (_, i) => <Star key={i} width="16" height="16" />)}
              </span>
            )}
            <p><Pin width="18" height="18" /> {hotel.street}</p>
          </div>
          <Slider hotel={hotel} />
        </div>
      </div>
    </section>
  );
}
