import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Алексей',
    car: 'Volkswagen Tiguan',
    date: '12 мая 2024',
    dateIso: '2024-05-12',
    text: 'Отличный сервис. Делал здесь большое ТО-60000. Все по регламенту, запчасти оригинальные в наличии (не пришлось самому бегать искать). Цены адекватные, лишнего не навязывают. Мастер-приемщик Александр всё подробно объяснил и показал старые детали после замены.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Елена',
    car: 'Kia Rio',
    date: '28 апреля 2024',
    dateIso: '2024-04-28',
    text: 'Очень довольна! Быстро нашли причину стука в подвеске (оказалась стойка стабилизатора). Поменяли за час, пока ждала, попила вкусный кофе в клиентской зоне.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Михаил',
    car: 'Skoda Octavia',
    date: '9 февраля 2024',
    dateIso: '2024-02-09',
    text: 'Обратился с проблемой по электрике - вылезала ошибка EPC. В других местах разводили руками. Здесь электрик ковырялся два часа, нашел перетертый провод под капотом. Огромное спасибо за профессионализм!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Денис',
    car: 'Hyundai Solaris',
    date: '15 октября 2023',
    dateIso: '2023-10-15',
    text: 'Хороший профильный сервис. Менял цепь ГРМ. Приехал к назначенному времени - сразу загнали на подъемник. Сделали аккуратно, дали гарантию. Работают прозрачно, цены не меняются в процессе ремонта.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Светлана',
    car: 'Renault Duster',
    date: '2 декабря 2023',
    dateIso: '2023-12-02',
    text: 'Проходила здесь подготовку к зиме. Очень понравилось отношение персонала - вежливые, опрятные. Отдали машину ровно в то время, которое обещали. Буду рекомендовать знакомым.',
    rating: 5,
  }
];

export default function Reviews() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Мультисервис Прагматика",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128"
    },
    "review": REVIEWS.map(r => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.name
      },
      "datePublished": r.dateIso,
      "reviewBody": r.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": String(r.rating)
      }
    }))
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white flex-shrink-0 relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#8cc63f]/5 skew-x-12 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-slate-100/50 -skew-x-12 -translate-x-1/2"></div>
      
      <div className="px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
            Отзывы <span className="text-[#8cc63f]">клиентов</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            Мы дорожим своей репутацией и делаем всё, чтобы каждый клиент остался доволен качеством обслуживания.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white border border-slate-200 px-6 sm:px-8 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-4xl text-slate-900 leading-none tracking-tighter">4.9</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-[#FFCC00] text-[#FFCC00]" />
                  ))}
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-200"></div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-base font-extrabold text-slate-900">Яндекс Карты</span>
                <span className="text-sm text-slate-500 font-medium">На основе 120+ оценок</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative p-8 sm:p-10 rounded-3xl border border-slate-200 bg-slate-50 hover:bg-white shadow-sm hover:shadow-xl hover:border-[#8cc63f]/30 transition-all duration-300 flex flex-col group ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <Quote className="absolute top-8 right-8 w-16 h-16 text-slate-200/60 group-hover:text-[#8cc63f]/10 transition-colors duration-300 rotate-12 z-0" />
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className={`text-slate-700 leading-relaxed mb-10 flex-grow relative z-10 italic font-medium ${
                idx === 0 ? 'text-xl sm:text-2xl' : 'text-lg'
              }`}>
                "{review.text}"
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-200/80 pt-6 gap-4 relative z-10 mt-auto">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg mb-1">{review.name}</h4>
                  <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{review.date}</span>
                </div>
                <div className="text-sm font-bold text-[#8cc63f] bg-[#8cc63f]/10 px-4 py-2 rounded-xl uppercase tracking-wider text-center">
                  {review.car}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
