const { createCanvas, loadImage } = require('@napi-rs/canvas');
const fs = require('fs');

async function imageToPath(imagePath, targetWidth = 60, targetHeight = 60) {
  try {
    const img = await loadImage(imagePath);
    const canvas = createCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext('2d');
    
    // Fill background with white to avoid transparent alpha matching
    //
    //
    
    // Draw image
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    
    const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
    const data = imgData.data;
    
    let path = '';
    // We will draw a dot for dark pixels
    for (let y = 0; y < targetHeight; y++) {
      for (let x = 0; x < targetWidth; x++) {
        const idx = (y * targetWidth + x) * 4;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const a = data[idx+3];
        
        // Calculate brightness
        const brightness = (r + g + b) / 3;
        
        // If it's a dark pixel, draw a dot (a 2x2 or 1x1 pixel)
        if (a > 128) {
          // Adjust x and y to fit in the VISUAL.MAP box in the terminal banner
          // VISUAL.MAP box is x=50..450, y=120..560
          // Let's scale up x and y by 4 so it fills the box nicely
          const px = 100 + x * 4;
          const py = 150 + y * 4;
          path += `M${px} ${py}h2v2h-2z`;
        }
      }
    }
    return path;
  } catch (e) {
    console.error(e);
    return null;
  }
}

imageToPath('logo.png').then(path => {
  fs.writeFileSync('logo_path.txt', path || '');
  console.log('Path length:', path?.length);
});
