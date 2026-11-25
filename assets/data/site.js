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
  version: '2026-11-25-links-v1',
   
  contact: {
    address: '',
    email: 'cc.spectra24@gmail.com',
    phone: '',
    website: ''
  },

  region: 'Kubu Raya, West Kalimantan, Indonesia',

  // Public Cloudflare Turnstile site key. Set this after creating the widget.
  turnstileSiteKey: '0x4AAAAAAGRN_Rl7hLO8fKKz',
  contactEndpoint: '/api/contact',

  pages: {
    'team': 'live',
    'case-studies': 'live',
    'projects': 'live',
    'publications': 'live',
    'courses': 'live',
    'map': 'hidden'
  },

  links: [
  { platform: 'fiverr', label: 'Fiverr', handle: '@username', url: 'https://www.fiverr.com/username', featured: true,
    desc: '...', cta: 'View our gigs' },
  { platform: 'instagram', label: 'Instagram', handle: '@username', url: 'https://instagram.com/username',
    desc: 'Field notes and behind the scenes.' }
]
};
