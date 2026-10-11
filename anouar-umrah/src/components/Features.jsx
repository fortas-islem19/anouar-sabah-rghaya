import { Plane, Hotel, Bus, Food, Shield, Coins } from './Icons.jsx';

const items = [
  { icon: Plane, title: 'تذاكر الطيران', text: 'الخطوط السعودية' },
  { icon: Hotel, title: 'فنادق مميزة', text: 'في مكة والمدينة' },
  { icon: Bus, title: 'تنقلات مريحة', text: 'بين المدينتين والمشاعر' },
  { icon: Food, title: 'إطعام متكامل', text: 'في مكة والمدينة' },
  { icon: Shield, title: 'تأمين السفر', text: 'راحة بالك' },
  { icon: Coins, title: 'الدفع بالتقسيط', text: 'أسعار تنافسية جداً' },
];

export default function Features() {
  return (
    <section className="features">
      <div className="container features-grid">
        {items.map(({ icon: Icon, title, text }) => (
          <div className="feature" key={title}>
            <span className="feature-icon"><Icon /></span>
            <div>
              <strong>{title}</strong>
              <small>{text}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
