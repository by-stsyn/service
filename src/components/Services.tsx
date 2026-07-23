import { useState, useEffect, useMemo } from 'react';
import { 
  Droplet, Search, Settings, MoveHorizontal, Cog, ShieldAlert, 
  X, FileText, Wind, CircleDashed, Sparkles, ShieldCheck, ChevronRight, ChevronDown, Gift, Wrench, Loader2, MapPin,
  Thermometer, Zap, Eye, Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORY_ICONS: Record<string, any> = {
  'Акции и спецпредложения': Gift,
  'Регулярное ТО': Settings,
  'Мойка и Детейлинг': Droplet,
  'Кондиционер и Отопление': Thermometer,
  'Шиномонтаж': CircleDashed,
  'Диагностика': Search,
  'Ходовая и тормозная часть': ShieldAlert,
  'Кузовной ремонт': Sparkles,
  'Двигатель и Трансмиссия': Cog,
  'Электрика': Zap,
  'Стекла и Оптика': Eye,
  'Выхлопная система': Wind,
  'Регулировка': Sliders,
  'Прочее': FileText
};

interface ServiceItem {
  name: string;
  price: string;
  description: string;
  region: string;
}

interface ServiceCategory {
  category: string;
  icon: any;
  items: ServiceItem[];
}

interface ServicesProps {
  currentCity?: { slug: string; name: string };
}

const MOCK_SERVICES = [
  { "категория": "Регулярное ТО", "название": "Замена масла в двигателе", "цена": "1500", "описание": "Включает замену масляного фильтра", "регион": "Все" },
  { "категория": "Регулярное ТО", "название": "Замена воздушного фильтра", "цена": "500", "описание": "", "регион": "Все" },
  { "категория": "Ходовая и тормозная часть", "название": "Замена тормозных колодок", "цена": "2000", "описание": "Цена за ось", "регион": "Все" },
  { "категория": "Ходовая и тормозная часть", "название": "Диагностика подвески", "цена": "1000", "описание": "", "регион": "Все" },
  { "категория": "Двигатель и Трансмиссия", "название": "Компьютерная диагностика двигателя", "цена": "1500", "описание": "Считывание и сброс ошибок", "регион": "Все" },
  { "категория": "Двигатель и Трансмиссия", "название": "Замена ремня ГРМ", "цена": "8000", "описание": "Цена может варьироваться от модели", "регион": "Все" },
  { "категория": "Шиномонтаж", "название": "Шиномонтаж 4 колес (R15-R17)", "цена": "2500", "описание": "Снятие, установка, балансировка", "регион": "Все" },
  { "категория": "Акции и спецпредложения", "название": "Бесплатная диагностика при ремонте", "цена": "0", "описание": "При ремонте от 10000 руб.", "регион": "Все" },
];

export default function Services({ currentCity }: ServicesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [rawItems, setRawItems] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mocking the fetch call
    new Promise<typeof MOCK_SERVICES>((resolve) => {
      setTimeout(() => resolve(MOCK_SERVICES), 600);
    }).then(data => {
        const fetchedItems: ServiceItem[] = [];

        data.forEach((row: any) => {
          const name = row['название'] || '';
          if (!name.trim()) return;

          const region = (row['регион'] || row['город'] || row['region'] || '').trim();

          let cat = 'Прочее';
          const nameLower = name.toLowerCase();
          const catLower = (row['категория'] || '').toLowerCase();
          const searchStr = nameLower + ' ' + catLower;
          
          if (searchStr.includes('акция') || searchStr.includes('спецпредложени') || searchStr.includes('подарок') || searchStr.includes('скидк')) {
            cat = 'Акции и спецпредложения';
          } else if (searchStr.includes('шиномонтаж') || searchStr.includes('балансировка') || searchStr.includes('колес') || searchStr.includes('резин') || searchStr.includes('прокол')) {
            cat = 'Шиномонтаж';
          } else if (searchStr.includes('мойка') || searchStr.includes('химчистка') || searchStr.includes('полировка') || searchStr.includes('детейлинг')) {
            cat = 'Мойка и Детейлинг';
          } else if (searchStr.includes('кондиционер') || searchStr.includes('климат') || searchStr.includes('фреон') || searchStr.includes('отопител')) {
            cat = 'Кондиционер и Отопление';
          } else if (searchStr.includes('масл') || searchStr.includes('фильтр') || searchStr.includes('то ') || searchStr.includes('техническое обслуживание') || searchStr.includes('свеч') || searchStr.includes('грм') || searchStr.includes('колодк') || searchStr.includes('антифриз') || searchStr.includes('жидкост')) {
            cat = 'Регулярное ТО';
          } else if (searchStr.includes('развал') || searchStr.includes('схождени') || searchStr.includes('света фар') || searchStr.includes('регулировк')) {
            cat = 'Регулировка';
          } else if (searchStr.includes('диагностик') || searchStr.includes('осмотр') || searchStr.includes('проверк')) {
            cat = 'Диагностика';
          } else if (searchStr.includes('ходов') || searchStr.includes('тормоз') || searchStr.includes('подвеск') || searchStr.includes('амортизатор') || searchStr.includes('рычаг') || searchStr.includes('суппорт')) {
            cat = 'Ходовая и тормозная часть';
          } else if (searchStr.includes('покраск') || searchStr.includes('кузов') || searchStr.includes('вмятин') || searchStr.includes('стапел') || searchStr.includes('бампер') || searchStr.includes('двер')) {
            cat = 'Кузовной ремонт';
          } else if (searchStr.includes('двигател') || searchStr.includes('мотор') || searchStr.includes('кпп') || searchStr.includes('акпп') || searchStr.includes('трансмисси') || searchStr.includes('сцеплени') || searchStr.includes('турбин') || searchStr.includes('гбц')) {
            cat = 'Двигатель и Трансмиссия';
          } else if (searchStr.includes('электрик') || searchStr.includes('генератор') || searchStr.includes('стартер') || searchStr.includes('аккумулятор') || searchStr.includes('проводк') || searchStr.includes('сигнализаци') || searchStr.includes('датчик')) {
            cat = 'Электрика';
          } else if (searchStr.includes('стекл') || searchStr.includes('оптик') || searchStr.includes('фар') || searchStr.includes('лобов')) {
            cat = 'Стекла и Оптика';
          } else if (searchStr.includes('выхлоп') || searchStr.includes('глушител') || searchStr.includes('катализатор') || searchStr.includes('гофр')) {
            cat = 'Выхлопная система';
          }

          fetchedItems.push({
            name,
            price: row['цена'] ? `${row['цена']} ₽` : 'Бесплатно',
            description: row['описание'] || '',
            ...({ __category: cat } as any),
            region
          });
        });

        setRawItems(fetchedItems);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching mock data:', err);
        setIsLoading(false);
      });
  }, []);

  const services = useMemo(() => {
    const grouped: Record<string, ServiceItem[]> = {};

    rawItems.forEach((item: any) => {
      // Filter by region if a specific region is selected and the item has a region specified
      const isAllRegions = !item.region || item.region.toLowerCase() === 'все' || item.region.toLowerCase() === 'все регионы';
      
      // If currentCity is passed, filter by it
      if (currentCity && !isAllRegions) {
        if (item.region.toLowerCase() !== currentCity.name.toLowerCase()) {
          return;
        }
      }

      const cat = item.__category || 'Прочее';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    const formattedServices: ServiceCategory[] = Object.keys(grouped).map(key => ({
      category: key,
      icon: CATEGORY_ICONS[key] || FileText,
      items: grouped[key]
    })).sort((a, b) => {
      if (a.category === 'Прочее') return 1;
      if (b.category === 'Прочее') return -1;
      return a.category.localeCompare(b.category);
    });

    return formattedServices;
  }, [rawItems, currentCity?.name]);

  useEffect(() => {
    if (services.length > 0) {
      // Ensure active category is valid when services update
      if (!services.find(s => s.category === activeCategory)) {
        setActiveCategory(services[0].category);
      }
    }
  }, [services, activeCategory]);

  const activeService = services.find(s => s.category === activeCategory) || services[0];

  return (
    <section id="services" className="px-4 sm:px-8 py-16 sm:py-24 flex-shrink-0 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight uppercase mb-4">
              Наши <span className="text-[#8cc63f]">услуги</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
              Профессиональное обслуживание автомобилей любой сложности. Выберите категорию, чтобы ознакомиться с ценами.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              disabled={isLoading || services.length === 0}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="w-5 h-5" />
              Полный прайс-лист
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px] bg-slate-50 border border-slate-100 rounded-xl">
             <Loader2 className="w-10 h-10 text-[#8cc63f] animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px] bg-slate-50 border border-slate-100 rounded-xl text-slate-500">
            Не удалось загрузить прайс-лист
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 flex flex-col gap-2">
              {/* Mobile Select Dropdown */}
              <div className="lg:hidden relative w-full mb-2">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#8cc63f]">
                  {(() => {
                    const activeSvc = services.find(s => s.category === activeCategory);
                    if (activeSvc) {
                      const Icon = activeSvc.icon;
                      return <Icon className="w-5 h-5" />;
                    }
                    return null;
                  })()}
                </div>
                <select 
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full appearance-none bg-white border-2 border-slate-200 text-slate-900 font-bold text-base py-3.5 pl-12 pr-10 rounded-xl outline-none focus:border-[#8cc63f] focus:ring-4 focus:ring-[#8cc63f]/10 transition-all shadow-sm"
                >
                  {services.map((service) => (
                    <option key={service.category} value={service.category}>
                      {service.category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>

              {/* Desktop Category List */}
              <div className="hidden lg:flex lg:flex-col gap-2 pb-4 lg:pb-0">
                {services.map((service) => {
                  const Icon = service.icon;
                  const isActive = activeCategory === service.category;
                  return (
                    <button
                      key={service.category}
                      onClick={() => setActiveCategory(service.category)}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all whitespace-nowrap flex-shrink-0 border ${
                        isActive 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                          : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-500 shadow-sm'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-base">{service.category}</span>
                      </div>
                      <ChevronRight className={`w-5 h-5 hidden lg:block ${isActive ? 'text-white/50' : 'text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-2/3 bg-slate-50 border border-slate-100 rounded-xl p-6 sm:p-10 min-h-[400px]">
               <AnimatePresence mode="wait">
                 {activeService && (
                   <motion.div
                     key={activeCategory}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.2 }}
                     className="flex flex-col h-full"
                   >
                     <div className="flex items-center gap-4 mb-8">
                       <div className="p-3.5 bg-white rounded-xl shadow-sm text-[#8cc63f]">
                          <activeService.icon className="w-7 h-7" />
                       </div>
                       <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                         {activeService.category}
                       </h3>
                     </div>

                     <div className="space-y-4 mb-8 flex-1">
                       {activeService.items.map((item, idx) => (
                         <div key={idx} className="flex flex-col group p-4 hover:bg-white rounded-xl transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
                              <span className="text-base sm:text-lg font-medium text-slate-800 group-hover:text-slate-900 max-w-[80%] leading-snug">
                                {item.name}
                              </span>
                              <div className="hidden sm:block flex-1 border-b-2 border-dotted border-slate-200 mx-2 relative top-[-8px] group-hover:border-slate-300 transition-colors" />
                              <span className="text-lg sm:text-xl font-semibold text-[#8cc63f] whitespace-nowrap bg-green-50 px-3 py-1 rounded-xl">
                                {item.price === '0 ₽' ? 'Бесплатно' : item.price}
                              </span>
                            </div>
                            {item.description && (
                              <p className="text-sm text-slate-500 mt-2 pr-4 md:pr-12 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                         </div>
                       ))}
                     </div>
                     
                     <div className="mt-auto pt-6 border-t border-slate-200/60">
                        <p className="text-sm text-slate-500 leading-relaxed">
                          Цены носят информационный характер и не являются публичной офертой. Точную стоимость работ уточняйте у мастеров-консультантов после осмотра автомобиля.
                        </p>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && !isLoading && services.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-white rounded-xl shadow-lg z-50 flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 flex-shrink-0">
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 uppercase tracking-tight truncate pr-4">
                  Полный прайс-лист
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                <div className="columns-1 md:columns-2 gap-8 space-y-8">
                  {services.map((category, idx) => (
                    <div key={idx} className="break-inside-avoid">
                      <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b-2 border-[#8cc63f] inline-block flex items-center gap-2">
                        <category.icon className="w-5 h-5 text-[#8cc63f]" />
                        {category.category}
                      </h4>
                      <div className="space-y-4">
                        {category.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex flex-col gap-1 group pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                            <div className="flex items-start justify-between gap-4">
                              <span className="text-sm sm:text-base font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-tight">
                                {item.name}
                              </span>
                              <span className="text-sm sm:text-base font-semibold text-slate-900 whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded-xl">
                                {item.price === '0 ₽' ? 'Бесплатно' : item.price}
                              </span>
                            </div>
                            {item.description && (
                              <span className="text-xs text-slate-500 mt-1 line-clamp-2">
                                {item.description}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex-shrink-0 text-center">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 bg-[#8cc63f] hover:bg-[#7db435] text-white font-semibold rounded-xl shadow-md transition-all active:scale-95"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
