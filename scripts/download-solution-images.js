/**
 * Downloads Unsplash images to images/solution-detail/
 * Run: node scripts/download-solution-images.js
 * Then: node scripts/organize-solution-images.js (copies to each scenario folder)
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'images', 'solution-detail');
const BASE = 'https://images.unsplash.com';
const PARAMS = 'w=600&h=400&fit=crop';

// Unsplash photo IDs -> save as photo1.jpg, photo2.jpg, etc.
const PHOTO_MAP = [
  ['photo-1449824913935-59a10b8d2000', 'photo1.jpg'],
  ['photo-1450101499163-c8848c66ca85', 'photo2.jpg'],
  ['photo-1558618666-fcd25c85cd64', 'photo3.jpg'],
  ['photo-1518455027359-f3f8164ba6bd', 'photo4.jpg'],
  ['photo-1504307651254-35680f356dfd', 'photo5.jpg'],
  ['photo-1514565131-fce0801e5785', 'photo6.jpg'],
  ['photo-1557597774-9d273605dfa9', 'photo7.jpg'],
  ['photo-1551288049-bebda4e38f71', 'photo8.jpg'],
  ['photo-1519389950473-47ba0277781c', 'photo9.jpg'],
  ['photo-1590674899484-d5640e854abe', 'photo10.jpg'],
  ['photo-1566073771259-6a8506099945', 'photo11.jpg'],
  ['photo-1542314831-068cd1dbfeeb', 'photo12.jpg'],
  ['photo-1497366216548-37526070297c', 'photo13.jpg'],
  ['photo-1524178232363-1fb2b075b655', 'photo14.jpg'],
  ['photo-1553413077-190a3050c877', 'photo15.jpg'],
  ['photo-1557804506-669a67965ba0', 'photo16.jpg'],
  ['photo-1544620347-c4fd4a3d5957', 'photo17.jpg'],
  ['photo-1568605114967-8130f3a36994', 'photo18.jpg'],
  ['photo-1604719314656-8b3577237372', 'photo19.jpg'],
  ['photo-1544197154-315b881f2b5e', 'photo20.jpg'],
  ['photo-1474487548417-781cb71495f3', 'photo21.jpg'],
  ['photo-1508517233187-968e022e2c1c', 'photo22.jpg'],
  ['photo-1581091226823-a80c0a8e4190', 'photo23.jpg'],
  ['photo-1509316785289-025f5b846b35', 'photo24.jpg'],
  ['photo-1473341307972-ebe1a7f647c2', 'photo25.jpg'],
  ['photo-1532601224476-15c79f2f7a51', 'photo26.jpg'],
  ['photo-1556742049-0cfed4f6a45d', 'photo27.jpg'],
  ['photo-1612825173281-9a193378527e', 'photo28.jpg'],
  ['photo-1515187029135-18ee286d815b', 'photo29.jpg'],
  ['photo-1555529669-e69e7aa0ba9a', 'photo30.jpg'],
  ['photo-1449965408869-eaa3f722e40d', 'photo31.jpg'],
  ['photo-1586528116311-ad8dd3c8310d', 'photo32.jpg'],
  ['photo-1503676260728-1c00da094a0b', 'photo33.jpg'],
  ['photo-1516321318423-f06f85e504b3', 'photo34.jpg'],
  ['photo-1523240795612-9a05468c4e38', 'photo35.jpg'],
  ['photo-1570125909232-eb263c188fe7', 'photo36.jpg'],
];

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('Downloading', PHOTO_MAP.length, 'images to', OUT_DIR);
  for (const [id, filename] of PHOTO_MAP) {
    const url = `${BASE}/${id}?${PARAMS}`;
    const file = path.join(OUT_DIR, filename);
    try {
      const data = await download(url);
      fs.writeFileSync(file, data);
      console.log('OK', filename);
    } catch (err) {
      console.error('FAIL', filename, err.message);
    }
  }
  console.log('Done.');
}

main();
