const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');

async function imageToEdgePath(imagePath, targetWidth = 90, targetHeight = 90) {
  try {
    const img = await loadImage(imagePath);
    const canvas = createCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext('2d');
    
    // Draw on black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
    
    // Add 8px padding so no logos are touching the edges of the canvas!
    // This prevents any "cut off" appearance at the top/bottom.
    const padding = 8;
    const drawW = targetWidth - padding * 2;
    const drawH = targetHeight - padding * 2;
    
    // Some SVGs might not be perfectly square, but drawImage will stretch them.
    // We want to keep aspect ratio? The logos are mostly square.
    // Wait, let's keep aspect ratio to be safe!
    const aspect = img.width / img.height;
    let finalW = drawW;
    let finalH = drawH;
    let offsetX = padding;
    let offsetY = padding;
    
    if (aspect > 1) {
      finalH = drawW / aspect;
      offsetY = padding + (drawH - finalH) / 2;
    } else if (aspect < 1) {
      finalW = drawH * aspect;
      offsetX = padding + (drawW - finalW) / 2;
    }
    
    ctx.drawImage(img, offsetX, offsetY, finalW, finalH);
    
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
        
        // Emphasize edges! (Sharp boundaries)
        if (diffX > 15 || diffY > 15) {
          drawDot = true;
        } 
        else if (b > 100) {
          // Very sparse interior dots
          drawDot = Math.random() < 0.08; 
        }
        
        if (drawDot) {
          // Center correctly inside VISUAL.MAP box
          const px = 90 + x * 3.5;
          const py = 180 + y * 3.5;
          path += `M${px} ${py}h1.5v1.5h-1.5z`;
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
    // Lowered float height so it never risks hitting the top edge
    const floatAnim = `<animateTransform attributeName="transform" type="translate" values="0 0; 0 -10; 0 0" dur="5s" repeatCount="indefinite" />`;
    
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
