const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

code = code.replace(
  '<img src="/tg.png" alt="Telegram" className="w-8 h-8 object-contain" />',
  `<img src="/tg.png" alt="Telegram" className="w-8 h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" fill="%23f1f5f9" rx="16"/><text x="16" y="20" font-family="sans-serif" font-size="10" font-weight="bold" fill="%2364748b" text-anchor="middle">TG</text></svg>'; }} />`
);

code = code.replace(
  '<img src="/max.png" alt="Max" className="w-8 h-8 object-contain" />',
  `<img src="/max.png" alt="Max" className="w-8 h-8 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" fill="%23f1f5f9" rx="16"/><text x="16" y="20" font-family="sans-serif" font-size="10" font-weight="bold" fill="%2364748b" text-anchor="middle">MAX</text></svg>'; }} />`
);

fs.writeFileSync('src/components/Footer.tsx', code);
