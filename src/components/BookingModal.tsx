import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';
import PhoneInput from './PhoneInput';
import { ADDRESSES } from '../data';

export default function BookingModal({ currentCity }: { currentCity?: any }) {
  const { isModalOpen, closeModal, subject } = useModal();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    if (isModalOpen) {
      if (subject) {
        let initialService = subject.replace('Запись на услугу: ', '');
        const allowed = ["Техническое обслуживание и ремонт", "Диагностика", "Кузовной ремонт", "Детейлинг", "Дополнительное оборудование", "Шиномонтаж", "Другое"];
        if (!allowed.includes(initialService)) {
           initialService = "";
        }
        setSelectedService(initialService);
      } else {
        setSelectedService('');
      }
    }
  }, [isModalOpen, subject]);

  const getModalTitle = () => {
    const formatService = (service: string) => {
      const s = service.toLowerCase();
      if (s === 'диагностика') return 'диагностику';
      if (s === 'дополнительное оборудование') return 'установку дополнительного оборудования';
      return s;
    };

    if (selectedService && selectedService !== 'Другое') {
      return `Запись на ${formatService(selectedService)}`;
    }
    if (subject) {
      if (subject.startsWith('Запись на услугу: ')) {
        return `Запись на ${formatService(subject.replace('Запись на услугу: ', ''))}`;
      }
      return subject;
    }
    return 'Записаться на сервис';
  };

  if (!isModalOpen) return null;

  const currentAddresses = currentCity ? ADDRESSES.find(a => a.city === currentCity.name)?.addresses || [] : [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Config for Web3Forms
    formData.append('access_key', 'de59e5a7-a572-4fd3-b285-86fabde267ce');
    formData.append('subject', `Заявка с сайта Мультисервис: ${getModalTitle()}`);
    
    if (currentCity?.name) {
      formData.append('City', currentCity.name);
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          closeModal();
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div 
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[95vh] sm:max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-full transition-colors shadow-sm md:shadow-none"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Form */}
        <div className="w-full md:w-[55%] flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <h3 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight mb-8">
            {getModalTitle()}
          </h3>

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center h-full">
              <div className="w-20 h-20 bg-[#8cc63f]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-[#8cc63f]" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Заявка отправлена!</h4>
              <p className="text-slate-600 font-medium">Наш менеджер свяжется с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="hidden" name="Source" value="Заявка с сайта (Модальное окно)" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input 
                    name="name"
                    required
                    type="text" 
                    placeholder="Введите ФИО*" 
                    className="w-full bg-white border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                
                <div>
                  <PhoneInput 
                    name="phone"
                    required
                    placeholder="+7 (___) ___-__-__" 
                    className="w-full bg-white border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <select 
                  name="service"
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-white border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-12"
                >
                  <option value="" disabled>Укажите услугу*</option>
                  <option value="Техническое обслуживание и ремонт">Техническое обслуживание и ремонт</option>
                  <option value="Диагностика">Диагностика</option>
                  <option value="Кузовной ремонт">Кузовной ремонт</option>
                  <option value="Детейлинг">Детейлинг</option>
                  <option value="Дополнительное оборудование">Дополнительное оборудование</option>
                  <option value="Шиномонтаж">Шиномонтаж</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>

              <div>
                {currentAddresses.length > 1 || currentAddresses.length === 0 ? (
                  <select 
                    name="dealer_center"
                    required
                    defaultValue=""
                    className="w-full bg-white border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-12"
                  >
                    <option value="" disabled>Укажите дилерский центр*</option>
                    {currentAddresses.map((addr: string, idx: number) => (
                      <option key={idx} value={addr}>{addr}</option>
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
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none text-slate-600 cursor-default"
                  />
                )}
              </div>
              
              {status === 'error' && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 font-medium text-center">
                  Произошла ошибка при отправке заявки.
                </div>
              )}

              <div className="mt-2">
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-3 bg-[#8cc63f] hover:bg-[#7db435] text-white font-medium text-lg px-6 py-4 rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    'Отправить'
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <div className="relative flex items-start pt-1">
                  <input
                    type="checkbox"
                    id="consent-modal"
                    required
                    defaultChecked
                    className="w-5 h-5 border-slate-300 rounded text-[#8cc63f] focus:ring-[#8cc63f] bg-slate-50 cursor-pointer"
                  />
                </div>
                <label htmlFor="consent-modal" className="text-xs text-slate-500 leading-tight cursor-pointer">
                  Я даю согласие группе компаний «Прагматика» на <a href="/service.pdf" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[#8cc63f] hover:underline">обработку моих персональных данных</a>.
                </label>
              </div>
            </form>
          )}
        </div>

        {/* Right Side: Decorative Image */}
        <div className="hidden md:flex md:w-[45%] relative bg-white items-center justify-center p-8 lg:p-12 overflow-hidden">
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
