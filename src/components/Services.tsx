import { useState, useEffect, useMemo } from 'react';
import { 
  Droplet, Search, Settings, MoveHorizontal, Cog, ShieldAlert, 
  X, FileText, Wind, CircleDashed, Sparkles, ShieldCheck, ChevronRight, ChevronDown, Gift, Wrench, Loader2, MapPin,
  Thermometer, Zap, Eye, Sliders, ArrowRight, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Papa from 'papaparse';
import { useModal } from '../contexts/ModalContext';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZuIxRNJwvEDA-FmBDWZ8yxAYSm2TgDDRcK0H3cnY5IxkehLF0DYe8C-mUlZ5KNqMQPpKq05Fwffhw/pub?gid=667206035&single=true&output=csv';

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
  __category?: string;
}

interface ServiceCategory {
  category: string;
  icon: any;
  items: ServiceItem[];
}

interface ServicesProps {
  currentCity?: { slug: string; name: string };
}

export function pluralize(count: number, one: string, few: string, many: string): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 19) {
    return `${count} ${many}`;
  }
  if (mod10 === 1) {
    return `${count} ${one}`;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} ${few}`;
  }
  return `${count} ${many}`;
}

export default function Services({ currentCity }: ServicesProps) {
  const { openModal } = useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [rawItems, setRawItems] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal specific state
  const [modalSearch, setModalSearch] = useState('');
  const [modalCategoryFilter, setModalCategoryFilter] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (itemKey: string) => {
    setExpandedItems(prev => ({ ...prev, [itemKey]: !prev[itemKey] }));
  };

  useEffect(() => {
    fetch(CSV_URL)
      .then(res => res.text())
      .then(csv => {
        const results = Papa.parse(csv, { 
          header: true, 
          skipEmptyLines: true,
          transformHeader: (h) => h.toLowerCase().trim()
        });
        
        const fetchedItems: ServiceItem[] = [];

        results.data.forEach((row: any) => {
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
            price: row['цена'] ? (row['цена'] === '0' || row['цена'] === 0 ? 'Бесплатно' : `${row['цена']} ₽`) : 'Бесплатно',
            description: row['описание'] || '',
            ...({ __category: cat } as any),
            region
          });
        });

        setRawItems(fetchedItems);
        setIsLoading(false);
      })
      .catch(err => {
        setRawItems([
          { name: 'Замена масла', price: 'от 1000 ₽', description: 'Замена моторного масла и масляного фильтра', __category: 'Регулярное ТО', region: 'Все' },
          { name: 'Диагностика ходовой', price: 'от 500 ₽', description: 'Комплексная проверка элементов подвески', __category: 'Ходовая и тормозная часть', region: 'Все' },
          { name: 'Шиномонтаж', price: 'от 1600 ₽', description: 'Сезонная смена и балансировка 4 колес', __category: 'Шиномонтаж', region: 'Все' },
          { name: 'Развал-схождение', price: 'от 2000 ₽', description: '3D регулировка углов установки колес', __category: 'Регулировка', region: 'Все' },
          { name: 'Замена ГРМ', price: 'от 5000 ₽', description: 'Замена ремня/цепи ГРМ и натяжных роликов', __category: 'Двигатель и Трансмиссия', region: 'Все' },
          { name: 'Ремонт тормозной системы', price: 'от 1500 ₽', description: 'Замена тормозных колодок и дисков', __category: 'Ходовая и тормозная часть', region: 'Все' }
        ]);
        setIsLoading(false);
      });
  }, []);

  const services = useMemo(() => {
    const grouped: Record<string, ServiceItem[]> = {};

    rawItems.forEach((item: any) => {
      const isAllRegions = !item.region || item.region.toLowerCase() === 'все' || item.region.toLowerCase() === 'все регионы';
      
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
      if (a.category === 'Акции и спецпредложения') return -1;
      if (b.category === 'Акции и спецпредложения') return 1;
      if (a.category === 'Регулярное ТО') return -1;
      if (b.category === 'Регулярное ТО') return 1;
      if (a.category === 'Прочее') return 1;
      if (b.category === 'Прочее') return -1;
      return a.category.localeCompare(b.category);
    });

    return formattedServices;
  }, [rawItems, currentCity?.name]);

  const totalServicesCount = useMemo(() => {
    return services.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [services]);

  const filteredModalServices = useMemo(() => {
    let list = services;
    if (modalCategoryFilter !== 'all') {
      list = list.filter(c => c.category === modalCategoryFilter);
    }
    if (!modalSearch.trim()) return list;

    const q = modalSearch.toLowerCase().trim();
    return list
      .map(cat => {
        const matchedItems = cat.items.filter(item => 
          item.name.toLowerCase().includes(q) || 
          (item.description && item.description.toLowerCase().includes(q))
        );
        return {
          ...cat,
          items: matchedItems
        };
      })
      .filter(cat => cat.items.length > 0);
  }, [services, modalCategoryFilter, modalSearch]);

  useEffect(() => {
    if (services.length > 0) {
      if (!services.find(s => s.category === activeCategory)) {
        setActiveCategory(services[0].category);
      }
    }
  }, [services, activeCategory]);

  const activeService = services.find(s => s.category === activeCategory) || services[0];

  const handleBookService = (serviceName: string) => {
    setIsModalOpen(false);
    openModal(`Запись на услугу: ${serviceName}`);
  };

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
              onClick={() => {
                setModalSearch('');
                setModalCategoryFilter('all');
                setIsModalOpen(true);
              }}
              disabled={isLoading || services.length === 0}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <FileText className="w-5 h-5 text-[#8cc63f]" />
              <span>Полный прайс-лист ({pluralize(totalServicesCount, 'услуга', 'услуги', 'услуг')})</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px] bg-slate-50 border border-slate-100 rounded-2xl">
             <Loader2 className="w-10 h-10 text-[#8cc63f] animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px] bg-slate-50 border border-slate-100 rounded-2xl text-slate-500">
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
                  aria-label="Выберите категорию услуг"
                >
                  {services.map((service) => (
                    <option key={service.category} value={service.category}>
                      {service.category} ({pluralize(service.items.length, 'услуга', 'услуги', 'услуг')})
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
                      className={`flex items-center justify-between p-4 rounded-xl transition-all whitespace-nowrap flex-shrink-0 border cursor-pointer ${
                        isActive 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                          : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20 text-[#8cc63f]' : 'bg-white text-slate-500 shadow-sm'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-sm xl:text-base">{service.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'}`}>
                          {service.items.length}
                        </span>
                        <ChevronRight className={`w-4 h-4 hidden lg:block ${isActive ? 'text-white/50' : 'text-slate-300'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-2/3 bg-slate-50 border border-slate-200/70 rounded-2xl p-6 sm:p-8 min-h-[400px]">
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
                     <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200/80">
                       <div className="flex items-center gap-3.5">
                         <div className="p-3 bg-white rounded-xl shadow-sm text-[#8cc63f] border border-slate-100">
                            <activeService.icon className="w-6 h-6" />
                         </div>
                         <div>
                           <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                             {activeService.category}
                           </h3>
                           <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                             {pluralize(activeService.items.length, 'позиция', 'позиции', 'позиций')} в каталоге
                           </p>
                         </div>
                       </div>

                       <button
                         onClick={() => openModal(`Запись на категорию: ${activeService.category}`)}
                         className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#5e8f23] bg-[#8cc63f]/15 hover:bg-[#8cc63f]/25 border border-[#8cc63f]/30 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                       >
                         <span>Записаться в цех</span>
                         <ArrowRight className="w-3.5 h-3.5" />
                       </button>
                     </div>

                     <div className="space-y-3 mb-8 flex-1">
                       {activeService.items.map((item, idx) => (
                         <div 
                           key={idx} 
                           className="flex flex-col group p-4 bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl transition-all shadow-sm"
                         >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex-1 pr-2">
                                <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                                  {item.name}
                                </span>
                                {item.description && (
                                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed whitespace-pre-line">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                <span className="text-base sm:text-lg font-black text-slate-900 whitespace-nowrap bg-slate-100 px-3 py-1 rounded-lg">
                                  {item.price}
                                </span>
                                <button
                                  onClick={() => handleBookService(item.name)}
                                  className="px-3.5 py-2 bg-[#8cc63f] hover:bg-[#7db435] text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
                                >
                                  Записаться
                                </button>
                              </div>
                            </div>
                         </div>
                       ))}
                     </div>
                     
                     <div className="mt-auto pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                        <p>
                          * Цены указаны за базовый объем работ. Точный расчет с учетом запчастей выполнит мастер.
                        </p>
                        <button 
                          onClick={() => {
                            setModalCategoryFilter(activeService.category);
                            setModalSearch('');
                            setIsModalOpen(true);
                          }}
                          className="text-[#5e8f23] hover:underline font-bold whitespace-nowrap cursor-pointer"
                        >
                          Смотреть во всплывающем окне →
                        </button>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* FULL PRICE LIST MODAL */}
      <AnimatePresence>
        {isModalOpen && !isLoading && services.length > 0 && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.96, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 20, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-6xl h-[95vh] sm:h-[92vh] max-h-[960px] bg-slate-50 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/80 z-10"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 lg:px-8 lg:py-6 bg-white border-b border-slate-200/80 flex-shrink-0">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#8cc63f]/15 border border-[#8cc63f]/30 flex items-center justify-center text-[#5e8f23] shrink-0 shadow-sm">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                          Полный прайс-лист
                        </h3>
                        <span className="text-xs sm:text-sm font-bold bg-[#8cc63f]/15 text-[#476d16] border border-[#8cc63f]/30 px-2.5 py-0.5 rounded-full">
                          {pluralize(totalServicesCount, 'услуга', 'услуги', 'услуг')}
                        </span>
                      </div>
                      {currentCity && (
                        <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-0.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#8cc63f]" />
                          <span>Прайс-лист для филиалов в г. {currentCity.name}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors shadow-sm flex-shrink-0 cursor-pointer"
                    aria-label="Закрыть прайс-лист"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-3">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" />
                  <input 
                    type="text"
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                    placeholder="Быстрый поиск по услугам (масло, колодки, сход-развал, кондиционер, ГРМ)..."
                    className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#8cc63f] focus:ring-4 focus:ring-[#8cc63f]/10 text-slate-900 font-medium text-xs sm:text-sm pl-11 sm:pl-12 pr-10 py-3 rounded-xl outline-none transition-all shadow-inner"
                  />
                  {modalSearch && (
                    <button 
                      onClick={() => setModalSearch('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Filter Chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <button
                    onClick={() => setModalCategoryFilter('all')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                      modalCategoryFilter === 'all'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60'
                    }`}
                  >
                    Все разделы ({totalServicesCount})
                  </button>
                  {services.map(cat => (
                    <button
                      key={cat.category}
                      onClick={() => setModalCategoryFilter(cat.category)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
                        modalCategoryFilter === cat.category
                          ? 'bg-[#8cc63f] text-white shadow-sm font-extrabold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60'
                      }`}
                    >
                      <span>{cat.category}</span>
                      <span className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                        modalCategoryFilter === cat.category ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {cat.items.length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Content Body */}
              <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1 custom-scrollbar space-y-5">
                {filteredModalServices.length === 0 ? (
                  <div className="text-center py-16 sm:py-24 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                      <Search className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1.5">
                      Ничего не найдено
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 mb-5 max-w-md mx-auto leading-relaxed">
                      По вашему запросу «{modalSearch}» услуги не найдены. Проверьте правильность написания или сбросьте фильтры.
                    </p>
                    <button 
                      onClick={() => {
                        setModalSearch('');
                        setModalCategoryFilter('all');
                      }}
                      className="px-5 py-2.5 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-slate-800 transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      Показать все {pluralize(totalServicesCount, 'услугу', 'услуги', 'услуг')}
                    </button>
                  </div>
                ) : (
                  filteredModalServices.map((category, catIdx) => {
                    const CatIcon = category.icon;
                    return (
                      <div 
                        key={catIdx} 
                        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden"
                      >
                        {/* Section Bar */}
                        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-[#8cc63f]/20 flex items-center justify-center text-[#5e8f23] shrink-0 shadow-xs">
                              <CatIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <h4 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900">
                              {category.category}
                            </h4>
                          </div>
                          <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs">
                            {pluralize(category.items.length, 'позиция', 'позиции', 'позиций')}
                          </span>
                        </div>

                        {/* Items Rows */}
                        <div className="divide-y divide-slate-100">
                          {category.items.map((item, itemIdx) => {
                            const itemKey = `${category.category}-${itemIdx}`;
                            const isExpanded = expandedItems[itemKey];
                            const isFree = item.price === 'Бесплатно' || item.price === '0 ₽';

                            return (
                              <div 
                                key={itemIdx} 
                                className="p-4 sm:px-6 sm:py-4 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                              >
                                <div className="flex-1 min-w-0 pr-0 sm:pr-4">
                                  <div className="flex items-start gap-2">
                                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                                      {item.name}
                                    </span>
                                  </div>
                                  {item.description && (
                                    <div className="mt-1">
                                      <p className={`text-xs sm:text-sm text-slate-500 leading-relaxed ${isExpanded ? '' : 'line-clamp-2 sm:line-clamp-1'}`}>
                                        {item.description}
                                      </p>
                                      {item.description.length > 90 && (
                                        <button 
                                          onClick={() => toggleExpand(itemKey)}
                                          className="text-xs font-bold text-[#5e8f23] hover:underline mt-1 block cursor-pointer"
                                        >
                                          {isExpanded ? 'Свернуть описание' : 'Подробнее об услуге'}
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                  <span className={`text-sm sm:text-base font-extrabold whitespace-nowrap px-3 py-1.5 rounded-xl ${
                                    isFree 
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                      : 'bg-slate-100 text-slate-900'
                                  }`}>
                                    {item.price}
                                  </span>
                                  <button
                                    onClick={() => handleBookService(item.name)}
                                    className="px-4 py-2 bg-[#8cc63f] hover:bg-[#7db435] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                                  >
                                    Записаться
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:px-8 sm:py-4 bg-white border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3.5 flex-shrink-0">
                <p className="text-xs text-slate-500 text-center sm:text-left leading-relaxed">
                  💡 Не нашли нужную услугу? Позвоните нам или оставьте заявку — мастер рассчитает стоимость за 5 минут.
                </p>
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      openModal('Запись на сервис');
                    }}
                    className="flex-1 sm:flex-none px-6 py-3 bg-[#8cc63f] hover:bg-[#7db435] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer text-center"
                  >
                    Записаться онлайн
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 sm:flex-none px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
