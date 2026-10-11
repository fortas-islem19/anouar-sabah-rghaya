import { agency } from '../data/agency.js';
import { offers, minPrice, formatDZD } from '../data/offers.js';
import { Plane, Calendar, Coins } from './Icons.jsx';

const lowest = Math.min(...offers.map(minPrice).filter(Boolean));

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <span className="sun sun-1" />
        <span className="sun sun-2" />
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="slogan-brush">{agency.slogan}</p>

          <h1 className="hero-title">
            <span className="brush brush-blue">عروض العمرة</span>
            <span className="brush brush-yellow">أكتوبر / نوفمبر</span>
          </h1>

          <p className="hero-lead">
            رحلة إيمانية بأمان وراحة مع <strong>{agency.name}</strong> – {agency.branch}.
            برامج 7 أيام، 15 يوماً و19 يوماً (عمرتان في عمرة واحدة) مع رحلات مباشرة.
          </p>

          <div className="hero-durations">
            {['7 أيام', '15 يوماً', '19 يوماً'].map((d) => (
              <span key={d} className="duration-chip"><Calendar width="18" height="18" />{d}</span>
            ))}
          </div>

          <div className="hero-price">
            <span>ابتداءً من</span>
            <strong>{formatDZD(lowest)}</strong>
            <em>فقط</em>
          </div>

          <div className="hero-actions">
            <a href="#booking" className="btn btn-yellow btn-lg">سجّل الآن واحجز مقعدك</a>
            <a href="#offers" className="btn btn-ghost btn-lg">اكتشف العروض</a>
          </div>

          <ul className="hero-trust">
            <li><Plane width="20" height="20" /> الخطوط السعودية – رحلات مباشرة</li>
            <li><Coins width="20" height="20" /> إمكانية الدفع بالتقسيط</li>
          </ul>
        </div>

        <div className="hero-visual">
          <div className="hero-frame">
            <img src="./images/hero-kaaba.jpg" alt="الكعبة المشرفة والمسجد الحرام" />
          </div>
          <div className="hero-badge">
            <strong>19</strong>
            <span>يوماً<br />عمرتان في عمرة واحدة</span>
          </div>
          <img className="hero-logo-float" src="./images/logo.png" alt="" aria-hidden="true" />
        </div>
      </div>

      <svg className="hero-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40c240 50 480 50 720 20s480-50 720 0v30H0z" />
      </svg>
    </section>
  );
}
