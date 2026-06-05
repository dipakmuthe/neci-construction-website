const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'assets', 'images', 'clients');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const svgFiles = {
    "rmz.svg": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="100%" height="100%">
  <rect width="200" height="80" fill="none"/>
  <text x="45" y="48" font-family="'Inter', 'Segoe UI', sans-serif" font-size="28" font-weight="900" fill="#1B1F6B">RMZ</text>
  <rect x="120" y="28" width="16" height="24" fill="#F4B400"/>
  <rect x="140" y="36" width="16" height="16" fill="#1B1F6B"/>
</svg>
    `.trim(),

    "acg.svg": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="100%" height="100%">
  <rect width="200" height="80" fill="none"/>
  <text x="40" y="50" font-family="'Inter', 'Segoe UI', sans-serif" font-size="32" font-weight="800" fill="#1B1F6B" letter-spacing="2">ACG</text>
  <circle cx="140" cy="40" r="16" stroke="#F4B400" stroke-width="4" fill="none"/>
  <circle cx="140" cy="40" r="8" fill="#1B1F6B"/>
</svg>
    `.trim(),

    "mastek.svg": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="100%" height="100%">
  <rect width="200" height="80" fill="none"/>
  <path d="M30 48 L40 28 L50 40 L60 28 L70 48" stroke="#1B1F6B" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="85" y="48" font-family="'Inter', 'Segoe UI', sans-serif" font-size="22" font-weight="800" fill="#1B1F6B">Mastek</text>
</svg>
    `.trim(),

    "global_inspira.svg": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="100%" height="100%">
  <rect width="200" height="80" fill="none"/>
  <circle cx="35" cy="40" r="16" stroke="#1B1F6B" stroke-width="2.5" fill="none"/>
  <ellipse cx="35" cy="40" rx="16" ry="6" stroke="#F4B400" stroke-width="2" fill="none"/>
  <text x="65" y="47" font-family="'Inter', 'Segoe UI', sans-serif" font-size="16" font-weight="800" fill="#1B1F6B">Global Inspira</text>
</svg>
    `.trim()
};

Object.keys(svgFiles).forEach(fileName => {
    const destPath = path.join(destDir, fileName);
    fs.writeFileSync(destPath, svgFiles[fileName], 'utf8');
    console.log(`Generated SVG: ${fileName}`);
});

console.log('All SVG logos generated successfully.');
