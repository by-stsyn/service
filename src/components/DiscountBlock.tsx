import React, { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import PhoneInput from './PhoneInput';
import { ADDRESSES } from '../data';
import { useToast } from '../contexts/ToastContext';

export default function DiscountBlock({ currentCity }: { currentCity?: any }) {
  const { showToast } = useToast();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  const currentAddresses = currentCity ? ADDRESSES.find(a => a.city === currentCity.name)?.addresses || [] : [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    formData.append('access_key', 'de59e5a7-a572-4fd3-b285-86fabde267ce');
    formData.append('subject', 'Новая заявка на Мультисервис');
    formData.append('Source', 'Заявка на скидку (Первый визит)');
    
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
        showToast('Скидка успешно зафиксирована. Наш менеджер перезвонит вам в ближайшее время.');
        setStatus('idle');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="px-4 sm:px-8 py-16 sm:py-24 bg-slate-50 flex-shrink-0">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col md:flex-row relative">
          
          {/* Left side: Form */}
          <div className="md:w-[55%] p-8 sm:p-12 md:p-16 flex flex-col justify-center relative z-10 bg-white">
            <h3 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight mb-8">
              Записаться на сервис
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input 
                      name="name"
                      type="text" 
                      placeholder="Введите ФИО*" 
                      required
                      className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <PhoneInput 
                      name="phone"
                      placeholder="+7 (___) ___-__-__" 
                      required
                      className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <select 
                    name="service"
                    required
                    defaultValue=""
                    className="w-full bg-white border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-12"
                  >
                    <option value="" disabled>Укажите услугу*</option>
                    <option value="Техническое обслуживание и ремонт">Техническое обслуживание и ремонт</option>
                    <option value="Диагностика">Диагностика</option>
                    <option value="Кузовной ремонт">Кузовной ремонт</option>
                    <option value="Детейлинг и мойка">Детейлинг и мойка</option>
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
                      className="w-full bg-white border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-12"
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
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none font-medium text-slate-600 cursor-default"
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
                      id="consent-discount"
                      required
                      defaultChecked
                      className="w-5 h-5 border-slate-300 rounded text-[#8cc63f] focus:ring-[#8cc63f] bg-slate-50 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="consent-discount" className="text-xs text-slate-500 leading-tight cursor-pointer">
                    Я даю согласие группе компаний «Прагматика» на <a href="/service.pdf" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[#8cc63f] hover:underline">обработку моих персональных данных</a>.
                  </label>
                </div>
              </form>
          </div>

          {/* Right side: Decorative Image */}
          <div className="hidden md:flex md:w-[45%] relative bg-white items-center justify-center p-8 lg:p-12 overflow-hidden">
            <img 
              src="/form-pic.png" 
              alt="Сервисный центр" 
              loading="lazy"
              className="w-full h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
