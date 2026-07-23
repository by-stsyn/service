import { useModal } from "../contexts/ModalContext";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { MapPin, ChevronDown, Check, Menu, X as CloseIcon } from 'lucide-react';
import { CITIES_DATA } from '../data';

const NAV_LINKS = [
  { label: 'Главная', href: '#home', hideOnDesktop: false },
  { label: 'Услуги и цены', href: '#services', hideOnDesktop: false },
  { label: 'Акции', href: '#offers', hideOnDesktop: false },
  { label: 'Калькулятор ТО', href: '#calculator', hideOnDesktop: false },
  { label: 'О нас', href: '#about', hideOnDesktop: true },
  { label: 'Отзывы', href: '#reviews', hideOnDesktop: true },
  { label: 'Вопросы-Ответы', href: '#faq', hideOnDesktop: true },
  { label: 'Контакты', href: '#contacts', hideOnDesktop: false },
];

export default function Header({ currentCity }: { currentCity: any }) {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  return (
    <>
      {/* Top Level (scrolls away naturally) */}
      <div className="bg-white border-b border-slate-200 hidden md:block relative z-40">
        <div className="flex items-center justify-between px-4 sm:px-8 py-4 max-w-7xl mx-auto">
          {/* Логотип */}
          <div className="flex items-center gap-6">
            <div className="relative h-10 flex items-center"> 
               <img src="/logo.png" alt="Прагматика Сервис" className="h-full w-auto object-contain" onError={(e) => {
                 (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><rect width="120" height="40" fill="%23f1f5f9" rx="4"/><text x="60" y="24" font-family="sans-serif" font-size="12" font-weight="bold" fill="%2364748b" text-anchor="middle">LOGO PUBLIC</text></svg>';
               }} />
            </div>
            <div className="hidden lg:flex flex-col justify-center border-l border-slate-200 pl-6 py-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                Сервисное обслуживание
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                автомобилей любых марок
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            {/* Номер телефона */}
            <div className="flex flex-col items-end">
              <a 
                href="tel:88005511967" 
                className="ct-phone text-xl font-extrabold text-slate-900 hover:text-[#8cc63f] transition-colors tracking-tight"
              >
                8 800 551-19-67
              </a>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Единый номер телефона
              </span>
            </div>
            {/* Кнопка записи */}
            <button onClick={() => openModal()} className="bg-[#8cc63f] hover:bg-[#7db435] text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95">
              Записаться на сервис
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Level - Navigation (Sticky) */}
      <header className={`sticky top-0 z-50 flex-shrink-0 transition-all duration-300 ease-out ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-2 sm:py-1' : 'bg-white border-b border-slate-100 py-3 sm:py-0'}`}>
        <div className="flex items-center justify-between sm:justify-start px-4 sm:px-8 max-w-7xl mx-auto min-h-[48px] sm:min-h-[56px]">
          
          {/* Compact Logo (animates smoothly via CSS) */}
          <div className={`hidden lg:flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isScrolled ? 'max-w-[140px] opacity-100 mr-6' : 'max-w-0 opacity-0 mr-0'}`}>
             <img src="/logo.png" alt="Прагматика" className="h-6 object-contain min-w-[100px]" onError={(e) => {
               (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="24"><rect width="60" height="24" fill="%23f1f5f9" rx="4"/><text x="30" y="16" font-family="sans-serif" font-size="10" font-weight="bold" fill="%2364748b" text-anchor="middle">LOGO</text></svg>';
             }} />
          </div>

          <div className="lg:hidden flex flex-shrink-0 items-center">
             <img src="/logo.png" alt="Прагматика" className="h-6 object-contain w-[100px]" onError={(e) => {
               (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="24"><rect width="60" height="24" fill="%23f1f5f9" rx="4"/><text x="30" y="16" font-family="sans-serif" font-size="10" font-weight="bold" fill="%2364748b" text-anchor="middle">LOGO</text></svg>';
             }} />
          </div>

          {/* Custom City Selector (Desktop) */}
          <div className="hidden lg:flex relative items-center gap-1.5 sm:gap-2 pr-2 sm:pr-6 border-r border-slate-200 mr-2 sm:mr-6 flex-shrink-0">
            <MapPin className="w-4 h-4 text-[#8cc63f]" />
            
            <button 
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-1.5 text-sm text-slate-800 font-bold hover:text-[#8cc63f] transition-colors outline-none group"
              aria-label="Выбрать город"
              aria-expanded={isCityDropdownOpen}
            >
              <span className="truncate max-w-[140px]">{currentCity.name}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-[#8cc63f] transition-all duration-300 ${isCityDropdownOpen ? 'rotate-180 text-[#8cc63f]' : ''}`} />
            </button>

            <AnimatePresence>
              {isCityDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsCityDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-4 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                  >
                    <div className="p-1.5 bg-slate-50/50">
                      {CITIES_DATA.map(city => {
                        const isSelected = city.slug === currentCity.slug;
                        return (
                          <button
                            key={city.slug}
                            onClick={() => {
                              navigate(`/${city.slug}`);
                              setIsCityDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold transition-colors rounded-xl ${
                              isSelected 
                                ? 'bg-white text-[#8cc63f] shadow-sm border border-slate-100' 
                                : 'text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent'
                            }`}
                          >
                            {city.name}
                            {isSelected && <Check className="w-4 h-4 text-[#8cc63f]" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 overflow-x-auto hide-scrollbar flex-1 py-2 justify-center">
            {NAV_LINKS.filter(link => !link.hideOnDesktop).map(link => (
              <a 
                key={link.label}
                href={link.href} 
                className="text-xs xl:text-sm font-semibold text-slate-600 hover:text-[#8cc63f] transition-colors whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector(link.href);
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Compact Phone/Button (Desktop) */}
          <div className={`hidden lg:flex items-center justify-end overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isScrolled ? 'max-w-[300px] opacity-100 ml-4' : 'max-w-0 opacity-0 ml-0'}`}>
              <a 
                href="tel:88005511967" 
                className="ct-phone text-sm font-bold text-slate-900 hover:text-[#8cc63f] transition-colors tracking-tighter whitespace-nowrap mr-4"
              >
                8 800 551-19-67
              </a>
              <button onClick={() => openModal()} className="bg-[#8cc63f] hover:bg-[#7db435] text-white px-4 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm active:scale-95 whitespace-nowrap">
                Записаться
              </button>
          </div>
          
          {/* Mobile Right Icons (Burger & Button) */}
          <div className="flex lg:hidden items-center gap-3 ml-auto">
            <button 
              onClick={() => openModal()} 
              className="bg-[#8cc63f] text-white px-4 py-2 rounded-xl font-bold text-[11px] uppercase tracking-wide shadow-sm"
            >
              Запись
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Открыть меню"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Header inside mobile menu */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-900">
                  <MapPin className="w-4 h-4 text-[#8cc63f]" />
                  <span className="font-bold text-sm">Ваш город</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 rounded-xl"
                  aria-label="Закрыть меню"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile City Selector */}
              <div className="p-4 bg-slate-50/50 border-b border-slate-100">
                <div className="grid grid-cols-2 gap-2">
                  {CITIES_DATA.map(city => {
                    const isSelected = city.slug === currentCity.slug;
                    return (
                      <button
                        key={city.slug}
                        onClick={() => {
                          navigate(`/${city.slug}`);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                          isSelected 
                            ? 'bg-white text-[#8cc63f] border-[#8cc63f] shadow-sm' 
                            : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        {city.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col py-4 overflow-y-auto">
                {NAV_LINKS.map(link => (
                  <a 
                    key={link.label}
                    href={link.href} 
                    className="px-6 py-4 text-base font-semibold text-slate-700 hover:text-[#8cc63f] hover:bg-green-50 transition-colors border-b border-slate-50"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      const el = document.querySelector(link.href);
                      if (el) {
                        setTimeout(() => {
                          const y = el.getBoundingClientRect().top + window.scrollY - 80;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Bottom Fixed Area */}
              <div className="p-6 mt-auto bg-slate-50 border-t border-slate-200">
                <div className="flex flex-col gap-4">
                  <a 
                    href="tel:88005511967" 
                    className="ct-phone flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200"
                  >
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Звонок бесплатный</span>
                    <span className="text-xl font-extrabold text-slate-900">8 800 551-19-67</span>
                  </a>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setTimeout(() => openModal(), 100);
                    }} 
                    className="w-full bg-[#8cc63f] text-white py-4 rounded-xl font-bold uppercase tracking-wide shadow-md active:scale-95 transition-transform"
                  >
                    Оставить заявку
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
