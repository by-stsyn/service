import React, { useState, useEffect, useMemo } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';
import { useToast } from '../contexts/ToastContext';
import PhoneInput from './PhoneInput';
import { ADDRESSES } from '../data';
import {
  WEB3FORMS_ACCESS_KEY,
  sendCalltouchLead,
  reachMetrikaGoal,
  isValidRussianPhone,
  getLocalDateString
} from '../utils/analytics';

const BASE_SERVICES = [
  'Техническое обслуживание и ремонт',
  'Диагностика',
  'Кузовной ремонт',
  'Детейлинг и мойка',
  'Дополнительное оборудование',
  'Шиномонтаж',
  'Другое'
];

export default function BookingModal({ currentCity }: { currentCity?: any }) {
  const { isModalOpen, closeModal, subject } = useModal();
  const { showToast } = useToast();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedService, setSelectedService] = useState('');

  // Determine whether the modal was opened for a specific service, category, or special offer
  const parsedContext = useMemo(() => {
    if (!subject || subject === 'Запись на сервис' || subject === 'Быстрая запись на сервис') {
      return { type: 'general' as const, label: '' };
    }
    if (subject.startsWith('Запись на услугу: ')) {
      return {
        type: 'service' as const,
        label: subject.replace('Запись на услугу: ', '').trim()
      };
    }
    if (subject.startsWith('Запись на категорию: ')) {
      return {
        type: 'category' as const,
        label: subject.replace('Запись на категорию: ', '').trim()
      };
    }
    return { type: 'offer' as const, label: subject.trim() };
  }, [subject]);

  // Dynamic options list including custom service/category if passed from price list
  const serviceOptions = useMemo(() => {
    if (
      (parsedContext.type === 'service' || parsedContext.type === 'category') &&
      parsedContext.label &&
      !BASE_SERVICES.includes(parsedContext.label)
    ) {
      return [parsedContext.label, ...BASE_SERVICES];
    }
    return BASE_SERVICES;
  }, [parsedContext]);

  useEffect(() => {
    if (isModalOpen) {
      setStatus('idle');
      setErrorMessage('');
      if (parsedContext.type === 'service' || parsedContext.type === 'category') {
        setSelectedService(parsedContext.label);
      } else {
        setSelectedService('');
      }
    }
  }, [isModalOpen, parsedContext]);

  const getModalTitle = () => {
    const formatService = (service: string) => {
      const s = service.toLowerCase();
      if (s === 'диагностика') return 'диагностику';
      if (s === 'дополнительное оборудование') return 'установку дополнительного оборудования';
      if (s === 'детейлинг и мойка') return 'детейлинг и мойку';
      return s;
    };

    if (parsedContext.type === 'offer') {
      return 'Запись на сервис';
    }
    if (selectedService && BASE_SERVICES.includes(selectedService)) {
      if (selectedService === 'Другое') return 'Запись на сервис';
      return `Запись на ${formatService(selectedService)}`;
    }
    return 'Запись на сервис';
  };

  if (!isModalOpen) return null;

  const currentAddresses = currentCity
    ? ADDRESSES.find(a => a.city === currentCity.name)?.addresses || []
    : [];

  const todayDateStr = getLocalDateString(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get('phone') || '');
    const name = String(formData.get('name') || '');
    const service = String(formData.get('service') || selectedService || '');
    const dealerCenter = String(formData.get('dealer_center') || '');
    const preferredDate = String(formData.get('preferred_date') || '');
    const preferredTime = String(formData.get('preferred_time') || '');

    if (!isValidRussianPhone(phone)) {
      setStatus('error');
      setErrorMessage('Пожалуйста, введите корректный 10-значный номер телефона.');
      return;
    }

    setStatus('submitting');

    // Config for Web3Forms
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append(
      'subject',
      parsedContext.type === 'offer'
        ? `Заявка по акции: ${parsedContext.label}`
        : `Заявка на Мультисервис: ${service || 'Консультация'}`
    );

    if (currentCity?.name) {
      formData.append('City', currentCity.name);
    }

    if (preferredDate) {
      formData.append('Желаемая_дата_записи', preferredDate);
    }
    if (preferredTime) {
      formData.append('Желаемое_время_записи', preferredTime);
    }

    try {
      const [ctSuccess, web3Success] = await Promise.all([
        sendCalltouchLead({
          fio: name,
          phoneNumber: phone,
          subject:
            parsedContext.type === 'offer'
              ? `Заявка по акции: ${parsedContext.label}`
              : `Запись на сервис: ${service || 'Консультация'}`,
          source: 'Модальное окно записи',
          city: currentCity?.name,
          service,
          dealerCenter,
          preferredDate,
          preferredTime,
          specialOffer: parsedContext.type === 'offer' ? parsedContext.label : undefined
        }),
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        })
          .then(res => res.json())
          .then(data => Boolean(data?.success))
          .catch(() => false)
      ]);

      if (ctSuccess || web3Success) {
        reachMetrikaGoal('booking_modal_submit', {
          city: currentCity?.name,
          service
        });
        showToast('Наш менеджер свяжется с вами в ближайшее время.');
        setStatus('idle');
        closeModal();
      } else {
        setStatus('error');
        setErrorMessage('Произошла ошибка при отправке заявки. Пожалуйста, позвоните нам.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Произошла ошибка при отправке заявки. Пожалуйста, позвоните нам.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-pragmatika-dark/60 backdrop-blur-xs transition-opacity"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full max-w-5xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[92vh] sm:max-h-[90vh] animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile Pull Bar */}
        <div className="w-12 h-1.5 rounded-full bg-slate-200 mx-auto mt-3 sm:hidden" />

        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-2 text-pragmatika-light hover:text-pragmatika-dark bg-slate-50 hover:bg-slate-100 rounded-full transition-colors shadow-sm cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Left Side: Form */}
        <div className="w-full md:w-[55%] flex flex-col p-6 sm:p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pragmatika-dark tracking-tight mb-2 pr-8">
            {getModalTitle()}
          </h3>

          {parsedContext.type === 'offer' && (
            <p className="text-sm sm:text-base text-pragmatika-green font-semibold mb-5 leading-snug">
              По акции: {parsedContext.label}
            </p>
          )}
          {(parsedContext.type === 'service' || parsedContext.type === 'category') && (
            <p className="text-sm sm:text-base text-pragmatika-green font-semibold mb-5 leading-snug">
              Выбрано: {parsedContext.label}
            </p>
          )}
          {parsedContext.type === 'general' && <div className="mb-4" />}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="Source" value="Заявка с сайта (Модальное окно)" />
            {parsedContext.type === 'offer' && (
              <input type="hidden" name="Special_Offer" value={parsedContext.label} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <input
                  name="name"
                  required
                  type="text"
                  autoComplete="name"
                  placeholder="Введите ФИО*"
                  className="w-full bg-slate-50/50 border border-pragmatika-light/40 p-3.5 rounded-xl focus:ring-2 focus:ring-pragmatika-green focus:border-transparent outline-none transition-all text-pragmatika-dark placeholder:text-pragmatika-light text-sm font-medium"
                />
              </div>

              <div>
                <PhoneInput
                  name="phone"
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-slate-50/50 border border-pragmatika-light/40 p-3.5 rounded-xl focus:ring-2 focus:ring-pragmatika-green focus:border-transparent outline-none transition-all text-pragmatika-dark placeholder:text-pragmatika-light text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <select
                name="service"
                required
                value={selectedService}
                onChange={e => setSelectedService(e.target.value)}
                className="w-full bg-slate-50/50 border border-pragmatika-light/40 p-3.5 rounded-xl focus:ring-2 focus:ring-pragmatika-green focus:border-transparent outline-none transition-all text-pragmatika-dark text-sm font-medium appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%2387a5b6%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-12"
              >
                <option value="" disabled>
                  Укажите услугу*
                </option>
                {serviceOptions.map(srv => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            <div key={currentCity?.slug || 'city'}>
              {currentAddresses.length > 1 || currentAddresses.length === 0 ? (
                <select
                  name="dealer_center"
                  required
                  defaultValue=""
                  className="w-full bg-slate-50/50 border border-pragmatika-light/40 p-3.5 rounded-xl focus:ring-2 focus:ring-pragmatika-green focus:border-transparent outline-none transition-all text-pragmatika-dark text-sm font-medium appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%2387a5b6%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-12"
                >
                  <option value="" disabled>
                    Укажите дилерский центр*
                  </option>
                  {currentAddresses.map((addr: string, idx: number) => (
                    <option key={idx} value={addr}>
                      {addr}
                    </option>
                  ))}
                  {currentAddresses.length === 0 && (
                    <option value="Любой">Любой (менеджер подберет)</option>
                  )}
                </select>
              ) : (
                <input
                  type="text"
                  name="dealer_center"
                  value={currentAddresses[0]}
                  readOnly
                  className="w-full bg-slate-50 border border-pragmatika-light/40 p-3.5 rounded-xl outline-none text-pragmatika-dark text-sm cursor-default"
                />
              )}
            </div>

            {/* Выбор даты и времени визита */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-pragmatika-light uppercase tracking-wider mb-1">
                  Желаемая дата визита
                </label>
                <input
                  type="date"
                  name="preferred_date"
                  min={todayDateStr}
                  defaultValue={todayDateStr}
                  className="w-full bg-slate-50/50 border border-pragmatika-light/40 p-3.5 rounded-xl focus:ring-2 focus:ring-pragmatika-green focus:border-transparent outline-none transition-all text-pragmatika-dark text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-pragmatika-light uppercase tracking-wider mb-1">
                  Желаемое время
                </label>
                <select
                  name="preferred_time"
                  defaultValue="10:00"
                  className="w-full bg-slate-50/50 border border-pragmatika-light/40 p-3.5 rounded-xl focus:ring-2 focus:ring-pragmatika-green focus:border-transparent outline-none transition-all text-pragmatika-dark text-sm font-medium appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%2387a5b6%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10"
                >
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                </select>
              </div>
            </div>

            {status === 'error' && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium text-center">
                {errorMessage || 'Произошла ошибка при отправке заявки.'}
              </div>
            )}

            <div className="mt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-3 bg-pragmatika-green hover:brightness-105 text-white font-bold text-base sm:text-lg px-6 py-4 rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  'Записаться'
                )}
              </button>
            </div>

            <div className="mt-3 flex items-start gap-3">
              <div className="relative flex items-start pt-0.5">
                <input
                  type="checkbox"
                  id="consent-modal"
                  required
                  defaultChecked
                  className="w-4 h-4 border-pragmatika-light rounded text-pragmatika-green focus:ring-pragmatika-green bg-slate-50 cursor-pointer"
                />
              </div>
              <label htmlFor="consent-modal" className="text-xs text-pragmatika-light leading-tight cursor-pointer">
                Я даю согласие группе компаний «Прагматика» на{' '}
                <a
                  href="/service.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-pragmatika-dark underline font-semibold"
                >
                  обработку моих персональных данных
                </a>
                .
              </label>
            </div>
          </form>
        </div>

        {/* Right Side: Decorative Image */}
        <div className="hidden md:flex md:w-[45%] relative bg-slate-50/50 items-center justify-center p-8 lg:p-12 overflow-hidden">
          <img
            src="/form-pic.png"
            alt="Запись на сервис"
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
