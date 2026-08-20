import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';
import { motion, AnimatePresence } from 'motion/react';

// СЮДА НУЖНО ВСТАВИТЬ ID ВАШЕЙ ТАБЛИЦЫ
// ID находится в URL таблицы между /d/ и /edit
const GOOGLE_SHEET_ID = '1iLLl0JrdunoBljWKJ2LlSqHWbC6YJTYG0HqKDaSDBAo';

interface Slide {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  mobileImageUrl?: string;
}

const DEFAULT_SLIDES: Slide[] = [
  {
    title: 'Сервисное обслуживание автомобилей любых марок',
    description: 'Официальная гарантия на работы и запчасти. Профессиональный автомобильный мультисервис.',
    buttonText: 'Узнать стоимость',
    buttonLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=1200&h=800&fit=crop'
  },
  {
    title: 'Весеннее предложение',
    description: 'Бесплатная диагностика ходовой при замене масла. Запишитесь прямо сейчас!',
    buttonText: 'Записаться онлайн',
    buttonLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1503370621434-2e21bb219808?q=80&w=1200&h=800&fit=crop'
  }
];

export default function Hero({ currentCity }: { currentCity: any }) {
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    function fetchSlides() {
      if (!GOOGLE_SHEET_ID) {
        setLoading(false);
        return;
      }
      setLoading(true);
      
      const callbackName = `gvizCallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
      
      const sheetParam = currentCity.sheetGid ? `gid=${currentCity.sheetGid}` : `sheet=${encodeURIComponent(currentCity.sheetName)}`;
      const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=responseHandler:${callbackName}&${sheetParam}`;
      
      (window as any)[callbackName] = async (data: any) => {
        try {
          console.log('Данные из таблицы успешно получены:', data);
          const rows = data.table?.rows?.slice(1) || [];
          
          const resolveImageUrl = async (url: string): Promise<string> => {
            if (!url) return '';
            const str = url.trim();
            
            // Преобразование ссылки Google Drive в прямую ссылку на картинку
            const gDriveMatch = str.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (gDriveMatch && gDriveMatch[1]) {
              return `https://lh3.googleusercontent.com/d/${gDriveMatch[1]}=w1920`;
            }
            const gDriveOpenMatch = str.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
            if (gDriveOpenMatch && gDriveOpenMatch[1]) {
              return `https://lh3.googleusercontent.com/d/${gDriveOpenMatch[1]}=w1920`;
            }

            // Яндекс Диск
            if (str.includes('disk.yandex.ru/i/') || str.includes('disk.yandex.ru/d/') || str.includes('yadi.sk/')) {
              try {
                const res = await fetch(`https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=${encodeURIComponent(str)}`);
                if (res.ok) {
                  const apiData = await res.json();
                  if (apiData && apiData.href) {
                    return apiData.href;
                  }
                }
              } catch (e) {
                console.error('Ошибка получения прямой ссылки Яндекс Диск:', e);
              }
            }
            
            return str;
          };

          const slidePromises = rows.map(async (row: any) => {
            const cells = row.c || [];
            return {
              title: cells[0]?.v || '',
              description: cells[1]?.v || '',
              buttonText: cells[2]?.v || '',
              buttonLink: cells[3]?.v || '',
              imageUrl: await resolveImageUrl(cells[4]?.v || ''),
              mobileImageUrl: await resolveImageUrl(cells[5]?.v || '')
            };
          });

          const allSlides = await Promise.all(slidePromises);
          const parsedSlides = allSlides.filter((slide: Slide) => slide.buttonText);

          if (parsedSlides.length > 0) {
            setSlides(parsedSlides);
          } else {
            console.warn('Не удалось найти валидные слайды (нужен текст на кнопке), используем дефолтные');
            setSlides(DEFAULT_SLIDES);
          }
        } catch (err) {
          console.error('Ошибка обработки данных JSONP:', err);
          setSlides(DEFAULT_SLIDES);
        } finally {
          setLoading(false);
          setCurrentIndex(0);
          delete (window as any)[callbackName];
          document.getElementById(callbackName)?.remove();
        }
      };

      const script = document.createElement('script');
      script.id = callbackName;
      script.src = url;
      script.onerror = (error) => {
        console.error('Ошибка при загрузке скрипта JSONP (Failed to fetch):', error);
        setSlides(DEFAULT_SLIDES);
        setLoading(false);
        setCurrentIndex(0);
        delete (window as any)[callbackName];
        script.remove();
      };
      document.body.appendChild(script);
    }

    fetchSlides();
  }, [currentCity.sheetName]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setTimeout(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [slides.length, currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="h-[500px] w-full bg-slate-100 animate-pulse flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0.5
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0.5,
      zIndex: 0,
    })
  };

  return (
    <section id="home" className="relative w-full h-[500px] sm:h-[550px] overflow-hidden flex-shrink-0 bg-slate-900 group">
      <h1 className="sr-only">Автосервис Прагматика Мультисервис в г. {currentCity.name}. Ремонт, ТО, диагностика автомобилей.</h1>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {slides[currentIndex].imageUrl && (
            <div 
              className={`absolute inset-0 bg-cover bg-center ${slides[currentIndex].mobileImageUrl ? 'hidden sm:block' : ''}`}
              style={{ backgroundImage: `url(${slides[currentIndex].imageUrl})` }}
            />
          )}
          {slides[currentIndex].mobileImageUrl && (
            <div 
              className="absolute inset-0 bg-cover bg-center sm:hidden"
              style={{ backgroundImage: `url(${slides[currentIndex].mobileImageUrl})` }}
            />
          )}
          {/* Uniform Overlay instead of gradient to keep image centered visually */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-4 sm:px-8 max-w-4xl mx-auto xl:mx-0 xl:ml-16 w-full text-center xl:text-left">
              {slides[currentIndex].title && (
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-none max-w-3xl tracking-tight uppercase drop-shadow-md mx-auto xl:mx-0"
                >
                  {slides[currentIndex].title}
                </h2>
              )}
              {slides[currentIndex].description && (
                <p 
                  className="text-base sm:text-lg md:text-xl text-slate-100 mb-8 font-medium max-w-xl drop-shadow-md mx-auto xl:mx-0"
                >
                  {slides[currentIndex].description}
                </p>
              )}
              <div>
                {(() => {
                  const link = slides[currentIndex].buttonLink?.trim();
                  const hasLink = link && link !== '#' && link.toLowerCase() !== 'null' && link.toLowerCase() !== 'undefined';
                  
                  return hasLink ? (
                    <a 
                      href={link}
                      className="inline-block bg-[#8cc63f] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#7db435] transition-all shadow-lg active:scale-95"
                    >
                      {slides[currentIndex].buttonText || 'Подробнее'}
                    </a>
                  ) : (
                    <button 
                      onClick={() => openModal('Запись на сервис')}
                      className="inline-block bg-[#8cc63f] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#7db435] transition-all shadow-lg active:scale-95"
                    >
                      {slides[currentIndex].buttonText || 'Оставить заявку'}
                    </button>
                  );
                })()}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          <div className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 flex items-center gap-4 z-10">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#8cc63f] w-8' : 'bg-white/50 w-2.5 hover:bg-white/80'}`}
                  aria-label={`Перейти к слайду ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Следующий слайд"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
