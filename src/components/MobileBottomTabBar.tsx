import React, { useState, useEffect } from 'react';
import { Wrench, Calendar, Percent, Phone, Bot } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

export default function MobileBottomTabBar({ currentCity }: { currentCity?: any }) {
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState<string>('services');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const servicesEl = document.getElementById('services');
      const offersEl = document.getElementById('offers');
      const bookingEl = document.getElementById('booking');
      const appsEl = document.getElementById('apps');

      if (appsEl && scrollPos >= appsEl.offsetTop) {
        setActiveTab('apps');
      } else if (bookingEl && scrollPos >= bookingEl.offsetTop) {
        setActiveTab('booking');
      } else if (offersEl && scrollPos >= offersEl.offsetTop) {
        setActiveTab('offers');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveTab('services');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (hash: string, tabKey: string) => {
    setActiveTab(tabKey);
    const el = document.querySelector(hash);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100/90 px-3 py-2 shadow-lg shadow-black/5">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Tab 1: Services */}
        <button
          type="button"
          onClick={() => scrollTo('#services', 'services')}
          className="flex-1 flex flex-col items-center justify-center py-1 focus:outline-none"
        >
          <Wrench
            className={`w-5 h-5 transition-colors ${
              activeTab === 'services'
                ? 'text-pragmatika-green stroke-[2.2]'
                : 'text-pragmatika-light stroke-[1.8]'
            }`}
          />
          <span
            className={`text-[10px] mt-1 font-medium leading-none ${
              activeTab === 'services'
                ? 'text-pragmatika-green font-bold'
                : 'text-pragmatika-light'
            }`}
          >
            Услуги
          </span>
        </button>

        {/* Tab 2: Offers */}
        <button
          type="button"
          onClick={() => scrollTo('#offers', 'offers')}
          className="flex-1 flex flex-col items-center justify-center py-1 focus:outline-none"
        >
          <Percent
            className={`w-5 h-5 transition-colors ${
              activeTab === 'offers'
                ? 'text-pragmatika-green stroke-[2.2]'
                : 'text-pragmatika-light stroke-[1.8]'
            }`}
          />
          <span
            className={`text-[10px] mt-1 font-medium leading-none ${
              activeTab === 'offers'
                ? 'text-pragmatika-green font-bold'
                : 'text-pragmatika-light'
            }`}
          >
            Акции
          </span>
        </button>

        {/* Tab 3: Fast Booking Modal (Center CTA) */}
        <button
          type="button"
          onClick={() => openModal('Быстрая запись на сервис')}
          className="flex-1 flex flex-col items-center justify-center py-1 focus:outline-none -mt-4"
        >
          <div className="w-11 h-11 rounded-full bg-pragmatika-green hover:brightness-105 shadow-md shadow-pragmatika-green/30 flex items-center justify-center text-white transition-transform active:scale-95">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-1 font-bold text-pragmatika-dark leading-none">
            Запись
          </span>
        </button>

        {/* Tab 4: Telegram/MAX Mini Apps */}
        <button
          type="button"
          onClick={() => scrollTo('#apps', 'apps')}
          className="flex-1 flex flex-col items-center justify-center py-1 focus:outline-none"
        >
          <Bot
            className={`w-5 h-5 transition-colors ${
              activeTab === 'apps'
                ? 'text-pragmatika-green stroke-[2.2]'
                : 'text-pragmatika-light stroke-[1.8]'
            }`}
          />
          <span
            className={`text-[10px] mt-1 font-medium leading-none ${
              activeTab === 'apps'
                ? 'text-pragmatika-green font-bold'
                : 'text-pragmatika-light'
            }`}
          >
            Mini Apps
          </span>
        </button>

        {/* Tab 5: Phone Call */}
        <a
          href="tel:88005511967"
          className="flex-1 flex flex-col items-center justify-center py-1 focus:outline-none"
        >
          <Phone className="w-5 h-5 text-pragmatika-light stroke-[1.8] hover:text-pragmatika-green transition-colors" />
          <span className="text-[10px] mt-1 font-medium text-pragmatika-light leading-none">
            Звонок
          </span>
        </a>
      </div>
    </div>
  );
}
