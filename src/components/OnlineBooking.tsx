import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, Car, MapPin, Wrench, CheckCircle2, Loader2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import PhoneInput from './PhoneInput';
import { ADDRESSES } from '../data';
import { useToast } from '../contexts/ToastContext';

interface OnlineBookingProps {
  currentCity: { slug: string; name: string };
}

const SERVICE_OPTIONS = [
  'Техническое обслуживание (ТО)',
  'Компьютерная диагностика',
  'Ремонт подвески и тормозов',
  'Шиномонтаж и балансировка',
  'Кузовной ремонт и покраска',
  'Детейлинг, мойка и полировка',
  'Установка доп. оборудования',
  'Другая неисправность'
];

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', 
  '17:00', '18:00', '19:00', '20:00'
];

export default function OnlineBooking({ currentCity }: OnlineBookingProps) {
  const { showToast } = useToast();

  // Helper date generators
  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const getRelativeDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[0]);
  const [selectedDate, setSelectedDate] = useState(() => getRelativeDate(0));
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [carModel, setCarModel] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const currentAddresses = useMemo(() => {
    return currentCity ? ADDRESSES.find(a => a.city === currentCity.name)?.addresses || [] : [];
  }, [currentCity]);

  const [selectedDealer, setSelectedDealer] = useState(() => {
    return currentAddresses.length > 0 ? currentAddresses[0] : 'Любой филиал';
  });

  // When city changes, reset selected dealer
  React.useEffect(() => {
    if (currentAddresses.length > 0) {
      setSelectedDealer(currentAddresses[0]);
    } else {
      setSelectedDealer('Любой филиал');
    }
  }, [currentAddresses]);

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return '';
    try {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('ru-RU', {
          weekday: 'short',
          day: 'numeric',
          month: 'long'
        });
      }
    } catch {
      return selectedDate;
    }
    return selectedDate;
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append('access_key', 'de59e5a7-a572-4fd3-b285-86fabde267ce');
    formData.append('subject', `Самостоятельная онлайн-запись: ${selectedService} (${selectedDate} ${selectedTime})`);
    formData.append('Source', 'Самостоятельная онлайн-запись (Блок на сайте)');
    formData.append('Город', currentCity?.name || '');
    formData.append('Услуга', selectedService);
    formData.append('Дилерский_центр', selectedDealer);
    formData.append('Марка_Модель_Авто', carModel || 'Не указана');
    formData.append('Желаемая_Дата', selectedDate);
    formData.append('Желаемое_Время', selectedTime);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        showToast('Заявка на онлайн-запись принята! Мастер ждет вас в назначенное время.');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setCarModel('');
    setName('');
    setComment('');
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-white border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8cc63f]/10 border border-[#8cc63f]/30 text-[#679929] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-[#8cc63f]" />
            <span>Самостоятельная онлайн-запись без звонка</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Запишитесь на сервис <span className="text-[#8cc63f]">онлайн</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Выберите удобную дату, время и дилерский центр. Мы зарезервируем подъемник и примем автомобиль без ожидания.
          </p>
        </div>

        {status === 'success' ? (
          <div className="max-w-2xl mx-auto bg-slate-50 border-2 border-[#8cc63f] rounded-3xl p-8 sm:p-12 text-center shadow-lg">
            <div className="w-16 h-16 bg-[#8cc63f]/20 text-[#7bb033] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Запись успешно оформлена!
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Мы зарезервировали время: <strong className="text-slate-900">{formattedSelectedDate} в {selectedTime}</strong>.
              <br />
              Дилерский центр: <strong className="text-slate-900">{selectedDealer}</strong>.
            </p>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-sm text-slate-500 mb-8 inline-block text-left w-full sm:w-auto">
              <div>🚗 <strong className="text-slate-700">Услуга:</strong> {selectedService}</div>
              {carModel && <div>🚘 <strong className="text-slate-700">Автомобиль:</strong> {carModel}</div>}
              <div>📍 <strong className="text-slate-700">Город:</strong> {currentCity.name}</div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleReset}
                className="bg-[#8cc63f] hover:bg-[#7bb033] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-sm active:scale-95"
              >
                Записаться еще раз
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column: Booking Parameters (Steps 1, 2, 3) */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                
                {/* 1. Выбор услуги */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    <Wrench className="w-4 h-4 text-[#8cc63f]" />
                    <span>1. Выберите категорию или услугу</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICE_OPTIONS.map((srv) => {
                      const isSelected = selectedService === srv;
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => setSelectedService(srv)}
                          className={`text-left text-xs sm:text-sm font-medium p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#8cc63f]/15 border-[#8cc63f] text-slate-900 font-semibold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/50'
                          }`}
                        >
                          <span className="truncate pr-2">{srv}</span>
                          <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                            isSelected ? 'border-[#8cc63f] bg-[#8cc63f]' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Дата и время */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    <CalendarIcon className="w-4 h-4 text-[#8cc63f]" />
                    <span>2. Выберите удобную дату и время визита</span>
                  </label>

                  {/* Быстрые дни */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setSelectedDate(getRelativeDate(0))}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                        selectedDate === getRelativeDate(0)
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Сегодня
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDate(getRelativeDate(1))}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                        selectedDate === getRelativeDate(1)
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Завтра
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDate(getRelativeDate(2))}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                        selectedDate === getRelativeDate(2)
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Послезавтра
                    </button>

                    {/* Выбор в календаре */}
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
                      <span className="text-xs text-slate-500 font-medium hidden sm:inline">Календарь:</span>
                      <input
                        type="date"
                        name="Booking_Date_Input"
                        min={todayStr}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                        className="text-xs sm:text-sm font-bold text-slate-800 outline-none bg-transparent cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Сетка времени */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#8cc63f]" />
                        Доступные часы приема:
                      </span>
                      {selectedDate && (
                        <span className="text-xs font-semibold text-[#6a9e27] capitalize">
                          {formattedSelectedDate}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {TIME_SLOTS.map((t) => {
                        const isTimeSelected = selectedTime === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTime(t)}
                            className={`py-2 px-1 text-center rounded-lg text-xs sm:text-sm font-bold transition-all ${
                              isTimeSelected
                                ? 'bg-[#8cc63f] text-white shadow-sm scale-102'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3. Выбор филиала */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                    <MapPin className="w-4 h-4 text-[#8cc63f]" />
                    <span>3. Дилерский центр ({currentCity.name})</span>
                  </label>
                  {currentAddresses.length > 1 ? (
                    <select
                      value={selectedDealer}
                      onChange={(e) => setSelectedDealer(e.target.value)}
                      className="w-full bg-white border border-slate-200 p-3.5 rounded-xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-[#8cc63f] text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-12"
                    >
                      {currentAddresses.map((addr, idx) => (
                        <option key={idx} value={addr}>{addr}</option>
                      ))}
                    </select>
                  ) : currentAddresses.length === 1 ? (
                    <div className="bg-white border border-slate-200 p-3.5 rounded-xl text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#8cc63f] shrink-0" />
                      <span>{currentAddresses[0]}</span>
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 p-3.5 rounded-xl text-sm font-medium text-slate-600">
                      Дилерский центр в г. {currentCity.name} (менеджер согласует адрес)
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Contact Info & Confirmation Card */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col gap-5">
                  
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      Контактные данные
                    </h3>
                    <p className="text-xs text-slate-500">
                      Укажите ваш номер — подтверждение записи придет сразу
                    </p>
                  </div>

                  {/* Марка и модель */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Марка и модель автомобиля
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="car_model"
                        value={carModel}
                        onChange={(e) => setCarModel(e.target.value)}
                        placeholder="Например: Chery Tiggo 7, Kia Rio, Haval..."
                        className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 text-sm focus:bg-white focus:ring-2 focus:ring-[#8cc63f] outline-none transition-all pl-10"
                      />
                      <Car className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      ✓ Обслуживаем любые марки и модели
                    </span>
                  </div>

                  {/* ФИО */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Ваше имя*
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван Иванович"
                      className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 text-sm focus:bg-white focus:ring-2 focus:ring-[#8cc63f] outline-none transition-all"
                    />
                  </div>

                  {/* Телефон */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Номер телефона*
                    </label>
                    <PhoneInput
                      name="phone"
                      required
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 text-sm focus:bg-white focus:ring-2 focus:ring-[#8cc63f] outline-none transition-all"
                    />
                  </div>

                  {/* Комментарий */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Примечание (по желанию)
                    </label>
                    <input
                      type="text"
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Жалобы, посторонний шум, горящий чек..."
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#8cc63f] outline-none transition-all"
                    />
                  </div>

                  {/* Карточка-саммари выбранного времени */}
                  <div className="bg-[#8cc63f]/10 border border-[#8cc63f]/25 rounded-xl p-3.5 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-slate-800">
                      <CalendarIcon className="w-4 h-4 text-[#78aa2e] shrink-0" />
                      <div>
                        <div className="font-bold">{formattedSelectedDate}</div>
                        <div className="text-slate-500 text-[11px]">в {selectedTime}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 bg-white rounded-md text-[11px] font-bold text-[#6a9e27] border border-[#8cc63f]/30">
                        Бронь без очереди
                      </span>
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold text-center border border-red-200">
                      Произошла ошибка отправки. Попробуйте еще раз или позвоните нам.
                    </div>
                  )}

                  {/* Кнопка отправки */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 bg-[#8cc63f] hover:bg-[#7bb033] text-white font-bold text-base py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Бронируем время...
                      </>
                    ) : (
                      <>
                        <span>Записаться на {selectedTime}</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-[#8cc63f] shrink-0" />
                    <span>Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</span>
                  </div>

                </div>
              </div>

            </div>
          </form>
        )}

      </div>
    </section>
  );
}
