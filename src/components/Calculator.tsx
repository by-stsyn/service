import { useModal } from "../contexts/ModalContext";
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, Info, Wrench } from 'lucide-react';

type Option = {
  id: string;
  label: string;
  price: number;
  oldPrice?: number;
};

type StepData = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  options: Option[];
  note?: string;
};

const STEPS: StepData[] = [
  {
    id: 'oil',
    title: 'Замена масла',
    shortTitle: 'Масло',
    description: 'Масло необходимо менять каждые 10 тыс. км пробега или 1 раз в год. Масляный фильтр меняется вместе с маслом.',
    options: [
      { id: 'oil_full', label: 'Замена масла и фильтра + наши материалы', price: 7500 },
      { id: 'oil_work', label: 'Только работа (масло и фильтр ваши)', price: 1500 },
      { id: 'oil_none', label: 'Не нужно', price: 0 }
    ]
  },
  {
    id: 'air_filter',
    title: 'Воздушный фильтр',
    shortTitle: 'Возд. фильтр',
    description: 'Замена каждые 10 тыс. км или 1 раз в год. При эксплуатации в пробках или на бездорожье — чаще.',
    options: [
      { id: 'air_full', label: 'Замена фильтра + наш фильтр', price: 1000, oldPrice: 1390 },
      { id: 'air_work', label: 'Только работа (фильтр ваш)', price: 330 },
      { id: 'air_none', label: 'Не нужно', price: 0 }
    ]
  },
  {
    id: 'cabin_filter',
    title: 'Салонный фильтр',
    shortTitle: 'Салон. фильтр',
    description: 'Рекомендуется менять каждую смену сезона (с зимы на лето и наоборот).',
    options: [
      { id: 'cabin_full', label: 'Замена фильтра + наш фильтр', price: 1000, oldPrice: 1590 },
      { id: 'cabin_work', label: 'Только работа (фильтр ваш)', price: 590 },
      { id: 'cabin_none', label: 'Не нужно', price: 0 }
    ]
  },
  {
    id: 'brakes',
    title: 'Тормозная система',
    shortTitle: 'Тормоза',
    description: 'Комплексная диагностика необходима дважды в год. Обязательна при посторонних шумах, уводе в сторону или плохом торможении.',
    options: [
      { id: 'brakes_diag', label: 'Проверка на тормозном стенде МАНА', price: 1295 },
      { id: 'brakes_none', label: 'Не нужно', price: 0 }
    ]
  },
  {
    id: 'chassis',
    title: 'Ходовая система',
    shortTitle: 'Ходовая',
    description: 'Плановый осмотр каждые 10-20 тыс. км. Выявляет износ подвески, амортизаторов, колодок и дисков.',
    options: [
      { id: 'chassis_diag', label: 'Комплексная диагностика ходовой', price: 1165 },
      { id: 'chassis_none', label: 'Не нужно', price: 0 }
    ]
  },
  {
    id: 'engine',
    title: 'Двигатель (ДВС)',
    shortTitle: 'ДВС',
    description: 'Компьютерная диагностика оценивает состояние систем управления и выявляет скрытые ошибки.',
    options: [
      { id: 'engine_diag', label: 'Компьютерная диагностика', price: 1990 },
      { id: 'engine_none', label: 'Не нужно', price: 0 }
    ]
  }
];

