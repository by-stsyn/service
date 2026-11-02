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
    title: 'Бесплатная проверка тех. состояния подвески а/м (ходовая)', 
    description: 'Оценим состояние элементов ходовой части, амортизаторов, колодок и дисков.', 
    oldPrice: '1500 ₽', 
    newPrice: '0 ₽', 
    city: 'Все' 
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

export interface AddressPoint {
  address: string;
  coords: [number, number];
}

export interface CityAddressData {
  city: string;
  phone: string;
  addresses: string[];
  center: [number, number];
  zoom: number;
  points: AddressPoint[];
}

export const ADDRESSES: CityAddressData[] = [
  { 
    city: 'Санкт-Петербург', 
    phone: '8 800 551-19-67',
    addresses: [
      'Уральская ул., 33Б',
      'Малая Балканская ул., 57',
      'ул. Меркурьева, 6'
    ],
    center: [59.955998, 30.335000],
    zoom: 10,
    points: [
      { address: 'Уральская ул., 33Б', coords: [59.955998, 30.238209] },
      { address: 'Малая Балканская ул., 57', coords: [59.828518, 30.426720] },
      { address: 'ул. Меркурьева, 6', coords: [60.072031, 30.340698] }
    ]
  },
  { 
    city: 'Псков', 
    phone: '8 800 551-19-67',
    addresses: ['ул. Леона Поземского, 112'],
    center: [57.835113, 28.310244],
    zoom: 16,
    points: [
      { address: 'ул. Леона Поземского, 112', coords: [57.835113, 28.310244] }
    ]
  },
  { 
    city: 'Петрозаводск', 
    phone: '8 800 551-19-67',
    addresses: ['Комсомольский проспект, 8'],
    center: [61.766718, 34.357442],
    zoom: 16,
    points: [
      { address: 'Комсомольский проспект, 8', coords: [61.766718, 34.357442] }
    ]
  },
  { 
    city: 'Мурманск', 
    phone: '8 800 551-19-67',
    addresses: ['Кольский проспект, 110'],
    center: [68.927992, 33.114111],
    zoom: 16,
    points: [
      { address: 'Кольский проспект, 110', coords: [68.927992, 33.114111] }
    ]
  },
  { 
    city: 'Великие Луки', 
    phone: '8 800 551-19-67',
    addresses: ['улица Гоголя, 4'],
    center: [56.360003, 30.566992],
    zoom: 16,
    points: [
      { address: 'улица Гоголя, 4', coords: [56.360003, 30.566992] }
    ]
  },
  { 
    city: 'Великий Новгород', 
    phone: '8 800 551-19-67',
    addresses: ['Московская улица, 57'],
    center: [58.534099, 31.319619],
    zoom: 16,
    points: [
      { address: 'Московская улица, 57', coords: [58.534099, 31.319619] }
    ]
  }
];

