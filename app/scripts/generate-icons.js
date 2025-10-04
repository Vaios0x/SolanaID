const fs = require('fs');
const path = require('path');

// Crear iconos placeholder básicos
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '../public/icons');

// Asegurar que el directorio existe
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Crear un SVG básico para cada tamaño
sizes.forEach(size => {
  const svg = `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00ff88;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size/8}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size/4}" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">🔐</text>
</svg>`;

  const filePath = path.join(iconsDir, `icon-${size}x${size}.png`);
  
  // Nota: En producción, deberías usar una librería como sharp o jimp para convertir SVG a PNG
  // Por ahora, guardamos el SVG como placeholder
  const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, svg);
  
  console.log(`Created icon-${size}x${size}.svg`);
});

console.log('Iconos placeholder creados. En producción, convierte los SVG a PNG usando una librería como sharp.');
