const fs = require('fs');

const svg = fs.readFileSync('arifhaxn_dark.svg', 'utf8');

// The dots are inside a <g clip-path="url(#winClip)"> which also has other things like the top bar.
// Let's just find the <linearGradient id="asciiGrad"...> block, and all the <g opacity="0"><animate ...><path ...></g> blocks.

const asciiGradMatch = svg.match(/<linearGradient id="asciiGrad"[^>]*>[\s\S]*?<\/linearGradient>/);
const asciiGrad = asciiGradMatch ? asciiGradMatch[0] : '';

const animatedPaths = [];
const regex = /<g opacity="0"><animate [^>]+><path [^>]+><\/g>/g;
let match;
while ((match = regex.exec(svg)) !== null) {
  animatedPaths.push(match[0]);
}

const framesSvg = animatedPaths.join('\n');

// We need to group them in a <g fill="url(#asciiGrad)"> or similar if that's how they're colored.
// Let's check if there is a fill="url(#asciiGrad)" anywhere.
const fillMatch = svg.match(/<g[^>]*fill="url\(#asciiGrad\)"[^>]*>/);
const fillGroup = fillMatch ? fillMatch[0] : '<g fill="url(#asciiGrad)">';

fs.writeFileSync('extracted_dots.txt', `${asciiGrad}\n${fillGroup}\n${framesSvg}\n</g>`);
console.log('Extracted', animatedPaths.length, 'frames');
