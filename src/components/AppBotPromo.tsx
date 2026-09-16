import React from 'react';
import { 
  Smartphone, 
  BellRing, 
  CalendarClock, 
  Coins, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  ArrowUpRight, 
  Sparkles,
  Shield,
  Zap
} from 'lucide-react';

const ADVANTAGES = [
  {
    icon: CalendarClock,
    title: 'Запись за 30 секунд',
    desc: 'Записывайтесь на ТО или ремонт в любое время 24/7 без звонков оператору и ожидания на линии.'
  },
  {
    icon: BellRing,
    title: 'Статус ремонта онлайн',
    desc: 'Мгновенные уведомления о статусе работ: от заезда в бокс до готовности автомобиля к выдаче.'
  },
  {
    icon: Coins,
    title: 'Бонусы и эксклюзивные скидки',
    desc: 'Кешбэк баллами за каждый визит и закрытые спецпредложения, доступные только пользователям бота.'
  },
  {
    icon: FileText,
    title: 'Электронная сервисная книжка',
    desc: 'Вся история обслуживания, замененные детали, заказ-наряды и рекомендации мастера всегда в вашем телефоне.'
  },
  {
    icon: MessageSquare,
    title: 'Прямой чат с мастером',
    desc: 'Отправляйте фото или видео симптомов неисправности, согласуйте доп. работы в один клик без звонков.'
  },
  {
    icon: Zap,
    title: 'Умные напоминания',
    desc: 'Бот вовремя напомнит о плановом ТО, замене тормозных колодок и сезонной переобувке шин.'
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
            <span>Сервис в вашем смартфоне</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Управляйте обслуживанием через <br className="hidden sm:inline" />
            <span className="text-[#8cc63f]">Telegram-бота</span> и <span className="text-sky-400">приложение MAX</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Переходите в наши официальные каналы и получайте максимум удобства: запись без ожидания, статус ремонта в реальном времени и персональные скидки.
          </p>
        </div>

        {/* Channels Cards (Telegram & MAX) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
          
          {/* Telegram Card */}
          <div className="bg-slate-800/80 border border-slate-700/80 hover:border-[#8cc63f]/60 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#8cc63f]/10 relative group">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#229ED9]/20 border border-[#229ED9]/40 p-2.5 flex items-center justify-center flex-shrink-0">
                  <img 
                    src="/tg.png" 
                    alt="Telegram Бот Прагматика" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="20" fill="%23229ED9"/><path d="M9 19l19-8-6 17-5-5-4 4v-5l-4-3z" fill="white"/></svg>';
                    }}
                  />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Telegram Bot</span>
                  <h3 className="text-2xl font-bold text-white mt-0.5">@Pragmatikabot</h3>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#8cc63f] bg-[#8cc63f]/15 border border-[#8cc63f]/30 px-3 py-1 rounded-full uppercase">
                Все марки авто
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
              Быстрый умный бот в привычном мессенджере. Работает прямо в Telegram — ничего дополнительно устанавливать не требуется.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-700/60">
              <a 
                href="https://t.me/Pragmatikabot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 text-sm sm:text-base"
              >
                <span>Запустить бота в Telegram</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-400 text-center sm:text-left">
                ⚡ Мгновенный запуск за 1 клик
              </span>
            </div>
          </div>

          {/* MAX App Card */}
          <div className="bg-slate-800/80 border border-slate-700/80 hover:border-sky-400/60 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 relative group">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 p-2.5 flex items-center justify-center flex-shrink-0">
                  <img 
                    src="/max.png" 
                    alt="Приложение MAX" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" rx="10" fill="%230ea5e9"/><text x="20" y="26" font-family="sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">MAX</text></svg>';
                    }}
                  />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8cc63f]">Мобильный сервис</span>
                  <h3 className="text-2xl font-bold text-white mt-0.5">Приложение MAX</h3>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 bg-sky-500/15 border border-sky-500/30 px-3 py-1 rounded-full uppercase">
                Личный кабинет
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
              Фирменная экосистема MAX для автовладельцев: расширенная сервисная книжка, электронные чеки, акции и удобный интерфейс.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-700/60">
              <a 
                href="https://max.ru/id7816561934_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#8cc63f] hover:bg-[#7db435] text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 text-sm sm:text-base"
              >
                <span>Перейти в приложение MAX</span>
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
              Что дает вам подключение?
            </h3>
            <p className="text-sm sm:text-base text-slate-400">
              6 ключевых преимуществ для каждого автовладельца
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
              <span>Никакого спама — только важные уведомления о статусе вашего автомобиля.</span>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href="https://t.me/Pragmatikabot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-[#8cc63f] hover:underline flex items-center gap-1"
              >
                Подключить Telegram →
              </a>
              <span className="text-slate-600">•</span>
              <a 
                href="https://max.ru/id7816561934_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-sky-400 hover:underline flex items-center gap-1"
              >
                Подключить MAX →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
