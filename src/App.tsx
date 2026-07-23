import { Routes, Route, Navigate, useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceCategories from './components/ServiceCategories';
import Services from './components/Services';
import SpecialOffers from './components/SpecialOffers';
import Calculator from './components/Calculator';
import BrandsMarquee from './components/BrandsMarquee';
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
  
  const cityName = currentCity.name;
  const pageTitle = `Автосервис Прагматика в г. ${cityName} | Ремонт и обслуживание автомобилей`;
  const pageDescription = `Мультисервис Прагматика. Профессиональный ремонт, ТО и диагностика автомобилей любых марок в г. ${cityName}. Доступные цены, гарантия на работы.`;
  const pageUrl = `https://pragmatika-service.ru/${currentCity.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": `Прагматика Мультисервис ${cityName}`,
    "image": "https://pragmatika-service.ru/logo.png",
    "url": pageUrl,
    "telephone": currentCity.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressCountry": "RU"
    },
    "priceRange": "₽₽",
    "description": pageDescription,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "21:00"
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://pragmatika-service.ru/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": cityName,
        "item": pageUrl
      }
    ]
  };

  return (
    <ModalProvider>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">
          {`[${JSON.stringify(jsonLd)},${JSON.stringify(breadcrumbSchema)}]`}
        </script>
      </Helmet>
      <Header currentCity={currentCity} />
      <main className="flex-grow flex flex-col">
        <Hero currentCity={currentCity} />
        <ServiceCategories />
        <Services currentCity={currentCity} />
        <SpecialOffers currentCity={currentCity} />
        <Calculator />
        <BrandsMarquee />
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
