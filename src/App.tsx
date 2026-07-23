import { Routes, Route, Navigate, useParams } from 'react-router';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import SpecialOffers from './components/SpecialOffers';
import Calculator from './components/Calculator';
import DiscountBlock from './components/DiscountBlock';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import About from './components/About';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { CITIES_DATA } from './data';
import { ModalProvider } from './contexts/ModalContext';

function MainContent() {
  const { citySlug } = useParams();
  const currentCity = CITIES_DATA.find(c => c.slug === citySlug) || CITIES_DATA[0];
  
  return (
    <ModalProvider>
      <Header currentCity={currentCity} />
      <main className="flex-grow flex flex-col">
        <Hero currentCity={currentCity} />
        <Services currentCity={currentCity} />
        <SpecialOffers currentCity={currentCity} />
        <Calculator />
        <DiscountBlock currentCity={currentCity} />
        <About />
        <Reviews />
        <FAQ />
        <Contacts currentCity={currentCity} />
      </main>
      <Footer />
      <BookingModal currentCity={currentCity} />
    </ModalProvider>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 overflow-clip">
      <Routes>
        <Route path="/" element={<Navigate to="/spb" replace />} />
        <Route path="/:citySlug" element={<MainContent />} />
      </Routes>
    </div>
  );
}
