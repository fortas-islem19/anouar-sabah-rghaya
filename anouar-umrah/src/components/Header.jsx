import { useEffect, useState } from 'react';
import { agency } from '../data/agency.js';
import { Menu, Close } from './Icons.jsx';

const links = [
  { href: '#offers', label: 'العروض' },
  { href: '#testimonials', label: 'آراء المعتمرين' },
  { href: '#hotels', label: 'فنادقنا' },
  { href: '#booking', label: 'الحجز' },
  { href: '#contact', label: 'اتصل بنا' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label={agency.name}>
          <img src="./images/logo.png" alt="" width="48" height="48" />
          <span className="brand-text">
            <strong>أنوار الصباح</strong>
            <small>للسياحة والأسفار • {agency.branch}</small>
          </span>
        </a>

        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="القائمة الرئيسية">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#booking" className="btn btn-yellow btn-sm nav-cta" onClick={() => setOpen(false)}>احجز الآن</a>
        </nav>

        <button className="menu-toggle" onClick={() => setOpen((o) => !o)} aria-label="القائمة" aria-expanded={open}>
          {open ? <Close /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
