const fs = require('fs');
const path = require('path');

const relatedDir = path.join(__dirname, '..', 'assets', 'images', 'related');
const destFile = path.join(__dirname, 'view_related.html');

try {
    const files = fs.readdirSync(relatedDir);
    const imageHtml = files.map(file => {
        return `
        <div style="display: inline-block; margin: 15px; padding: 10px; border: 1px solid #ccc; text-align: center; font-family: sans-serif; background: #fff; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 14px;">${file}</p>
            <img src="../assets/images/related/${file}" style="max-height: 150px; max-width: 200px; display: block; margin: 0 auto; object-fit: contain;">
        </div>
        `;
    }).join('\n');

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Related Images Preview</title>
    </head>
    <body style="background: #f1f5f9; padding: 20px;">
        <h2>Related Images Gallery</h2>
        <div>${imageHtml}</div>
    </body>
    </html>
    `;

    fs.writeFileSync(destFile, html, 'utf8');
    console.log(`Generated preview at: ${destFile}`);
} catch (e) {
    console.error('Error generating preview', e);
}
