import { useEffect } from 'react';

// إظهار العناصر التي تحمل الصنف .reveal بحركة عند دخولها مجال الرؤية
export default function useReveal() {
  useEffect(() => {
    const show = (el) => el.classList.add('is-visible');

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(show);
      return undefined;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    const watch = (root) => {
      if (root.nodeType !== 1) return;
      if (root.matches('.reveal:not(.is-visible)')) io.observe(root);
      root.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
    };
    watch(document.body);

    // مراقبة العناصر التي تُضاف لاحقاً (تبديل التبويبات، استمارة الحجز...)
    const mo = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach(watch)));
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}
