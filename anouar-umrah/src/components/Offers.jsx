import { useEffect, useState } from 'react';
import { offers, announcements, minPrice, formatDZD, ROOM_LABELS } from '../data/offers.js';
import { Calendar, Check, Close, Star } from './Icons.jsx';
import { track } from '../lib/pixel.js';

const viewOffer = (offer) => track('ViewContent', {
  content_name: offer.title,
  content_ids: [offer.id],
  content_type: 'product',
  value: minPrice(offer) || undefined,
  currency: 'DZD',
});

const ROOM_ORDER = ['quint', 'quad', 'triple', 'double'];

export default function Offers({ onChoose }) {
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    if (!poster) return;
    const onKey = (e) => e.key === 'Escape' && setPoster(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [poster]);

  return (
    <section className="section offers" id="offers">
      <div className="container">
        <header className="section-head reveal">
          <span className="eyebrow">العروض المتوفرة</span>
          <h2>اختر العرض الذي يناسبك</h2>
          <p>جميع الأسعار بالدينار الجزائري للشخص الواحد، حسب نوع الغرفة.</p>
        </header>

        {announcements.map((a) => (
          <button className="announce reveal" key={a.id} onClick={() => setPoster(a)}>
            <img src={a.poster} alt="" loading="lazy" />
            <span>
              <b>{a.title}</b>
              <small>{a.text}</small>
            </span>
            <em>عرض الإعلان</em>
          </button>
        ))}

        <div className="offers-grid">
          {offers.map((offer, i) => {
            const from = minPrice(offer);
            return (
              <article className={`offer-card reveal ${offer.featured ? 'featured' : ''}`} style={{ '--i': i }} key={offer.id}>
                {offer.poster ? (
                  <button className="offer-media" onClick={() => { setPoster(offer); viewOffer(offer); }} aria-label={`عرض ملصق ${offer.title}`}>
                    <img src={offer.poster} alt={offer.title} loading="lazy" />
                    <span className="offer-badge">{offer.badge}</span>
                    <span className="offer-zoom">عرض الملصق</span>
                  </button>
                ) : (
                  <div className="offer-media offer-media-placeholder">
                    <img src="./images/kaaba-wide.jpg" alt="" aria-hidden="true" loading="lazy" />
                    <span className="offer-badge">{offer.badge}</span>
                    <strong className="offer-media-title">{offer.title}</strong>
                  </div>
                )}

                <div className="offer-body">
                  <h3>{offer.title}</h3>
                  <p className="offer-sub">{offer.subtitle}</p>

                  <p className="offer-dates"><Calendar width="18" height="18" /> الانطلاق: {offer.departures.join(' • ')}</p>

                  {offer.hotels.filter((h) => Object.keys(h.rooms).length).map((h) => (
                    <div className="price-table" key={h.id}>
                      <div className="price-table-head">
                        <span>{h.name}</span>
                        {h.stars && <span className="stars">{Array.from({ length: h.stars }, (_, i) => <Star key={i} width="12" height="12" />)}</span>}
                      </div>
                      <div className="price-rows">
                        {ROOM_ORDER.filter((r) => h.rooms[r]).map((r) => (
                          <div className="price-cell" key={r}>
                            <small>{ROOM_LABELS[r]}</small>
                            <b>{formatDZD(h.rooms[r])}</b>
                          </div>
                        ))}
                      </div>
                      {h.meals && <p className="meals-note">{h.meals.map((m) => `${m.label}: ${formatDZD(m.price)}`).join(' • ')} (اختياري)</p>}
                    </div>
                  ))}

                  <ul className="offer-highlights">
                    {offer.highlights.map((t) => <li key={t}><Check width="16" height="16" />{t}</li>)}
                  </ul>

                  <div className="offer-foot">
                    <div className="offer-from">
                      <small>ابتداءً من</small>
                      <strong>{formatDZD(from)}</strong>
                    </div>
                    <button className="btn btn-blue" onClick={() => { viewOffer(offer); onChoose(offer.id); }}>احجز هذا العرض</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="kids-prices reveal">
          <h3>أسعار الأطفال</h3>
          <div className="kids-grid">
            <div><small>من 0 إلى 2 سنة (بدون سرير)</small><b>80.000 دج</b></div>
            <div><small>من 2 إلى 12 سنة (بدون سرير)</small><b>150.000 دج</b></div>
            <div><small>الطفل مع سرير</small><b>سعر الغرفة</b></div>
          </div>
          <p>تُطبق على عرض عمرة شعبان. الطفل مع سرير يُحتسب سريراً في الغرفة (مثال: غرفة ثنائية + طفل مع سرير = غرفة ثلاثية). لباقي العروض يرجى الاستفسار.</p>
        </div>
      </div>

      {poster && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={poster.title} onClick={() => setPoster(null)}>
          <button className="lightbox-close" aria-label="إغلاق"><Close /></button>
          <img src={poster.poster} alt={poster.title} onClick={(e) => e.stopPropagation()} />
          {offers.some((o) => o.id === poster.id) ? (
            <button className="btn btn-yellow lightbox-cta" onClick={(e) => { e.stopPropagation(); setPoster(null); onChoose(poster.id); }}>
              احجز هذا العرض
            </button>
          ) : (
            <a className="btn btn-yellow lightbox-cta" href="#offers" onClick={(e) => { e.stopPropagation(); setPoster(null); }}>
              اكتشف الرحلات الجديدة
            </a>
          )}
        </div>
      )}
    </section>
  );
}
