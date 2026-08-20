import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import { Loader2, Tag, ArrowRight } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';
import { OFFERS } from '../data';

const OFFERS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZuIxRNJwvEDA-FmBDWZ8yxAYSm2TgDDRcK0H3cnY5IxkehLF0DYe8C-mUlZ5KNqMQPpKq05Fwffhw/pub?gid=2031295292&single=true&output=csv';

interface Offer {
  id: string;
  region: string;
  title: string;
  description: string;
  newPrice: string;
  oldPrice?: string;
}

interface SpecialOffersProps {
  currentCity: { slug: string; name: string };
}

export default function SpecialOffers({ currentCity }: SpecialOffersProps) {
  const [rawOffers, setRawOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(OFFERS_CSV_URL)
      .then(res => res.text())
      .then(csv => {
        const results = Papa.parse(csv, { 
          header: true, 
          skipEmptyLines: true,
          transformHeader: (h) => h.toLowerCase().trim()
        });
        
        const fetchedOffers: Offer[] = [];
        
        results.data.forEach((row: any, index: number) => {
          const name = row['название'] || '';
          if (!name.trim()) return;

          const region = (row['регион'] || '').trim();

          fetchedOffers.push({
            id: `offer-${index}`,
            region: region,
            title: name,
            description: row['описание'] || '',
            newPrice: row['цена'] ? (row['цена'] === '0' ? 'Бесплатно' : `${row['цена']} ₽`) : 'Бесплатно',
            oldPrice: (row['старая цена'] || row['зачеркнутая цена']) ? `${row['старая цена'] || row['зачеркнутая цена']} ₽` : undefined
          });
        });

        setRawOffers(fetchedOffers);
        setLoading(false);
      })
      .catch(err => {
        // Fallback to mock data if fetch fails
        setRawOffers(OFFERS.map(o => ({
          id: String(o.id),
          region: o.city,
          title: o.title,
          description: o.description,
          newPrice: o.newPrice,
          oldPrice: o.oldPrice
        })));
        setLoading(false);
      });
  }, []);

  const offers = useMemo(() => {
    return rawOffers.filter(offer => {
      const regionLower = offer.region.toLowerCase();
      const isAllRegions = !regionLower || regionLower === 'все' || regionLower === 'все регионы';
      return isAllRegions || regionLower === currentCity.name.toLowerCase();
    });
  }, [rawOffers, currentCity.name]);

  const { openModal } = useModal();

  if (loading && rawOffers.length === 0) {
    return (
      <section id="offers" className="px-4 sm:px-8 py-16 bg-slate-50 flex-shrink-0">
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-8 h-8 text-[#8cc63f] animate-spin" />
        </div>
      </section>
    );
  }

  if (offers.length === 0 && !loading) {
    return null; // hide if no offers for this city
  }

  return (
    <section id="offers" className="px-4 sm:px-8 py-16 sm:py-24 bg-slate-50 flex-shrink-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight uppercase mb-3">
              Акции и <span className="text-[#8cc63f]">скидки</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg">Специальные предложения для вашего автомобиля</p>
          </div>
        </div>
        
        {offers.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-sm">
            В выбранном регионе пока нет активных спецпредложений
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div 
                key={offer.id} 
                className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#8cc63f]/40 flex flex-col relative overflow-hidden group transition-all duration-300"
              >
                
                
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="p-2.5 bg-[#8cc63f]/10 rounded-xl">
                    <Tag className="w-5 h-5 text-[#8cc63f]" />
                  </div>
                  <span className="text-[#8cc63f] text-sm font-bold uppercase tracking-wider">
                    Спецпредложение
                  </span>
                </div>

                <h3 className="text-slate-900 font-bold text-xl sm:text-2xl mb-3 relative z-10 leading-snug">{offer.title}</h3>
                
                {offer.description && (
                  <p className="text-slate-600 text-sm sm:text-base mb-8 flex-grow leading-relaxed relative z-10 whitespace-pre-line">
                    {offer.description}
                  </p>
                )}
                {!offer.description && <div className="flex-grow mb-8" />}
                
                <div className="flex flex-col gap-5 mt-auto relative z-10 pt-6 border-t border-slate-100">
                  {(() => {
                    let discountPerc = null;
                    if (offer.oldPrice && offer.newPrice !== 'Бесплатно') {
                      const oldNum = parseInt(offer.oldPrice.replace(/\D/g, ''));
                      const newNum = parseInt(offer.newPrice.replace(/\D/g, ''));
                      if (oldNum && newNum && oldNum > newNum) {
                        discountPerc = Math.round(((oldNum - newNum) / oldNum) * 100);
                      }
                    }
                    return (
                      <div className="flex items-center gap-3">
                        <span className="text-slate-900 font-extrabold text-3xl tracking-tight">{offer.newPrice}</span>
                        {offer.oldPrice && (
                          <span className="text-slate-400 line-through text-lg font-medium">{offer.oldPrice}</span>
                        )}
                        {discountPerc && (
                          <span className="bg-[#FF3B30] text-white text-xs font-bold px-2 py-1 rounded-md">
                            -{discountPerc}%
                          </span>
                        )}
                      </div>
                    );
                  })()}
                  
                  <button 
                    onClick={() => openModal(offer.title)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-[#8cc63f] text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-colors duration-300"
                  >
                    Оставить заявку
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
