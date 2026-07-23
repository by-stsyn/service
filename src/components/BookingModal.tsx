import React, { useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

export default function BookingModal({ currentCity }: { currentCity?: any }) {
  const { isModalOpen, closeModal, subject } = useModal();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Config for Web3Forms
    formData.append('access_key', 'de59e5a7-a572-4fd3-b285-86fabde267ce');

    if (subject) {
      formData.append('subject', `Заявка с сайта: ${subject}`);
    } else {
      formData.append('subject', 'Новая заявка с сайта');
    }
    
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
        className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[95vh] sm:max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-full transition-colors shadow-sm md:shadow-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image Banner */}
        <div className="hidden md:flex md:w-5/12 relative bg-slate-900 overflow-hidden flex-col justify-end p-8 text-white">
          <div className="absolute inset-0">
            <img src="/form-pic.png" alt="Сервисный центр" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          </div>
          <div className="relative z-10 mt-auto">
            <h3 className="text-3xl font-extrabold uppercase tracking-tight mb-3">Оставить заявку</h3>
            <p className="text-slate-300 font-medium leading-relaxed">
              Наши специалисты свяжутся с вами в течение 5 минут, чтобы уточнить детали и подобрать удобное время визита.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 flex flex-col">
          <div className="p-6 sm:p-8 md:p-10 overflow-y-auto custom-scrollbar">
            <h3 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight mb-2 md:hidden">
              Оставить заявку
            </h3>
            <p className="text-slate-600 mb-6 md:hidden text-sm">
              Наши специалисты свяжутся с вами в ближайшее время.
            </p>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <div className="w-20 h-20 bg-[#8cc63f]/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-[#8cc63f]" />
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">Заявка отправлена!</h4>
                <p className="text-slate-600 font-medium">Наш менеджер свяжется с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {subject && (
                  <div className="px-4 py-3 bg-[#8cc63f]/10 text-slate-700 rounded-xl text-sm border border-[#8cc63f]/20 font-medium">
                    <span className="font-bold text-slate-900 uppercase tracking-wide text-xs mr-2">Интересует:</span> {subject}
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Ваше имя <span className="text-[#8cc63f]">*</span></label>
                    <input 
                      name="name"
                      required
                      type="text" 
                      placeholder="Иван" 
                      className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Телефон <span className="text-[#8cc63f]">*</span></label>
                    <input 
                      name="phone"
                      required
                      type="tel" 
                      placeholder="+7 (999) 000-00-00" 
                      className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Марка авто <span className="text-[#8cc63f]">*</span></label>
                    <input 
                      name="car_make"
                      required
                      type="text" 
                      placeholder="Например, Lada" 
                      className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Модель авто <span className="text-[#8cc63f]">*</span></label>
                    <input 
                      name="car_model"
                      required
                      type="text" 
                      placeholder="Например, Vesta" 
                      className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Комментарий</label>
                  <textarea 
                    name="comment"
                    placeholder="Опишите проблему или пожелания (необязательно)" 
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 resize-none"
                  ></textarea>
                </div>
                
                {status === 'error' && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium text-center">
                    Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.
                  </div>
                )}

                <div className="mt-4">
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-3 bg-[#8cc63f] hover:bg-[#7db435] text-white font-bold text-lg uppercase tracking-wide px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      'Оставить заявку'
                    )}
                  </button>
                  <p className="text-xs text-center text-slate-400 font-medium mt-4">
                    Нажимая кнопку, вы соглашаетесь с <a href="#" className="underline hover:text-[#8cc63f] transition-colors">политикой конфиденциальности</a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
