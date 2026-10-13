import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Offers from './components/Offers.jsx';
import Testimonials from './components/Testimonials.jsx';
import Hotels from './components/Hotels.jsx';
import BookingForm from './components/BookingForm.jsx';
import ThankYou from './components/ThankYou.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFab from './components/WhatsAppFab.jsx';
import useReveal from './hooks/useReveal.js';

const THANKS_HASH = '#merci';

export default function App() {
  const [selectedOfferId, setSelectedOfferId] = useState('');
  const [booking, setBooking] = useState(null);
  useReveal();

  const chooseOffer = useCallback((id) => {
    setSelectedOfferId(id);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // صفحة الشكر بعد إرسال الحجز (رابط #merci)
  const showThanks = useCallback((data) => {
    setBooking(data);
    setSelectedOfferId('');
    window.history.pushState(null, '', THANKS_HASH);
    window.scrollTo(0, 0);
  }, []);

  const backHome = useCallback(() => {
    setBooking(null);
    window.history.pushState(null, '', window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // روابط القائمة (#offers...) تعيد الصفحة الرئيسية ثم تنتقل إلى القسم
    const onPop = () => {
      const { hash } = window.location;
      if (hash === THANKS_HASH) return;
      setBooking(null);
      requestAnimationFrame(() => { if (hash) document.querySelector(hash)?.scrollIntoView(); });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <>
      <Header />
      <main>
        {booking ? (
          <ThankYou booking={booking} onBack={backHome} />
        ) : (
          <>
            <Hero />
            <Features />
            <Offers onChoose={chooseOffer} />
            <Testimonials />
            <Hotels />
            <BookingForm selectedOfferId={selectedOfferId} onOfferChange={setSelectedOfferId} onSuccess={showThanks} />
          </>
        )}
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
