import { agency } from '../data/agency.js';
import { WhatsApp } from './Icons.jsx';

export default function WhatsAppFab() {
  const msg = encodeURIComponent('السلام عليكم، أريد الاستفسار عن عروض العمرة.');
  return (
    <a className="wa-fab" href={`https://wa.me/${agency.whatsapp}?text=${msg}`} target="_blank" rel="noopener noreferrer" aria-label="تواصل عبر واتساب">
      <WhatsApp width="28" height="28" />
    </a>
  );
}
