import { useState, useCallback } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Offers from './components/Offers.jsx';
import Testimonials from './components/Testimonials.jsx';
import BookingForm from './components/BookingForm.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFab from './components/WhatsAppFab.jsx';
import useReveal from './hooks/useReveal.js';

export default function App() {
  const [selectedOfferId, setSelectedOfferId] = useState('');
  useReveal();

  const chooseOffer = useCallback((id) => {
    setSelectedOfferId(id);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Offers onChoose={chooseOffer} />
        <Testimonials />
        <BookingForm selectedOfferId={selectedOfferId} onOfferChange={setSelectedOfferId} />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
