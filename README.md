# Spectra Citra Cendekia website

Static English-only frontend with no build step. The production contact form uses a Cloudflare Pages Function; GitHub Pages or a plain static host can serve the pages but cannot run the email endpoint.

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
- `functions/api/contact.js` server-side CAPTCHA verification and email delivery
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

## Production contact form (Cloudflare Pages + Turnstile + Resend)

The contact form submits to the same-origin `/api/contact` endpoint. The endpoint is implemented as a Cloudflare Pages Function in `functions/api/contact.js`; it verifies the Cloudflare Turnstile token on the server and sends the inquiry through Resend. No email credentials are exposed in browser JavaScript.

### Deployment checklist

1. Deploy this repository as a **Cloudflare Pages** project with the repository root (`/`) as the build output directory. The `functions/` directory must be included in the deployment.
2. Create a Cloudflare Turnstile widget for the production website hostname. Copy its **site key** into `turnstileSiteKey` in `assets/data/site.js`.
3. Create a Resend account, verify the sender domain, and choose a sender address on that verified domain.
4. In Cloudflare Pages > Settings > Variables and Secrets, add these values for Production (and Preview if needed):
   - `TURNSTILE_SECRET` - Turnstile secret key (secret).
   - `RESEND_API_KEY` - Resend API key (secret).
   - `CONTACT_FROM` - verified sender, for example `Spectra CC Website <website@your-verified-domain>`.
   - `CONTACT_TO` - optional; defaults to `cc.spectra24@gmail.com`.
5. Redeploy after setting the variables. Test the form on the deployed domain, including a failed CAPTCHA and a successful message.

The contact form will not send messages until the Turnstile site key and Cloudflare environment secrets are configured. Do not commit secret keys to this repository.
