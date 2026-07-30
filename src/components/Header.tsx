import { useModal } from "../contexts/ModalContext";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { MapPin, ChevronDown, Check, Menu, X as CloseIcon } from 'lucide-react';
import { CITIES_DATA } from '../data';

const MAIN_NAV_LINKS = [
  { label: 'Услуги и цены', href: '#services' },
  { label: 'Акции', href: '#offers' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Header({ currentCity }: { currentCity: any }) {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isStickyCityDropdownOpen, setIsStickyCityDropdownOpen] = useState(false);
  const [isBannerCityDropdownOpen, setIsBannerCityDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    
    setIsMobileMenuOpen(false);
    
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* DESKTOP MAIN BAR (Sticky) */}
      <header className={`hidden lg:block sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-white border-b border-slate-100 py-5'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#home" onClick={handleScroll} className="flex-shrink-0 group">
              <img 
                src="/logo.png" 
                alt="Прагматика Сервис" 
                className={`transition-all duration-300 object-contain origin-left ${isScrolled ? 'h-8' : 'h-10'}`} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><rect width="120" height="40" fill="%23f1f5f9" rx="4"/><text x="60" y="24" font-family="sans-serif" font-size="12" font-weight="bold" fill="%2364748b" text-anchor="middle">LOGO PUBLIC</text></svg>';
                }} 
              />
            </a>
            
            {/* Mini City Selector (Visible on scroll) */}
            <div className={`transition-all duration-300 overflow-visible flex items-center ${isScrolled ? 'max-w-[200px] opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0 pointer-events-none'}`}>
              <div className="relative">
                <button 
                  onClick={() => setIsStickyCityDropdownOpen(!isStickyCityDropdownOpen)} 
                  className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-bold transition-colors outline-none text-[11px] uppercase tracking-wider bg-slate-100/80 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#8cc63f]" />
                  <span className="truncate max-w-[140px] whitespace-nowrap">{currentCity.name}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isStickyCityDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isStickyCityDropdownOpen && isScrolled && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsStickyCityDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 p-1.5"
                      >
                        {CITIES_DATA.map(city => {
                          const isSelected = city.slug === currentCity.slug;
                          return (
                            <button
                              key={city.slug}
                              onClick={() => {
                                navigate(`/${city.slug}`);
                                setIsStickyCityDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold transition-colors rounded-lg outline-none ${
                                isSelected 
                                  ? 'bg-slate-50 text-[#8cc63f]' 
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                            >
                              {city.name}
                              {isSelected && <Check className="w-4 h-4 text-[#8cc63f]" />}
                            </button>
                          );
                        })}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          <nav className="flex items-center gap-8 lg:gap-10 xl:gap-12 ml-auto lg:mx-auto">
            {MAIN_NAV_LINKS.map(link => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={handleScroll} 
                className="text-[13px] font-bold text-slate-800 hover:text-[#8cc63f] transition-colors uppercase tracking-widest relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8cc63f] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6 xl:gap-8 ml-auto">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Единый телефон</span>
              <a href="tel:88005511967" className="ct-phone text-lg font-black text-slate-900 hover:text-[#8cc63f] transition-colors leading-none tracking-tight">
                8 800 551-19-67
              </a>
            </div>
            <button 
              onClick={() => openModal()} 
              className="bg-[#8cc63f] hover:bg-[#7db435] text-white px-7 py-3 rounded-xl font-bold text-[13px] uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              Записаться
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE HEADER (Sticky) */}
      <header className={`lg:hidden sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white border-b border-slate-100'}`}>
        <div className={`px-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}>
          <a href="#home" onClick={handleScroll} className="flex-shrink-0 flex items-center">
            <img 
              src="/logo.png" 
              alt="Прагматика Сервис" 
              className="h-7 object-contain max-w-[140px]" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="28"><rect width="100" height="28" fill="%23f1f5f9" rx="4"/><text x="50" y="18" font-family="sans-serif" font-size="12" font-weight="bold" fill="%2364748b" text-anchor="middle">LOGO</text></svg>';
              }} 
            />
          </a>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => openModal()} 
              className="bg-[#8cc63f] hover:bg-[#7db435] text-white px-4 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider shadow-sm transition-colors"
            >
              Запись
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              aria-label="Открыть меню"
              className="p-1 -mr-1 text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU FULLSCREEN */}
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
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-900">
                  <MapPin className="w-4 h-4 text-[#8cc63f]" />
                  <span className="font-bold text-sm">Ваш город</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Закрыть меню"
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 rounded-xl"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile City Selector */}
              <div className="p-5 bg-slate-50/50 border-b border-slate-100">
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
                        className={`flex items-center justify-center px-3 py-2.5 text-xs font-bold rounded-xl border transition-colors ${
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
                {MAIN_NAV_LINKS.map(link => (
                  <a 
                    key={link.label}
                    href={link.href} 
                    className="px-6 py-4 text-[15px] font-bold text-slate-700 hover:text-[#8cc63f] hover:bg-green-50 transition-colors border-b border-slate-50 uppercase tracking-wide"
                    onClick={handleScroll}
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
                    className="ct-phone flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 shadow-sm"
                  >
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Единый телефон</span>
                    <span className="text-xl font-extrabold text-slate-900 tracking-tight">8 800 551-19-67</span>
                  </a>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setTimeout(() => openModal(), 100);
                    }} 
                    className="w-full bg-[#8cc63f] text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-md active:scale-95 transition-transform"
                  >
                    Оставить заявку
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROMINENT CITY SELECTION BANNER (Under Header, scrolls with page) */}
      <div className="bg-[#8cc63f]/10 border-b border-[#8cc63f]/20 py-2.5 sm:py-3 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-[13px] sm:text-sm">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <MapPin className="w-4 h-4 text-[#8cc63f] flex-shrink-0" />
            <span>Автосервисы Прагматика в г.</span>
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsBannerCityDropdownOpen(!isBannerCityDropdownOpen)} 
              className="flex items-center gap-1 font-extrabold text-slate-900 hover:text-[#8cc63f] transition-colors outline-none border-b border-dashed border-slate-900 hover:border-[#8cc63f]"
            >
              {currentCity.name}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isBannerCityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isBannerCityDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsBannerCityDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 p-1.5"
                  >
                    {CITIES_DATA.map(city => {
                      const isSelected = city.slug === currentCity.slug;
                      return (
                        <button
                          key={city.slug}
                          onClick={() => {
                            navigate(`/${city.slug}`);
                            setIsBannerCityDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold transition-colors rounded-lg outline-none ${
                            isSelected 
                              ? 'bg-slate-50 text-[#8cc63f]' 
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          {city.name}
                          {isSelected && <Check className="w-4 h-4 text-[#8cc63f]" />}
                        </button>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

