/**
 * Copies ONLY the images each scenario actually uses to its folder.
 * Each scenario folder contains just the images shown on that page.
 * Run after: node scripts/download-solution-images.js
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'images', 'solution-detail');
const SCENARIO_CONTENT_DIR = path.join(__dirname, '..', 'js', 'scenario-content.js');

// IMG key -> filename (photo1.jpg, photo2.jpg, etc.)
const IMG_FILES = {
  parking: 'photo10.jpg', lobby: 'photo11.jpg', reception: 'photo12.jpg', indoor: 'photo13.jpg',
  meeting: 'photo14.jpg', warehouse: 'photo15.jpg', perimeter: 'photo3.jpg', control: 'photo8.jpg',
  default: 'photo16.jpg', intersection: 'photo17.jpg', traffic: 'photo18.jpg', bus: 'photo17.jpg',
  classroom: 'photo14.jpg', store: 'photo19.jpg', highway: 'photo20.jpg', tunnel: 'photo21.jpg',
  solar: 'photo22.jpg', pipeline: 'photo23.jpg', dam: 'photo24.jpg', turbine: 'photo25.jpg',
  oilfield: 'photo23.jpg', offshore: 'photo26.jpg', transmission: 'photo25.jpg', cashier: 'photo27.jpg',
  command: 'photo8.jpg', roadside: 'photo1.jpg', showroom: 'photo28.jpg', conference: 'photo29.jpg',
  substation: 'photo25.jpg', mall: 'photo30.jpg', passenger: 'photo17.jpg', driving: 'photo31.jpg',
  entryway: 'photo12.jpg', operation: 'photo8.jpg', anomaly: 'photo3.jpg', flow: 'photo18.jpg',
  voice: 'photo16.jpg', guidance: 'photo10.jpg', analytics: 'photo8.jpg', advertising: 'photo30.jpg',
  security: 'photo3.jpg', dock: 'photo15.jpg', parcel: 'photo32.jpg', array: 'photo22.jpg',
};

function imgKeyFor(title) {
  const t = (title || '').toLowerCase();
  if (t.includes('parking')) return 'parking';
  if (t.includes('lobby')) return 'lobby';
  if (t.includes('reception')) return 'reception';
  if (t.includes('indoor') || t.includes('public')) return 'indoor';
  if (t.includes('meeting')) return 'meeting';
  if (t.includes('inventory') || t.includes('warehouse')) return 'warehouse';
  if (t.includes('perimeter')) return 'perimeter';
  if (t.includes('control')) return 'control';
  if (t.includes('intersection')) return 'intersection';
  if (t.includes('traffic') || t.includes('lane')) return 'traffic';
  if (t.includes('bus lane') || t.includes('bus stop')) return 'bus';
  if (t.includes('classroom') || t.includes('in-class')) return 'classroom';
  if (t.includes('entrance') && t.includes('store')) return 'store';
  if (t.includes('highway')) return 'highway';
  if (t.includes('tunnel')) return 'tunnel';
  if (t.includes('solar')) return 'solar';
  if (t.includes('pipeline')) return 'pipeline';
  if (t.includes('dam') || t.includes('reservoir')) return 'dam';
  if (t.includes('turbine')) return 'turbine';
  if (t.includes('oilfield') || t.includes('well site')) return 'oilfield';
  if (t.includes('offshore') || t.includes('platform')) return 'offshore';
  if (t.includes('transmission') || t.includes('line inspection')) return 'transmission';
  if (t.includes('cashier')) return 'cashier';
  if (t.includes('command')) return 'command';
  if (t.includes('roadside') || t.includes('urban roadside')) return 'roadside';
  if (t.includes('showroom')) return 'showroom';
  if (t.includes('conference') || t.includes('conferencing')) return 'conference';
  if (t.includes('substation') || t.includes('equipment area')) return 'substation';
  if (t.includes('shopping') || t.includes('mall')) return 'mall';
  if (t.includes('passenger')) return 'passenger';
  if (t.includes('driving cabin')) return 'driving';
  if (t.includes('entryway') || t.includes('entry')) return 'entryway';
  if (t.includes('operation center')) return 'operation';
  if (t.includes('anomaly')) return 'anomaly';
  if (t.includes('flow') || t.includes('counting')) return 'flow';
  if (t.includes('voice') || t.includes('broadcast')) return 'voice';
  if (t.includes('guidance')) return 'guidance';
  if (t.includes('analytics')) return 'analytics';
  if (t.includes('advertising') || t.includes('display')) return 'advertising';
  if (t.includes('general security')) return 'security';
  if (t.includes('ramp')) return 'ramp';
  if (t.includes('shoulder')) return 'shoulder';
  if (t.includes('toll')) return 'toll';
  if (t.includes('gore')) return 'gore';
  if (t.includes('yellow box')) return 'yellow';
  if (t.includes('remote learning')) return 'remote';
  if (t.includes('central management')) return 'central';
  if (t.includes('multi-classroom')) return 'multi';
  if (t.includes('dock')) return 'dock';
  if (t.includes('parcel')) return 'parcel';
  if (t.includes('array area')) return 'array';
  return 'default';
}

// SCENARIO_CONTENT scenarios: section titles -> IMG keys
const SCENARIO_CONTENT_SECTIONS = {
  'hotels': ['Parking Lot', 'Lobby', 'Reception', 'Indoor Public Spaces', 'Meeting Rooms', 'Inventory', 'Perimeter', 'Control Room'],
  'factories': ['Vehicle Entrance & Exit', 'Lobby Entrance', 'Workshop', 'Warehouse', 'Perimeter', 'Control Room'],
  'construction-site': ['Vehicle entrance & exit', 'Main entrance', 'Construction areas', 'Key areas', 'Tower cranes', 'Management office'],
  'offices': ['Vehicle Entrance & Exit', 'Door Entrances', 'Reception', 'Indoor Public Spaces', 'Meeting Rooms', 'Inventory', 'Perimeter', 'Control Room'],
  'gas-stations': ['Vehicle Entrance & Exit', 'Fueling Zones', 'Unloading Zone', 'Store Entrances', 'Shopping Areas', 'Checkout Counter', 'Staff Office'],
  'schools': ['Vehicle Entrance & Exit', 'School Gates & Dormitories', 'Public Area', 'Perimeter', 'Classroom', 'Control Room'],
  'warehouses': ['General Security', 'Dock Management', 'Parcel Tracking', 'Traffic Management']
};

function getScenarioContentImages() {
  const images = {};
  for (const [scenario, titles] of Object.entries(SCENARIO_CONTENT_SECTIONS)) {
    const set = new Set();
    for (const title of titles) {
      const key = imgKeyFor(title);
      set.add(IMG_FILES[key]);
    }
    images[scenario] = [...set];
  }
  return images;
}

function extractImagesFromFile() {
  const content = fs.readFileSync(SCENARIO_CONTENT_DIR, 'utf8');
  const scenarioImages = {};

  // Extract from SECTION_CHALLENGE_IMAGES
  const challengeMatch = content.match(/const SECTION_CHALLENGE_IMAGES = \{([\s\S]*?)\n\};/);
  if (challengeMatch) {
    const block = challengeMatch[1];
    const scenarioRegex = /'([^']+)':\s*\[/g;
    let m;
    while ((m = scenarioRegex.exec(block)) !== null) {
      const scenario = m[1];
      const start = m.index + m[0].length;
      let depth = 1, end = start;
      for (let i = start; i < block.length; i++) {
        if (block[i] === '[') depth++;
        else if (block[i] === ']') { depth--; if (depth === 0) { end = i; break; } }
      }
      const sub = block.substring(start, end);
      const photos = [...sub.matchAll(/photo\d+\.jpg/g)].map(x => x[0]);
      if (!scenarioImages[scenario]) scenarioImages[scenario] = new Set();
      photos.forEach(p => scenarioImages[scenario].add(p));
    }
  }

  // Extract from SECTION_WHAT_WE_OFFER
  const offerMatch = content.match(/const SECTION_WHAT_WE_OFFER = \{([\s\S]*?)\n\};/);
  if (offerMatch) {
    const block = offerMatch[1];
    const scenarioRegex = /'([^']+)':\s*\[/g;
    let m;
    while ((m = scenarioRegex.exec(block)) !== null) {
      const scenario = m[1];
      const start = m.index + m[0].length;
      let depth = 1, end = start;
      for (let i = start; i < block.length; i++) {
        if (block[i] === '[') depth++;
        else if (block[i] === ']') { depth--; if (depth === 0) { end = i; break; } }
      }
      const sub = block.substring(start, end);
      const photos = [...sub.matchAll(/photo\d+\.jpg/g)].map(x => x[0]);
      if (!scenarioImages[scenario]) scenarioImages[scenario] = new Set();
      photos.forEach(p => scenarioImages[scenario].add(p));
    }
  }

  // Add SCENARIO_CONTENT scenarios
  const contentImages = getScenarioContentImages();
  for (const [scenario, files] of Object.entries(contentImages)) {
    if (!scenarioImages[scenario]) scenarioImages[scenario] = new Set();
    files.forEach(f => scenarioImages[scenario].add(f));
  }

  return scenarioImages;
}

function main() {
  const scenarioImages = extractImagesFromFile();

  // Apartments: from solution-detail.html - buldingimage.webp + 10 photos
  const apartmentsFiles = new Set([
    'buldingimage.webp',
    'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg',
    'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 'photo9.jpg'
  ]);
  scenarioImages['apartments'] = apartmentsFiles;

  // Get all source files from solution-detail root (downloaded images)
  const rootFiles = fs.existsSync(BASE) ? fs.readdirSync(BASE).filter(f => {
    const full = path.join(BASE, f);
    return fs.statSync(full).isFile() && /\.(jpg|jpeg|png|webp)$/i.test(f);
  }) : [];

  let copied = 0;
  let removed = 0;

  for (const [scenario, files] of Object.entries(scenarioImages)) {
    const dir = path.join(BASE, scenario);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const fileList = [...files];
    const existingInDir = fs.existsSync(dir) ? fs.readdirSync(dir) : [];

    // Remove files that don't belong to this scenario
    for (const f of existingInDir) {
      if (!fileList.includes(f)) {
        try {
          fs.unlinkSync(path.join(dir, f));
          removed++;
        } catch (e) {}
      }
    }

    // Copy only the files this scenario uses
    for (const file of fileList) {
      let src = path.join(BASE, file);
      const dest = path.join(dir, file);
      if (!fs.existsSync(src) && fs.existsSync(dest)) src = dest; // keep existing if in place
      if (fs.existsSync(src) && fs.statSync(src).isFile()) {
        fs.copyFileSync(src, dest);
        copied++;
      }
    }
  }

  // Clean other page folders: keep only images used on that page
  const PAGE_IMAGES = {
    'index': ['hero-background.jpg', 'company-intro.jpg', 'enterprise-security.jpg', 'network-infrastructure.jpg', 'cloud-solutions.jpg'],
    'about': ['office-building.jpg'],
    'contact': ['contact-office.jpg'],
    'projects': ['airport-security.jpg', 'hotel-resort.jpg', 'hospital-medical.jpg', 'school-education.jpg', 'bank-financial.jpg', 'manufacturing-facility.jpg', 'government-building.jpg'],
    'industries': []  // no images on industries page
  };
  const imagesRoot = path.join(__dirname, '..', 'images');
  for (const [page, allowed] of Object.entries(PAGE_IMAGES)) {
    const dir = path.join(imagesRoot, page);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile());
      for (const f of files) {
        if (!allowed.includes(f)) {
          try {
            fs.unlinkSync(path.join(dir, f));
            removed++;
          } catch (e) {}
        }
      }
    }
  }

  console.log('Copied', copied, 'files. Removed', removed, 'unused files.');
  console.log('Each page folder now contains only its page images.');
}

main();
