const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'assets', 'images', 'related');
const destDir = path.join(__dirname, '..', 'assets', 'images', 'clients');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const mappings = {
    "img483.jpg": "cafe_niloufer.jpg",
    "img484.jpg": "infinix.jpg",
    "img485.jpg": "jyothy_labs.jpg",
    "img486.jpg": "pune_metro.jpg",
    "img487.jpg": "sse.jpg",
    "img488.jpg": "larsen_toubro.jpg",
    "img489.jpg": "reliance.jpg",
    "img490.jpg": "john_deere.jpg",
    "img491.jpg": "johnson_controls.jpg",
    "img492.jpg": "infinity.jpg"
};

Object.keys(mappings).forEach(srcFile => {
    const srcPath = path.join(srcDir, srcFile);
    const destPath = path.join(destDir, mappings[srcFile]);

    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${srcFile} -> ${mappings[srcFile]}`);
    } else {
        console.warn(`Source file not found: ${srcFile}`);
    }
});

console.log('Client logos organized successfully.');
