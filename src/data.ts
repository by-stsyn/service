export const CITIES_DATA = [
  { slug: 'spb', name: 'Санкт-Петербург', sheetName: 'Санкт-Петербург', sheetGid: '0' },
  { slug: 'pskov', name: 'Псков', sheetName: 'Псков', sheetGid: '795610385' },
  { slug: 'ptz', name: 'Петрозаводск', sheetName: 'Петрозаводск', sheetGid: '1785193406' },
  { slug: 'murmansk', name: 'Мурманск', sheetName: 'Мурманск', sheetGid: '984608600' },
  { slug: 'vluki', name: 'Великие Луки', sheetName: 'Великие Луки', sheetGid: '669329624' },
  { slug: 'novgorod', name: 'Великий Новгород', sheetName: 'Великий Новгород', sheetGid: '1137674779' }
];

export const CITIES = CITIES_DATA.map(c => c.name);

export const SERVICES = [
  { id: 1, title: 'Замена масла', icon: 'Droplet' },
  { id: 2, title: 'Диагностика ходовой', icon: 'Search' },
  { id: 3, title: 'Шиномонтаж', icon: 'Settings' },
  { id: 4, title: 'Развал-схождение', icon: 'MoveHorizontal' },
  { id: 5, title: 'Замена ГРМ', icon: 'Cog' },
  { id: 6, title: 'Ремонт тормозной системы', icon: 'ShieldAlert' },
];

export const OFFERS = [
  { 
    id: 1, 
    title: 'Весеннее ТО', 
    description: 'Полная проверка автомобиля после зимы и замена технических жидкостей.', 
    oldPrice: '5000 ₽', 
    newPrice: '2990 ₽', 
    city: 'Санкт-Петербург' 
  },
  { 
    id: 2, 
    title: 'Бесплатная диагностика', 
    description: 'При ремонте ходовой части диагностика в подарок.', 
    oldPrice: '1500 ₽', 
    newPrice: '0 ₽', 
    city: 'Все города' 
  },
  { 
    id: 3, 
    title: 'Скидка на масло', 
    description: 'При покупке моторного масла и масляного фильтра работа по замене бесплатно.', 
    oldPrice: '1000 ₽', 
    newPrice: '0 ₽', 
    city: 'Мурманск' 
  },
];

export const ADDRESSES = [
  { 
    city: 'Санкт-Петербург', 
    phone: '8 800 551-19-67',
    addresses: [
      'Уральская ул., 33Б',
      'Малая Балканская ул., 57',
      'ул. Меркурьева, 6'
    ],
    mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A68f9ed39a68fafe4910b0fbaaf78ed278ec65c6a405f1ce42ff88a3bb095f980&source=constructor'
  },
  { 
    city: 'Псков', 
    phone: '8 800 551-19-67',
    addresses: ['ул. Леона Поземского, 112'],
    mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A1ec3efa572b3fc2d2c1632b7a2aeb500fd1cb13fa3b6aca4f1e0f707a72ec101&source=constructor'
  },
  { 
    city: 'Петрозаводск', 
    phone: '8 800 551-19-67',
    addresses: ['Комсомольский проспект, 8'],
    mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A24916bdac1b541be75c43b5ae47e2fce5454c522c97449f2cfc9ca03751ef31e&source=constructor'
  },
  { 
    city: 'Мурманск', 
    phone: '8 800 551-19-67',
    addresses: ['Кольский проспект, 110'],
    mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A100ac8c9e12b3b998a48613d2bfc06adf2ababf3a1ccbc7d08ea9ef76cb85454&source=constructor'
  },
  { 
    city: 'Великие Луки', 
    phone: '8 800 551-19-67',
    addresses: ['улица Гоголя, 4'],
    mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A4a07e8813ec6044729edaf2b94a5778b53b227b361b10cba5e9f4ef6c8009061&source=constructor'
  },
  { 
    city: 'Великий Новгород', 
    phone: '8 800 551-19-67',
    addresses: ['Московская улица, 57'],
    mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A53b77e63d6d681281c86918ff3914dc2833ade488a9acfc024097e9370a7489f&source=constructor'
  }
];
