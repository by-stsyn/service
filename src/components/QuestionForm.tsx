import React, { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import PhoneInput from './PhoneInput';
import { ADDRESSES } from '../data';

export default function QuestionForm({ currentCity }: { currentCity?: any }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const currentAddresses = currentCity ? ADDRESSES.find(a => a.city === currentCity.name)?.addresses || [] : [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    formData.append('access_key', 'de59e5a7-a572-4fd3-b285-86fabde267ce');
    formData.append('subject', 'Новая заявка лендинг Мультисервис');
    formData.append('Source', 'Вопрос с сайта (Блок "Остались вопросы")');
    
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
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="px-4 sm:px-8 py-10 sm:py-16 bg-slate-50 flex-shrink-0 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl flex flex-col md:flex-row relative">
          
          {/* Left side: Form */}
          <div className="md:w-[55%] p-6 sm:p-10 md:p-12 flex flex-col justify-center relative z-10 rounded-l-3xl">
            <h3 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight mb-2">
              Остались вопросы? <span className="text-xl md:text-2xl text-slate-500 font-normal">Мы с радостью ответим Вам</span>
            </h3>
            <div className="mb-6"></div>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 text-center h-full">
                <div className="w-20 h-20 bg-[#8cc63f]/10 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle className="w-10 h-10 text-[#8cc63f]" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">Заявка принята!</h4>
                <p className="text-slate-600 font-medium">Ваш вопрос получен. Наш менеджер свяжется с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                <div>
                  <textarea 
                    name="question"
                    placeholder="Ваш вопрос (необязательно)" 
                    rows={2}
                    className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 p-4 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium resize-none"
                  />
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
                      id="consent-question"
                      required
                      defaultChecked
                      className="w-5 h-5 border-slate-300 rounded text-[#8cc63f] focus:ring-[#8cc63f] bg-slate-50 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="consent-question" className="text-xs text-slate-500 leading-tight cursor-pointer">
                    Я даю согласие группе компаний «Прагматика» на <a href="#" className="text-[#8cc63f] hover:underline">обработку моих персональных данных</a>.
                  </label>
                </div>
              </form>
            )}
          </div>

          {/* Right side: Decorative Image */}
          <div className="hidden md:flex md:w-[45%] relative items-center justify-center">
            {/* Background Shape */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-sm aspect-square bg-[#eaf4d9] rounded-l-full rounded-tr-full rotate-45 z-0"></div>
            
            <div className="absolute z-10 w-full h-[140%] flex items-center justify-center pointer-events-none">
              <img 
                src="/qa.png" 
                alt="Вопросы" 
                className="w-full max-w-[280px] lg:max-w-[340px] h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
