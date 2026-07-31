const { createCanvas, loadImage } = require('@napi-rs/canvas');

async function preview(imagePath) {
  const img = await loadImage(imagePath);
  const canvas = createCanvas(40, 40);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 40, 40);
  const data = ctx.getImageData(0, 0, 40, 40).data;
  
  for (let y = 0; y < 40; y++) {
    let row = '';
    for (let x = 0; x < 40; x++) {
      const idx = (y * 40 + x) * 4;
      const r = data[idx];
      const a = data[idx+3];
      // '#' if bright and opaque
      row += (r > 128 && a > 128) ? '#' : '.';
    }
    console.log(row);
  }
}

preview('logo.png');
