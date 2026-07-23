import { MapPin, Phone } from 'lucide-react';
import { ADDRESSES } from '../data';
import { useModal } from '../contexts/ModalContext';

export default function Contacts({ currentCity }: { currentCity: any }) {
  const cityData = ADDRESSES.find(a => a.city === currentCity.name) || ADDRESSES[0];
  const { openModal } = useModal();

  return (
    <section id="contacts" className="flex-shrink-0 bg-slate-50 border-t border-slate-100">
      <div className="px-4 sm:px-8 py-16 sm:py-24 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 tracking-tight uppercase">Контакты</h2>
          <p className="text-slate-600">Наши адреса и форма для связи в городе {currentCity.name}.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">ПРАГМАТИКА ЭКСПЕРТ СЕРВИС</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#8cc63f] flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">г. {cityData.city}</h4>
                  <ul className="space-y-2">
                    {cityData.addresses.map((addr, idx) => (
                      <li key={idx} className="text-slate-600 text-sm sm:text-base">{addr}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#8cc63f] flex-shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Единый телефон</h4>
                  <a href={`tel:${cityData.phone.replace(/\D/g, '')}`} className="ct-phone text-lg font-semibold text-slate-900 hover:text-[#8cc63f] transition-colors">
                    {cityData.phone}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-10"> 
              <button 
                onClick={() => openModal()}
                className="w-full sm:w-auto px-8 py-3 bg-[#8cc63f] hover:bg-[#7db435] text-white font-semibold rounded-xl shadow-md transition-all active:scale-95"
              >
                Записаться на сервис
              </button>
            </div>
          </div>
          
          <div className="flex-1 bg-slate-200 rounded-xl overflow-hidden min-h-[300px] shadow-inner relative">
            {cityData.mapUrl ? (
              <iframe 
                src={cityData.mapUrl} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                className="absolute inset-0 w-full h-full"
                title={`Карта автосервисов в ${cityData.city}`}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 p-6 text-center">
                Интерактивная карта для этого города скоро появится
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
