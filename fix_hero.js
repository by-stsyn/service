import fs from 'fs';

let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// 1. Remove HeroForm import
code = code.replace("import HeroForm from './HeroForm';\n", "");

// 2. Fix layout wrapper and button click
const oldLayout = `          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-12 mt-10 sm:mt-0">
              <div className="w-full xl:w-1/2 flex flex-col justify-center text-center xl:text-left mt-8 xl:mt-0">
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
                      onClick={() => openModal(slides[currentIndex].title || slides[currentIndex].buttonText)}
                      className="inline-block bg-[#8cc63f] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#7db435] transition-all shadow-lg active:scale-95"
                    >
                      {slides[currentIndex].buttonText || 'Оставить заявку'}
                    </button>
                  );
                })()}
              </div>
              </div>
              <div className="hidden md:block w-full lg:w-[450px] flex-shrink-0 z-20 xl:mr-16">
                <HeroForm currentCity={currentCity} />
              </div>
            </div>
          </div>`;

const newLayout = `          {/* Content */}
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
          </div>`;

if (code.includes(oldLayout)) {
  code = code.replace(oldLayout, newLayout);
  fs.writeFileSync('src/components/Hero.tsx', code);
  console.log('Replaced successfully');
} else {
  console.log('Could not find old layout to replace');
}
