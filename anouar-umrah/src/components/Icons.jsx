// أيقونات SVG خفيفة بدون مكتبات خارجية
const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const Plane = (p) => (<svg {...base} {...p}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></svg>);
export const Hotel = (p) => (<svg {...base} {...p}><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M16 9h2a2 2 0 0 1 2 2v10" /><path d="M2 21h20M8 7h2M8 11h2M8 15h2M12 7h0M12 11h0" /></svg>);
export const Bus = (p) => (<svg {...base} {...p}><rect x="4" y="3" width="16" height="15" rx="3" /><path d="M4 11h16M8 21v-3M16 21v-3" /><circle cx="8" cy="14.5" r=".8" fill="currentColor" /><circle cx="16" cy="14.5" r=".8" fill="currentColor" /></svg>);
export const Food = (p) => (<svg {...base} {...p}><path d="M7 2v8a2 2 0 0 0 2 2v10M11 2v8a2 2 0 0 1-2 2M9 2v6" /><path d="M17 22V2c-2.2 0-4 2.5-4 6v5h4" /></svg>);
export const Shield = (p) => (<svg {...base} {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>);
export const Coins = (p) => (<svg {...base} {...p}><ellipse cx="9" cy="6" rx="6" ry="3" /><path d="M3 6v4c0 1.7 2.7 3 6 3s6-1.3 6-3V6" /><path d="M3 10v4c0 1.7 2.7 3 6 3 1 0 2-.1 2.8-.4" /><ellipse cx="17" cy="15" rx="4" ry="2" /><path d="M13 15v3c0 1.1 1.8 2 4 2s4-.9 4-2v-3" /></svg>);
export const Calendar = (p) => (<svg {...base} {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></svg>);
export const Phone = (p) => (<svg {...base} {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>);
export const Pin = (p) => (<svg {...base} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>);
export const Play = (p) => (<svg {...base} {...p}><path d="M7 4v16l13-8z" fill="currentColor" stroke="none" /></svg>);
export const Pause = (p) => (<svg {...base} {...p}><rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" /><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" /></svg>);
export const Mic = (p) => (<svg {...base} {...p}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8" /></svg>);
export const Check = (p) => (<svg {...base} {...p}><path d="M20 6 9 17l-5-5" /></svg>);
export const Star = (p) => (<svg {...base} {...p}><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" fill="currentColor" stroke="none" /></svg>);
export const Close = (p) => (<svg {...base} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>);
export const Arrow = (p) => (<svg {...base} {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>);
export const Menu = (p) => (<svg {...base} {...p}><path d="M3 6h18M3 12h18M3 18h18" /></svg>);

export const WhatsApp = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.7 17.8L0 24l6.3-1.7a11.8 11.8 0 0 0 5.7 1.4A11.9 11.9 0 0 0 20.4 3.6z" />
  </svg>
);
export const Facebook = (p) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9H17l.5-4h-4V9c0-.6.4-1 1-1z" /></svg>);
export const Instagram = (p) => (<svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg>);
export const TikTok = (p) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.3v13.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V10.2a6 6 0 1 0 5.2 6V9.4a7.5 7.5 0 0 0 4.4 1.4V7.5a4.3 4.3 0 0 1-3.3-1.7z" /></svg>);
