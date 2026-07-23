import { motion } from 'motion/react';

const MOCK_BRANDS = [
  'audi', 'bmw', 'mercedes', 'vw', 'toyota', 'lexus', 
  'hyundai', 'kia', 'renault', 'nissan', 'ford', 'chevrolet',
  'skoda', 'mazda', 'honda', 'volvo'
];

const MOCK_BRANDS_3 = [
  'lada', 'evolute', 'geely', 'belgee', 'changan', 'xcite', 'knewstar', 'chery'
];

const TOP_BRANDS = [...MOCK_BRANDS.slice(0, 8), ...MOCK_BRANDS.slice(0, 8)];
const MIDDLE_BRANDS = [...MOCK_BRANDS.slice(8), ...MOCK_BRANDS.slice(8)];
const BOTTOM_BRANDS = [...MOCK_BRANDS_3, ...MOCK_BRANDS_3];

export default function BrandsMarquee() {
  return (
    <section className="py-12 sm:py-16 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 uppercase tracking-tight">Обслуживаем все марки</h2>
        <p className="text-slate-500 font-medium">Ремонтируем автомобили любых производителей</p>
      </div>

      <div className="relative flex flex-col gap-4 sm:gap-6">
        {/* Gradient fades */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Top Row - Moves Right */}
        <div className="flex w-[200%] sm:w-full">
            <motion.div
              className="flex gap-4 sm:gap-6 items-center min-w-max pr-4 sm:pr-6"
              animate={{ x: [ "-50%", "0%" ] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
                {TOP_BRANDS.map((brand, idx) => (
                    <div key={`top-${brand}-${idx}`} className="w-24 h-16 sm:w-36 sm:h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-3 sm:p-5 hover:shadow-md transition-shadow hover:border-slate-200">
                        <img 
                            src={`/brands/${brand}.png`} 
                            alt={brand}
                            className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100"
                            onError={(e) => {
                                // Fallback placeholder text if image missing
                                (e.target as HTMLImageElement).style.display = 'none';
                                const span = document.createElement('span');
                                span.className = 'text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider';
                                span.innerText = brand;
                                (e.target as HTMLImageElement).parentElement?.appendChild(span);
                            }}
                        />
                    </div>
                ))}
            </motion.div>
        </div>

        {/* Middle Row - Moves Left */}
        <div className="flex w-[200%] sm:w-full">
            <motion.div
              className="flex gap-4 sm:gap-6 items-center min-w-max pr-4 sm:pr-6"
              animate={{ x: [ "0%", "-50%" ] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
                {MIDDLE_BRANDS.map((brand, idx) => (
                    <div key={`middle-${brand}-${idx}`} className="w-24 h-16 sm:w-36 sm:h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-3 sm:p-5 hover:shadow-md transition-shadow hover:border-slate-200">
                        <img 
                            src={`/brands/${brand}.png`} 
                            alt={brand}
                            className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100"
                            onError={(e) => {
                                // Fallback placeholder text if image missing
                                (e.target as HTMLImageElement).style.display = 'none';
                                const span = document.createElement('span');
                                span.className = 'text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider';
                                span.innerText = brand;
                                (e.target as HTMLImageElement).parentElement?.appendChild(span);
                            }}
                        />
                    </div>
                ))}
            </motion.div>
        </div>

        {/* Bottom Row - Moves Right */}
        <div className="flex w-[200%] sm:w-full">
            <motion.div
              className="flex gap-4 sm:gap-6 items-center min-w-max pr-4 sm:pr-6"
              animate={{ x: [ "-50%", "0%" ] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
                {BOTTOM_BRANDS.map((brand, idx) => (
                    <div key={`bottom-${brand}-${idx}`} className="w-24 h-16 sm:w-36 sm:h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-3 sm:p-5 hover:shadow-md transition-shadow hover:border-slate-200">
                        <img 
                            src={`/brands/${brand}.png`} 
                            alt={brand}
                            className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100"
                            onError={(e) => {
                                // Fallback placeholder text if image missing
                                (e.target as HTMLImageElement).style.display = 'none';
                                const span = document.createElement('span');
                                span.className = 'text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider';
                                span.innerText = brand;
                                (e.target as HTMLImageElement).parentElement?.appendChild(span);
                            }}
                        />
                    </div>
                ))}
            </motion.div>
        </div>

      </div>
    </section>
  );
}
