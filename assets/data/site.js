/* ==========================================================================
   SITE SETTINGS: contact details, social links ("Find us"), and page switches.
   Edit this file only.

   PAGE SWITCHES  (pages)
     'live'    page works normally
     'soon'    page shows a "Coming soon" screen and a "Soon" badge in the menu
     'hidden'  page is removed from the menu (visiting it sends people home)
   Keys: team, case-studies, projects, publications, map

   FIND US  (links)
     platform  icon to use: linkedin, instagram, youtube, x, facebook, tiktok, github,
               fiverr, whatsapp, researchgate, googlescholar, orcid, telegram, medium
     label     name shown on the card
     handle    @username or short text shown under the label (optional)
     url       full address. Only entries with a valid URL are displayed to visitors.
     desc      one line about what people find there (optional)
     cta       button text (optional)
     featured  true makes the card wide and highlighted (use for Fiverr)
   Order here = order on the page. Delete a block to remove it. Empty links are not displayed.
   ========================================================================== */

window.SCC_SITE = {

  /* Change this value after you edit data files so visitors' browsers fetch the new version. */
  version: '2026-11-26-contact-v2',

  contact: { 
    address: '',
    email: 'mail@spectracc.sbs',
    phone: '',
    website: ''
  },

  region: 'Kubu Raya, West Kalimantan, Indonesia',

  pages: {
    'team': 'live',
    'case-studies': 'live',
    'projects': 'live',
    'publications': 'live',
    'courses': 'live',
    'map': 'hidden'
  },

  links: [
    {
      platform: 'fiverr', label: 'Fiverr', handle: '@spectra24', url: 'https://www.fiverr.com/spectra24', featured: true,
      desc: 'Work with our team on mapping, GIS, remote sensing, and spatial projects.', cta: 'View our gigs'
    },
    {
      platform: 'instagram', label: 'Instagram', handle: '@cc.spectra24', url: 'https://www.instagram.com/cc.spectra24',
      desc: 'Updates, field notes, and ideas from our geospatial work.'
    },
    {
      platform: 'youtube', label: 'YouTube', handle: '@spectracc24', url: 'https://youtube.com/@spectracc24',
      desc: 'Videos on mapping, geospatial tools, and environmental topics.'
    },
    {
      platform: 'linkedin', label: 'LinkedIn', handle: 'Spectra CC', url: 'https://www.linkedin.com/in/spectra-cc-aa3280452/',
      desc: 'Our updates, news and professional opportunities.'
    },
    {
      platform: 'github', label: 'GitHub', handle: 'spectracc24', url: 'https://github.com/spectracc24',
      desc: 'Open tools, scripts, and resources from our projects.'
    }
  ]
};
