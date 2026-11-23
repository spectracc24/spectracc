/* ==========================================================================
   DESIGN SYSTEM: how dynamic content looks. Edit this file only.
   Each section controls one kind of content. Change a value, save, refresh.

   LAYOUT        how items are arranged
     'grid'      cards in columns (media on top)
     'list'      one row per item (media on the left)
     'featured'  first item large, the rest in a grid
     'compact'   dense rows, no media (good for long lists)
     'story'     long-form, alternating text and media (good for case studies)

   columns       2, 3 or 4 (grid and featured)

   MEDIA         what appears in the media slot
     'auto'      item.image if it has one, otherwise item.feature, otherwise the placeholder
     'image'     only item.image (items without an image use the placeholder)
     'feature'   only item.feature (the generated figure or interactive comparison)
     'none'      no media at all
   placeholder   for items with no media:  'logo' | 'generated' | 'none'
   mediaRatio    '16/10' | '4/3' | '3/2' | '1/1' | '16/9'
   mediaFit      'cover' (fill, may crop) | 'contain' (show whole image)

   show          the building blocks of each item, in the order they appear. Remove one to hide it.
                 'kicker'   category label          'title'    item title
                 'meta'     date, client, authors   'summary'  short description
                 'tags'     keyword tags            'files'    download buttons
                 'actions'  "Details" and "Open link" hints
   summaryLines  cut the summary after this many lines (0 = never)

   filters       show category filter buttons (true/false)
   search        show the search box (true/false)
   sort          'manual' (order in the data file) | 'date-desc' | 'date-asc' | 'title'
   pageSize      items per page with a "Show more" button (0 = show all)
   detail        'modal' (click opens full details) | 'none'
   sampleNote    text for the dashed notice above the list ('' to hide it)
   ========================================================================== */

window.SCC_SETTINGS = {

  publications: {
    layout: 'list',
    columns: 3,
    media: 'auto',
    placeholder: 'logo',
    mediaRatio: '4/3',
    mediaFit: 'cover',
    show: ['kicker', 'title', 'meta', 'summary', 'tags', 'files'],
    summaryLines: 3,
    filters: true,
    search: true,
    sort: 'date-desc',
    pageSize: 8,
    detail: 'modal',
    sampleNote: 'These entries are samples. Replace them in assets/data/publications.js.'
  },

  projects: {
    layout: 'grid',
    columns: 3,
    media: 'auto',
    placeholder: 'generated',
    mediaRatio: '16/10',
    mediaFit: 'cover',
    show: ['kicker', 'title', 'meta', 'summary', 'actions'],
    summaryLines: 3,
    filters: true,
    search: true,
    sort: 'manual',
    pageSize: 0,
    detail: 'modal',
    sampleNote: 'These entries are samples. Replace them in assets/data/projects.js.'
  },

  cases: {
    layout: 'story',
    columns: 2,
    media: 'auto',
    placeholder: 'generated',
    mediaRatio: '14/9',
    mediaFit: 'cover',
    show: ['kicker', 'title', 'meta', 'summary', 'tags', 'files', 'actions'],
    summaryLines: 0,
    filters: false,
    search: false,
    sort: 'manual',
    pageSize: 0,
    detail: 'modal',
    sampleNote: 'These entries are samples. Replace them in assets/data/case-studies.js.'
  },

  /* Our Team page */
  team: {
    columns: 4,            /* 2, 3 or 4 */
    photoRatio: '1/1',     /* '1/1' | '4/5' | '3/4' */
    bioLines: 3,           /* card description is cut after this many lines; click opens the full profile */
    showNetwork: true,     /* the discipline diagram above the experts */
    showFilters: true      /* discipline filter buttons for experts */
  },

  /* Loading screens */
  loader: {
    bootMinMs: 700,        /* shortest time the first loading screen stays up */
    viewMinMs: 450         /* shortest time a page loading screen stays up when a page loads for the first time */
  }
};
