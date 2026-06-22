const puppeteer = require('puppeteer');
const fs = require('fs');
const outDir = 'dist';

(async () => {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Adjust URL if your index.html is in a subfolder
  const url = 'http://127.0.0.1:8080/';

  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');

  const pdfPath = `${outDir}/CV.pdf`;
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '10mm', left: '12mm', right: '12mm' }
  });

  await browser.close();
  console.log('PDF written to', pdfPath);
})();
