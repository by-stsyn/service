import { ShieldCheck, Users, Map, CheckCircle2, Wrench, Shield, ThumbsUp } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
            Надежный сервис, <br className="hidden sm:block" />
            <span className="text-[#8cc63f]">проверенный временем</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Мы объединили 20-летний опыт, современное оборудование и прозрачный подход, 
            чтобы создать сервис, которому вы можете безоговорочно доверить свой автомобиль.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-min">
          {/* 1. Опыт (Big) */}
          <div className="md:col-span-2 lg:col-span-2 bg-slate-900 p-6 sm:p-10 rounded-xl text-white flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative z-10">
              <ShieldCheck className="w-12 h-12 text-[#8cc63f] mb-6" />
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl sm:text-7xl font-black tracking-tighter">20</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#8cc63f] uppercase tracking-tight">лет</span>
              </div>
              <div className="text-xl font-bold uppercase tracking-wide text-slate-300">успешной работы</div>
              <p className="mt-4 text-slate-400 font-medium max-w-sm">
                Два десятилетия мы непрерывно совершенствуем наши навыки и стандарты обслуживания.
              </p>
            </div>
            {/* Background decoration */}
            <Shield className="absolute -right-12 -bottom-12 w-64 h-64 text-white/[0.03] transform -rotate-12 group-hover:scale-110 transition-transform duration-700" />
          </div>

          {/* 2. Клиенты */}
          <div className="bg-slate-50 border border-slate-100 p-6 sm:p-10 rounded-xl flex flex-col justify-center hover:border-slate-200 transition-colors">
            <Users className="w-10 h-10 text-[#8cc63f] mb-6" />
            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2">6000+</div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">довольных<br/>клиентов</div>
          </div>

          {/* 3. Центры */}
          <div className="bg-slate-50 border border-slate-100 p-6 sm:p-10 rounded-xl flex flex-col justify-center hover:border-slate-200 transition-colors">
            <Map className="w-10 h-10 text-[#8cc63f] mb-6" />
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">5<span className="text-[#8cc63f]">+</span>5</span>
            </div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">сервисных центров<br/>в СПб и регионах</div>
          </div>

          {/* 4. Честность */}
          <div className="md:col-span-3 lg:col-span-2 bg-slate-50 border border-slate-100 p-6 sm:p-10 rounded-xl flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center hover:border-slate-200 transition-colors">
            <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[#8cc63f]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 uppercase tracking-tight">Абсолютная прозрачность</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Честные цены без скрытых накруток. Мы всегда согласовываем стоимость до начала работ. Вы можете лично присутствовать в ремонтной зоне и наблюдать за процессом.
              </p>
            </div>
          </div>

          {/* 5. Любые авто */}
          <div className="bg-[#8cc63f]/10 border border-[#8cc63f]/20 p-6 sm:p-10 rounded-xl flex flex-col justify-between hover:bg-[#8cc63f]/20 transition-colors">
            <div>
              <Wrench className="w-10 h-10 text-[#8cc63f] mb-6" />
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 uppercase tracking-tight">Любые авто</h3>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                Обслуживаем все марки. В наличии оригинальные запчасти и проверенные качественные аналоги.
              </p>
            </div>
          </div>

          {/* 6. Гарантия */}
          <div className="bg-slate-50 border border-slate-100 p-6 sm:p-10 rounded-xl flex flex-col justify-between hover:border-slate-200 transition-colors">
            <div>
              <ThumbsUp className="w-10 h-10 text-[#8cc63f] mb-6" />
              <h3 className="text-xl font-extrabold text-slate-900 mb-3 uppercase tracking-tight">Гарантия</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Мы уверены в своей экспертизе и предоставляем документальную гарантию на все выполненные работы.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
