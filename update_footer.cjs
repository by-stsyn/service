const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const replacement = `          <div className="flex flex-col gap-6">
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
               
               <div className="flex items-center gap-4 mt-2">
                 <a href="https://t.me/Pragmatikabot" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                   <img src="/tg.png" alt="Telegram" className="w-8 h-8 object-contain" />
                 </a>
                 <a href="https://max.ru/id7816561934_bot" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                   <img src="/max.png" alt="Max" className="w-8 h-8 object-contain" />
                 </a>
               </div>
             </div>
          </div>`;

const search = `          <div className="flex flex-col gap-6">
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
          </div>`;

code = code.replace(search, replacement);
fs.writeFileSync('src/components/Footer.tsx', code);
