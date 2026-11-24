import { agency } from '../data/agency.js';

// وصل طلب الحجز — يُعرض في صفحة الشكر ويُحمَّل PDF عبر الطباعة («حفظ كـ PDF»)
export default function Receipt({ receipt }) {
  if (!receipt) return null;
  return (
    <article className="receipt" dir="rtl">
      <header className="receipt-head">
        <img src="./images/logo.png" alt="" />
        <div>
          <strong>{agency.name}</strong>
          <small>{agency.branch} — {agency.address}</small>
          <small dir="ltr">{agency.phones.join(' / ')}</small>
        </div>
      </header>

      <div className="receipt-title">
        <h2>وصل طلب حجز عمرة</h2>
        <div>
          <span>رقم الطلب: <b dir="ltr">{receipt.reference}</b></span>
          <span>التاريخ: <b dir="ltr">{receipt.date}</b></span>
        </div>
      </div>

      {receipt.sections.map((sec) => (
        <section className="receipt-sec" key={sec.title}>
          <h3>{sec.title}</h3>
          <dl>
            {sec.rows.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </section>
      ))}

      {receipt.lines.length > 0 && (
        <section className="receipt-sec">
          <h3>المبلغ التقديري</h3>
          <table>
            <tbody>
              {receipt.lines.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}
            </tbody>
            <tfoot>
              <tr><td>المجموع التقديري</td><td>{receipt.total}</td></tr>
            </tfoot>
          </table>
        </section>
      )}

      <footer className="receipt-foot">
        هذا الوصل إثبات لاستلام طلب الحجز وليس تأكيداً نهائياً له. المبلغ تقديري ويُؤكَّد من طرف الوكالة عند الاتصال.
        <br />الوثائق المطلوبة: جواز سفر ساري المفعول (6 أشهر على الأقل)، صورة شمسية بخلفية بيضاء، نسخة من بطاقة التعريف.
      </footer>
    </article>
  );
}
