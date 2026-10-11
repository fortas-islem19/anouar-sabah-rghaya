import { agency } from '../data/agency.js';
import { formatDZD } from '../data/offers.js';
import { Check, Phone, WhatsApp } from './Icons.jsx';

export default function ThankYou({ booking, onBack }) {
  const rows = [
    ['العرض', booking.offer],
    ['الفندق', booking.hotel],
    ['الغرفة', booking.room],
    ['تاريخ الانطلاق', booking.departure],
    ['عدد المسافرين', booking.travelers],
    ['المبلغ التقديري', booking.total ? formatDZD(booking.total) : ''],
  ].filter(([, v]) => v);

  return (
    <section className="thanks">
      <div className="hero-bg" aria-hidden="true">
        <span className="sun sun-1" />
        <span className="sun sun-2" />
      </div>

      <div className="container">
        <div className="thanks-card">
          <span className="done-icon thanks-icon"><Check width="44" height="44" /></span>
          <h1>شكراً لك{booking.name ? ` ${booking.name.split(/\s+/)[0]}` : ''}!</h1>
          <p className="thanks-lead">تم استلام طلب حجزك بنجاح. سيتصل بك فريق {agency.name} – {agency.branch} قريباً لتأكيد الحجز وشرح الوثائق المطلوبة.</p>

          <div className="thanks-ref">
            <small>رقم طلبك</small>
            <b dir="ltr">{booking.reference}</b>
          </div>

          {rows.length > 0 && (
            <dl className="thanks-summary">
              {rows.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          )}

          <p className="thanks-note">احتفظ برقم الطلب، وجهّز جواز سفرك (ساري 6 أشهر على الأقل) وصورة شمسية بخلفية بيضاء.</p>

          <div className="done-actions">
            <button className="btn btn-yellow" onClick={onBack}>العودة إلى الصفحة الرئيسية</button>
            <a className="btn btn-ghost-dark" href={`tel:${agency.phones[0].replace(/\s/g, '')}`}>
              <Phone width="18" height="18" /> <span dir="ltr">{agency.phones[0]}</span>
            </a>
          </div>
          <a className="thanks-wa" href={`https://wa.me/${agency.whatsapp}`} target="_blank" rel="noopener noreferrer">
            <WhatsApp width="18" height="18" /> لديك سؤال؟ راسلنا على واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
