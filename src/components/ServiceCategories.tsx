import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useModal } from '../contexts/ModalContext';

const CATEGORIES = [
  {
    id: 'maintenance',
    title: 'Техническое обслуживание и ремонт',
    description: 'Регулярное техническое обслуживание и профессиональный ремонт автомобилей любых марок. Выполняем плановое ТО, замену масел и фильтров, а также сложные ремонты с соблюдением стандартов автопроизводителей.',
    image: '/service/maintenance.jpg'
  },
  {
    id: 'diagnostics',
    title: 'Диагностика',
    description: 'В сервисах «Прагматика Эксперт» представлено новейшее диагностическое оборудование. Выполняем компьютерную диагностику двигателя, подвески, КПП. По итогам предоставим подробный отчет и оптимальный план ремонта.',
    image: '/service/diagnostics.jpg'
  },
  {
    id: 'bodywork',
    title: 'Кузовной ремонт',
    description: 'Кузовные работы любой сложности: восстановление геометрии, малярные работы в профессиональных камерах, ремонт бамперов и пластика, замена стекол. Возвращаем автомобилю первозданный вид с гарантией качества.',
    image: '/service/bodywork.jpg'
  },
  {
    id: 'detailing',
    title: 'Детейлинг и мойка',
    description: 'Профессиональный уход за внешним видом и интерьером. Комплексная мойка, бережная химчистка салона, полировка кузова и оптики, нанесение защитных покрытий (керамика, жидкое стекло, антидождь).',
    image: '/service/detailing.jpg'
  },
  {
    id: 'equipment',
    title: 'Дополнительное оборудование',
    description: 'Профессиональная установка дополнительного оборудования: надежные охранные комплексы и автосигнализации, предпусковые подогреватели, шумоизоляция, мультимедийные системы. Гарантия на работы и оборудование.',
    image: '/service/equipment.jpg'
  },
  {
    id: 'tires',
    title: 'Шиномонтаж',
    description: 'Качественный шиномонтаж на современном оборудовании. Балансировка, ремонт проколов и порезов, сезонная смена колес. Также предлагаем услуги шинного отеля для правильного сезонного хранения вашей резины.',
    image: '/service/tires.jpg'
  }
];

export default function ServiceCategories() {
  const { openModal } = useModal();
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Автосервис",
    "provider": {
      "@type": "AutoRepair",
      "name": "Мультисервис Прагматика"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Направления работы автосервиса",
      "itemListElement": CATEGORIES.map((category, index) => ({
        "@type": "OfferCatalog",
        "position": index + 1,
        "name": category.title,
        "description": category.description
      }))
    }
  };

  return (
    <section id="categories" className="py-20 bg-slate-50">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 tracking-tight">
          Направления работы
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <div 
              key={category.id}
              onClick={() => openModal(`Запись на услугу: ${category.title}`)}
              className="relative rounded-2xl overflow-hidden h-[320px] sm:h-[350px] lg:h-[380px] group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ 
                  backgroundImage: `url(${category.image})`,
                  backgroundColor: '#e2e8f0' 
                }}
              />
              
              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500" />
              
              {/* Hover Darken Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 ease-out" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-0 group-hover:opacity-100">
                    <div className="overflow-hidden">
                      <p className="text-sm md:text-base text-slate-200 leading-relaxed pt-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
