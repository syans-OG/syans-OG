const fs = require('fs');

let js = fs.readFileSync('generate_svg.js', 'utf8');

// Find the start of Animated Dot Matrix
const startStr = '<!-- Animated Dot Matrix -->';
const startIdx = js.indexOf(startStr);

// Find the end: it's before RIGHT COLUMN: SYSTEM.INFO
const endStr = '<!-- RIGHT COLUMN: SYSTEM.INFO -->';
const endIdx = js.indexOf(endStr);

if (startIdx !== -1 && endIdx !== -1) {
  const myMorph = fs.readFileSync('generated_morph.txt', 'utf8');
  const newJs = js.substring(0, startIdx + startStr.length) + '\n  ` + `' + myMorph + '` + `\n\n  ' + js.substring(endIdx);
  fs.writeFileSync('generate_svg.js', newJs);
  console.log('Injected custom morph!');
} else {
  console.log('Could not find injection markers');
}
