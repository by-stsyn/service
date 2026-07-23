import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQ_ITEMS = [
  {
    question: 'Даете ли вы гарантию на выполненные работы?',
    answer: 'Да, мы предоставляем официальную гарантию на все виды работ и установленные запчасти, приобретенные в нашем сервисе. Срок гарантии зависит от вида работ и типа запчастей, но не менее 6 месяцев.'
  },
  {
    question: 'Можно ли приехать со своими запчастями?',
    answer: 'Да, вы можете приехать со своими запчастями. Однако в этом случае гарантия будет распространяться только на выполненные работы, но не на сами детали.'
  },
  {
    question: 'Сколько времени занимает стандартное ТО?',
    answer: 'Стандартное техническое обслуживание (замена масла, фильтров, диагностика ходовой) обычно занимает от 1 до 2 часов. Точное время зависит от марки автомобиля и перечня дополнительных работ.'
  },
  {
    question: 'Можно ли присутствовать в ремонтной зоне?',
    answer: 'Да, вы можете находиться рядом с вашим автомобилем во время ремонта, соблюдая технику безопасности. Также у нас есть комфортная зона ожидания с панорамными окнами в цех.'
  },
  {
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем наличные, банковские карты (Visa, Mastercard, Мир), а также работаем по безналичному расчету с юридическими лицами с предоставлением всех закрывающих документов.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white flex-shrink-0 border-t border-slate-100">
      <div className="px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight uppercase">
            Ответы на ваши вопросы
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Собрали самые популярные вопросы от наших клиентов
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div 
              key={index} 
              className={`border rounded-xl transition-colors ${openIndex === index ? 'border-[#8cc63f] bg-green-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-900 group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-base sm:text-lg pr-8">{item.question}</span>
                <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-xl transition-colors ${openIndex === index ? 'bg-[#8cc63f] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed font-medium">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
