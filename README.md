# Spectra Citra Cendekia website

Static site (no build step). Open `index.html` through a web server (GitHub Pages, or VS Code "Live Server").

## Where to edit

| What | File |
|---|---|
| Contact details, social links, Fiverr, page on/off ("Coming soon") | `assets/data/site.js` |
| How lists look (layout, columns, image or not, order of blocks, filters) | `assets/data/settings.js` |
| Our Team (management and experts) | `assets/data/team.js` |
| Publications and downloads | `assets/data/publications.js` |
| Projects | `assets/data/projects.js` |
| Case studies | `assets/data/case-studies.js` |
| Interactive map (layers, legend, basemaps, tools) | `assets/data/map.js` |

Every data file starts with a comment that explains each field.

## Where to put files

- Team photos: `assets/img/team/`
- Publication covers: `assets/img/publications/`  ·  downloads: `assets/files/publications/`
- Project / case images: `assets/img/projects/`, `assets/img/cases/`
- Map GeoJSON files: `assets/data/geo/`

After changing data files, change `version` in `assets/data/site.js` so visitors' browsers fetch the new files.

## Code layout

- `index.html` markup only
- `script.js` core: loading screens, lazy loader, modal, router, home, contact, Find us
- `assets/js/lib/` shared: `collection.js` (design system), `figures.js`, `icons.js`
- `assets/js/pages/` one file per page, loaded only when the page is opened
- `assets/vendor/leaflet/` map library (bundled, no CDN needed)
- `assets/css/style.css` all styles
