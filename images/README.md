# Image Directory Structure

All website images are organized by **page name** so you can find and replace them easily.

## Folder Structure

```
images/
├── index/           # Homepage (index.html)
├── about/           # About page (about.html)
├── contact/         # Contact page (contact.html)
├── industries/      # Industries page (industries.html)
├── projects/        # Projects page (projects.html)
├── solutions_frontimage/ # Solutions grid (solutions.html) – small thumbnails for card grid
├── solutions/       # Full-size images for solution-detail.html – main scenario diagrams
└── solution-detail/ # Solution detail (solution-detail.html) – per-scenario section images
    ├── apartments/           # Apartments solution images
    ├── factories/           # Factories solution images
    ├── classroom-hub/       # Classroom Hub images
    ├── urban-roadways/      # Urban Roadways images
    ├── offices/             # Office Buildings images
    ├── stores/              # Stores images
    ├── bus-stop/            # Bus Stop images
    ├── car-dealerships/     # Car Dealerships images
    ├── conference-rooms/    # Conference Rooms images
    ├── construction-site/    # Construction Site images
    ├── electrical-substations/
    ├── gas-stations/
    ├── highways/
    ├── hotels/
    ├── monitoring-center/
    ├── parking-lots/
    ├── schools/
    ├── shopping-malls/
    ├── transit-bus-onboard/
    ├── warehouses/
    ├── onshore-oilfields/
    ├── supermarkets/
    ├── offshore-oil-platform/
    ├── transmission-line-inspection/
    ├── pipeline-inspection/
    ├── solar-farms/
    └── hydroelectric-power-plants/
```

## Images by Page

### index/ (Homepage)
| File | Usage |
|------|-------|
| `hero-background.jpg` | Hero section background |
| `company-intro.jpg` | Company introduction section |
| `enterprise-security.jpg` | Enterprise Security card |
| `network-infrastructure.jpg` | Network Infrastructure card |
| `cloud-solutions.jpg` | Cloud Solutions card |

### about/ (About Page)
| File | Usage |
|------|-------|
| `office-building.jpg` | Company overview image |

### contact/ (Contact Page)
| File | Usage |
|------|-------|
| `contact-office.jpg` | Contact section image |

### industries/ (Industries Page)
Currently no images. Add images here when needed.

### projects/ (Projects Page)
| File | Usage |
|------|-------|
| `airport-security.jpg` | Airport security project |
| `hotel-resort.jpg` | Hotel/resort project |
| `hospital-medical.jpg` | Hospital project |
| `school-education.jpg` | School project |
| `bank-financial.jpg` | Bank project |
| `manufacturing-facility.jpg` | Manufacturing project |
| `government-building.jpg` | Government building project |

### solutions_frontimage/ (Solutions Grid – small thumbnails)
Small, lightweight images for the solution cards on `solutions.html`. Same filenames as `solutions/`:
- `buldingimage.webp`, `Factories.png`, `Classroom hub.png`, `Urban roadways.png`, `Office Buildings.png`
- `Supermarkets.png`, `Bus Stop.png`, `Car Dealerships.png`, `Conference Rooms.png`
- `Construction Site.png`, `Electrical Substations.png`, `Gas Stations.png`, `Highways.png`
- `Hotels.png`, `Monitoring Center.png`, `Parking Lots.png`, `Schools.png`
- `Shopping Malls.png`, `Transit Bus On-board.png`, `Warehouses.png`
- `Onshore Oilfields.png`, `Transmission Line Inspection.png`, `Pipeline Inspection.png`
- `Solar Farms.png`, `Hydroelectric Power Plants.png`

### solutions/ (Solution Detail Page – full-size images)
Full-size scenario diagram images shown when a user opens a solution (e.g. `solution-detail.html?scenario=factories`).

### solution-detail/ (Solution Detail Page – one folder per solution)
Each solution has its own folder. To change images for a specific solution, edit that folder only.

| Scenario folder | Contents |
|-----------------|----------|
| `apartments/` | `buldingimage.webp` (diagram) + photo1.jpg–photo9.jpg |
| `factories/` | Challenge and “What we offer” images |
| `classroom-hub/` | Challenge and “What we offer” images |
| `urban-roadways/` | Challenge and “What we offer” images |
| … (all 27 scenarios) | Same structure |

## Important: One Folder = One Page’s Images Only

Each folder contains **only** the images used on that page. No shared or duplicate images.

- **index/** – 5 images (hero, company-intro, 3 solution cards)
- **about/** – 1 image (office-building.jpg)
- **contact/** – 1 image (contact-office.jpg)
- **projects/** – 7 project images
- **industries/** – empty (no images on industries page)
- **solutions_frontimage/** – small thumbnails for solution card grid (solutions.html)
- **solutions/** – full-size scenario diagrams (solution-detail.html)
- **solution-detail/{scenario}/** – only images shown on that solution’s detail page

## How to Replace an Image

1. **Find the page** – Check the table above for the correct folder.
2. **Replace the file** – Put your new image in that folder with the **same filename**.
3. **Done** – No code changes needed if you keep the same filename.

### Example
To change the **Factories** solution images:
1. Go to `images/solution-detail/factories/`
2. Replace `photo1.jpg`, `photo2.jpg`, etc. with your images (keep the same filenames)

To change the **Apartments** diagram:
1. Go to `images/solution-detail/apartments/`
2. Replace `buldingimage.webp` with your new diagram

## Downloading and Organizing Stock Images

```bash
# 1. Download Unsplash images
node scripts/download-solution-images.js

# 2. Copy to each scenario folder
node scripts/organize-solution-images.js
```

Step 1 saves images as `photo1.jpg` through `photo36.jpg`. Step 2 copies them into each scenario subfolder so you can customize images per solution.
