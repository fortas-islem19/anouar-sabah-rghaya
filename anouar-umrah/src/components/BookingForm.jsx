import { useEffect, useMemo, useState } from 'react';
import { agency } from '../data/agency.js';
import { offers, ROOM_LABELS, ROOM_CAPACITY, CHILD_PRICES, formatDZD } from '../data/offers.js';
import { Check, WhatsApp } from './Icons.jsx';

const ROOM_ORDER = ['quint', 'quad', 'triple', 'double', 'single'];

const WILAYAS = [
  'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية', 'بسكرة', 'بشار', 'البليدة', 'البويرة',
  'تمنراست', 'تبسة', 'تلمسان', 'تيارت', 'تيزي وزو', 'الجزائر', 'الجلفة', 'جيجل', 'سطيف', 'سعيدة',
  'سكيكدة', 'سيدي بلعباس', 'عنابة', 'قالمة', 'قسنطينة', 'المدية', 'مستغانم', 'المسيلة', 'معسكر', 'ورقلة',
  'وهران', 'البيض', 'إليزي', 'برج بوعريريج', 'بومرداس', 'الطارف', 'تندوف', 'تيسمسيلت', 'الوادي', 'خنشلة',
  'سوق أهراس', 'تيبازة', 'ميلة', 'عين الدفلى', 'النعامة', 'عين تموشنت', 'غرداية', 'غليزان', 'تيميمون',
  'برج باجي مختار', 'أولاد جلال', 'بني عباس', 'عين صالح', 'عين قزام', 'تقرت', 'جانت', 'المغير', 'المنيعة',
];

const initial = {
  offerId: '',
  hotelId: '',
  room: '',
  departure: '',
  fullName: '',
  phone: '',
  whatsappSame: true,
  whatsapp: '',
  wilaya: 'الجزائر',
  commune: '',
  adults: 1,
  baby: 0,
  kid: 0,
  withBed: 0,
  meals: false,
  passport: 'yes',
  firstUmrah: 'yes',
  payment: 'cash',
  contactTime: 'any',
  notes: '',
  consent: false,
};

const phoneOk = (v) => /^0[567]\d{8}$/.test(v.replace(/\s|-/g, ''));

