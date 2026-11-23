/* ==========================================================================
   PUBLICATIONS: articles, guidelines, institutional reports, scientific articles, and more.
   Edit this file only. How the list looks is set in settings.js (section `publications`).

   HOW TO ADD ONE
   1. Put downloadable files in  assets/files/publications/   (PDF, XLSX, ZIP ...)
      and an optional cover image in  assets/img/publications/
   2. Copy a block below, paste it, fill in the fields. Newest first is easiest to read,
      but the page sorts by `date` when settings.js says sort: 'date-desc'.

   FIELDS
     id         (required) unique short name, no spaces: 'mangrove-guideline-2026'
     title      (required)
     type       (required) category used by the filter buttons, e.g. 'Scientific article',
                'Guideline', 'Institutional report', 'Article', 'Policy brief', 'Dataset'
     date       (recommended) 'YYYY-MM-DD' or 'YYYY-MM' or 'YYYY'
     authors    (optional) 'A. Surname, B. Surname'
     summary    (recommended) 1 to 3 sentences, shown on the card
     body       (optional) the longer description shown when the item is opened.
                Separate paragraphs with a blank line (\n\n).
     tags       (optional) ['Remote sensing', 'Mangrove']
     image      (optional) 'assets/img/publications/cover.jpg'
     feature    (optional) generated figure instead of an image: { kind: 'lc' | 'carbon' | 'grid', seed: 5 }
     files      (optional) list of downloads:
                  { label: 'Download PDF', url: 'assets/files/publications/name.pdf', format: 'PDF', size: '2.1 MB' }
                Leave url '' to show a disabled "Coming soon" button.
     link       (optional) { url: 'https://doi.org/...', label: 'Read at the publisher' }
     citation   (optional) how to cite, shown in the opened item
     featured   (optional) true: leads the list in the 'featured' layout
     status     (optional) 'soon': shows a "Coming soon" badge and disables the buttons
     sample     (optional) true: shows a "Sample entry" label. Delete this line for real entries.
   ========================================================================== */

window.SCC_PUBLICATIONS = [

  /* EXAMPLE WITH A REAL FILE
  {
    id: 'mangrove-guideline-2026',
    title: 'Guideline for mapping mangrove change with Sentinel-2',
    type: 'Guideline',
    date: '2026-03-15',
    authors: 'A. Surname, B. Surname',
    summary: 'A step-by-step method for classifying mangrove cover and measuring change.',
    body: 'First paragraph.\n\nSecond paragraph.',
    tags: ['Remote sensing', 'Mangrove'],
    image: 'assets/img/publications/mangrove-guideline.jpg',
    files: [{ label: 'Download PDF', url: 'assets/files/publications/mangrove-guideline-2026.pdf', format: 'PDF', size: '2.1 MB' }],
    link: { url: 'https://doi.org/xxxx', label: 'Open DOI' },
    citation: 'Surname, A., Surname, B. (2026). Title. Spectra Citra Cendekia.'
  }, */

  { id: 'sample-article', sample: true, featured: true,
    title: '[Sample] Title of a scientific article',
    type: 'Scientific article', date: '2026-06-10', authors: '[Author names]',
    summary: 'Replace this with a two or three sentence summary of the article: the question, the method and the main finding.',
    body: 'This is the longer description shown when someone opens the item.\n\nUse a second paragraph for the method, the data and why the work matters.',
    tags: ['Remote sensing', 'Peer reviewed'],
    feature: { kind: 'lc', seed: 12 },
    files: [{ label: 'Download PDF', url: '', format: 'PDF', size: '' }],
    link: { url: '', label: 'Open at the publisher' },
    citation: '[Author, A. (Year). Title. Journal, volume(issue), pages. DOI]' },

  { id: 'sample-guideline', sample: true,
    title: '[Sample] Technical guideline title',
    type: 'Guideline', date: '2026-04-02', authors: '[Author names]',
    summary: 'A guideline summary describes who it is for and what a reader can do after using it.',
    tags: ['Method', 'QC/QA'],
    feature: { kind: 'grid', seed: 7 },
    files: [{ label: 'Download PDF', url: '', format: 'PDF', size: '' }, { label: 'Download template', url: '', format: 'XLSX', size: '' }] },

  { id: 'sample-report', sample: true,
    title: '[Sample] Institutional annual report',
    type: 'Institutional report', date: '2026-01-20',
    summary: 'An institutional report summarizes activities, results and plans for a period.',
    tags: ['Report'],
    feature: { kind: 'carbon', seed: 3 },
    files: [{ label: 'Download PDF', url: '', format: 'PDF', size: '' }] },

  { id: 'sample-brief', sample: true,
    title: '[Sample] Policy brief title',
    type: 'Policy brief', date: '2025-11-05',
    summary: 'A policy brief gives a decision maker the problem, the evidence and the recommended action in one or two pages.',
    tags: ['Policy'],
    files: [{ label: 'Download PDF', url: '', format: 'PDF', size: '' }] },

  { id: 'sample-blog', sample: true,
    title: '[Sample] Short article or field story',
    type: 'Article', date: '2025-09-18',
    summary: 'A shorter piece for a general audience: what happened in the field and what it taught the team.',
    tags: ['Field notes'],
    link: { url: '', label: 'Read the article' } },

  { id: 'sample-soon', sample: true, status: 'soon',
    title: '[Sample] Upcoming publication',
    type: 'Scientific article', date: '2026-12',
    summary: 'An item marked as coming soon shows a badge and disables its buttons.',
    tags: ['In preparation'] }
];
