const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');

async function imageToEdgePath(imagePath, targetWidth = 70, targetHeight = 70) {
  try {
    const img = await loadImage(imagePath);
    const canvas = createCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext('2d');
    
    // Draw on black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    
    const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
    const data = imgData.data;
    
    let path = '';
    
    function getBrightness(x, y) {
      if (x < 0 || x >= targetWidth || y < 0 || y >= targetHeight) return 0;
      const idx = (y * targetWidth + x) * 4;
      return (data[idx] + data[idx+1] + data[idx+2]) / 3;
    }
    
    // Create halftone pattern / edges
    for (let y = 0; y < targetHeight; y++) {
      for (let x = 0; x < targetWidth; x++) {
        const b = getBrightness(x, y);
        const bRight = getBrightness(x + 1, y);
        const bBottom = getBrightness(x, y + 1);
        
        const diffX = Math.abs(b - bRight);
        const diffY = Math.abs(b - bBottom);
        
        let drawDot = false;
        
        // Edge detection
        if (diffX > 20 || diffY > 20) {
          drawDot = true;
        } 
        // Bright areas (hologram fill)
        else if (b > 50) {
          drawDot = Math.random() < (b / 255.0) * 0.7; // Bright areas get more dots
        }
        
        if (drawDot) {
          // Box is x=50 to 450 (width 400), center = 250
          // Box is y=120 to 560 (height 440), center = 340
          // 70 * 4.5 = 315 width/height
          // startX = 250 - (315/2) = 92.5 -> use 90
          // startY = 340 - (315/2) = 182.5 -> use 180
          
          const px = 90 + x * 4.5;
          const py = 180 + y * 4.5;
          
          // Add small random offset to dots for glitchy look
          const dx = px + (Math.random() > 0.5 ? 1 : 0);
          const dy = py + (Math.random() > 0.5 ? 1 : 0);
          path += `M${dx} ${dy}h2v2h-2z`;
        }
      }
    }
    return path;
  } catch (e) {
    console.error('Failed to process', imagePath, e);
    return '';
  }
}

async function generateMorphingSvg() {
  const logos = ['logo.png', 'html_logo.png', 'flutter_logo.png', 'figma_logo.png'];
  const paths = [];
  
  for (let logo of logos) {
    console.log('Processing', logo);
    const path = await imageToEdgePath(logo);
    paths.push(path);
  }
  
  let svgContent = '';
  
  for (let i = 0; i < 4; i++) {
    let values = '';
    let keyTimes = '';
    
    const startIdx = i * 0.25;
    const fadeEnd = startIdx + 0.05;
    const holdEnd = startIdx + 0.20;
    const fadeOutEnd = startIdx + 0.25;
    
    if (i === 0) {
      keyTimes = `0; ${fadeEnd}; ${holdEnd}; ${fadeOutEnd}; 1`;
      values = `0; 1; 1; 0; 0`;
    } else {
      keyTimes = `0; ${startIdx}; ${fadeEnd}; ${holdEnd}; ${fadeOutEnd}; 1`;
      values = `0; 0; 1; 1; 0; 0`;
    }
    
    const opacityAnim = `<animate attributeName="opacity" values="${values}" keyTimes="${keyTimes}" dur="16s" repeatCount="indefinite" />`;
    const floatAnim = `<animateTransform attributeName="transform" type="translate" values="0 0; 0 -15; 0 0" dur="5s" repeatCount="indefinite" />`;
    
    svgContent += `
    <g opacity="0">
      ${opacityAnim}
      ${floatAnim}
      <path d="${paths[i]}" />
    </g>`;
  }
  
  const gradient = `
  <defs>
    <linearGradient id="asciiGrad" x1="0" y1="0" x2="0" y2="520" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#60A5FA"/>
      <stop offset="0.45" stop-color="#A78BFA"/>
      <stop offset="1" stop-color="#22D3EE"/>
      <animateTransform attributeName="gradientTransform" type="translate" values="0 -120; 0 120; 0 -120" dur="9s" repeatCount="indefinite"/>
    </linearGradient>
  </defs>
  `;
  
  const finalGroup = `${gradient}<g fill="url(#asciiGrad)">${svgContent}</g>`;
  
  fs.writeFileSync('generated_morph.txt', finalGroup);
  console.log('Saved to generated_morph.txt');
}

generateMorphingSvg();
