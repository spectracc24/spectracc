# Spectra Citra Cendekia website

Static English-only frontend with no build step. It can be served from GitHub Pages, Cloudflare Pages or any plain static host; no server-side code is needed.

## Where to edit

| What | File |
|---|---|
| Contact details, social links and page visibility | `assets/data/site.js` |
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

## Course Library

- Course catalog and metadata: `assets/data/courses.js`
- Course catalog/detail rendering: `assets/js/pages/courses.js`
- Course images (when available): `assets/img/courses/`

Add a course object to `window.SCC_COURSES` in `assets/data/courses.js`. Give each course a unique `id`; the detail page is available at `#course-detail/<id>`. Set `type` to `free` or `paid`, choose a `category`, and add the external `access_url` where the actual course, document, video, or other learning material is hosted. `visitors` and `buyers` are manually maintained display counters, not live analytics. Set `image` to a path such as `assets/img/courses/course-cover.jpg`; leave it empty to show the built-in image placeholder.

This is a static catalog and external-link directory. It does not upload files, process payments, authenticate learners, or automatically count visits/purchases. Those functions require a backend or a third-party course platform. Update the `version` value in `assets/data/site.js` after changing catalog data or assets.

## Contact page

The Contact page has no form. Visitors reach the team by email: the main card shows the address from `contact.email` in `assets/data/site.js`, with a **Write an email** button (opens the visitor's email app with a short editable template) and a **Copy address** button. Address, phone and website appear below it only when filled in. The "Before you write" steps are plain text in `index.html`, and social links come from `links` in `site.js`.
