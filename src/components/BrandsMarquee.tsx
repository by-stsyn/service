import { motion } from 'motion/react';

const MOCK_BRANDS_1 = [
  'audi', 'bmw', 'mercedes', 'vw', 'toyota', 'lexus', 'hyundai', 'kia'
];

const MOCK_BRANDS_2 = [
  'renault', 'nissan', 'ford', 'chevrolet', 'skoda', 'mazda', 'honda', 'volvo'
];

const MOCK_BRANDS_3 = [
  'lada', 'evolute', 'geely', 'belgee', 'changan', 'xcite', 'knewstar', 'chery'
];

function BrandLogo({ brand }: { brand: string }) {
  return (
    <div className="w-24 h-16 sm:w-36 sm:h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-3 sm:p-5 hover:shadow-md transition-all hover:border-slate-200 shrink-0">
      <img 
        src={`/brands/${brand}.png`} 
        alt={`Автосервис для автомобилей марки ${brand}`}
        loading="lazy"
        className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
          const span = document.createElement('span');
          span.className = 'text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider';
          span.innerText = brand;
          (e.target as HTMLImageElement).parentElement?.appendChild(span);
        }}
      />
    </div>
  );
}

function MarqueeRow({ 
  brands, 
  direction = 'left', 
  duration = 60 
}: { 
  brands: string[]; 
  direction?: 'left' | 'right'; 
  duration?: number;
}) {
  // Multiply so one block easily spans across large screens
  const fullBlock = [...brands, ...brands];

  return (
    <div className="flex overflow-hidden select-none">
      <motion.div
        className="flex shrink-0"
        animate={{ 
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] 
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: duration,
        }}
      >
        {/* Block 1 */}
        <div className="flex gap-4 sm:gap-6 items-center shrink-0 pr-4 sm:pr-6">
          {fullBlock.map((brand, idx) => (
            <BrandLogo key={`block1-${brand}-${idx}`} brand={brand} />
          ))}
        </div>
        {/* Block 2 (Exact identical duplicate for seamless infinite loop) */}
        <div className="flex gap-4 sm:gap-6 items-center shrink-0 pr-4 sm:pr-6">
          {fullBlock.map((brand, idx) => (
            <BrandLogo key={`block2-${brand}-${idx}`} brand={brand} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

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

        {/* Top Row - Moves Right smoothly */}
        <MarqueeRow brands={MOCK_BRANDS_1} direction="right" duration={65} />

        {/* Middle Row - Moves Left smoothly */}
        <MarqueeRow brands={MOCK_BRANDS_2} direction="left" duration={55} />

        {/* Bottom Row - Moves Right smoothly */}
        <MarqueeRow brands={MOCK_BRANDS_3} direction="right" duration={70} />
      </div>
    </section>
  );
}
