import React, { useState } from 'react';
import { CheckCircle, Loader2, Timer } from 'lucide-react';
import PhoneInput from './PhoneInput';

export default function DiscountBlock({ currentCity }: { currentCity?: any }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    formData.append('access_key', 'de59e5a7-a572-4fd3-b285-86fabde267ce');
    formData.append('subject', 'Заявка на скидку с сайта');
    
    if (currentCity?.name) {
      formData.append('Город', currentCity.name);
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
          form.reset();
        }, 4000);
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
        <div className="bg-white rounded-xl border border-slate-100 shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left side: Image & Text */}
          <div className="md:w-5/12 bg-slate-900 relative p-6 sm:p-12 flex flex-col justify-center text-white min-h-[400px]">
             <div className="absolute inset-0">
                <img src="/form-pic.png" alt="Сервисный центр" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
             </div>
             <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8cc63f] text-white rounded-xl text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm">
                  <Timer className="w-4 h-4" />
                  Предложение ограничено
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
                  Скидка на <br/><span className="text-[#8cc63f]">первый визит</span>
                </h2>
                <p className="text-slate-300 font-medium leading-relaxed max-w-sm">
                  Оставьте заявку сейчас и мы зафиксируем за вами персональную скидку на первое обслуживание в нашем сервисном центре.
                </p>
             </div>
          </div>

          {/* Right side: Form */}
          <div className="md:w-7/12 p-6 sm:p-12 bg-white flex flex-col justify-center">
            {status === 'success' ? (
              <div className="bg-[#8cc63f]/10 border border-[#8cc63f]/20 rounded-xl p-10 flex flex-col items-center justify-center text-center h-full">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle className="w-10 h-10 text-[#8cc63f]" />
                </div>
                <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-3">Заявка принята!</h4>
                <p className="text-slate-600 font-medium text-lg">Скидка успешно зафиксирована. Наш менеджер перезвонит вам в ближайшее время для подтверждения.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Ваше имя</label>
                    <input 
                      name="name"
                      type="text" 
                      placeholder="Иван" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Ваш телефон *</label>
                    <PhoneInput 
                      name="phone"
                      placeholder="+7 (999) 000-00-00" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Марка и модель авто</label>
                  <input 
                    name="car"
                    type="text" 
                    list="discount-car-brands-list"
                    placeholder="Например, Hyundai Solaris" 
                    required
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium"
                  />
                  <datalist id="discount-car-brands-list">
                    <option value="Audi" />
                    <option value="BMW" />
                    <option value="Chery" />
                    <option value="Chevrolet" />
                    <option value="Ford" />
                    <option value="Geely" />
                    <option value="Haval" />
                    <option value="Hyundai" />
                    <option value="Kia" />
                    <option value="Lada" />
                    <option value="Lexus" />
                    <option value="Mazda" />
                    <option value="Mercedes-Benz" />
                    <option value="Nissan" />
                    <option value="Renault" />
                    <option value="Skoda" />
                    <option value="Toyota" />
                    <option value="Volkswagen" />
                    <option value="Volvo" />
                  </datalist>
                </div>

                <div className="mt-2">
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-[#8cc63f] hover:bg-[#7db435] text-white font-bold text-lg uppercase tracking-wide px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-3"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      'Получить скидку'
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium text-center">
                    Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.
                  </div>
                )}

                <p className="text-xs text-slate-400 text-center font-medium">
                  Нажимая кнопку, вы соглашаетесь с <a href="#" className="underline hover:text-[#8cc63f] transition-colors">политикой конфиденциальности</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
