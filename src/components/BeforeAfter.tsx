import React, { useState } from 'react';
import { MoveHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PAIRS = [
  { id: 1, before: '/before-after-photo/photo 1-1.jpg', after: '/before-after-photo/photo 1-2.jpg' },
  { id: 2, before: '/before-after-photo/photo 2-1.jpg', after: '/before-after-photo/photo 2-2.jpg' },
  { id: 3, before: '/before-after-photo/photo 3-1.jpg', after: '/before-after-photo/photo 3-2.jpg' },
  { id: 4, before: '/before-after-photo/photo 4-1.jpg', after: '/before-after-photo/photo 4-2.jpg' },
];

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPair = () => {
    setCurrentIndex((prev) => (prev + 1) % PAIRS.length);
    setSliderPosition(50);
  };
  const prevPair = () => {
    setCurrentIndex((prev) => (prev === 0 ? PAIRS.length - 1 : prev - 1));
    setSliderPosition(50);
  };

  const currentPair = PAIRS[currentIndex];

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Доверяют профессионалам
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Оцените качество кузовного ремонта. Потяните ползунок, чтобы увидеть разницу до и после.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden select-none shadow-2xl bg-slate-200 group">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* Background Image (After) */}
              <div className="absolute inset-0">
                <img 
                  src={currentPair.after}
                  alt="Автомобиль после кузовного ремонта в Прагматика Мультисервис" 
                  className="w-full h-full object-cover"
                  draggable="false"
                  loading="lazy"
                />
              </div>

              {/* Foreground Image (Before) */}
              <div 
                className="absolute inset-0 z-10"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img 
                  src={currentPair.before}
                  alt="Автомобиль до ремонта" 
                  className="w-full h-full object-cover"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Line & Button */}
          <div 
            className="absolute top-0 bottom-0 z-20 w-1 bg-white pointer-events-none"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400">
              <MoveHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          {/* Invisible Range Input */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="0.1"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-ew-resize m-0 p-0 touch-pan-y"
          />

          {/* Labels */}
          <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm text-white px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold tracking-wider pointer-events-none uppercase">
            До
          </div>
          <div className="absolute top-4 right-4 z-0 bg-black/50 backdrop-blur-sm text-white px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold tracking-wider pointer-events-none uppercase">
            После
          </div>
          
          {/* Navigation Controls */}
          {PAIRS.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
              <button 
                onClick={prevPair}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                {PAIRS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setSliderPosition(50);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#8cc63f] w-8' : 'bg-white/50 w-2.5 hover:bg-white/80'}`}
                    aria-label={`Перейти к фото ${idx + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextPair}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label="Следующее фото"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
