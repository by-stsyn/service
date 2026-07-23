import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [autoplay, setAutoplay] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    async function fetchSlides() {
      if (!GOOGLE_SHEET_ID) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(currentCity.sheetName)}`;
        const response = await fetch(url);
        const text = await response.text();
        
        // Extract JSON part
        const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const data = JSON.parse(jsonString);
        
        console.log('Данные из таблицы успешно получены:', data);

        // Skip first row assuming it contains headers
        const rows = data.table?.rows?.slice(1) || [];
        
        const parsedSlides = rows.map((row: any) => {
          const cells = row.c || [];
          return {
            title: cells[0]?.v || '',
            description: cells[1]?.v || '',
            buttonText: cells[2]?.v || '',
            buttonLink: cells[3]?.v || '',
            imageUrl: cells[4]?.v || '',
            mobileImageUrl: cells[5]?.v || ''
          };
        }).filter((slide: Slide) => slide.buttonText);

        console.log('Сформированные слайды:', parsedSlides);

        if (parsedSlides.length > 0) {
          setSlides(parsedSlides);
        } else {
          console.warn('Не удалось найти валидные слайды (нужен текст на кнопке), используем дефолтные');
          setSlides(DEFAULT_SLIDES);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных из Google Sheets:', error);
        setSlides(DEFAULT_SLIDES);
      } finally {
        setLoading(false);
        setCurrentIndex(0);
      }
    }

    fetchSlides();
  }, [currentCity.sheetName]);

  useEffect(() => {
    if (slides.length <= 1 || !autoplay) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length, autoplay]);

  const nextSlide = () => {
    setAutoplay(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setAutoplay(false);
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
    }),
    center: {
      x: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
    })
  };

  return (
    <section id="home" className="relative w-full h-[500px] sm:h-[550px] overflow-hidden flex-shrink-0 bg-slate-900 group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
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
            <div className="px-4 sm:px-8 max-w-4xl mx-auto xl:mx-0 xl:ml-16 w-full">
              {slides[currentIndex].title && (
                <h1 
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-none max-w-3xl tracking-tight uppercase drop-shadow-md"
                >
                  {slides[currentIndex].title}
                </h1>
              )}
              {slides[currentIndex].description && (
                <p 
                  className="text-base sm:text-lg md:text-xl text-slate-100 mb-8 font-medium max-w-xl drop-shadow-md"
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
                      onClick={() => openModal(slides[currentIndex].title || slides[currentIndex].buttonText)}
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
                    setAutoplay(false);
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
