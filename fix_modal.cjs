const fs = require('fs');
let code = fs.readFileSync('src/components/BookingModal.tsx', 'utf8');

const titleLogic = `  const getModalTitle = () => {
    const formatService = (service: string) => {
      const s = service.toLowerCase();
      if (s === 'диагностика') return 'диагностику';
      if (s === 'дополнительное оборудование') return 'установку дополнительного оборудования';
      if (s === 'детейлинг и мойка') return 'детейлинг и мойку';
      return s;
    };
    if (selectedService) {
      if (selectedService === 'Запись на сервис' || selectedService === 'Другое') {
        return 'Запись на сервис';
      }
      return \`Запись на \${formatService(selectedService)}\`;
    }
    if (subject) {
      if (subject.startsWith('Запись на услугу: ')) {
        return \`Запись на \${formatService(subject.replace('Запись на услугу: ', ''))}\`;
      }
      return subject;
    }
    return 'Записаться на сервис';
  };`;

const newTitleLogic = `  const getModalTitle = () => {
    return 'Запись на сервис';
  };`;

code = code.replace(titleLogic, newTitleLogic);

// Now for the rendering part
const renderTitle = `<h3 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight mb-8">
            {getModalTitle()}
          </h3>`;

const newRenderTitle = `<h3 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight mb-2">
            Запись на сервис
          </h3>
          {subject && subject !== 'Запись на сервис' && !subject.startsWith('Запись на услугу:') ? (
            <p className="text-lg md:text-xl text-[#8cc63f] font-medium mb-6 leading-tight">
              По акции: {subject}
            </p>
          ) : (
            <div className="mb-6"></div>
          )}`;

code = code.replace(renderTitle, newRenderTitle);

// Also we should send the subject details in the form.
const formTag = `<form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="Source" value="Заявка с сайта (Модальное окно)" />`;
const newFormTag = `<form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="Source" value="Заявка с сайта (Модальное окно)" />
            {subject && subject !== 'Запись на сервис' && (
              <input type="hidden" name="Special_Offer" value={subject} />
            )}`;

code = code.replace(formTag, newFormTag);

fs.writeFileSync('src/components/BookingModal.tsx', code);
