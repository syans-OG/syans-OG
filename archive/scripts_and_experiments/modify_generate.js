const fs = require('fs');

let js = fs.readFileSync('generate_svg.js', 'utf8');

// Read extracted dots
let dotsContent = fs.readFileSync('extracted_dots.txt', 'utf8');
// add transform to the group
dotsContent = dotsContent.replace('<g fill="url(#asciiGrad)">', '<g fill="url(#asciiGrad)" transform="translate(70, 110) scale(1.1)">');

// Replace the logoBase64 block in SVG
const replaceTarget = /<!-- Logo \(Base64\) -->[\s\S]*?\$\{logoBase64[^}]*\}\}/;

// Wait, the template string uses ${logoBase64 ? ...}
// I'll just use string replacement
const searchString = '<!-- Logo (Base64) -->\n  ${logoBase64 ? `<image x="100" y="190" width="300" height="300" href="${logoBase64}" class="floating-logo" />` : \'\'}';

js = js.replace(searchString, '<!-- Animated Dot Matrix -->\n  ' + '` + ' + JSON.stringify(dotsContent) + ' + `');

fs.writeFileSync('generate_svg.js', js);
console.log('Modified generate_svg.js');
