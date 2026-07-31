const fs = require('fs');
const svg = fs.readFileSync('arifhaxn_dark.svg', 'utf8');

const regex = /<g opacity="0"><animate attributeName="opacity"([^>]*?)><path d="([^"]*?)"\/><\/g>/g;
let match;
const tools = [];

while ((match = regex.exec(svg)) !== null) {
  tools.push({
    animateAttrs: match[1],
    path: match[2]
  });
}

console.log('Found', tools.length, 'animated paths');
if (tools.length > 0) {
  fs.writeFileSync('extracted_tools.json', JSON.stringify(tools, null, 2));
}
