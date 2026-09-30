import React from 'react';
import { 
  CalendarClock, 
  CreditCard, 
  Tag, 
  Car,
  ShieldCheck,
  Newspaper,
  ArrowUpRight, 
  Sparkles,
  Shield,
  Check
} from 'lucide-react';

const ADVANTAGES = [
  {
    icon: CalendarClock,
    title: 'Запись на точное время',
    desc: 'Выбирайте филиал, мастера и удобный часовой слот прямо в интерактивном расписании без звонков и ожидания.'
  },
  {
    icon: Car,
    title: 'Покупка новых авто',
    desc: 'Каталог новых автомобилей в наличии от официального дилера: комплектации, актуальные цены и бронирование онлайн.'
  },
  {
    icon: ShieldCheck,
    title: 'Автомобили с пробегом',
    desc: 'Проверенные авто с пробегом с полной диагностической картой, юридической чистотой и бронью в один клик.'
  },
  {
    icon: CreditCard,
    title: 'Виртуальная бонусная карта',
    desc: 'Оформление бонусной карты в 1 клик прямо в Mini App. Копите кешбэк баллами с каждого визита и оплачивайте ими до 30% услуг.'
  },
  {
    icon: Tag,
    title: 'Акции и спецпредложения',
    desc: 'Мгновенная проверка действующих акций, сезонных скидок на ТО, шиномонтаж и покупку авто, а также закрытых спецпредложений.'
  },
  {
    icon: Newspaper,
    title: 'Новости и события',
    desc: 'Свежие новости автохолдинга, полезные статьи для автовладельцев, анонсы сервисных кампаний и новинок автопрома.'
  }
];

export default function AppBotPromo() {
  return (
    <section id="apps" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden flex-shrink-0">
      
      {/* Decorative background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#8cc63f]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8cc63f]/20 border border-[#8cc63f]/40 text-[#8cc63f] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Mini Apps нового поколения</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Управляйте сервисом и покупкой авто в <br className="hidden sm:inline" />
            <span className="text-[#8cc63f]">Mini Apps</span> в Telegram и MAX
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Полноценные удобные приложения прямо внутри Telegram и MAX: запись на сервис на точное время, покупка новых авто и автомобилей с пробегом, свежие новости, акции и выпуск бонусной карты.
          </p>
        </div>

        {/* Channels Cards (Telegram & MAX Mini Apps) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
          
          {/* Telegram Mini App Card */}
          <div className="bg-slate-800/80 border border-slate-700/80 hover:border-[#8cc63f]/60 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#8cc63f]/10 relative group">
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#229ED9]/20 border border-[#229ED9]/40 p-2.5 flex items-center justify-center flex-shrink-0">
                    <img 
                      src="/tg.png" 
                      alt="Telegram Mini App Прагматика" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="20" fill="%23229ED9"/><path d="M9 19l19-8-6 17-5-5-4 4v-5l-4-3z" fill="white"/></svg>';
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Telegram Mini App</span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">@Pragmatikabot</h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8cc63f] bg-[#8cc63f]/15 border border-[#8cc63f]/30 px-3 py-1 rounded-full uppercase">
                  Mini App
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 mb-5 leading-relaxed">
                Полнофункциональное мини-приложение прямо внутри Telegram. Без лишних скачиваний и регистраций — открывается моментально в один клик.
              </p>

              {/* Feature Highlights Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-slate-200">
                <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/60 rounded-xl px-3 py-2">
                  <Check className="w-4 h-4 text-[#8cc63f] shrink-0" />
                  <span>Запись на точное время</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/60 rounded-xl px-3 py-2">
                  <Check className="w-4 h-4 text-[#8cc63f] shrink-0" />
                  <span>Новые авто и с пробегом</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/60 rounded-xl px-3 py-2">
                  <Check className="w-4 h-4 text-[#8cc63f] shrink-0" />
                  <span>Оформление бонусной карты</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/60 rounded-xl px-3 py-2">
                  <Check className="w-4 h-4 text-[#8cc63f] shrink-0" />
                  <span>Новости и актуальные акции</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-700/60">
              <a 
                href="https://t.me/Pragmatikabot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 text-sm sm:text-base"
              >
                <span>Открыть Mini App в Telegram</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-400 text-center sm:text-left">
                ⚡ Мгновенный запуск за 1 секунду
              </span>
            </div>
          </div>

          {/* MAX Mini App Card */}
          <div className="bg-slate-800/80 border border-slate-700/80 hover:border-sky-400/60 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 relative group">
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 p-2.5 flex items-center justify-center flex-shrink-0">
                    <img 
                      src="/max.png" 
                      alt="Mini App MAX" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" rx="10" fill="%230ea5e9"/><text x="20" y="26" font-family="sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">MAX</text></svg>';
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8cc63f]">MAX Mini App</span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">Приложение MAX</h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 bg-sky-500/15 border border-sky-500/30 px-3 py-1 rounded-full uppercase">
                  Mini App
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 mb-5 leading-relaxed">
                Интерактивное Mini App в приложении MAX для автовладельцев: быстрый выбор точного времени записи, покупка новых авто и с пробегом, бонусная карта, новости и акции.
              </p>

              {/* Feature Highlights Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs text-slate-200">
                <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/60 rounded-xl px-3 py-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Запись на точное время</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/60 rounded-xl px-3 py-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Новые авто и с пробегом</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/60 rounded-xl px-3 py-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Бонусная карта и кешбэк</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/60 rounded-xl px-3 py-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Свежие акции и новости</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-700/60">
              <a 
                href="https://max.ru/id7816561934_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#8cc63f] hover:bg-[#7db435] text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 text-sm sm:text-base"
              >
                <span>Открыть Mini App в MAX</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-400 text-center sm:text-left">
                📲 Удобно на iOS и Android
              </span>
            </div>
          </div>

        </div>

        {/* Benefits Grid */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Что дают вам наши Mini Apps?
            </h3>
            <p className="text-sm sm:text-base text-slate-400">
              Все сервисы и возможности автохолдинга прямо в вашем смартфоне
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ADVANTAGES.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#8cc63f]/15 border border-[#8cc63f]/30 flex items-center justify-center shrink-0 text-[#8cc63f]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1.5">
                      {adv.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar: Trust & Guarantee */}
          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm">
              <Shield className="w-5 h-5 text-[#8cc63f] shrink-0" />
              <span>Запись на сервис, покупка авто, бонусная карта, новости и акции — в один клик без лишних звонков.</span>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href="https://t.me/Pragmatikabot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-[#8cc63f] hover:underline flex items-center gap-1"
              >
                Telegram Mini App →
              </a>
              <span className="text-slate-600">•</span>
              <a 
                href="https://max.ru/id7816561934_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-sky-400 hover:underline flex items-center gap-1"
              >
                MAX Mini App →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
