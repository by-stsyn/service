import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const REVIEWS = [
  {
    id: 1,
    name: 'Алексей',
    car: 'Toyota Camry',
    date: '18 июля 2026',
    text: 'Готовил машину к дальней поездке на юг. Попросил проверить вообще всё. Мастера не стали придумывать несуществующие поломки, как это часто бывает. Нашли только надорванный пыльник ШРУСа и посоветовали поменять тормозную жидкость (по прибору показала влагу). Сделали всё быстро, цены более чем гуманные. Съездили отлично, машина не подвела!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Анна',
    car: 'Mazda CX-5',
    date: '5 апреля 2026',
    text: 'Перестала нормально дуть печка, окна потели жутко. Заехала сюда по пути с работы. Думала, оставлю машину на пару дней, а ребята просто поменяли салонный фильтр, который был забит наглухо, и сделали антибактериальную обработку. Заняло 40 минут! Спасибо за честность и оперативность.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Александр',
    car: 'Volkswagen Tiguan',
    date: '12 марта 2026',
    text: 'Приехал по рекомендации друга на диагностику ходовой, так как что-то стучало спереди справа. Мастер приемщик Игорь все внимательно выслушал. В ремзону пустили без проблем, показали люфт в шаровой. Запчасти оказались в наличии (предложили на выбор оригинал и хороший аналог Lemforder). Ничего лишнего не навязывали, цены адекватные. Теперь буду обслуживаться только здесь.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Илья',
    car: 'BMW 3 Series',
    date: '20 ноября 2025',
    text: 'Делал полную аппаратную замену масла в АКПП. Долго выбирал сервис, так как процедура ответственная. Ребята используют правильное оборудование, масло залили оригинал, поддон с фильтром поменяли аккуратно. Коробка стала переключаться идеально плавно, пинки пропали. Однозначно рекомендую.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Екатерина',
    car: 'Kia Rio',
    date: '14 августа 2025',
    text: 'Долго искала нормальный сервис, где к девушкам не относятся снисходительно и не пытаются развести на ненужные работы. Приехала на обычное ТО (масло, фильтры). Мастер все четко объяснил, показал старые фильтры, дал рекомендации по колодкам (сказал, что еще тысяч 5 поездят, менять пока рано - вот это прям подкупило!). Пока ждала, попила вкусный кофе в клиентской зоне.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Михаил',
    car: 'Skoda Octavia',
    date: '9 февраля 2025',
    text: 'Обратился с проблемой по электрике - периодически вылезала ошибка EPC и машина переставала ехать. В двух других местах просто сбрасывали ошибку и разводили руками. Здесь электрик ковырялся часа два, но нашел перетертый провод в косе под капотом. Спаяли, заизолировали, взяли копейки. Огромное спасибо за профессионализм и дотошность! Реально выручили.',
    rating: 5,
  },
  {
    id: 7,
    name: 'Денис',
    car: 'Hyundai Solaris',
    date: '15 октября 2024',
    text: 'Хороший профильный сервис. Менял цепь ГРМ. Записался заранее, приехал к назначенному времени - сразу загнали на подъемник. Сделали аккуратно, старые запчасти сложили в багажник, показали, что натяжитель уже был на пределе. Дали гарантию на работы. Работают прозрачно, цены не меняются в процессе ремонта.',
    rating: 5,
  },
  {
    id: 8,
    name: 'Светлана',
    car: 'Renault Duster',
    date: '2 декабря 2023',
    text: 'Проходила здесь комплексную подготовку к зиме. Очень понравилось отношение персонала - вежливые, опрятные. Сделали диагностику, поменяли антифриз и масло. Особенно хочу отметить чистоту в ремзоне - прям приятно посмотреть. Отдали машину ровно в то время, которое обещали. Буду рекомендовать знакомым.',
    rating: 5,
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-slate-50 flex-shrink-0 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#8cc63f]/5 skew-x-12 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-slate-200/20 -skew-x-12 -translate-x-1/2"></div>
      
      <div className="px-4 sm:px-8 max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
            Истории <span className="text-[#8cc63f]">наших клиентов</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            Мы не просто чиним автомобили, мы решаем проблемы. Почитайте реальные отзывы людей, которые доверили нам свои авто.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden bg-white rounded-xl shadow-xl border border-slate-100 min-h-[400px] sm:min-h-[350px] relative">
            <Quote className="absolute top-8 right-8 w-24 h-24 text-slate-50 opacity-50 z-0" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-6 sm:p-12 h-full flex flex-col relative z-10"
              >
                <div className="flex flex-col sm:flex-row gap-6 mb-8 items-start sm:items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-2xl mb-1">{REVIEWS[currentIndex].name}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#8cc63f] bg-[#8cc63f]/10 px-3 py-1 rounded-xl uppercase tracking-wider">
                        {REVIEWS[currentIndex].car}
                      </span>
                      <span className="text-sm text-slate-400 font-medium">{REVIEWS[currentIndex].date}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-slate-700 text-lg sm:text-xl leading-relaxed font-medium italic flex-grow">
                  "{REVIEWS[currentIndex].text}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#8cc63f] hover:border-[#8cc63f] hover:shadow-md transition-all active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-3">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-xl transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'bg-[#8cc63f] w-10' 
                      : 'bg-slate-300 w-2.5 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#8cc63f] hover:border-[#8cc63f] hover:shadow-md transition-all active:scale-95"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
