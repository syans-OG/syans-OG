const { createCanvas, loadImage } = require('@napi-rs/canvas');

async function preview(imagePath) {
  const img = await loadImage(imagePath);
  const canvas = createCanvas(30, 30);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 30, 30);
  const data = ctx.getImageData(0, 0, 30, 30).data;
  
  for (let y = 0; y < 30; y++) {
    let row = '';
    for (let x = 0; x < 30; x++) {
      const a = data[(y * 30 + x) * 4 + 3];
      row += r > 128 ? '#' : '.';
    }
    console.log(row);
  }
}

preview('logo.png');
