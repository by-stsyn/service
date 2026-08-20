const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Insert import HeroForm
code = code.replace(
  "import { useModal } from '../contexts/ModalContext';",
  "import { useModal } from '../contexts/ModalContext';\nimport HeroForm from './HeroForm';"
);

// We need to place it in the hero layout.
// Find the <div className="absolute inset-0 flex items-center">
// Let's modify the inner container.
let searchStr = `          <div className="absolute inset-0 flex items-center">
            <div className="px-4 sm:px-8 max-w-4xl mx-auto xl:mx-0 xl:ml-16 w-full">`;

let replaceStr = `          <div className="absolute inset-0 flex items-center">
            <div className="px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-12 mt-10 sm:mt-0">
              <div className="w-full xl:w-1/2 flex flex-col justify-center text-center xl:text-left mt-8 xl:mt-0">`;

let oldEndStr = `              </div>
            </div>
          </div>`;

let newEndStr = `              </div>
              <div className="hidden sm:block w-full xl:w-1/3 flex-shrink-0 z-20">
                <HeroForm currentCity={currentCity} />
              </div>
            </div>
          </div>`;

code = code.replace(searchStr, replaceStr);
code = code.replace(oldEndStr, newEndStr);

// To fix mobile layout for the form, we can make it visible or hidden.
// User said "запист на сервис должнабыть явной в хиро блоке", 
// let's show it on desktop for sure. On mobile it might take too much space so I put "hidden sm:block". Let's change to block if they want it explicitly, but maybe on mobile it's better to just keep the button?
// Actually, let's keep the form on mobile as well or maybe the slider text is too much.
// "hidden xl:block" maybe?
// Let's just do "w-full lg:w-[400px] flex-shrink-0 z-20 hidden md:block" for the form to not crowd mobile.
newEndStr = `              </div>
              <div className="hidden md:block w-full lg:w-[450px] flex-shrink-0 z-20 xl:mr-16">
                <HeroForm currentCity={currentCity} />
              </div>
            </div>
          </div>`;

code = code.replace(`              <div className="hidden sm:block w-full xl:w-1/3 flex-shrink-0 z-20">
                <HeroForm currentCity={currentCity} />
              </div>
            </div>
          </div>`, newEndStr);

// Change text alignment on xl screen
code = code.replace('max-w-3xl tracking-tight uppercase drop-shadow-md"', 'max-w-3xl tracking-tight uppercase drop-shadow-md mx-auto xl:mx-0"');
code = code.replace('max-w-xl drop-shadow-md"', 'max-w-xl drop-shadow-md mx-auto xl:mx-0"');

fs.writeFileSync('src/components/Hero.tsx', code);
