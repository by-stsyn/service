const fs = require('fs');
let code = fs.readFileSync('src/components/BrandsMarquee.tsx', 'utf8');

const oldArrays = `const TOP_BRANDS = [...MOCK_BRANDS.slice(0, 8), ...MOCK_BRANDS.slice(0, 8)];
const MIDDLE_BRANDS = [...MOCK_BRANDS.slice(8), ...MOCK_BRANDS.slice(8)];
const BOTTOM_BRANDS = [...MOCK_BRANDS_3, ...MOCK_BRANDS_3];`;

const newArrays = `const ROW_1 = MOCK_BRANDS.slice(0, 8);
const ROW_2 = MOCK_BRANDS.slice(8);
const ROW_3 = MOCK_BRANDS_3;

// Repeat multiple times to cover ultra-wide screens
const TOP_BRANDS = [...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1];
const MIDDLE_BRANDS = [...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2];
const BOTTOM_BRANDS = [...ROW_3, ...ROW_3, ...ROW_3, ...ROW_3, ...ROW_3, ...ROW_3];`;

code = code.replace(oldArrays, newArrays);
fs.writeFileSync('src/components/BrandsMarquee.tsx', code);
