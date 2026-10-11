import { agency } from '../data/agency.js';
import { Phone, Pin, Facebook, Instagram, TikTok, WhatsApp } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-top">
        <div className="footer-visit reveal">
          <img src="./images/agency-front.jpg" alt={`واجهة ${agency.name} – ${agency.branch}`} loading="lazy" />
          <div className="visit-card">
            <span className="eyebrow">زورونا</span>
            <h3>مقر الوكالة – {agency.branch}</h3>
            <p><Pin width="18" height="18" /> {agency.address}</p>
            <a className="btn btn-yellow btn-sm" href={agency.mapsUrl} target="_blank" rel="noopener noreferrer">الموقع على الخريطة</a>
          </div>
        </div>

        <div className="footer-cols reveal" style={{ '--i': 1 }}>
          <div>
            <h4>اتصلوا بنا</h4>
            <ul className="phones">
              {agency.phones.map((p) => (
                <li key={p}><a href={`tel:${p.replace(/\s/g, '')}`} dir="ltr"><Phone width="16" height="16" /> {p}</a></li>
              ))}
            </ul>
            <a className="btn btn-whatsapp btn-sm" href={`https://wa.me/${agency.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <WhatsApp width="18" height="18" /> راسلونا على واتساب
            </a>
          </div>
          <div>
            <h4>تابعونا</h4>
            <p className="muted-light">فايسبوك، انستغرام وتيك توك: <b>{agency.socialHandle}</b></p>
            <div className="socials">
              <a href={agency.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook /></a>
              <a href={agency.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
              <a href={agency.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTok /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <img src="./images/logo.png" alt="" width="36" height="36" />
          <span>{agency.motto}</span>
          <small>© {new Date().getFullYear()} {agency.name} – {agency.branch}</small>
        </div>
      </div>
    </footer>
  );
}
