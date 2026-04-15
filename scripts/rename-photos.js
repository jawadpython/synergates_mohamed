/**
 * Renames photo-XXX.jpg files to photo1.jpg, photo2.jpg, etc.
 * Run: node scripts/rename-photos.js
 */
const fs = require('fs');
const path = require('path');

const PHOTO_IDS = [
  'photo-1449824913935-59a10b8d2000', 'photo-1450101499163-c8848c66ca85', 'photo-1558618666-fcd25c85cd64',
  'photo-1518455027359-f3f8164ba6bd', 'photo-1504307651254-35680f356dfd', 'photo-1514565131-fce0801e5785',
  'photo-1557597774-9d273605dfa9', 'photo-1551288049-bebda4e38f71', 'photo-1519389950473-47ba0277781c',
  'photo-1590674899484-d5640e854abe', 'photo-1566073771259-6a8506099945', 'photo-1542314831-068cd1dbfeeb',
  'photo-1497366216548-37526070297c', 'photo-1524178232363-1fb2b075b655', 'photo-1553413077-190a3050c877',
  'photo-1557804506-669a67965ba0', 'photo-1544620347-c4fd4a3d5957', 'photo-1568605114967-8130f3a36994',
  'photo-1604719314656-8b3577237372', 'photo-1544197154-315b881f2b5e', 'photo-1474487548417-781cb71495f3',
  'photo-1508517233187-968e022e2c1c', 'photo-1581091226823-a80c0a8e4190', 'photo-1509316785289-025f5b846b35',
  'photo-1473341307972-ebe1a7f647c2', 'photo-1532601224476-15c79f2f7a51', 'photo-1556742049-0cfed4f6a45d',
  'photo-1612825173281-9a193378527e', 'photo-1515187029135-18ee286d815b', 'photo-1555529669-e69e7aa0ba9a',
  'photo-1449965408869-eaa3f722e40d', 'photo-1586528116311-ad8dd3c8310d', 'photo-1503676260728-1c00da094a0b',
  'photo-1516321318423-f06f85e504b3', 'photo-1523240795612-9a05468c4e38', 'photo-1570125909232-eb263c188fe7',
];

const OLD_TO_NEW = {};
PHOTO_IDS.forEach((id, i) => {
  OLD_TO_NEW[id + '.jpg'] = 'photo' + (i + 1) + '.jpg';
});

function renameInDir(dir) {
  if (!fs.existsSync(dir)) return 0;
  let n = 0;
  for (const f of fs.readdirSync(dir)) {
    const oldPath = path.join(dir, f);
    if (!fs.statSync(oldPath).isFile()) continue;
    const newName = OLD_TO_NEW[f];
    if (newName && newName !== f) {
      fs.renameSync(oldPath, path.join(dir, newName));
      n++;
    }
  }
  return n;
}

function main() {
  const imagesRoot = path.join(__dirname, '..', 'images');
  let total = 0;
  // solution-detail root and all scenario subfolders
  const dirs = [path.join(imagesRoot, 'solution-detail')];
  const sd = dirs[0];
  if (fs.existsSync(sd)) {
    total += renameInDir(sd);
    for (const sub of fs.readdirSync(sd)) {
      const p = path.join(sd, sub);
      if (fs.statSync(p).isDirectory()) total += renameInDir(p);
    }
  }
  console.log('Renamed', total, 'files to photo1.jpg, photo2.jpg, etc.');
}

main();
