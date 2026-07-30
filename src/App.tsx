import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceCategories from './components/ServiceCategories';
import { CITIES_DATA, ADDRESSES } from './data';
import { ModalProvider } from './contexts/ModalContext';
import { ToastProvider } from './contexts/ToastContext';

const Services = React.lazy(() => import('./components/Services'));
const SpecialOffers = React.lazy(() => import('./components/SpecialOffers'));
const BrandsMarquee = React.lazy(() => import('./components/BrandsMarquee'));
const DiscountBlock = React.lazy(() => import('./components/DiscountBlock'));
const Reviews = React.lazy(() => import('./components/Reviews'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const QuestionForm = React.lazy(() => import('./components/QuestionForm'));
const About = React.lazy(() => import('./components/About'));
const BeforeAfter = React.lazy(() => import('./components/BeforeAfter'));
const Contacts = React.lazy(() => import('./components/Contacts'));
const Footer = React.lazy(() => import('./components/Footer'));
const BookingModal = React.lazy(() => import('./components/BookingModal'));

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
    "telephone": ADDRESSES.find(a => a.city === cityName)?.phone || "8 800 551-19-67",
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
    <ToastProvider>
      <ModalProvider>
        <Helmet>
          <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content="https://pragmatika-service.ru/logo.png" />
        <script type="application/ld+json">
          {`[${JSON.stringify(jsonLd)},${JSON.stringify(breadcrumbSchema)}]`}
        </script>
      </Helmet>
      <Header currentCity={currentCity} />
      <main className="flex-grow flex flex-col">
        <Hero currentCity={currentCity} />
        <ServiceCategories />
        <Suspense fallback={<div className="h-20 w-full flex items-center justify-center">Загрузка...</div>}>
          <Services currentCity={currentCity} />
          <SpecialOffers currentCity={currentCity} />
          <BrandsMarquee />
          <DiscountBlock currentCity={currentCity} />
          <About />
          <BeforeAfter />
          <Reviews />
          <FAQ />
          <QuestionForm currentCity={currentCity} />
          <Contacts currentCity={currentCity} />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer currentCity={currentCity} />
        <BookingModal currentCity={currentCity} />
      </Suspense>
      </ModalProvider>
    </ToastProvider>
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
