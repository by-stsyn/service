const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Remove blur-3xl divs
  content = content.replace(/<div className="absolute[^"]*blur-3xl[^"]*"\s*\/>/g, '');
  
  // Flatten borders
  content = content.replace(/rounded-3xl/g, 'rounded-sm');
  content = content.replace(/rounded-2xl/g, 'rounded-sm');
  content = content.replace(/rounded-xl/g, 'rounded-sm');
  content = content.replace(/rounded-lg/g, 'rounded-sm');
  
  // Less intense shadows
  content = content.replace(/shadow-2xl/g, 'shadow-lg');
  content = content.replace(/shadow-xl/g, 'shadow-md');
  
  fs.writeFileSync(path.join(dir, file), content);
}
console.log("Style pass complete");
