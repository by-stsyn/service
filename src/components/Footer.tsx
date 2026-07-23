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

export default function Footer() {
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
          <p className="text-[11px] leading-relaxed text-slate-400 text-justify mb-6">
            Обращаем Ваше внимание на то, что вся представленная на сайте информация, касающаяся стоимости ремонта, сервисного обслуживания автомобилей, запасных частей, а также действующих акций, сроков и условий их проведения (указанных на сайте pragmatika-service.ru), носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями пункта 2 статьи 437 Гражданского кодекса Российской Федерации. Для получения подробной информации, пожалуйста, обращайтесь к специалистам нашей компании.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 uppercase tracking-wider">
            <p>
              © {new Date().getFullYear()} ГК Прагматика. Официальный дилер.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#8cc63f] transition-colors">Политика конфиденциальности</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
