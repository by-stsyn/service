const fs = require('fs');
let code = fs.readFileSync('src/components/BookingModal.tsx', 'utf8');

const oldHeader = `<h3 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight mb-2">
            Запись на сервис
          </h3>`;

const newHeader = `<h3 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight mb-2">
            {subject && subject !== 'Запись на сервис' && !subject.startsWith('Запись на услугу:') ? 'Запись на сервис' : getModalTitle()}
          </h3>`;

code = code.replace(oldHeader, newHeader);
fs.writeFileSync('src/components/BookingModal.tsx', code);
