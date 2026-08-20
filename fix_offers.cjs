const fs = require('fs');
let code = fs.readFileSync('src/components/SpecialOffers.tsx', 'utf8');

// 1. Fix reading from CSV
code = code.replace(
  "oldPrice: row['зачеркнутая цена'] ? `${row['зачеркнутая цена']} ₽` : undefined",
  "oldPrice: (row['старая цена'] || row['зачеркнутая цена']) ? `${row['старая цена'] || row['зачеркнутая цена']} ₽` : undefined"
);

// We should format 'от 5000' correctly. The user has "от 5000" in the 'Старая цена' column for 'Комплексная замена', so oldPrice becomes 'от 5000 ₽'.
// And newPrice is 'Бесплатно' for 0.

// Let's replace the UI for pricing.
const oldUI = `<div className="flex flex-col">
                    {offer.oldPrice && (
                      <span className="text-slate-400 line-through text-sm font-medium mb-1">{offer.oldPrice}</span>
                    )}
                    <span className="text-slate-900 font-extrabold text-3xl tracking-tight">{offer.newPrice}</span>
                  </div>`;

const newUI = `{(() => {
                    let discountPerc = null;
                    if (offer.oldPrice && offer.newPrice !== 'Бесплатно') {
                      const oldNum = parseInt(offer.oldPrice.replace(/\\D/g, ''));
                      const newNum = parseInt(offer.newPrice.replace(/\\D/g, ''));
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
                  })()}`;

code = code.replace(oldUI, newUI);

fs.writeFileSync('src/components/SpecialOffers.tsx', code);
