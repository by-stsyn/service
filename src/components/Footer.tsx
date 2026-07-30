const NAV_LINKS = [
  { label: 'Главная', href: '#home' },
  { label: 'Услуги и цены', href: '#services' },
  { label: 'Акции', href: '#offers' },
  { label: 'Калькулятор ТО', href: '#calculator' },
  { label: 'О нас', href: '#about' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Вопросы-Ответы', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

const GENERAL_DISCLAIMER = "Данный Интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Информация о действующих акциях, сроках и условиях их проведения носит информационный характер. Стоимость услуг, указанных на сайте, может отличаться. Стоимость услуг указана за работы без учета стоимости зап.частей. Для получения подробной информации обращайтесь к сотрудникам компании.";

const CITY_LEGAL_INFO: Record<string, string[]> = {
  'Санкт-Петербург': [
    'г. Санкт-Петербург, Малая Балканская ул., д.57Б Дилерский центр "Прагматика Kia Купчино": АО "ПЛТ", ИНН 7816047126, ОГРН 1037835021113. Юридический адрес: 192289, Санкт-Петербург г, Малая Балканская ул, дом № 57. Дилерский центр "Прагматика Лада Купчино": ООО "Прагматика Лада", ИНН: 7816716659, ОГРН: 1217800056286. Юридический адрес: 192289, Санкт-Петербург г, Малая Балканская ул, дом № 57, корпус В.',
    'г. Санкт-Петербург, ул. Меркурьева, 6 (ООО "АВТОЦЕНТР ПАРНАС", ИНН 7802914957, ОГРН 1217800146651. Юридический адрес: 194358, Санкт-Петербург г, Парголово п, 4-й Верхний пер, дом № 1 А, корпус А).',
    'г. Санкт-Петербург, Уральская ул., д.33Б Дилерский центр "Прагматика Лада" (Васильевский остров): ООО "Прагматика", ИНН: 7801288506, ОГРН: 1157847303140. Юридический адрес: 199155, Санкт-Петербург г, Уральская ул, дом № 33, корпус Б. Дилерский центр "Прагматика Kia" (Васильевский остров): ООО «Василеостровский Автоцентр», ОГРН 1217800195964, ИНН 7801707718. Юридический адрес: 199155, г. Санкт-Петербург, ул. Уральская, д.35, лит. А, пом.48'
  ],
  'Великие Луки': [
    'г. Великие Луки, ул. Гоголя, д.4 (филиал ООО "Псков-Лада" Великие Луки, ИНН 6027196721. Почтовый индекс: 182115, Псковская обл, Великие Луки г, Гоголя ул, дом 4).'
  ],
  'Псков': [
    'г. Псков, ул. Леона Поземского, 112 (ООО «Псков Лада», ОГРН:1196027002214, ИНН 6027196721. Юридический адрес: 180024, г. Псков, Рижский проспект д. 82, пом.3. Почтовый адрес: 180020, г. Псков, ул. Леона Поземского д.112).'
  ],
  'Великий Новгород': [
    'г. Великий Новгород, Московская ул., д. 57 (ООО «Новгород-Лада», ИНН 5321198672, ОГРН 1195321002029, адрес: 173020,Великий Новгород, ул. Московская, 57).'
  ],
  'Мурманск': [
    'г. Мурманск, Кольский пр., д.110 (ООО «Прагматика Лада», ОГРН 1217800056286, ИНН/КПП 7816716659/781601001. Юридический адрес: 192289, г. Санкт-Петербург, ул. Малая Балканская, д. 57, лит. В, пом. 11 Обособленное подразделение ООО «Прагматика Лада» г. Мурманск, КПП 519045001. Адрес: 183052, г. Мурманск, Кольский пр-т, д. 110).'
  ],
  'Петрозаводск': [
    'г. Петрозаводск, Комсомольский пр., 8 (ООО «Петрозаводск-Лада», ИНН 1001340114, ОГРН 1191001002830. 185026 г. Петрозаводск, Комсомольский пр. 8).'
  ]
};

export default function Footer({ currentCity }: { currentCity?: any }) {
  const cityLegalTexts = currentCity?.name ? CITY_LEGAL_INFO[currentCity.name] : [];

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto flex-shrink-0 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Logo and Description */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <img 
              src="/logo.png" 
              alt="Прагматика" 
              className="h-8 object-contain w-[140px] object-left"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="24"><rect width="60" height="24" fill="%23f1f5f9" rx="4"/><text x="30" y="16" font-family="sans-serif" font-size="10" font-weight="bold" fill="%2364748b" text-anchor="middle">LOGO</text></svg>';
              }} 
            />
            <p className="text-sm text-slate-500 leading-relaxed">
              Мультибрендовый автосервис «Прагматика». Профессиональный ремонт и техническое обслуживание автомобилей любой сложности с гарантией качества.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Навигация</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-500 hover:text-[#8cc63f] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">О компании</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.slice(4).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-500 hover:text-[#8cc63f] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contacts Summary */}
          <div className="flex flex-col gap-6">
             <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Контакты</h3>
             <div className="flex flex-col gap-4 text-sm text-slate-500">
               <p>
                 <a href="tel:88005511967" className="ct-phone font-bold text-slate-900 text-lg hover:text-[#8cc63f] transition-colors">8 800 551-19-67</a>
                 <br />
                 Ежедневно с 09:00 до 21:00
               </p>
               <p>
                 <a href="mailto:info@pragmatika-service.ru" className="hover:text-[#8cc63f] transition-colors">info@pragmatika-service.ru</a>
               </p>
             </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-8 border-t border-slate-200">
          <p className="text-[11px] leading-relaxed text-slate-400 text-justify mb-2">
            {GENERAL_DISCLAIMER}
          </p>
          {cityLegalTexts && cityLegalTexts.length > 0 && (
            <div className="flex flex-col gap-1 mb-6 text-[10px] leading-relaxed text-slate-400 text-justify">
              {cityLegalTexts.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 uppercase tracking-wider">
            <p>
              © {new Date().getFullYear()} ГК Прагматика. Официальный дилер.
            </p>
            <div className="flex gap-4">
              <a href="/service.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#8cc63f] transition-colors">Политика конфиденциальности</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
