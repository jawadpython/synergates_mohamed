# TechSec Solutions - Corporate Website

A professional, modern corporate website for a technology and security solutions company. Built with HTML, Tailwind CSS, and Vanilla JavaScript.

## Features

- **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional design inspired by Hikvision solutions pages
- **SEO Optimized** - Proper meta tags, semantic HTML, and structured content
- **No Backend Required** - Pure frontend implementation
- **Fast Loading** - Optimized for performance
- **Accessible** - Follows web accessibility best practices

## Project Structure

```
hikvision-clone/
│
├── index.html          # Homepage
├── solutions.html      # Solutions page
├── about.html          # About us page
├── contact.html        # Contact page
│
├── css/
│   └── styles.css      # Custom CSS styles
│
├── js/
│   └── main.js         # JavaScript functionality
│
└── README.md           # Project documentation
```

## Pages

### Homepage (index.html)
- Hero section with call-to-action
- Features overview
- Solutions preview
- Call-to-action section

### Solutions (solutions.html)
- Enterprise Solutions
- Retail Solutions
- Manufacturing Solutions
- Education Solutions

### About (about.html)
- Company story
- Core values
- Statistics
- Team expertise

### Contact (contact.html)
- Contact form
- Contact information
- Business hours
- Map placeholder

## Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - No frameworks or libraries
- **Font Awesome** - Icons (via CDN)

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a web browser (or run a local server, see below)
3. No build process or installation required

### Running with Python (for “Save positions to server”)

To use the **Save positions to server** button on solution-detail pages, run the included Python server instead of `python -m http.server`:

```bash
python server.py
```

Then open e.g. `http://localhost:8000/solution-detail.html?scenario=hotels`, arrange the buttons, and click **Save positions to server**. Positions are stored in `data/positions.json` and load for every visitor.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Colors
The website uses a blue color scheme. To change colors, modify the Tailwind classes:
- Primary: `blue-600`, `blue-700`
- Background: `gray-50`, `gray-900`

### Content
Edit the HTML files directly to update:
- Company name and branding
- Contact information
- Solution descriptions
- About page content

### Styling
- Custom styles: `css/styles.css`
- Tailwind utilities: Inline classes in HTML

## Features Implemented

- ✅ Responsive navigation with mobile menu
- ✅ Smooth scrolling
- ✅ Contact form (frontend only)
- ✅ SEO-friendly structure
- ✅ Professional design
- ✅ Accessible markup
- ✅ Cross-browser compatible

## Notes

- The contact form is frontend-only and doesn't submit to a server
- Map section is a placeholder - integrate with Google Maps API if needed
- Social media links are placeholders
- All images/icons use Font Awesome icons - replace with actual images if needed

## License

This project is open source and available for use.