export default function Calculator() {
  const { openModal } = useModal();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    STEPS.forEach(step => {
      initial[step.id] = step.options[step.options.length - 1].id;
    });
    return initial;
  });

  const handleSelect = (stepId: string, optionId: string) => {
    setSelections(prev => ({ ...prev, [stepId]: optionId }));
  };

  const formatPrice = (price: number) => {
    if (price === 0) return '0 ₽';
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  const calculateTotal = () => {
    let total = 0;
    let oldTotal = 0;
    
    STEPS.forEach(step => {
      const selectedOptionId = selections[step.id];
      const option = step.options.find(o => o.id === selectedOptionId);
      if (option) {
        total += option.price;
        oldTotal += option.oldPrice || option.price;
      }
    });

    return { total, oldTotal };
  };

  const { total, oldTotal } = calculateTotal();
  const stepData = STEPS[currentStep];

  return (
    <section id="calculator" className="px-4 sm:px-8 py-20 bg-[#f8faf9] flex-shrink-0">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-3 tracking-tight">
            Калькулятор ТО
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Соберите свой комплекс обслуживания. Выбирайте только то, что нужно вашему автомобилю.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
          
          {/* Sidebar Navigation */}
          <div className="md:w-[30%] bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-4 sm:p-6 flex flex-col">
            
            <div className="flex flex-row md:flex-col justify-between md:justify-start gap-2 sm:gap-4 relative">
              {/* Connecting line on mobile */}
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 md:hidden z-0" />

              {STEPS.map((step, idx) => {
                const isActive = currentStep === idx;
                const selectedOptionId = selections[step.id];
                const selectedOption = step.options.find(o => o.id === selectedOptionId);
                const isSelected = selectedOption && selectedOption.price > 0;

                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(idx)}
                    className={`relative z-10 flex items-center gap-3 p-0 md:p-3 rounded-xl text-left transition-all flex-shrink-0 md:flex-shrink ${
                      isActive 
                        ? 'md:bg-white md:shadow-sm md:border md:border-slate-200 md:ring-1 md:ring-[#8cc63f] md:ring-opacity-50' 
                        : 'md:hover:bg-slate-200/50 border border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold transition-colors shadow-sm md:shadow-none ${
                      isActive ? 'bg-[#8cc63f] text-white ring-4 ring-[#8cc63f]/20' : 
                      isSelected ? 'bg-green-100 text-[#8cc63f] border border-green-200 md:border-transparent' : 
                      'bg-white md:bg-slate-200 text-slate-500 border border-slate-200 md:border-transparent'
                    }`}>
                      {isSelected && !isActive ? <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" /> : idx + 1}
                    </div>
                    <div className="hidden md:block overflow-hidden">
                      <div className={`font-semibold text-sm whitespace-nowrap ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                        {step.shortTitle}
                      </div>
                      {selectedOption && selectedOption.id !== `${step.id}_none` && (
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[140px]">
                          {selectedOption.price === 0 ? 'Бесплатно' : formatPrice(selectedOption.price)}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile Active Step Info */}
            <div className="md:hidden mt-4 flex flex-col items-center justify-center text-center">
               <div className="text-sm font-bold text-slate-800 bg-[#8cc63f]/10 text-[#8cc63f] px-4 py-1.5 rounded-full">
                 Шаг {currentStep + 1}: {STEPS[currentStep].shortTitle}
               </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:w-[70%] flex flex-col">
            <div className="p-6 sm:p-8 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-50 rounded-xl text-[#8cc63f]">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900">
                      {stepData.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {stepData.description}
                  </p>

                  <div className="space-y-3">
                    {stepData.options.map(option => {
                      const isSelected = selections[stepData.id] === option.id;
                      return (
                        <label 
                          key={option.id}
                          className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-[#8cc63f] bg-green-50/20' 
                              : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mr-3 sm:mr-4 transition-colors ${
                            isSelected ? 'border-[#8cc63f]' : 'border-slate-300'
                          }`}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#8cc63f]" />}
                          </div>
                          
                          <div className="flex-1 min-w-0 pr-2 sm:pr-4">
                            <div className={`text-sm sm:text-base font-medium break-words leading-tight ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                              {option.label}
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            {option.oldPrice && (
                              <div className="text-[10px] sm:text-xs text-slate-400 line-through mb-0.5">
                                {formatPrice(option.oldPrice)}
                              </div>
                            )}
                            <div className={`font-semibold text-sm sm:text-base whitespace-nowrap ${
                              isSelected ? 'text-[#8cc63f]' : 'text-slate-900'
                            } ${option.price === 0 && !option.id.endsWith('_none') ? 'text-[#8cc63f]' : ''}`}>
                              {option.id.endsWith('_none') ? '-' : formatPrice(option.price)}
                            </div>
                          </div>

                          <input 
                            type="radio" 
                            name={stepData.id} 
                            className="hidden"
                            checked={isSelected}
                            onChange={() => handleSelect(stepData.id, option.id)}
                          />
                        </label>
                      );
                    })}
                  </div>

                  {stepData.note && (
                    <div className="mt-6 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{stepData.note}</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Actions for Step */}
            <div className="px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                className={`text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
              >
                Назад
              </button>
              
              {currentStep < STEPS.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors"
                >
                  Далее <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-sm font-semibold text-[#8cc63f] flex items-center gap-2">
                  <Check className="w-4 h-4" /> Расчет завершен
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Floating Total Bar */}
        <div className="mt-6 bg-slate-900 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-6 w-full sm:w-auto">
            <div>
              <div className="text-slate-400 text-sm font-medium mb-1">Ориентировочная стоимость</div>
              <div className="flex items-end gap-3">
                {oldTotal > total && (
                  <span className="text-slate-500 line-through text-lg mb-0.5">
                    {formatPrice(oldTotal)}
                  </span>
                )}
                <span className="text-3xl sm:text-4xl font-semibold text-white">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
          
          <button onClick={() => openModal("Заявка из калькулятора ТО")} className="w-full sm:w-auto bg-[#8cc63f] hover:bg-[#7db435] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg active:scale-95">
            Оставить заявку
          </button>
        </div>

      </div>
    </section>
  );
}
