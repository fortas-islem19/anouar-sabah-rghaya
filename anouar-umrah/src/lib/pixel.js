// بيكسل ميتا (فيسبوك) — رقم البيكسل في src/data/agency.js (metaPixelId)
import { agency } from '../data/agency.js';

const PIXEL_ID = agency.metaPixelId;

export function initPixel() {
  if (!PIXEL_ID || window.fbq) return;
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');

  // نقرات واتساب والهاتف في أي مكان من الصفحة = Contact
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href.startsWith('tel:')) track('Contact', { content_name: 'phone' });
    else if (href.includes('wa.me/')) track('Contact', { content_name: 'whatsapp' });
  }, true);
}

// eventId يُستعمل لمطابقة الحدث مع نفس الحدث المرسل من الخادم (Conversions API)
export function track(event, params = {}, eventId) {
  if (!window.fbq) return;
  window.fbq('track', event, params, eventId ? { eventID: eventId } : undefined);
}

const cookie = (name) => document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))?.split('=')[1] || '';

// معلومات المتصفح التي يحتاجها Conversions API لربط الحجز بالإعلان
export const browserIds = () => ({
  fbp: cookie('_fbp'),
  fbc: cookie('_fbc') || (new URLSearchParams(window.location.search).get('fbclid')
    ? `fb.1.${Date.now()}.${new URLSearchParams(window.location.search).get('fbclid')}` : ''),
  userAgent: navigator.userAgent,
  url: window.location.href.split('#')[0],
});
