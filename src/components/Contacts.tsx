import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Navigation } from 'lucide-react';
import { ADDRESSES } from '../data';
import { useModal } from '../contexts/ModalContext';

declare global {
  interface Window {
    ymaps?: any;
  }
}

export default function Contacts({ currentCity }: { currentCity: any }) {
  const cityData = ADDRESSES.find(a => a.city === currentCity.name) || ADDRESSES[0];
  const { openModal } = useModal();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarksRef = useRef<any[]>([]);
  const [activePointIdx, setActivePointIdx] = useState<number | null>(null);

  useEffect(() => {
    setActivePointIdx(cityData.points.length === 1 ? 0 : null);
  }, [cityData.city, cityData.points.length]);

  useEffect(() => {
    let isCancelled = false;
    let mapInstance: any = null;

    const initMap = () => {
      if (isCancelled || !mapRef.current || !window.ymaps) return;

      window.ymaps.ready(() => {
        if (isCancelled || !mapRef.current) return;

        if (mapInstanceRef.current) {
          try {
            mapInstanceRef.current.destroy();
          } catch {
            // ignore cleanup errors
          }
          mapInstanceRef.current = null;
        }

        mapInstance = new window.ymaps.Map(
          mapRef.current,
          {
            center: cityData.center,
            zoom: cityData.zoom,
            controls: ['zoomControl'],
          },
          {
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true, // отключает клики по чужим организациям на карте
          }
        );

        mapInstanceRef.current = mapInstance;
        placemarksRef.current = [];

        cityData.points.forEach((pt, idx) => {
          const placemark = new window.ymaps.Placemark(
            pt.coords,
            {
              hintContent: `ПРАГМАТИКА ЭКСПЕРТ СЕРВИС — ${pt.address}`,
              balloonContentHeader: '<strong>ПРАГМАТИКА ЭКСПЕРТ СЕРВИС</strong>',
              balloonContentBody: `г. ${cityData.city}, ${pt.address}`,
              balloonContentFooter: `Тел.: ${cityData.phone}`,
            },
            {
              preset: 'islands#autoIcon',
              iconColor: '#8cc63f',
            }
          );

          placemark.events.add('click', () => {
            setActivePointIdx(idx);
          });

          mapInstance.geoObjects.add(placemark);
          placemarksRef.current.push(placemark);
        });
      });
    };

    const existingScript = document.getElementById('yandex-maps-api-script') as HTMLScriptElement | null;

    if (window.ymaps) {
      initMap();
    } else if (existingScript) {
      existingScript.addEventListener('load', initMap);
    } else {
      const script = document.createElement('script');
      script.id = 'yandex-maps-api-script';
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      script.async = true;
      script.addEventListener('load', initMap);
      document.head.appendChild(script);
    }

    return () => {
      isCancelled = true;
      if (existingScript) {
        existingScript.removeEventListener('load', initMap);
      }
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch {
          // ignore cleanup errors
        }
        mapInstanceRef.current = null;
      }
    };
  }, [cityData]);

  const handleFocusPoint = (idx: number) => {
    setActivePointIdx(idx);
    const point = cityData.points[idx];
    const map = mapInstanceRef.current;
    if (point && map) {
      map.setCenter(point.coords, 16, { duration: 300 });
      const placemark = placemarksRef.current[idx];
      if (placemark && placemark.balloon) {
        placemark.balloon.open();
      }
    }
  };

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
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-2">г. {cityData.city}</h4>
                  <ul className="space-y-2">
                    {cityData.points.map((pt, idx) => {
                      const isSelected = activePointIdx === idx;
                      return (
                        <li key={idx}>
                          <button
                            type="button"
                            onClick={() => handleFocusPoint(idx)}
                            className={`text-left text-sm sm:text-base transition-colors flex items-center gap-2 rounded-lg px-2 py-1 -mx-2 ${
                              isSelected
                                ? 'text-[#8cc63f] font-medium bg-green-50/70'
                                : 'text-slate-600 hover:text-[#8cc63f] hover:bg-slate-50'
                            }`}
                          >
                            <span>{pt.address}</span>
                            <Navigation className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                          </button>
                        </li>
                      );
                    })}
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
          
          <div className="flex-1 bg-slate-200 rounded-xl overflow-hidden min-h-[400px] shadow-inner relative">
            <div ref={mapRef} className="w-full h-full min-h-[400px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