export default function BookingForm({ selectedOfferId, onOfferChange }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [ref, setRef] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // مزامنة العرض المختار من بطاقات العروض
  useEffect(() => {
    if (selectedOfferId && selectedOfferId !== form.offerId) {
      setForm((f) => ({ ...f, offerId: selectedOfferId, hotelId: '', room: '', departure: '', meals: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOfferId]);

  const offer = offers.find((o) => o.id === form.offerId);
  const hotel = offer?.hotels.find((h) => h.id === form.hotelId) || (offer?.hotels.length === 1 ? offer.hotels[0] : null);
  const roomPrice = hotel?.rooms?.[form.room] ?? null;
  const availableRooms = hotel ? ROOM_ORDER.filter((r) => hotel.rooms[r]) : [];

  // اختيار تلقائي للفندق إن وُجد فندق واحد فقط
  useEffect(() => {
    if (offer && offer.hotels.length === 1 && form.hotelId !== offer.hotels[0].id) set('hotelId', offer.hotels[0].id);
    if (offer && offer.departures.length === 1 && !form.departure) set('departure', offer.departures[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.offerId]);

  const estimate = useMemo(() => {
    if (!roomPrice) return null;
    const adults = Number(form.adults) || 0;
    const lines = [{ label: `${adults} × بالغ (غرفة ${ROOM_LABELS[form.room]})`, value: adults * roomPrice }];
    if (offer?.childrenPricing) {
      CHILD_PRICES.forEach((c) => {
        const n = Number(form[c.id]) || 0;
        if (!n) return;
        const unit = c.discount ? roomPrice - c.discount : c.price;
        lines.push({ label: `${n} × ${c.label}`, value: n * unit });
      });
    }
    if (form.meals && hotel?.meals) {
      const people = adults + (Number(form.kid) || 0) + (Number(form.withBed) || 0);
      lines.push({ label: `الإطعام في مكة × ${people}`, value: people * hotel.meals });
    }
    return { lines, total: lines.reduce((s, l) => s + l.value, 0) };
  }, [roomPrice, form, offer, hotel]);

  const totalTravelers = (Number(form.adults) || 0) + (Number(form.baby) || 0) + (Number(form.kid) || 0) + (Number(form.withBed) || 0);
  const roomCapacityHint = form.room ? ROOM_CAPACITY[form.room] : null;

  const validate = () => {
    const e = {};
    if (!form.offerId) e.offerId = 'اختر العرض';
    if (offer && offer.hotels.length > 1 && !form.hotelId) e.hotelId = 'اختر الفندق';
    if (availableRooms.length && !form.room) e.room = 'اختر نوع الغرفة';
    if (!form.fullName.trim() || form.fullName.trim().split(/\s+/).length < 2) e.fullName = 'أدخل الاسم واللقب';
    if (!phoneOk(form.phone)) e.phone = 'رقم هاتف غير صحيح (مثال: 0770707501)';
    if (!form.whatsappSame && !phoneOk(form.whatsapp)) e.whatsapp = 'رقم واتساب غير صحيح';
    if (!form.commune.trim()) e.commune = 'أدخل البلدية';
    if ((Number(form.adults) || 0) < 1) e.adults = 'معتمر واحد على الأقل';
    if (!form.consent) e.consent = 'يرجى الموافقة للمتابعة';
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.querySelector(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
    }
    return !Object.keys(e).length;
  };

  const buildMessage = (reference) => {
    const L = [];
    L.push(`*طلب حجز عمرة – ${agency.branch}*`);
    L.push(`رقم الطلب: ${reference}`);
    L.push('');
    L.push(`العرض: ${offer?.title}`);
    if (hotel && hotel.id !== 'tbd') L.push(`الفندق: ${hotel.name}`);
    if (form.room) L.push(`الغرفة: ${ROOM_LABELS[form.room]} (${formatDZD(roomPrice)} للشخص)`);
    if (form.departure) L.push(`تاريخ الانطلاق: ${form.departure}`);
    L.push('');
    L.push(`الاسم: ${form.fullName}`);
    L.push(`الهاتف: ${form.phone}`);
    if (!form.whatsappSame) L.push(`واتساب: ${form.whatsapp}`);
    L.push(`الولاية/البلدية: ${form.wilaya} – ${form.commune}`);
    L.push('');
    L.push(`عدد البالغين: ${form.adults}`);
    if (offer?.childrenPricing) {
      if (+form.baby) L.push(`أطفال 0-2 سنة: ${form.baby}`);
      if (+form.kid) L.push(`أطفال 2-12 سنة بدون سرير: ${form.kid}`);
      if (+form.withBed) L.push(`أطفال مع سرير: ${form.withBed}`);
    }
    if (hotel?.meals) L.push(`الإطعام: ${form.meals ? 'نعم' : 'لا'}`);
    L.push(`جواز سفر ساري: ${form.passport === 'yes' ? 'نعم' : form.passport === 'expiring' ? 'ينتهي قريباً' : 'لا'}`);
    L.push(`أول عمرة: ${form.firstUmrah === 'yes' ? 'نعم' : 'لا'}`);
    L.push(`طريقة الدفع: ${form.payment === 'cash' ? 'دفعة واحدة' : 'بالتقسيط'}`);
    L.push(`وقت الاتصال المفضل: ${{ any: 'أي وقت', morning: 'صباحاً', evening: 'مساءً' }[form.contactTime]}`);
    if (estimate) L.push(`المبلغ التقديري: ${formatDZD(estimate.total)}`);
    if (form.notes.trim()) { L.push(''); L.push(`ملاحظات: ${form.notes.trim()}`); }
    return L.join('\n');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    const reference = `AS-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setRef(reference);

    if (agency.bookingEndpoint) {
      try {
        await fetch(agency.bookingEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference, ...form, offerTitle: offer?.title, hotelName: hotel?.name, roomPrice, estimate: estimate?.total ?? null, createdAt: new Date().toISOString() }),
        });
      } catch {
        /* نكمل عبر واتساب حتى لو فشل الإرسال */
      }
    }

    const url = `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(buildMessage(reference))}`;
    window.open(url, '_blank', 'noopener');
    setStatus('done');
  };

  const reset = () => {
    setForm(initial);
    onOfferChange('');
    setErrors({});
    setStatus('idle');
  };

  const Err = ({ k }) => (errors[k] ? <span className="field-error">{errors[k]}</span> : null);

  if (status === 'done') {
    return (
      <section className="section booking" id="booking">
        <div className="container">
          <div className="booking-done reveal">
            <span className="done-icon"><Check width="40" height="40" /></span>
            <h2>تم تسجيل طلبك بنجاح</h2>
            <p>رقم طلبك: <b>{ref}</b></p>
            <p>تم فتح واتساب لإرسال تفاصيل الحجز إلى الوكالة. إذا لم يُفتح تلقائياً، اضغط على الزر أدناه. سيتصل بك فريق {agency.branch} لتأكيد الحجز.</p>
            <div className="done-actions">
              <a className="btn btn-whatsapp" href={`https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(buildMessage(ref))}`} target="_blank" rel="noopener noreferrer">
                <WhatsApp width="20" height="20" /> إرسال عبر واتساب
              </a>
              <button className="btn btn-ghost-dark" onClick={reset}>حجز جديد</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section booking" id="booking">
      <div className="container booking-grid">
        <aside className="booking-side reveal">
          <span className="eyebrow">استمارة الحجز</span>
          <h2>احجز عمرتك الآن</h2>
          <p>املأ الاستمارة وسيتواصل معك فريق أنوار الصباح – {agency.branch} لتأكيد الحجز وشرح الوثائق المطلوبة.</p>

          <div className="summary-card">
            <h3>ملخص الحجز</h3>
            {offer ? (
              <>
                <p className="sum-offer">{offer.title}</p>
                {hotel && hotel.id !== 'tbd' && <p className="sum-line">{hotel.name}</p>}
                {form.room && <p className="sum-line">غرفة {ROOM_LABELS[form.room]} — {formatDZD(roomPrice)} / للشخص</p>}
                {form.departure && <p className="sum-line">الانطلاق: {form.departure}</p>}
                <p className="sum-line">عدد المسافرين: {totalTravelers}</p>
                {estimate ? (
                  <div className="sum-estimate">
                    {estimate.lines.map((l) => (
                      <div key={l.label}><span>{l.label}</span><b>{formatDZD(l.value)}</b></div>
                    ))}
                    <div className="sum-total"><span>المبلغ التقديري</span><b>{formatDZD(estimate.total)}</b></div>
                    <small>المبلغ تقديري ويُؤكَّد من طرف الوكالة.</small>
                  </div>
                ) : (
                  <small className="muted">{hotel?.id === 'tbd' ? 'سيتم إعلامك بالسعر عند الاتصال.' : 'اختر نوع الغرفة لحساب المبلغ.'}</small>
                )}
              </>
            ) : (
              <small className="muted">اختر عرضاً لعرض الملخص.</small>
            )}
          </div>

          <ul className="docs-list">
            <li>جواز سفر ساري المفعول (6 أشهر على الأقل)</li>
            <li>صورة شمسية بخلفية بيضاء</li>
            <li>نسخة من بطاقة التعريف</li>
          </ul>
        </aside>

        <form className="booking-form reveal" style={{ '--i': 1 }} onSubmit={submit} noValidate>
          <fieldset>
            <legend><span>1</span> اختيار العرض</legend>

            <div className="offer-picker" role="radiogroup" aria-label="العروض">
              {offers.map((o) => (
                <label key={o.id} className={`offer-option ${form.offerId === o.id ? 'checked' : ''}`}>
                  <input
                    type="radio"
                    name="offerId"
                    value={o.id}
                    checked={form.offerId === o.id}
                    onChange={() => { setForm((f) => ({ ...f, offerId: o.id, hotelId: '', room: '', departure: '', meals: false })); onOfferChange(o.id); }}
                  />
                  <span className="opt-badge">{o.badge}</span>
                  <strong>{o.title}</strong>
                  <small>{o.subtitle}</small>
                </label>
              ))}
            </div>
            <Err k="offerId" />

            {offer && offer.hotels.length > 1 && (
              <div className="field">
                <label>الفندق</label>
                <div className="chips">
                  {offer.hotels.map((h) => (
                    <label key={h.id} className={`chip ${form.hotelId === h.id ? 'checked' : ''}`}>
                      <input type="radio" name="hotelId" checked={form.hotelId === h.id} onChange={() => setForm((f) => ({ ...f, hotelId: h.id, room: '' }))} />
                      {h.name}
                    </label>
                  ))}
                </div>
                <Err k="hotelId" />
              </div>
            )}

            {availableRooms.length > 0 && (
              <div className="field">
                <label>نوع الغرفة</label>
                <div className="room-grid">
                  {availableRooms.map((r) => (
                    <label key={r} className={`room-option ${form.room === r ? 'checked' : ''}`}>
                      <input type="radio" name="room" checked={form.room === r} onChange={() => set('room', r)} />
                      <span className="room-people" aria-hidden="true">{'●'.repeat(ROOM_CAPACITY[r])}</span>
                      <strong>{ROOM_LABELS[r]}</strong>
                      <b>{formatDZD(hotel.rooms[r])}</b>
                    </label>
                  ))}
                </div>
                <Err k="room" />
              </div>
            )}

            {offer && (
              <div className="field">
                <label htmlFor="departure">تاريخ الانطلاق</label>
                <select id="departure" name="departure" value={form.departure} onChange={(e) => set('departure', e.target.value)}>
                  <option value="">— اختر —</option>
                  {offer.departures.map((d) => <option key={d} value={d}>{d}</option>)}
                  <option value="أريد الاستفسار عن التواريخ">أريد الاستفسار عن التواريخ</option>
                </select>
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend><span>2</span> معلومات المعتمر</legend>
            <div className="row-2">
              <div className="field">
                <label htmlFor="fullName">الاسم واللقب *</label>
                <input id="fullName" name="fullName" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="كما هو في جواز السفر" autoComplete="name" />
                <Err k="fullName" />
              </div>
              <div className="field">
                <label htmlFor="phone">رقم الهاتف *</label>
                <input id="phone" name="phone" type="tel" inputMode="tel" dir="ltr" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="07 XX XX XX XX" autoComplete="tel" />
                <Err k="phone" />
              </div>
            </div>

            <label className="check">
              <input type="checkbox" checked={form.whatsappSame} onChange={(e) => set('whatsappSame', e.target.checked)} />
              نفس الرقم على واتساب
            </label>
            {!form.whatsappSame && (
              <div className="field">
                <label htmlFor="whatsapp">رقم واتساب</label>
                <input id="whatsapp" name="whatsapp" type="tel" dir="ltr" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="07 XX XX XX XX" />
                <Err k="whatsapp" />
              </div>
            )}

            <div className="row-2">
              <div className="field">
                <label htmlFor="wilaya">الولاية</label>
                <select id="wilaya" name="wilaya" value={form.wilaya} onChange={(e) => set('wilaya', e.target.value)}>
                  {WILAYAS.map((w, i) => <option key={w} value={w}>{String(i + 1).padStart(2, '0')} – {w}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="commune">البلدية *</label>
                <input id="commune" name="commune" value={form.commune} onChange={(e) => set('commune', e.target.value)} placeholder="مثال: الرغاية" />
                <Err k="commune" />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend><span>3</span> المسافرون والخيارات</legend>
            <div className="counters">
              <Counter label="البالغون" name="adults" min={1} value={form.adults} onChange={(v) => set('adults', v)} />
              {offer?.childrenPricing && (
                <>
                  <Counter label="أطفال 0–2 سنة" hint="80.000 دج" name="baby" value={form.baby} onChange={(v) => set('baby', v)} />
                  <Counter label="أطفال 2–12 سنة" hint="بدون سرير • 150.000 دج" name="kid" value={form.kid} onChange={(v) => set('kid', v)} />
                  <Counter label="طفل مع سرير" hint="خصم 15.000 دج" name="withBed" value={form.withBed} onChange={(v) => set('withBed', v)} />
                </>
              )}
            </div>
            <Err k="adults" />
            {roomCapacityHint && totalTravelers > 1 && totalTravelers < roomCapacityHint && (
              <p className="hint">الغرفة {ROOM_LABELS[form.room]} تتسع لـ {roomCapacityHint} أشخاص، وقد تُشارك مع معتمرين آخرين من نفس الجنس.</p>
            )}

            {hotel?.meals && (
              <label className="check boxed">
                <input type="checkbox" checked={form.meals} onChange={(e) => set('meals', e.target.checked)} />
                <span>أريد الإطعام في مكة <b>(+{formatDZD(hotel.meals)} للشخص)</b></span>
              </label>
            )}

            <div className="row-3">
              <RadioGroup label="جواز السفر" name="passport" value={form.passport} onChange={(v) => set('passport', v)}
                options={[['yes', 'ساري المفعول'], ['expiring', 'ينتهي قريباً'], ['no', 'لا أملك']]} />
              <RadioGroup label="أول عمرة؟" name="firstUmrah" value={form.firstUmrah} onChange={(v) => set('firstUmrah', v)}
                options={[['yes', 'نعم'], ['no', 'لا']]} />
              <RadioGroup label="طريقة الدفع" name="payment" value={form.payment} onChange={(v) => set('payment', v)}
                options={[['cash', 'دفعة واحدة'], ['installments', 'بالتقسيط']]} />
            </div>

            <div className="row-2">
              <div className="field">
                <label htmlFor="contactTime">الوقت المفضل للاتصال</label>
                <select id="contactTime" value={form.contactTime} onChange={(e) => set('contactTime', e.target.value)}>
                  <option value="any">أي وقت</option>
                  <option value="morning">صباحاً</option>
                  <option value="evening">مساءً</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="notes">ملاحظات</label>
                <input id="notes" value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="مرافق، كرسي متحرك، طلب خاص..." />
              </div>
            </div>
          </fieldset>

          <label className="check consent">
            <input type="checkbox" name="consent" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} />
            أوافق على أن تتواصل معي الوكالة لتأكيد الحجز، وأعلم أن المبلغ المعروض تقديري.
          </label>
          <Err k="consent" />

          <button type="submit" className="btn btn-yellow btn-lg btn-block" disabled={status === 'sending'}>
            {status === 'sending' ? 'جارٍ الإرسال...' : 'تأكيد طلب الحجز'}
          </button>
          <p className="form-foot">أو اتصل مباشرة: {agency.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} dir="ltr">{p}</a>)}</p>
        </form>
      </div>
    </section>
  );
}

function Counter({ label, hint, name, value, onChange, min = 0, max = 10 }) {
  const v = Number(value) || 0;
  return (
    <div className="counter">
      <div>
        <strong>{label}</strong>
        {hint && <small>{hint}</small>}
      </div>
      <div className="counter-ctrl">
        <button type="button" onClick={() => onChange(Math.min(max, v + 1))} aria-label={`زيادة ${label}`}>+</button>
        <output name={name} aria-live="polite">{v}</output>
        <button type="button" onClick={() => onChange(Math.max(min, v - 1))} aria-label={`إنقاص ${label}`} disabled={v <= min}>−</button>
      </div>
    </div>
  );
}

function RadioGroup({ label, name, value, onChange, options }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="seg">
        {options.map(([val, text]) => (
          <label key={val} className={value === val ? 'checked' : ''}>
            <input type="radio" name={name} value={val} checked={value === val} onChange={() => onChange(val)} />
            {text}
          </label>
        ))}
      </div>
    </div>
  );
}
